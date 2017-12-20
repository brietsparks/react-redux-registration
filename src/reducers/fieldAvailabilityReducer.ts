import { FieldAvailabilityState, Action, FieldAvailabilityReducer } from '../types'
import {
  USER_EXISTS_BY_EMAIL,
  USER_DNE_BY_EMAIL,
  EMAIL_EXISTS,
  EMAIL_DNE,
  VERIFICATION_CODE_SENT,
  VERIFICATION_CODE_NOT_SENT,
  VERIFICATION_CODE_MATCHES,
  VERIFICATION_CODE_MISMATCH,
  USER_EXISTS_BY_USERNAME,
  USER_DNE_BY_USERNAME
} from '../actionTypes'

export const defaultState: FieldAvailabilityState = {
  userExistsByEmail: undefined,
  emailExists: undefined,
  verificationCodeSent: undefined,
  verificationCodeMatches: undefined,
  emailVerified: undefined,
  userExistsByUsername: undefined
}

export const fieldAvailabilityReducer: FieldAvailabilityReducer = (
  state: FieldAvailabilityState = defaultState,
  { type }: Action
) => {
  switch (type) {
    case USER_EXISTS_BY_EMAIL:
      return Object.assign({}, state, { userExistsByEmail: true })
    case USER_DNE_BY_EMAIL:
      return Object.assign({}, state, { userExistsByEmail: false })

    case EMAIL_EXISTS:
      return Object.assign({}, state, { emailExists: true })
    case EMAIL_DNE:
      return Object.assign({}, state, { emailExists: false })

    case VERIFICATION_CODE_SENT:
      return Object.assign({}, state, { verificationCodeSent: true })
    case VERIFICATION_CODE_NOT_SENT:
      return Object.assign({}, state, { verificationCodeSent: false })

    case VERIFICATION_CODE_MATCHES:
      return Object.assign({}, state, { verificationCodeMatches: true })
    case VERIFICATION_CODE_MISMATCH:
      return Object.assign({}, state, { verificationCodeMatches: false })

    case USER_EXISTS_BY_USERNAME:
      return Object.assign({}, state, { userExistsByUsername: true })
    case USER_DNE_BY_USERNAME:
      return Object.assign({}, state, { userExistsByUsername: false })

    default:
      return state
  }
}

export default fieldAvailabilityReducer
