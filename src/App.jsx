import { useState, useEffect } from 'react';

import Header from './components/common/Header';
import ClientsList from './components/ClientsList';

const App = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    fetchClients();
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
        setClients([...clients, newClient]);
      });
  };

  return (
    <main className='container'>
      <Header text='Chocolate Feast' color='dark' />

      <Header text='Usuarios' />
      <ClientsList clients={clients} onClientSubmit={handleClientSubmit} />
    </main>
  );
};

export default App;
