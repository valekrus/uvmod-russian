const useFirmwareVerCheckbox = document.getElementById('useFirmwareVer');
const useFirmwareVerLabel = document.getElementById('useFirmwareVerLabel');
const useFirmwareVerDiv = document.getElementById('useFirmwareVerDiv');
const firmwareVersionSelect = document.getElementById('firmwareVersionSelect');
const customFileInputDiv = document.getElementById('customFileInputDiv');
const customFileInput = document.getElementById('customFileInput');
const customFileLabel = document.getElementById('customFileLabel');
const flashButton = document.getElementById('flashButton');
const downloadButton = document.getElementById('downloadButton');
const useFirmwarePackedCheckbox = document.getElementById('useFirmwarePacked');
const useFirmwarePackedLabel = document.getElementById('useFirmwarePackedLabel');
const useFirmwarePackedDiv = document.getElementById('useFirmwarePackedDiv');
const firmwareVersionText = document.getElementById('firmwareVersionText');

let rawVersion = null; // stores the raw version data for fwpack.js and qsflash.js
let rawFirmware = null; // stores the raw firmware data for qsflash.js
let tmpFirmware = null; // stores the loaded firmware data
firmwareVersionText.value = "*UNKFW-"+(new Date()).toISOString().slice(0,10).replace(/-/g,"");

function toggleFWCheckbox() {
    useFirmwareVerCheckbox.checked = !useFirmwareVerCheckbox.checked;

    if (useFirmwareVerCheckbox.checked) {
        firmwareVersionSelect.classList.add('d-none');
        useFirmwareVerLabel.classList.remove('d-none');
    } else {
        firmwareVersionSelect.classList.remove('d-none');
        useFirmwareVerLabel.classList.add('d-none');
    }

    if (tmpFirmware) {
		loadFW(tmpFirmware);
	}
}

function togglePackedCheckbox() {
    useFirmwarePackedCheckbox.checked = !useFirmwarePackedCheckbox.checked;

    if (useFirmwarePackedCheckbox.checked) {
        firmwareVersionText.classList.add('d-none');
        useFirmwarePackedLabel.classList.remove('d-none');
    } else {
        firmwareVersionText.classList.remove('d-none');
        useFirmwarePackedLabel.classList.add('d-none');
    }

    if (tmpFirmware) {
		loadFW(tmpFirmware);
	}
}

useFirmwareVerDiv.addEventListener('click', function (event) {
    if (
        event.target === useFirmwareVerCheckbox ||
        event.target === useFirmwareVerDiv.querySelector('.input-group-text')
    ) {
        toggleFWCheckbox();
    }
});

useFirmwareVerCheckbox.addEventListener('change', function () {
    toggleFWCheckbox();
});

firmwareVersionSelect.addEventListener('change', function () {
    if (tmpFirmware) {
		loadFW(tmpFirmware);
	}
});

useFirmwarePackedDiv.addEventListener('click', function (event) {
    if (
        event.target === useFirmwarePackedCheckbox ||
        event.target === useFirmwarePackedDiv.querySelector('.input-group-text')
    ) {
        togglePackedCheckbox();
    }
});

useFirmwarePackedCheckbox.addEventListener('change', function () {
    togglePackedCheckbox();
});

firmwareVersionText.addEventListener('change', function () {
    if (tmpFirmware) {
		loadFW(tmpFirmware);
	}
});

function GetLatestGitReleaseInfo(owner, repo, regex = /\.bin/gm, encoded = true) {
    $.getJSON("https://api.github.com/repos/" + owner + "/" + repo + "/releases/latest").done(function(release) {
        let asset = release.assets.find(asset => asset.name.match(regex));
        let releaseInfo = "File size: " + asset.size + " bytes" +
            "\nRelease date: " + new Date(asset.updated_at).toLocaleDateString("ru-RU") +
            "\nVersion: " + release.tag_name.substring(1) +
			"\nRelease name: " + release.name;
        document.getElementById('console').value = "";
		log(releaseInfo);
		if (useFirmwarePackedCheckbox.checked != encoded) {
            togglePackedCheckbox();
        }
		loadFirmwareFromUrl(asset.browser_download_url);
    });
}

