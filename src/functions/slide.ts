import type { Slide, Background } from "../types/slide";
import type { Presentation } from "../types/presentation";
import { defaultBackground } from "../types/slide";

function createDefaultSlide(
    slideName: string,
    slideId: string
): Slide 
{
    return {
        id: slideId,
        name: slideName,
        description: '',
        background: defaultBackground,
        objects: [],
    };
}

function addSlide(
    presentation: Presentation,
    slideId: string,
    slideName?: string
): Presentation 
{
    const newSlide = createDefaultSlide(slideName || 
        `Слайд ${presentation.slides.length + 1}`, slideId);
        
    return {
        ...presentation,
        slides: [...presentation.slides, newSlide],
    };
}

function removeSlides(
    presentation: Presentation,
    slideIds: string[]
): Presentation
{
    return {
        ...presentation,
        slides: presentation.slides.filter(
            slide => !slideIds.includes(slide.id)
        )
    };
}

function moveSlide(
    presentation: Presentation,
    slideId: string,
    newIndex: number
): Presentation
{
    const slide = presentation.slides.find(
        slide => slide.id === slideId
    );

    if (!slide)
    {
        return presentation;
    }

    const targetIndex = Math.max(
        0,
        Math.min(Math.trunc(newIndex) - 1, presentation.slides.length
    ));

    const slidesWithoutMoved = presentation.slides.filter(
        currentSlide => currentSlide.id !== slideId
    );

    const slides = [
        ...slidesWithoutMoved.slice(0, targetIndex),
        slide,
        ...slidesWithoutMoved.slice(targetIndex)
    ];

    return {
        ...presentation,
        slides
    };
}

function duplicateSlide(
    presentation: Presentation,
    slideId: string,
    generateId: () => string
): Presentation
{
    const slides = presentation.slides
        .map(slide =>
        {
            if (slide.id !== slideId)
            {
                return slide;
            }

            const duplicatedSlide: Slide = {
                ...structuredClone(slide),
                id: generateId(),
                name: `${slide.name} — копия`
            };

            return [slide, duplicatedSlide];
        })
        .flat();

    return {
        ...presentation,
        slides
    };
}

function setSlideBackgroundColor(
    slide: Slide, 
    color: string
): Slide 
{
    const background: Background = {
        type: 'color',
        color
    };

    return {
        ...slide,
        background
    };
}

function setSlideBackgroundImage(
    slide: Slide, 
    imageUrl: string
): Slide 
{
    const background: Background = {
        type: 'image',
        src: imageUrl
    };

    return {
        ...slide,
        background
    }
}

function setGradientBackground(
    slide: Slide,
    colors: string[],
    angle?: number
): Slide
{
    const currentAngle =
        slide.background.type === 'gradient'
            ? slide.background.angle
            : 0;

    const background: Background = {
        type: 'gradient',
        colors,
        angle: angle ?? currentAngle
    };

    return {
        ...slide,
        background
    };
}

function clearSlideBackground(
    slide: Slide
): Slide 
{
    return {
        ...slide,
        background: defaultBackground
    }
}

export {
    addSlide,
    removeSlides,
    moveSlide,
    duplicateSlide,
    setSlideBackgroundColor,
    setSlideBackgroundImage,
    setGradientBackground,
    clearSlideBackground
};