import type { Presentation } from './types/presentation.js';
import type { Point, Size, TextStyle } from './types/objects.js';

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
import { modifySlide as modifyPresentationSlide } from './functions/presentation.js';
import { Slide } from './types/slide.js';

let currentPresentation: Presentation | null = null;

let editorChangeHandler: (() => void) | null = null;

let previewSlideIndex = 0;
let activeSlideId: string | null = null;
let previewMode = false;
let pendingDeleteSlideId: string | null = null;

type Modifier<P = any> = (
    model: Presentation,
    params: P
) => Presentation;

function addEditorChangeHandler(handler: () => void): void
{
    editorChangeHandler = handler;
}

function setInitialState(presentation: Presentation): void
{
    currentPresentation = presentation;

    activeSlideId = presentation.slides[0]?.id ?? null;
    pendingDeleteSlideId = null;
    previewSlideIndex = 0;
    previewMode = false;
}

function notifyChange(): void
{
    if (editorChangeHandler)
    {
        editorChangeHandler();
    }
}

function getSlideCount(): number
{
    return currentPresentation?.slides.length ?? 0;
}

function clampPreviewIndex(index: number): number
{
    const slideCount = getSlideCount();

    if (slideCount === 0)
    {
        return 0;
    }

    const wholeIndex = Math.trunc(index) || 0;

    return Math.min(Math.max(wholeIndex, 0), slideCount - 1);
}

function reconcileState(): void
{
    const slides = currentPresentation?.slides ?? [];

    if (!slides.some(slide => slide.id === activeSlideId))
    {
        activeSlideId = slides[0]?.id ?? null;
    }

    if (!slides.some(slide => slide.id === pendingDeleteSlideId))
    {
        pendingDeleteSlideId = null;
    }

    previewSlideIndex = clampPreviewIndex(previewSlideIndex);

    if (slides.length === 0)
    {
        previewMode = false;
    }
}

function getState(): Presentation | null
{
    return currentPresentation;
}

function dispatch(modifier: Modifier, params: any = null): void
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

    reconcileState();
    notifyChange();
}

function modifySlide(slideId: string, modifier: (slide: Slide) => Slide): void
{
    dispatch(
        modifyPresentationSlide,
        {
            slideId,
            modifier
        }
    );
}

function setActiveSlide(slideId: string): void
{
    const slideExists = currentPresentation?.slides.some(
        slide => slide.id === slideId
    );

    if (!slideExists || slideId === activeSlideId)
    {
        return;
    }

    activeSlideId = slideId;
    notifyChange();
}

function getActiveSlideId(): string | null
{
    return activeSlideId;
}

function setPreviewMode(mode: boolean): void
{
    if (mode === previewMode)
    {
        return;
    }

    if (mode && getSlideCount() === 0)
    {
        return;
    }

    previewMode = mode;

    if (mode)
    {
        previewSlideIndex = 0;
    }

    notifyChange();
}

function getPreviewMode(): boolean
{
    return previewMode;
}

function setPreviewSlideIndex(index: number): void
{
    const newIndex = clampPreviewIndex(index);

    if (newIndex === previewSlideIndex)
    {
        return;
    }

    previewSlideIndex = newIndex;
    notifyChange();
}

function getPreviewSlideIndex(): number
{
    return previewSlideIndex;
}

function handleKeyboardEvent(event: KeyboardEvent): void
{
    if (event.key === 'Escape')
    {
        if (previewMode)
        {
            setPreviewMode(false);
        }
        else if (pendingDeleteSlideId)
        {
            cancelSlideDeletion();
        }

        return;
    }

    if (!previewMode)
    {
        return;
    }

    if (event.key === 'ArrowRight' || event.key === 'PageDown')
    {
        event.preventDefault();
        setPreviewSlideIndex(previewSlideIndex + 1);
    }
    else if (event.key === 'ArrowLeft' || event.key === 'PageUp')
    {
        event.preventDefault();
        setPreviewSlideIndex(previewSlideIndex - 1);
    }
}

function addKeyboardListener(): void
{
    window.addEventListener('keydown', handleKeyboardEvent);
}

function addNewSlide(id: string, name?: string): void
{
    if (!currentPresentation)
    {
        console.error(
            'State is not initialized! Call setInitialState first.'
        );

        return;
    }

    activeSlideId = id;

    dispatch(
        (
            presentation: Presentation,
            params: { id: string; name?: string }
        ) => addSlide(presentation, params.id, params.name),
        { id, name }
    );
}

function findNextActiveSlideId(
    presentation: Presentation,
    removedIds: string[],
    currentId: string | null
): string | null
{
    if (currentId === null || !removedIds.includes(currentId))
    {
        return currentId;
    }

    const slides = presentation.slides;
    const currentIndex = slides.findIndex(slide => slide.id === currentId);
    const isKept = (slide: Slide): boolean => !removedIds.includes(slide.id);

    const following = slides.slice(currentIndex + 1).find(isKept);

    if (following)
    {
        return following.id;
    }

    const preceding = slides.slice(0, currentIndex).reverse().find(isKept);

    return preceding?.id ?? null;
}

function deleteSlides(slideIds: string[]): void
{
    if (!currentPresentation)
    {
        console.error(
            'State is not initialized! Call setInitialState first.'
        );

        return;
    }

    activeSlideId = findNextActiveSlideId(
        currentPresentation,
        slideIds,
        activeSlideId
    );

    dispatch(removeSlides, slideIds);
}

function requestSlideDeletion(slideId: string): void
{
    pendingDeleteSlideId = slideId;
    reconcileState();
    notifyChange();
}

function cancelSlideDeletion(): void
{
    if (pendingDeleteSlideId === null)
    {
        return;
    }

    pendingDeleteSlideId = null;
    notifyChange();
}

function confirmSlideDeletion(): void
{
    const slideId = pendingDeleteSlideId;

    if (slideId === null)
    {
        return;
    }

    pendingDeleteSlideId = null;
    deleteSlides([slideId]);
}

function getPendingDeleteSlideId(): string | null
{
    return pendingDeleteSlideId;
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

function changeSlideBackgroundColor(slideId: string, color: string): void
{
    modifySlide(
        slideId,
        slide => setSlideBackgroundColor(
            slide,
            color
        )
    );
}

function changeSlideBackgroundImage(slideId: string,imageUrl: string): void
{
    modifySlide(
        slideId,
        slide => setSlideBackgroundImage(
            slide,
            imageUrl
        )
    );
}

function changeSlideGradient(slideId: string, colors: string[], angle?: number): void
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

function resetSlideBackground(slideId: string): void
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
    addKeyboardListener,

    addNewSlide,
    deleteSlides,
    requestSlideDeletion,
    cancelSlideDeletion,
    confirmSlideDeletion,
    getPendingDeleteSlideId,

    addTextToSlide,
    addImageToSlide,

    changeSlideBackgroundColor,
    changeSlideBackgroundImage,
    changeSlideGradient,
    resetSlideBackground
};