import styles from './TextInput.module.css';

type TextInputProps = {
    value: string;
    placeholder?: string;
    type?: 'text' | 'color' | 'number';
    onChange?: (value: string) => void;
    className?: string;
};

function TextInput({
    value,
    placeholder,
    type = 'text',
    onChange,
    className
}: TextInputProps)
{
    return (
        <input
            className={`${styles.input} ${className ?? ''}`}
            value={value}
            placeholder={placeholder}
            type={type}
            onChange={event => onChange?.(event.target.value)}
        />
    );
}

export { TextInput };