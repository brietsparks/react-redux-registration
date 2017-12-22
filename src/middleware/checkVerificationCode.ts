import { Middleware } from '../types'
import { CHECK_VERIFICATION_CODE } from '../actionTypes'
import {
  verificationCodeMatches,
  verificationCodeMismatch,
  registrationCheckError
} from '../actionCreators'

export const checkVerificationCode = (
  checkVerificationCode: (email: string, verificationCode: string) => Promise<Boolean>
): Middleware => {
  return (store: any) => (next: any) => (action: any) => {
    if (action.type === CHECK_VERIFICATION_CODE) {
      const { dispatch } = store
      const { email, verificationCode } = action.payload

      checkVerificationCode(email, verificationCode)
        .then(result => {
          if (result === true) {
            dispatch(verificationCodeMatches())
          }

          if (result === false) {
            dispatch(verificationCodeMismatch())
          }
        })
        .catch(error => {
          dispatch(registrationCheckError(CHECK_VERIFICATION_CODE, error))
        })
    }

    next(action)
  }
}

export default checkVerificationCode
