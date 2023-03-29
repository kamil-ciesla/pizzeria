import React from 'react'
import { sendOrder } from '../api/pizzeria'

function Form() {
  const order = {
    testOrderKey: 'testOrderValue',
  }
  //console.log(sendOrder(order))

  return <div className="Form"></div>
}

export default Form
