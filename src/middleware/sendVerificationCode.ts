import { Middleware } from '../types'
import { SEND_VERIFICATION_CODE } from '../actionTypes'
import {
  verificationCodeSendOk,
  verificationCodeNotSent,
  registrationCheckError
} from '../actionCreators'

export const sendVerificationCode = (
  sendVerificationCode: (email: string) => Promise<Boolean>
): Middleware => {
  return (store: any) => (next: any) => (action: any) => {
    if (action.type === SEND_VERIFICATION_CODE) {
      const { dispatch } = store
      const email = action.payload

      sendVerificationCode(email)
        .then(result => {
          if (result === true) {
            dispatch(verificationCodeSendOk())
          }

          if (result === false) {
            dispatch(verificationCodeNotSent())
          }
        })
        .catch(error => {
          dispatch(registrationCheckError(SEND_VERIFICATION_CODE, error))
        })
    }

    next(action)
  }
}

export default sendVerificationCode
