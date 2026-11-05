import type { Presentation } from '../../types/presentation.js';
import {
    getActiveSlideId,
    setActiveSlide,
    requestSlideDeletion,
    cancelSlideDeletion,
    confirmSlideDeletion,
    getPendingDeleteSlideId
} from '../../editor.js';
import { SlidePreview } from '../slidePreview/SlidePreview.js';
import { ConfirmDeleteDialog } from '../confirmDeleteDialog/ConfirmDeleteDialog.js';
import { Button } from '../ui/button/Button.js';
import styles from './SlideList.module.css';

type SlideListProps = {
    presentation: Presentation;
}

function SlideList({ 
    presentation 
}: SlideListProps)
{
    const activeSlideId = getActiveSlideId();
    const pendingDeleteId = getPendingDeleteSlideId();
    const pendingSlide = presentation.slides.find(
        slide => slide.id === pendingDeleteId
    );

    return (
        <div className={styles.sidebar}>
            {presentation.slides.length === 0 && (
                <p className={styles.empty}>Слайдов пока нет</p>
            )}

            <ol className={styles.list}>
                {presentation.slides.map((slide, index) =>
                {
                    const isActive = slide.id === activeSlideId;

                    return (
                        <li key={slide.id} className={styles.item}>
                            <div
                                className={`
                                    ${styles.thumbnail}
                                    ${isActive 
                                        ? styles.active 
                                        : ''}
                                `}
                            >
                                <SlidePreview slide={slide} />
                                <button
                                    type="button"
                                    className={styles.select}
                                    onClick={() => setActiveSlide(slide.id)}
                                />
                            </div>

                            <div className={styles.footer}>
                                <span className={styles.name}>
                                    {index + 1}. {slide.name}
                                </span>
                                <Button
                                    text="Удалить"
                                    variant="danger"
                                    className={styles.delete}
                                    onClick={() => requestSlideDeletion(slide.id)}
                                />
                            </div>
                        </li>
                    );
                })}
            </ol>

            {pendingSlide && (
                <ConfirmDeleteDialog
                    slideName={pendingSlide.name}
                    onConfirm={confirmSlideDeletion}
                    onCancel={cancelSlideDeletion}
                />
            )}
        </div>
    );
}

export { SlideList };
