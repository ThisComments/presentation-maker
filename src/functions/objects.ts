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
    let objectFound = false;

    const objects = slide.objects.map(object =>
    {
        if (object.id !== objectId)
        {
            return object;
        }

        objectFound = true;

        return {
            ...object,
            position: newPosition
        };
    });

    if (!objectFound)
    {
        return slide;
    }

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
    if (newSize.height < 0 || newSize.width < 0)
    {
        return slide;
    }

    let objectFound = false;

    const objects = slide.objects.map(object =>
    {
        if (object.id !== objectId)
        {
            return object;
        }

        objectFound = true;

        return {
            ...object,
            size: newSize
        };
    });

    if (!objectFound)
    {
        return slide;
    }

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
    let objectFound = false;

    const objects = slide.objects.map(object =>
    {
        if (object.id !== objectId)
        {
            return object;
        }

        objectFound = true;

        return {
            ...object,
            textStyle: newTextStyle
        };
    });

    if (!objectFound)
    {
        return slide;
    }

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