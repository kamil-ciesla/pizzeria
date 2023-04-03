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
      <h2>Menu</h2>
      {Object.keys(pizzaTypes).map((item, i) => (
        <p key={i}>

          <table class="table table-dark">
          <thead>
            <tr>
              <th scope="col">{item}</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">{pizzaTypes[item].ingredients.join(', ')}</th>
              <th scope="row" class="row justify-content-end">{pizzaTypes[item].price} PLN</th>
            </tr>
          </tbody>
        </table>
        
        </p>
      ))}
    </div>
  )
}

export default ProductList
