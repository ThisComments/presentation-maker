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
        <aside className={styles.properties}>
            <h3 className={styles.title}>
                Свойства слайда
            </h3>

            <SlideBackgroundProperties
                key={`${slide.id}-${slide.background.type}`}
                slide={slide}
            />
            <SlideObjectProperties slide={slide} />
        </aside>
    );
}

export { SlideProperties };