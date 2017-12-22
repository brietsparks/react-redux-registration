import { Middleware } from '../types'
import { CHECK_EMAIL_EXISTS } from '../actionTypes'
import {
  emailExists,
  emailDoesNotExist,
  registrationCheckError,
  sendVerificationCode
} from '../actionCreators'

export const checkEmailExists = (
  checkEmailExists: (email: string) => Promise<Boolean>
): Middleware => {
  return (store: any) => (next: any) => (action: any) => {
    if (action.type === CHECK_EMAIL_EXISTS) {
      const { dispatch } = store
      const email = action.payload

      checkEmailExists(email)
        .then(result => {
          if (result === true) {
            dispatch(emailExists())
            dispatch(sendVerificationCode(email))
          }

          if (result === false) {
            dispatch(emailDoesNotExist())
          }
        })
        .catch(error => {
          dispatch(registrationCheckError(CHECK_EMAIL_EXISTS, error))
        })
    }

    next(action)
  }
}

export default checkEmailExists
