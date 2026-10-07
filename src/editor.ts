import type { Presentation } from './types/presentation.js';
import type { Point, Size, TextStyle, MediaType } from './types/objects.js';

import {
    addSlide,
    removeSlides
} from './functions/slide.js';

import {
    addTextObject,
    addMediaObject
} from './functions/objects.js';

import {
    setSlideBackgroundColor,
    setSlideBackgroundImage,
    setGradientBackground,
    clearSlideBackground
} from './functions/slide.js';
import { modifySlide as modifyPresentationSlide  } from './functions/presentation.js';
import { Slide } from './types/slide.js';

let currentPresentation: Presentation | null = null;

let editorChangeHandler: (() => void) | null = null;

let previewSlideIndex = 0;
let activeSlideId: string | null = null;
let previewMode = false;

type Modifier<P = any> = (
    model: Presentation,
    params: P
) => Presentation;

function addEditorChangeHandler(
    handler: () => void
): void
{
    editorChangeHandler = handler;
}

function setInitialState(
    presentation: Presentation
): void
{
    currentPresentation = presentation;

    if (presentation.slides.length > 0)
    {
        activeSlideId = presentation.slides[0].id;
    }

    previewSlideIndex = 0;
    previewMode = false;
}

function getState(): Presentation | null
{
    return currentPresentation;
}

function dispatch(
    modifier: Modifier,
    params: any = null
): void
{
    if (!currentPresentation)
    {
        console.error(
            'State is not initialized! Call setInitialState first.'
        );

        return;
    }

    currentPresentation = modifier(
        currentPresentation,
        params
    );

    if (editorChangeHandler)
    {
        editorChangeHandler();
    }
}

function modifySlide(
    slideId: string,
    modifier: (slide: Slide) => Slide
): void
{
    dispatch(
        modifyPresentationSlide,
        {
            slideId,
            modifier
        }
    );
}

function setActiveSlide(
    slideId: string
): void
{
    activeSlideId = slideId;

    if (editorChangeHandler)
    {
        editorChangeHandler();
    }
}

function getActiveSlideId(): string | null
{
    return activeSlideId;
}

function setPreviewMode(
    value: boolean
): void
{
    previewMode = value;

    if (editorChangeHandler)
    {
        editorChangeHandler();
    }
}

function getPreviewMode(): boolean
{
    return previewMode;
}

function setPreviewSlideIndex(
    index: number
): void
{
    previewSlideIndex = index;

    if (editorChangeHandler)
    {
        editorChangeHandler();
    }
}

function getPreviewSlideIndex(): number
{
    return previewSlideIndex;
}

function addNewSlide(
    id: string,
    name?: string
): void
{
    dispatch(addSlide, {
        id,
        name
    });
}

function deleteSlides(
    slideIds: string[]
): void
{
    dispatch(removeSlides, slideIds);

    if (
        activeSlideId &&
        slideIds.includes(activeSlideId)
    )
    {
        activeSlideId = null;
    }
}

function addTextToSlide(
    slideId: string,
    objectId: string,
    position: Point,
    size: Size,
    text: string,
    textStyle: TextStyle
): void
{
    modifySlide(
        slideId,
        slide => addTextObject(
            slide,
            {
                objectId,
                position,
                size,
                text,
                textStyle
            }
        )
    );
}

function addImageToSlide(
    slideId: string,
    objectId: string,
    position: Point,
    size: Size,
    src: string
): void
{
    modifySlide(
        slideId,
        slide => addMediaObject(
            slide,
            {
                objectId,
                position,
                size,
                src,
                mediaType: 'image'
            }
        )
    );
}

function changeSlideBackgroundColor(
    slideId: string,
    color: string
): void
{
    modifySlide(
        slideId,
        slide => setSlideBackgroundColor(
            slide,
            color
        )
    );
}

function changeSlideBackgroundImage(
    slideId: string,
    imageUrl: string
): void
{
    modifySlide(
        slideId,
        slide => setSlideBackgroundImage(
            slide,
            imageUrl
        )
    );
}

function changeSlideGradient(
    slideId: string,
    colors: string[],
    angle?: number
): void
{
    modifySlide(
        slideId,
        slide => setGradientBackground(
            slide,
            colors,
            angle
        )
    );
}

function resetSlideBackground(
    slideId: string
): void
{
    modifySlide(
        slideId,
        slide => clearSlideBackground(slide)
    );
}

export {
    setInitialState,
    getState,
    dispatch,

    addEditorChangeHandler,

    setActiveSlide,
    getActiveSlideId,

    setPreviewMode,
    getPreviewMode,

    setPreviewSlideIndex,
    getPreviewSlideIndex,

    addNewSlide,
    deleteSlides,

    addTextToSlide,
    addImageToSlide,

    changeSlideBackgroundColor,
    changeSlideBackgroundImage,
    changeSlideGradient,
    resetSlideBackground
};