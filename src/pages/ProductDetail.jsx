import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import api from "../services/api";
import { Star, ShoppingCart, ArrowBack } from "@mui/icons-material";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedConfig, setSelectedConfig] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      setError(null);
      
      try {
        console.log(`Загружаем товар #${id} с API...`);
        
        // Загружаем товар с API
        const response = await api.get(`/products/${id}`);
        console.log("Товар получен:", response.data);
        
        setProduct(response.data);
        
        // Устанавливаем значения по умолчанию
        if (response.data.colors && response.data.colors.length > 0) {
          setSelectedColor(response.data.colors[0]);
        }
        if (response.data.configurations && response.data.configurations.length > 0) {
          setSelectedConfig(response.data.configurations[0]);
        }
        
      } catch (err) {
        console.error("Ошибка загрузки товара:", err);
        setError("Не удалось загрузить товар. Проверьте подключение к серверу.");
        
        // Демо-данные если API не работает
        const demoProducts = {
          1: {
            id: 1,
            name: "Realme 10 Pro+ 5G",
            description: "Изогнутый дисплей, новое видение | 120Hz изогнутый дисплей | 108MP Pro Light камера",
            price: 5999000,
            originalPrice: 6499000,
            image: "assets/foto/bannerimage.png",
            category: "smartphone",
            colors: ["Ночное море", "Аква Блю", "Песочное золото"],
            configurations: ["8+128 ГБ", "8+256 ГБ"],
            features: ["120Hz дисплей", "108MP камера", "5G", "67W быстрая зарядка"],
            discount: 8,
            rating: 4.5
          },
          2: {
            id: 2,
            name: "Realme C33",
            description: "Смартфон с большой батареей и надежной производительностью",
            price: 1898000,
            originalPrice: 1999000,
            image: "assets/foto/foto1.png",
            category: "smartphone",
            colors: ["Ночное море", "Аква Блю", "Песочное золото"],
            configurations: ["3+32 ГБ", "4+64 ГБ", "4+128 ГБ"],
            features: ["Батарея 5000mAh", "Камера 50MP", "Защита от воды IPX4"],
            discount: 5,
            rating: 4.2
          },
          3: {
            id: 3,
            name: "Realme GT Neo 3",
            description: "Флагманский убийца с зарядкой 150W",
            price: 7999000,
            originalPrice: 8499000,
            image: "assets/foto/foto3.png",
            category: "smartphone",
            colors: ["Нитро Блю", "Серебро", "Черный"],
            configurations: ["8+128 ГБ", "12+256 ГБ"],
            features: ["Зарядка 150W", "Dimensity 8100", "120Hz AMOLED"],
            discount: 6,
            rating: 4.7
          },
          4: {
            id: 4,
            name: "Realme Smart TV 32\"",
            description: "Умный телевизор Android с четким изображением",
            price: 2499000,
            originalPrice: 2799000,
            image: "assets/foto/cateogoryimage2.png",
            category: "tv",
            colors: ["Черный"],
            features: ["32 дюйма", "HD Ready", "Android TV", "Dolby Audio"],
            discount: 11,
            rating: 4.3
          }
        };
        
        if (demoProducts[id]) {
          setProduct(demoProducts[id]);
          if (demoProducts[id].colors && demoProducts[id].colors.length > 0) {
            setSelectedColor(demoProducts[id].colors[0]);
          }
          if (demoProducts[id].configurations && demoProducts[id].configurations.length > 0) {
            setSelectedConfig(demoProducts[id].configurations[0]);
          }
        }
        
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star 
          key={i} 
          style={{ 
            color: i < Math.floor(rating) ? "#ffd700" : "#ddd",
            fontSize: 20 
          }} 
        />
      );
    }
    return stars;
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        ...product,
        color: selectedColor,
        configuration: selectedConfig
      }, quantity);
      alert("Товар добавлен в корзину!");
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate("/cart");
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Загрузка...</span>
        </div>
        <p className="mt-3">Загружаем детали товара...</p>
      </div>
    );
  }

  if (error && !product) {
    return (
      <div className="container py-5">
        <div className="alert alert-warning">
          <h4>Внимание!</h4>
          <p>{error}</p>
          <p>Убедитесь, что сервер JSON запущен командой: <code>npm run server</code></p>
          <button 
            onClick={() => navigate(-1)}
            className="btn btn-outline-secondary mt-2"
          >
            <ArrowBack /> Назад
          </button>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container py-5 text-center">
        <h4>Товар не найден</h4>
        <p>Товар с ID #{id} отсутствует в базе данных.</p>
        <button 
          onClick={() => navigate("/catalog")}
          className="btn btn-primary mt-3"
        >
          Посмотреть каталог
        </button>
      </div>
    );
  }

  // Форматирование цены в рублях
  const formatPrice = (price) => {
    return `${price.toLocaleString('ru-RU')} ₽`;
  };

  return (
    <div className="container py-4">
      <button 
        onClick={() => navigate(-1)}
        className="btn btn-outline-secondary mb-4"
      >
        <ArrowBack /> Назад
      </button>

      {error && (
        <div className="alert alert-info mb-4">
          <small>{error} (Показываем демо-данные)</small>
        </div>
      )}

      <div className="row">
        {/* Изображение товара */}
        <div className="col-md-6 mb-4">
          <div className="product-image-container border rounded p-3 bg-white">
            <img 
              src={`/${product.image}`} 
              alt={product.name}
              className="img-fluid w-100"
              style={{ maxHeight: "500px", objectFit: "contain" }}
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/400x400?text=Изображение+недоступно";
              }}
            />
          </div>
        </div>

        {/* Информация о товаре */}
        <div className="col-md-6">
          <div className="product-info">
            <h1 className="product-title mb-3">{product.name}</h1>
            
            <div className="d-flex align-items-center mb-3">
              <div className="rating d-flex">
                {renderStars(product.rating)}
              </div>
              <span className="ms-2 text-muted">(рейтинг {product.rating})</span>
            </div>

            {product.discount > 0 && (
              <div className="badge bg-danger mb-3 fs-6">
                СКИДКА {product.discount}%
              </div>
            )}

            <div className="product-price mb-2">
              <h3 className="text-primary">{formatPrice(product.price)}</h3>
            </div>
            
            {product.originalPrice && product.originalPrice > product.price && (
              <div className="text-muted text-decoration-line-through mb-3">
                {formatPrice(product.originalPrice)}
              </div>
            )}

            <p className="product-description mb-4">{product.description}</p>

            {/* Выбор цвета */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-4">
                <h5>Цвет:</h5>
                <div className="d-flex flex-wrap gap-2">
                  {product.colors.map((color, index) => (
                    <button
                      key={index}
                      type="button"
                      className={`btn ${selectedColor === color ? "btn-dark" : "btn-outline-dark"}`}
                      onClick={() => setSelectedColor(color)}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Выбор конфигурации */}
            {product.configurations && product.configurations.length > 0 && (
              <div className="mb-4">
                <h5>Конфигурация:</h5>
                <div className="d-flex flex-wrap gap-2">
                  {product.configurations.map((config, index) => (
                    <button
                      key={index}
                      type="button"
                      className={`btn ${selectedConfig === config ? "btn-dark" : "btn-outline-dark"}`}
                      onClick={() => setSelectedConfig(config)}
                    >
                      {config}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Количество */}
            <div className="mb-4">
              <h5>Количество:</h5>
              <div className="counter d-flex align-items-center" style={{ width: "150px" }}>
                <button 
                  className="btn btn-outline-secondary"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{ width: "40px" }}
                >
                  -
                </button>
                <span className="mx-3 flex-grow-1 text-center" style={{ fontSize: "1.2rem" }}>
                  {quantity}
                </span>
                <button 
                  className="btn btn-outline-secondary"
                  onClick={() => setQuantity(quantity + 1)}
                  style={{ width: "40px" }}
                >
                  +
                </button>
              </div>
            </div>

            {/* Кнопки */}
            <div className="d-flex gap-3 mb-5">
              <button 
                className="btn btn-dark flex-grow-1 py-3"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="me-2" />
                Добавить в корзину
              </button>
              <button 
                className="btn btn-warning flex-grow-1 py-3"
                onClick={handleBuyNow}
              >
                Купить сейчас
              </button>
            </div>

            {/* Характеристики */}
            {product.features && product.features.length > 0 && (
              <div className="mt-4 pt-4 border-top">
                <h4>Основные характеристики:</h4>
                <ul className="list-group list-group-flush">
                  {product.features.map((feature, index) => (
                    <li key={index} className="list-group-item bg-transparent ps-0">
                      <i className="bi bi-check-circle-fill text-success me-2"></i>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;