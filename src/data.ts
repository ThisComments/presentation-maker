import type { Presentation } from './types/presentation.js';
import { createPresentation } from './functions/presentation.js';
import { addSlide, setSlideBackgroundColor, replaceSlide } from './functions/slide.js';
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

    slide1 = addTextObject(
        slide1, 
        {
            objectId: generateId(), 
            position: {x: 50, y: 50}, 
            size: {width: 400, height: 60},
            text: 'Добро пожаловать!', 
            textStyle: {
                fontFamily: 'Arial', 
                fontSize: 32, 
                color: '#333333'
    }});

    slide1 = addTextObject(
        slide1, 
        {
            objectId: generateId(), 
            position: {x: 50, y: 120}, 
            size: {width: 400, height: 40}, 
            text: 'Лабораторная работа #2', 
            textStyle: {
                fontFamily: 'Arial', 
                fontSize: 20, 
                color: '#666666'
    }});

    presentation = replaceSlide(presentation, 0, slide1);

    presentation = addSlide(presentation, generateId(), 'Список');
    let slide2 = presentation.slides[1];
    slide2 = setSlideBackgroundColor(slide2, '#ffffff');

    slide2 = addTextObject(
        slide2, 
        {
            objectId: generateId(), 
            position: {x: 50, y: 50}, 
            size: {width: 300, height: 40}, 
            text: 'Список задач:', 
            textStyle: {
                fontFamily: 'Arial',
                fontSize: 24, 
                color: '#000000'
    }});

    slide2 = addTextObject(
        slide2, 
        {
            objectId: generateId(),
            position: {x: 50, y: 100}, 
            size: {width: 300, height: 30}, 
            text: '1. Разработать интерфейс', 
            textStyle: {
                fontFamily: 'Arial',
                fontSize: 18, 
                color: '#000000'
    }});

    slide2 = addTextObject(
        slide2, 
        {
            objectId: generateId(), 
            position: {x: 50, y: 140}, 
            size: {width: 300, height: 30}, 
            text: '2. Добавить интерактивность',
            textStyle: {
                fontFamily: 'Arial',
                fontSize: 18, 
                color: '#000000'
    }});

    slide2 = addTextObject(
        slide2, 
        {
            objectId: generateId(),
            position: {x: 50, y: 180}, 
            size: {width: 300, height: 30}, 
            text: '3. Выделить общие компоненты',
            textStyle: {
                fontFamily: 'Arial',
                fontSize: 18, 
                color: '#000000'
    }});

    presentation = replaceSlide(presentation, 1, slide2);

    presentation = addSlide(presentation, generateId(), 'Список');
    let slide3 = presentation.slides[2];
    slide3 = setSlideBackgroundColor(slide3, '#e8f5e9');

    slide3 = addTextObject(
        slide3,
        {
            objectId: generateId(),
            position: {x: 50, y: 50}, 
            size: {width: 300, height: 40},
            text: 'Итоги работы:',
            textStyle: {
                fontFamily: 'Arial',
                fontSize: 24, 
                color: '#2e7d32'
    }});

    slide3 = addTextObject(
        slide3, 
        {
            objectId: generateId(),
            position: {x: 50, y: 120}, 
            size: {width: 200, height: 60},
            text: 'Готово!',
            textStyle: {
                fontFamily: 'Arial',
                fontSize: 36, 
                color: '#4caf50'
    }});

    presentation = replaceSlide(presentation, 2, slide3);

    return presentation;
}

export {
    createTestPresentation,
};