import { createFieldStore } from './createFieldStore';
import { withPersist } from './withPersist';

const initStates = {
    generation: '',
    isDocument: false,
    firstSession: { title: '', date: '' },
    secondSession: { title: '', date: '' },
};

const homeStore = createFieldStore(initStates);

export const useHomeStore = withPersist(homeStore, {
    name: 'home-store',
    keys: ['generation', 'isDocument', 'firstSession', 'secondSession'],
});
