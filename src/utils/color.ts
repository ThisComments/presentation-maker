const FULL_HEX = /^#[0-9a-f]{6}$/i;
const SHORT_HEX = /^#([0-9a-f])([0-9a-f])([0-9a-f])$/i;

function toColorInputValue(
    color: string | undefined
): string | null
{
    if (color === undefined)
    {
        return null;
    }

    if (FULL_HEX.test(color))
    {
        return color.toLowerCase();
    }

    const short = SHORT_HEX.exec(color);

    if (short)
    {
        return `#${short[1]}${short[1]}${short[2]}${short[2]}${short[3]}${short[3]}`.toLowerCase();
    }

    return null;
}

export {
    toColorInputValue,
};
