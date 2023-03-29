import db from "./db";

import { getDoc, doc } from "firebase/firestore";

async function getPizzaTypes() {
  const docRef = doc(db, "pizzaTypes", "j5FkFvqxaJTDp0sCtJ31");
  const docSnap = await getDoc(docRef);
  const pizzaTypes = docSnap.data();
  return pizzaTypes;
}

export default getPizzaTypes;
