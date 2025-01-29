import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from '@/components/ui/resizable';
import { ScrollArea } from '@/components/ui/scroll-area';

import YamlEditor from '@/components/YamlEditor';
import YamlUploader from '@/components/YamlUploader';

function App() {
    return (
        <main className="min-h-screen">
            <ResizablePanelGroup direction="horizontal">
                <ResizablePanel>
                    <div className="h-screen flex flex-col">
                        <ScrollArea className="grow rounded-md">
                            YamlDocumentsList
                        </ScrollArea>
                        <div>
                            <YamlUploader />
                        </div>
                    </div>
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel>
                    <YamlEditor />
                </ResizablePanel>
            </ResizablePanelGroup>
        </main>
    );
}

export default App;
