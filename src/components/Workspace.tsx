import type { Presentation } from '../types/presentation';
import {
    getActiveSlideId
} from '../editor';
import { SlidePreview } from './SlidePreview';
import { SlideProperties } from './SlideProperties';
import styles from './Workspace.module.css';

type WorkspaceProps = {
    presentation: Presentation;
};

function Workspace({
    presentation
}: WorkspaceProps)
{
    const activeSlideId = getActiveSlideId();

    const activeSlide = presentation.slides.find(
        slide => slide.id === activeSlideId
    );

    if (!activeSlide)
    {
        return (
            <main className={styles.workspace}>
                <p>Выберите слайд</p>
            </main>
        );
    }

    return (
        <main className={styles.workspace}>
            <SlidePreview slide={activeSlide} />

            <SlideProperties
                slide={activeSlide}
            />
        </main>
    );
}

export { Workspace };