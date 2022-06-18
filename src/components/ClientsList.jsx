import { useState } from 'react';
import PropTypes from 'prop-types';

import Client from './Client';
import ClientForm from './ClientForm';

const ClientsList = ({ clients, onClientSubmit }) => {
  const [form, setForm] = useState(false);

  return (
    <div className='users-container'>
      {clients.map((e) => (
        <Client key={e.id} client={e} />
      ))}

      {!form && (
        <button onClick={() => setForm(true)} className='btn btn-primary'>
          Agregar cliente
        </button>
      )}

      {form && <ClientForm onClientSubmit={onClientSubmit} setForm={setForm} />}
    </div>
  );
};

ClientsList.propTypes = {
  users: PropTypes.array,
  onClientSubmit: PropTypes.func.isRequired,
};

export default ClientsList;
