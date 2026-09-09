import { describe, it, expect } from 'vitest';
import type { Slide } from '../types/slide';
import type {
    TextObject,
    MediaObject
} from '../types/objects';
import {
    addTextObject,
    addMediaObject,
    removeObject,
    moveObject,
    resizeObject,
    updateTextObjectStyle
} from '../functions/objects';

function createSlide(
    objects: Slide['objects'] = []
): Slide
{
    return {
        id: 'slide_01',
        name: 'Test slide',
        description: '',
        background: {
            type: 'color',
            color: '#ffffff'
        },
        objects
    };
}

function createTextObject(
    id: string = 'text_01'
): TextObject
{
    return {
        id,
        position: {
            x: 10,
            y: 20
        },
        size: {
            width: 100,
            height: 50
        },
        type: 'text',
        text: 'Hello',
        textStyle: {
            fontFamily: 'Arial',
            fontSize: 20,
            color: '#000000'
        }
    };
}

function createMediaObject(
    id: string = 'media_01'
): MediaObject
{
    return {
        id,
        position: {
            x: 30,
            y: 40
        },
        size: {
            width: 200,
            height: 100
        },
        type: 'media',
        src: 'image.png',
        mediaType: 'image'
    };
}

describe('object actions', () => {
    describe('addTextObject', () => {
        it('adds a text object', () => {
            const slide = createSlide();

            const result = addTextObject(
                slide,
                'text_01',
                10,
                20,
                100,
                50,
                'Hello',
                'Arial',
                20,
                '#000000'
            );

            expect(result.objects).toHaveLength(1);
            expect(result.objects[0]).toEqual({
                id: 'text_01',
                position: {
                    x: 10,
                    y: 20
                },
                size: {
                    width: 100,
                    height: 50
                },
                type: 'text',
                text: 'Hello',
                textStyle: {
                    fontFamily: 'Arial',
                    fontSize: 20,
                    color: '#000000'
                }
            });
        });

        it('adds a text object after existing objects', () => {
            const slide = createSlide([
                createMediaObject()
            ]);

            const result = addTextObject(
                slide,
                'text_01',
                0,
                0,
                0,
                0,
                '',
                '',
                0,
                ''
            );

            expect(result.objects).toHaveLength(2);
            expect(result.objects[0].id).toBe('media_01');
            expect(result.objects[1].id).toBe('text_01');
        });

        it('does not mutate the original slide', () => {
            const slide = createSlide();

            const result = addTextObject(
                slide,
                'text_01',
                10,
                20,
                100,
                50,
                'Hello',
                'Arial',
                20,
                '#000000'
            );

            expect(slide.objects).toEqual([]);
            expect(result).not.toBe(slide);
            expect(result.objects).not.toBe(slide.objects);
        });
    });

    describe('addMediaObject', () => {
        it('adds a media object', () => {
            const slide = createSlide();

            const result = addMediaObject(
                slide,
                'media_01',
                10,
                20,
                300,
                200,
                'image.png',
                'image'
            );

            expect(result.objects).toHaveLength(1);
            expect(result.objects[0]).toEqual({
                id: 'media_01',
                position: {
                    x: 10,
                    y: 20
                },
                size: {
                    width: 300,
                    height: 200
                },
                type: 'media',
                src: 'image.png',
                mediaType: 'image'
            });
        });

        it('adds a media object after existing objects', () => {
            const slide = createSlide([
                createTextObject()
            ]);

            const result = addMediaObject(
                slide,
                'media_01',
                0,
                0,
                0,
                0,
                '',
                'image'
            );

            expect(result.objects).toHaveLength(2);
            expect(result.objects[0].id).toBe('text_01');
            expect(result.objects[1].id).toBe('media_01');
        });

        it('does not mutate the original slide', () => {
            const slide = createSlide();

            const result = addMediaObject(
                slide,
                'media_01',
                10,
                20,
                100,
                50,
                'image.png',
                'image'
            );

            expect(slide.objects).toEqual([]);
            expect(result).not.toBe(slide);
            expect(result.objects).not.toBe(slide.objects);
        });
    });

    describe('removeObject', () => {
        it('removes an existing object', () => {
            const slide = createSlide([
                createTextObject(),
                createMediaObject()
            ]);

            const result = removeObject(
                slide,
                'text_01'
            );

            expect(result.objects.map(object => object.id))
                .toEqual(['media_01']);
        });

        it('does nothing when the object id does not exist', () => {
            const slide = createSlide([
                createTextObject()
            ]);

            const result = removeObject(
                slide,
                'unknown_object'
            );

            expect(result.objects).toEqual(slide.objects);
            expect(result).not.toBe(slide);
        });

        it('does nothing when the object list is empty', () => {
            const slide = createSlide();

            const result = removeObject(
                slide,
                'unknown_object'
            );

            expect(result.objects).toEqual([]);
        });

        it('does not mutate the original slide', () => {
            const slide = createSlide([
                createTextObject()
            ]);

            const result = removeObject(
                slide,
                'text_01'
            );

            expect(slide.objects).toHaveLength(1);
            expect(result.objects).toHaveLength(0);
            expect(result).not.toBe(slide);
            expect(result.objects).not.toBe(slide.objects);
        });
    });

    describe('moveObject', () => {
        it('moves an object to a new position', () => {
            const slide = createSlide([
                createTextObject()
            ]);

            const result = moveObject(
                slide,
                'text_01',
                100,
                200
            );

            expect(result.objects[0].position).toEqual({
                x: 100,
                y: 200
            });
        });

        it('does nothing when the object id does not exist', () => {
            const slide = createSlide([
                createTextObject()
            ]);

            const result = moveObject(
                slide,
                'unknown_object',
                100,
                200
            );

            expect(result).toBe(slide);
        });

        it('preserves the object size', () => {
            const slide = createSlide([
                createTextObject()
            ]);

            const result = moveObject(
                slide,
                'text_01',
                100,
                200
            );

            expect(result.objects[0].size).toEqual({
                width: 100,
                height: 50
            });
        });

        it('does not mutate the original slide', () => {
            const slide = createSlide([
                createTextObject()
            ]);

            const originalObject = slide.objects[0];

            const result = moveObject(
                slide,
                'text_01',
                100,
                200
            );

            expect(slide.objects[0]).toBe(originalObject);
            expect(slide.objects[0].position).toEqual({
                x: 10,
                y: 20
            });

            expect(result.objects[0]).not.toBe(originalObject);
            expect(result).not.toBe(slide);
            expect(result.objects).not.toBe(slide.objects);
        });
    });

    describe('resizeObject', () => {
        it('changes an object size', () => {
            const slide = createSlide([
                createTextObject()
            ]);

            const result = resizeObject(
                slide,
                'text_01',
                300,
                150
            );

            expect(result.objects[0].size).toEqual({
                width: 300,
                height: 150
            });
        });

        it('does not allow a negative size', () => {
            const slide = createSlide([
                createTextObject()
            ]);

            const result = resizeObject(
                slide,
                'text_01',
                -1,
                100
            );

            expect(result).toBe(slide);
        });

        it('does nothing when the object id does not exist', () => {
            const slide = createSlide([
                createTextObject()
            ]);

            const result = resizeObject(
                slide,
                'unknown_object',
                100,
                200
            );

            expect(result).toBe(slide);
        });

        it('does not mutate the original slide', () => {
            const slide = createSlide([
                createTextObject()
            ]);

            const originalObject = slide.objects[0];

            const result = resizeObject(
                slide,
                'text_01',
                300,
                150
            );

            expect(slide.objects[0]).toBe(originalObject);
            expect(slide.objects[0].size).toEqual({
                width: 100,
                height: 50
            });

            expect(result.objects[0]).not.toBe(originalObject);
            expect(result).not.toBe(slide);
            expect(result.objects).not.toBe(slide.objects);
        });
    });

    describe('updateTextObjectStyle', () => {
        it('updates the style of a text object', () => {
            const slide = createSlide([
                createTextObject()
            ]);

            const result = updateTextObjectStyle(
                slide,
                'text_01',
                'Times New Roman',
                32,
                '#ff0000'
            );

            expect(result.objects[0]).toMatchObject({
                type: 'text',
                textStyle: {
                    fontFamily: 'Times New Roman',
                    fontSize: 32,
                    color: '#ff0000'
                }
            });
        });

        it('updates only the selected text object', () => {
            const slide = createSlide([
                createTextObject('text_01'),
                createTextObject('text_02')
            ]);

            const result = updateTextObjectStyle(
                slide,
                'text_01',
                'Verdana',
                40,
                '#00ff00'
            );

            expect(result.objects[0]).toMatchObject({
                textStyle: {
                    fontFamily: 'Verdana',
                    fontSize: 40,
                    color: '#00ff00'
                }
            });

            expect(result.objects[1]).toMatchObject({
                textStyle: {
                    fontFamily: 'Arial',
                    fontSize: 20,
                    color: '#000000'
                }
            });
        });

        it('does nothing when the object id does not exist', () => {
            const slide = createSlide([
                createTextObject()
            ]);

            const result = updateTextObjectStyle(
                slide,
                'unknown_object',
                'Verdana',
                40,
                '#00ff00'
            );

            expect(result).toBe(slide);
        });

        it('does not mutate the original slide', () => {
            const slide = createSlide([
                createTextObject()
            ]);

            const originalObject = slide.objects[0];

            const result = updateTextObjectStyle(
                slide,
                'text_01',
                'Verdana',
                40,
                '#00ff00'
            );

            expect(slide.objects[0]).toBe(originalObject);
            expect(slide.objects[0]).toMatchObject({
                textStyle: {
                    fontFamily: 'Arial',
                    fontSize: 20,
                    color: '#000000'
                }
            });

            expect(result.objects[0]).not.toBe(originalObject);
            expect(result).not.toBe(slide);
            expect(result.objects).not.toBe(slide.objects);
        });
    });
});