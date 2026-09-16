import type { Slide  } from "../types/slide"
import type { 
    TextObject, 
    MediaObject, 
    MediaType, 
    Point, 
    Size, 
    TextStyle  
} from "../types/objects"

function addTextObject(
    slide: Slide,
    objectId: string,
    position: Point,
    size: Size,
    text: string,
    textStyle: TextStyle
): Slide
{
    // NOTE: создание объектов оставлено внутри addTextObject и addMediaObject.
    // Вынесение в createDefaultObject незначительно уменьшит количество параметров,
    // но потребует расширения типа или добавления лишнего параметра.
    const newObject: TextObject = {
        id: objectId,
        position,
        size,
        type: 'text',
        text,
        textStyle
    };

    return {
        ...slide,
        objects: [
            ...slide.objects,
            newObject
        ]
    };
}

function addMediaObject(
    slide: Slide,
    objectId: string,
    position: Point,
    size: Size,
    src: string,
    mediaType: MediaType
): Slide
{
    const newObject: MediaObject = {
        id: objectId,
        position,
        size,
        type: 'media',
        src,
        mediaType
    };

    return {
        ...slide,
        objects: [
            ...slide.objects,
            newObject
        ]
    };
}

function removeObject(
    slide: Slide,
    objectId: string
): Slide 
{
    return {
        ...slide,
        objects: slide.objects.filter(
            object => objectId !== object.id
        )
    };
}

function moveObject(
    slide: Slide,
    objectId: string,
    newPosition: Point
): Slide 
{
    // DONE: убрал objectFound
    const objects = slide.objects.map(object =>
    {
        if (object.id !== objectId)
        {
            return object;
        }

        return {
            ...object,
            position: newPosition
        };
    });

    return {
        ...slide,
        objects
    };
}

function resizeObject(
    slide: Slide,
    objectId: string,
    newSize: Size
): Slide 
{
    // DONE: убрал objectFound
    if (newSize.height < 0 || newSize.width < 0)
    {
        return slide;
    }

    const objects = slide.objects.map(object =>
    {
        if (object.id !== objectId)
        {
            return object;
        }

        return {
            ...object,
            size: newSize
        };
    });

    return {
        ...slide,
        objects
    };
}

function updateTextObjectStyle(
    slide: Slide,
    objectId: string,
    newTextStyle: TextStyle
): Slide
{
    // DONE: убрал objectFound
    const objects = slide.objects.map(object =>
    {
        if (object.id !== objectId)
        {
            return object;
        }

        return {
            ...object,
            textStyle: newTextStyle
        };
    });

    return {
        ...slide,
        objects
    };
}

export {
    addTextObject,
    addMediaObject,
    removeObject,
    moveObject,
    resizeObject,
    updateTextObjectStyle,
}