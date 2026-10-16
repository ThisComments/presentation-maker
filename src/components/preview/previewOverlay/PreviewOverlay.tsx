import type { Presentation } from '../../../types/presentation';
import { getPreviewSlideIndex, setPreviewSlideIndex } from '../../../editor';
import { SlidePreview } from '../slidePreview/SlidePreview';
import { PreviewControls } from './PreviewControls';
import styles from './PreviewOverlay.module.css';

type PreviewOverlayProps = { presentation: Presentation; onClose: () => void; };

function PreviewOverlay({ presentation, onClose }: PreviewOverlayProps)
{
    const slideIndex = getPreviewSlideIndex();
    const slide = presentation.slides[slideIndex];
    if (!slide) return null;

    return (
        <div className={styles.overlay}>
            <div className={styles.slideContainer}><SlidePreview slide={slide} /></div>
            <PreviewControls
                slideIndex={slideIndex}
                slideCount={presentation.slides.length}
                onPrevious={() => setPreviewSlideIndex(slideIndex - 1)}
                onNext={() => setPreviewSlideIndex(slideIndex + 1)}
                onClose={onClose}
            />
        </div>
    );
}

export { PreviewOverlay };
