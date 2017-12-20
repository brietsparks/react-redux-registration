import { Action } from './types'
import {
  CHECK_USER_EXISTS_BY_EMAIL,
  USER_EXISTS_BY_EMAIL,
  USER_DNE_BY_EMAIL,
  CHECK_EMAIL_EXISTS,
  EMAIL_EXISTS,
  EMAIL_DNE,
  SEND_VERIFICATION_CODE,
  VERIFICATION_CODE_SENT,
  VERIFICATION_CODE_NOT_SENT,
  CHECK_VERIFICATION_CODE,
  VERIFICATION_CODE_MATCHES,
  VERIFICATION_CODE_MISMATCH,
  CHECK_USER_EXISTS_BY_USERNAME,
  USER_EXISTS_BY_USERNAME,
  USER_DNE_BY_USERNAME
} from './actionTypes'

export const checkUserExistsByEmail = (email: string): Action => ({
  type: CHECK_USER_EXISTS_BY_EMAIL,
  payload: email
})
export const userExistsByEmail = (): Action => ({ type: USER_EXISTS_BY_EMAIL })
export const userDoesNotExistByEmail = (): Action => ({ type: USER_DNE_BY_EMAIL })

export const checkEmailExists = (email: string): Action => ({
  type: CHECK_EMAIL_EXISTS,
  payload: email
})
export const emailExists = (): Action => ({ type: EMAIL_EXISTS })
export const emailDoesNotExist = (): Action => ({ type: EMAIL_DNE })

export const sendVerificationCode: action = (email: string) => ({
  type: SEND_VERIFICATION_CODE,
  payload: email
})
export const verificationCodeSent = (): Action => ({ type: VERIFICATION_CODE_SENT })
export const verificationCodeNotSent = (): Action => ({ type: VERIFICATION_CODE_NOT_SENT })

export const checkVerificationCode = (email: string, verificationCode: string): action => {
  return {
    type: CHECK_VERIFICATION_CODE,
    payload: { email, verificationCode }
  }
}
export const verificationCodeMatches = (): action => ({ type: VERIFICATION_CODE_MATCHES })
export const verificationCodeMismatch = (): action => ({ type: VERIFICATION_CODE_MISMATCH })

export const checkUserExistsByUsername = (username: string): action => ({
  type: CHECK_USER_EXISTS_BY_USERNAME,
  payload: username
})
export const userExistsByUsername = (): action => ({ type: USER_EXISTS_BY_USERNAME })
export const userDoesNotExistsByUsername = (): action => ({ type: USER_DNE_BY_USERNAME })
