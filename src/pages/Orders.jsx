import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { ArrowBack, CheckCircle, Pending, LocalShipping } from '@mui/icons-material';

const Orders = () => {
  const { user } = useAuth();

  const orders = user?.recentOrders || [
    { id: 'ORD-001', total: 5999000, date: '2024-01-15', status: 'Доставлен', items: 2 },
    { id: 'ORD-002', total: 1898000, date: '2024-01-10', status: 'В обработке', items: 1 },
    { id: 'ORD-003', total: 7999000, date: '2024-01-05', status: 'В пути', items: 1 }
  ];

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Доставлен': return <CheckCircle style={{ color: '#28a745' }} />;
      case 'В обработке': return <Pending style={{ color: '#ffc107' }} />;
      case 'В пути': return <LocalShipping style={{ color: '#17a2b8' }} />;
      default: return <Pending />;
    }
  };

  return (
    <div className="container py-5">
      <div className="d-flex align-items-center mb-4">
        <Link to="/profile" className="btn btn-outline-secondary me-3">
          <ArrowBack /> Назад к профилю
        </Link>
        <h1>Мои заказы</h1>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-5">
          <h3>У вас еще нет заказов</h3>
          <p className="text-muted mb-4">Совершите первую покупку!</p>
          <Link to="/catalog" className="btn btn-primary">
            Перейти в каталог
          </Link>
        </div>
      ) : (
        <div className="row">
          {orders.map((order) => (
            <div key={order.id} className="col-md-6 mb-4">
              <div className="card h-100">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">Заказ #{order.id}</h5>
                  <span className="badge bg-primary">
                    {order.items} товар{order.items > 1 ? 'а' : ''}
                  </span>
                </div>
                <div className="card-body">
                  <div className="d-flex justify-content-between mb-3">
                    <div>
                      <h6>Дата заказа</h6>
                      <p className="text-muted">{order.date}</p>
                    </div>
                    <div className="text-end">
                      <h6>Сумма</h6>
                      <h5 className="text-success">Rp {order.total.toLocaleString()}</h5>
                    </div>
                  </div>
                  
                  <div className="d-flex align-items-center mb-3">
                    {getStatusIcon(order.status)}
                    <span className="ms-2 fw-bold">{order.status}</span>
                  </div>
                  
                  <div className="progress mb-3" style={{ height: '8px' }}>
                    <div 
                      className="progress-bar" 
                      style={{ 
                        width: order.status === 'Доставлен' ? '100%' : 
                               order.status === 'В пути' ? '66%' : '33%'
                      }}
                    ></div>
                  </div>
                  
                  <div className="d-flex justify-content-between">
                    <button className="btn btn-outline-primary btn-sm">
                      Подробности
                    </button>
                    {order.status === 'Доставлен' && (
                      <button className="btn btn-outline-success btn-sm">
                        Оставить отзыв
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-4">
        <h4>История покупок</h4>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Номер заказа</th>
              <th>Дата</th>
              <th>Сумма</th>
              <th>Статус</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>#{order.id}</td>
                <td>{order.date}</td>
                <td>Rp {order.total.toLocaleString()}</td>
                <td>
                  <span className={`badge ${
                    order.status === 'Доставлен' ? 'bg-success' :
                    order.status === 'В обработке' ? 'bg-warning' : 'bg-info'
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td>
                  <button className="btn btn-sm btn-outline-secondary">
                    Подробнее
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;