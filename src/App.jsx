import { useState, useEffect } from 'react'
import "./index.css"
import wordData from "./assets/wordData.json"
import rawDataEn from "./assets/rawDataEn.json"
import rawDataTC from "./assets/rawDataTC.json"
import rawDataJp from "./assets/rawDataJp.json"
import DrinkItemRow from "./components/DrinkItemRow"
import CartModal from './components/CartModal'
import OrderHistory from './components/OrderHistory'

function App() {
  const [drinkData, setDrinkData] = useState([])
  const [cart, setCart] = useState([])
  const [total, setTotal] = useState(0)
  const [order, setOrder] = useState([])
  const [note, setNote] = useState('')
  const [language, setLanguage] = useState('en')

  useEffect(() => {
    setCart([]);
    setTotal(0);
    setNote('');

    switch(language) {
      case 'tc':
        setDrinkData(rawDataTC)
        break;
      case 'jp':
        setDrinkData(rawDataJp)
        break;
      default:
        setDrinkData(rawDataEn)
    }
  }, [drinkData, language])

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
          <a className="navbar-brand" href="#">{wordData.shopName[language]}</a>
          <div className="d-flex">
            <select 
              className="form-select me-2"
              value={language}
              onChange={e => setLanguage(e.target.value)}
            >
              <option value="en">English</option>
              <option value="jp">日本語</option>
              <option value="tc">中文</option>
            </select>
            <button type="button" className="btn bg-dark btn-primary" data-bs-toggle="modal" data-bs-target="#cartModal" disabled={cart.length === 0}>
              <i className="bi bi-cart-fill"></i>
            </button>
          </div>
        </div>
      </nav>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className={order.length > 0 ? "col-md-6" : "col-md-8"}>
            <h3 className="mb-3">{wordData.menu[language]}</h3>
            <div className="list-group">
              {drinkData.map(drink => 
                <DrinkItemRow 
                  key={drink.id}
                  id={drink.id}
                  name={drink.name} 
                  description={drink.description} 
                  price={drink.price} 
                  onClick={addToCart}
                  wordData={wordData}
                  language={language}
                />)}
            </div>
          </div>
          {order.length > 0 &&
            <div className="col-md-4">
              <h3 className="mb-3">{wordData.orderHistory[language]}</h3>
              <OrderHistory order={order} language={language} wordData={wordData} />
            </div>
          }
        </div>
      </div>

      <CartModal
        cart={cart}
        setCart={setCart}
        total={total}
        setTotal={setTotal}
        note={note}
        setNote={setNote}
        setOrder={setOrder}
        wordData={wordData}
        language={language}
      />
    </>
  )
}

export default App