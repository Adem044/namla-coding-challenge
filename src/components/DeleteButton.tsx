import { memo } from 'react';
import { TrashIcon } from 'lucide-react';

import useYamlContext from '@/contexts/YamlContext';

import { Button } from './ui/button';

const DeleteButton = ({
    index,
    fullPath,
}: {
    index: number;
    fullPath?: string;
}) => {
    const updateParsedYaml = useYamlContext((state) => state.updateParsedYaml);

    const handleDeleteField = () => {
        updateParsedYaml(index, fullPath ?? '');
    };

    return (
        <Button size="icon" variant="ghost" onClick={handleDeleteField}>
            <TrashIcon color="red" />
        </Button>
    );
};

export default memo(DeleteButton);
