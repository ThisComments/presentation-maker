import { Button } from '../ui/button/Button.js';
import styles from './ConfirmDeleteDialog.module.css';

type ConfirmDeleteDialogProps = {
    slideName: string;
    onConfirm: () => void;
    onCancel: () => void;
}

function ConfirmDeleteDialog({
    slideName,
    onConfirm,
    onCancel
}: ConfirmDeleteDialogProps)
{
    return (
        <div
            className={styles.backdrop}
            onClick={event =>
            {
                if (event.target === event.currentTarget)
                {
                    onCancel();
                }
            }}
        >
            <div className={styles.dialog}>
                <h2 className={styles.title}>Удалить слайд?</h2>
                <p className={styles.text}>
                    Слайд "{slideName}" будет удалён.
                </p>
                <div className={styles.actions}>
                    <Button text="Отмена" onClick={onCancel} />
                    <Button text="Удалить" variant="danger" onClick={onConfirm} />
                </div>
            </div>
        </div>
    );
}

export { ConfirmDeleteDialog };
