import PropTypes from 'prop-types';

export default function CartModal({cart, setCart, total, setTotal}) {
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

  return (
    <div className="modal fade" id="cartModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">購物車</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col" width="50">刪除</th>
                  <th scope="col">品項</th>
                  <th scope="col">描述</th>
                  <th scope="col" width="130">數量</th>
                  <th scope="col">單價</th>
                  <th scope="col">小計</th>
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
              <h4>總計：{total}</h4>
            </div>
            <textarea name="note" id="note" cols="90" rows="10" placeholder="備註" width="500"></textarea>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">關閉</button>
            <button type="button" className="btn btn-primary">送出</button>
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
}
