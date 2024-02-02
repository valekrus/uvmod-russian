// the configurator tool works very similar to the patcher, where individual config sections are treated by mod-like instances with a read and write function

const readConfigButton = document.getElementById('readConfigButton');
const writeConfigButton = document.getElementById('writeConfigButton');
const readCalibButton = document.getElementById('readCalibButton');
const writeCalibButton = document.getElementById('writeCalibButton');
const configContainer = document.getElementById('configContainer');
const automaticBackupCheckbox = document.getElementById('automaticBackupCheckbox');
const backupConfigFileInput = document.getElementById('backupConfigFileInput');
const backupConfigFileLabel = document.getElementById('backupConfigFileLabel');
const backupCalibFileInput = document.getElementById('backupCalibFileInput');
const backupCalibFileLabel = document.getElementById('backupCalibFileLabel');

let rawCONFIG = new Uint8Array(0x2000);
let rawCALIB = new Uint8Array(0x200);

async function eeprom_init(port) {
    // packet format: uint16 ID, uint16 length, uint32 timestamp
    // send hello packet to init communication
    // the 4 bytes are a timestamp for the session and need to be appended to each following packet
    // we simply set the timestamp to 0xffffffff
    const packet = new Uint8Array([0x14, 0x05, 0x04, 0x00, 0xff, 0xff, 0xff, 0xff]);
    await sendPacket(port, packet);
    const response = await readPacket(port, 0x15);
    const decoder = new TextDecoder();
    const version = new Uint8Array(response.slice(4, 4+16)); // string contains some garbage after null, so we have to clean it up with indexof
    const customAES = Boolean(response[4 + 16 + 0]);
    const inLockScreen = Boolean(response[4 + 16 + 1]);
    const challenge = new Uint8Array(response.slice(4 + 16 + 2 + 2, 4 + 16 + 2 + 2 + 4));
    log('Radio connected!');
    log(`Version: ${decoder.decode(version.slice(0, version.indexOf(0)))}`);
    log(`Has custom AES key: ${customAES}`);
    log(`Is in lock screen: ${inLockScreen}`);
    log(`Challenge: ${uint8ArrayToHexString(challenge)}`);
}

async function eeprom_read(port, address, size = 0x80) {
    // packet format: uint16 ID, uint16 length, uint16 address, uint8 size, uint8 padding, uint32 timestamp
    // size can be up to 0x80 bytes
    const address_msb = (address & 0xff00) >> 8;
    const address_lsb = address & 0xff;

    const packet = new Uint8Array([0x1b, 0x05, 0x08, 0x00, address_lsb, address_msb, size, 0x00, 0xff, 0xff, 0xff, 0xff]);

    await sendPacket(port, packet);
    const response = await readPacket(port, 0x1c);

    // reply format: uint16 ID, uint16 length, uint16 offset, uint8 size, uint8 padding, uint8[128] data
    // extract data from response using size
    if (response[6] !== size) {
        throw ('eeprom read reply has wrong size.');
    }
    const data = new Uint8Array(response.slice(8));
    return data;
}

async function eeprom_reboot(port) {
    // packet format: uint16 ID
    const packet = new Uint8Array([0xdd, 0x05]);
    log('Rebooting radio...');
    await sendPacket(port, packet);
}

function eeprom_writeCommand(data, address) {
    // the eeprom command structure is as follows:
    /* 0x1D  0x5  0x88  0x00  
     * address_lsb,  address_msb,  length,  allow password, uint32 timestamp
     * [0x80 bytes of data, if length is <0x80 then fill the rest with zeroes] */

    // flash is written in 0x80 blocks, if data is less than 0x80 bytes then it is padded with zeroes
    if (data.length < 0x80) {
        const padding = new Uint8Array(0x80 - data.length);
        data = new Uint8Array([...data, ...padding]);
    }
    if (data.length != 0x80) throw new Error('Tell dev that he is an idiot');

    // the address is a 16 bit integer, so we need to split it into two bytes
    const address_msb = (address & 0xff00) >> 8;
    const address_lsb = address & 0xff;

    // the length is fixed to 0x80 bytes
    const length = 0x80;

    return new Uint8Array([0x1d, 0x5, 0x88, 0x0, address_lsb, address_msb, length, 1, 0xff, 0xff, 0xff, 0xff, ...data]);
}

