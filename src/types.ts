export type Action = { type: string; payload: any }

export interface FieldAvailabilityState {
  userExistsByEmail: String | undefined
  emailExists: String | undefined
  verificationCodeSent: Boolean | undefined
  emailVerified: Boolean | undefined
  userExistsByUsername: String | undefined
}

export type FieldAvailabilityReducer = (
  state: FieldAvailabilityState,
  action: Action
) => FieldAvailabilityState

export interface FieldCheckState {
  checkingUserExistsByEmail: false
  checkingEmailExists: false
  sendingVerificationCode: false
  checkingUserExistsByUsername: false
}

export type FieldCheckReducer = (state: FieldCheckState, action: Action) => FieldCheckState

export type Middleware = (store: any) => (next: any) => (action: any) => any