function GetLatestGitPreReleaseInfo(owner, repo, regex = /\.bin/gm, encoded = true) {
    $.getJSON("https://api.github.com/repos/" + owner + "/" + repo + "/releases").done(function(releases) {
		let release = releases[0];
        let asset = release.assets.find(asset => asset.name.match(regex));
        let releaseInfo = "File size: " + asset.size + " bytes" +
            "\nRelease date: " + new Date(asset.updated_at).toLocaleDateString("ru-RU") +
            "\nVersion: " + release.tag_name.substring(1) +
			"\nRelease name: " + release.name;
        document.getElementById('console').value = "";
		log(releaseInfo);
		if (useFirmwarePackedCheckbox.checked != encoded) {
            togglePackedCheckbox();
        }
		loadFirmwareFromUrl(asset.browser_download_url);
    });
}

function GetLatestGitFileInfo(owner, repo, filePath, encoded = true) {
    $.getJSON("https://api.github.com/repos/" + owner + "/" + repo + "/contents/" + filePath).done(function(fileInfo) {
        $.getJSON("https://api.github.com/repos/" + owner + "/" + repo + "/commits?path=" + filePath).done(function(commits) {
            let commit = commits[0].commit;
            let releaseInfo = "File size: " + fileInfo.size + " bytes" +
                "\nRelease date: " + new Date(commit.author.date).toLocaleDateString("ru-RU") +
                "\nCommit: " + commits[0].sha +
                "\nMessage: " + commit.message;
            document.getElementById('console').value = "";
		    log(releaseInfo);
		    if (useFirmwarePackedCheckbox.checked != encoded) {
                togglePackedCheckbox();
            }
		    loadFirmwareFromUrl(fileInfo.download_url);
        });
    });
}

function GetOfficialFW(ver) {
	switch (ver) {
		case "26":
            releaseInfo = "File size: 58674 bytes" +
                "\nRelease date: 09.05.2023" +
                "\nVersion: 2.01.26" +
	    		"\nRelese name: Official firmware (no modifications)";
			fw_url = "fw/k5_v2.01.26_publish.bin";
			firmwareVersionText.value = "2.01.26";
			break;
		case "27":
            releaseInfo = "File size: 58738 bytes" +
                "\nRelease date: 08.07.2023" +
                "\nVersion: 2.01.27" +
	    		"\nRelease name: Official firmware (no modifications)";
			fw_url = "fw/k5_v2.01.27_flashable.bin";
			firmwareVersionText.value = "2.01.27";
			break;
		case "31":
            releaseInfo = "File size: 58838 bytes" +
                "\nRelease date: 02.09.2023" +
                "\nVersion: 2.01.31" +
	    		"\nRelease name: Official firmware (no modifications)";
			fw_url = "fw/k5_v2.01.31_publish.bin";
			firmwareVersionText.value = "2.01.31";
			break;
	}

    document.getElementById('console').value = "";
	log(releaseInfo);
	useFirmwarePackedCheckbox.checked = true;
	loadFirmwareFromUrl(fw_url, true);
}

function loadFW(loaded_firmware)
{
    tmpFirmware = loaded_firmware

    flashButton.classList.add('disabled');
    downloadButton.classList.add('disabled');

    if (useFirmwarePackedCheckbox.checked) {
        rawFirmware = unpack(loaded_firmware);
        decoder = new TextDecoder();
        firmwareVersionText.value = decoder.decode(rawVersion.subarray(0, rawVersion.indexOf(0)));
	} else {
		rawFirmware = loaded_firmware;
		version = new Uint8Array(16);
		encoder = new TextEncoder();
		encoder.encodeInto(firmwareVersionText.value, version);
		rawVersion = version;
	}

    log(`Detected firmware version: ${new TextDecoder().decode(rawVersion.subarray(0, rawVersion.indexOf(0)))}`);

    if (!useFirmwareVerCheckbox.checked) {
        // Adjust firmware version to allow cross flashing
        const newVersionChar = firmwareVersionSelect.value;
        const newVersionCharCode = newVersionChar.charCodeAt(0);
        rawVersion[0] = newVersionCharCode;
        log(`Modified firmware version: ${new TextDecoder().decode(rawVersion.subarray(0, rawVersion.indexOf(0)))}`);
	}

    // Check size
    const current_size = rawFirmware.length;
    const max_size = 0xEFFF;
    const percentage = (current_size / max_size) * 100;
    log(`Firmware uses ${percentage.toFixed(2)}% of available memory (${current_size}/${max_size} bytes).`);
    if (current_size > max_size) {
        log("WARNING: Firmware is too large and WILL NOT WORK!");
        return;
    }

    flashButton.classList.remove('disabled');

    const down_firmware = (useFirmwarePackedCheckbox.checked) ? pack(rawFirmware) : rawFirmware;

    // Save encoded firmware to file
    const fwDownBlob = new Blob([down_firmware]);
    const fwDownURL = URL.createObjectURL(fwDownBlob);
    downloadButton.href = fwDownURL;
    if (!downloadButton.download) {
        downloadButton.download = (firmwareVersionText.value[0] == '*') ? 'all_models_' + firmwareVersionText.value.substring(1) + '.bin' : firmwareVersionText.value + '.bin';
    }
    fwDownExt = downloadButton.download.substring(downloadButton.download.lastIndexOf('.')+1);
    downloadButton.download = downloadButton.download.substring(0, downloadButton.download.lastIndexOf('.'));
    downloadButton.download = downloadButton.download.replace('.packed', '');
    downloadButton.download = downloadButton.download.replace('.unpacked', '');
    downloadButton.download += (useFirmwarePackedCheckbox.checked) ? '.packed.' + fwDownExt : '.unpacked.' + fwDownExt;
    //downloadButton.download = customFileInput.files[0].name;
    downloadButton.classList.remove('disabled');
}

