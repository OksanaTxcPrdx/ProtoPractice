const plantSelect = document.getElementById('plant-type-select');
const plantForm = document.getElementById('plant-form');
const dynamicFields = document.querySelector('.dynamic-fields');
const saveBtn = document.getElementById('save-btn');
const plantsTableBody = document.querySelector('table>tbody');
const PLANTS = [];
let deleteBtns;

class Plant {

    constructor({ id, type, name, age, area, isToxic }) {
        this._id = id;
        this._type = type;
        this._name = name;
        this._age = age;
        this._area = area;
        this._isToxic = isToxic;
    }

    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
    }
    get type() {
        return this._type;
    }
    set type(value) {
        this._type = value;
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
        plantClassName: 'Папоротник',
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
        plantClassName: 'Ель обыкновенная',
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
    colectedPlantData['type'] = selectedPlant;
    colectedPlantData['id'] = crypto.randomUUID();
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

    return colectedPlantData;
}

const clearInputs = function () {
    let inputsList = plantForm.querySelectorAll('input');
    inputsList.forEach(input => {
        if (input.type === 'checkbox') {
            input.checked = false;
        } else {
            input.value = '';
        }
    })
}



const setPlantsLT = function (plant) {

    let jsonPlant = JSON.stringify(plant);
    localStorage.setItem(plant.id, jsonPlant);
}

const getLocalStorage = function () {
    PLANTS.length = 0;
    let plantObjArr = [];
    let keys = Object.keys(localStorage);
    for (let key of keys) {
        plantObjArr.push(JSON.parse(localStorage.getItem(key)));
    }
    plantObjArr.forEach((plant) => {
        let plantType = plant.type;
        let PlantClass = PLANT_CONFIGS[plantType].plantClass;
        PLANTS.push(new PlantClass(plant));
    })
}

const getInfoForTable = function (plant) {
    let plantType = PLANT_CONFIGS[plant.type].plantClassName;
    let isToxic = plant.isToxic.checked ? 'Да' : 'Нет';
    let extraInfo = {};
    let extraInfoText = '';
    let configs = PLANT_CONFIGS[plant.type];
    configs.fields.forEach((field) => {
        extraInfo[field.name] = plant[field.name];
    })
    configs.fields.forEach((field) => {
        extraInfoText += `${field.label} ${extraInfo[field.name]}.\n`
    })

    return [plantType, plant.name, plant.age, plant.area, isToxic, extraInfoText]
}

const renderTable = function () {
    getLocalStorage();
    plantsTableBody.textContent = '';
    PLANTS.forEach((plant) => {

        let infoArrRow = getInfoForTable(plant);
        let newTr = document.createElement('tr');
        plantsTableBody.append(newTr);

        infoArrRow.forEach((infoPoint) => {
            let newData = document.createElement('td');
            newData.textContent = `${infoPoint}`;
            newTr.append(newData);
        })

        let btnWrap = document.createElement('td');
        let deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Удалить';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.name = `${plant.id}`;
        btnWrap.append(deleteBtn);
        newTr.append(btnWrap);

    })
    deleteBtns = document.querySelectorAll('.delete-btn') || [];
    deleteBtns.forEach(btn => {
        btn.addEventListener('click', event => {
            deleteFromTable(event.target.name);
            renderTable();
        })
    })

}

const deleteFromTable = function (id) {
    localStorage.removeItem(id);
}

const onload = function () {

    document.addEventListener('DOMContentLoaded', renderDynamicFields);
    document.addEventListener('DOMContentLoaded', renderTable);
    // console.log(deleteBtns);

    plantSelect.addEventListener('change', renderDynamicFields);
    plantForm.addEventListener('submit', (event) => {
        event.preventDefault();
        setPlantsLT(collectPlantData());
        clearInputs();
        renderTable()
    })


}


onload();
