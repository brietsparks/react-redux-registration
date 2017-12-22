import { Middleware } from '../types'
import { CHECK_USER_EXISTS_BY_USERNAME } from '../actionTypes'
import {
  userExistsByUsername,
  userDoesNotExistsByUsername,
  registrationCheckError
} from '../actionCreators'

export const checkUserExistsByUsername = (
  checkUserExistsByUsername: (email: string) => Promise<Boolean>
): Middleware => {
  return (store: any) => (next: any) => (action: any) => {
    if (action.type === CHECK_USER_EXISTS_BY_USERNAME) {
      const { dispatch } = store
      const email = action.payload

      checkUserExistsByUsername(email)
        .then(result => {
          if (result === true) {
            dispatch(userExistsByUsername())
          }

          if (result === false) {
            dispatch(userDoesNotExistsByUsername())
          }
        })
        .catch(error => {
          dispatch(registrationCheckError(CHECK_USER_EXISTS_BY_USERNAME, error))
        })
    }

    next(action)
  }
}

export default checkUserExistsByUsername