function loadFirmwareFromUrl(theUrl, direct = false)
{
    log("Loading file from url: "+ theUrl+'\n')
//    fetch('https://api.codetabs.com/v1/proxy?quest=' + theUrl, {
	if (direct) {
		fetch_url = theUrl;
	} else {
		fetch_url = `https://api.allorigins.win/raw?url=${encodeURIComponent(theUrl)}`;
	}
    fetch(fetch_url, {
        // headers: {
        //     'Access-Control-Allow-Origin':'*'
        //     'x-cors-api-key': 'temp_2f1bf656ef75047798830d7dbbc09bd6'
        // }
      })
    .then(res => {
        if (res.ok) {
            return res.arrayBuffer();
        } else {
            log(`Http error: ${res.status}`);
            throw new Error(`Http error: ${res.status}`);
        }
    }).then(loaded_firmware => {
        loadFW(new Uint8Array(loaded_firmware));
        customFileLabel.textContent = theUrl.substring(theUrl.lastIndexOf('/')+1);
        downloadButton.download = theUrl.substring(theUrl.lastIndexOf('/')+1);
    }).catch((error) => {
        console.error(error);
        log('Error while loading firmware, check log above or developer console for details.');
    });
}


// Update text to show filename after file selection
customFileInput.addEventListener('change', function () {
    document.getElementById('console').value = "";
    // Check if a file is selected
    if (this.files.length > 0) {
        // Get the name of the selected file and update the label text
        customFileLabel.textContent = this.files[0].name;
        log("");
        const file = new Promise((resolve) => {
                const reader = new FileReader();
                reader.onload = function (event) {
                    resolve(new Uint8Array(event.target.result));
                };
                reader.readAsArrayBuffer(customFileInput.files[0]);
            });
    
        file
            .then((encoded_firmware) => {
                loadFW(encoded_firmware)
            })
            .catch((error) => {
                console.error(error);
                log('Error while loading firmware, check log above or developer console for details.');
            });
    } else {
        // If no file is selected, reset the label text
        customFileLabel.textContent = 'Select firmware file';
    }
});




// flasher

async function flash_init(port) {
    const decoder = new TextDecoder();
    // example version data: { 0x30, 0x5, 0x10, 0x0, '2', '.', '0', '1', '.', '2', '3', 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0} for version 2.01.23
    // version from the fw file is stored in the 16 byte uint8array rawVersion starting with the version string at index 0, padded with 0x00
    // seems like the version string is just sent after a 4 byte header, so we can just send the rawVersion array

    const data = new Uint8Array([0x30, 0x5, rawVersion.length, 0x0, ...rawVersion]);
    // const data = new Uint8Array([0x30, 0x5, 0x10, 0x0, 0x32, 0x2e, 0x30, 0x31, 0x2e, 0x32, 0x33, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0]); //send v2 just like in k5prog
    console.log('Sending version request: ', data);

    await sendPacket(port, data);

    const response = await readPacket(port, 0x18);
    console.log('Version Response: ', response);
    if (response[0] == 0x18) {
        return response;
    }
    return Promise.reject('Maximum attempts reached, no response was 0x18. Aborting.');
}

// function to check if the version of the firmware is compatible with the bootloader (it does not actually matter lol)
function flash_checkVersion(dataPacket, versionFromFirmware) {
    const decoder = new TextDecoder();
    // print bootloader version as string, located at index 0x14
    log(`Bootloader version: ${decoder.decode(dataPacket.slice(0x14, 0x14 + 7))}`);

    // the radio accepts a * wildcard version, so we will do the same
    if (versionFromFirmware[0] == 0x2a) return true;

    // dataPacket is a uint8array containing the relevant byte at index 0x14
    // this byte is a 2 for the uv-k5, 3 for the k5(8)/k6, 4 for the uv-5r plus
    // versionFromFirmware is a uint8array containing the version at index 0, padded with 0x00
    return dataPacket[0x14] == versionFromFirmware[0];
}

