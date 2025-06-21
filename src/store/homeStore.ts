import { createFieldStore } from './createFieldStore';
import { withPersist } from './withPersist';

const initState = {
    generation: '',
};

const homeStore = createFieldStore(initState);

export const useHomeStore = withPersist(homeStore, {
    name: 'home-store',
    keys: ['generation'],
});
