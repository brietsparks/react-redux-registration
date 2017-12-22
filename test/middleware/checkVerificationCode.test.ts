import checkVerificationCode from '../../src/middleware/checkVerificationCode'
import {
  CHECK_VERIFICATION_CODE,
  VERIFICATION_CODE_MATCHES,
  VERIFICATION_CODE_MISMATCH,
  REGISTRATION_CHECK_ERROR
} from '../../src/actionTypes'
import { flushPromises } from '../util'

describe('checkEmailExists', () => {
  let store
  let next

  beforeEach(() => {
    store = { dispatch: jest.fn() }
    next = jest.fn()
  })

  describe(`intercepting ${CHECK_VERIFICATION_CODE}`, () => {
    it('calls the user-provided function', () => {
      const check = jest.fn(email => Promise.resolve(true))
      const middleware = checkVerificationCode(check)
      middleware(store)(next)({
        type: CHECK_VERIFICATION_CODE,
        payload: { email: 'a@a.a', verificationCode: 'abc123' }
      })
      expect(check.mock.calls.length).toBe(1)
    })

    it(`dispatches ${VERIFICATION_CODE_MATCHES} if the user-provided function resolves to true`, async () => {
      const check = jest.fn((email, verificationCode) => Promise.resolve(true))
      const middleware = checkVerificationCode(check)
      middleware(store)(next)({
        type: CHECK_VERIFICATION_CODE,
        payload: { email: 'a@a.a', verificationCode: 'abc123' }
      })

      await flushPromises()
      expect(store.dispatch).toBeCalledWith({ type: VERIFICATION_CODE_MATCHES })
    })

    it(`dispatches ${VERIFICATION_CODE_MISMATCH} if the user-provided function resolves to false`, async () => {
      const check = jest.fn(email => Promise.resolve(false))
      const middleware = checkVerificationCode(check)
      middleware(store)(next)({
        type: CHECK_VERIFICATION_CODE,
        payload: { email: 'a@a.a', verificationCode: 'abc123' }
      })

      await flushPromises()
      expect(store.dispatch).toBeCalledWith({ type: VERIFICATION_CODE_MISMATCH })
    })

    it(`dispatches ${REGISTRATION_CHECK_ERROR} if the user-provided function throws error`, async () => {
      const check = jest.fn(email => Promise.reject({ rejectionMessage: 'some message' }))
      const middleware = checkVerificationCode(check)
      middleware(store)(next)({
        type: CHECK_VERIFICATION_CODE,
        payload: { email: 'a@a.a', verificationCode: 'abc123' }
      })

      await flushPromises()
      expect(store.dispatch).toBeCalledWith({
        type: REGISTRATION_CHECK_ERROR,
        payload: {
          onType: CHECK_VERIFICATION_CODE,
          error: { rejectionMessage: 'some message' }
        }
      })
    })
  })
})
