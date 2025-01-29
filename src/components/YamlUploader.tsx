import { memo, useCallback, useRef } from 'react';
import { FileUpIcon } from 'lucide-react';

import useYamlContext from '@/contexts/YamlContext';

import { Input } from './ui/input';
import { Button } from './ui/button';

const YamlUploader = () => {
    const inputRef = useRef<HTMLInputElement>(null);

    const updateYamlContent = useYamlContext(
        (state) => state.updateYamlContent,
    );

    const handleFileUpload: React.ChangeEventHandler<HTMLInputElement> =
        useCallback(
            (event) => {
                const file = event.target.files![0];
                if (file && file.type === 'application/x-yaml') {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        updateYamlContent(e.target!.result as string);
                    };
                    reader.readAsText(file);
                } else {
                    alert('Please upload a valid YAML file.');
                }
                event.target.value = '';
            },
            [updateYamlContent],
        );

    return (
        <>
            <Button
                variant="ghost"
                className="text-primary"
                onClick={() => {
                    inputRef.current!.click();
                }}
            >
                <FileUpIcon />
                Upload YAML
            </Button>
            <Input
                ref={inputRef}
                className="hidden"
                placeholder="upload yaml"
                type="file"
                onChange={handleFileUpload}
            />
        </>
    );
};

export default memo(YamlUploader);
