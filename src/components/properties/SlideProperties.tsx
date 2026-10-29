import type { Slide } from '../../types/slide';
import { SlideBackgroundProperties } from './SlideBackgroundProperties';
import { SlideObjectProperties } from './SlideObjectProperties';
import styles from './SlideProperties.module.css';

type SlidePropertiesProps = {
    slide: Slide;
};

function SlideProperties({ slide }: SlidePropertiesProps)
{
    return (
        <div className={styles.properties}>
            <SlideBackgroundProperties
                key={`${slide.id}-${slide.background.type}`}
                slide={slide}
            />
            <SlideObjectProperties slide={slide} />
        </div>
    );
}

export { SlideProperties };
