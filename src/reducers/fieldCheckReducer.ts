import { FieldCheckState, Action, FieldCheckReducer } from '../types'

import {
  CHECK_USER_EXISTS_BY_EMAIL,
  USER_EXISTS_BY_EMAIL,
  USER_DNE_BY_EMAIL,
  CHECK_EMAIL_EXISTS,
  EMAIL_EXISTS,
  EMAIL_DNE,
  SEND_VERIFICATION_CODE,
  VERIFICATION_CODE_SEND_OK,
  VERIFICATION_CODE_NOT_SENT,
  CHECK_VERIFICATION_CODE,
  VERIFICATION_CODE_MATCHES,
  VERIFICATION_CODE_MISMATCH,
  CHECK_USER_EXISTS_BY_USERNAME,
  USER_EXISTS_BY_USERNAME,
  USER_DNE_BY_USERNAME
} from '../actionTypes'

export const defaultState: FieldCheckState = {
  checkingUserExistsByEmail: false,
  checkingEmailExists: false,
  sendingVerificationCode: false,
  checkingVerificationCode: false,
  checkingUserExistsByUsername: false
}

export const fieldCheckReducer: FieldCheckReducer = (
  state: FieldCheckState = defaultState,
  { type }: Action
) => {
  switch (type) {
    case CHECK_USER_EXISTS_BY_EMAIL:
      return Object.assign({}, state, { checkingUserExistsByEmail: true })
    case USER_EXISTS_BY_EMAIL:
      return Object.assign({}, state, { checkingUserExistsByEmail: false })
    case USER_DNE_BY_EMAIL:
      return Object.assign({}, state, { checkingUserExistsByEmail: false })

    case CHECK_EMAIL_EXISTS:
      return Object.assign({}, state, { checkingEmailExists: true })
    case EMAIL_EXISTS:
      return Object.assign({}, state, { checkingEmailExists: false })
    case EMAIL_DNE:
      return Object.assign({}, state, { checkingEmailExists: false })

    case SEND_VERIFICATION_CODE:
      return Object.assign({}, state, { sendingVerificationCode: true })
    case VERIFICATION_CODE_SEND_OK:
      return Object.assign({}, state, { sendingVerificationCode: false })
    case VERIFICATION_CODE_NOT_SENT:
      return Object.assign({}, state, { sendingVerificationCode: false })

    case CHECK_VERIFICATION_CODE:
      return Object.assign({}, state, { checkingVerificationCode: true })
    case VERIFICATION_CODE_MATCHES:
      return Object.assign({}, state, { checkingVerificationCode: false })
    case VERIFICATION_CODE_MISMATCH:
      return Object.assign({}, state, { checkingVerificationCode: false })

    case CHECK_USER_EXISTS_BY_USERNAME:
      return Object.assign({}, state, { checkingUserExistsByUsername: true })
    case USER_EXISTS_BY_USERNAME:
      return Object.assign({}, state, { checkingUserExistsByUsername: false })
    case USER_DNE_BY_USERNAME:
      return Object.assign({}, state, { checkingUserExistsByUsername: false })

    default:
      return state
  }
}

export default fieldCheckReducer
