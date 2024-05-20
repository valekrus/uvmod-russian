ConfigModClasses = [
    class Mod_SavedChannels extends ConfigMod {
        constructor() {
            super("Сохранённые каналы (только чтение)", "Управление ячейками памяти с сохранёнными каналами.");
            this.channels = [];
        }

        load(configData) {
            try {
                const offsetChannels = 0x0;
                const offsetAttribs = 0xd60;
                const offsetNames = 0xf50;
                const size = 200;

                const dataViewChannels = new DataView(configData.buffer, offsetChannels, size * 16);
                const dataViewAttribs = new DataView(configData.buffer, offsetAttribs, size);
                const dataViewNames = new DataView(configData.buffer, offsetNames, size * 16);

                const zeroPad = (num, places) => String(num).padStart(places, '0');

                for (let i = 0; i < size; i++) {
                    const freq = dataViewChannels.getUint32(i * 16, true);
                    if (freq != 4294967295) {
//                        const name = dataViewNames.getUint32(i * 16 + 4, true);
                        const chOffset = dataViewChannels.getUint32(i * 16 + 4, true);
                        const num = zeroPad(parseInt(1 + parseInt(i)), 3);
                        const flags = dataViewChannels.getUint8(i * 16 + 4, true);

                        this.channels[i] = addTwoInputFields(this.modSpecificDiv, ["Канал " + num + ". Частота:", "Сдвиг:", ""], freq, chOffset);
/*
                        const inputGroup = this.channels[i][0].parentElement;
                        const nameSpan = document.createElement("span");
                        inputGroup.insertBefore(nameSpan, this.channels[i][0]);
*/
                    }
                }
            } catch (e) {
                this.error = true;
                log(`Error loading config: ${this.name}`);
                console.log(`Mod: ${this.name} Error: ${e}`);
                return false;
            }
            return true;
        }

        apply(configData) {
/*
            const offset = 0xC0;

            // Create a buffer with the specified values
            const buffer = new ArrayBuffer(this.inputSteps.length * 2);
            const dataView = new DataView(buffer);

            // Set each step at their respective offsets
            for (let i = 0; i < this.inputSteps.length; i++) {
                dataView.setUint16(i * 2, this.inputSteps[i].value, true); // true indicates little-endian byte order
            }

            // Convert the buffer to a Uint8Array
            const stepsHex = new Uint8Array(buffer);

            // Replace the 14-byte section at the offset with the new buffer
            calibData = replaceSection(calibData, stepsHex, offset);

            log(`Success: ${this.name}.`);
*/
            return configData;
        }
    }
    ,
]