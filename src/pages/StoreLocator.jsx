// src/pages/StoreLocator.jsx
import React, { useState } from 'react';

const StoreLocator = () => {
  const [selectedStore, setSelectedStore] = useState(0);
  const [userLocation, setUserLocation] = useState(null);

  const stores = [
    {
      id: 1,
      name: "Realme Store Москва",
      address: "ул. Тверская, 10",
      phone: "+7 (495) 123-45-67",
      hours: "10:00 - 22:00",
      features: ["Демозал", "Сервисный центр", "Выдача заказов"],
      distance: "0.5 км",
      coordinates: { lat: 55.7558, lng: 37.6173 }
    },
    {
      id: 2,
      name: "Realme Store Санкт-Петербург",
      address: "Невский проспект, 25",
      phone: "+7 (812) 987-65-43",
      hours: "10:00 - 21:00",
      features: ["Шоурум", "Подбор аксессуаров"],
      distance: "1.2 км",
      coordinates: { lat: 59.9343, lng: 30.3351 }
    },
    {
      id: 3,
      name: "Realme Store Екатеринбург",
      address: "ул. Ленина, 50",
      phone: "+7 (343) 456-78-90",
      hours: "10:00 - 20:00",
      features: ["Сервис", "Консультации"],
      distance: "2.5 км",
      coordinates: { lat: 56.8389, lng: 60.6057 }
    }
  ];

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            accuracy: position.coords.accuracy
          };
          setUserLocation(location);
          
          // Найти ближайший магазин
          let nearestStore = 0;
          let minDistance = Infinity;
          
          stores.forEach((store, index) => {
            const distance = calculateDistance(
              location.lat, location.lng,
              store.coordinates.lat, store.coordinates.lng
            );
            
            if (distance < minDistance) {
              minDistance = distance;
              nearestStore = index;
            }
          });
          
          setSelectedStore(nearestStore);
          alert(`Найден ближайший магазин: ${stores[nearestStore].name}\nРасстояние: ${minDistance.toFixed(1)} км`);
        },
        (error) => {
          console.error("Ошибка геолокации:", error);
          alert("Не удалось определить местоположение. Разрешите доступ к геолокации.");
        }
      );
    } else {
      alert("Ваш браузер не поддерживает геолокацию.");
    }
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Радиус Земли в км
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const getDirections = (store) => {
    const { lat, lng } = store.coordinates;
    const url = `https://yandex.ru/maps/?pt=${lng},${lat}&z=15&l=map`;
    window.open(url, '_blank');
  };

  const callStore = (phone) => {
    window.open(`tel:${phone}`);
  };

  return (
    <div className="store-locator-page container py-4">
      <h1 className="text-center mb-4">Наши магазины</h1>
      
      {/* Кнопка геолокации */}
      <div className="card mb-4">
        <div className="card-body text-center">
          <h5 className="card-title">Найти ближайший магазин</h5>
          <p className="card-text mb-3">
            Разрешите доступ к геолокации, чтобы мы могли найти ближайший к вам магазин Realme
          </p>
          <button 
            className="btn btn-primary btn-lg"
            onClick={getCurrentLocation}
          >
            <i className="bi bi-geo-alt me-2"></i>
            Определить мое местоположение
          </button>
          
          {userLocation && (
            <div className="mt-3 alert alert-info">
              <p className="mb-1">
                <strong>Ваше местоположение:</strong><br />
                Широта: {userLocation.lat.toFixed(4)}<br />
                Долгота: {userLocation.lng.toFixed(4)}
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="row">
        {/* Список магазинов */}
        <div className="col-lg-4 mb-4">
          <div className="card h-100">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">Наши магазины</h5>
            </div>
            <div className="card-body p-0">
              <div className="list-group list-group-flush">
                {stores.map((store, index) => (
                  <button
                    key={store.id}
                    className={`list-group-item list-group-item-action ${selectedStore === index ? 'active' : ''}`}
                    onClick={() => setSelectedStore(index)}
                  >
                    <div className="d-flex w-100 justify-content-between align-items-center">
                      <div>
                        <h6 className="mb-1">{store.name}</h6>
                        <small className="text-muted">
                          <i className="bi bi-geo-alt me-1"></i>
                          {store.address}
                        </small>
                      </div>
                      <span className="badge bg-primary rounded-pill">
                        {store.distance}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Информация о выбранном магазине */}
        <div className="col-lg-8 mb-4">
          <div className="card h-100">
            <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
              <h5 className="mb-0">{stores[selectedStore].name}</h5>
              <span className="badge bg-light text-dark">
                <i className="bi bi-shop me-1"></i>
                Магазин #{stores[selectedStore].id}
              </span>
            </div>
            
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <div className="store-details">
                    <div className="detail-item mb-4">
                      <h6><i className="bi bi-geo-alt text-primary me-2"></i>Адрес</h6>
                      <p className="text-muted">{stores[selectedStore].address}</p>
                    </div>
                    
                    <div className="detail-item mb-4">
                      <h6><i className="bi bi-clock text-primary me-2"></i>Часы работы</h6>
                      <p className="text-muted">{stores[selectedStore].hours}</p>
                    </div>
                    
                    <div className="detail-item mb-4">
                      <h6><i className="bi bi-telephone text-primary me-2"></i>Телефон</h6>
                      <p className="text-muted">{stores[selectedStore].phone}</p>
                    </div>
                    
                    <div className="detail-item mb-4">
                      <h6><i className="bi bi-star text-primary me-2"></i>Услуги</h6>
                      <div className="d-flex flex-wrap gap-2">
                        {stores[selectedStore].features.map((feature, idx) => (
                          <span key={idx} className="badge bg-light text-dark border">
                            <i className="bi bi-check-circle me-1"></i>
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="store-actions d-flex gap-2">
                      <button
                        className="btn btn-primary"
                        onClick={() => getDirections(stores[selectedStore])}
                      >
                        <i className="bi bi-signpost me-2"></i>
                        Маршрут
                      </button>
                      <button
                        className="btn btn-outline-primary"
                        onClick={() => callStore(stores[selectedStore].phone)}
                      >
                        <i className="bi bi-telephone me-2"></i>
                        Позвонить
                      </button>
                    </div>
                  </div>
                </div>

                {/* Карта-заглушка */}
                <div className="col-md-6">
                  <div className="map-container border rounded p-4 text-center h-100 d-flex flex-column justify-content-center">
                    <div className="mb-4">
                      <div className="display-1 text-primary">
                        <i className="bi bi-map"></i>
                      </div>
                      <h5 className="mt-3">Интерактивная карта</h5>
                      <p className="text-muted">
                        Для просмотра карты нажмите кнопку "Маршрут"
                      </p>
                    </div>
                    
                    <div className="card">
                      <div className="card-body">
                        <h6>Координаты магазина:</h6>
                        <div className="mb-3">
                          <div className="input-group">
                            <input 
                              type="text" 
                              className="form-control" 
                              value={`${stores[selectedStore].coordinates.lat}, ${stores[selectedStore].coordinates.lng}`}
                              readOnly
                            />
                            <button 
                              className="btn btn-outline-secondary"
                              onClick={() => {
                                navigator.clipboard.writeText(
                                  `${stores[selectedStore].coordinates.lat}, ${stores[selectedStore].coordinates.lng}`
                                );
                                alert('Координаты скопированы в буфер обмена!');
                              }}
                            >
                              <i className="bi bi-copy"></i>
                            </button>
                          </div>
                          <small className="text-muted">
                            Скопируйте координаты для навигатора
                          </small>
                        </div>
                        
                        {userLocation && (
                          <div className="distance-info">
                            <h6>Расстояние от вас:</h6>
                            <p className="text-success fs-5">
                              {calculateDistance(
                                userLocation.lat, userLocation.lng,
                                stores[selectedStore].coordinates.lat,
                                stores[selectedStore].coordinates.lng
                              ).toFixed(1)} км
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Карта всех магазинов (статичная) */}
      <div className="row mt-4">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Карта всех магазинов</h5>
            </div>
            <div className="card-body">
              <div className="static-map position-relative" style={{ height: '300px', background: '#f0f0f0' }}>
                {/* Маркеры магазинов */}
                {stores.map((store, index) => (
                  <div 
                    key={store.id}
                    className={`store-marker position-absolute ${selectedStore === index ? 'active' : ''}`}
                    style={{
                      left: `${(store.coordinates.lng - 30) * 10}%`,
                      top: `${(70 - store.coordinates.lat) * 10}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                    onClick={() => setSelectedStore(index)}
                  >
                    <div className="marker-dot">
                      <i className="bi bi-geo-alt-fill"></i>
                    </div>
                    <div className="marker-label">
                      {store.name}
                    </div>
                  </div>
                ))}
                
                <div className="map-overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center">
                  <div className="text-center p-4 bg-white rounded shadow-sm">
                    <h6>Карта магазинов Realme в России</h6>
                    <p className="text-muted small mb-0">
                      Нажмите на маркер, чтобы увидеть информацию о магазине
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .store-locator-page {
          min-height: calc(100vh - 200px);
        }
        .store-details .detail-item {
          padding: 10px 0;
          border-bottom: 1px solid #eee;
        }
        .store-details .detail-item:last-child {
          border-bottom: none;
        }
        .map-container {
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
        }
        .static-map {
          border-radius: 8px;
          overflow: hidden;
        }
        .store-marker {
          cursor: pointer;
          transition: transform 0.3s ease;
          z-index: 2;
        }
        .store-marker:hover {
          transform: translate(-50%, -50%) scale(1.2);
        }
        .store-marker.active {
          z-index: 3;
        }
        .marker-dot {
          width: 40px;
          height: 40px;
          background: #dc3545;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 18px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.3);
          transition: all 0.3s ease;
        }
        .store-marker.active .marker-dot {
          background: #0d6efd;
          transform: scale(1.2);
        }
        .marker-label {
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          background: white;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          white-space: nowrap;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .store-marker:hover .marker-label,
        .store-marker.active .marker-label {
          opacity: 1;
        }
        .map-overlay {
          background: rgba(0,0,0,0.1);
          pointer-events: none;
        }
      `}</style>
    </div>
  );
};

export default StoreLocator;