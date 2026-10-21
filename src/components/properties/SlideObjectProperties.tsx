import type { Slide } from '../../types/slide';
import { addTextToSlide, addImageToSlide } from '../../editor.js';

import { Button } from '../common/button/Button';
import { TextInput } from '../common/textInput/TextInput';
import type { Point, Size, TextStyle } from '../../types/objects';
import styles from './SlideProperties.module.css';

type SlideObjectPropertiesProps = {
    slide: Slide;
};

function SlideObjectProperties({ slide }: SlideObjectPropertiesProps)
{
    function handleAddText(): void
    {
        const position: Point = { x: 50, y: 50 };
        const size: Size = { width: 300, height: 60 };
        const textStyle: TextStyle = {
            fontFamily: 'Arial',
            fontSize: 24,
            color: '#000000'
        };

        addTextToSlide(
            slide.id,
            crypto.randomUUID(),
            position,
            size,
            'Новый текст',
            textStyle
        );
    }

    function handleAddImageSubmit(event: React.SubmitEvent<HTMLFormElement>): void
    {
        event.preventDefault();

        const value = new FormData(event.currentTarget).get('imageUrl');

        if (typeof value !== 'string' || !value.trim()) return;

        const position: Point = { x: 50, y: 50 };
        const size: Size = { width: 300, height: 200 };

        addImageToSlide(
            slide.id,
            crypto.randomUUID(),
            position,
            size,
            value.trim()
        );

        event.currentTarget.reset();
    }

    return (
        <section className={styles.section}>
            <h4 className={styles.sectionTitle}>
                Объекты
            </h4>

            <Button
                text="+ Добавить текст"
                onClick={handleAddText}
            />

            <form
                className={styles.form}
                onSubmit={handleAddImageSubmit}
            >
                <label
                    className={styles.label}
                    htmlFor="object-image-url"
                >
                    Изображение
                </label>

                <TextInput
                    name="imageUrl"
                    placeholder="URL изображения"
                    id="object-image-url"
                />

                <Button
                    text="+ Добавить изображение"
                    type="submit"
                />
            </form>
        </section>
    );
}

export { SlideObjectProperties };