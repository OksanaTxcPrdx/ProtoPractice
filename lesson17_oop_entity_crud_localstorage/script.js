const plantSelect = document.getElementById('plant-type-select');
const plantNameInput = document.getElementById('plant-name-input');
const plantAgeInput = document.getElementById('plant-age-input');
const plantAreaInput = document.getElementById('plant-area-input');
const plantIsToxicChb = document.getElementById('plant-is-toxic-checkbox');
const dynamicFields = document.querySelector('.dynamic-fields');
const saveBtn = document.getElementById('save-btn');
const plantsTable = document.querySelector('table');

class Plant {

    constructor(name, age, area, isToxic) {
        this._name = name;
        this._age = age;
        this._area = area;
        this._isToxic = isToxic;
    }

    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }

    get age() {
        return this._age;
    }
    set age(value) {
        this._age = value;
    }

    get area() {
        return this._area;
    }
    set area(value) {
        this._area = value;
    }

    get isToxic() {
        return this._isToxic;
    }
    set isToxic(value) {
        this._isToxic = value;
    }

    deleteFormStorage() {
        console.log('plant del');
    }
}

class Fern extends Plant {
    constructor(name, age, area, isToxic, fondsLength, habitat) {
        super(name, age, area, isToxic);
        this.fondsLength = fondsLength;
        this.habitat = habitat;
    }
    deleteFormStorage() {
        console.log('fern del');
    }
}

class Spruse extends Plant {
    constructor(name, age, area, isToxic, needlsLength, frostResistance) {
        super(name, age, area, isToxic);
        this.needlsLength = needlsLength;
        this.frostResistance = frostResistance;
    }

    deleteFormStorage() {
        console.log('spruse del');
    }
}

const fillDynamicFields = function (lbl, input) {
    const formGroupWrapper = document.createElement('div');
    formGroupWrapper.classList.add('form-group');
    formGroupWrapper.append(lbl, input);

    dynamicFields.append(formGroupWrapper);
}

const placeFernFields = function () {
    dynamicFields.textContent = '';
    const fernFondsLengthLbl = document.createElement('label');
    fernFondsLengthLbl.textContent = 'Длина вий';
    const fernHabitatLbl = document.createElement('label');
    fernHabitatLbl.textContent = 'Среда обитания'
    const fernFondsLengthInput = document.createElement('input');
    fernFondsLengthInput.type = 'number';
    const fernHabitatInput = document.createElement('input');

    fillDynamicFields(fernFondsLengthLbl, fernFondsLengthInput);
    fillDynamicFields(fernHabitatLbl, fernHabitatInput);
}

const placeSpruseFields = function () {
    dynamicFields.textContent = '';
    const needlsLengthLbl = document.createElement('label');
    needlsLengthLbl.textContent = 'Средняя длина иголок';
    const frostResistanceLbl = document.createElement('label');
    frostResistanceLbl.textContent = 'Перенесение морозов';
    const needlsLengthInput = document.createElement('input');
    needlsLengthInput.type = 'number';
    const frostResistanceInput = document.createElement('input');

    fillDynamicFields(needlsLengthLbl, needlsLengthInput);
    fillDynamicFields(frostResistanceLbl, frostResistanceInput);
}

const onload = function () {
    document.addEventListener('DOMContentLoaded', placeFernFields());
    plantSelect.addEventListener('change', () => {
        let selectedPlant = plantSelect.selectedOptions[0].value;
        console.log(selectedPlant);
        if (selectedPlant === 'fern') {
            placeFernFields();
        } else if (selectedPlant === 'spruse') {
            placeSpruseFields();
        }
    })
}

console.dir(plantSelect);

const plant = new Plant();
const fern = new Fern();
const spruse = new Spruse();

onload();