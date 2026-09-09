import type { Slide  } from "../types/slide"
import type { TextObject, MediaObject, SlideObject, MediaType  } from "../types/objects"

function addTextObject(
    slide: Slide,
    objectId: string,
    x: number,
    y: number,
    width: number,
    height: number,
    text: string,
    fontFamily: string,
    fontSize: number,
    color: string
): Slide
{
    const newObject: TextObject = {
        id: objectId,
        position: {
            x,
            y
        },
        size: {
            width,
            height
        },
        type: 'text',
        text,
        textStyle: {
            fontFamily,
            fontSize,
            color
        }
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
    x: number,
    y: number,
    width: number,
    height: number,
    src: string,
    mediaType: MediaType
): Slide
{
    const newObject: MediaObject = {
        id: objectId,
        position: {
            x,
            y
        },
        size: {
            width,
            height
        },
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
    newX: number,
    newY: number
): Slide 
{
    const oldObject = slide.objects.find(
        object => objectId === object.id
    );

    if (!oldObject)
    {
        return slide;
    }

    const newObject: SlideObject = {
        ...oldObject,
        position: {
            x: newX,
            y: newY
        }
    }

    return {
        ...slide,
        objects: slide.objects.map(
            object => object.id === objectId
                ? newObject
                : object
        )
    }
}

function resizeObject(
    slide: Slide,
    objectId: string,
    newWidth: number,
    newHeight: number
): Slide 
{
    if (newWidth < 0 || newHeight < 0)
    {
        return slide;
    }

    const oldObject = slide.objects.find(
        object => objectId === object.id
    );

    if (!oldObject)
    {
        return slide;
    }

    const newObject: SlideObject = {
        ...oldObject,
        size: {
            width: newWidth,
            height: newHeight
        }
    }

    return {
        ...slide,
        objects: slide.objects.map(
            object => object.id === objectId
                ? newObject
                : object
        )
    }
}

function updateTextObjectStyle(
    slide: Slide,
    objectId: string,
    fontFamily: string,
    fontSize: number,
    fontColor: string
): Slide
{
    const oldTextObject = slide.objects.find(
        object => object.id === objectId && object.type === 'text'
    );

    if (!oldTextObject)
    {
        return slide;
    }

    const newTextObject = {
        ...oldTextObject,
        textStyle: {
            fontFamily,
            fontSize,
            color: fontColor
        }
    };

    return {
        ...slide,
        objects: slide.objects.map(
            object => object.id === objectId
                ? newTextObject
                : object
        )
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