import { useState } from 'react';

const ClientForm = ({ editClient, setForm, onClientSubmit }) => {
  const [client, setClient] = useState({ name: '', budget: '' });

  const handleClientSubmit = (e) => {
    e.preventDefault();

    if ([client.name, client.budget].includes('')) {
      console.error('Todos los campos son obligatorios');
      return;
    }

    onClientSubmit(client);
    setForm(false);
  };

  const handleClientChange = (e) =>
    setClient({ ...client, [e.target.name]: e.target.value });

  return (
    <div>
      <form onSubmit={handleClientSubmit} className='form-container'>
        <div className='form-group'>
          <label htmlFor='name'>Nombre</label>
          <input
            name='name'
            type='text'
            placeholder='Juan Isaza'
            value={client.name}
            onChange={handleClientChange}
          />
        </div>

        <div className='form-group'>
          <label htmlFor='budget'>Presupuesto</label>
          <input
            name='budget'
            type='number'
            placeholder='10'
            value={client.budget}
            onChange={handleClientChange}
          />
        </div>
        <button className='btn btn-primary' type='submit'>
          {editClient ? 'Editar' : 'Agregar'}
        </button>
      </form>
    </div>
  );
};

export default ClientForm;
