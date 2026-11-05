import type { Presentation } from '../../types/presentation.js';
import { updatePresentationName } from '../../functions/presentation.js';
import { dispatch, addNewSlide, setPreviewMode } from '../../editor.js';
import { TextInput } from '../ui/textInput/TextInput.js';
import { Button } from '../ui/button/Button.js';
import styles from './Toolbar.module.css';

type ToolbarProps = {
    presentation: Presentation;
}

function Toolbar({ 
    presentation 
}: ToolbarProps)
{
    return (
        <div className={styles.toolbar}>
            <TextInput
                className={styles.name}
                value={presentation.name}
                placeholder="Название презентации"
                onChange={name => dispatch(updatePresentationName, name)}
            />
            <div className={styles.actions}>
                <Button
                    text="Добавить слайд"
                    onClick={() => addNewSlide(crypto.randomUUID())}
                />
                <Button
                    text="Сохранить"
                    onClick={() => {}}
                />
                <Button
                    text="Просмотр"
                    variant="primary"
                    disabled={presentation.slides.length === 0}
                    onClick={() => setPreviewMode(true)}
                />
            </div>
        </div>
    );
}

export { Toolbar };