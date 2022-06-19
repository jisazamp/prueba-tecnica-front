import { useEffect, useState } from 'react';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({ id: '', price: '' });
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    fetch('http://localhost:8000/api/products/')
      .then((res) => res.json())
      .then((data) => setProducts(data.products));
  };

  const handleProductEdit = (id) => {
    setProduct({ ...product, id });
    setEdit(true);
  };

  const handleProductSubmit = (e) => {
    e.preventDefault();

    if ([product.id || product.price].includes('')) {
      console.error('Proporcione valores válidos');
      return;
    }

    let newProduct = products.find((p) => p.id === product.id);
    newProduct.price = product.price;
    console.log(newProduct);

    fetch(`http://localhost:8000/api/products/${newProduct.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct),
    });

    setEdit(false);
    setProduct({ id: '', price: '' });
  };

  return (
    <div className='content-container'>
      {products.map((p) => (
        <div key={p.id} className='product-container'>
          <h2>{p.name}</h2>
          <p style={{ fontSize: '1.5rem' }} className='highlight'>
            ${p.price}
          </p>

          {!edit && (
            <button
              onClick={() => handleProductEdit(p.id)}
              className='btn btn-secondary'
            >
              Editar
            </button>
          )}
        </div>
      ))}

      {edit && (
        <form onSubmit={handleProductSubmit}>
          <div className='form-group'>
            <label htmlFor='price'>Precio</label>
            <input
              value={product.price}
              onChange={(e) =>
                setProduct({ ...product, price: e.target.value })
              }
              type='number'
              name='price'
              placeholder='Precio'
            />
          </div>

          <input type='submit' className='btn btn-primary' />
        </form>
      )}
    </div>
  );
};

export default Products;
