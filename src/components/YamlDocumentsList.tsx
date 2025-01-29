import { memo } from 'react';
import _ from 'lodash';
import { PlusIcon, TrashIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

import useYamlContext from '@/contexts/YamlContext';

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from './ui/accordion';
import { Button } from './ui/button';

import Field from './Field';
import AddButton from './AddButton';

const YamlDocumentsList = () => {
    const parsedYaml = useYamlContext((state) => state.parsedYaml);

    return (
        <Accordion type="multiple" className="space-y-4 p-2">
            {parsedYaml.map((item, index) => {
                return (
                    <AccordionItem
                        key={item._id as number}
                        value={`item-${item._id as number}`}
                        className="border-input border rounded-sm px-4"
                    >
                        <AccordionTrigger>
                            <div className="flex justify-between w-full items-center">
                                <div className="text-left">
                                    <div className="text-primary font-semibold">
                                        {
                                            _.get(
                                                item,
                                                'metadata.name',
                                                '',
                                            ) as string
                                        }
                                    </div>
                                    <div className="text-primary-foreground text-xs">
                                        {_.get(item, 'kind', '') as string}
                                    </div>
                                </div>
                                <Button size="icon" variant="ghost">
                                    <TrashIcon color="red" />
                                </Button>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="space-y-4">
                            <div className="flex justify-between items-center">
                                <div className="bg-secondary flex p-1 rounded-sm font-semibold">
                                    <div className="py-1 px-2">Simple</div>
                                    <div className="py-1 px-2 rounded-sm text-primary bg-primary/10">
                                        Advanced
                                    </div>
                                </div>

                                <AddButton
                                    items={[
                                        {
                                            value: 'allowedTopologies',
                                            fullPath: '/',
                                            type: 'object',
                                        },
                                        {
                                            value: 'annotations',
                                            fullPath: 'metadata',
                                            type: 'object',
                                        },
                                        {
                                            value: 'creationTimestamp',
                                            fullPath: 'metadata',
                                            type: 'string',
                                        },
                                        {
                                            value: 'deletionGracePeriodSeconds',
                                            fullPath: 'metadata',
                                            type: 'number',
                                        },
                                        {
                                            value: 'deletionTimestamp',
                                            fullPath: 'metadata',
                                            type: 'string',
                                        },
                                        {
                                            value: 'finalizers',
                                            fullPath: 'metadata',
                                            type: 'array',
                                        },
                                        {
                                            value: 'generateName',
                                            fullPath: 'metadata',
                                            type: 'string',
                                        },
                                        {
                                            value: 'generation',
                                            fullPath: 'metadata',
                                            type: 'number',
                                        },
                                        {
                                            value: 'labels',
                                            fullPath: 'metadata',
                                            type: 'object',
                                        },
                                        {
                                            value: 'managedFields',
                                            fullPath: 'metadata',
                                            type: 'array',
                                        },
                                        {
                                            value: 'isBoolean',
                                            fullPath: 'metadata',
                                            type: 'boolean',
                                        },
                                    ]}
                                    index={index}
                                    shouldShowPath
                                >
                                    <Button size="sm" variant="secondary">
                                        <PlusIcon />
                                        Insert
                                    </Button>
                                </AddButton>
                            </div>
                            {Object.keys(item).map((property) =>
                                ['apiVersion', 'kind', '_id'].includes(
                                    property,
                                ) ? null : (
                                    <NestedYamlDocumentsList
                                        key={property}
                                        item={
                                            item[property] as Record<
                                                string,
                                                unknown
                                            >
                                        }
                                        property={property}
                                        fullPath={property}
                                        index={index}
                                    />
                                ),
                            )}
                        </AccordionContent>
                    </AccordionItem>
                );
            })}
        </Accordion>
    );
};

const NestedYamlDocumentsList = memo(
    ({
        item,
        property,
        fullPath,
        index,
    }: {
        item: Record<string, unknown>;
        property: string;
        fullPath: string;
        index: number;
    }) => {
        const isFirstLevel = property === fullPath;

        return (
            <Accordion type="single" collapsible>
                <AccordionItem
                    value={property}
                    className={cn('border-input', {
                        'rounded-sm border': isFirstLevel,
                        'border-b-0': !isFirstLevel,
                    })}
                >
                    <AccordionTrigger className="py-2 flex-row-reverse">
                        <div className="flex justify-between items-center w-full pl-2">
                            <div>{property}</div>
                            <div>
                                <AddButton
                                    items={[
                                        {
                                            value: 'annotations',
                                            fullPath,
                                            type: 'object',
                                        },
                                        {
                                            value: 'creationTimestamp',
                                            fullPath,
                                            type: 'string',
                                        },
                                        {
                                            value: 'deletionGracePeriodSeconds',
                                            fullPath,
                                            type: 'number',
                                        },
                                        {
                                            value: 'deletionTimestamp',
                                            fullPath,
                                            type: 'string',
                                        },
                                        {
                                            value: 'finalizers',
                                            fullPath,
                                            type: 'array',
                                        },
                                        {
                                            value: 'generateName',
                                            fullPath,
                                            type: 'string',
                                        },
                                        {
                                            value: 'generation',
                                            fullPath,
                                            type: 'number',
                                        },
                                        {
                                            value: 'labels',
                                            fullPath,
                                            type: 'object',
                                        },
                                        {
                                            value: 'managedFields',
                                            fullPath,
                                            type: 'array',
                                        },
                                        {
                                            value: 'isBoolean',
                                            fullPath,
                                            type: 'boolean',
                                        },
                                    ]}
                                    index={index}
                                >
                                    {isFirstLevel ? (
                                        <Button size="sm" variant="secondary">
                                            <PlusIcon /> Add
                                        </Button>
                                    ) : (
                                        <Button size="icon" variant="ghost">
                                            <PlusIcon className="text-primary" />
                                        </Button>
                                    )}
                                </AddButton>
                                <Button size="icon" variant="ghost">
                                    <TrashIcon color="red" />
                                </Button>
                            </div>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent>
                        <div className="ml-6 border border-input divide-y-[1px] divide-input border-r-0">
                            {Object.keys(item ?? {}).map((property) =>
                                ['string', 'number', 'boolean'].includes(
                                    typeof item[property],
                                ) ? (
                                    <Field
                                        key={property}
                                        property={property}
                                        fullPath={fullPath.concat(
                                            '.',
                                            property,
                                        )}
                                        value={
                                            item[property] as
                                                | string
                                                | number
                                                | boolean
                                        }
                                        index={index}
                                    />
                                ) : (
                                    <NestedYamlDocumentsList
                                        key={property}
                                        item={
                                            item[property] as Record<
                                                string,
                                                unknown
                                            >
                                        }
                                        property={property}
                                        fullPath={fullPath.concat(
                                            '.',
                                            property,
                                        )}
                                        index={index}
                                    />
                                ),
                            )}
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        );
    },
    (prevProps, nextProps) => {
        return _.isEqual(prevProps.item, nextProps.item);
    },
);

export default memo(YamlDocumentsList);
