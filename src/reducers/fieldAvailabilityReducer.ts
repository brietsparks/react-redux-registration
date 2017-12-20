import { FieldAvailabilityState, Action, FieldAvailabilityReducer } from '../types'
import * as actionTypes from '../actionTypes'

export const defaultState: FieldAvailabilityState = {
  userExistsByEmail: undefined,
  emailExists: undefined,
  verificationCodeSent: undefined,
  emailVerified: undefined,
  userExistsByUsername: undefined
}

export const fieldAvailabilityReducer: FieldAvailabilityReducer = (
  state: FieldAvailabilityState = defaultState,
  { type }: Action
) => {
  switch (type) {
    case actionTypes.USER_EXISTS_BY_EMAIL:
      return Object.assign({}, state, { userExistsByEmail: true })
    case actionTypes.USER_DNE_BY_EMAIL:
      return Object.assign({}, state, { userExistsByEmail: false })
    case actionTypes.EMAIL_EXISTS:
      return Object.assign({}, state, { emailExists: true })
    case actionTypes.EMAIL_DNE:
      return Object.assign({}, state, { emailExists: false })
    case actionTypes.VERIFICATION_CODE_SENT:
      return Object.assign({}, state, { verificationCodeSent: true })
    case actionTypes.VERIFICATION_CODE_NOT_SENT:
      return Object.assign({}, state, { verificationCodeSent: false })
    case actionTypes.EMAIL_VERIFIED:
      return Object.assign({}, state, { emailVerified: true })
    case actionTypes.EMAIL_NOT_VERIFIED:
      return Object.assign({}, state, { emailVerified: false })
    case actionTypes.USER_EXISTS_BY_USERNAME:
      return Object.assign({}, state, { userExistsByUsername: true })
    case actionTypes.USER_DNE_BY_USERNAME:
      return Object.assign({}, state, { userExistsByUsername: false })

    default:
      return state
  }
}

export default fieldAvailabilityReducer