// function to flash the config file to the radio
async function eeprom_flashConfig(port, config) {
    // for loop to flash the config in 0x80 byte blocks
    // this loop is safe as long as the config file is not larger than 0x2000 bytes
    if (config.length > 0x2000) throw new Error('Last resort boundary check failed. Whoever touched the code is an idiot.');
    log('Flashing... 0%')

    for (let i = 0; i < config.length; i += 0x80) {
        const data = config.slice(i, i + 0x80);
        const command = eeprom_writeCommand(data, i);

        try {
            await sendPacket(port, command);
            await readPacket(port, 0x1e);
        } catch (e) {
            log('Flash command rejected. Aborting.');
            return Promise.reject(e);
        }

        log(`Flashing... ${((i / config.length) * 100).toFixed(1)}%`, true);
    }
    log('Flashing... 100%', true)
    log('Successfully flashed config.');
    return Promise.resolve();
}

async function eeprom_flashCalib(port, calib) {
    // for loop to flash the calibration data in 0x80 byte blocks
    // this loop is safe as long as the calibration data file is not larger than 0x200 bytes
    if (calib.length > 0x200) throw new Error('Last resort boundary check failed. Whoever touched the code is an idiot.');
    log('Flashing... 0%')

    for (let i = 0; i < calib.length; i += 0x80) {
        const data = calib.slice(i, i + 0x80);
        const command = eeprom_writeCommand(data, i);

        try {
            await sendPacket(port, command);
            await readPacket(port, 0x1e);
        } catch (e) {
            log('Flash command rejected. Aborting.');
            return Promise.reject(e);
        }

        log(`Flashing... ${((i / calib.length) * 100).toFixed(1)}%`, true);
    }
    log('Flashing... 100%', true)
    log('Successfully flashed calibration data.');
    return Promise.resolve();
}

function loadCONFIG(loaded_config) {
    rawCONFIG = loaded_config;
    // Check size
    const current_size = rawCONFIG.length;
    const max_size = 0x2000;
    const percentage = (current_size / max_size) * 100;
    log(`Config uses ${percentage.toFixed(2)}% of available memory (${current_size}/${max_size} bytes).`);
    if (current_size > max_size) {
        log("WARNING: Config is too large and WILL NOT WORK!");
        return;
    }

    writeConfigButton.classList.remove('disabled');
}

function loadCALIB(loaded_calib) {
    rawCALIB = loaded_calib;
    // Check size
    const current_size = rawCALIB.length;
    const max_size = 0x200;
    const percentage = (current_size / max_size) * 100;
    log(`Calibration data uses ${percentage.toFixed(2)}% of available memory (${current_size}/${max_size} bytes).`);
    if (current_size > max_size) {
        log("WARNING: Calibration data is too large and WILL NOT WORK!");
        return;
    }

    writeCalibButton.classList.remove('disabled');
}

