import React from 'react'

import './App.css'
import Form from './components/Form'
import ProductList from './components/ProductList'
import Logo from './components/Logo'

function App() {
  return (
    <div className="App">
      <Logo></Logo>
      <ProductList></ProductList>
      <Form></Form>
    </div>
  )
}

export default App
