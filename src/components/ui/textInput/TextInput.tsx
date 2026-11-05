import styles from './TextInput.module.css';

interface TextInputProps {
    value: string;
    placeholder?: string;
    type?: 'text' | 'color' | 'number' | 'url';
    onChange: (value: string) => void;
    className?: string;
}

function TextInput({
    value,
    placeholder = '',
    type = 'text',
    onChange,
    className = ''
}: TextInputProps)
{
    return (
        <input
            type={type}
            value={value}
            placeholder={placeholder}
            onChange={event => onChange(event.currentTarget.value)}
            className={`
                ${styles.input}
                ${type === 'color'
                    ? styles.color 
                    : ''}
                ${className}
            `}
        />
    );
}

export { TextInput };
