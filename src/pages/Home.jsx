
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard.jsx";
import api from "../services/api";
import { Search, ArrowRight, CheckCircle, LocalShipping, Shield, CreditCard } from "@mui/icons-material";

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [newProducts, setNewProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [stats, setStats] = useState({
    products: 0,
    categories: 0,
    customers: 0,
    sales: 0
  });
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        // Берем 6 товаров для главной страницы
        const productsRes = await api.get("/products?_limit=6");
        const categoriesRes = await api.get("/categories");
        
        // Разделяем на избранные и новые
        const allProducts = productsRes.data;
        setFeaturedProducts(allProducts.slice(0, 3));
        setNewProducts(allProducts.slice(3, 6));
        setCategories(categoriesRes.data);
        
        // Статистика
        setStats({
          products: allProducts.length,
          categories: categoriesRes.data.length,
          customers: 1542,
          sales: 89
        });
        
      } catch (error) {
        console.error("Ошибка загрузки данных:", error);
        // Демо данные если API не работает
        const demoProducts = [
          {
            id: 1,
            name: "Realme 10 Pro+ 5G",
            description: "Изогнутый дисплей, новое видение | 120Hz изогнутый дисплей",
            price: 5999000,
            originalPrice: 6499000,
            image: "assets/foto/bannerimage.png",
            category: "smartphone",
            discount: 8,
            rating: 4.5,
            isNew: true
          },
          {
            id: 2,
            name: "Realme C33",
            description: "Смартфон с большой батареей и надежной производительностью",
            price: 1898000,
            originalPrice: 1999000,
            image: "assets/foto/foto1.png",
            category: "smartphone",
            discount: 5,
            rating: 4.2,
            isNew: false
          },
          {
            id: 3,
            name: "Realme GT Neo 3",
            description: "Флагманский убийца с зарядкой 150W",
            price: 7999000,
            originalPrice: 8499000,
            image: "assets/foto/foto3.png",
            category: "smartphone",
            discount: 6,
            rating: 4.7,
            isNew: true
          },
          {
            id: 8,
            name: "Realme Buds Air 3",
            description: "Беспроводные наушники с шумоподавлением",
            price: 799000,
            originalPrice: 999000,
            image: "assets/foto/categoryimage4.png",
            category: "accessories",
            discount: 20,
            rating: 4.6,
            isNew: true
          },
          {
            id: 9,
            name: "Realme Watch 3 Pro",
            description: "Умные часы с AMOLED дисплеем",
            price: 1299000,
            originalPrice: 1499000,
            image: "assets/foto/categoryimage4.png",
            category: "accessories",
            discount: 13,
            rating: 4.5,
            isNew: true
          },
          {
            id: 5,
            name: "Realme GT 2 Pro",
            description: "Флагманский смартфон с дисплеем LTPO 2.0",
            price: 8999000,
            originalPrice: 9999000,
            image: "assets/foto/foto1.png",
            category: "smartphone",
            discount: 10,
            rating: 4.8,
            isNew: false
          }
        ];
        
        setFeaturedProducts(demoProducts.slice(0, 3));
        setNewProducts(demoProducts.slice(3, 6));
        setCategories([
          { id: "smartphone", name: "Смартфоны", icon: "assets/foto/categoryimage1.png" },
          { id: "tv", name: "Телевизоры", icon: "assets/foto/cateogoryimage2.png" },
          { id: "laptop", name: "Ноутбуки", icon: "assets/foto/cateogoryimage3.png" },
          { id: "accessories", name: "Аксессуары", icon: "assets/foto/categoryimage4.png" }
        ]);
        setStats({
          products: demoProducts.length,
          categories: 4,
          customers: 1542,
          sales: 89
        });
        
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/catalog?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  if (loading) {
    return (
      <div className="home-loading">
        <div className="container py-5 text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Загрузка...</span>
          </div>
          <p className="mt-3">Загружаем...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <div className="hero-overlay"></div>
          <div className="container">
            <div className="row align-items-center min-vh-80">
              <div className="col-lg-6">
                <div className="hero-content">
                  <h1 className="hero-title">
                    Realme <span className="highlight">10 Pro+ 5G</span>
                  </h1>
                  <h2 className="hero-subtitle">Лучший смартфон 2024</h2>
                  <p className="hero-description">
                    120Hz изогнутый дисплей | 108MP Pro Light камера | 67W быстрая зарядка
                  </p>
                  <div className="hero-price">
                    <span className="original-price">6 499 000 ₽</span>
                    <span className="current-price">5 999 000 ₽</span>
                    <span className="discount-badge">-8%</span>
                  </div>
                  <div className="hero-actions">
                    <Link to="/product/1" className="btn btn-primary btn-lg">
                      Купить сейчас
                      <ArrowRight className="ms-2" />
                    </Link>
                    <Link to="/catalog" className="btn btn-outline-light btn-lg ms-3">
                      Смотреть каталог
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="hero-image">
                  <img 
                    src="/assets/foto/bannerimage.png" 
                    alt="Realme 10 Pro+ 5G" 
                    className="img-fluid animate-float"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search Bar */}
      <section className="search-section py-4">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="card shadow-lg border-0">
                <div className="card-body p-4">
                  <h3 className="text-center mb-4">Найдите нужный вам товар</h3>
                  <form onSubmit={handleSearchSubmit}>
                    <div className="input-group input-group-lg">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Введите название товара или категорию..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      <button className="btn btn-primary" type="submit">
                        <Search className="me-2" />
                        Найти
                      </button>
                    </div>
                    <div className="mt-3 text-center">
                      <small className="text-muted">
                        Пример: Realme 10, Buds Air 3, Smart TV, Ноутбук
                      </small>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="categories-section py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-5">Категории товаров</h2>
          <div className="row g-4">
            {categories.map((category, index) => (
              <div className="col-lg-3 col-md-6" key={category.id}>
                <Link 
                  to={`/catalog?category=${category.id}`}
                  className="category-card card border-0 shadow-sm text-center text-decoration-none"
                  style={{ 
                    animationDelay: `${index * 0.1}s`,
                    animationFillMode: 'both'
                  }}
                >
                  <div className="card-body py-5">
                    <div className="category-icon mb-3">
                      <img 
                        src={`/${category.icon}`} 
                        alt={category.name}
                        className="img-fluid"
                        style={{ height: '80px', objectFit: 'contain' }}
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/80x80?text=Категория";
                        }}
                      />
                    </div>
                    <h5 className="category-title mb-2">{category.name}</h5>
                    <p className="text-muted small mb-0">
                      {category.count || Math.floor(Math.random() * 10) + 5} товаров
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="products-section py-5">
        <div className="container">
          <div className="section-header mb-5">
            <h2 className="section-title">Рекомендуемые товары</h2>
            <p className="section-subtitle text-muted">Лучшие товары по нашему выбору</p>
            <Link to="/catalog" className="btn btn-link">
              Смотреть все <ArrowRight className="ms-1" />
            </Link>
          </div>
          
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {featuredProducts.length > 0 ? (
              featuredProducts.map(product => (
                <div className="col" key={product.id}>
                  <ProductCard product={product} />
                </div>
              ))
            ) : (
              <div className="col-12 text-center">
                <p>Нет товаров для отображения</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features-section py-5">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-3 col-md-6">
              <div className="feature-card text-center p-4">
                <div className="feature-icon mb-3">
                  <LocalShipping style={{ fontSize: 48, color: '#28a745' }} />
                </div>
                <h5>Бесплатная доставка</h5>
                <p className="text-muted">При заказе от 500 000 ₽</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="feature-card text-center p-4">
                <div className="feature-icon mb-3">
                  <CreditCard style={{ fontSize: 48, color: '#ffc107' }} />
                </div>
                <h5>Оплата при получении</h5>
                <p className="text-muted">Максимальная сумма 8 000 000 ₽</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="feature-card text-center p-4">
                <div className="feature-icon mb-3">
                  <Shield style={{ fontSize: 48, color: '#17a2b8' }} />
                </div>
                <h5>Оригинальная продукция</h5>
                <p className="text-muted">Гарантия 100% оригинального товара</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="feature-card text-center p-4">
                <div className="feature-icon mb-3">
                  <CheckCircle style={{ fontSize: 48, color: '#dc3545' }} />
                </div>
                <h5>Рассрочка без кредитной карты</h5>
                <p className="text-muted">Доступно через приложение BRI Ceria</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section py-5 bg-dark text-white">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <h2 className="cta-title mb-3">Присоединяйтесь к сообществу Realme</h2>
              <p className="cta-text mb-0">
                Получайте последние новости, эксклюзивные предложения и советы по использованию продукции Realme
              </p>
            </div>
            <div className="col-lg-4 text-lg-end">
              <Link to="/login" className="btn btn-light btn-lg">
                Зарегистрироваться
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;