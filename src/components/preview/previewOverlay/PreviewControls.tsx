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
    const buttons = [
        { text: 'Назад', onClick: onPrevious, disabled: slideIndex === 0 },
        { text: 'Далее', onClick: onNext, disabled: slideIndex === slideCount - 1 },
        { text: 'Закрыть', onClick: onClose, disabled: false }
    ];

    return (
        <div className={styles.controls}>
            {buttons.slice(0, 1).map(button => <Button key={button.text} {...button} />)}
            <span>{slideIndex + 1} / {slideCount}</span>
            {buttons.slice(1).map(button => <Button key={button.text} {...button} />)}
        </div>
    );
}

export { PreviewControls };
