import type { Slide } from '../../types/slide';
import { 
    changeSlideBackgroundColor, 
    changeSlideBackgroundImage, 
    changeSlideGradient, 
    resetSlideBackground, 
    addTextToSlide, 
    addImageToSlide 
} from '../../editor.js';

import { Button } from '../common/button/Button';
import { TextInput } from '../common/textInput/TextInput';
import type { Point, Size, TextStyle } from '../../types/objects';
import styles from './SlideProperties.module.css';

type SlidePropertiesProps = {
    slide: Slide;
};

function SlideProperties({
    slide
}: SlidePropertiesProps)
{
    function handleBackgroundColorChange(color: string): void 
    { 
        changeSlideBackgroundColor(slide.id, color); 
    }

    function handleBackgroundImageSubmit(event: React.SubmitEvent<HTMLFormElement>): void
    {
        event.preventDefault();

        const imageUrl = new FormData(event.currentTarget).get('imageUrl') as string;
        if (!imageUrl.trim()) return;

        changeSlideBackgroundImage(slide.id, imageUrl.trim());
    }

    function handleGradientSubmit(event: React.SubmitEvent<HTMLFormElement>): void
    {
        event.preventDefault();

        const form = new FormData(event.currentTarget);
        const firstColor = form.get('firstColor') as string;
        const secondColor = form.get('secondColor') as string;
        const angle = Number(form.get('angle'));

        if (!Number.isFinite(angle)) return;

        changeSlideGradient(slide.id, [firstColor, secondColor], angle);
    }

    function handleClearBackground(): void 
    { 
        resetSlideBackground(slide.id); 
    }

    function handleAddText(): void 
    { 
        const position: Point = { x: 50, y: 50 };
        const size: Size = { width: 300, height: 60 };
        const textStyle: TextStyle = { fontFamily: 'Arial', fontSize: 24, color: '#000000' };
        addTextToSlide(slide.id, crypto.randomUUID(), position, size, 'Новый текст', textStyle);
    }

    function handleAddImageSubmit(event: React.SubmitEvent<HTMLFormElement>): void
    {
        const formData = new FormData(event.currentTarget);
        const value = formData.get('imageUrl');

        if (typeof value !== 'string' || !value.trim()) return;

        const imageUrl = value.trim();

        const position: Point = { x: 50, y: 50 };
        const size: Size = { width: 300, height: 200 };
        addImageToSlide(slide.id, crypto.randomUUID(), position, size, imageUrl);
        event.currentTarget.reset();
    }

    const gradientColors = slide.background.type === 'gradient' ? slide.background.colors : [];
    const firstGradientColor = gradientColors[0] ?? '#ffffff';
    const secondGradientColor = gradientColors[1] ?? '#000000';
    const gradientAngle = slide.background.type === 'gradient' ? slide.background.angle : 0;

    const backgroundColor = slide.background.type === 'color' ? slide.background.color : '#ffffff';

    return (
        <aside className={styles.properties}>
            <h3 className={styles.title}>
                Свойства слайда
            </h3>

            <section className={styles.section}>
                <h4 className={styles.sectionTitle}>
                    Фон
                </h4>

                <div className={styles.control}>
                    <label className={styles.label}>
                        Цвет
                    </label>

                    <TextInput
                        type="color"
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
                        name="imageUrl"
                        placeholder="URL изображения"
                        id="background-image-url"
                    />

                    <Button
                        text="Установить"
                        type="submit"
                    />
                </form>

                <form
                    className={styles.form}
                    onSubmit={handleGradientSubmit}
                >
                    <span className={styles.label}>
                        Градиент
                    </span>

                    <div className={styles.colorRow}>
                        <TextInput
                            type="color"
                            name="firstColor"
                            defaultValue={firstGradientColor}
                        />

                        <TextInput
                            type="color"
                            name="secondColor"
                            defaultValue={secondGradientColor}
                        />
                    </div>

                    <TextInput
                        type="number"
                        name="angle"
                        defaultValue={String(gradientAngle)}
                    />

                    <span className={styles.unit}>
                        градусов
                    </span>

                    <Button
                        text="Применить"
                        type="submit"
                    />
                </form>

                <Button
                    text="Сбросить фон"
                    onClick={handleClearBackground}
                />
            </section>

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
        </aside>
    );
}

export { SlideProperties };