import React from 'react';
import { HexColorPicker } from 'react-colorful';
import styles from './ColorPicker.module.css';

type ColorPickerProps = {
    value: string;
    onChange?: (value: string) => void;
    name?: string;
    className?: string;
};

type PopupPosition = {
    left: number;
    top: number;
};

type ColorPickerState = {
    isOpen: boolean;
    selectedColor: string;
    position: PopupPosition;
};

class ColorPicker extends React.Component<ColorPickerProps, ColorPickerState> {
    state: ColorPickerState = {
        isOpen: false,
        selectedColor: this.props.value,
        position: { left: 0, top: 0 },
    };

    private triggerRef = React.createRef<HTMLButtonElement>();
    private popupRef = React.createRef<HTMLDivElement>();

    componentDidUpdate(prevProps: ColorPickerProps, prevState: ColorPickerState): void {
        if (prevProps.value !== this.props.value && this.props.value !== this.state.selectedColor) {
            this.setState({ selectedColor: this.props.value });
        }

        if (this.state.isOpen && !prevState.isOpen) {
            this.updatePosition();
            window.addEventListener('resize', this.updatePosition);
            window.addEventListener('scroll', this.updatePosition, true);
            document.addEventListener('pointerdown', this.handlePointerDown);
        } else if (!this.state.isOpen && prevState.isOpen) {
            window.removeEventListener('resize', this.updatePosition);
            window.removeEventListener('scroll', this.updatePosition, true);
            document.removeEventListener('pointerdown', this.handlePointerDown);
        }
    }

    componentWillUnmount(): void {
        window.removeEventListener('resize', this.updatePosition);
        window.removeEventListener('scroll', this.updatePosition, true);
        document.removeEventListener('pointerdown', this.handlePointerDown);
    }

    private updatePosition = (): void => {
        const trigger = this.triggerRef.current;
        const popup = this.popupRef.current;
        if (!trigger || !popup) return;

        const triggerRect = trigger.getBoundingClientRect();
        const popupRect = popup.getBoundingClientRect();
        const margin = 8;

        let left = triggerRect.left;
        if (left + popupRect.width > window.innerWidth - margin) {
            left = window.innerWidth - popupRect.width - margin;
        }
        left = Math.max(margin, left);

        let top = triggerRect.bottom + margin;
        if (top + popupRect.height > window.innerHeight - margin) {
            top = triggerRect.top - popupRect.height - margin;
        }
        top = Math.max(margin, Math.min(top, window.innerHeight - popupRect.height - margin));

        if (left !== this.state.position.left || top !== this.state.position.top) {
            this.setState({ position: { left, top } });
        }
    };

    private handlePointerDown = (event: PointerEvent): void => {
        const target = event.target as Node;
        if (!this.popupRef.current?.contains(target) && !this.triggerRef.current?.contains(target)) {
            this.setState({ isOpen: false });
        }
    };

    private handleColorChange = (color: string): void => {
        this.setState({ selectedColor: color });
        this.props.onChange?.(color);
    };

    render(): React.ReactNode {
        const { name, className } = this.props;
        const { isOpen, selectedColor, position } = this.state;

        return (
            <div className={`${styles.wrapper} ${className ?? ''}`}>
                {name && <input type="hidden" name={name} value={selectedColor} />}
                <button
                    ref={this.triggerRef}
                    type="button"
                    className={styles.swatch}
                    style={{ backgroundColor: selectedColor }}
                    aria-label="Выбрать цвет"
                    aria-haspopup="dialog"
                    aria-expanded={isOpen}
                    onClick={() => this.setState(state => ({ isOpen: !state.isOpen }))}
                />

                {isOpen && (
                    <div
                        ref={this.popupRef}
                        className={styles.popup}
                        role="dialog"
                        aria-label="Выбор цвета"
                        style={{ left: position.left, top: position.top }}
                    >
                        <HexColorPicker color={selectedColor} onChange={this.handleColorChange} />
                    </div>
                )}
            </div>
        );
    }
}

export { ColorPicker };
