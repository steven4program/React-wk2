import PropTypes from 'prop-types';

function CartModal({cart, setCart, total, setTotal, note, setNote, setOrder, wordData, language}) {
  const removeFromCart = (id) => {
    const itemToRemove = cart.find(item => item.id === id);
    const updatedCart = cart.filter(item => item.id !== id);
    setCart(updatedCart);
    setTotal(total - itemToRemove.price * itemToRemove.qty);
  }

  const increaseQty = (id) => {
    const itemToIncrease = cart.find(item => item.id === id);
    const updatedCart = cart.map(item =>
      item.id === id
      ? { ...item, qty: item.qty + 1 }
      : item
    );
    setCart(updatedCart);
    setTotal(total + itemToIncrease.price);
  }

  const decreaseQty = (id) => {
    const itemToDecrease = cart.find(item => item.id === id);
    if (itemToDecrease.qty > 1) {
      const updatedCart = cart.map(item =>
        item.id === id
        ? { ...item, qty: item.qty - 1 }
        : item
      );
      setCart(updatedCart);
      setTotal(total - itemToDecrease.price);
    } else {
      removeFromCart(id);
    }
  }

  const handleOrderSubmission = (event) => {
    event.stopPropagation()
    if (cart.length === 0) {
      alert(wordData.emptyCart[language]);
      return;
    }

    const date = new Date();
    const formattedDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`;

    const updatedOrder = {
      items: cart,
      total,
      note,
      createdAt: formattedDate
    }

    setOrder(prevOrder => [...prevOrder, updatedOrder]);
    setNote('');
    setCart([]);
    setTotal(0);
    alert(wordData.orderSuccess[language]);
  }

  return (
    <div className="modal fade" id="cartModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">{wordData.shoppingCart[language]}</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col" width="50">{wordData.delete[language]}</th>
                  <th scope="col">{wordData.drink[language]}</th>
                  <th scope="col">{wordData.description[language]}</th>
                  <th scope="col" width="130">{wordData.quantity[language]}</th>
                  <th scope="col">{wordData.price[language]}</th>
                  <th scope="col">{wordData.sum[language]}</th>
                </tr>
              </thead>
              <tbody>
                {cart.map(drink =>
                  <tr key={drink.id}>
                    <td>
                      <button type="button" className="btn btn-danger" onClick={() => removeFromCart(drink.id)}>
                        <i className="bi bi-trash-fill"></i>
                      </button>
                    </td>
                    <td>{drink.name}</td>
                    <td>{drink.description}</td>
                    <td>
                      <button type="button" className="btn btn-outline-primary btn-sm" onClick={() => decreaseQty(drink.id)}>
                        <i className="bi bi-dash"></i>
                      </button>
                      <span className="mx-2">{drink.qty}</span>
                      <button type="button" className="btn btn-outline-primary btn-sm" onClick={() => increaseQty(drink.id)}>
                        <i className="bi bi-plus"></i>
                      </button>
                    </td>
                    <td>{drink.price}</td>
                    <td>{drink.price * drink.qty}</td>
                  </tr>
                )}
              </tbody>
            </table>
            <div className="d-flex justify-content-end">
              <h4>{wordData.total[language]}: ${total}</h4>
            </div>
            <textarea 
              name="note" 
              id="note" 
              cols="90" 
              rows="4" 
              value={note} 
              placeholder={wordData.note[language]} 
              width="500" 
              onChange={e => setNote(e.target.value)}
            ></textarea>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">{wordData.close[language]}</button>
            <button 
              type="button" 
              className="btn btn-primary" 
              data-bs-dismiss="modal" 
              onClick={handleOrderSubmission}>
                {wordData.checkout[language]}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

CartModal.propTypes = {
  cart: PropTypes.array,
  setCart: PropTypes.func,
  total: PropTypes.number,
  setTotal: PropTypes.func,
  note: PropTypes.string,
  setNote: PropTypes.func,
  setOrder: PropTypes.func,
  wordData: PropTypes.object,
  language: PropTypes.string
}

export default CartModal;