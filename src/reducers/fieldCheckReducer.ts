import { FieldCheckState, Action, FieldCheckReducer } from '../types'

export const defaultState: FieldCheckState = {
  checkingUserExistsByEmail: false,
  checkingEmailExists: false,
  sendingVerificationCode: false,
  checkingUserExistsByUsername: false
}

export const fieldCheckReducer: FieldCheckReducer = (
  state: FieldCheckState = defaultState,
  { type }: Action
) => {
  switch (type) {
    default:
      return state
  }
}
