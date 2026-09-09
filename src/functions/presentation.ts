import type { Presentation } from '../types/presentation';
import type { Slide } from '../types/slide';
import { defaultBackground } from '../types/slide';

function createDefaultSlide(
    generateId: () => string
): Slide 
{
    return {
        id: generateId(),
        name: 'Слайд 1',
        description: '',
        background: defaultBackground,
        objects: [],
    };
}

function createPresentation(
    name: string,
    generateId: () => string
): Presentation 
{
    const defaultSlide = createDefaultSlide(generateId);
    return {
        id: generateId(),
        name,
        slides: [defaultSlide]
    };
}


function updatePresentationName(
    presentation: Presentation, 
    name: string
): Presentation 
{
    return { ...presentation, name};
}

function savePresentation(
    presentation: Presentation
): string 
{
    return JSON.stringify(presentation, null, 4);
}

function isPresentation(
    value: unknown
): value is Presentation
{
    if (typeof value !== 'object' || value === null)
    {
        return false;
    }

    const presentation = value as Record<string, unknown>;

    if (
        typeof presentation.id !== 'string' ||
        typeof presentation.name !== 'string' ||
        !Array.isArray(presentation.slides)
    )
    {
        return false;
    }

    return presentation.slides.every(isSlide);
}

function isSlide(
    value: unknown
): boolean
{
    if (typeof value !== 'object' || value === null)
    {
        return false;
    }

    const slide = value as Record<string, unknown>;

    return (
        typeof slide.id === 'string' &&
        typeof slide.name === 'string' &&
        typeof slide.description === 'string' &&
        isBackground(slide.background) &&
        Array.isArray(slide.objects) &&
        slide.objects.every(isSlideObject)
    );
}

function isBackground(
    value: unknown
): boolean
{
    if (typeof value !== 'object' || value === null)
    {
        return false;
    }

    const background = value as Record<string, unknown>;

    if (background.type === 'color')
    {
        return typeof background.color === 'string';
    }

    if (background.type === 'image')
    {
        return typeof background.src === 'string';
    }

    if (background.type === 'gradient')
    {
        return (
            Array.isArray(background.colors) &&
            background.colors.every(
                (color) => typeof color === 'string'
            ) &&
            typeof background.angle === 'number'
        );
    }

    return false;
}

function isSlideObject(
    value: unknown
): boolean
{
    if (typeof value !== 'object' || value === null)
    {
        return false;
    }

    const object = value as Record<string, unknown>;

    if (
        typeof object.id !== 'string' ||
        typeof object.position !== 'object' ||
        typeof object.size !== 'object' ||
        typeof object.type !== 'string'
    )
    {
        return false;
    }

    if (object.type === 'text')
    {
        return (
            typeof object.text === 'string' &&
            isTextStyle(object.textStyle)
        );
    }

    if (object.type === 'media')
    {
        return typeof object.src === 'string';
    }

    return false;
}

function isTextStyle(
    value: unknown
): boolean
{
    if (typeof value !== 'object' || value === null)
    {
        return false;
    }

    const style = value as Record<string, unknown>;

    return (
        typeof style.fontFamily === 'string' &&
        typeof style.fontSize === 'number' &&
        typeof style.color === 'string'
    );
}

function loadPresentation(
    json: string
): Presentation
{
    try
    {
        const value: unknown = JSON.parse(json);

        if (!isPresentation(value))
        {
            throw new Error('Неверная структура презентации');
        }

        return value;
    }
    catch
    {
        throw new Error('Не удалось загрузить презентацию');
    }
}

export {
    createPresentation,
    updatePresentationName,
    savePresentation,
    loadPresentation
};