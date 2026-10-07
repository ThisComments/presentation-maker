import type { SlideObject as SlideObjectType } from '../types/objects';
import styles from './SlideObject.module.css';

type SlideObjectProps = {
    object: SlideObjectType;
};

function SlideObject({
    object
}: SlideObjectProps)
{
    const objectStyle = {
        left: object.position.x,
        top: object.position.y,
        width: object.size.width,
        height: object.size.height
    };

    if (object.type === 'text')
    {
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

    return (
        <img
            className={styles.object}
            style={objectStyle}
            src={object.src}
            alt=""
        />
    );
}

export { SlideObject };