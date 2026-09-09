import { SlideObject } from "./objects";

type ColorBackground = {
    type: 'color';
    color: string;
};

type ImageBackground = {
    type: 'image';
    src: string;
};

type GradientBackground = {
    type: 'gradient';
    colors: string[];
    angle: number;
};

type Background =
    | ColorBackground
    | ImageBackground
    | GradientBackground;

type Slide = {
    id: string;
    name: string;
    description: string;
    background: Background;
    objects: SlideObject[];
};

const defaultBackground: Background = {
    type: 'color',
    color: 'white'
};

export type { 
    Slide,
    Background,
    ColorBackground,
    ImageBackground,
    GradientBackground,
};

export {
    defaultBackground,
};