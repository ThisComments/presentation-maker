// NOTE: Файл сокращён до ~430 строк. Дальнейшее сокращение потребует
// удаления или объединения тестов и снизит полноту покрытия функций.

import { describe, it, expect } from 'vitest';
import type { Slide } from '../types/slide';
import type {
    SlideObject,
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
import {
    defaultBackground
} from '../types/slide'

function createSlide(
    objects: SlideObject[] = []
): Slide
{
    return {
        id: 'slide_01',
        name: 'Test slide',
        description: '',
        background: defaultBackground,
        objects
    };
}

const defaultPosition = {
    x: 10,
    y: 20
}

const defaultSize = {
    width: 100,
    height: 50
}

const defaultTextStyle = {
    fontFamily: 'Arial',
    fontSize: 20,
    color: '#000000'
}

function createTextObject(
    id: string = 'text_01'
): TextObject
{
    return {
        id,
        position: defaultPosition,
        size: defaultSize,
        type: 'text',
        text: 'Hello',
        textStyle: defaultTextStyle
    };
}

function createMediaObject(
    id: string = 'media_01'
): MediaObject
{
    return {
        id,
        position: defaultPosition,
        size: defaultSize,
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
                defaultPosition,
                defaultSize,
                'Hello',
                defaultTextStyle
            );

            expect(result.objects).toHaveLength(1);
            expect(result.objects[0]).toEqual({
                id: 'text_01',
                position: defaultPosition,
                size: defaultSize,
                type: 'text',
                text: 'Hello',
                textStyle: defaultTextStyle
            });
        });

        it('adds a text object after existing objects', () => {
            const slide = createSlide([
                createMediaObject()
            ]);

            const result = addTextObject(
                slide,
                'text_01',
                defaultPosition,
                defaultSize,
                '',
                defaultTextStyle
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
                defaultPosition,
                defaultSize,
                'Hello',
                defaultTextStyle
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
                defaultPosition,
                defaultSize,
                'image.png',
                'image'
            );

            expect(result.objects).toHaveLength(1);
            expect(result.objects[0]).toEqual({
                id: 'media_01',
                position: defaultPosition,
                size: defaultSize,
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
                defaultPosition,
                defaultSize,
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
                defaultPosition,
                defaultSize,
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
        const newPosition = {
            x: 100,
            y: 200
        }

        it('moves an object to a new position', () => {
            const slide = createSlide([
                createTextObject()
            ]);

            const result = moveObject(
                slide,
                'text_01',
                newPosition
            );

            expect(result.objects[0].position).toEqual(newPosition);
        });

        it('preserves the object size', () => {
            const slide = createSlide([
                createTextObject()
            ]);

            const result = moveObject(
                slide,
                'text_01',
                newPosition
            );

            expect(result.objects[0].size).toEqual(defaultSize);
        });

        it('does not mutate the original slide', () => {
            const slide = createSlide([
                createTextObject()
            ]);

            const originalObject = slide.objects[0];

            const result = moveObject(
                slide,
                'text_01',
                newPosition
            );

            expect(slide.objects[0]).toBe(originalObject);
            expect(slide.objects[0].position).toEqual(defaultPosition);

            expect(result.objects[0]).not.toBe(originalObject);
            expect(result).not.toBe(slide);
            expect(result.objects).not.toBe(slide.objects);
        });
    });

    describe('resizeObject', () => {
        const newSize = {
            width: 300,
            height: 150
        }

        it('changes an object size', () => {
            const slide = createSlide([
                createTextObject()
            ]);

            const result = resizeObject(
                slide,
                'text_01',
                newSize
            );

            expect(result.objects[0].size).toEqual(newSize);
        });

        it('does not allow a negative size', () => {
            const slide = createSlide([
                createTextObject()
            ]);

            const negativeSize = {
                width: -1,
                height: -1
            }

            const result = resizeObject(
                slide,
                'text_01',
                negativeSize
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
                newSize
            );

            expect(slide.objects[0]).toBe(originalObject);
            expect(slide.objects[0].size).toEqual(defaultSize);

            expect(result.objects[0]).not.toBe(originalObject);
            expect(result).not.toBe(slide);
            expect(result.objects).not.toBe(slide.objects);
        });
    });

    describe('updateTextObjectStyle', () => {
        const newTextStyle = {
            fontFamily: 'Times New Roman',
            fontSize: 32,
            color: '#ff0000'
        }

        it('updates the style of a text object', () => {
            const slide = createSlide([
                createTextObject()
            ]);

            const result = updateTextObjectStyle(
                slide,
                'text_01',
                newTextStyle
            );

            expect(result.objects[0]).toMatchObject({
                type: 'text',
                textStyle: newTextStyle
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
                newTextStyle
            );

            expect(result.objects[0]).toMatchObject({
                textStyle: newTextStyle
            });

            expect(result.objects[1]).toMatchObject({
                textStyle: defaultTextStyle
            });
        });

        it('does not mutate the original slide', () => {
            const slide = createSlide([
                createTextObject()
            ]);

            const originalObject = slide.objects[0];

            const result = updateTextObjectStyle(
                slide,
                'text_01',
                newTextStyle
            );

            expect(slide.objects[0]).toBe(originalObject);
            expect(slide.objects[0]).toMatchObject({
                textStyle: defaultTextStyle
            });

            expect(result.objects[0]).not.toBe(originalObject);
            expect(result).not.toBe(slide);
            expect(result.objects).not.toBe(slide.objects);
        });
    });
});