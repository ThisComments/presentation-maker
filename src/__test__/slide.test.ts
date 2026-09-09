import { describe, it, expect } from 'vitest';
import type {
    Slide
} from '../types/slide';
import type { Presentation } from '../types/presentation';
import {
    addSlide,
    removeSlides,
    moveSlide,
    duplicateSlide,
    setSlideBackgroundColor,
    setSlideBackgroundImage,
    setGradientBackground,
    clearSlideBackground
} from '../functions/slide';
import { defaultBackground } from '../types/slide';

function createSlide(
    id: string,
    name: string
): Slide
{
    return {
        id,
        name,
        description: '',
        background: defaultBackground,
        objects: []
    };
}

function createPresentation(
    slides: Slide[] = []
): Presentation
{
    return {
        id: 'presentation_01',
        name: 'Test presentation',
        slides
    };
}

describe('slide actions', () => {
    describe('addSlide', () => {
        it('adds a slide with the specified name', () => {
            const presentation = createPresentation();

            const result = addSlide(
                presentation,
                'slide_01',
                'First slide'
            );

            expect(result.slides).toHaveLength(1);
            expect(result.slides[0]).toEqual({
                id: 'slide_01',
                name: 'First slide',
                description: '',
                background: defaultBackground,
                objects: []
            });
        });

        it('generates a default name when the name is omitted', () => {
            const presentation = createPresentation([
                createSlide('slide_01', 'First slide')
            ]);

            const result = addSlide(
                presentation,
                'slide_02'
            );

            expect(result.slides[1].name).toBe('Слайд 2');
        });

        it('uses the default name when an empty string is passed', () => {
            const presentation = createPresentation();

            const result = addSlide(
                presentation,
                'slide_01',
                ''
            );

            expect(result.slides[0].name).toBe('Слайд 1');
        });

        it('adds a slide to an empty presentation', () => {
            const presentation = createPresentation();

            const result = addSlide(
                presentation,
                'slide_01'
            );

            expect(result.slides).toHaveLength(1);
        });

        it('adds a slide to the end of the presentation', () => {
            const presentation = createPresentation([
                createSlide('slide_01', 'First slide'),
                createSlide('slide_02', 'Second slide')
            ]);

            const result = addSlide(
                presentation,
                'slide_03',
                'Third slide'
            );

            expect(result.slides.map(slide => slide.id))
                .toEqual([
                    'slide_01',
                    'slide_02',
                    'slide_03'
                ]);
        });

        it('does not mutate the original presentation', () => {
            const presentation = createPresentation();

            const result = addSlide(
                presentation,
                'slide_01'
            );

            expect(presentation.slides).toHaveLength(0);
            expect(result).not.toBe(presentation);
            expect(result.slides).not.toBe(presentation.slides);
        });
    });

    describe('removeSlides', () => {
        it('removes one slide', () => {
            const presentation = createPresentation([
                createSlide('slide_01', 'First slide'),
                createSlide('slide_02', 'Second slide')
            ]);

            const result = removeSlides(
                presentation,
                ['slide_01']
            );

            expect(result.slides.map(slide => slide.id))
                .toEqual(['slide_02']);
        });

        it('removes several slides', () => {
            const presentation = createPresentation([
                createSlide('slide_01', 'First slide'),
                createSlide('slide_02', 'Second slide'),
                createSlide('slide_03', 'Third slide')
            ]);

            const result = removeSlides(
                presentation,
                ['slide_01', 'slide_03']
            );

            expect(result.slides.map(slide => slide.id))
                .toEqual(['slide_02']);
        });

        it('does nothing when the id does not exist', () => {
            const presentation = createPresentation([
                createSlide('slide_01', 'First slide')
            ]);

            const result = removeSlides(
                presentation,
                ['unknown_slide']
            );

            expect(result.slides).toEqual(presentation.slides);
            expect(result).not.toBe(presentation);
        });

        it('does nothing when the id list is empty', () => {
            const presentation = createPresentation([
                createSlide('slide_01', 'First slide')
            ]);

            const result = removeSlides(
                presentation,
                []
            );

            expect(result.slides).toEqual(presentation.slides);
        });

        it('removes all slides when all ids are specified', () => {
            const presentation = createPresentation([
                createSlide('slide_01', 'First slide'),
                createSlide('slide_02', 'Second slide')
            ]);

            const result = removeSlides(
                presentation,
                ['slide_01', 'slide_02']
            );

            expect(result.slides).toEqual([]);
        });

        it('does not mutate the original presentation', () => {
            const presentation = createPresentation([
                createSlide('slide_01', 'First slide')
            ]);

            const result = removeSlides(
                presentation,
                ['slide_01']
            );

            expect(presentation.slides).toHaveLength(1);
            expect(result).not.toBe(presentation);
            expect(result.slides).not.toBe(presentation.slides);
        });
    });

    describe('moveSlide', () => {
        it('moves a slide', () => {
            const presentation = createPresentation([
                createSlide('slide_01', 'First slide'),
                createSlide('slide_02', 'Second slide'),
                createSlide('slide_03', 'Third slide')
            ]);

            const result = moveSlide(
                presentation,
                'slide_03',
                0
            );

            expect(result.slides.map(slide => slide.id))
                .toEqual([
                    'slide_03',
                    'slide_01',
                    'slide_02'
                ]);
        });

        it('clamps a negative index to zero', () => {
            const presentation = createPresentation([
                createSlide('slide_01', 'First slide'),
                createSlide('slide_02', 'Second slide')
            ]);

            const result = moveSlide(
                presentation,
                'slide_02',
                -100
            );

            expect(result.slides.map(slide => slide.id))
                .toEqual([
                    'slide_02',
                    'slide_01'
                ]);
        });

        it('clamps an index greater than the slide count', () => {
            const presentation = createPresentation([
                createSlide('slide_01', 'First slide'),
                createSlide('slide_02', 'Second slide')
            ]);

            const result = moveSlide(
                presentation,
                'slide_01',
                100
            );

            expect(result.slides.map(slide => slide.id))
                .toEqual([
                    'slide_02',
                    'slide_01'
                ]);
        });

        it('truncates a fractional index', () => {
            const presentation = createPresentation([
                createSlide('slide_01', 'First slide'),
                createSlide('slide_02', 'Second slide'),
                createSlide('slide_03', 'Third slide')
            ]);

            const result = moveSlide(
                presentation,
                'slide_03',
                1.9
            );

            expect(result.slides.map(slide => slide.id))
                .toEqual([
                    'slide_01',
                    'slide_03',
                    'slide_02'
                ]);
        });

        it('does nothing when the id does not exist', () => {
            const presentation = createPresentation([
                createSlide('slide_01', 'First slide')
            ]);

            const result = moveSlide(
                presentation,
                'unknown_slide',
                0
            );

            expect(result).toBe(presentation);
        });

        it('does nothing when the presentation is empty', () => {
            const presentation = createPresentation();

            const result = moveSlide(
                presentation,
                'unknown_slide',
                0
            );

            expect(result).toBe(presentation);
        });

        it('does not mutate the original presentation', () => {
            const presentation = createPresentation([
                createSlide('slide_01', 'First slide'),
                createSlide('slide_02', 'Second slide')
            ]);

            const originalSlides = presentation.slides;

            const result = moveSlide(
                presentation,
                'slide_01',
                1
            );

            expect(presentation.slides).toBe(originalSlides);
            expect(presentation.slides.map(slide => slide.id))
                .toEqual([
                    'slide_01',
                    'slide_02'
                ]);
            expect(result.slides).not.toBe(originalSlides);
        });
    });

    describe('duplicateSlide', () => {
        it('duplicates a slide after the original slide', () => {
            const presentation = createPresentation([
                createSlide('slide_01', 'First slide'),
                createSlide('slide_02', 'Second slide')
            ]);

            let idCounter = 0;

            const generateId = () => {
                idCounter += 1;
                return `generated_${idCounter}`;
            };

            const result = duplicateSlide(
                presentation,
                'slide_01',
                generateId
            );

            expect(result.slides.map(slide => slide.id))
                .toEqual([
                    'slide_01',
                    'generated_1',
                    'slide_02'
                ]);

            expect(result.slides[1].name)
                .toBe('First slide — копия');
        });

        it('duplicates all objects with new ids', () => {
            const presentation = createPresentation([
                {
                    ...createSlide('slide_01', 'First slide'),
                    objects: [
                        {
                            id: 'text_01',
                            type: 'text',
                            text: 'Hello',
                            position: {
                                x: 10,
                                y: 20
                            },
                            size: {
                                width: 100,
                                height: 50
                            },
                            textStyle: {
                                fontFamily: 'Arial',
                                fontSize: 20,
                                color: '#000000'
                            }
                        },
                        {
                            id: 'media_01',
                            type: 'media',
                            src: 'image.png',
                            position: {
                                x: 30,
                                y: 40
                            },
                            size: {
                                width: 200,
                                height: 100
                            },
                            mediaType: 'image'
                        }
                    ]
                }
            ]);

            let idCounter = 0;

            const generateId = () => {
                idCounter += 1;
                return `generated_${idCounter}`;
            };

            const result = duplicateSlide(
                presentation,
                'slide_01',
                generateId
            );

            const originalSlide = presentation.slides[0];
            const duplicatedSlide = result.slides[1];

            expect(duplicatedSlide.objects).toHaveLength(2);

            expect(duplicatedSlide.objects[0].id)
                .toBe('generated_2');

            expect(duplicatedSlide.objects[1].id)
                .toBe('generated_3');

            expect(duplicatedSlide.objects[0].id)
                .not.toBe(originalSlide.objects[0].id);

            expect(duplicatedSlide.objects[1].id)
                .not.toBe(originalSlide.objects[1].id);

            expect(duplicatedSlide.objects[0]).toMatchObject({
                type: 'text',
                text: 'Hello',
                position: {
                    x: 10,
                    y: 20
                },
                size: {
                    width: 100,
                    height: 50
                }
            });

            expect(duplicatedSlide.objects[1]).toMatchObject({
                type: 'media',
                src: 'image.png',
                position: {
                    x: 30,
                    y: 40
                },
                size: {
                    width: 200,
                    height: 100
                },
                mediaType: 'image'
            });
        });

        it('does nothing when the id does not exist', () => {
            const presentation = createPresentation([
                createSlide('slide_01', 'First slide')
            ]);

            const generateId = () => 'new_id';

            const result = duplicateSlide(
                presentation,
                'unknown_slide',
                generateId
            );

            expect(result).toBe(presentation);
        });

        it('does not mutate the original presentation', () => {
            const presentation = createPresentation([
                createSlide('slide_01', 'First slide')
            ]);

            const originalSlides = presentation.slides;

            const result = duplicateSlide(
                presentation,
                'slide_01',
                () => 'new_id'
            );

            expect(presentation.slides).toBe(originalSlides);
            expect(presentation.slides).toHaveLength(1);
            expect(result.slides).toHaveLength(2);
            expect(result.slides).not.toBe(originalSlides);
        });

        it('creates a new objects array', () => {
            const presentation = createPresentation([
                createSlide('slide_01', 'First slide')
            ]);

            const result = duplicateSlide(
                presentation,
                'slide_01',
                () => 'new_id'
            );

            expect(result.slides[1].objects)
                .not.toBe(presentation.slides[0].objects);
        });
    });

    describe('setSlideBackgroundColor', () => {
        it('sets a color background', () => {
            const slide = createSlide(
                'slide_01',
                'First slide'
            );

            const result = setSlideBackgroundColor(
                slide,
                '#ff0000'
            );

            expect(result.background).toEqual({
                type: 'color',
                color: '#ff0000'
            });
        });

        it('does not mutate the original slide', () => {
            const slide = createSlide(
                'slide_01',
                'First slide'
            );

            const result = setSlideBackgroundColor(
                slide,
                '#ffffff'
            );

            expect(slide.background).toBe(defaultBackground);
            expect(result).not.toBe(slide);
        });
    });

    describe('setSlideBackgroundImage', () => {
        it('sets an image background', () => {
            const slide = createSlide(
                'slide_01',
                'First slide'
            );

            const result = setSlideBackgroundImage(
                slide,
                'image.png'
            );

            expect(result.background).toEqual({
                type: 'image',
                src: 'image.png'
            });
        });

        it('does not mutate the original slide', () => {
            const slide = createSlide(
                'slide_01',
                'First slide'
            );

            const result = setSlideBackgroundImage(
                slide,
                'image.png'
            );

            expect(slide.background).toBe(defaultBackground);
            expect(result).not.toBe(slide);
        });
    });

    describe('setGradientBackground', () => {
        it('sets a gradient with the specified angle', () => {
            const slide = createSlide(
                'slide_01',
                'First slide'
            );

            const result = setGradientBackground(
                slide,
                ['#ff0000', '#0000ff'],
                45
            );

            expect(result.background).toEqual({
                type: 'gradient',
                colors: ['#ff0000', '#0000ff'],
                angle: 45
            });
        });

        it('uses zero as the default angle for a non-gradient background', () => {
            const slide = createSlide(
                'slide_01',
                'First slide'
            );

            const result = setGradientBackground(
                slide,
                ['#ff0000', '#0000ff']
            );

            expect(result.background).toEqual({
                type: 'gradient',
                colors: ['#ff0000', '#0000ff'],
                angle: 0
            });
        });

        it('preserves the current angle when angle is omitted', () => {
            const slide: Slide = {
                ...createSlide('slide_01', 'First slide'),
                background: {
                    type: 'gradient',
                    colors: ['#ff0000', '#0000ff'],
                    angle: 135
                }
            };

            const result = setGradientBackground(
                slide,
                ['#00ff00', '#ffffff']
            );

            expect(result.background).toEqual({
                type: 'gradient',
                colors: ['#00ff00', '#ffffff'],
                angle: 135
            });
        });

        it('replaces the current angle when a new angle is specified', () => {
            const slide: Slide = {
                ...createSlide('slide_01', 'First slide'),
                background: {
                    type: 'gradient',
                    colors: ['#ff0000', '#0000ff'],
                    angle: 135
                }
            };

            const result = setGradientBackground(
                slide,
                ['#00ff00', '#ffffff'],
                270
            );

            expect(result.background).toEqual({
                type: 'gradient',
                colors: ['#00ff00', '#ffffff'],
                angle: 270
            });
        });

        it('supports negative and large angles', () => {
            const slide = createSlide(
                'slide_01',
                'First slide'
            );

            const result = setGradientBackground(
                slide,
                ['#ff0000'],
                -360
            );

            expect(result.background).toEqual({
                type: 'gradient',
                colors: ['#ff0000'],
                angle: -360
            });
        });

        it('does not mutate the original slide', () => {
            const slide = createSlide(
                'slide_01',
                'First slide'
            );

            const result = setGradientBackground(
                slide,
                ['#ff0000', '#0000ff'],
                90
            );

            expect(slide.background).toBe(defaultBackground);
            expect(result).not.toBe(slide);
        });
    });

    describe('clearSlideBackground', () => {
        it('sets the default background', () => {
            const slide: Slide = {
                ...createSlide('slide_01', 'First slide'),
                background: {
                    type: 'color',
                    color: '#ff0000'
                }
            };

            const result = clearSlideBackground(slide);

            expect(result.background).toBe(defaultBackground);
        });

        it('replaces an image background', () => {
            const slide: Slide = {
                ...createSlide('slide_01', 'First slide'),
                background: {
                    type: 'image',
                    src: 'image.png'
                }
            };

            const result = clearSlideBackground(slide);

            expect(result.background).toBe(defaultBackground);
        });

        it('replaces a gradient background', () => {
            const slide: Slide = {
                ...createSlide('slide_01', 'First slide'),
                background: {
                    type: 'gradient',
                    colors: ['#ff0000', '#0000ff'],
                    angle: 90
                }
            };

            const result = clearSlideBackground(slide);

            expect(result.background).toBe(defaultBackground);
        });

        it('does not mutate the original slide', () => {
            const slide: Slide = {
                ...createSlide('slide_01', 'First slide'),
                background: {
                    type: 'color',
                    color: '#ff0000'
                }
            };

            const result = clearSlideBackground(slide);

            expect(slide.background).toEqual({
                type: 'color',
                color: '#ff0000'
            });

            expect(result).not.toBe(slide);
        });
    });
});