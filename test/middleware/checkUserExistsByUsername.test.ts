import checkUserExistsByUsername from '../../src/middleware/checkUserExistsByUsername'
import {
  CHECK_USER_EXISTS_BY_USERNAME,
  USER_EXISTS_BY_USERNAME,
  USER_DNE_BY_USERNAME,
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

  describe(`intercepting ${CHECK_USER_EXISTS_BY_USERNAME}`, () => {
    it('calls the user-provided function', () => {
      const check = jest.fn(email => Promise.resolve(true))
      const middleware = checkUserExistsByUsername(check)
      middleware(store)(next)({ type: CHECK_USER_EXISTS_BY_USERNAME, payload: 'a@a.a' })
      expect(check.mock.calls.length).toBe(1)
    })

    it(`dispatches ${USER_EXISTS_BY_USERNAME} if the user-provided function resolves to true`, async () => {
      const check = jest.fn(email => Promise.resolve(true))
      const middleware = checkUserExistsByUsername(check)
      middleware(store)(next)({ type: CHECK_USER_EXISTS_BY_USERNAME, payload: 'a@a.a' })

      await flushPromises()
      expect(store.dispatch).toBeCalledWith({ type: USER_EXISTS_BY_USERNAME })
    })

    it(`dispatches ${USER_DNE_BY_USERNAME} if the user-provided function resolves to false`, async () => {
      const check = jest.fn(email => Promise.resolve(false))
      const middleware = checkUserExistsByUsername(check)
      middleware(store)(next)({ type: CHECK_USER_EXISTS_BY_USERNAME, payload: 'a@a.a' })

      await flushPromises()
      expect(store.dispatch).toBeCalledWith({ type: USER_DNE_BY_USERNAME })
    })

    it(`dispatches ${REGISTRATION_CHECK_ERROR} if the user-provided function throws error`, async () => {
      const check = jest.fn(email => Promise.reject({ rejectionMessage: 'some message' }))
      const middleware = checkUserExistsByUsername(check)
      middleware(store)(next)({ type: CHECK_USER_EXISTS_BY_USERNAME, payload: 'a@a.a' })

      await flushPromises()
      expect(store.dispatch).toBeCalledWith({
        type: REGISTRATION_CHECK_ERROR,
        payload: {
          onType: CHECK_USER_EXISTS_BY_USERNAME,
          error: { rejectionMessage: 'some message' }
        }
      })
    })
  })
})
