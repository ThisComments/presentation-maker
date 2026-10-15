import type { Point, Size, TextStyle } from '../../types/objects';
import { changeSlideBackgroundColor, changeSlideBackgroundImage, changeSlideGradient, resetSlideBackground, addTextToSlide, addImageToSlide } from '../../editor.js';

function changeBackgroundColor(slideId: string, color: string): void { changeSlideBackgroundColor(slideId, color); }
function changeBackgroundImage(slideId: string, url: string): void { changeSlideBackgroundImage(slideId, url); }
function changeGradient(slideId: string, colors: string[], angle: number): void { changeSlideGradient(slideId, colors, angle); }
function clearBackground(slideId: string): void { resetSlideBackground(slideId); }
function addText(slideId: string): void {
    const position: Point = { x: 50, y: 50 };
    const size: Size = { width: 300, height: 60 };
    const textStyle: TextStyle = { fontFamily: 'Arial', fontSize: 24, color: '#000000' };
    addTextToSlide(slideId, crypto.randomUUID(), position, size, 'Новый текст', textStyle);
}
function addImage(slideId: string, url: string): void {
    const position: Point = { x: 50, y: 50 };
    const size: Size = { width: 300, height: 200 };
    addImageToSlide(slideId, crypto.randomUUID(), position, size, url);
}
export { changeBackgroundColor, changeBackgroundImage, changeGradient, clearBackground, addText, addImage };
