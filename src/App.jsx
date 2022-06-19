import { useState, useEffect } from 'react';

import Header from './components/common/Header';
import ClientsList from './components/ClientsList';
import Wraps from './components/Wraps';
import Products from './components/Products';
import ClientForm from './components/ClientForm';
import ChocolateFeast from './components/ChocolateFeast';

const App = () => {
  const [clients, setClients] = useState([]);
  const [currentClient, setCurrentClient] = useState('');
  const [chocolateFeast, setChocolateFeast] = useState(0);

  const [form, setForm] = useState(false);

  useEffect(() => {
    fetchClients();

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

  const handleClientChocolateFeast = async (id) => {
    const response = await fetch('http://localhost:8000/api/orders/');
    const orders = await response.json();
    const clientOrders = orders.orders.find((e) => e.client_id === id);

    if (!clientOrders) {
      setChocolateFeast(0);
      setCurrentClient('');
      return;
    }

    const chocolateFeast = await fetch(
      `http://localhost:8000/api/orders/${clientOrders.id}`
    );
    const feastResponse = await chocolateFeast.json();
    setChocolateFeast(feastResponse.chocolatefeast);
    setCurrentClient(feastResponse.clientName);
  };

  return (
    <main className='container'>
      <Header text='Chocolate Feast' color='dark' />

      {chocolateFeast > 0 ? (
        <ChocolateFeast
          currentClient={currentClient}
          chocolateFeast={chocolateFeast}
        />
      ) : (
        <div className='content-container'>
          El usuario seleccionado no tiene ordenes, registre alguna para poder
          realizar el cálculo
        </div>
      )}

      <Header text='Usuarios' />
      {clients ? (
        <ClientsList
          form={form}
          setForm={setForm}
          clients={clients}
          onClientSubmit={handleClientSubmit}
          onChocolateFeast={handleClientChocolateFeast}
        />
      ) : (
        <div className='content-container'>
          <ClientForm onClientSubmit={handleClientSubmit} setForm={setForm} />
        </div>
      )}

      <Header text='Envolturas' />
      <Wraps />

      <Header text='Productos' />
      <Products />
    </main>
  );
};

export default App;
