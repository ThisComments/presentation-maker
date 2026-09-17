type SlideObject = TextObject | MediaObject;

type MediaObject = BaseObject<'media'> & {
    src: string;
    mediaType: MediaType
};

type MediaType = 'image' | 'video';

type TextObject  = BaseObject<'text'> & {
    text: string;
    textStyle: TextStyle;
};

type TextStyle = {
    fontFamily: string;
    fontSize: number;
    color: string;
};

type BaseObject<Type extends ObjectType> = {
    id: string;
    position: Point;
    size: Size;
    type: Type;
};

type ObjectType = 'media' | 'text';

type Point = {
    x: number;
    y: number;
};

type Size = {
    width: number;
    height: number;
};

export type {
    SlideObject,
    MediaObject,
    MediaType,
    TextObject,
    TextStyle,
    Size,
    Point,
};