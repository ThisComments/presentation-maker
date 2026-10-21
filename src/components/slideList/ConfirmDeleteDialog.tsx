import { Button } from '../common/button/Button';
import styles from './SlideList.module.css';

type ConfirmDeleteDialogProps = { slideName: string; onConfirm: () => void; onCancel: () => void; };
function ConfirmDeleteDialog({ slideName, onConfirm, onCancel }: ConfirmDeleteDialogProps)
{
    return (
        <div 
        className={styles.dialogBackdrop} 
        role="presentation" 
        onMouseDown={event => { 
            if (event.target === event.currentTarget) 
                onCancel();
        }}>
            <section 
                className={styles.dialog} 
                role="dialog" 
                aria-modal="true" 
                aria-labelledby="delete-slide-title"
            >
                <h3 id="delete-slide-title">Удалить слайд?</h3>
                <p>Слайд «{slideName}» будет удалён.</p>
                <div className={styles.dialogActions}>
                    <Button text="Отмена" onClick={onCancel} />
                    <Button text="Удалить" onClick={onConfirm} />
                </div>
            </section>
        </div>
    );
}
export { ConfirmDeleteDialog };
