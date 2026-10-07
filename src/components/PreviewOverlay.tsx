import type { Presentation } from '../types/presentation';
import {
    getPreviewSlideIndex,
    setPreviewSlideIndex,
    setPreviewMode
} from '../editor';
import { SlidePreview } from './SlidePreview';
import { Button } from './Button';
import styles from './PreviewOverlay.module.css';

type PreviewOverlayProps = {
    presentation: Presentation;
    onClose: () => void;
};

function PreviewOverlay({
    presentation,
    onClose
}: PreviewOverlayProps)
{
    const slideIndex = getPreviewSlideIndex();
    const slide = presentation.slides[slideIndex];

    function handlePrevious(): void
    {
        if (slideIndex > 0)
        {
            setPreviewSlideIndex(slideIndex - 1);
        }
    }

    function handleNext(): void
    {
        if (
            slideIndex <
            presentation.slides.length - 1
        )
        {
            setPreviewSlideIndex(slideIndex + 1);
        }
    }

    function handleKeyDown(
        event: React.KeyboardEvent
    ): void
    {
        if (event.key === 'Escape')
        {
            onClose();
        }
    }

    if (!slide)
    {
        return null;
    }

    return (
        <div
            className={styles.overlay}
            tabIndex={0}
            onKeyDown={handleKeyDown}
        >
            <div className={styles.slideContainer}>
                <SlidePreview slide={slide} />
            </div>

            <div className={styles.controls}>
                <Button
                    text="Назад"
                    onClick={handlePrevious}
                />

                <span>
                    {slideIndex + 1} / {presentation.slides.length}
                </span>

                <Button
                    text="Далее"
                    onClick={handleNext}
                />

                <Button
                    text="Закрыть"
                    onClick={() => {
                        setPreviewMode(false);
                        onClose();
                    }}
                />
            </div>
        </div>
    );
}

export { PreviewOverlay };