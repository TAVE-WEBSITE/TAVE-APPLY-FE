import { createFieldStore } from './createFieldStore';
import { withPersist } from './withPersist';
import { withReset } from './withReset';
import { OutcomeStatus } from '@/modules/resultType';

interface MemberStates {
    isLogin: boolean;
    memberId: number;
    username: string;
    email: string;
    resumeState: 'TEMPORARY' | 'SUBMITTED';
    applicationStatus: OutcomeStatus;
    resumeId: number;
}

const initStates: MemberStates = {
    isLogin: false,
    memberId: 0,
    username: '',
    email: '',
    resumeState: 'TEMPORARY',
    applicationStatus: 'NO_STATUS',
    resumeId: 0,
};

const memberStore = createFieldStore(initStates);

const persistedMemberStore = withPersist(memberStore, {
    name: 'member-store',
    keys: ['isLogin', 'memberId', 'username', 'email', 'resumeState', 'applicationStatus', 'resumeId'],
});

export const useMemberStore = withReset(persistedMemberStore, initStates);
