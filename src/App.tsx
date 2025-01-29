import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import YamlEditor from "@/components/YamlEditor";

function App() {
    return (
        <main className="min-h-screen">
            <ResizablePanelGroup direction="horizontal">
                <ResizablePanel>
                    One
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
