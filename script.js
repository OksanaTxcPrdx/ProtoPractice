'use strict'
const body = document.querySelector('body');

const DomElement = function (selector, height, width, bg, fontSize, position) {
    this.selector = selector;
    this.height = height;
    this.width = width;
    this.bg = bg;
    this.fontSize = fontSize;
    this.position = position;

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
        font-size: ${this.fontSize};
        position: ${this.position}`

        body.append(newElem);

    }
}

const newElem = new DomElement('.square', '100px', '100px', 'green', 20, 'absolute');


document.addEventListener('DOMContentLoaded', newElem.creatNewElem.bind(newElem));
document.addEventListener('keydown', (event) => {
    let elem = document.querySelector('.square');
    const currentX = elem.offsetLeft;
    const currentY = elem.offsetTop;

    if (event.key === 'ArrowRight') {
        console.log('right');
        elem.style.left = (currentX + 10) + 'px';
    } else if (event.key === 'ArrowLeft') {
        console.log('left');
        elem.style.left = (currentX - 10) + 'px';
    } else if (event.key === 'ArrowUp') {
        console.log('up');
        elem.style.top = (currentY - 10) + 'px';
    } else if (event.key === 'ArrowDown') {
        console.log('down');
        elem.style.top = (currentY + 10) + 'px';
    }
})