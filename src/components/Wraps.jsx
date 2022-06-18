import { useState, useEffect } from 'react';

const Wraps = () => {
  const [edit, setEdit] = useState(false);
  const [wrap, setWrap] = useState({});

  const [wrapValue, setWrapValue] = useState('');

  useEffect(() => {
    fetch('http://localhost:8000/api/promotions/2')
      .then((res) => res.json())
      .then((data) => setWrap(data.Promotion));
  }, []);

  const handleWrapEdit = () => setEdit(true);

  const handleWrapSubmit = (e) => {
    e.preventDefault();

    if (!wrapValue || wrapValue <= 0) {
      console.error('Proporcione un valor válido');
      return;
    }

    const newWrap = { ...wrap, wraps: wrapValue };

    fetch('http://localhost:8000/api/promotions/2', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newWrap),
    });

    setEdit(false);
    setWrap(newWrap);
  };

  return (
    <div className='content-container'>
      <h2>{wrap?.name}</h2>
      <p>{wrap?.description}</p>
      <p
        style={{
          textTransform: 'uppercase',
          fontSize: '0.825rem',
          fontWeight: '700',
        }}
      >
        # Envolturas: <span className='highlight'>{wrap?.wraps}</span>
      </p>
      {edit && (
        <form onSubmit={handleWrapSubmit}>
          <div className='form-group'>
            <label htmlFor='wraps'>Envolturas</label>
            <input
              type='number'
              placeholder='# de envolturas'
              value={wrapValue}
              onChange={(e) => setWrapValue(e.target.value)}
            />
          </div>

          <input type='submit' className='btn btn-primary' />
        </form>
      )}
      {!edit && (
        <button onClick={handleWrapEdit} className='btn btn-primary'>
          Editar valor
        </button>
      )}
    </div>
  );
};

export default Wraps;
