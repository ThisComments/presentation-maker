import styles from './ColorPicker.module.css';

type ColorPickerProps = {
    name?: string;
    value: string;
    onChange: (color: string) => void;
    className?: string;
};

function ColorPicker({
    name,
    value,
    onChange,
    className
}: ColorPickerProps)
{
    return (
        <input
            type="color"
            value={value}
            name={name}
            onChange={event => onChange(event.target.value)}
            className={`${styles.colorPicker} ${className ?? ''}`}
        />
    );
}

export { ColorPicker };