import PropTypes from 'prop-types';

import Store from './Store';

const StoresList = ({ stores }) => {
  return (
    <div className='content-container'>
      {stores.map((s) => (
        <Store key={s.id} store={s} />
      ))}
    </div>
  );
};

StoresList.propTypes = {
  stores: PropTypes.array,
};

export default StoresList;
