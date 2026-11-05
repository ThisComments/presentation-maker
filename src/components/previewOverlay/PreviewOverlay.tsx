import type { Presentation } from '../../types/presentation.js';
import {
    getPreviewSlideIndex,
    setPreviewSlideIndex
} from '../../editor.js';
import { SlidePreview } from '../slidePreview/SlidePreview.js';
import { Button } from '../ui/button/Button.js';
import styles from './PreviewOverlay.module.css';

type PreviewOverlayProps = {
    presentation: Presentation;
    onClose: () => void;
}

function PreviewOverlay({ 
    presentation, 
    onClose 
}: PreviewOverlayProps)
{
    const slideCount = presentation.slides.length;
    const currentIndex = getPreviewSlideIndex();
    const slide = presentation.slides[currentIndex];

    return (
        <div className={styles.overlay}>
            <div className={styles.stage}>
                {slide
                    ? <SlidePreview slide={slide} className={styles.slide} />
                    : <p className={styles.empty}>В презентации нет слайдов</p>}
            </div>

            <div className={styles.controls}>
                <Button
                    text="Назад"
                    disabled={currentIndex <= 0}
                    onClick={() => setPreviewSlideIndex(currentIndex - 1)}
                />
                <span className={styles.counter}>
                    {slideCount === 0 ? 0 : currentIndex + 1} / {slideCount}
                </span>
                <Button
                    text="Вперёд"
                    disabled={currentIndex >= slideCount - 1}
                    onClick={() => setPreviewSlideIndex(currentIndex + 1)}
                />
                <Button
                    text="Закрыть"
                    variant="danger"
                    className={styles.close}
                    onClick={onClose}
                />
            </div>
        </div>
    );
}

export { PreviewOverlay };
