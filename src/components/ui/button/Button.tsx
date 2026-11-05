import styles from './Button.module.css';

type ButtonProps = {
    text: string;
    onClick: () => void;
    className?: string;
    disabled?: boolean;
    variant?: 'primary' | 'secondary' | 'danger';
}

function Button({
    text,
    onClick,
    className = '',
    disabled = false,
    variant = 'secondary'
}: ButtonProps)
{
    return (
        <button
            type="button"
            className={`
                ${styles.button} 
                ${styles[variant]} 
                ${className}
            `}
            onClick={onClick}
            disabled={disabled}
        >
            {text}
        </button>
    );
}

export { Button };