readConfigButton.addEventListener('click', async function () {
    readConfigButton.classList.add('disabled');

    port = null;
    try {
        log('Connecting to the serial port...');
        port = await connect();
        if (!port) {
            log('Failed to connect to the serial port.');
            readConfigButton.classList.remove('disabled');
            return;
        }
        // initialize communication
        await eeprom_init(port);

        // read full eeprom, size is 0x2000 bytes
        let readCONFIG = new Uint8Array(0x2000);

        log('Reading configuration... 0%');
        for (let i = 0; i < 0x2000; i += 0x80) {
            const data = await eeprom_read(port, i);
            readCONFIG.set(data, i);
            log(`Reading configuration... ${((i / 0x2000) * 100).toFixed(1)}%`, true);
        }
        log('Reading configuration... 100%.', true);
        loadCONFIG(readCONFIG);
        log('Configuration read successfully.');
        backupConfigFileLabel.textContent = 'read_configuration_data.bin';
        
        // save to file if backup is enabled
        if (automaticBackupCheckbox.checked) {
            log('Saving backup file...');
            const blob = new Blob([readCONFIG], { type: 'application/octet-stream' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'uvmod_configuration_backup.bin';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }

    } catch (error) {
        if (error !== 'Reader has been cancelled.') {
            console.error('Error:', error);
            log('Unusual error occured, check console for details.');
        } else {
            log('No data received, is the radio connected and on? Please try again.');
        }
        return;

    } finally {
        port.close();
        readConfigButton.classList.remove('disabled');
    }
});

writeConfigButton.addEventListener('click', async function () {
    writeConfigButton.classList.add('disabled');
    if (rawCONFIG.length > 0x2000) {
        log('Config file is too large. Aborting.');
        writeConfigButton.classList.remove('disabled');
        return;
    }
    log('Connecting to the serial port...');
    const port = await connect();
    if (!port) {
        log('Failed to connect to the serial port.');
        writeConfigButton.classList.remove('disabled');
        return;
    }

    try {
        // initialize communication
        await eeprom_init(port);
        
        log('Flashing config...');
        await eeprom_flashConfig(port, rawCONFIG);
        await eeprom_reboot(port);

        return;
    } catch (error) {
        if (error !== 'Reader has been cancelled.') {
            console.error('Error:', error);
            log('Unusual error occured, check console for details.');
        } else {
            log('No data received, is the radio connected and is not in flash mode? Please try again.');
        }
        return;

    } finally {
        port.close();
        writeConfigButton.classList.remove('disabled');
    }
});

// Update text to show filename after file selection
backupConfigFileInput.addEventListener('change', function () {
    // Check if a file is selected
    if (this.files.length > 0) {
        // Get the name of the selected file and update the label text
        backupConfigFileLabel.textContent = this.files[0].name;
        log("");
        const file = new Promise((resolve) => {
                const reader = new FileReader();
                reader.onload = function (event) {
                    resolve(new Uint8Array(event.target.result));
                };
                reader.readAsArrayBuffer(backupConfigFileInput.files[0]);
            });
    
        file
            .then((configFile) => {
                loadCONFIG(configFile);
            })
            .catch((error) => {
                console.error(error);
                log("Error while loading config file, check log above or developer console for details.");
            });
    }
});

readCalibButton.addEventListener('click', async function () {
    readCalibButton.classList.add('disabled');

    port = null;
    try {
        log('Connecting to the serial port...');
        port = await connect();
        if (!port) {
            log('Failed to connect to the serial port.');
            readCalibButton.classList.remove('disabled');
            return;
        }
        // initialize communication
        await eeprom_init(port);

        // read calibration, size is 0x200 bytes
        let readCALIB = new Uint8Array(0x200);

        // read full eeprom, size is 0x2000 bytes
        log('Reading calibration data... 0%');
        for (let i = 0; i < 0x200; i += 0x80) {
            const data = await eeprom_read(port, 0x1e00 + i);
            readCALIB.set(data, i);
            log(`Reading calibration data... ${((i / 0x200) * 100).toFixed(1)}%`, true);
        }
        log('Reading calibration data... 100%.', true);
        loadCALIB(readCALIB);
        log('Calibration data read successfully.');
        backupCalibFileLabel.textContent = 'read_calibration_data.bin';
        
        // save to file if backup is enabled
        if (automaticBackupCheckbox.checked) {
            log('Saving backup file...');
            const blob = new Blob([readCALIB], { type: 'application/octet-stream' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'uvmod_calibration_backup.bin';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }

    } catch (error) {
        if (error !== 'Reader has been cancelled.') {
            console.error('Error:', error);
            log('Unusual error occured, check console for details.');
        } else {
            log('No data received, is the radio connected and on? Please try again.');
        }
        return;

    } finally {
        port.close();
        readCalibButton.classList.remove('disabled');
    }
});

writeCalibButton.addEventListener('click', async function () {
    writeCalibButton.classList.add('disabled');
    if (rawCALIB.length > 0x200) {
        log('Calibration data file is too large. Aborting.');
        writeCalibButton.classList.remove('disabled');
        return;
    }
    log('Connecting to the serial port...');
    const port = await connect();
    if (!port) {
        log('Failed to connect to the serial port.');
        writeCalibButton.classList.remove('disabled');
        return;
    }

    try {
        // initialize communication
        await eeprom_init(port);
        
        log('Flashing calibration data...');
        await eeprom_flashCalib(port, rawCALIB);
        await eeprom_reboot(port);

        return;
    } catch (error) {
        if (error !== 'Reader has been cancelled.') {
            console.error('Error:', error);
            log('Unusual error occured, check console for details.');
        } else {
            log('No data received, is the radio connected and is not in flash mode? Please try again.');
        }
        return;

    } finally {
        port.close();
        writeCalibButton.classList.remove('disabled');
    }
});

// Update text to show filename after file selection
backupCalibFileInput.addEventListener('change', function () {
    // Check if a file is selected
    if (this.files.length > 0) {
        // Get the name of the selected file and update the label text
        backupCalibFileLabel.textContent = this.files[0].name;
        log("");
        const file = new Promise((resolve) => {
                const reader = new FileReader();
                reader.onload = function (event) {
                    resolve(new Uint8Array(event.target.result));
                };
                reader.readAsArrayBuffer(backupCalibFileInput.files[0]);
            });
    
        file
            .then((calibFile) => {
                loadCALIB(calibFile);
            })
            .catch((error) => {
                console.error(error);
                log("Error while loading calibration data file, check log above or developer console for details.");
            });
    }
});

// initialize configurator
{
    log("Please read config from device or load a backup file.");
}
