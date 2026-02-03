import { axiosServer } from './axiosServer';
import { formatSession, formatSetting } from '@/utils/formatHomeData';

export async function applySetting() {
    const res = await axiosServer.get(`/v1/normal/apply/setting`);
    return formatSetting(res.data.result);
}

export async function applySession() {
    const res = await axiosServer.get(`/v1/normal/session`);
    return formatSession(res.data.result);
}
