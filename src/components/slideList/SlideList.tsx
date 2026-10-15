import { Component } from 'react';
import type { MouseEvent } from 'react';
import type { Presentation } from '../../types/presentation.js';
import {
    getActiveSlideId,
    setActiveSlide,
    deleteSlides
} from '../../editor.js';
import { SlidePreview } from '../preview/slidePreveiw/SlidePreview.js';
import styles from './SlideList.module.css';
import { ConfirmDeleteDialog } from './ConfirmDeleteDialog.js';

type SlideListProps = {
    presentation: Presentation;
};

type SlideListState = {
    slideToDelete: string | null;
};

class SlideList extends Component<SlideListProps, SlideListState>
{
    state: SlideListState = {
        slideToDelete: null
    };

    handleSlideClick = (slideId: string): void =>
    {
        setActiveSlide(slideId);
    };

    handleContextMenu = (
        event: MouseEvent<HTMLDivElement>,
        slideId: string
    ): void =>
    {
        event.preventDefault();
        this.setState({ slideToDelete: slideId });
    };

    handleCancelDelete = (): void =>
    {
        this.setState({ slideToDelete: null });
    };

    handleConfirmDelete = (): void =>
    {
        const { slideToDelete } = this.state;

        if (slideToDelete === null)
        {
            return;
        }

        deleteSlides([slideToDelete]);
        this.setState({ slideToDelete: null });
    };

    render()
    {
        const { presentation } = this.props;
        const { slideToDelete } = this.state;
        const activeSlideId = getActiveSlideId();
        const slide = presentation.slides.find(
            item => item.id === slideToDelete
        );

        return (
            <>
                <aside className={styles.list}>
                    {presentation.slides.map(slide => (
                        <div
                            key={slide.id}
                            className={
                                slide.id === activeSlideId
                                    ? styles.active
                                    : styles.item
                            }
                            onClick={() => this.handleSlideClick(slide.id)}
                            onContextMenu={event =>
                                this.handleContextMenu(event, slide.id)
                            }
                        >
                            <SlidePreview slide={slide} />
                            <span>{slide.name}</span>
                        </div>
                    ))}
                </aside>

                {slide && (
                    <ConfirmDeleteDialog
                        slideName={slide.name}
                        onConfirm={this.handleConfirmDelete}
                        onCancel={this.handleCancelDelete}
                    />
                )}
            </>
        );
    }
}

export { SlideList };