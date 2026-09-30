import type { Presentation } from './types/presentation.js';
import { createPresentation } from './functions/presentation.js';
import { addSlide, setSlideBackgroundColor } from './functions/slide.js';
import { addTextObject } from './functions/objects.js';

const createIdGenerator = () => {
    let idCounter = 0;

    return () => `id_${++idCounter}`;
};

function createTestPresentation(): Presentation {
    const generateId = createIdGenerator();

    let presentation = createPresentation('Тестовая презентация', generateId);

    let slide1 = presentation.slides[0];
    slide1 = setSlideBackgroundColor(slide1, '#f0f0f0');

    let objectId = generateId();
    slide1 = addTextObject(
        slide1, 
        objectId, 
        {x: 50, y: 50}, 
        {width: 400, height: 60},
        'Добро пожаловать!', 
        {
            fontFamily: 'Arial', 
            fontSize: 32, 
            color: '#333333'
    });

    objectId = generateId();
    slide1 = addTextObject(
        slide1, 
        objectId, 
        {x: 50, y: 120}, 
        {width: 400, height: 40}, 
        'Лабораторная работа #2', 
        {
            fontFamily: 'Arial', 
            fontSize: 20, 
            color: '#666666'
    });

    objectId = generateId();
    presentation = addSlide(presentation, objectId, 'Список');
    let slide2 = presentation.slides[1];
    slide2 = setSlideBackgroundColor(slide2, '#ffffff');

    objectId = generateId();
    slide2 = addTextObject(
        slide2, 
        objectId, 
        {x: 50, y: 50}, 
        {width: 300, height: 40}, 
        'Список задач:', 
        {
            fontFamily: 'Arial',
            fontSize: 24, 
            color: '#000000'
    });

    objectId = generateId();
    slide2 = addTextObject(
        slide2, 
        objectId,
        {x: 50, y: 100}, 
        {width: 300, height: 30}, 
        '1. Разработать интерфейс', 
        {
            fontFamily: 'Arial',
            fontSize: 18, 
            color: '#000000'
    });

    objectId = generateId();
    slide2 = addTextObject(
        slide2, 
        objectId, 
        {x: 50, y: 140}, 
        {width: 300, height: 30}, 
        '2. Добавить интерактивность',
        {
            fontFamily: 'Arial',
            fontSize: 18, 
            color: '#000000'
    });

    objectId = generateId();
    slide2 = addTextObject(
        slide2, 
        objectId,
        {x: 50, y: 180}, 
        {width: 300, height: 30}, 
        '3. Выделить общие компоненты',
        {
            fontFamily: 'Arial',
            fontSize: 18, 
            color: '#000000'
    });

    objectId = generateId();
    presentation = addSlide(presentation, objectId, 'Список');
    let slide3 = presentation.slides[2];
    slide3 = setSlideBackgroundColor(slide3, '#e8f5e9');

    objectId = generateId();
    slide3 = addTextObject(
        slide3,
        objectId,
        {x: 50, y: 50}, 
        {width: 300, height: 40},
        'Итоги работы:',
        {
            fontFamily: 'Arial',
            fontSize: 24, 
            color: '#2e7d32'
    });

    objectId = generateId();
    slide3 = addTextObject(
        slide3, 
        objectId,
        {x: 50, y: 120}, 
        {width: 200, height: 60},
        'Готово!',
        {
            fontFamily: 'Arial',
            fontSize: 36, 
            color: '#4caf50'
    });

    return presentation;
}

export {
    createTestPresentation,
};