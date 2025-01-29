import { memo, type MouseEvent } from 'react';
import _ from 'lodash';

import useYamlContext from '@/contexts/YamlContext';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from './ui/dropdown-menu';

const AddButton = ({
    items,
    index,
    shouldShowPath,
    children,
}: React.PropsWithChildren<{
    items: Array<{ value: string; type: string; fullPath: string }>;
    index: number;
    shouldShowPath?: boolean;
}>) => {
    const updateParsedYaml = useYamlContext((state) => state.updateParsedYaml);

    const handleAddItem =
        (value: string, type: string, fullPath: string) =>
        (event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
            event.stopPropagation();
            updateParsedYaml(
                index,
                fullPath === '/' ? value : fullPath.concat('.', value),
                type === 'object'
                    ? {}
                    : type === 'array'
                    ? []
                    : type === 'number'
                    ? 0
                    : type === 'boolean'
                    ? false
                    : '',
            );
        };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
            <DropdownMenuContent className="border-none">
                {items.map(({ value, type, fullPath }) => (
                    <DropdownMenuItem
                        key={value}
                        onClick={handleAddItem(value, type, fullPath)}
                        className="flex-col items-start"
                    >
                        {shouldShowPath && (
                            <span className="text-muted-foreground text-xs">
                                {fullPath === '/'
                                    ? fullPath
                                    : fullPath.concat(' /')}
                            </span>
                        )}
                        {value}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default memo(AddButton, (prevProps, nextProps) => {
    return _.isEqual(prevProps.items, nextProps.items);
});
