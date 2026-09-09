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
  const newSlide = createDefaultSlide(slideName || `Слайд ${presentation.slides.length + 1}`, slideId);
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
    const slides = [...presentation.slides];

    const oldIndex = slides.findIndex(
        slide => slide.id === slideId
    );

    if (oldIndex === -1)
    {
        return presentation;
    }

    const targetIndex = Math.max(
        0,
        Math.min(Math.trunc(newIndex), slides.length)
    );

    const [slide] = slides.splice(oldIndex, 1);

    slides.splice(targetIndex, 0, slide);

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
    const slide = presentation.slides.find(
        slide => slide.id === slideId
    );

    if (!slide)
    {
        return presentation;
    }

    const duplicatedSlide: Slide = {
        ...slide,
        id: generateId(),
        name: `${slide.name} — копия`,
        objects: slide.objects.map(object => ({
            ...object,
            id: generateId()
        }))
    };

    const slideIndex = presentation.slides.findIndex(
        slide => slide.id === slideId
    );

    const slides = [...presentation.slides];

    slides.splice(slideIndex + 1, 0, duplicatedSlide);

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