import { memo } from 'react';
import _ from 'lodash';
import { PlusIcon } from 'lucide-react';

import { cn, type TParsedYaml } from '@/lib/utils';

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
import DeleteButton from './DeleteButton';

type TPrimitive = string | number | boolean;

const CONFIGURATIONS = [
    {
        value: 'annotations',
        type: 'object',
    },
    {
        value: 'creationTimestamp',
        type: 'string',
    },
    {
        value: 'deletionGracePeriodSeconds',
        type: 'number',
    },
    {
        value: 'deletionTimestamp',
        type: 'string',
    },
    {
        value: 'finalizers',
        type: 'array',
    },
    {
        value: 'generateName',
        type: 'string',
    },
    {
        value: 'generation',
        type: 'number',
    },
    {
        value: 'labels',
        type: 'object',
    },
    {
        value: 'managedFields',
        type: 'array',
    },
    {
        value: 'isBoolean',
        type: 'boolean',
    },
];

const EXCLUDED_KEYS = ['apiVersion', 'kind', '_id'];

const PRIMITIVES = ['string', 'number', 'boolean'];

const YamlDocumentsList = () => {
    const parsedYaml = useYamlContext((state) => state.parsedYaml);

    return (
        <Accordion type="multiple" className="space-y-4 p-2">
            {parsedYaml.map((item, index) => {
                const items = [
                    {
                        value: 'allowedTopologies',
                        fullPath: '/',
                        type: 'object',
                    },
                    ...Object.keys(item)
                        .filter((property) => !EXCLUDED_KEYS.includes(property))
                        .map((property) =>
                            CONFIGURATIONS.map((config) => ({
                                ...config,
                                fullPath: property,
                            })),
                        )
                        .flat(),
                ];
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
                                <DeleteButton index={index} />
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
                                    items={items}
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
                                EXCLUDED_KEYS.includes(property) ? null : (
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
        item: TParsedYaml;
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
                                    items={CONFIGURATIONS.map((config) => ({
                                        ...config,
                                        fullPath,
                                    }))}
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
                                <DeleteButton
                                    index={index}
                                    fullPath={fullPath}
                                />
                            </div>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent>
                        <div className="ml-6 border border-input divide-y-[1px] divide-input border-r-0">
                            {Object.keys(item ?? {}).map((property) => (
                                <NestedYamlDocumentsListItem
                                    key={property}
                                    property={property}
                                    fullPath={fullPath}
                                    item={item[property]}
                                    index={index}
                                />
                            ))}
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

const NestedYamlDocumentsListItem = memo(
    ({
        property,
        fullPath,
        item,
        index,
    }: {
        property: string;
        fullPath: string;
        item: unknown;
        index: number;
    }) => {
        const path = fullPath.concat('.', property);
        const isPrimitiveValue = PRIMITIVES.includes(typeof item);
        if (isPrimitiveValue) {
            return (
                <Field
                    property={property}
                    fullPath={path}
                    value={item as TPrimitive}
                    index={index}
                />
            );
        }
        return (
            <NestedYamlDocumentsList
                item={item as TParsedYaml}
                property={property}
                fullPath={path}
                index={index}
            />
        );
    },
    (prevProps, nextProps) => {
        return _.isEqual(prevProps.item, nextProps.item);
    },
);

export default memo(YamlDocumentsList);
