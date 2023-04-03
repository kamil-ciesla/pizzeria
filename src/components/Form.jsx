import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { v4 as uuidv4 } from 'uuid'
import * as Yup from 'yup'

// import { sendOrder } from '../api/pizzeria'

const DRINK_NAMES = [
  'Spring water',
  'Sparkling water',
  'Orange juice',
  'Coffee',
  'Tea',
  'Beer',
]

const PIZZA_TYPES = ['Margherita', 'Pepperoni', 'Hawaiian', 'Veggie']
const PIZZA_SIZES = [25, 30, 45]
const DRINK_VOLUMES = [250, 500, 1000]

const validationSchema = Yup.object().shape({
  pizzas: Yup.object().shape({
    extras: Yup.array().of(Yup.string()),
    isOnThickCrust: Yup.boolean(),
    sizeInCms: Yup.number().oneOf(PIZZA_SIZES, 'Invalid pizza size'),
    type: Yup.string()
      .oneOf(PIZZA_TYPES, 'Invalid pizza type')
      .required('Please select pizza type'),
  }),
  orders: Yup.object().shape({
    takeaway: Yup.boolean(),
    tip: Yup.number().min(0, 'Tip must be greater than or equal to zero'),
  }),
  drinks: Yup.object().shape({
    name: Yup.string(),
    volumeInMl: Yup.number(),
  }),
})

const initialValues = {
  pizzas: {
    type: '',
    extras: [],
    isOnThickCrust: false,
    sizeInCms: PIZZA_SIZES[1],
  },
  orders: {
    takeaway: true,
    tip: 5,
  },
  drinks: {
    name: '',
    volumeInMl: DRINK_VOLUMES[1],
  },
}

function MyForm() {
  const [extras, setExtras] = useState([])
  const [extra, setExtra] = useState('')

  const handleSubmit = (values, { setSubmitting }) => {
    console.log(values)
    values.pizzas.extras = extras.map((json) => json.value)
    values.pizzas.sizeInCms = Number(values.pizzas.sizeInCms)
    values.drinks.volumeInMl = Number(values.drinks.volumeInMl)
    setSubmitting(false)
    console.log(values)
    // const order = {
    //   testOrderKey: 'testOrderValue',
    // }
    //console.log(sendOrder(order))
  }

  const handleExtraChange = (event) => {
    setExtra(event.target.value)
  }

  const handleAddExtra = () => {
    setExtras((prevExtras) =>
      extra ? [...prevExtras, { id: uuidv4(), value: extra }] : prevExtras,
    )
    setExtra('')
  }

  const handleRemoveExtra = (id) => {
    setExtras((prevExtras) => prevExtras.filter((ex) => ex.id !== id))
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
    }
  }

  const displayPizzaSizes = (sizes) => {
    const sizeNames = ['Small', 'Medium', 'Large']

    if (sizes.length !== 3) {
      throw new Error('Array length must be 3.')
    }

    return sizes.reduce((acc, key, index) => {
      acc[key] = sizeNames[index]
      return acc
    }, {})
  }

  return (
    <div>
      <h1 className="text-center">Place an order</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, handleBlur, isSubmitting }) => (
          <Form onKeyDown={handleKeyDown}>
            <hr className="my-4" />
            <h2>Pizza</h2>
            <div className="form-group">
              <label className="form-label">Type:</label>
              <Field
                as="select"
                name="pizzas.type"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.pizzas.type}
                className="form-select"
                aria-label="Pizza type"
              >
                <option value="">Select a pizza type</option>
                {PIZZA_TYPES.map((type) => (
                  <option key={`pizza-type-${type}`} value={type}>
                    {type}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="pizzas.type"
                component="div"
                className="form-text text-danger"
              />
            </div>
            <div className="form-row mb-3">
              <label className="form-label">Size:</label>
              <Field
                as="select"
                name="pizzas.sizeInCms"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.pizzas.sizeInCms}
                className="form-select"
                aria-label="Pizza size"
              >
                {Object.entries(displayPizzaSizes(PIZZA_SIZES)).map(
                  ([size, sizeName]) => (
                    <option key={`pizza-size-${size}`} value={size}>
                      {`${sizeName} (${size} cm)`}
                    </option>
                  ),
                )}
              </Field>
              <ErrorMessage
                name="pizzas.sizeInCms"
                component="div"
                className="form-text text-danger"
              />
            </div>
            <div className="form-row mb-3">
              <label className="form-label">Is on thick crust:</label>
              <Field
                type="checkbox"
                name="pizzas.isOnThickCrust"
                onChange={handleChange}
                onBlur={handleBlur}
                checked={values.pizzas.isOnThickCrust}
                className="form-check-input ms-2"
              />
              <ErrorMessage
                name="pizzas.isOnThickCrust"
                component="div"
                className="form-text text-danger"
              />
            </div>
            <div className="form-row mb-3">
              <label className="form-label">Extras:</label>
              <Field
                type="text"
                name="extra"
                onChange={handleExtraChange}
                value={extra}
                className="form-control"
              />
              <button
                className="btn btn-primary my-3"
                type="button"
                onClick={handleAddExtra}
              >
                Add
              </button>
              {extras.map((extra) => (
                <div
                  key={extra.id}
                  className="alert alert-secondary d-flex justify-content-between align-items-center"
                >
                  <span className="pr-3">{extra.value}</span>
                  <button
                    className="d-inline-block btn btn-danger btn-sm"
                    type="button"
                    onClick={() => handleRemoveExtra(extra.id)}
                  >
                    X
                  </button>
                </div>
              ))}
              <ErrorMessage
                name="pizzas.extras"
                component="div"
                className="form-text text-danger"
              />
            </div>
            <ul id="pizzaExtrasList"></ul>
            <h2>Drink</h2>
            <div className="form-row mb-3">
              <label className="form-label">Name:</label>
              <Field
                as="select"
                name="drinks.name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.drinks.name}
                className="form-select"
                aria-label="Drink name"
              >
                <option value="">None</option>
                {DRINK_NAMES.map((name) => (
                  <option key={`drink-name-${name}`} value={name}>
                    {name}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="drinks.name"
                component="div"
                className="form-text text-danger"
              />
            </div>
            <div className="form-row mb-3">
              <label className="form-label">Volume in ml:</label>
              <Field
                as="select"
                name="drinks.volumeInMl"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.drinks.volumeInMl}
                className="form-select"
                aria-label="Drink volume"
              >
                {DRINK_VOLUMES.map((volume) => (
                  <option key={`drink-volume-${volume}`} value={volume}>
                    {`${volume} ml`}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="drinks.volumeInMl"
                component="div"
                className="form-text text-danger"
              />
            </div>
            <h2>Your order</h2>
            <div className="form-row mb-3">
              <label className="form-label">Takeaway:</label>
              <Field
                type="checkbox"
                name="orders.takeaway"
                onChange={handleChange}
                onBlur={handleBlur}
                checked={values.orders.takeaway}
                className="form-check-input ms-2"
              />
            </div>
            <div className="form-row mb-3">
              <label className="form-label">Tip (PLN):</label>
              <Field
                type="number"
                name="orders.tip"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.orders.tip}
                className="form-control"
              />
              <ErrorMessage
                name="orders.tip"
                component="div"
                className="form-text text-danger"
              />
            </div>
            <button
              type="submit"
              className="btn btn-success"
              disabled={isSubmitting}
            >
              Order
            </button>
          </Form>
        )}
      </Formik>
    </div>
    //   </div>
    // </div>
  )
}

export default MyForm
