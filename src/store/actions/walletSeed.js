import {
  SET_SEND_AMOUNT,
  SET_SEND_ADDRESS,
  SET_SEND_TOKEN,
  SET_TOKEN_SETTED,
  SET_SHOW_ASSETS_FOR_SEND,
  SET_RECEIVE_TOKEN,
  SET_RECEIVE_TOKEN_SETTED
 } from './types';

export function setAmountForSend(payload) {
    console.log(payload)
  return { type: SET_SEND_AMOUNT, payload }
}
export function setTokenForReceiveSetted(payload) {
    console.log(payload)
    return { type: SET_RECEIVE_TOKEN_SETTED, payload }
}
export function setAddressForSend(payload) {
    console.log(payload)
    return { type: SET_SEND_ADDRESS, payload }
}
export function setCurrentTokenForSend(payload) {
    console.log(payload)
    return { type: SET_SEND_TOKEN, payload }
}
export function setTokenSetted(payload) {
    console.log(payload)
    return { type: SET_TOKEN_SETTED, payload }
}
export function setShowAssetsForSend(payload) {
    console.log(payload)
    return { type: SET_SHOW_ASSETS_FOR_SEND, payload }
}
export function setReceiveToken(payload) {
    console.log(payload)
    return { type: SET_RECEIVE_TOKEN, payload }
}