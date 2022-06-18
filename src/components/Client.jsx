import PropTypes from 'prop-types';

const Client = ({ client }) => {
  return <div>{client.name}</div>;
};

Client.propTypes = {
  client: PropTypes.object,
};

export default Client;
