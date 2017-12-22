import { getFieldAvailability } from '../src/Selectors'

describe('Selectors', () => {
  let state

  let registrationSelector = state => state.registration

  describe('getFieldAvailability', () => {
    it('returns the field availability state given a registration selector and global state', () => {
      state = {
        registration: {
          fieldAvailability: { a: 1 }
        }
      }

      expect(getFieldAvailability(registrationSelector)(state)).toEqual({ a: 1 })
    })
  })

  describe('')
})