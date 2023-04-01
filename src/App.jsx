import React from 'react'
import './App.css'
import MyForm from './components/Form'
import ProductList from './components/ProductList'
import Logo from './components/Logo'

function App() {
  return (
    <>
      <header
        className="bg-dark d-flex flex-column align-items-center"
        style={{ minHeight: '75vh' }}
      >
        <Logo />
        <ProductList />
      </header>
      <div className="container my-4">
        <MyForm />
      </div>
    </>
  )
}

export default App
