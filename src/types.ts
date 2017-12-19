export type Action = { type: string; payload: any }

export interface FieldCheckState {
  userExistsByEmail: String | undefined
  emailExists: String | undefined
  verificationCodeSent: Boolean | undefined
  emailVerified: Boolean | undefined
  userExistsByUsername: String | undefined
}

export type FieldCheckReducer = (state: FieldCheckState, action: Action) => FieldCheckState
