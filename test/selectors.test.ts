import {
  defaultRegistrationSelector,
  fieldIsActive,
  getFieldAvailability,
  emailLockedIn,
  getStep,
  getActionCreator
} from '../src/selectors'
import * as steps from '../src/stepNames'
import {
  checkUserExistsByEmail,
  checkVerificationCode,
  checkUserExistsByUsername
} from '../src/actionCreators'

let state
let registrationSelector = state => state.registration

describe('defaultRegistrationSelector', () => {
  it('it returns the registration attribute of global state', () => {
    expect(defaultRegistrationSelector({ registration: 0 })).toEqual(0)
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

describe('emailLockedIn', () => {
  it('returns false for a particular set of finite states', () => {
    expect(
      emailLockedIn(registrationSelector)({
        registration: {
          fieldAvailability: {}
        }
      })
    ).toEqual(false)

    expect(
      emailLockedIn(registrationSelector)({
        registration: {
          fieldAvailability: { userExistsByEmail: true }
        }
      })
    ).toEqual(false)

    expect(
      emailLockedIn(registrationSelector)({
        registration: {
          fieldAvailability: {
            userExistsByEmail: false,
            emailExists: undefined
          }
        }
      })
    ).toEqual(false)

    expect(
      emailLockedIn(registrationSelector)({
        registration: {
          fieldAvailability: {
            userExistsByEmail: false,
            emailExists: true,
            verificationCodeMatches: undefined
          }
        }
      })
    ).toEqual(false)

    expect(
      emailLockedIn(registrationSelector)({
        registration: {
          fieldAvailability: {
            userExistsByEmail: false,
            emailExists: true,
            verificationCodeMatches: false
          }
        }
      })
    ).toEqual(false)
  })

  it('returns true for a particular set of finite states', () => {
    expect(
      emailLockedIn(registrationSelector)({
        registration: {
          fieldAvailability: {
            userExistsByEmail: false,
            emailExists: false
          }
        }
      })
    ).toEqual(true)

    expect(
      emailLockedIn(registrationSelector)({
        registration: {
          fieldAvailability: {
            userExistsByEmail: false,
            emailExists: true,
            verificationCodeMatches: true
          }
        }
      })
    ).toEqual(true)
  })
})

describe('getStep', () => {
  it(`returns ${steps.PROVIDE_EMAIL} when userExistsByEmail is undefined`, () => {
    state = {
      registration: {
        fieldAvailability: {
          userExistsByEmail: undefined
        }
      }
    }

    expect(getStep(registrationSelector)(state)).toEqual(steps.PROVIDE_EMAIL)
  })

  it(`returns ${steps.PROVIDE_EMAIL} when userExistsByEmail is true`, () => {
    state = {
      registration: {
        fieldAvailability: {
          userExistsByEmail: true
        }
      }
    }

    expect(getStep(registrationSelector)(state)).toEqual(steps.PROVIDE_EMAIL)
  })

  it(`returns ${
    steps.PROVIDE_VERIFICATION_CODE
  } when the email was provided and the verification code is sent but not verified`, () => {
    state = {
      registration: {
        fieldAvailability: {
          userExistsByEmail: false,
          emailExists: true,
          verificationCodeSendOk: true,
          verificationCodeMatches: undefined
        }
      }
    }

    expect(getStep(registrationSelector)(state)).toEqual(steps.PROVIDE_VERIFICATION_CODE)

    state = {
      registration: {
        fieldAvailability: {
          userExistsByEmail: false,
          emailExists: true,
          verificationCodeSendOk: true,
          verificationCodeMatches: undefined
        }
      }
    }

    expect(getStep(registrationSelector)(state)).toEqual(steps.PROVIDE_VERIFICATION_CODE)
  })

  // it(`evaluates state for step ${steps.VERIFICATION_CODE_SEND_ERROR}`, () => {
  //   state = {
  //     registration: {
  //       fieldAvailability: {
  //         userExistsByEmail: false,
  //         emailExists: true,
  //         verificationCodeSendOk: false,
  //         verificationCodeMatches: undefined,
  //         userExistsByUsername: undefined
  //       }
  //     }
  //   }
  //
  //   expect(getStep(registrationSelector)(state)).toEqual(steps.VERIFICATION_CODE_SEND_ERROR)
  // })

  describe('when email is locked in', () => {
    const emailLockedInState = {
      userExistsByEmail: false,
      emailExists: false,
      verificationCodeSendOk: undefined,
      verificationCodeMatches: undefined
    }

    it(`returns ${steps.PROVIDE_USERNAME} when username is undefined`, () => {
      state = {
        registration: {
          fieldAvailability: {
            ...emailLockedInState,
            userExistsByUsername: undefined
          }
        }
      }

      expect(getStep(registrationSelector)(state)).toEqual(steps.PROVIDE_USERNAME)
    })

    it(`returns ${steps.PROVIDE_USERNAME} when username exists`, () => {
      state = {
        registration: {
          fieldAvailability: {
            ...emailLockedInState,
            userExistsByUsername: true
          }
        }
      }

      expect(getStep(registrationSelector)(state)).toEqual(steps.PROVIDE_USERNAME)
    })

    it(`returns ${steps.CHECKS_COMPLETE} when username DNE`, () => {
      state = {
        registration: {
          fieldAvailability: {
            ...emailLockedInState,
            userExistsByUsername: false
          }
        }
      }

      expect(getStep(registrationSelector)(state)).toEqual(steps.CHECKS_COMPLETE)
    })

    it(`returns ${steps.CHECKS_COMPLETE} when username check is disabled`, () => {
      state = {
        registration: {
          fieldAvailability: {
            ...emailLockedInState
          }
        }
      }

      expect(getStep(registrationSelector, { withUsername: false })(state)).toEqual(
        steps.CHECKS_COMPLETE
      )
    })
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
