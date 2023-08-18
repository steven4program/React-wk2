import PropTypes from 'prop-types';

const OrderItems = ({eachOrder}) => {
  return (
    <>
      {eachOrder.items.map((item, index) => (
        <tr key={index}>
          <td>{item.name}</td>
          <td>{item.qty}</td>
          <td>${item.price}</td>
        </tr>
      ))}
    </>
  ) 
}

export default function OrderHistory({order, language, wordData }) {
  return (
    <>
      {[...order].reverse().map((eachOrder, index) => (
        <div className="card mb-3" key={index}>
          <div className="card-body">
            <h4>{wordData.order[language]} {order.length -index}</h4>
            <div className="card-title">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">{wordData.drink[language]}</th>
                    <th scope="col">{wordData.quantity[language]}</th>
                    <th scope="col">{wordData.sum[language]}</th>
                  </tr>
                </thead>
                <tbody>
                  <OrderItems eachOrder={eachOrder} />
                </tbody>
              </table>
              <div className="text-start">{wordData.note[language]}: <span>{eachOrder.note}</span></div>
              <div className="text-end">
                <h5>{wordData.total[language]}: <span>${eachOrder.total}</span></h5>
                <p className="fw-light fst-italic">{wordData.createdAt[language]}: {eachOrder.createdAt}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

OrderItems.propTypes = {
  eachOrder: PropTypes.array
}

OrderHistory.propTypes = {
  order: PropTypes.array,
  language: PropTypes.string,
  wordData: PropTypes.object
}

