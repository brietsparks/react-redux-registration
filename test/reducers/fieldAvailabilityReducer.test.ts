import fieldAvailabilityReducer, { defaultState } from '../../src/reducers/fieldAvailabilityReducer'
import {
  USER_EXISTS_BY_EMAIL,
  USER_DNE_BY_EMAIL,
  EMAIL_EXISTS,
  EMAIL_DNE,
  VERIFICATION_CODE_SEND_OK,
  VERIFICATION_CODE_NOT_SENT,
  VERIFICATION_CODE_MATCHES,
  VERIFICATION_CODE_MISMATCH,
  USER_EXISTS_BY_USERNAME,
  USER_DNE_BY_USERNAME
} from '../../src/actionTypes'

describe('fieldAvailabilityReducer', () => {
  it('returns a default state', () => {
    expect(fieldAvailabilityReducer(undefined, { type: undefined })).toEqual(defaultState)
  })

  it(`handles action ${USER_EXISTS_BY_EMAIL}`, () => {
    const newState = fieldAvailabilityReducer(undefined, { type: USER_EXISTS_BY_EMAIL })
    expect(newState.userExistsByEmail).toEqual(true)
  })

  it(`handles action ${USER_DNE_BY_EMAIL}`, () => {
    const newState = fieldAvailabilityReducer(undefined, { type: USER_DNE_BY_EMAIL })
    expect(newState.userExistsByEmail).toEqual(false)
  })

  it(`handles action ${EMAIL_EXISTS}`, () => {
    const newState = fieldAvailabilityReducer(undefined, { type: EMAIL_EXISTS })
    expect(newState.emailExists).toEqual(true)
  })

  it(`handles action ${EMAIL_DNE}`, () => {
    const newState = fieldAvailabilityReducer(undefined, { type: EMAIL_DNE })
    expect(newState.emailExists).toEqual(false)
  })

  it(`handles action ${EMAIL_EXISTS}`, () => {
    const newState = fieldAvailabilityReducer(undefined, { type: EMAIL_EXISTS })
    expect(newState.emailExists).toEqual(true)
  })

  it(`handles action ${EMAIL_DNE}`, () => {
    const newState = fieldAvailabilityReducer(undefined, { type: EMAIL_DNE })
    expect(newState.emailExists).toEqual(false)
  })

  it(`handles action ${VERIFICATION_CODE_SEND_OK}`, () => {
    const newState = fieldAvailabilityReducer(undefined, { type: VERIFICATION_CODE_SEND_OK })
    expect(newState.verificationCodeSendOk).toEqual(true)
  })

  it(`handles action ${VERIFICATION_CODE_NOT_SENT}`, () => {
    const newState = fieldAvailabilityReducer(undefined, { type: VERIFICATION_CODE_NOT_SENT })
    expect(newState.verificationCodeSendOk).toEqual(false)
  })

  it(`handles action ${VERIFICATION_CODE_MATCHES}`, () => {
    const newState = fieldAvailabilityReducer(undefined, { type: VERIFICATION_CODE_MATCHES })
    expect(newState.verificationCodeMatches).toEqual(true)
  })

  it(`handles action ${VERIFICATION_CODE_MISMATCH}`, () => {
    const newState = fieldAvailabilityReducer(undefined, { type: VERIFICATION_CODE_MISMATCH })
    expect(newState.verificationCodeMatches).toEqual(false)
  })

  it(`handles action ${USER_EXISTS_BY_USERNAME}`, () => {
    const newState = fieldAvailabilityReducer(undefined, { type: USER_EXISTS_BY_USERNAME })
    expect(newState.userExistsByUsername).toEqual(true)
  })

  it(`handles action ${USER_DNE_BY_USERNAME}`, () => {
    const newState = fieldAvailabilityReducer(undefined, { type: USER_DNE_BY_USERNAME })
    expect(newState.userExistsByUsername).toEqual(false)
  })
})
