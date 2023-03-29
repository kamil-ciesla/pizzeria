import React from 'react'
import sendOrder from '../api/pizzeria'

function Form() {
  sendOrder()

  return <div className="Form"></div>
}

export default Form
