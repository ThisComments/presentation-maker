import { createFileInputChangeHandler } from '../../../utils/file.js';
import styles from './FileButton.module.css';

type FileButtonProps = {
    text: string;
    accept: string;
    onSelect: (file: File) => void;
}

function FileButton({ 
    text, 
    accept, 
    onSelect
}: FileButtonProps)
{
    return (
        <label className={styles.fileButton}>
            {text}
            <input
                className={styles.input}
                type="file"
                accept={accept}
                onChange={createFileInputChangeHandler(onSelect)}
            />
        </label>
    );
}

export { FileButton };
