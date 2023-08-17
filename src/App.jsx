import { useState, useEffect } from 'react'
import rawData from "./assets/rawData.json"
import DrinkItemRow from "./components/DrinkItemRow"
import CartModal from './components/CartModal'

function App() {
  const [drinkData, setDrinkData] = useState([])
  const [cart, setCart] = useState([])
  const [total, setTotal] = useState(0)

  useEffect(() => {
    setDrinkData(rawData)
  }, [drinkData])

  const addToCart = (id) => {
    const itemExist = cart.find(item => item.id === id)

    if (itemExist) {
      const updatedCart = cart.map(item => 
        item.id === id 
        ? { ...item, qty: (item.qty || 1) + 1 }
        : item
      );
      setCart(updatedCart);
      setTotal(total + itemExist.price)
    } else {
      const itemToAdd = { ...drinkData.find(drink => drink.id === id), qty: 1 };
      setCart([...cart, itemToAdd]);
      setTotal(total + itemToAdd.price)
    }
  }

  return (
    <>
      <nav className="navbar bg-dark border-bottom border-body" data-bs-theme="dark">
        <div className="container-fluid col-md-6">
          <a className="navbar-brand" href="#">React Drink Shop</a>
          <button type="button" className="btn bg-dark btn-primary" data-bs-toggle="modal" data-bs-target="#cartModal" disabled={cart.length === 0}>
            <i className="bi bi-cart-fill"></i>
          </button>
        </div>
      </nav>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="list-group">
              {drinkData.map(drink => 
                <DrinkItemRow 
                  key={drink.id}
                  id={drink.id}
                  name={drink.name} 
                  description={drink.description} 
                  price={drink.price} 
                  onClick={addToCart}
                />)}
            </div>
          </div>
        </div>
      </div>

      <CartModal
        cart={cart}
        setCart={setCart}
        total={total}
        setTotal={setTotal}
      />
    </>
  )
}

export default App