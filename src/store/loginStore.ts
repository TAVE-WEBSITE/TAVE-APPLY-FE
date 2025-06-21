import { createFieldStore } from './createFieldStore';
import { withPersist } from './withPersist';
import { withReset } from './withReset';

interface LoginStates {
    isLogin: boolean;
    memberId: number;
    username: string;
    email: string;
}

const initState: LoginStates = {
    isLogin: false,
    memberId: 0,
    username: '',
    email: '',
};

const loginStore = createFieldStore(initState);

const persistedLoginStore = withPersist(loginStore, {
    name: 'login-store',
    keys: ['isLogin', 'memberId', 'username', 'email'],
});

export const useLoginStore = withReset(persistedLoginStore, initState)
