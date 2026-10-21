import type { Slide } from '../../../types/slide';
import { SlideObject } from '../slideObject/SlideObject';
import styles from './SlidePreview.module.css';

type SlidePreviewProps = {
    slide: Slide;
};

function SlidePreview({ slide }: SlidePreviewProps)
{
    let backgroundStyle = {};

    switch (slide.background.type)
    {
        case 'color':
            backgroundStyle = {
                backgroundColor: slide.background.color
            };
            break;
        case 'gradient':
            backgroundStyle = {
                background: `linear-gradient(${slide.background.angle}deg, ${slide.background.colors.join(', ')})`
            };
            break;
        case 'image':
            backgroundStyle = {
                backgroundImage: `url(${slide.background.src})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            };
            break;
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