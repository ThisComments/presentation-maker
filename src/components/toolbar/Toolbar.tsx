import type { Presentation } from '../../types/presentation';
import {
    dispatch,
    setPreviewMode
} from '../../editor';
import {
    updatePresentationName,
    savePresentation,
    loadPresentation
} from '../../functions/presentation';
import { addSlide } from '../../functions/slide';
import { Button } from '../common/button/Button';
import { TextInput } from '../common/textInupt/TextInput';
import styles from './Toolbar.module.css';

type ToolbarProps = {
    presentation: Presentation;
};

function Toolbar({
    presentation
}: ToolbarProps)
{
    function handleNameChange(name: string): void
    {
        dispatch(updatePresentationName, name);
    }

    function handleAddSlide(): void
    {
        dispatch(addSlide, crypto.randomUUID());
    }

    function handleSave(): void
    {
        localStorage.setItem('savePresentation', savePresentation(presentation));
    }

    function handleLoad(): void
    {
        dispatch(loadPresentation, localStorage.getItem('savePresentation'));
    }

    function handlePreview(): void
    {
        setPreviewMode(true);
    }

    return (
        <header className={styles.toolbar}>
            <TextInput
                value={presentation.name}
                placeholder="Название презентации"
                onChange={handleNameChange}
                className={styles.nameInput}
            />

            <Button
                text="+ Слайд"
                onClick={handleAddSlide}
            />

            <Button
                text="Сохранить"
                onClick={handleSave}
            />

            <Button
                text="Загрузить"
                onClick={handleLoad}
            />

            <Button
                text="Предпросмотр"
                onClick={handlePreview}
            />
        </header>
    );
}

export { Toolbar };