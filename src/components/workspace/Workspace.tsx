import type { Presentation } from '../../types/presentation.js';
import { getActiveSlideId } from '../../editor.js';
import { SlidePreview } from '../slidePreview/SlidePreview.js';
import { SlideProperties } from '../slideProperties/SlideProperties.js';
import styles from './Workspace.module.css';

type WorkspaceProps = {
    presentation: Presentation;
}

function Workspace({ 
    presentation 
}: WorkspaceProps)
{
    const activeSlideId = getActiveSlideId();

    const slide = presentation.slides.find(slide => slide.id === activeSlideId)
        || presentation.slides[0];

    if (!slide)
    {
        return (
            <div className={styles.workspace}>
                <p className={styles.empty}>
                    Нет слайдов. Нажмите "Добавить слайд", чтобы начать.
                </p>
            </div>
        );
    }

    return (
        <div className={styles.workspace}>
            <div className={styles.canvas}>
                <SlidePreview slide={slide} className={styles.slide} />
            </div>
            <SlideProperties slide={slide} />
        </div>
    );
}

export { Workspace };