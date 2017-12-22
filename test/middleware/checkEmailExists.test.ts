import checkEmailExists from '../../src/middleware/checkEmailExists'
import {
  CHECK_EMAIL_EXISTS,
  EMAIL_EXISTS,
  SEND_VERIFICATION_CODE,
  EMAIL_DNE,
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

  describe(`intercepting ${CHECK_EMAIL_EXISTS}`, () => {
    it('calls the user-provided function', () => {
      const check = jest.fn(email => Promise.resolve(true))
      const middleware = checkEmailExists(check)
      middleware(store)(next)({ type: CHECK_EMAIL_EXISTS, payload: 'a@a.a' })
      expect(check.mock.calls.length).toBe(1)
    })

    it(`dispatches ${EMAIL_EXISTS} if the user-provided function resolves to true`, async () => {
      const check = jest.fn(email => Promise.resolve(true))
      const middleware = checkEmailExists(check)
      middleware(store)(next)({ type: CHECK_EMAIL_EXISTS, payload: 'a@a.a' })

      await flushPromises()
      expect(store.dispatch).toBeCalledWith({ type: EMAIL_EXISTS })
    })

    it(`dispatches ${SEND_VERIFICATION_CODE} if the user-provided function resolves to false`, async () => {
      const check = jest.fn(email => Promise.resolve(true))
      const middleware = checkEmailExists(check)
      middleware(store)(next)({ type: CHECK_EMAIL_EXISTS, payload: 'a@a.a' })

      await flushPromises()
      expect(store.dispatch).toBeCalledWith({ type: SEND_VERIFICATION_CODE, payload: 'a@a.a' })
    })

    it(`dispatches ${EMAIL_DNE} if the user-provided function resolves to false`, async () => {
      const check = jest.fn(email => Promise.resolve(false))
      const middleware = checkEmailExists(check)
      middleware(store)(next)({ type: CHECK_EMAIL_EXISTS, payload: 'a@a.a' })

      await flushPromises()
      expect(store.dispatch).toBeCalledWith({ type: EMAIL_DNE })
    })

    it(`dispatches ${REGISTRATION_CHECK_ERROR} if the user-provided function throws error`, async () => {
      const check = jest.fn(email => Promise.reject({ rejectionMessage: 'some message' }))
      const middleware = checkEmailExists(check)
      middleware(store)(next)({ type: CHECK_EMAIL_EXISTS, payload: 'a@a.a' })

      await flushPromises()
      expect(store.dispatch).toBeCalledWith({
        type: REGISTRATION_CHECK_ERROR,
        payload: {
          onType: CHECK_EMAIL_EXISTS,
          error: { rejectionMessage: 'some message' }
        }
      })
    })
  })
})
