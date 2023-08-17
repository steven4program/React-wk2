import { useState, useEffect } from 'react'
import rawData from "./assets/rawData.json"
import DrinkItemRow from "./components/DrinkItemRow"

function App() {
  const [drinkData, setDrinkData] = useState([])
  const [cart, setCart] = useState([])
  const [total, setTotal] = useState(0)

  useEffect(() => {
    setDrinkData(rawData)
  }, [drinkData])

  return (
    <>
      <nav className="navbar bg-dark border-bottom border-body" data-bs-theme="dark">
        <div className="container-fluid col-md-6">
          <a className="navbar-brand" href="#">React Drink Shop</a>
          <button className="bg-dark" type="button">
            <i className="bi bi-cart-fill"></i>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <a className="nav-link active" aria-current="page" href="#">Home</a>
              <a className="nav-link" href="#">Features</a>
              <a className="nav-link" href="#">Pricing</a>
              <a className="nav-link disabled" aria-disabled="true">Disabled</a>
            </div>
          </div>
        </div>
      </nav>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="list-group">
              {drinkData.map(drink => <DrinkItemRow key={drink.id} name={drink.name} description={drink.description} price={drink.price} />)}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App