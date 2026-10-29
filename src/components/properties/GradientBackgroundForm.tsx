import type { Slide } from '../../types/slide';
import { changeSlideGradient } from '../../editor.js';

import { TextInput } from '../common/textInput/TextInput';
import { ColorPicker } from '../common/colorPicker/ColorPicker';
import styles from './SlideProperties.module.css';

type GradientBackgroundFormProps = {
    slide: Slide;
};

function GradientBackgroundForm({ slide }: GradientBackgroundFormProps)
{
    const gradientColors =
        slide.background.type === 'gradient'
            ? slide.background.colors
            : [];

    const firstGradientColor = gradientColors[0] ?? '#ffffff';
    const secondGradientColor = gradientColors[1] ?? '#000000';

    const gradientAngle =
        slide.background.type === 'gradient'
            ? slide.background.angle
            : 0;

    function handleFirstColorChange(color: string): void
    {
        changeSlideGradient(
            slide.id,
            [color, secondGradientColor],
            gradientAngle
        );
    }

    function handleSecondColorChange(color: string): void
    {
        changeSlideGradient(
            slide.id,
            [firstGradientColor, color],
            gradientAngle
        );
    }

    function handleAngleChange(value: string): void
    {
        if (!value.trim()) return;

        const angle = Number(value);

        if (!Number.isFinite(angle)) return;

        changeSlideGradient(
            slide.id,
            [firstGradientColor, secondGradientColor],
            angle
        );
    }

    return (
        <section className={styles.form}>
            <span className={styles.label}>
                Градиент
            </span>

            <div className={styles.colorRow}>
                <ColorPicker
                    name="firstColor"
                    value={firstGradientColor}
                    onChange={handleFirstColorChange}
                />

                <ColorPicker
                    name="secondColor"
                    value={secondGradientColor}
                    onChange={handleSecondColorChange}
                />
            </div>

            <TextInput
                key={slide.id}
                type="number"
                name="angle"
                defaultValue={String(gradientAngle)}
                onChange={handleAngleChange}
            />

            <span className={styles.unit}>
                градусов
            </span>
        </section>
    );
}

export { GradientBackgroundForm };