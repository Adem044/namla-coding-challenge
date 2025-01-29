import { create } from 'zustand';

type TYamlContext = {
    yamlContent: string;
    updateYamlContent: (yamlContent: string) => void;
};

const useYamlContext = create<TYamlContext>()((set) => ({
    yamlContent: '',
    updateYamlContent: (yamlContent) => set(() => ({ yamlContent })),
}));

export default useYamlContext;
