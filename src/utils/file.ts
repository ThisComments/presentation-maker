import type { ChangeEventHandler } from 'react';

function createFileInputChangeHandler(
    onSelect: (file: File) => void
): ChangeEventHandler<HTMLInputElement>
{
    return event =>
    {
        const file = event.currentTarget.files?.[0];
        event.currentTarget.value = '';

        if (file)
        {
            onSelect(file);
        }
    };
}

export { createFileInputChangeHandler };
