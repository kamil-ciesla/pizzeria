import db from './db'

import { getDoc, doc, setDoc } from 'firebase/firestore'

async function getPizzaTypes() {
  const docRef = doc(db, 'pizzaTypes', 'j5FkFvqxaJTDp0sCtJ31')
  const docSnap = await getDoc(docRef)
  const pizzaTypes = docSnap.data()
  return pizzaTypes
}

export async function sendOrder() {
  await setDoc(doc(db, 'orders', '123456'), {
    testOrderKey: 'testOrderValue',
  })
}

export default getPizzaTypes
