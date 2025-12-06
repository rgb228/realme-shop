import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { 
  Person, 
  Email, 
  Phone, 
  LocationOn, 
  Edit,
  ShoppingCart,
  Favorite,
  ShoppingBag
} from '@mui/icons-material';

const Profile = () => {
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <div className="container py-5 text-center">
        <h2>Пожалуйста, войдите в систему</h2>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-md-4">
          <div className="card text-center">
            <div className="card-body">
              <div className="profile-image mb-3">
                <Person style={{ fontSize: 80, color: '#666' }} />
              </div>
              <h3>{user.name}</h3>
              <p className="text-muted">{user.email}</p>
              
              <Link 
                to="/edit-profile" 
                className="btn btn-outline-primary btn-sm"
              >
                <Edit /> Редактировать профиль
              </Link>
            </div>
          </div>
          
          <div className="card mt-3">
            <div className="card-body">
              <h5>Статистика</h5>
              <div className="d-flex justify-content-between mb-2">
                <span>Заказов:</span>
                <strong>{user.orders || 0}</strong>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>В корзине:</span>
                <strong>{user.cartItems || 0}</strong>
              </div>
              <div className="d-flex justify-content-between">
                <span>Баллов:</span>
                <strong className="text-warning">{user.points || 0}</strong>
              </div>
            </div>
          </div>
          
          {/* Новая карточка с ссылками */}
          <div className="card mt-3">
            <div className="card-body">
              <h5>Мои списки</h5>
              <div className="d-grid gap-2">
                <Link to="/wishlist" className="btn btn-outline-danger">
                  <Favorite /> Список желаний
                </Link>
                <Link to="/cart" className="btn btn-outline-primary">
                  <ShoppingCart /> Корзина
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <h4>Информация о профиле</h4>
            </div>
            <div className="card-body">
              <div className="row mb-3">
                <div className="col-md-6">
                  <h6><Email /> Email</h6>
                  <p>{user.email}</p>
                </div>
                <div className="col-md-6">
                  <h6><Phone /> Телефон</h6>
                  <p>{user.phone || 'Не указан'}</p>
                </div>
              </div>
              
              <div className="row mb-3">
                <div className="col-md-12">
                  <h6><LocationOn /> Адрес доставки</h6>
                  <p>{user.address || 'Не указан'}</p>
                </div>
              </div>
              
              <div className="row">
                <div className="col-md-6">
                  {/* Исправленная кнопка - теперь ссылка */}
                  <Link 
                    to="/orders" 
                    className="btn btn-warning w-100"
                  >
                    <ShoppingBag /> Мои заказы
                  </Link>
                </div>
                <div className="col-md-6">
                  <button 
                    className="btn btn-danger w-100"
                    onClick={logout}
                  >
                    Выйти
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="card mt-3">
            <div className="card-header">
              <h4>Последние заказы</h4>
            </div>
            <div className="card-body">
              {user.recentOrders && user.recentOrders.length > 0 ? (
                <div className="list-group">
                  {user.recentOrders.map((order, index) => (
                    <div key={index} className="list-group-item">
                      <div className="d-flex justify-content-between">
                        <span>Заказ #{order.id}</span>
                        <span className="text-success">Rp {order.total.toLocaleString()}</span>
                      </div>
                      <small className="text-muted">{order.date} - {order.status}</small>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted">У вас еще нет заказов</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;