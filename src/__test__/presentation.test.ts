import { describe, it, expect } from 'vitest';
import type { Presentation } from '../types/presentation';
import {
    updatePresentationName,
    savePresentation,
    loadPresentation,
    createPresentation
} from '../functions/presentation';

describe('presentation actions', () => {
    it('create presentation', () => {
        let idCounter = 0;
        const generateId = () => {
            idCounter += 1;
            return `generated_${idCounter}`;
        };

        const presentation = createPresentation(
            'my_presentation',
            generateId
        );

        expect(presentation).toEqual({
            id: 'generated_2',
            name: 'my_presentation',
            slides: [
                { 
                    id: 'generated_1',
                    name: 'Слайд 1',
                    description: '',
                    background: {
                        type: 'color',
                        color: 'white'
                    },
                    objects: [] 
                } 
            ]
        });
    });

    it('update presentation name', () => {
        const presentation: Presentation = {
            id: 'presentation_01',
            name: 'first_presentation',
            slides: []
        };

        const renamedPresentation = updatePresentationName(
            presentation,
            'my_presentation'
        );

        expect(renamedPresentation.name).toBe('my_presentation');
        expect(presentation.name).toBe('first_presentation');
        expect(renamedPresentation).not.toBe(presentation);
    });

    it('save presentation', () => {
        const presentation: Presentation = {
            id: 'presentation_01',
            name: 'my_presentation',
            slides: []
        };

        const json = savePresentation(presentation);

        expect(json).toBe(JSON.stringify(presentation, null, 4));
    });

    it('load presentation', () => {
        const presentation: Presentation = {
            id: 'presentation_01',
            name: 'my_presentation',
            slides: []
        };

        const json = JSON.stringify(presentation);
        const loadedPresentation = loadPresentation(json);

        expect(loadedPresentation).toEqual(presentation);
    });

    it('load invalid JSON', () => {
        expect(() => loadPresentation('{invalid json}'))
            .toThrow('Не удалось загрузить презентацию');
    });

    it('load presentation with invalid structure', () => {
        const invalidJson = JSON.stringify({
            name: 'my_presentation'
        });

        expect(() => loadPresentation(invalidJson))
            .toThrow('Неверная структура презентации');
    });
});