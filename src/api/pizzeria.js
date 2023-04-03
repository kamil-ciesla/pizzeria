import db from './db'

import { getDoc, doc, setDoc } from 'firebase/firestore'

export async function getPizzaTypes() {
  const docRef = doc(db, 'pizzaTypes', 'j5FkFvqxaJTDp0sCtJ31')
  const docSnap = await getDoc(docRef)
  const pizzaTypes = docSnap.data()
  return pizzaTypes
}

export async function sendOrder(orderObject) {
  console.log('start sending order')
  const id = String(Math.floor(Math.random() * 9999999))
  await setDoc(doc(db, 'orders', id), orderObject)
  console.log('end sending order')
}
