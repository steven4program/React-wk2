import PropTypes from 'prop-types';

export default function DrinkItemRow ({id, name, description, price, onClick}) {
  return (
    <>
      <div className="list-group-item">
        <div className="d-flex w-100 justify-content-between">
          <h5 className="mb-1">{name}</h5>
          <small>${price}</small>
        </div>
        <div className="d-flex w-100 justify-content-between">
          <p className="mb-1">{description}</p>
          <button type="button" className="btn btn-outline-primary" onClick={() => onClick(id)}>
            <i className="bi bi-cart-plus"></i>
          </button>
        </div>
      </div>
    </>
  );
}

DrinkItemRow.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  description: PropTypes.string,
  price: PropTypes.number,
  onClick: PropTypes.func
}
