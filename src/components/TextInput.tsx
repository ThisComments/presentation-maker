import styles from './TextInput.module.css';

type TextInputProps = {
    value?: string;
    defaultValue?: string;
    placeholder?: string;
    type?: 'text' | 'color' | 'number';
    name?: string;
    id?: string;
    onChange?: (value: string) => void;
    className?: string;
};

function TextInput({
    value,
    defaultValue,
    placeholder,
    type = 'text',
    name,
    id,
    onChange,
    className
}: TextInputProps)
{
    return (
        <input
            className={`${styles.input} ${className ?? ''}`}
            value={value}
            defaultValue={defaultValue}
            placeholder={placeholder}
            type={type}
            name={name}
            id={id}
            onChange={event => onChange?.(event.target.value)}
        />
    );
}

export { TextInput };