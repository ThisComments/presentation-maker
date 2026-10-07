import type { Slide } from '../types/slide';
import { SlideObject } from './SlideObject';
import styles from './SlidePreview.module.css';

type SlidePreviewProps = {
    slide: Slide;
};

function SlidePreview({
    slide
}: SlidePreviewProps)
{
    let backgroundStyle = {};

    if (slide.background.type === 'color')
    {
        backgroundStyle = {
            backgroundColor: slide.background.color
        };
    }

    if (slide.background.type === 'image')
    {
        backgroundStyle = {
            backgroundImage: `url(${slide.background.src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
        };
    }

    if (slide.background.type === 'gradient')
    {
        backgroundStyle = {
            background: `linear-gradient(${slide.background.angle}deg, ${slide.background.colors.join(', ')})`
        };
    }

    return (
        <div
            className={styles.slide}
            style={backgroundStyle}
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