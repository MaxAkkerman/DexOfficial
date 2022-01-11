import {
    SET_ONBOARD,
    SET_NOTIFY,
    SET_ADDRESS,
    SET_ENS,
    SET_NET,
    SET_BALANCE,
} from './types';

export function setNotify(payload) {
    return { type: SET_ONBOARD, payload };
}
export function setOnboard(payload) {
    return { type: SET_NOTIFY, payload };
}
export function setAddress(payload) {
    return { type: SET_ADDRESS, payload };
}
export function setEns(payload) {
    return { type: SET_ENS, payload };
}
export function setNetwork(payload) {
    return { type: SET_NET, payload };
}
export function setBalance(payload) {
    return { type: SET_BALANCE, payload };
}
