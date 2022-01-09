import {
    SET_ONBOARD,
    SET_NOTIFY,
    SET_ADDRESS,
    SET_ENS,
    SET_NET,
    SET_BALANCE,
} from '../actions/types';

const initialState = {
    onboard: null,
    notify: null,
    address:null,
    end:null,
    network:56,
    balance:null,
    wallet:null,
};

const bridgeReducer = (state = initialState, { payload, type }) => {
    switch (type) {
        case SET_ONBOARD:
            return {
                ...state,
                onboard: payload,
            };
        case SET_NOTIFY:
            return {
                ...state,
                notify: payload,
            };
        case SET_ADDRESS:
            return {
                ...state,
                address: payload,
            };
        case SET_ENS:
            return {
                ...state,
                end: payload,
            };
        case SET_NET:
            return {
                ...state,
                network: payload,
            };
        case SET_BALANCE:
            return {
                ...state,
                balance: payload,
            };
        default:
            return state;
    }
};

export default bridgeReducer;
