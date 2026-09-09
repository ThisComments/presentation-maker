type Point = {
    x: number;
    y: number;
};

type Size = {
    width: number;
    height: number;
};

type ObjectType = 'media' | 'text';

type BaseObject<Type extends ObjectType> = {
    id: string;
    position: Point;
    size: Size;
    type: Type;
};

type TextStyle = {
    fontFamily: string;
    fontSize: number;
    color: string;
};

type TextObject  = BaseObject<'text'> & {
    text: string;
    textStyle: TextStyle;
};

type MediaType = 'image' | 'video';

type MediaObject = BaseObject<'media'> & {
    src: string;
    mediaType: MediaType
};

type SlideObject = TextObject | MediaObject;

export type {
    SlideObject,
    MediaObject,
    TextObject,
    TextStyle,
    Size,
    Point,
    MediaType
};