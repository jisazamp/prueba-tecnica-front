import PropTypes from 'prop-types';

const Client = ({ client, onChocolateFeast }) => {
  return (
    <div
      onClick={() => onChocolateFeast(client.id)}
    >{`${client.name}, $${client.budget}`}</div>
  );
};

Client.propTypes = {
  client: PropTypes.object,
};

export default Client;
