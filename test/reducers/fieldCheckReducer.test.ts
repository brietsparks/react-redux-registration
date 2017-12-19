import fieldCheckReducer, { defaultState } from '../../src/reducers/fieldCheckReducer'
import {
  USER_EXISTS_BY_EMAIL,
  USER_DNE_BY_EMAIL,
  EMAIL_EXISTS,
  EMAIL_DNE,
  VERIFICATION_CODE_SENT,
  VERIFICATION_CODE_NOT_SENT,
  EMAIL_VERIFIED,
  EMAIL_NOT_VERIFIED,
  USER_EXISTS_BY_USERNAME,
  USER_DNE_BY_USERNAME
} from '../../src/actionTypes'

describe('fieldCheckReducer', () => {
  it('returns a default state', () => {
    expect(fieldCheckReducer(undefined, { type: undefined })).toEqual(defaultState)
  })

  it(`can handle ${USER_EXISTS_BY_EMAIL}`, () => {
    const newState = fieldCheckReducer(undefined, { type: USER_EXISTS_BY_EMAIL })
    expect(newState.userExistsByEmail).toEqual(true)
  })

  it(`can handle ${USER_DNE_BY_EMAIL}`, () => {
    const newState = fieldCheckReducer(undefined, { type: USER_DNE_BY_EMAIL })
    expect(newState.userExistsByEmail).toEqual(false)
  })

  it(`can handle ${EMAIL_EXISTS}`, () => {
    const newState = fieldCheckReducer(undefined, { type: EMAIL_EXISTS })
    expect(newState.emailExists).toEqual(true)
  })

  it(`can handle ${EMAIL_DNE}`, () => {
    const newState = fieldCheckReducer(undefined, { type: EMAIL_DNE })
    expect(newState.emailExists).toEqual(false)
  })

  it(`can handle ${EMAIL_EXISTS}`, () => {
    const newState = fieldCheckReducer(undefined, { type: EMAIL_EXISTS })
    expect(newState.emailExists).toEqual(true)
  })

  it(`can handle ${EMAIL_DNE}`, () => {
    const newState = fieldCheckReducer(undefined, { type: EMAIL_DNE })
    expect(newState.emailExists).toEqual(false)
  })

  it(`can handle ${VERIFICATION_CODE_SENT}`, () => {
    const newState = fieldCheckReducer(undefined, { type: VERIFICATION_CODE_SENT })
    expect(newState.verificationCodeSent).toEqual(true)
  })

  it(`can handle ${VERIFICATION_CODE_NOT_SENT}`, () => {
    const newState = fieldCheckReducer(undefined, { type: VERIFICATION_CODE_NOT_SENT })
    expect(newState.verificationCodeSent).toEqual(false)
  })

  it(`can handle ${EMAIL_VERIFIED}`, () => {
    const newState = fieldCheckReducer(undefined, { type: EMAIL_VERIFIED })
    expect(newState.emailVerified).toEqual(true)
  })

  it(`can handle ${EMAIL_NOT_VERIFIED}`, () => {
    const newState = fieldCheckReducer(undefined, { type: EMAIL_NOT_VERIFIED })
    expect(newState.emailVerified).toEqual(false)
  })

  it(`can handle ${USER_EXISTS_BY_USERNAME}`, () => {
    const newState = fieldCheckReducer(undefined, { type: USER_EXISTS_BY_USERNAME })
    expect(newState.userExistsByUsername).toEqual(true)
  })

  it(`can handle ${USER_DNE_BY_USERNAME}`, () => {
    const newState = fieldCheckReducer(undefined, { type: USER_DNE_BY_USERNAME })
    expect(newState.userExistsByUsername).toEqual(false)
  })
})
