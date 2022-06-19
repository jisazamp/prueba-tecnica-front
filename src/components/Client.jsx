import PropTypes from 'prop-types';

const Client = ({ client, onChocolateFeast }) => {
  return (
    <div
      className='client-container'
      onClick={() => onChocolateFeast(client.id)}
    >
      <p className='client__info'>{`${client.name}, $${client.budget}`}</p>
      <button className='btn btn-secondary'>Editar</button>
    </div>
  );
};

Client.propTypes = {
  client: PropTypes.object,
};

export default Client;
