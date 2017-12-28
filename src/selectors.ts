import {
  SelectorsArgs,
  RegistrationSelector,
  RegistrationState,
  FieldAvailabilityState,
  Options
} from './types'
import * as steps from './stepNames'
import { defaultState } from './reducers/fieldAvailabilityReducer'

export const defaultRegistrationSelector = (state: any): RegistrationState => {
  return state.registration
}

export const getFieldAvailability = (r: RegistrationSelector) => (
  state: any
): FieldAvailabilityState => {
  return r(state).fieldAvailability
}

export const emailProvided = (r: RegistrationSelector) => (state: any): Boolean => {
  const current = getFieldAvailability(r)(state)
  return (
    current.userExistsByEmail === false ||
    (current.userExistsByEmail === true && current.emailExists === false)
  )
}

export const verificationRequired = (r: RegistrationSelector) => (state: any): Boolean => {
  return getFieldAvailability(r)(state).verificationCodeSendOk === true
}

export const verified = (r: RegistrationSelector) => (state: any): Boolean => {
  return getFieldAvailability(r)(state).verificationCodeMatches === true
}

export const emailLockedIn = (r: RegistrationSelector) => (state: any): Boolean => {
  const current = getFieldAvailability(r)(state)
  return (
    (current.userExistsByEmail === false && current.emailExists === false) || verified(r)(state)
  )
}

export const usernameLockedIn = (r: RegistrationSelector) => (state: any): Boolean => {
  return getFieldAvailability(r)(state).userExistsByUsername === false
}

const defaultOptions: Options = { withUsername: true }

export const getStep = (
  r: RegistrationSelector = defaultRegistrationSelector,
  options: Options = defaultOptions
) => (s: any): String => {
  if (!emailProvided(r)(s)) {
    return steps.PROVIDE_EMAIL
  }

  if (emailProvided(r)(s) && verificationRequired(r)(s) && !verified(r)(s)) {
    return steps.PROVIDE_VERIFICATION_CODE
  }

  if (emailLockedIn(r)(s)) {
    if (options.withUsername && !usernameLockedIn(r)(s)) {
      return steps.PROVIDE_USERNAME
    }

    return steps.CHECKS_COMPLETE
  }

  return steps.UNDEFINED_STEP
}

export const fieldIsActive = (field: String, step: String): Boolean => {
  if (field === 'email' && step === steps.PROVIDE_EMAIL) {
    return true
  }

  if (field === 'verificationCode' && step === steps.PROVIDE_VERIFICATION_CODE) {
    return true
  }

  if (field === 'username' && step === steps.PROVIDE_USERNAME) {
    return true
  }

  return false
}

export default (
  r: RegistrationSelector = defaultRegistrationSelector,
  options: Options = defaultOptions
) => {
  return {
    getStep: getStep(r, options)
  }
}
