// NOTE: Файл сокращён до ~430 строк. Дальнейшее сокращение потребует
// удаления или объединения тестов и снизит полноту покрытия функций.

import { describe, it, expect } from 'vitest';
import type { Slide } from '../types/slide';
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
        // TODO: Сократить тест
        it('duplicates a slide and all its objects with new ids', () => {
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
                },
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

            const originalSlide = presentation.slides[0];
            const duplicatedSlide = result.slides[1];

            expect(result.slides.map(slide => slide.id))
                .toEqual([
                    'slide_01',
                    'generated_1',
                    'slide_02'
                ]);

            expect(duplicatedSlide.name)
                .toBe('First slide — копия');

            expect(duplicatedSlide.objects).toHaveLength(2);

            expect(duplicatedSlide.objects[0]).toEqual({
                id: 'generated_2',
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
            });

            expect(duplicatedSlide.objects[1]).toEqual({
                id: 'generated_3',
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

            expect(duplicatedSlide.objects[0].id)
                .not.toBe(originalSlide.objects[0].id);

            expect(duplicatedSlide.objects[1].id)
                .not.toBe(originalSlide.objects[1].id);

            expect(result).not.toBe(presentation);
            expect(result.slides).not.toBe(presentation.slides);
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
    });

    describe('setSlideBackgroundColor', () => {
        it('sets a color background without mutating the slide', () => {
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
            expect(slide.background).toBe(defaultBackground);
            expect(result).not.toBe(slide);
        });
    });

    describe('setSlideBackgroundImage', () => {
        it('sets an image background without mutating the slide', () => {
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

            expect(result).not.toBe(slide);
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
    });

    describe('clearSlideBackground', () => {
        it('sets the default background without mutating the slide', () => {
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
            expect(result.background).toBe(defaultBackground);
        });
    });
});