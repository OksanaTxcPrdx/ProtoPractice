const plantSelect = document.getElementById('plant-type-select');
const plantForm = document.getElementById('plant-form');
// const plantNameInput = document.getElementById('plant-name-input');
// const plantAgeInput = document.getElementById('plant-age-input');
// const plantAreaInput = document.getElementById('plant-area-input');
// const plantIsToxicChb = document.getElementById('plant-is-toxic-checkbox');
const dynamicFields = document.querySelector('.dynamic-fields');
const saveBtn = document.getElementById('save-btn');
const plantsTable = document.querySelector('table');

class Plant {

    constructor({ name, age, area, isToxic }) {
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
    constructor({ fondsLength, habitat, ...basePlantData }) {
        super(basePlantData);
        this.fondsLength = fondsLength;
        this.habitat = habitat;
    }
    deleteFormStorage() {
        console.log('fern del');
    }
}



class Spruse extends Plant {
    constructor({ needlsLength, droughtResistance, ...basePlantData }) {
        super(basePlantData);
        this.needlsLength = needlsLength;
        this.droughtResistance = droughtResistance;
    }

    deleteFormStorage() {
        console.log('spruse del');
    }
}

const PLANT_CONFIGS = {
    fern: {
        plantClass: Fern,
        fields: [
            {
                name: 'fondsLength',
                label: 'Длина вий(cm): ',
                type: 'number',
                required: true,
            },
            {
                name: 'habitat',
                label: 'Среда обитания: ',
                type: 'text',
                required: true,
            },
        ]
    },
    spruse: {
        plantClass: Spruse,
        fields: [
            {
                name: 'needlsLength',
                label: 'Средняя длина иголок(cm): ',
                type: 'number',
                required: true,
            },
            {
                name: 'droughtResistance',
                label: 'Засухоустойчивость: ',
                type: 'text',
                required: true,
            },
        ]
    }
}

const renderDynamicFields = function () {
    dynamicFields.textContent = '';
    let selectedPlant = plantSelect.selectedOptions[0].value;
    PLANT_CONFIGS[selectedPlant].fields.forEach(field => {
        const lbl = document.createElement('label');
        lbl.textContent = field.label;
        const input = document.createElement('input');
        input.type = field.type;
        input.required = field.required;
        input.name = field.name;

        const formGroupWrapper = document.createElement('div');
        formGroupWrapper.classList.add('form-group');
        formGroupWrapper.append(lbl, input);

        dynamicFields.append(formGroupWrapper);
    });
}


const collectPlantData = function () {
    let colectedPlantData = {};
    let selectedPlant = plantSelect.selectedOptions[0].value;
    let PlantClass = PLANT_CONFIGS[selectedPlant].plantClass;

    let inputsList = plantForm.querySelectorAll('input');
    inputsList.forEach(input => {
        if (input.type === 'checkbox') {
            colectedPlantData[input.name] = input.checked;
        } else if (input.type === 'number') {
            colectedPlantData[input.name] = +input.value;
        } else {
            colectedPlantData[input.name] = input.value;
        }
    })
    console.log(colectedPlantData);
    let newPlant = new PlantClass(colectedPlantData);
    console.log(newPlant);
}

const onload = function () {
    document.addEventListener('DOMContentLoaded', renderDynamicFields);

    plantSelect.addEventListener('change', renderDynamicFields);
    //plantSelect.addEventListener('change', collectPlantData);
    saveBtn.addEventListener('click', () => {
        event.preventDefault();
        collectPlantData();
    })
}



// console.dir(plantSelect);

// const plant = new Plant();
// const fern = new Fern();
// const spruse = new Spruse();

onload();
