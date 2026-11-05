import type { Size } from '../types/objects.js';

function isImageFile(file: File): boolean
{
    return file.type.startsWith('image/');
}

function readFileAsDataUrl(file: File): Promise<string>
{
    return new Promise((resolve, reject) =>
    {
        const reader = new FileReader();

        reader.onload = () => resolve(String(reader.result));
        reader.onerror = () => reject(reader.error);
        
        reader.readAsDataURL(file);
    });
}

function loadImageSize(src: string): Promise<Size>
{
    return new Promise((resolve, reject) =>
    {
        const image = new Image();

        image.onload = () => resolve({
            width: image.naturalWidth,
            height: image.naturalHeight
        });
        image.onerror = () => reject(new Error('Не удалось загрузить изображение'));

        image.src = src;
    });
}

function fitSize(size: Size, limit: Size): Size
{
    if (size.width <= 0 || size.height <= 0)
    {
        return limit;
    }

    const scale = Math.min(
        1,
        limit.width / size.width,
        limit.height / size.height
    );

    return {
        width: Math.round(size.width * scale),
        height: Math.round(size.height * scale)
    };
}

export {
    isImageFile,
    readFileAsDataUrl,
    loadImageSize,
    fitSize,
};
