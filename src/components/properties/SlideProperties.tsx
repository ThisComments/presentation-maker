import type { Slide } from '../../types/slide';
import { 
    changeBackgroundColor, 
    changeBackgroundImage, 
    changeGradient, 
    clearBackground, 
    addText, 
    addImage 
} from './modifier';

import { Button } from '../common/button/Button';
import { TextInput } from '../common/textInupt/TextInput';

import styles from './SlideProperties.module.css';

type SlidePropertiesProps = {
    slide: Slide;
};

function SlideProperties({
    slide
}: SlidePropertiesProps)
{
    function handleBackgroundColorChange(color: string): void { changeBackgroundColor(slide.id, color); }

    function handleBackgroundImageSubmit(event: React.SubmitEvent<HTMLFormElement>): void
    {
        event.preventDefault();

        const imageUrl = new FormData(event.currentTarget).get('imageUrl') as string;
        if (!imageUrl.trim()) return;

        changeBackgroundImage(slide.id, imageUrl.trim());
    }

    function handleGradientSubmit(event: React.SubmitEvent<HTMLFormElement>): void
    {
        event.preventDefault();

        const form = new FormData(event.currentTarget);
        const firstColor = form.get('firstColor') as string;
        const secondColor = form.get('secondColor') as string;
        const angle = Number(form.get('angle'));

        if (!Number.isFinite(angle)) return;

        changeGradient(slide.id, [firstColor, secondColor], angle);
    }

    function handleClearBackground(): void { clearBackground(slide.id); }
    function handleAddText(): void { addText(slide.id); }

    function handleAddImageSubmit(event: React.SubmitEvent<HTMLFormElement>): void
    {
        event.preventDefault();

        const form = event.currentTarget;
        const imageUrl = form.imageUrl.value.trim();

        if (!imageUrl)
        {
            return;
        }

        addImage(slide.id, imageUrl);
        form.reset();
    }

    const gradientColors =
        slide.background.type === 'gradient'
            ? slide.background.colors
            : [];

    const firstGradientColor =
        gradientColors[0] ?? '#ffffff';

    const secondGradientColor =
        gradientColors[1] ?? '#000000';

    const gradientAngle =
        slide.background.type === 'gradient'
            ? slide.background.angle
            : 0;

    const backgroundColor =
        slide.background.type === 'color'
            ? slide.background.color
            : '#ffffff';

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