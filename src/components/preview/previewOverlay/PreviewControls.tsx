import { Button } from '../../common/button/Button';
import styles from './PreviewOverlay.module.css';

type PreviewControlsProps = {
    slideIndex: number;
    slideCount: number;
    onPrevious: () => void;
    onNext: () => void;
    onClose: () => void;
};

function PreviewControls({ slideIndex, slideCount, onPrevious, onNext, onClose }: PreviewControlsProps)
{
    return (
        <div className={styles.controls}>
            <Button
                text="Назад"
                onClick={onPrevious}
                disabled={slideIndex === 0}
            />

            <span>{slideIndex + 1} / {slideCount}</span>

            <Button
                text="Далее"
                onClick={onNext}
                disabled={slideIndex === slideCount - 1}
            />

            <Button
                text="Закрыть"
                onClick={onClose}
            />
        </div>
    );
}

export { PreviewControls };
