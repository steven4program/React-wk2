import PropTypes from 'prop-types';

const DrinkItemRow = ({name, description, price}) => {
  return (
    <>
      <div className="list-group-item">
        <div className="d-flex w-100 justify-content-between">
          <h5 className="mb-1">{name}</h5>
          <small>${price}</small>
        </div>
        <div className="d-flex w-100 justify-content-between">
          <p className="mb-1">{description}</p>
          <a href="#"><i className="bi bi-cart-plus" style={{ fontSize: "1.25rem", color: "cornflowerblue" }}></i></a>
        </div>
      </div>
    </>
  );
};

DrinkItemRow.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  price: PropTypes.number
}

export default DrinkItemRow;