import type { Presentation } from '../../types/presentation.js';
import { getPreviewMode, setPreviewMode } from '../../editor.js';
import { Toolbar } from '../toolbar/Toolbar.js';
import { SlideList } from '../slideList/SlideList.js';
import { Workspace } from '../workspace/Workspace.js';
import { PreviewOverlay } from '../previewOverlay/PreviewOverlay.js';
import styles from './App.module.css';

type AppProps = {
    presentation: Presentation;
}

function App({ 
    presentation 
}: AppProps)
{
    if (getPreviewMode())
    {
        return (
            <PreviewOverlay
                presentation={presentation}
                onClose={() => setPreviewMode(false)}
            />
        );
    }

    return (
        <div className={styles.app}>
            <Toolbar presentation={presentation} />

            <div className={styles.main}>
                <SlideList presentation={presentation} />
                <Workspace presentation={presentation} />
            </div>
        </div>
    );
}

export { App };