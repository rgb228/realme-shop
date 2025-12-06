import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowBack, Favorite, ShoppingCart } from '@mui/icons-material';

const Wishlist = () => {
  const wishlistItems = [
    { id: 1, name: 'Realme GT Neo 3', price: 7999000, image: '/assets/foto/foto3.png' },
    { id: 2, name: 'Realme Buds Air 3', price: 899000, image: '/assets/foto/categoryimage4.png' },
    { id: 3, name: 'Realme Watch 3 Pro', price: 1999000, image: '/assets/foto/watch1.png' }
  ];

  return (
    <div className="container py-5">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div className="d-flex align-items-center">
          <Link to="/profile" className="btn btn-outline-secondary me-3">
            <ArrowBack /> Назад
          </Link>
          <h1>
            <Favorite className="text-danger me-2" />
            Список желаний
          </h1>
        </div>
        <span className="badge bg-primary">
          {wishlistItems.length} товар{wishlistItems.length > 1 ? 'ов' : ''}
        </span>
      </div>

      {wishlistItems.length === 0 ? (
        <div className="text-center py-5">
          <Favorite style={{ fontSize: 80, color: '#ddd', marginBottom: '20px' }} />
          <h3>Список желаний пуст</h3>
          <p className="text-muted mb-4">Добавляйте товары, которые вам понравились</p>
          <Link to="/catalog" className="btn btn-primary">
            Найти товары
          </Link>
        </div>
      ) : (
        <div className="row">
          {wishlistItems.map((item) => (
            <div key={item.id} className="col-md-4 mb-4">
              <div className="card h-100">
                <div className="position-relative">
                  <img
                    src={item.image}
                    className="card-img-top p-3"
                    alt={item.name}
                    style={{ height: '200px', objectFit: 'contain' }}
                  />
                  <button className="btn btn-danger btn-sm position-absolute top-0 end-0 m-2">
                    <Favorite /> Удалить
                  </button>
                </div>
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text text-success fw-bold">
                    Rp {item.price.toLocaleString()}
                  </p>
                </div>
                <div className="card-footer bg-white border-0">
                  <div className="d-grid gap-2">
                    <button className="btn btn-primary">
                      <ShoppingCart /> В корзину
                    </button>
                    <Link to={`/product/${item.id}`} className="btn btn-outline-secondary">
                      Подробнее
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;