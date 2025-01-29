import { memo } from 'react';
import _ from 'lodash';
import type { CheckedState } from '@radix-ui/react-checkbox';

import useYamlContext from '@/contexts/YamlContext';

import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { Input } from './ui/input';

import DeleteButton from './DeleteButton';

const Field = ({
    property,
    fullPath,
    value,
    index,
}: {
    property: string;
    fullPath: string;
    value: string | number | boolean;
    index: number;
}) => {
    const updateParsedYaml = useYamlContext((state) => state.updateParsedYaml);

    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement> | CheckedState,
    ) => {
        updateParsedYaml(
            index,
            fullPath,
            _.isObject(event)
                ? event.target.valueAsNumber || event.target.value
                : event,
        );
    };

    return (
        <div className="flex items-center gap-2 p-1">
            <Label htmlFor="name" className="min-w-32">
                {property}
            </Label>
            {typeof value === 'boolean' ? (
                <div className="w-full">
                    <Checkbox
                        checked={value}
                        onCheckedChange={handleInputChange}
                    />
                </div>
            ) : (
                <Input
                    id="name"
                    placeholder="Name of your project"
                    value={value}
                    onChange={handleInputChange}
                    type={typeof value === 'number' ? 'number' : 'text'}
                />
            )}
            <DeleteButton index={index} fullPath={fullPath} />
        </div>
    );
};

export default memo(Field);
