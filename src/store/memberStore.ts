import { createFieldStore } from './createFieldStore';
import { withPersist } from './withPersist';
import { withReset } from './withReset';

interface MemberStates {
    isLogin: boolean;
    memberId: number;
    username: string;
    email: string;
    resumeState: 'TEMPORARY' | 'SUBMITTED';
    applicationStatus: 'NO_STATUS' | 'DOCUMENT_PASSED' | 'REJECTED' | 'FINAL_ACCEPTED';
}

const initState: MemberStates = {
    isLogin: false,
    memberId: 0,
    username: '',
    email: '',
    resumeState: 'TEMPORARY',
    applicationStatus: 'NO_STATUS'
};

const memberStore = createFieldStore(initState);

const persistedMemberStore = withPersist(memberStore, {
    name: 'member-store',
    keys: ['isLogin', 'memberId', 'username', 'email', 'resumeState', 'applicationStatus'],
});

export const useMemberStore = withReset(persistedMemberStore, initState);
