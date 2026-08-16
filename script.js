'use strict'
const body = document.querySelector('body');

const DomElement = function (selector, height, width, bg, fontSize) {
    this.selector = selector;
    this.height = height;
    this.width = width;
    this.bg = bg;
    this.fontSize = fontSize;

    this.creatNewElem = function () {
        let firstCharSelector = this.selector[0];
        let strSelector = this.selector.slice(1, this.selector.length);
        let newElem;

        if (firstCharSelector === '.') {
            newElem = document.createElement('div');
            newElem.classList.add(strSelector);
        } else if (firstCharSelector === '#') {
            newElem = document.createElement('p');
            newElem.id = strSelector;
        }
        let text = prompt('Enter inner text', 'example');
        newElem.textContent = text;
        newElem.style.cssText = `width: ${this.width}; 
        height: ${this.height};
        background-color: ${this.bg};
        font-size: ${this.fontSize}`

        body.append(newElem);

    }
}

const newElem = new DomElement('.classDiv', 200, 150, 'green', 20);
const newElem1 = new DomElement('#classP', 100, 150, 'red', 20);

newElem1.creatNewElem();
newElem.creatNewElem();