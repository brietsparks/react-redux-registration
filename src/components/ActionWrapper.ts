import React from 'react'
import { connect, Dispatch } from 'react-redux'

import { RegistrationSelector } from '../types'
import { getStep, defaultRegistrationSelector } from '../selectors'
import {
  checkUserExistsByEmail,
  checkVerificationCode,
  checkUserExistsByUsername
} from '../actionCreators'
import { PROVIDE_EMAIL, PROVIDE_VERIFICATION_CODE, PROVIDE_USERNAME } from '../stepNames'

export interface ActionWrapperProps {
  email: String
  verificationCode: String
  username: String
  registrationSelector?: RegistrationSelector
  currentStep: String
  checkUserExistsByEmail: (email: String) => void
  checkVerificationCode: (email: String, verificationCode: String) => void
  checkUserExistsByUsername: (username: String) => void
  children: any
}

class ActionWrapper extends React.Component<ActionWrapperProps> {
  constructor(props: ActionWrapperProps) {
    super(props)

    this.doAction = this.doAction.bind(this)
  }

  doAction() {
    const {
      email,
      verificationCode,
      username,
      currentStep,
      checkUserExistsByEmail,
      checkVerificationCode,
      checkUserExistsByUsername
    } = this.props

    switch (currentStep) {
      case PROVIDE_EMAIL:
        checkUserExistsByEmail(email)
        break
      case PROVIDE_VERIFICATION_CODE:
        checkVerificationCode(email, verificationCode)
        break
      case PROVIDE_USERNAME:
        checkUserExistsByUsername(username)
        break
    }
  }

  render() {
    return this.props.children(this.doAction)
  }
}

const mapStateToProps = (state: any, ownProps: ActionWrapperProps) => {
  return {
    currentStep: getStep(ownProps.registrationSelector || defaultRegistrationSelector)(state)
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    checkUserExistsByEmail: (email: String) => dispatch(checkUserExistsByEmail(email)),
    checkVerificationCode: (email: String, verificationCode: String) =>
      dispatch(checkVerificationCode(email, verificationCode)),
    checkUserExistsByUsername: (username: String) => dispatch(checkUserExistsByUsername(username))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ActionWrapper)
