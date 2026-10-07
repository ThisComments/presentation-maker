import type { Presentation } from '../types/presentation';
import {
    getActiveSlideId,
    setActiveSlide
} from '../editor';
import { SlidePreview } from './SlidePreview';
import styles from './SlideList.module.css';

type SlideListProps = {
    presentation: Presentation;
};

function SlideList({
    presentation
}: SlideListProps)
{
    const activeSlideId = getActiveSlideId();

    function handleSlideClick(slideId: string): void
    {
        setActiveSlide(slideId);
    }

    function handleContextMenu(
        event: React.MouseEvent,
        slideId: string
    ): void
    {
        event.preventDefault();

        const shouldRemove = confirm(
            'Удалить этот слайд?'
        );

        if (shouldRemove)
        {
            // Здесь позже будет dispatch(removeSlides, ...)
        }
    }

    return (
        <aside className={styles.list}>
            {presentation.slides.map(slide => (
                <div
                    key={slide.id}
                    className={
                        slide.id === activeSlideId
                            ? styles.active
                            : styles.item
                    }
                    onClick={() => handleSlideClick(slide.id)}
                    onContextMenu={event =>
                        handleContextMenu(event, slide.id)
                    }
                >
                    <SlidePreview slide={slide} />
                    <span>{slide.name}</span>
                </div>
            ))}
        </aside>
    );
}

export { SlideList };