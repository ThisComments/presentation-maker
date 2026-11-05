import type { CSSProperties } from 'react';
import type { Slide, Background } from '../../types/slide.js';
import { SLIDE_WIDTH, SLIDE_HEIGHT } from '../../constants.js';
import { SlideObject } from '../slideObject/SlideObject.js';
import styles from './SlidePreview.module.css';
import { DEFAULT_COLOR } from '../../constants.js';

type SlidePreviewProps = {
    slide: Slide;
    className?: string;
}

function getBackgroundStyle(
    background: Background
): CSSProperties
{
    switch (background.type)
    {
        case 'color':
            return { backgroundColor: background.color };

        case 'image':
            return {
                backgroundColor: DEFAULT_COLOR,
                backgroundImage: `url("${background.src}")`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            };

        case 'gradient':
            if (background.colors.length === 0)
            {
                return { backgroundColor: DEFAULT_COLOR };
            }

            if (background.colors.length === 1)
            {
                return { backgroundColor: background.colors[0] };
            }

            return {
                backgroundColor: DEFAULT_COLOR,
                backgroundImage:
                    `linear-gradient(${background.angle}deg, ${background.colors.join(', ')})`
            };
    }
}

function SlidePreview({ 
    slide, 
    className = ''
}: SlidePreviewProps)
{
    const style: CSSProperties = {
        ...getBackgroundStyle(slide.background),
        aspectRatio: `${SLIDE_WIDTH} / ${SLIDE_HEIGHT}`
    };

    return (
        <div
            className={`
                ${styles.slide}
                ${className}
            `}
            style={style}
        >
            {slide.objects.map(object => (
                <SlideObject
                    key={object.id}
                    object={object}
                />
            ))}
        </div>
    );
}

export { SlidePreview };
