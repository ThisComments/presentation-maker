import type { KeyboardEvent } from 'react';
import type { Presentation } from '../../../types/presentation';
import { getPreviewSlideIndex, setPreviewSlideIndex, setPreviewMode } from '../../../editor';
import { SlidePreview } from '../slidePreveiw/SlidePreview';
import { PreviewControls } from './PreviewControls';
import styles from './PreviewOverlay.module.css';

type PreviewOverlayProps = { presentation: Presentation; onClose: () => void; };

function PreviewOverlay({ presentation, onClose }: PreviewOverlayProps)
{
    const slideIndex = getPreviewSlideIndex();
    const slide = presentation.slides[slideIndex];
    if (!slide) return null;

    function handleKeyDown(event: KeyboardEvent<HTMLDivElement>): void
    {
        if (event.key === 'Escape') onClose();
    }

    return (
        <div className={styles.overlay} tabIndex={0} onKeyDown={handleKeyDown}>
            <div className={styles.slideContainer}><SlidePreview slide={slide} /></div>
            <PreviewControls
                slideIndex={slideIndex}
                slideCount={presentation.slides.length}
                onPrevious={() => setPreviewSlideIndex(slideIndex - 1)}
                onNext={() => setPreviewSlideIndex(slideIndex + 1)}
                onClose={() => { setPreviewMode(false); onClose(); }}
            />
        </div>
    );
}

export { PreviewOverlay };
