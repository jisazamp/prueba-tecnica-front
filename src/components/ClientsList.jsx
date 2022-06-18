import PropTypes from 'prop-types';

import Client from './Client';
import Header from './common/Header';

const ClientsList = ({ clients }) => {
  return (
    <div className='users-container'>
      {clients.map((e) => (
        <Client key={e.id} client={e} />
      ))}
    </div>
  );
};

ClientsList.propTypes = {
  users: PropTypes.array,
};

export default ClientsList;
