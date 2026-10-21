import type { Slide } from '../../types/slide';
import {
    changeSlideBackgroundColor,
    changeSlideBackgroundImage,
    resetSlideBackground
} from '../../editor.js';

import { Button } from '../common/button/Button';
import { TextInput } from '../common/textInput/TextInput';
import { ColorPicker } from '../common/colorPicker/ColorPicker';
import { GradientBackgroundForm } from './GradientBackgroundForm';
import styles from './SlideProperties.module.css';

type SlideBackgroundPropertiesProps = {
    slide: Slide;
};

function SlideBackgroundProperties({ slide }: SlideBackgroundPropertiesProps)
{
    function handleBackgroundColorChange(color: string): void
    {
        changeSlideBackgroundColor(slide.id, color);
    }

    function handleBackgroundImageSubmit(event: React.SubmitEvent<HTMLFormElement>): void
    {
        event.preventDefault();

        const value = new FormData(event.currentTarget).get('imageUrl');

        if (typeof value !== 'string' || !value.trim()) return;

        changeSlideBackgroundImage(slide.id, value.trim());
    }

    function handleClearBackground(): void
    {
        resetSlideBackground(slide.id);
    }

    const backgroundColor = slide.background.type === 'color' ? slide.background.color : '#ffffff';
    const backgroundImageUrl = slide.background.type === 'image' ? slide.background.src : '';

    return (
        <section className={styles.section}>
            <h4 className={styles.sectionTitle}>
                Фон
            </h4>

            <div className={styles.control}>
                <label className={styles.label}>
                    Цвет
                </label>

                <ColorPicker
                    value={backgroundColor}
                    onChange={handleBackgroundColorChange}
                />
            </div>

            <form
                className={styles.form}
                onSubmit={handleBackgroundImageSubmit}
            >
                <label
                    className={styles.label}
                    htmlFor="background-image-url"
                >
                    Изображение
                </label>

                <TextInput
                    key={`${slide.id}-${slide.background.type}`}
                    name="imageUrl"
                    placeholder="URL изображения"
                    id="background-image-url"
                    defaultValue={backgroundImageUrl}
                />

                <Button
                    text="Установить"
                    type="submit"
                />
            </form>

            <GradientBackgroundForm slide={slide} />

            <Button
                text="Сбросить фон"
                onClick={handleClearBackground}
            />
        </section>
    );
}

export { SlideBackgroundProperties };