import { Action } from './types'
import {
  REGISTRATION_CHECK_ERROR,
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
} from './actionTypes'

export const registrationCheckError = (onType: String, error: any): Action => ({
  type: REGISTRATION_CHECK_ERROR,
  payload: { onType, error }
})

export const checkUserExistsByEmail = (email: String): Action => ({
  type: CHECK_USER_EXISTS_BY_EMAIL,
  payload: email
})
export const userExistsByEmail = (): Action => ({ type: USER_EXISTS_BY_EMAIL })
export const userDoesNotExistByEmail = (): Action => ({ type: USER_DNE_BY_EMAIL })

export const checkEmailExists = (email: String): Action => ({
  type: CHECK_EMAIL_EXISTS,
  payload: email
})
export const emailExists = (): Action => ({ type: EMAIL_EXISTS })
export const emailDoesNotExist = (): Action => ({ type: EMAIL_DNE })

export const sendVerificationCode = (email: String): Action => ({
  type: SEND_VERIFICATION_CODE,
  payload: email
})
export const verificationCodeSendOk = (): Action => ({ type: VERIFICATION_CODE_SEND_OK })
export const verificationCodeNotSent = (): Action => ({ type: VERIFICATION_CODE_NOT_SENT })

export const checkVerificationCode = (email: String, verificationCode: String): Action => {
  return {
    type: CHECK_VERIFICATION_CODE,
    payload: { email, verificationCode }
  }
}
export const verificationCodeMatches = (): Action => ({ type: VERIFICATION_CODE_MATCHES })
export const verificationCodeMismatch = (): Action => ({ type: VERIFICATION_CODE_MISMATCH })

export const checkUserExistsByUsername = (username: String): Action => ({
  type: CHECK_USER_EXISTS_BY_USERNAME,
  payload: username
})
export const userExistsByUsername = (): Action => ({ type: USER_EXISTS_BY_USERNAME })
export const userDoesNotExistsByUsername = (): Action => ({ type: USER_DNE_BY_USERNAME })
