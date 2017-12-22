import { Middleware } from '../types'
import { CHECK_USER_EXISTS_BY_EMAIL } from '../actionTypes'
import {
  userExistsByEmail,
  userDoesNotExistByEmail,
  registrationCheckError,
  checkEmailExists
} from '../actionCreators'

export const checkUserExistsByEmail = (
  checkUserExistsByEmail: (email: string) => Promise<Boolean>
): Middleware => {
  return (store: any) => (next: any) => (action: any) => {
    if (action.type === CHECK_USER_EXISTS_BY_EMAIL) {
      const { dispatch } = store
      const email = action.payload

      checkUserExistsByEmail(email)
        .then(result => {
          if (result === true) {
            dispatch(userExistsByEmail())
          }

          if (result === false) {
            dispatch(userDoesNotExistByEmail())
            dispatch(checkEmailExists(email))
          }
        })
        .catch(error => {
          dispatch(registrationCheckError(CHECK_USER_EXISTS_BY_EMAIL, error))
        })
    }

    next(action)
  }
}

export default checkUserExistsByEmail
