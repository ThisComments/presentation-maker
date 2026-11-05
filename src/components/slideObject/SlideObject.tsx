import type { CSSProperties } from 'react';
import type { SlideObject as SlideObjectModel } from '../../types/objects.js';
import { SLIDE_WIDTH, SLIDE_HEIGHT } from '../../constants.js';
import styles from './SlideObject.module.css';

type SlideObjectProps = {
    object: SlideObjectModel;
}

function getBoxStyle(object: SlideObjectModel): CSSProperties
{
    return {
        left: `${object.position.x / SLIDE_WIDTH * 100}%`,
        top: `${object.position.y / SLIDE_HEIGHT * 100}%`,
        width: `${object.size.width / SLIDE_WIDTH * 100}%`,
        height: `${object.size.height / SLIDE_HEIGHT * 100}%`
    };
}

function SlideObject({ 
    object
}: SlideObjectProps)
{
    if (object.type === 'text')
    {
        const { fontFamily, fontSize, color } = object.textStyle;

        const style: CSSProperties = {
            ...getBoxStyle(object),
            fontFamily,
            fontSize: `${(fontSize / SLIDE_WIDTH) * 100}cqw`,
            color
        };

        return (
            <div className={styles.text} style={style}>
                {object.text}
            </div>
        );
    }

    const style = getBoxStyle(object);

    return (
        <img
            className={styles.media}
            style={style}
            src={object.src}
            draggable={false}
        />
    );
}

export { SlideObject };
