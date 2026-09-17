import type { Slide  } from "../types/slide"
import type { 
    TextObject, 
    MediaObject, 
    MediaType, 
    Point, 
    Size, 
    TextStyle,
    SlideObject
} from "../types/objects"

function addObjectToSlide(
    slide: Slide,
    newObject: SlideObject
): Slide
{
    return {
        ...slide,
        objects: [
            ...slide.objects,
            newObject
        ]
    };
}

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

    return addObjectToSlide(slide, newObject);
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

    return addObjectToSlide(slide, newObject);
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

function modifyObject(
    slide: Slide,
    objectId: string,
    modify: (object: SlideObject) => SlideObject
): Slide
{
    return {
        ...slide,
        objects: slide.objects.map(
            object => object.id === objectId
                ? modify(object)
                : object
        )
    };
}

function moveObject(
    slide: Slide,
    objectId: string,
    newPosition: Point
): Slide
{
    return modifyObject(
        slide,
        objectId,
        object => ({
            ...object,
            position: newPosition
        })
    );
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

    return modifyObject(
        slide,
        objectId,
        object => ({
            ...object,
            size: newSize
        })
    );
}

function updateTextObjectStyle(
    slide: Slide,
    objectId: string,
    newTextStyle: TextStyle
): Slide
{
    return modifyObject(
        slide,
        objectId,
        object => ({
            ...object,
            textStyle: newTextStyle
        })
    );
}

export {
    addTextObject,
    addMediaObject,
    removeObject,
    moveObject,
    resizeObject,
    updateTextObjectStyle,
}