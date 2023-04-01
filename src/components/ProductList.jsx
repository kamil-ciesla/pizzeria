import React from 'react'
import './ProductList.css'
import { getPizzaTypes } from '../api/pizzeria.js'
import { useCallback, useEffect, useState } from 'react'

function ProductList() {
  const [pizzaTypes, setPizzaTypes] = useState({})

  // declare the async data fetching function
  const fetchData = useCallback(async () => {
    const data = await getPizzaTypes()
    setPizzaTypes(data)
  }, [])

  // the useEffect is only there to call `fetchData` at the right time
  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <div className="ProductList bg-dark m-5">
      <h2>Menu:</h2>
      {Object.keys(pizzaTypes).map((item, i) => (
        <p key={i}>
          {item} ({pizzaTypes[item].price}PLN):{' '}
          {pizzaTypes[item].ingredients.join(', ')}
        </p>
      ))}
    </div>
  )
}

export default ProductList
