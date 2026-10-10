import styles from './Button.module.css';

type ButtonProps = {
    text: string;
    onClick?: () => void;
    className?: string;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
};

function Button({
    text,
    onClick,
    className,
    type = 'button',
    disabled = false
}: ButtonProps)
{
    return (
        <button
            className={`${styles.button} ${className ?? ''}`}
            onClick={onClick}
            type={type}
            disabled={disabled}
        >
            {text}
        </button>
    );
}

export { Button };