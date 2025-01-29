import _ from 'lodash';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import yaml from 'js-yaml';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatParsedYaml(parsedYaml: Array<Record<string, unknown>>) {
    return parsedYaml
        .map((obj) => yaml.dump(_.omit(obj, '_id'), { lineWidth: -1 }))
        .join('---\n');
}
