export type Action = { type: string; payload?: any }

export interface FieldAvailabilityState {
  userExistsByEmail: String | undefined
  emailExists: String | undefined
  verificationCodeSendOk: Boolean | undefined
  verificationCodeMatches: Boolean | undefined
  emailVerified: Boolean | undefined
  userExistsByUsername: String | undefined
}

export type FieldAvailabilityReducer = (
  state: FieldAvailabilityState,
  action: Action
) => FieldAvailabilityState

export interface FieldCheckState {
  checkingUserExistsByEmail: boolean
  checkingEmailExists: boolean
  sendingVerificationCode: boolean
  checkingVerificationCode: boolean
  checkingUserExistsByUsername: boolean
}

export type FieldCheckReducer = (state: FieldCheckState, action: Action) => FieldCheckState

export type Middleware = (store: any) => (next: any) => (action: any) => any
