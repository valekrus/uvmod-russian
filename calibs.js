CalibModClasses = [
    class Mod_B0TXPower extends CalibMod {
        constructor(calibData) {
            super("Коэффициенты усиления передачи, диапазон 1", "Калибровка коэффициентов, влияющих на мощность передачи для 1 диапазона (по-умолчанию 50-76 МГц).");
            this.hidden = true;
            this.inputSteps = [
                addInputField(this.modSpecificDiv, ["Low", "HEX (3)"], ""),
                addInputField(this.modSpecificDiv, ["Mid", "HEX (3)"], ""),
                addInputField(this.modSpecificDiv, ["High", "HEX (3)"], ""),
            ];
        }

        load(calibData) {
            try {
                const offset = 0xD0;

                const modData = calibData.slice(offset, offset + this.inputSteps.length * 3);

                for (let i = 0; i < this.inputSteps.length; i++) {
                    this.inputSteps[i].value = uint8ArrayToHexString(modData.slice(i * 3, i * 3 + 3), ' ');
                }
            } catch (e) {
                this.error = true;
                log(`Error loading config: ${this.name}`);
                console.log(`Mod: ${this.name} Error: ${e}`);
                return false;
            }
            return true;
        }

        apply(calibData) {

            const offset = 0xD0;

            var data = '';


            for (let i = 0; i < this.inputSteps.length; i++) {
                data = data + (this.inputSteps[i].value.replace(/\s+/g, ''));
            }

            calibData = replaceSection(calibData, hexString(data), offset);

            log(`Success: ${this.name}.`);

            return calibData;
        }
    }
    ,
    class Mod_B1TXPower extends CalibMod {
        constructor(calibData) {
            super("Коэффициенты усиления передачи, диапазон 2", "Калибровка коэффициентов, влияющих на мощность передачи для 2 диапазона (по-умолчанию 108-136 МГц).");
            this.hidden = true;
            this.inputSteps = [
                addInputField(this.modSpecificDiv, ["Low", "HEX (3)"], ""),
                addInputField(this.modSpecificDiv, ["Mid", "HEX (3)"], ""),
                addInputField(this.modSpecificDiv, ["High", "HEX (3)"], ""),
            ];
        }

        load(calibData) {
            try {
                const offset = 0xE0;

                const modData = calibData.slice(offset, offset + this.inputSteps.length * 3);

                for (let i = 0; i < this.inputSteps.length; i++) {
                    this.inputSteps[i].value = uint8ArrayToHexString(modData.slice(i * 3, i * 3 + 3), ' ');
                }
            } catch (e) {
                this.error = true;
                log(`Error loading config: ${this.name}`);
                console.log(`Mod: ${this.name} Error: ${e}`);
                return false;
            }
            return true;
        }

        apply(calibData) {

            const offset = 0xE0;

            var data = '';


            for (let i = 0; i < this.inputSteps.length; i++) {
                data = data + (this.inputSteps[i].value.replace(/\s+/g, ''));
            }

            calibData = replaceSection(calibData, hexString(data), offset);

            log(`Success: ${this.name}.`);

            return calibData;
        }
    }
    ,
    class Mod_B2TXPower extends CalibMod {
        constructor(calibData) {
            super("Коэффициенты усиления передачи, диапазон 3", "Калибровка коэффициентов, влияющих на мощность передачи для 3 диапазона (по-умолчанию 136-174 МГц).");
            this.hidden = true;
            this.inputSteps = [
                addInputField(this.modSpecificDiv, ["Low", "HEX (3)"], ""),
                addInputField(this.modSpecificDiv, ["Mid", "HEX (3)"], ""),
                addInputField(this.modSpecificDiv, ["High", "HEX (3)"], ""),
            ];
        }

        load(calibData) {
            try {
                const offset = 0xF0;

                const modData = calibData.slice(offset, offset + this.inputSteps.length * 3);

                for (let i = 0; i < this.inputSteps.length; i++) {
                    this.inputSteps[i].value = uint8ArrayToHexString(modData.slice(i * 3, i * 3 + 3), ' ');
                }
            } catch (e) {
                this.error = true;
                log(`Error loading config: ${this.name}`);
                console.log(`Mod: ${this.name} Error: ${e}`);
                return false;
            }
            return true;
        }

        apply(calibData) {

            const offset = 0xF0;

            var data = '';


            for (let i = 0; i < this.inputSteps.length; i++) {
                data = data + (this.inputSteps[i].value.replace(/\s+/g, ''));
            }

            calibData = replaceSection(calibData, hexString(data), offset);

            log(`Success: ${this.name}.`);

            return calibData;
        }
    }
    ,
    class Mod_B3TXPower extends CalibMod {
        constructor(calibData) {
            super("Коэффициенты усиления передачи, диапазон 4", "Калибровка коэффициентов, влияющих на мощность передачи для 4 диапазона (по-умолчанию 174-350 МГц).");
            this.hidden = true;
            this.inputSteps = [
                addInputField(this.modSpecificDiv, ["Low", "HEX (3)"], ""),
                addInputField(this.modSpecificDiv, ["Mid", "HEX (3)"], ""),
                addInputField(this.modSpecificDiv, ["High", "HEX (3)"], ""),
            ];
        }

        load(calibData) {
            try {
                const offset = 0x100;

                const modData = calibData.slice(offset, offset + this.inputSteps.length * 3);

                for (let i = 0; i < this.inputSteps.length; i++) {
                    this.inputSteps[i].value = uint8ArrayToHexString(modData.slice(i * 3, i * 3 + 3), ' ');
                }
            } catch (e) {
                this.error = true;
                log(`Error loading config: ${this.name}`);
                console.log(`Mod: ${this.name} Error: ${e}`);
                return false;
            }
            return true;
        }

        apply(calibData) {

            const offset = 0x100;

            var data = '';


            for (let i = 0; i < this.inputSteps.length; i++) {
                data = data + (this.inputSteps[i].value.replace(/\s+/g, ''));
            }

            calibData = replaceSection(calibData, hexString(data), offset);

            log(`Success: ${this.name}.`);

            return calibData;
        }
    }
    ,
    class Mod_B4TXPower extends CalibMod {
        constructor(calibData) {
            super("Коэффициенты усиления передачи, диапазон 5", "Калибровка коэффициентов, влияющих на мощность передачи для 5 диапазона (по-умолчанию 350-400 МГц).");
            this.hidden = true;
            this.inputSteps = [
                addInputField(this.modSpecificDiv, ["Low", "HEX (3)"], ""),
                addInputField(this.modSpecificDiv, ["Mid", "HEX (3)"], ""),
                addInputField(this.modSpecificDiv, ["High", "HEX (3)"], ""),
            ];
        }

        load(calibData) {
            try {
                const offset = 0x110;

                const modData = calibData.slice(offset, offset + this.inputSteps.length * 3);

                for (let i = 0; i < this.inputSteps.length; i++) {
                    this.inputSteps[i].value = uint8ArrayToHexString(modData.slice(i * 3, i * 3 + 3), ' ');
                }
            } catch (e) {
                this.error = true;
                log(`Error loading config: ${this.name}`);
                console.log(`Mod: ${this.name} Error: ${e}`);
                return false;
            }
            return true;
        }

        apply(calibData) {

            const offset = 0x110;

            var data = '';


            for (let i = 0; i < this.inputSteps.length; i++) {
                data = data + (this.inputSteps[i].value.replace(/\s+/g, ''));
            }

            calibData = replaceSection(calibData, hexString(data), offset);

            log(`Success: ${this.name}.`);

            return calibData;
        }
    }
    ,
    class Mod_B5TXPower extends CalibMod {
        constructor(calibData) {
            super("Коэффициенты усиления передачи, диапазон 6", "Калибровка коэффициентов, влияющих на мощность передачи для 6 диапазона (по-умолчанию 400-470 МГц).");
            this.hidden = true;
            this.inputSteps = [
                addInputField(this.modSpecificDiv, ["Low", "HEX (3)"], ""),
                addInputField(this.modSpecificDiv, ["Mid", "HEX (3)"], ""),
                addInputField(this.modSpecificDiv, ["High", "HEX (3)"], ""),
            ];
        }

        load(calibData) {
            try {
                const offset = 0x120;

                const modData = calibData.slice(offset, offset + this.inputSteps.length * 3);

                for (let i = 0; i < this.inputSteps.length; i++) {
                    this.inputSteps[i].value = uint8ArrayToHexString(modData.slice(i * 3, i * 3 + 3), ' ');
                }
            } catch (e) {
                this.error = true;
                log(`Error loading config: ${this.name}`);
                console.log(`Mod: ${this.name} Error: ${e}`);
                return false;
            }
            return true;
        }

        apply(calibData) {

            const offset = 0x120;

            var data = '';


            for (let i = 0; i < this.inputSteps.length; i++) {
                data = data + (this.inputSteps[i].value.replace(/\s+/g, ''));
            }

            calibData = replaceSection(calibData, hexString(data), offset);

            log(`Success: ${this.name}.`);

            return calibData;
        }
    }
    ,
    class Mod_B6TXPower extends CalibMod {
        constructor(calibData) {
            super("Коэффициенты усиления передачи, диапазон 7", "Калибровка коэффициентов, влияющих на мощность передачи для 7 диапазона (по-умолчанию 470-600 МГц).");
            this.hidden = true;
            this.inputSteps = [
                addInputField(this.modSpecificDiv, ["Low", "HEX (3)"], ""),
                addInputField(this.modSpecificDiv, ["Mid", "HEX (3)"], ""),
                addInputField(this.modSpecificDiv, ["High", "HEX (3)"], ""),
            ];
        }

        load(calibData) {
            try {
                const offset = 0x130;

                const modData = calibData.slice(offset, offset + this.inputSteps.length * 3);

                for (let i = 0; i < this.inputSteps.length; i++) {
                    this.inputSteps[i].value = uint8ArrayToHexString(modData.slice(i * 3, i * 3 + 3), ' ');
                }
            } catch (e) {
                this.error = true;
                log(`Error loading config: ${this.name}`);
                console.log(`Mod: ${this.name} Error: ${e}`);
                return false;
            }
            return true;
        }

        apply(calibData) {

            const offset = 0x130;

            var data = '';


            for (let i = 0; i < this.inputSteps.length; i++) {
                data = data + (this.inputSteps[i].value.replace(/\s+/g, ''));
            }

            calibData = replaceSection(calibData, hexString(data), offset);

            log(`Success: ${this.name}.`);

            return calibData;
        }
    }
    ,
    class Mod_UHFSQLRSSIThresholds extends CalibMod {
        constructor(calibData) {
            super("Пороги шумодава UHF по RSSI", "Калибровка порогов шумодава по мощности принимаемого сигнала (RSSI).");
            this.inputSteps = [
                addTwoInputFields(this.modSpecificDiv, ["Открытие, dB:","Закрытие, dB:","SQL0"], "", ""),
                addTwoInputFields(this.modSpecificDiv, ["Открытие, dB:","Закрытие, dB:","SQL1"], "", ""),
                addTwoInputFields(this.modSpecificDiv, ["Открытие, dB:","Закрытие, dB:","SQL2"], "", ""),
                addTwoInputFields(this.modSpecificDiv, ["Открытие, dB:","Закрытие, dB:","SQL3"], "", ""),
                addTwoInputFields(this.modSpecificDiv, ["Открытие, dB:","Закрытие, dB:","SQL4"], "", ""),
                addTwoInputFields(this.modSpecificDiv, ["Открытие, dB:","Закрытие, dB:","SQL5"], "", ""),
                addTwoInputFields(this.modSpecificDiv, ["Открытие, dB:","Закрытие, dB:","SQL6"], "", ""),
                addTwoInputFields(this.modSpecificDiv, ["Открытие, dB:","Закрытие, dB:","SQL7"], "", ""),
                addTwoInputFields(this.modSpecificDiv, ["Открытие, dB:","Закрытие, dB:","SQL8"], "", ""),
                addTwoInputFields(this.modSpecificDiv, ["Открытие, dB:","Закрытие, dB:","SQL9"], "", ""),
            ];
        }

        load(calibData) {
            try {
                const offset = 0x0;

                const dataViewStart = new DataView(calibData.buffer, offset, this.inputSteps.length);
                const dataViewEnd = new DataView(calibData.buffer, offset + 0x10, this.inputSteps.length);

                for (let i = 0; i < this.inputSteps.length; i++) {
                    this.inputSteps[i][0].value = dataViewStart.getUint8(i)/2 - 160;
                    this.inputSteps[i][1].value = dataViewEnd.getUint8(i)/2 - 160;
                }
            } catch (e) {
                this.error = true;
                log(`Error loading config: ${this.name}`);
                console.log(`Mod: ${this.name} Error: ${e}`);
                return false;
            }
            return true;
        }

        apply(calibData) {
            const offset = 0x0;

            // Create a buffer with the specified values
            const bufferStart = new ArrayBuffer(this.inputSteps.length);
            const dataViewStart = new DataView(bufferStart);
            const bufferEnd = new ArrayBuffer(this.inputSteps.length);
            const dataViewEnd = new DataView(bufferEnd);

            // Set each step at their respective offsets
            for (let i = 0; i < this.inputSteps.length; i++) {
                dataViewStart.setUint8(i, (parseFloat(this.inputSteps[i][0].value) + 160) * 2);
                dataViewEnd.setUint8(i, (parseFloat(this.inputSteps[i][1].value) + 160) * 2);
            }

            // Convert the buffer to a Uint8Array
            const stepsHexStart = new Uint8Array(bufferStart);
            const stepsHexEnd = new Uint8Array(bufferEnd);

            // Replace the 14-byte section at the offset with the new buffer
            calibData = replaceSection(calibData, stepsHexStart, offset);
            calibData = replaceSection(calibData, stepsHexEnd, offset + 0x10);

            log(`Success: ${this.name}.`);

            return calibData;
        }
    }
    ,
    class Mod_UHFSQLNoiseThresholds extends CalibMod {
        constructor(calibData) {
            super("Пороги шумодава UHF по шуму", "Калибровка порогов шумодава по шуму.");
            this.inputSteps = [
                addTwoInputFields(this.modSpecificDiv, ["Открытие:","Закрытие:","SQL0"], "", ""),
                addTwoInputFields(this.modSpecificDiv, ["Открытие:","Закрытие:","SQL1"], "", ""),
                addTwoInputFields(this.modSpecificDiv, ["Открытие:","Закрытие:","SQL2"], "", ""),
                addTwoInputFields(this.modSpecificDiv, ["Открытие:","Закрытие:","SQL3"], "", ""),
                addTwoInputFields(this.modSpecificDiv, ["Открытие:","Закрытие:","SQL4"], "", ""),
                addTwoInputFields(this.modSpecificDiv, ["Открытие:","Закрытие:","SQL5"], "", ""),
                addTwoInputFields(this.modSpecificDiv, ["Открытие:","Закрытие:","SQL6"], "", ""),
                addTwoInputFields(this.modSpecificDiv, ["Открытие:","Закрытие:","SQL7"], "", ""),
                addTwoInputFields(this.modSpecificDiv, ["Открытие:","Закрытие:","SQL8"], "", ""),
                addTwoInputFields(this.modSpecificDiv, ["Открытие:","Закрытие:","SQL9"], "", ""),
            ];
        }

        load(calibData) {
            try {
                const offset = 0x20;

                const dataViewStart = new DataView(calibData.buffer, offset, this.inputSteps.length);
                const dataViewEnd = new DataView(calibData.buffer, offset + 0x10, this.inputSteps.length);

                for (let i = 0; i < this.inputSteps.length; i++) {
                    this.inputSteps[i][0].value = dataViewStart.getUint8(i);
                    this.inputSteps[i][1].value = dataViewEnd.getUint8(i);
                }
            } catch (e) {
                this.error = true;
                log(`Error loading config: ${this.name}`);
                console.log(`Mod: ${this.name} Error: ${e}`);
                return false;
            }
            return true;
        }

        apply(calibData) {
            const offset = 0x20;

            // Create a buffer with the specified values
            const bufferStart = new ArrayBuffer(this.inputSteps.length);
            const dataViewStart = new DataView(bufferStart);
            const bufferEnd = new ArrayBuffer(this.inputSteps.length);
            const dataViewEnd = new DataView(bufferEnd);

            // Set each step at their respective offsets
            for (let i = 0; i < this.inputSteps.length; i++) {
                dataViewStart.setUint8(i, parseInt(this.inputSteps[i][0].value));
                dataViewEnd.setUint8(i, parseInt(this.inputSteps[i][1].value));
            }

            // Convert the buffer to a Uint8Array
            const stepsHexStart = new Uint8Array(bufferStart);
            const stepsHexEnd = new Uint8Array(bufferEnd);

            // Replace the 14-byte section at the offset with the new buffer
            calibData = replaceSection(calibData, stepsHexStart, offset);
            calibData = replaceSection(calibData, stepsHexEnd, offset + 0x10);

            log(`Success: ${this.name}.`);

            return calibData;
        }
    }
    ,
    class Mod_UHFSQLGlitchThresholds extends CalibMod {
        constructor(calibData) {
            super("Пороги шумодава UHF по импульсным помехам", "Калибровка порогов шумодава по импульсным помехам.");
            this.inputSteps = [
                addTwoInputFields(this.modSpecificDiv, ["Открытие:","Закрытие:","SQL0"], "", ""),
                addTwoInputFields(this.modSpecificDiv, ["Открытие:","Закрытие:","SQL1"], "", ""),
                addTwoInputFields(this.modSpecificDiv, ["Открытие:","Закрытие:","SQL2"], "", ""),
                addTwoInputFields(this.modSpecificDiv, ["Открытие:","Закрытие:","SQL3"], "", ""),
                addTwoInputFields(this.modSpecificDiv, ["Открытие:","Закрытие:","SQL4"], "", ""),
                addTwoInputFields(this.modSpecificDiv, ["Открытие:","Закрытие:","SQL5"], "", ""),
                addTwoInputFields(this.modSpecificDiv, ["Открытие:","Закрытие:","SQL6"], "", ""),
                addTwoInputFields(this.modSpecificDiv, ["Открытие:","Закрытие:","SQL7"], "", ""),
                addTwoInputFields(this.modSpecificDiv, ["Открытие:","Закрытие:","SQL8"], "", ""),
                addTwoInputFields(this.modSpecificDiv, ["Открытие:","Закрытие:","SQL9"], "", ""),
            ];
        }

        load(calibData) {
            try {
                const offset = 0x40;

                const dataViewStart = new DataView(calibData.buffer, offset, this.inputSteps.length);
                const dataViewEnd = new DataView(calibData.buffer, offset + 0x10, this.inputSteps.length);

                for (let i = 0; i < this.inputSteps.length; i++) {
                    this.inputSteps[i][0].value = dataViewStart.getUint8(i);
                    this.inputSteps[i][1].value = dataViewEnd.getUint8(i);
                }
            } catch (e) {
                this.error = true;
                log(`Error loading config: ${this.name}`);
                console.log(`Mod: ${this.name} Error: ${e}`);
                return false;
            }
            return true;
        }

        apply(calibData) {
            const offset = 0x40;

            // Create a buffer with the specified values
            const bufferStart = new ArrayBuffer(this.inputSteps.length);
            const dataViewStart = new DataView(bufferStart);
            const bufferEnd = new ArrayBuffer(this.inputSteps.length);
            const dataViewEnd = new DataView(bufferEnd);

            // Set each step at their respective offsets
            for (let i = 0; i < this.inputSteps.length; i++) {
                dataViewStart.setUint8(i, parseInt(this.inputSteps[i][0].value));
                dataViewEnd.setUint8(i, parseInt(this.inputSteps[i][1].value));
            }

            // Convert the buffer to a Uint8Array
            const stepsHexStart = new Uint8Array(bufferStart);
            const stepsHexEnd = new Uint8Array(bufferEnd);

            // Replace the 14-byte section at the offset with the new buffer
            calibData = replaceSection(calibData, stepsHexStart, offset);
            calibData = replaceSection(calibData, stepsHexEnd, offset + 0x10);

            log(`Success: ${this.name}.`);

            return calibData;
        }
    }
    ,
    class Mod_VHFSQLRSSIThresholds extends CalibMod {
        constructor(calibData) {
            super("Пороги шумодава VHF по RSSI", "Калибровка порогов шумодава по мощности принимаемого сигнала (RSSI).");
            this.inputSteps = [
                addTwoInputFields(this.modSpecificDiv, ["Открытие, dB:","Закрытие, dB:","SQL0"], "", ""),
                addTwoInputFields(this.modSpecificDiv, ["Открытие, dB:","Закрытие, dB:","SQL1"], "", ""),
                addTwoInputFields(this.modSpecificDiv, ["Открытие, dB:","Закрытие, dB:","SQL2"], "", ""),
                addTwoInputFields(this.modSpecificDiv, ["Открытие, dB:","Закрытие, dB:","SQL3"], "", ""),
                addTwoInputFields(this.modSpecificDiv, ["Открытие, dB:","Закрытие, dB:","SQL4"], "", ""),
                addTwoInputFields(this.modSpecificDiv, ["Открытие, dB:","Закрытие, dB:","SQL5"], "", ""),
                addTwoInputFields(this.modSpecificDiv, ["Открытие, dB:","Закрытие, dB:","SQL6"], "", ""),
                addTwoInputFields(this.modSpecificDiv, ["Открытие, dB:","Закрытие, dB:","SQL7"], "", ""),
                addTwoInputFields(this.modSpecificDiv, ["Открытие, dB:","Закрытие, dB:","SQL8"], "", ""),
                addTwoInputFields(this.modSpecificDiv, ["Открытие, dB:","Закрытие, dB:","SQL9"], "", ""),
            ];
        }

        load(calibData) {
            try {
                const offset = 0x60;

                const dataViewStart = new DataView(calibData.buffer, offset, this.inputSteps.length);
                const dataViewEnd = new DataView(calibData.buffer, offset + 0x10, this.inputSteps.length);

                for (let i = 0; i < this.inputSteps.length; i++) {
                    this.inputSteps[i][0].value = dataViewStart.getUint8(i)/2 - 160;
                    this.inputSteps[i][1].value = dataViewEnd.getUint8(i)/2 - 160;
                }
            } catch (e) {
                this.error = true;
                log(`Error loading config: ${this.name}`);
                console.log(`Mod: ${this.name} Error: ${e}`);
                return false;
            }
            return true;
        }

        apply(calibData) {
            const offset = 0x60;

            // Create a buffer with the specified values
            const bufferStart = new ArrayBuffer(this.inputSteps.length);
            const dataViewStart = new DataView(bufferStart);
            const bufferEnd = new ArrayBuffer(this.inputSteps.length);
            const dataViewEnd = new DataView(bufferEnd);

            // Set each step at their respective offsets
            for (let i = 0; i < this.inputSteps.length; i++) {
                dataViewStart.setUint8(i, (parseFloat(this.inputSteps[i][0].value) + 160) * 2);
                dataViewEnd.setUint8(i, (parseFloat(this.inputSteps[i][1].value) + 160) * 2);
            }

            // Convert the buffer to a Uint8Array
            const stepsHexStart = new Uint8Array(bufferStart);
            const stepsHexEnd = new Uint8Array(bufferEnd);

            // Replace the 14-byte section at the offset with the new buffer
            calibData = replaceSection(calibData, stepsHexStart, offset);
            calibData = replaceSection(calibData, stepsHexEnd, offset + 0x10);

            log(`Success: ${this.name}.`);

            return calibData;
        }
    }
    ,
    class Mod_VHFSQLNoiseThresholds extends CalibMod {
        constructor(calibData) {
            super("Пороги шумодава VHF по шуму", "Калибровка порогов шумодава по шуму.");
            this.inputSteps = [
                addTwoInputFields(this.modSpecificDiv, ["Открытие:","Закрытие:","SQL0"], "", ""),
                addTwoInputFields(this.modSpecificDiv, ["Открытие:","Закрытие:","SQL1"], "", ""),
                addTwoInputFields(this.modSpecificDiv, ["Открытие:","Закрытие:","SQL2"], "", ""),
                addTwoInputFields(this.modSpecificDiv, ["Открытие:","Закрытие:","SQL3"], "", ""),
                addTwoInputFields(this.modSpecificDiv, ["Открытие:","Закрытие:","SQL4"], "", ""),
                addTwoInputFields(this.modSpecificDiv, ["Открытие:","Закрытие:","SQL5"], "", ""),
                addTwoInputFields(this.modSpecificDiv, ["Открытие:","Закрытие:","SQL6"], "", ""),
                addTwoInputFields(this.modSpecificDiv, ["Открытие:","Закрытие:","SQL7"], "", ""),
                addTwoInputFields(this.modSpecificDiv, ["Открытие:","Закрытие:","SQL8"], "", ""),
                addTwoInputFields(this.modSpecificDiv, ["Открытие:","Закрытие:","SQL9"], "", ""),
            ];
        }

        load(calibData) {
            try {
                const offset = 0x80;

                const dataViewStart = new DataView(calibData.buffer, offset, this.inputSteps.length);
                const dataViewEnd = new DataView(calibData.buffer, offset + 0x10, this.inputSteps.length);

                for (let i = 0; i < this.inputSteps.length; i++) {
                    this.inputSteps[i][0].value = dataViewStart.getUint8(i);
                    this.inputSteps[i][1].value = dataViewEnd.getUint8(i);
                }
            } catch (e) {
                this.error = true;
                log(`Error loading config: ${this.name}`);
                console.log(`Mod: ${this.name} Error: ${e}`);
                return false;
            }
            return true;
        }

        apply(calibData) {
            const offset = 0x80;

            // Create a buffer with the specified values
            const bufferStart = new ArrayBuffer(this.inputSteps.length);
            const dataViewStart = new DataView(bufferStart);
            const bufferEnd = new ArrayBuffer(this.inputSteps.length);
            const dataViewEnd = new DataView(bufferEnd);

            // Set each step at their respective offsets
            for (let i = 0; i < this.inputSteps.length; i++) {
                dataViewStart.setUint8(i, parseInt(this.inputSteps[i][0].value));
                dataViewEnd.setUint8(i, parseInt(this.inputSteps[i][1].value));
            }

            // Convert the buffer to a Uint8Array
            const stepsHexStart = new Uint8Array(bufferStart);
            const stepsHexEnd = new Uint8Array(bufferEnd);

            // Replace the 14-byte section at the offset with the new buffer
            calibData = replaceSection(calibData, stepsHexStart, offset);
            calibData = replaceSection(calibData, stepsHexEnd, offset + 0x10);

            log(`Success: ${this.name}.`);

            return calibData;
        }
    }
    ,
    class Mod_VHFSQLGlitchThresholds extends CalibMod {
        constructor(calibData) {
            super("Пороги шумодава VHF по импульсным помехам", "Калибровка порогов шумодава по импульсным помехам.");
            this.inputSteps = [
                addTwoInputFields(this.modSpecificDiv, ["Открытие:","Закрытие:","SQL0"], "", ""),
                addTwoInputFields(this.modSpecificDiv, ["Открытие:","Закрытие:","SQL1"], "", ""),
                addTwoInputFields(this.modSpecificDiv, ["Открытие:","Закрытие:","SQL2"], "", ""),
                addTwoInputFields(this.modSpecificDiv, ["Открытие:","Закрытие:","SQL3"], "", ""),
                addTwoInputFields(this.modSpecificDiv, ["Открытие:","Закрытие:","SQL4"], "", ""),
                addTwoInputFields(this.modSpecificDiv, ["Открытие:","Закрытие:","SQL5"], "", ""),
                addTwoInputFields(this.modSpecificDiv, ["Открытие:","Закрытие:","SQL6"], "", ""),
                addTwoInputFields(this.modSpecificDiv, ["Открытие:","Закрытие:","SQL7"], "", ""),
                addTwoInputFields(this.modSpecificDiv, ["Открытие:","Закрытие:","SQL8"], "", ""),
                addTwoInputFields(this.modSpecificDiv, ["Открытие:","Закрытие:","SQL9"], "", ""),
            ];
        }

        load(calibData) {
            try {
                const offset = 0xA0;

                const dataViewStart = new DataView(calibData.buffer, offset, this.inputSteps.length);
                const dataViewEnd = new DataView(calibData.buffer, offset + 0x10, this.inputSteps.length);

                for (let i = 0; i < this.inputSteps.length; i++) {
                    this.inputSteps[i][0].value = dataViewStart.getUint8(i);
                    this.inputSteps[i][1].value = dataViewEnd.getUint8(i);
                }
            } catch (e) {
                this.error = true;
                log(`Error loading config: ${this.name}`);
                console.log(`Mod: ${this.name} Error: ${e}`);
                return false;
            }
            return true;
        }

        apply(calibData) {
            const offset = 0xA0;

            // Create a buffer with the specified values
            const bufferStart = new ArrayBuffer(this.inputSteps.length);
            const dataViewStart = new DataView(bufferStart);
            const bufferEnd = new ArrayBuffer(this.inputSteps.length);
            const dataViewEnd = new DataView(bufferEnd);

            // Set each step at their respective offsets
            for (let i = 0; i < this.inputSteps.length; i++) {
                dataViewStart.setUint8(i, parseInt(this.inputSteps[i][0].value));
                dataViewEnd.setUint8(i, parseInt(this.inputSteps[i][1].value));
            }

            // Convert the buffer to a Uint8Array
            const stepsHexStart = new Uint8Array(bufferStart);
            const stepsHexEnd = new Uint8Array(bufferEnd);

            // Replace the 14-byte section at the offset with the new buffer
            calibData = replaceSection(calibData, stepsHexStart, offset);
            calibData = replaceSection(calibData, stepsHexEnd, offset + 0x10);

            log(`Success: ${this.name}.`);

            return calibData;
        }
    }
    ,
    class Mod_BatteryLevels extends CalibMod {
        constructor(calibData) {
            super("Уровни заряда батареи", "Изменить отображаемые уровни заряда батареи. Значения в единицах от АЦП.");
            this.inputSteps = [
                addInputField(this.modSpecificDiv, ["Battery L1", "ед"], ""),
                addInputField(this.modSpecificDiv, ["Battery L2", "ед"], ""),
                addInputField(this.modSpecificDiv, ["Battery L3", "ед"], ""),
                addInputField(this.modSpecificDiv, ["Battery L4", "ед"], ""),
                addInputField(this.modSpecificDiv, ["Battery L5", "ед"], ""),
                addInputField(this.modSpecificDiv, ["Battery L6", "ед"], ""),
            ];
        }

        load(calibData) {
            try {
                const offset = 0x140;

                const dataView = new DataView(calibData.buffer, offset, this.inputSteps.length * 2);

                for (let i = 0; i < this.inputSteps.length; i++) {
                    this.inputSteps[i].value = dataView.getUint16(i * 2, true); // true indicates little-endian byte order
                }
            } catch (e) {
                this.error = true;
                log(`Error loading config: ${this.name}`);
                console.log(`Mod: ${this.name} Error: ${e}`);
                return false;
            }
            return true;
        }

        apply(calibData) {

            const offset = 0x140;

            // Create a buffer with the specified values
            const buffer = new ArrayBuffer(this.inputSteps.length * 2);
            const dataView = new DataView(buffer);

            // Set each step at their respective offsets
            for (let i = 0; i < this.inputSteps.length; i++) {
                dataView.setUint16(i * 2, parseInt(this.inputSteps[i].value), true); // true indicates little-endian byte order
            }

            // Convert the buffer to a Uint8Array
            const stepsHex = new Uint8Array(buffer);

            // Replace the 14-byte section at the offset with the new buffer
            calibData = replaceSection(calibData, stepsHex, offset);

            log(`Success: ${this.name}.`);

            return calibData;
        }
    }
    ,
    class Mod_RSSILevels extends CalibMod {
        constructor(calibData) {
            super("Уровни RSSI", "Изменить отображаемые уровни показателя мощности принимаемого сигнала (RSSI).");
            this.inputSteps = [
                addInputField(this.modSpecificDiv, ["RSSI L1 UHF", "dB"], ""),
                addInputField(this.modSpecificDiv, ["RSSI L2 UHF", "dB"], ""),
                addInputField(this.modSpecificDiv, ["RSSI L4 UHF", "dB"], ""),
                addInputField(this.modSpecificDiv, ["RSSI L6 UHF", "dB"], ""),
                addInputField(this.modSpecificDiv, ["RSSI L1 VHF", "dB"], ""),
                addInputField(this.modSpecificDiv, ["RSSI L2 VHF", "dB"], ""),
                addInputField(this.modSpecificDiv, ["RSSI L4 VHF", "dB"], ""),
                addInputField(this.modSpecificDiv, ["RSSI L6 VHF", "dB"], ""),
            ];
        }

        load(calibData) {
            try {
                const offset = 0xC0;

                const dataView = new DataView(calibData.buffer, offset, this.inputSteps.length * 2);

                for (let i = 0; i < this.inputSteps.length; i++) {
                    this.inputSteps[i].value = dataView.getUint16(i * 2, true)/2 - 160; // true indicates little-endian byte order
                }
            } catch (e) {
                this.error = true;
                log(`Error loading config: ${this.name}`);
                console.log(`Mod: ${this.name} Error: ${e}`);
                return false;
            }
            return true;
        }

        apply(calibData) {

            const offset = 0xC0;

            // Create a buffer with the specified values
            const buffer = new ArrayBuffer(this.inputSteps.length * 2);
            const dataView = new DataView(buffer);

            // Set each step at their respective offsets
            for (let i = 0; i < this.inputSteps.length; i++) {
                dataView.setUint16(i * 2, (parseInt(this.inputSteps[i].value, 10) + 160) * 2, true); // true indicates little-endian byte order
            }

            // Convert the buffer to a Uint8Array
            const stepsHex = new Uint8Array(buffer);

            // Replace the 14-byte section at the offset with the new buffer
            calibData = replaceSection(calibData, stepsHex, offset);

            log(`Success: ${this.name}.`);

            return calibData;
        }
    }
    ,
    class Mod_VOX0Levels extends CalibMod {
        constructor(calibData) {
            super("Уровни VOX0", "Изменить уровни VOX0.");
            this.inputSteps = [
                addInputField(this.modSpecificDiv, ["VOX0 L1", "ед"], ""),
                addInputField(this.modSpecificDiv, ["VOX0 L2", "ед"], ""),
                addInputField(this.modSpecificDiv, ["VOX0 L3", "ед"], ""),
                addInputField(this.modSpecificDiv, ["VOX0 L4", "ед"], ""),
                addInputField(this.modSpecificDiv, ["VOX0 L5", "ед"], ""),
                addInputField(this.modSpecificDiv, ["VOX0 L6", "ед"], ""),
                addInputField(this.modSpecificDiv, ["VOX0 L7", "ед"], ""),
                addInputField(this.modSpecificDiv, ["VOX0 L8", "ед"], ""),
                addInputField(this.modSpecificDiv, ["VOX0 L9", "ед"], ""),
                addInputField(this.modSpecificDiv, ["VOX0 L10", "ед"], ""),
            ];
        }

        load(calibData) {
            try {
                const offset = 0x168;

                const dataView = new DataView(calibData.buffer, offset, this.inputSteps.length * 2);

                for (let i = 0; i < this.inputSteps.length; i++) {
                    this.inputSteps[i].value = dataView.getUint16(i * 2, true); // true indicates little-endian byte order
                }
            } catch (e) {
                this.error = true;
                log(`Error loading config: ${this.name}`);
                console.log(`Mod: ${this.name} Error: ${e}`);
                return false;
            }
            return true;
        }

        apply(calibData) {

            const offset = 0x168;

            // Create a buffer with the specified values
            const buffer = new ArrayBuffer(this.inputSteps.length * 2);
            const dataView = new DataView(buffer);

            // Set each step at their respective offsets
            for (let i = 0; i < this.inputSteps.length; i++) {
                dataView.setUint16(i * 2, parseInt(this.inputSteps[i].value), true); // true indicates little-endian byte order
            }

            // Convert the buffer to a Uint8Array
            const stepsHex = new Uint8Array(buffer);

            // Replace the 14-byte section at the offset with the new buffer
            calibData = replaceSection(calibData, stepsHex, offset);

            log(`Success: ${this.name}.`);

            return calibData;
        }
    }
    ,
    class Mod_VOX1Levels extends CalibMod {
        constructor(calibData) {
            super("Уровни VOX1", "Изменить уровни VOX1.");
            this.inputSteps = [
                addInputField(this.modSpecificDiv, ["VOX1 L1", "ед"], ""),
                addInputField(this.modSpecificDiv, ["VOX1 L2", "ед"], ""),
                addInputField(this.modSpecificDiv, ["VOX1 L3", "ед"], ""),
                addInputField(this.modSpecificDiv, ["VOX1 L4", "ед"], ""),
                addInputField(this.modSpecificDiv, ["VOX1 L5", "ед"], ""),
                addInputField(this.modSpecificDiv, ["VOX1 L6", "ед"], ""),
                addInputField(this.modSpecificDiv, ["VOX1 L7", "ед"], ""),
                addInputField(this.modSpecificDiv, ["VOX1 L8", "ед"], ""),
                addInputField(this.modSpecificDiv, ["VOX1 L9", "ед"], ""),
                addInputField(this.modSpecificDiv, ["VOX1 L10", "ед"], ""),
            ];
        }

        load(calibData) {
            try {
                const offset = 0x150;

                const dataView = new DataView(calibData.buffer, offset, this.inputSteps.length * 2);

                for (let i = 0; i < this.inputSteps.length; i++) {
                    this.inputSteps[i].value = dataView.getUint16(i * 2, true); // true indicates little-endian byte order
                }
            } catch (e) {
                this.error = true;
                log(`Error loading config: ${this.name}`);
                console.log(`Mod: ${this.name} Error: ${e}`);
                return false;
            }
            return true;
        }

        apply(calibData) {

            const offset = 0x150;

            // Create a buffer with the specified values
            const buffer = new ArrayBuffer(this.inputSteps.length * 2);
            const dataView = new DataView(buffer);

            // Set each step at their respective offsets
            for (let i = 0; i < this.inputSteps.length; i++) {
                dataView.setUint16(i * 2, parseInt(this.inputSteps[i].value), true); // true indicates little-endian byte order
            }

            // Convert the buffer to a Uint8Array
            const stepsHex = new Uint8Array(buffer);

            // Replace the 14-byte section at the offset with the new buffer
            calibData = replaceSection(calibData, stepsHex, offset);

            log(`Success: ${this.name}.`);

            return calibData;
        }
    }
    ,
]