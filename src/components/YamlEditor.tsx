import { memo } from 'react';
import { Editor, type OnChange } from '@monaco-editor/react';

import useYamlContext from '@/contexts/YamlContext';

const YamlEditor = () => {
    const yamlContent = useYamlContext((state) => state.yamlContent);
    const updateYamlContent = useYamlContext(
        (state) => state.updateYamlContent,
    );

    const handleEditorChange: OnChange = (value) => {
        updateYamlContent(value || '');
    };

    return (
        <Editor
            options={{ minimap: { enabled: false } }}
            height="100vh"
            defaultLanguage="yaml"
            value={yamlContent}
            theme="vs-dark"
            onChange={handleEditorChange}
        />
    );
};

export default memo(YamlEditor);
