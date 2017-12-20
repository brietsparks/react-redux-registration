import checkUserExistsByEmail from '../../src/middleware/checkUserExistsByEmail'
import {
  CHECK_USER_EXISTS_BY_EMAIL,
  USER_EXISTS_BY_EMAIL,
  CHECK_EMAIL_EXISTS,
  USER_DNE_BY_EMAIL,
  REGISTRATION_CHECK_ERROR
} from '../../src/actionTypes'
import { flushPromises } from '../util'

describe('checkUserExistsByEmail middleware', () => {
  let store
  let next

  beforeEach(() => {
    store = { dispatch: jest.fn() }
    next = jest.fn()
  })

  describe(`intercepting ${CHECK_USER_EXISTS_BY_EMAIL}`, () => {
    it('calls the user-provided function', () => {
      const check = jest.fn(email => Promise.resolve(true))
      const middleware = checkUserExistsByEmail(check)
      middleware(store)(next)({ type: CHECK_USER_EXISTS_BY_EMAIL, payload: 'a@a.a' })
      expect(check.mock.calls.length).toBe(1)
    })

    it(`dispatches ${USER_EXISTS_BY_EMAIL} if the user-provided function resolves to true`, async () => {
      const check = jest.fn(email => Promise.resolve(true))
      const middleware = checkUserExistsByEmail(check)
      middleware(store)(next)({ type: CHECK_USER_EXISTS_BY_EMAIL, payload: 'a@a.a' })

      await flushPromises()
      expect(store.dispatch).toBeCalledWith({ type: USER_EXISTS_BY_EMAIL })
    })

    it(`dispatches ${USER_DNE_BY_EMAIL} if the user-provided function resolves to false`, async () => {
      const check = jest.fn(email => Promise.resolve(false))
      const middleware = checkUserExistsByEmail(check)
      middleware(store)(next)({ type: CHECK_USER_EXISTS_BY_EMAIL, payload: 'a@a.a' })

      await flushPromises()
      expect(store.dispatch).toBeCalledWith({ type: USER_DNE_BY_EMAIL })
    })

    it(`dispatches ${CHECK_EMAIL_EXISTS} if the user-provided function resolves to false`, async () => {
      const check = jest.fn(email => Promise.resolve(false))
      const middleware = checkUserExistsByEmail(check)
      middleware(store)(next)({ type: CHECK_USER_EXISTS_BY_EMAIL, payload: 'a@a.a' })

      await flushPromises()
      expect(store.dispatch).toBeCalledWith({ type: CHECK_EMAIL_EXISTS, payload: 'a@a.a' })
    })

    it(`dispatches ${REGISTRATION_CHECK_ERROR} if the user-provided function throws error`, async () => {
      const check = jest.fn(email => Promise.reject({ rejectionMessage: 'some message' }))
      const middleware = checkUserExistsByEmail(check)
      middleware(store)(next)({ type: CHECK_USER_EXISTS_BY_EMAIL, payload: 'a@a.a' })

      await flushPromises()
      expect(store.dispatch).toBeCalledWith({
        type: REGISTRATION_CHECK_ERROR,
        payload: {
          onType: CHECK_USER_EXISTS_BY_EMAIL,
          error: { rejectionMessage: 'some message' }
        }
      })
    })
  })

  it(`does not intercept non ${CHECK_USER_EXISTS_BY_EMAIL}`, () => {
    const check = jest.fn()
    const middleware = checkUserExistsByEmail(check)
    middleware(store)(next)({ type: 'ANOTHER_ACTION', payload: 'a@a.a' })
    expect(check.mock.calls.length).toBe(0)
  })
})
