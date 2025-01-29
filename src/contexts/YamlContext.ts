import _ from 'lodash';
import { create } from 'zustand';
import yaml from 'js-yaml';

import { formatParsedYaml } from '@/lib/utils';

type TYamlContext = {
    parsedYaml: Array<Record<string, unknown>>;
    updateParsedYaml: (index: number, path: string, value?: unknown) => void;
    yamlContent: string;
    updateYamlContent: (yamlContent: string) => void;
};

const useYamlContext = create<TYamlContext>()((set) => ({
    parsedYaml: [],
    yamlContent: '',
    updateParsedYaml: (index, path, value) =>
        set((state) => {
            const newParsedYaml = _.cloneDeep(state.parsedYaml);
            if (!_.isUndefined(value)) {
                // update the value
                _.set(newParsedYaml[index] as object, path, value);
            } else {
                if (path) {
                    // delete nested key
                    _.unset(newParsedYaml[index], path);
                } else {
                    // delete first level object
                    newParsedYaml.splice(index, 1);
                }
            }
            return {
                parsedYaml: newParsedYaml,
                yamlContent: formatParsedYaml(newParsedYaml),
            };
        }),
    updateYamlContent: (yamlContent) =>
        set(() => {
            let parsedYaml: TYamlContext['parsedYaml'] = [];
            try {
                parsedYaml = yaml.loadAll(yamlContent ?? '') as Array<
                    Record<string, unknown>
                >;
                parsedYaml = parsedYaml.map((obj, index) => ({
                    _id: index,
                    ...obj,
                }));
            } catch (err) {
                console.log(err);
            }
            return { yamlContent, parsedYaml };
        }),
}));

export default useYamlContext;
