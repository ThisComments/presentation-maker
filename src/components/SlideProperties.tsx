import type { Slide } from '../types/slide';
import {
    changeSlideBackgroundColor,
    changeSlideBackgroundImage,
    changeSlideGradient,
    resetSlideBackground,
    addTextToSlide,
    addImageToSlide
} from '../editor.js';
import { Button } from './Button';
import { TextInput } from './TextInput';
import styles from './SlideProperties.module.css';
import { Point, Size, TextStyle } from '../types/objects';

type SlidePropertiesProps = {
    slide: Slide;
};

function SlideProperties({
    slide
}: SlidePropertiesProps)
{
    function handleBackgroundColorChange(color: string): void
    {
        changeSlideBackgroundColor(
            slide.id,
            color
        );
    }

    function handleBackgroundImageChange(imageUrl: string): void
    {
        changeSlideBackgroundImage(
            slide.id,
            imageUrl
        );
    }
    
    function handleGradientChange(colors: string[], angle: number): void
    {
        changeSlideGradient(
            slide.id,
            colors,
            angle
        );
    }

    function handleClearBackground(): void
    {
        resetSlideBackground(slide.id);
    }

    function handleAddText(): void
    {
        
    }

    return (
        <aside className={styles.properties}>
            <label>
                Цвет фона
            </label>

            <TextInput
                type="color"
                value={
                    slide.background.type === 'color'
                        ? slide.background.color
                        : '#ffffff'
                }
                onChange={handleBackgroundColorChange}
            />
        </aside>
    );
}

export { SlideProperties };