// function to create a flash command from a block of data (max 0x100 bytes), the address and the total size of the firmware file
function flash_generateCommand(data, address, totalSize) {
    // the flash command structure is as follows:
    /* 0x19  0x5  0xc  0x1  0x8a  0x8d  0x9f  0x1d  
     * address_msb  address_lsb  address_final_msb  address_final_lsb  length_msb  length_lsb  0x0  0x0 
     * [0x100 bytes of data, if length is <0x100 then fill the rest with zeroes] */

    // flash is written in 0x100 blocks, if data is less than 0x100 bytes then it is padded with zeroes
    if (data.length < 0x100) {
        const padding = new Uint8Array(0x100 - data.length);
        data = new Uint8Array([...data, ...padding]);
    }
    if (data.length != 0x100) throw new Error('Tell matt that he is an idiot');

    // the address is a 16 bit integer, so we need to split it into two bytes
    const address_msb = (address & 0xff00) >> 8;
    const address_lsb = address & 0xff;

    const address_final = (totalSize + 0xff) & ~0xff; // add 0xff to totalSize and then round down to the next multiple of 0x100 by stripping the last byte
    if (address_final > 0xf000) throw new Error('Total size is too large');
    const address_final_msb = (address_final & 0xff00) >> 8;
    const address_final_lsb = 0x0; // since address_final can only be a multiple of 0x100, address_final_lsb is always 0x0

    // the length is fixed to 0x100 bytes
    const length_msb = 0x01;
    const length_lsb = 0x00;

    return new Uint8Array([0x19, 0x5, 0xc, 0x1, 0x8a, 0x8d, 0x9f, 0x1d, address_msb, address_lsb, address_final_msb, address_final_lsb, length_msb, length_lsb, 0x0, 0x0, ...data]);
}

// function to flash the firmware file to the radio
async function flash_flashFirmware(port, firmware) {
    // for loop to flash the firmware in 0x100 byte blocks
    // this loop is safe as long as the firmware file is smaller than 0xf000 bytes
    if (firmware.length > 0xefff) throw new Error('Last resort boundary check failed. Whoever touched the code is an idiot.');
    log('Flashing... 0%')

    for (let i = 0; i < firmware.length; i += 0x100) {
        const data = firmware.slice(i, i + 0x100);
        const command = flash_generateCommand(data, i, firmware.length);

        try {
            await sendPacket(port, command);
            await readPacket(port, 0x1a);
        } catch (e) {
            log('Flash command rejected. Aborting.');
            return Promise.reject(e);
        }

        log(`Flashing... ${((i / firmware.length) * 100).toFixed(1)}%`, true);
    }
    log('Flashing... 100%', true)
    log('Successfully flashed firmware.');
    return Promise.resolve();
}

flashButton.addEventListener('click', async function () {
    flashButton.classList.add('disabled');
    if (rawFirmware.length > 0xefff) {
        log('Firmware file is too large. Aborting.');
        flashButton.classList.remove('disabled');
        return;
    }
    log('Connecting to the serial port...');
    const port = await connect();
    if (!port) {
        log('Failed to connect to the serial port.');
        flashButton.classList.remove('disabled');
        return;
    }

    try {
        const data = await readPacket(port, 0x18, 1000);
        if (data[0] == 0x18) {
            console.log('Received 0x18 packet. Radio is ready for flashing.');
            console.log('0x18 packet data: ', data);
            log('Radio in flash mode detected.');

            const response = await flash_init(port);
            if (flash_checkVersion(response, rawVersion)) {
                log('Version check passed.');
            } else {
                log('WARNING: Version check failed! Please select the correct version. Aborting.');
                return;
            }
            log('Flashing firmware...');
            await flash_flashFirmware(port, rawFirmware);

            return;
        } else {
            console.log('Received unexpected packet. Radio is not ready for flashing.');
            log('Wrong packet received, is the radio in flash mode?');
            console.log('Data: ', data);
            return;
        }
    } catch (error) {
        if (error !== 'Reader has been cancelled.') {
            console.error('Error:', error);
            log('Unusual error occured, check console for details.');
        } else {
            log('No data received, is the radio connected and in flash mode? Please try again.');
        }
        return;

    } finally {
        port.close();
        flashButton.classList.remove('disabled');
    }
});
