import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const EnhancedProfile = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  // Моковые данные для графиков
  const monthlyData = [
    { month: 'Янв', sales: 4000 },
    { month: 'Фев', sales: 3000 },
    { month: 'Мар', sales: 5000 },
    { month: 'Апр', sales: 4500 },
    { month: 'Май', sales: 6000 },
    { month: 'Июн', sales: 5500 },
  ];

  const categoryData = [
    { name: 'Смартфоны', value: 45, color: '#3498db' },
    { name: 'Наушники', value: 25, color: '#2ecc71' },
    { name: 'Часы', value: 15, color: '#e74c3c' },
    { name: 'Аксессуары', value: 15, color: '#f39c12' },
  ];

  const orders = [
    { id: 'ORD-001', date: '2024-01-15', product: 'Realme 10 Pro+ 5G', status: 'delivered', amount: 5999 },
    { id: 'ORD-002', date: '2024-01-10', product: 'Realme Buds Air 3', status: 'shipping', amount: 799 },
    { id: 'ORD-003', date: '2024-01-05', product: 'Realme Watch 3 Pro', status: 'processing', amount: 1299 },
  ];

  // График на чистом CSS
  const renderBarChart = () => {
    const maxSales = Math.max(...monthlyData.map(d => d.sales));
    return (
      <div className="bar-chart">
        <div className="chart-bars d-flex align-items-end justify-content-between" style={{ height: '200px' }}>
          {monthlyData.map((item, index) => (
            <div key={index} className="bar-container text-center" style={{ width: '14%' }}>
              <div 
                className="bar bg-primary rounded-top mx-auto"
                style={{ 
                  height: `${(item.sales / maxSales) * 100}%`,
                  width: '30px',
                  transition: 'height 0.5s ease'
                }}
              ></div>
              <div className="mt-2 small">{item.month}</div>
              <div className="small text-muted">{item.sales} ₽</div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Круговая диаграмма на CSS
  const renderPieChart = () => {
    let cumulativePercent = 0;
    
    return (
      <div className="pie-chart-container position-relative" style={{ width: '200px', height: '200px', margin: '0 auto' }}>
        <svg viewBox="0 0 32 32" className="pie-chart">
          {categoryData.map((item, index) => {
            const percent = item.value;
            const dashArray = `${percent} ${100 - percent}`;
            const dashOffset = 100 - cumulativePercent + 25;
            cumulativePercent += percent;
            
            return (
              <circle
                key={index}
                cx="16"
                cy="16"
                r="16"
                fill="transparent"
                stroke={item.color}
                strokeWidth="32"
                strokeDasharray={dashArray}
                strokeDashoffset={dashOffset}
                className="pie-segment"
                style={{
                  transform: 'rotate(-90deg)',
                  transformOrigin: '50% 50%',
                  transition: 'stroke-dasharray 0.5s ease'
                }}
              />
            );
          })}
        </svg>
        <div className="position-absolute top-50 start-50 translate-middle text-center">
          <div className="fs-4">100%</div>
          <div className="small text-muted">Всего</div>
        </div>
      </div>
    );
  };

  if (!user) {
    return (
      <div className="container py-5 text-center">
        <div className="alert alert-warning">
          <h4>Требуется авторизация</h4>
          <p>Пожалуйста, войдите в систему для просмотра профиля</p>
          <Link to="/login" className="btn btn-primary">Войти</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="enhanced-profile container py-4">
      {/* Заголовок */}
      <div className="row mb-4">
        <div className="col-12">
          <h1>Личный кабинет</h1>
          <p className="text-muted">Дашборд с аналитикой и статистикой</p>
        </div>
      </div>

      {/* Статистика */}
      <div className="row mb-4">
        <div className="col-md-3 col-6 mb-3">
          <div className="card text-center border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="text-primary mb-2">
                <i className="bi bi-cart-check fs-1"></i>
              </div>
              <h3>8</h3>
              <p className="text-muted mb-0">Заказов</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-6 mb-3">
          <div className="card text-center border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="text-success mb-2">
                <i className="bi bi-currency-dollar fs-1"></i>
              </div>
              <h3>42,560</h3>
              <p className="text-muted mb-0">Потрачено</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-6 mb-3">
          <div className="card text-center border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="text-warning mb-2">
                <i className="bi bi-star fs-1"></i>
              </div>
              <h3>1,240</h3>
              <p className="text-muted mb-0">Бонусов</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-6 mb-3">
          <div className="card text-center border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="text-info mb-2">
                <i className="bi bi-graph-up fs-1"></i>
              </div>
              <h3>94%</h3>
              <p className="text-muted mb-0">Удовлетворенность</p>
            </div>
          </div>
        </div>
      </div>

      {/* Навигация */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="d-flex flex-wrap gap-2">
            <button 
              className={`btn ${activeTab === 'dashboard' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setActiveTab('dashboard')}
            >
              <i className="bi bi-speedometer2 me-2"></i>
              Дашборд
            </button>
            <button 
              className={`btn ${activeTab === 'analytics' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setActiveTab('analytics')}
            >
              <i className="bi bi-bar-chart me-2"></i>
              Аналитика
            </button>
            <button 
              className={`btn ${activeTab === 'orders' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setActiveTab('orders')}
            >
              <i className="bi bi-receipt me-2"></i>
              Заказы
            </button>
          </div>
        </div>
      </div>

      {/* Контент вкладок */}
      {activeTab === 'dashboard' && (
        <div className="row">
          <div className="col-lg-8 mb-4">
            <div className="card h-100">
              <div className="card-header">
                <h5 className="mb-0">Динамика покупок</h5>
              </div>
              <div className="card-body">
                {renderBarChart()}
              </div>
            </div>
          </div>
          <div className="col-lg-4 mb-4">
            <div className="card h-100">
              <div className="card-header">
                <h5 className="mb-0">Расходы по категориям</h5>
              </div>
              <div className="card-body">
                {renderPieChart()}
                <div className="legend mt-3">
                  {categoryData.map((item, index) => (
                    <div key={index} className="d-flex align-items-center mb-2">
                      <div 
                        className="color-dot me-2" 
                        style={{ 
                          width: '12px', 
                          height: '12px', 
                          backgroundColor: item.color,
                          borderRadius: '50%' 
                        }}
                      ></div>
                      <span>{item.name}: {item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <h5 className="mb-0">Детальная аналитика</h5>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Показатель</th>
                        <th>Значение</th>
                        <th>Изменение</th>
                        <th>Тренд</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Средний чек</td>
                        <td>5,320 ₽</td>
                        <td className="text-success">+12%</td>
                        <td>
                          <i className="bi bi-arrow-up text-success"></i>
                        </td>
                      </tr>
                      <tr>
                        <td>Частота покупок</td>
                        <td>1.2 в месяц</td>
                        <td className="text-success">+5%</td>
                        <td>
                          <i className="bi bi-arrow-up text-success"></i>
                        </td>
                      </tr>
                      <tr>
                        <td>Возвраты</td>
                        <td>3%</td>
                        <td className="text-danger">-2%</td>
                        <td>
                          <i className="bi bi-arrow-down text-danger"></i>
                        </td>
                      </tr>
                      <tr>
                        <td>Лояльность</td>
                        <td>94%</td>
                        <td className="text-success">+3%</td>
                        <td>
                          <i className="bi bi-arrow-up text-success"></i>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'orders' && (
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <h5 className="mb-0">История заказов</h5>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Заказ</th>
                        <th>Дата</th>
                        <th>Товар</th>
                        <th>Сумма</th>
                        <th>Статус</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map(order => (
                        <tr key={order.id}>
                          <td>
                            <strong>{order.id}</strong>
                          </td>
                          <td>{order.date}</td>
                          <td>{order.product}</td>
                          <td>
                            <strong>{order.amount.toLocaleString()} ₽</strong>
                          </td>
                          <td>
                            <span className={`badge bg-${order.status === 'delivered' ? 'success' : order.status === 'shipping' ? 'warning' : 'info'}`}>
                              {order.status === 'delivered' ? 'Доставлен' : 
                               order.status === 'shipping' ? 'В пути' : 'Обработка'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Дополнительная информация */}
      <div className="row mt-4">
        <div className="col-md-6 mb-4">
          <div className="card h-100">
            <div className="card-header">
              <h5 className="mb-0">Рекомендации</h5>
            </div>
            <div className="card-body">
              <div className="d-flex mb-3">
                <div className="flex-shrink-0">
                  <i className="bi bi-lightbulb text-warning fs-4"></i>
                </div>
                <div className="flex-grow-1 ms-3">
                  <h6>Попробуйте Realme Buds Air 3</h6>
                  <p className="small text-muted mb-0">
                    На основе ваших покупок, вам могут понравиться наши беспроводные наушники
                  </p>
                </div>
              </div>
              <div className="d-flex">
                <div className="flex-shrink-0">
                  <i className="bi bi-tag text-success fs-4"></i>
                </div>
                <div className="flex-grow-1 ms-3">
                  <h6>Специальное предложение</h6>
                  <p className="small text-muted mb-0">
                    У вас есть 1,240 бонусов. Обменяйте их на скидку 10%
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="card h-100">
            <div className="card-header">
              <h5 className="mb-0">Быстрые действия</h5>
            </div>
            <div className="card-body">
              <div className="row g-2">
                <div className="col-6">
                  <Link to="/catalog" className="btn btn-outline-primary w-100">
                    <i className="bi bi-cart me-2"></i>
                    Купить
                  </Link>
                </div>
                <div className="col-6">
                  <Link to="/orders" className="btn btn-outline-success w-100">
                    <i className="bi bi-receipt me-2"></i>
                    Заказы
                  </Link>
                </div>
                <div className="col-6">
                  <Link to="/profile" className="btn btn-outline-info w-100">
                    <i className="bi bi-person me-2"></i>
                    Профиль
                  </Link>
                </div>
                <div className="col-6">
                  <Link to="/wishlist" className="btn btn-outline-warning w-100">
                    <i className="bi bi-heart me-2"></i>
                    Избранное
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedProfile;