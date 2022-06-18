import { useState, useEffect } from 'react';

import Header from './components/common/Header';
import ClientsList from './components/ClientsList';
import StoresList from './components/StoresList';
import ClientForm from './components/ClientForm';

const App = () => {
  const [clients, setClients] = useState([]);
  const [stores, setStores] = useState([]);

  const [form, setForm] = useState(false);

  useEffect(() => {
    fetchClients();
    fetchStores();

    if (!clients) setForm(true);
  }, []);

  const fetchClients = () => {
    const options = {
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    fetch('http://localhost:8000/api/clients/', options)
      .then((res) => res.json())
      .then((data) => setClients(data.clients));
  };

  const fetchStores = () => {
    const options = {
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    fetch('http://localhost:8000/api/stores/', options)
      .then((res) => res.json())
      .then((data) => setStores(data.stores));
  };

  const handleClientSubmit = (client) => {
    const options = {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(client),
    };

    fetch('http://localhost:8000/api/clients/', options)
      .then((res) => res.json())
      .then((data) => {
        const newClient = { id: data.id, ...client };

        clients ? setClients([...clients, newClient]) : setClients([newClient]);
      });
  };

  return (
    <main className='container'>
      <Header text='Chocolate Feast' color='dark' />

      <Header text='Usuarios' />
      {clients ? (
        <ClientsList
          form={form}
          setForm={setForm}
          clients={clients}
          onClientSubmit={handleClientSubmit}
        />
      ) : (
        <div className='content-container'>
          <ClientForm onClientSubmit={handleClientSubmit} setForm={setForm} />
        </div>
      )}

      <Header text='Tiendas' />
      {stores && <StoresList stores={stores} />}
    </main>
  );
};

export default App;
