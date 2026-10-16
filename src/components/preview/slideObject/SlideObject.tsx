import type { SlideObject as SlideObjectType } from '../../../types/objects';
import styles from './SlideObject.module.css';

type SlideObjectProps = {
    object: SlideObjectType;
};

function SlideObject({
    object
}: SlideObjectProps)
{
    const objectStyle = {
        left: `${object.position.x}px`,
        top: `${object.position.y}px`,
        width: `${object.size.width}px`,
        height: `${object.size.height}px`
    };

    switch (object.type)
    {
        case 'media':
            return (
                <img
                    className={styles.object}
                    style={objectStyle}
                    src={object.src}
                    alt="Изображение на слайде"
                />
            );
        case 'text':
            return (
                <div
                    className={styles.object}
                    style={{
                        ...objectStyle,
                        fontFamily: object.textStyle.fontFamily,
                        fontSize: object.textStyle.fontSize,
                        color: object.textStyle.color
                    }}
                >
                    {object.text}
                </div>
            );
    }
}

export { SlideObject };