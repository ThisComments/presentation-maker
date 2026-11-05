import type { Slide } from '../types/slide.js';
import type { Point, Size, TextStyle } from '../types/objects.js';
import {
    addTextToSlide,
    addImageToSlide,
    changeSlideBackgroundImage
} from '../editor.js';
import {
    isImageFile,
    readFileAsDataUrl,
    loadImageSize,
    fitSize
} from '../utils/image.js';

const NEW_TEXT = 'Новый текст';
const NEW_TEXT_SIZE: Size = { width: 300, height: 50 };
const NEW_TEXT_STYLE: TextStyle = {
    fontFamily: 'Arial',
    fontSize: 24,
    color: '#000000'
};
const MAX_IMAGE_SIZE: Size = { width: 400, height: 300 };

function getNewObjectPosition(slide: Slide): Point
{
    const offset = (slide.objects.length % 8) * 24;

    return { x: 50 + offset, y: 50 + offset };
}

function addTextObjectToSlide(slide: Slide): void
{
    addTextToSlide(
        slide.id,
        crypto.randomUUID(),
        getNewObjectPosition(slide),
        NEW_TEXT_SIZE,
        NEW_TEXT,
        NEW_TEXT_STYLE
    );
}

async function readImageFile(file: File): Promise<string>
{
    if (!isImageFile(file))
    {
        throw new Error('Выберите файл изображения');
    }

    try
    {
        return await readFileAsDataUrl(file);
    }
    catch
    {
        throw new Error('Не удалось прочитать файл');
    }
}

async function setSlideBackgroundImage(slideId: string, file: File): Promise<void>
{
    const src = await readImageFile(file);
    changeSlideBackgroundImage(slideId, src);
}

async function addImageObjectToSlide(slide: Slide, file: File): Promise<void>
{
    const src = await readImageFile(file);

    let size: Size;

    try
    {
        size = fitSize(await loadImageSize(src), MAX_IMAGE_SIZE);
    }
    catch
    {
        throw new Error('Не удалось открыть изображение');
    }

    addImageToSlide(
        slide.id,
        crypto.randomUUID(),
        getNewObjectPosition(slide),
        size,
        src
    );
}

export {
    addTextObjectToSlide,
    addImageObjectToSlide,
    setSlideBackgroundImage
};
