import { Action, RegistrationState } from '../types'
import fieldAvailabilityReducer from './fieldAvailabilityReducer'
import fieldCheckReducer from './fieldCheckReducer'

export default (state: any, action: Action): RegistrationState => {
  return {
    fieldAvailability: fieldAvailabilityReducer(state, action),
    fieldCheck: fieldCheckReducer(state, action)
  }
}
