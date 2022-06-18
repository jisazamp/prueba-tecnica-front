import PropTypes from 'prop-types';

const Store = ({ store }) => {
  return <div>{store.name}</div>;
};

Store.propTypes = {
  store: PropTypes.object,
};

export default Store;
