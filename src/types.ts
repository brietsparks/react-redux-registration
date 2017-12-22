export type Action = { type: string; payload?: any }

export interface RegistrationState {
  fieldAvailability: FieldAvailabilityState
  fieldCheck: FieldCheckState
}

export interface FieldAvailabilityState {
  userExistsByEmail: Boolean | undefined
  emailExists: Boolean | undefined
  verificationCodeSendOk: Boolean | undefined
  verificationCodeMatches: Boolean | undefined
  userExistsByUsername: Boolean | undefined
}

export type FieldAvailabilityReducer = (
  state: FieldAvailabilityState,
  action: Action
) => FieldAvailabilityState

export interface FieldCheckState {
  checkingUserExistsByEmail: Boolean
  checkingEmailExists: Boolean
  sendingVerificationCode: Boolean
  checkingVerificationCode: Boolean
  checkingUserExistsByUsername: Boolean
}

export type FieldCheckReducer = (state: FieldCheckState, action: Action) => FieldCheckState

export type Middleware = (store: any) => (next: any) => (action: any) => any

export interface SelectorsArgs {
  registrationSelector: RegistrationSelector
}

export type RegistrationSelector = (state: any) => RegistrationState
