import React from 'react'
import { connect } from 'react-redux'

import { RegistrationSelector } from '../types'
import { getStep, fieldIsActive, defaultRegistrationSelector } from '../selectors'

export interface InputWrapperProps {
  asRenderCallback: Boolean
  field: String
  registrationSelector: RegistrationSelector
  currentStep: String
  isActive: Boolean
  children?: any
}

class InputWrapper extends React.Component<InputWrapperProps> {
  public static defaultProps: Partial<InputWrapperProps> = {
    asRenderCallback: false
  }

  render() {
    const { asRenderCallback, children, currentStep, isActive } = this.props

    return asRenderCallback ? children({ currentStep, isActive }) : isActive ? children : null
  }
}

const mapStateToProps = (state: any, ownProps: InputWrapperProps): Partial<InputWrapperProps> => {
  const { field } = ownProps

  const currentStep = getStep(ownProps.registrationSelector || defaultRegistrationSelector)(state)

  return {
    currentStep,
    isActive: fieldIsActive(field, currentStep)
  }
}

export default connect(mapStateToProps, d => ({}))(InputWrapper)
