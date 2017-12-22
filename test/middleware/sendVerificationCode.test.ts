import sendVerificationCode from '../../src/middleware/sendVerificationCode'
import {
  SEND_VERIFICATION_CODE,
  VERIFICATION_CODE_SEND_OK,
  VERIFICATION_CODE_NOT_SENT,
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

  describe(`intercepting ${SEND_VERIFICATION_CODE}`, () => {
    it('calls the user-provided function', () => {
      const check = jest.fn(email => Promise.resolve(true))
      const middleware = sendVerificationCode(check)
      middleware(store)(next)({ type: SEND_VERIFICATION_CODE, payload: 'a@a.a' })
      expect(check.mock.calls.length).toBe(1)
    })

    it(`dispatches ${VERIFICATION_CODE_SEND_OK} if the user-provided function resolves to true`, async () => {
      const check = jest.fn(email => Promise.resolve(true))
      const middleware = sendVerificationCode(check)
      middleware(store)(next)({ type: SEND_VERIFICATION_CODE, payload: 'a@a.a' })

      await flushPromises()
      expect(store.dispatch).toBeCalledWith({ type: VERIFICATION_CODE_SEND_OK })
    })

    it(`dispatches ${VERIFICATION_CODE_NOT_SENT} if the user-provided function resolves to false`, async () => {
      const check = jest.fn(email => Promise.resolve(false))
      const middleware = sendVerificationCode(check)
      middleware(store)(next)({ type: SEND_VERIFICATION_CODE, payload: 'a@a.a' })

      await flushPromises()
      expect(store.dispatch).toBeCalledWith({ type: VERIFICATION_CODE_NOT_SENT })
    })

    it(`dispatches ${REGISTRATION_CHECK_ERROR} if the user-provided function throws error`, async () => {
      const check = jest.fn(email => Promise.reject({ rejectionMessage: 'some message' }))
      const middleware = sendVerificationCode(check)
      middleware(store)(next)({ type: SEND_VERIFICATION_CODE, payload: 'a@a.a' })

      await flushPromises()
      expect(store.dispatch).toBeCalledWith({
        type: REGISTRATION_CHECK_ERROR,
        payload: {
          onType: SEND_VERIFICATION_CODE,
          error: { rejectionMessage: 'some message' }
        }
      })
    })
  })
})
