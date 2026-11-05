import type { Slide } from '../../types/slide.js';
import {
    changeSlideBackgroundColor,
    changeSlideGradient,
    resetSlideBackground
} from '../../editor.js';
import {
    addTextObjectToSlide,
    addImageObjectToSlide,
    setSlideBackgroundImage
} from '../../services/slidePropertiesService.js';
import { toColorInputValue } from '../../utils/color.js';
import { TextInput } from '../ui/textInput/TextInput.js';
import { Button } from '../ui/button/Button.js';
import { FileButton } from '../ui/fileButton/FileButton.js';
import styles from './SlideProperties.module.css';
import { 
    DEFAULT_COLOR,
    DEFAULT_GRADIENT_COLORS,
    DEFAULT_GRADIENT_ANGLE
} from '../../constants.js';

type SlidePropertiesProps = {
    slide: Slide;
}

function SlideProperties({ 
    slide 
}: SlidePropertiesProps)
{
    const { background } = slide;

    const backgroundColor = background.type === 'color'
        ? background.color
        : undefined;

    const colorValue = toColorInputValue(backgroundColor) || DEFAULT_COLOR;

    const gradientColors = background.type === 'gradient' && background.colors.length >= 2
        ? background.colors
        : DEFAULT_GRADIENT_COLORS;
    const gradientAngle = background.type === 'gradient'
        ? background.angle
        : DEFAULT_GRADIENT_ANGLE;

    function applyGradientColor(stopIndex: number, color: string): void
    {
        changeSlideGradient(
            slide.id,
            gradientColors.map((current, index) =>
                index === stopIndex ? color : current
            ),
            gradientAngle
        );
    }

    function applyGradientAngle(value: string): void
    {
        const angle = Number(value);

        if (value.trim() === '' || !Number.isFinite(angle))
        {
            return;
        }

        changeSlideGradient(slide.id, gradientColors, angle);
    }

    async function handleBackgroundImage(file: File): Promise<void>
    {
        await runImageAction(() => setSlideBackgroundImage(slide.id, file));
    }

    async function handleAddImage(file: File): Promise<void>
    {
        await runImageAction(() => addImageObjectToSlide(slide, file));
    }

    async function runImageAction(action: () => Promise<void>): Promise<void>
    {
        try
        {
            await action();
        }
        catch (error)
        {
            window.alert(error instanceof Error ? error.message : 'Не удалось обработать изображение');
        }
    }

    return (
        <div className={styles.panel}>
            <div>
                <h2 className={styles.heading}>Фон слайда</h2>

                <label className={styles.row}>
                    Цвет
                    <TextInput
                        type="color"
                        value={colorValue}
                        onChange={color => changeSlideBackgroundColor(slide.id, color)}
                    />
                </label>

                <div className={styles.group}>
                    <span className={styles.groupTitle}>Градиент</span>
                    <div className={styles.row}>
                        <TextInput
                            type="color"
                            value={toColorInputValue(gradientColors[0]) || DEFAULT_COLOR}
                            onChange={color => applyGradientColor(0, color)}
                        />
                        <TextInput
                            type="color"
                            value={toColorInputValue(gradientColors[1]) || DEFAULT_COLOR}
                            onChange={color => applyGradientColor(1, color)}
                        />
                        <TextInput
                            type="number"
                            className={styles.angle}
                            value={String(gradientAngle)}
                            onChange={applyGradientAngle}
                        />
                        <span className={styles.unit}>°</span>
                    </div>
                </div>

                <div className={styles.buttons}>
                    <FileButton
                        text="Изображение…"
                        accept="image/*"
                        onSelect={handleBackgroundImage}
                    />
                    <Button
                        text="Сбросить"
                        onClick={() => resetSlideBackground(slide.id)}
                    />
                </div>
            </div>

            <div className={styles.section}>
                <h2 className={styles.heading}>Добавить объект</h2>
                <div className={styles.buttons}>
                    <Button text="Текст" onClick={() => addTextObjectToSlide(slide)} />
                    <FileButton
                        text="Изображение…"
                        accept="image/*"
                        onSelect={handleAddImage}
                    />
                </div>
            </div>
        </div>
    );
}

export { SlideProperties };
