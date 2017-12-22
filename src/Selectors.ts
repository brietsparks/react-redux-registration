import {
  SelectorsArgs,
  RegistrationSelector,
  RegistrationState,
  FieldAvailabilityState
} from './types'
import * as steps from './stepNames'
import { defaultState } from './reducers/fieldAvailabilityReducer'

export const getFieldAvailability = (r: RegistrationSelector) => (state: any) => {
  return r(state).fieldAvailability
}

export const getStep = (r: RegistrationSelector) => (state: any) => {
  const current = getFieldAvailability(r)(state)

  if (
    stateMatches(current, {
      userExistsByEmail: undefined,
      emailExists: undefined,
      verificationCodeSendOk: undefined,
      verificationCodeMatches: undefined,
      userExistsByUsername: undefined
    })
  ) {
    return steps.PROVIDE_EMAIL
  }

  if (
    stateMatches(current, {
      userExistsByEmail: true,
      emailExists: undefined,
      verificationCodeSendOk: undefined,
      verificationCodeMatches: undefined,
      userExistsByUsername: undefined
    })
  ) {
    return steps.USER_EXISTS_BY_EMAIL
  }

  if (
    stateMatches(current, {
      userExistsByEmail: false,
      emailExists: true,
      verificationCodeSendOk: true,
      verificationCodeMatches: undefined,
      userExistsByUsername: undefined
    })
  ) {
    return steps.PROVIDE_VERIFICATION_CODE
  }

  if (
    stateMatches(current, {
      userExistsByEmail: false,
      emailExists: true,
      verificationCodeSendOk: false,
      verificationCodeMatches: undefined,
      userExistsByUsername: undefined
    })
  ) {
    return steps.VERIFICATION_CODE_SEND_ERROR
  }

  if (
    stateMatches(current, {
      userExistsByEmail: false,
      emailExists: true,
      verificationCodeSendOk: true,
      verificationCodeMatches: true,
      userExistsByUsername: undefined
    }) ||
    stateMatches(current, {
      userExistsByEmail: false,
      emailExists: false,
      verificationCodeSendOk: undefined,
      verificationCodeMatches: undefined,
      userExistsByUsername: undefined
    })
  ) {
    return steps.PROVIDE_USERNAME
  }
}

function stateMatches(currentState: FieldAvailabilityState, evalState: FieldAvailabilityState) {
  return (
    currentState.userExistsByEmail === evalState.userExistsByEmail &&
    currentState.emailExists === evalState.emailExists &&
    currentState.verificationCodeSendOk === evalState.verificationCodeSendOk &&
    currentState.userExistsByEmail === evalState.userExistsByEmail
  )
}

export default (args: SelectorsArgs) => {
  const { registrationSelector } = args

  return {
    getFieldAvailability: getFieldAvailability(registrationSelector)
  }
}
