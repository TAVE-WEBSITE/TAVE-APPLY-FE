import { createFieldStore } from './createFieldStore';
import { withPersist } from './withPersist';
import { withReset } from './withReset';

interface LoginStates {
    isLogin: boolean;
    memberId: number;
    username: string;
    email: string;
    resumeState: 'TEMPORARY' | 'SUBMITTED';
}

const initState: LoginStates = {
    isLogin: false,
    memberId: 0,
    username: '',
    email: '',
    resumeState: 'TEMPORARY',
};

const loginStore = createFieldStore(initState);

const persistedLoginStore = withPersist(loginStore, {
    name: 'login-store',
    keys: ['isLogin', 'memberId', 'username', 'email', 'resumeState'],
});

export const useLoginStore = withReset(persistedLoginStore, initState);
