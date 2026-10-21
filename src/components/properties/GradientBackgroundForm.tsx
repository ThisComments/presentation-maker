import type { Slide } from '../../types/slide';
import { changeSlideGradient } from '../../editor.js';

import { Button } from '../common/button/Button';
import { TextInput } from '../common/textInput/TextInput';
import { ColorPicker } from '../common/colorPicker/ColorPicker';
import styles from './SlideProperties.module.css';

type GradientBackgroundFormProps = {
    slide: Slide;
};

function GradientBackgroundForm({ slide }: GradientBackgroundFormProps)
{
    function handleGradientSubmit(event: React.SubmitEvent<HTMLFormElement>): void
    {
        event.preventDefault();

        const form = new FormData(event.currentTarget);
        const firstColor = form.get('firstColor');
        const secondColor = form.get('secondColor');
        const angleValue = form.get('angle');

        if (
            typeof firstColor !== 'string' ||
            typeof secondColor !== 'string' ||
            typeof angleValue !== 'string' ||
            !angleValue.trim()
        ) {
            return;
        }

        const angle = Number(angleValue);

        if (!Number.isFinite(angle)) return;

        changeSlideGradient(slide.id, [firstColor, secondColor], angle);
    }

    const gradientColors = slide.background.type === 'gradient' ? slide.background.colors : [];

    const firstGradientColor = gradientColors[0] ?? '#ffffff';
    const secondGradientColor = gradientColors[1] ?? '#000000';

    const gradientAngle = slide.background.type === 'gradient' ? slide.background.angle : 0;

    return (
        <form
            className={styles.form}
            onSubmit={handleGradientSubmit}
        >
            <span className={styles.label}>
                Градиент
            </span>

            <div className={styles.colorRow}>
                <ColorPicker
                    name="firstColor"
                    value={firstGradientColor}
                />

                <ColorPicker
                    name="secondColor"
                    value={secondGradientColor}
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
    );
}

export { GradientBackgroundForm };