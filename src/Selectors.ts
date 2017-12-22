import { SelectorsArgs, RegistrationState, FieldAvailabilityState } from './types'

export class Selectors {
  getSubstate: (state: any) => RegistrationState

  constructor(args: SelectorsArgs) {
    this.getSubstate = args.registrationSelector
  }

  getFieldAvailability(state: any) {
    return this.getSubstate(state).fieldAvailability
  }
}

export default Selectors
