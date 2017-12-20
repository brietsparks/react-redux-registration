import {
  registrationCheckError,
  checkUserExistsByEmail,
  userExistsByEmail,
  userDoesNotExistByEmail,
  checkEmailExists,
  emailExists,
  emailDoesNotExist,
  sendVerificationCode,
  verificationCodeSent,
  verificationCodeNotSent,
  checkVerificationCode,
  verificationCodeMatches,
  verificationCodeMismatch,
  checkUserExistsByUsername,
  userExistsByUsername,
  userDoesNotExistsByUsername
} from '../src/actionCreators'

import {
  REGISTRATION_CHECK_ERROR,
  CHECK_USER_EXISTS_BY_EMAIL,
  USER_EXISTS_BY_EMAIL,
  USER_DNE_BY_EMAIL,
  CHECK_EMAIL_EXISTS,
  EMAIL_EXISTS,
  EMAIL_DNE,
  SEND_VERIFICATION_CODE,
  VERIFICATION_CODE_SENT,
  VERIFICATION_CODE_NOT_SENT,
  CHECK_VERIFICATION_CODE,
  VERIFICATION_CODE_MATCHES,
  VERIFICATION_CODE_MISMATCH,
  CHECK_USER_EXISTS_BY_USERNAME,
  USER_EXISTS_BY_USERNAME,
  USER_DNE_BY_USERNAME
} from '../src/actionTypes'

describe('registrationCheckError', () => {
  it(`returns an action of type ${REGISTRATION_CHECK_ERROR}`, () => {
    const action = registrationCheckError('SOME_TYPE', { msg: 'err' })
    expect(action.type).toEqual(REGISTRATION_CHECK_ERROR)
  })

  it('returns an action with the onType and error arg as paylaod', () => {
    const action = registrationCheckError('SOME_TYPE', { msg: 'err' })
    expect(action.payload).toEqual({ onType: 'SOME_TYPE', error: { msg: 'err' } })
  })
})

describe('checkUserExistsByEmail', () => {
  it(`returns an action of type ${CHECK_USER_EXISTS_BY_EMAIL}`, () => {
    const action = checkUserExistsByEmail('a@a.a')
    expect(action.type).toEqual(CHECK_USER_EXISTS_BY_EMAIL)
  })

  it('returns an action with the email arg as paylaod', () => {
    const action = checkUserExistsByEmail('a@a.a')
    expect(action.payload).toEqual('a@a.a')
  })
})

describe('userExistsByEmail', () => {
  it(`returns an action of type ${USER_EXISTS_BY_EMAIL}`, () => {
    const action = userExistsByEmail()
    expect(action.type).toEqual(USER_EXISTS_BY_EMAIL)
  })
})

describe('userDoesNotExistsByEmail', () => {
  it(`returns an action of type ${USER_DNE_BY_EMAIL}`, () => {
    const action = userDoesNotExistByEmail()
    expect(action.type).toEqual(USER_DNE_BY_EMAIL)
  })
})

describe('checkEmailExists', () => {
  it(`returns an action of type ${CHECK_EMAIL_EXISTS}`, () => {
    const action = checkEmailExists('a@a.a')
    expect(action.type).toEqual(CHECK_EMAIL_EXISTS)
  })

  it('returns an action with the email arg as paylaod', () => {
    const action = checkEmailExists('a@a.a')
    expect(action.payload).toEqual('a@a.a')
  })
})

describe('emailExists', () => {
  it(`returns an action of type ${EMAIL_EXISTS}`, () => {
    const action = emailExists()
    expect(action.type).toEqual(EMAIL_EXISTS)
  })
})

describe('emailDoesNotExist', () => {
  it(`returns an action of type ${EMAIL_DNE}`, () => {
    const action = emailDoesNotExist()
    expect(action.type).toEqual(EMAIL_DNE)
  })
})

describe('sendVerificationCode', () => {
  it(`returns an action of type ${SEND_VERIFICATION_CODE}`, () => {
    const action = sendVerificationCode('a@a.a')
    expect(action.type).toEqual(SEND_VERIFICATION_CODE)
  })

  it('returns an action with the email arg as paylaod', () => {
    const action = sendVerificationCode('a@a.a')
    expect(action.payload).toEqual('a@a.a')
  })
})

describe('verificationCodeSent', () => {
  it(`returns an action of type ${VERIFICATION_CODE_SENT}`, () => {
    const action = verificationCodeSent()
    expect(action.type).toEqual(VERIFICATION_CODE_SENT)
  })
})

describe('verificationCodeNotSent', () => {
  it(`returns an action of type ${VERIFICATION_CODE_NOT_SENT}`, () => {
    const action = verificationCodeNotSent()
    expect(action.type).toEqual(VERIFICATION_CODE_NOT_SENT)
  })
})

describe('checkVerificationCode', () => {
  it(`returns an action of type ${CHECK_VERIFICATION_CODE}`, () => {
    const action = checkVerificationCode('a@a.a', 'abc123')
    expect(action.type).toEqual(CHECK_VERIFICATION_CODE)
  })

  it('returns an action with the email and verificationCode args as paylaod', () => {
    const action = checkVerificationCode('a@a.a', 'abc123')
    expect(action.payload).toEqual({ email: 'a@a.a', verificationCode: 'abc123' })
  })
})

describe('verificationCodeMatches', () => {
  it(`returns an action of type ${VERIFICATION_CODE_MATCHES}`, () => {
    const action = verificationCodeMatches()
    expect(action.type).toEqual(VERIFICATION_CODE_MATCHES)
  })
})

describe('verificationCodeMismatch', () => {
  it(`returns an action of type ${VERIFICATION_CODE_MISMATCH}`, () => {
    const action = verificationCodeMismatch()
    expect(action.type).toEqual(VERIFICATION_CODE_MISMATCH)
  })
})

describe('checkUserExistsByUsername', () => {
  it(`returns an action of type ${CHECK_USER_EXISTS_BY_USERNAME}`, () => {
    const action = checkUserExistsByUsername('abe')
    expect(action.type).toEqual(CHECK_USER_EXISTS_BY_USERNAME)
  })

  it('returns an action with the username arg as paylaod', () => {
    const action = checkUserExistsByUsername('abe')
    expect(action.payload).toEqual('abe')
  })
})

describe('userExistsByUsername', () => {
  it(`returns an action of type ${USER_EXISTS_BY_USERNAME}`, () => {
    const action = userExistsByUsername()
    expect(action.type).toEqual(USER_EXISTS_BY_USERNAME)
  })
})

describe('userDoesNotExistsByUsername', () => {
  it(`returns an action of type ${USER_DNE_BY_USERNAME}`, () => {
    const action = userDoesNotExistsByUsername()
    expect(action.type).toEqual(USER_DNE_BY_USERNAME)
  })
})
