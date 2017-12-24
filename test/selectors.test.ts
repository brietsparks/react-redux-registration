import {
  defaultRegistrationSelector,
  fieldIsActive,
  getFieldAvailability,
  getStep
} from '../src/selectors'
import * as steps from '../src/stepNames'

let state
let registrationSelector = state => state.registration

describe('defaultRegistrationSelector', () => {
  it('it returns the registration attribute of global state', () => {
    expect(defaultRegistrationSelector({ registration: 0 })).toEqual(0)
  })
})

describe('fieldIsActive', () => {
  it(`returns true for the email field at step ${steps.PROVIDE_EMAIL}`, () => {
    expect(fieldIsActive('email', steps.PROVIDE_EMAIL)).toEqual(true)
  })

  it(`returns true for the verificationCode field at step ${
    steps.PROVIDE_VERIFICATION_CODE
  }`, () => {
    expect(fieldIsActive('verificationCode', steps.PROVIDE_VERIFICATION_CODE)).toEqual(true)
  })

  it(`returns true for the username field at step ${steps.PROVIDE_USERNAME}`, () => {
    expect(fieldIsActive('username', steps.PROVIDE_USERNAME)).toEqual(true)
  })

  it('returns false for other combinations', () => {
    expect(fieldIsActive('email', steps.USER_EXISTS_BY_USERNAME)).toEqual(false)
    expect(fieldIsActive('foo', steps.USER_EXISTS_BY_USERNAME)).toEqual(false)
  })
})

describe('getFieldAvailability', () => {
  it('selects fieldAvailability substate', () => {
    expect(
      getFieldAvailability(state => state.registration)({
        registration: {
          fieldAvailability: 0
        }
      })
    ).toEqual(0)
  })
})

describe('getStep', () => {
  it(`evaluates state for step ${steps.PROVIDE_EMAIL}`, () => {
    state = {
      registration: {
        fieldAvailability: {
          userExistsByEmail: undefined,
          emailExists: undefined,
          verificationCodeSendOk: undefined,
          verificationCodeMatches: undefined,
          userExistsByUsername: undefined
        }
      }
    }

    expect(getStep(registrationSelector)(state)).toEqual(steps.PROVIDE_EMAIL)
  })

  it(`evaluates state for step ${steps.PROVIDE_EMAIL}`, () => {
    state = {
      registration: {
        fieldAvailability: {
          userExistsByEmail: true,
          emailExists: undefined,
          verificationCodeSendOk: undefined,
          verificationCodeMatches: undefined,
          userExistsByUsername: undefined
        }
      }
    }

    expect(getStep(registrationSelector)(state)).toEqual(steps.PROVIDE_EMAIL)
  })

  it(`evaluates state for step ${steps.PROVIDE_VERIFICATION_CODE}`, () => {
    state = {
      registration: {
        fieldAvailability: {
          userExistsByEmail: false,
          emailExists: true,
          verificationCodeSendOk: true,
          verificationCodeMatches: undefined,
          userExistsByUsername: undefined
        }
      }
    }

    expect(getStep(registrationSelector)(state)).toEqual(steps.PROVIDE_VERIFICATION_CODE)
  })

  it(`evaluates state for step ${steps.VERIFICATION_CODE_SEND_ERROR}`, () => {
    state = {
      registration: {
        fieldAvailability: {
          userExistsByEmail: false,
          emailExists: true,
          verificationCodeSendOk: false,
          verificationCodeMatches: undefined,
          userExistsByUsername: undefined
        }
      }
    }

    expect(getStep(registrationSelector)(state)).toEqual(steps.VERIFICATION_CODE_SEND_ERROR)
  })

  it(`evaluates state for step ${steps.PROVIDE_USERNAME}`, () => {
    state = {
      registration: {
        fieldAvailability: {
          userExistsByEmail: false,
          emailExists: true,
          verificationCodeSendOk: true,
          verificationCodeMatches: true,
          userExistsByUsername: undefined
        }
      }
    }

    expect(getStep(registrationSelector)(state)).toEqual(steps.PROVIDE_USERNAME)
  })

  it(`evaluates state for step ${steps.PROVIDE_USERNAME}`, () => {
    state = {
      registration: {
        fieldAvailability: {
          userExistsByEmail: false,
          emailExists: false,
          verificationCodeSendOk: undefined,
          verificationCodeMatches: undefined,
          userExistsByUsername: undefined
        }
      }
    }

    expect(getStep(registrationSelector)(state)).toEqual(steps.PROVIDE_USERNAME)
  })
})

// describe('selectors', () => {
//   let state
//
//   let registrationSelector = state => state.registration
//
//   describe('getFieldAvailability', () => {
//     it('returns the field availability state given a registration selector and global state', () => {
//       state = {
//         registration: {
//           fieldAvailability: { a: 1 }
//         }
//       }
//
//       expect(getFieldAvailability(registrationSelector)(state)).toEqual({ a: 1 })
//     })
//   })
// })
