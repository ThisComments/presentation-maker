import type { Presentation } from '../types/presentation';
import {
    getPreviewMode,
    setPreviewMode
} from '../editor';
import { Toolbar } from './Toolbar';
import { SlideList } from './SlideList';
import { Workspace } from './Workspace';
import { PreviewOverlay } from './PreviewOverlay';
import styles from './App.module.css';

type AppProps = {
    presentation: Presentation;
};

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
            <Toolbar
                presentation={presentation}
            />

            <div className={styles.mainArea}>
                <SlideList
                    presentation={presentation}
                />

                <Workspace
                    presentation={presentation}
                />
            </div>
        </div>
    );
}

export { App };