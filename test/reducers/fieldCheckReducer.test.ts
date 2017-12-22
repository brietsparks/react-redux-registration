import fieldCheckReducer, { defaultState } from '../../src/reducers/fieldCheckReducer'

import {
  CHECK_USER_EXISTS_BY_EMAIL,
  USER_EXISTS_BY_EMAIL,
  USER_DNE_BY_EMAIL,
  CHECK_EMAIL_EXISTS,
  EMAIL_EXISTS,
  EMAIL_DNE,
  SEND_VERIFICATION_CODE,
  VERIFICATION_CODE_SEND_OK,
  VERIFICATION_CODE_NOT_SENT,
  CHECK_VERIFICATION_CODE,
  VERIFICATION_CODE_MATCHES,
  VERIFICATION_CODE_MISMATCH,
  CHECK_USER_EXISTS_BY_USERNAME,
  USER_EXISTS_BY_USERNAME,
  USER_DNE_BY_USERNAME
} from '../../src/actionTypes'

describe('fieldCheckReduce', () => {
  it('returns a default state', () => {
    expect(fieldCheckReducer(undefined, { type: undefined })).toEqual(defaultState)
  })

  it(`handles action ${CHECK_USER_EXISTS_BY_EMAIL}`, () => {
    const newState = fieldCheckReducer(undefined, { type: CHECK_USER_EXISTS_BY_EMAIL })
    expect(newState.checkingUserExistsByEmail).toEqual(true)
  })

  it(`handles action ${USER_EXISTS_BY_EMAIL}`, () => {
    const newState = fieldCheckReducer(
      { checkingUserExistsByEmail: true },
      { type: USER_EXISTS_BY_EMAIL }
    )
    expect(newState.checkingUserExistsByEmail).toEqual(false)
  })

  it(`handles action ${USER_DNE_BY_EMAIL}`, () => {
    const newState = fieldCheckReducer(
      { checkingUserExistsByEmail: true },
      { type: USER_DNE_BY_EMAIL }
    )
    expect(newState.checkingUserExistsByEmail).toEqual(false)
  })

  it(`handles action ${CHECK_EMAIL_EXISTS}`, () => {
    const newState = fieldCheckReducer(undefined, { type: CHECK_EMAIL_EXISTS })
    expect(newState.checkingEmailExists).toEqual(true)
  })

  it(`handles action ${EMAIL_EXISTS}`, () => {
    const newState = fieldCheckReducer({ checkingEmailExists: true }, { type: EMAIL_EXISTS })
    expect(newState.checkingEmailExists).toEqual(false)
  })

  it(`handles action ${EMAIL_DNE}`, () => {
    const newState = fieldCheckReducer({ checkingEmailExists: true }, { type: EMAIL_DNE })
    expect(newState.checkingEmailExists).toEqual(false)
  })

  it(`handles action ${SEND_VERIFICATION_CODE}`, () => {
    const newState = fieldCheckReducer(undefined, { type: SEND_VERIFICATION_CODE })
    expect(newState.sendingVerificationCode).toEqual(true)
  })

  it(`handles action ${VERIFICATION_CODE_SEND_OK}`, () => {
    const newState = fieldCheckReducer(
      { sendingVerificationCode: true },
      { type: VERIFICATION_CODE_SEND_OK }
    )
    expect(newState.sendingVerificationCode).toEqual(false)
  })

  it(`handles action ${VERIFICATION_CODE_NOT_SENT}`, () => {
    const newState = fieldCheckReducer(
      { sendingVerificationCode: true },
      { type: VERIFICATION_CODE_NOT_SENT }
    )
    expect(newState.sendingVerificationCode).toEqual(false)
  })

  it(`handles action ${CHECK_VERIFICATION_CODE}`, () => {
    const newState = fieldCheckReducer(undefined, { type: CHECK_VERIFICATION_CODE })
    expect(newState.checkingVerificationCode).toEqual(true)
  })

  it(`handles action ${VERIFICATION_CODE_MATCHES}`, () => {
    const newState = fieldCheckReducer(
      { checkingVerificationCode: true },
      { type: VERIFICATION_CODE_MATCHES }
    )
    expect(newState.checkingVerificationCode).toEqual(false)
  })

  it(`handles action ${VERIFICATION_CODE_MISMATCH}`, () => {
    const newState = fieldCheckReducer(
      { checkingVerificationCode: true },
      { type: VERIFICATION_CODE_MISMATCH }
    )
    expect(newState.checkingVerificationCode).toEqual(false)
  })

  it(`handles action ${CHECK_USER_EXISTS_BY_USERNAME}`, () => {
    const newState = fieldCheckReducer(undefined, { type: CHECK_USER_EXISTS_BY_USERNAME })
    expect(newState.checkingUserExistsByUsername).toEqual(true)
  })

  it(`handles action ${USER_EXISTS_BY_USERNAME}`, () => {
    const newState = fieldCheckReducer(
      { checkingUserExistsByUsername: true },
      { type: USER_EXISTS_BY_USERNAME }
    )
    expect(newState.checkingUserExistsByUsername).toEqual(false)
  })

  it(`handles action ${USER_DNE_BY_USERNAME}`, () => {
    const newState = fieldCheckReducer(
      { checkingUserExistsByUsername: true },
      { type: USER_DNE_BY_USERNAME }
    )
    expect(newState.checkingUserExistsByUsername).toEqual(false)
  })
})
