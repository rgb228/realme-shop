import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { 
  Search, 
  ShoppingCart, 
  Person, 
  Favorite, 
  ShoppingBag, 
  ExitToApp, 
  Close, 
  LocationOn // Добавляем иконку карты
} from "@mui/icons-material";
import api from "../services/api";

const Header = () => {
  const { cartCount } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const searchRef = useRef(null);

  // Закрытие поиска при клике вне его области
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchOpen(false);
        setSearchResults([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    try {
      const response = await api.get(`/products?q=${searchQuery}`);
      setSearchResults(response.data.slice(0, 5));
      
      if (response.data.length === 0) {
        setSearchResults([{ id: 0, name: "Ничего не найдено", noResults: true }]);
      }
    } catch (error) {
      console.error("Ошибка поиска:", error);
      setSearchResults([{ id: 0, name: "Ошибка поиска", noResults: true }]);
    } finally {
      setLoading(false);
    }
  };

  const handleProductClick = (productId) => {
    if (productId === 0) return;
    navigate(`/product/${productId}`);
    setSearchOpen(false);
    setSearchQuery("");
    setSearchResults([]);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
  };

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
    if (searchOpen) {
      setSearchQuery("");
      setSearchResults([]);
    }
  };

  return (
    <header className="shapka">
      <Link to="/">
        <img 
          className="realmi" 
          src="/assets/foto/logo 2.png" 
          alt="Realme Logo" 
        />
      </Link>
      
      <div className="nav-menu">
        <Link className="heigh" to="/catalog?category=smartphone">Smartphone</Link>
        <Link className="heigh" to="/catalog?category=tv">TV</Link>
        <Link className="heigh" to="/catalog?category=laptop">Laptop</Link>
        <Link className="heigh" to="/catalog?category=accessories">Aksesoris</Link>
      </div>
      
      <div className="free" ref={searchRef}>
        {/* ИКОНКА КАРТЫ МАГАЗИНОВ */}
        <Link 
          to="/store-locator" 
          style={{ 
            margin: "0 10px", 
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            color: "inherit"
          }}
          title="Найти магазин"
        >
          <LocationOn style={{ fontSize: 28, cursor: "pointer" }} />
        </Link>

        {/* Поиск */}
        <div className="search-container position-relative">
          {searchOpen ? (
            <div className="search-box active">
              <form onSubmit={handleSearch} className="d-flex align-items-center">
                <input
                  type="text"
                  className="form-control search-input"
                  placeholder="Поиск товаров..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
                <button 
                  type="button" 
                  className="btn btn-link text-dark ms-2"
                  onClick={clearSearch}
                  disabled={!searchQuery}
                >
                  <Close />
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary ms-2"
                  disabled={!searchQuery.trim() || loading}
                >
                  {loading ? (
                    <span className="spinner-border spinner-border-sm" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </span>
                  ) : (
                    <Search />
                  )}
                </button>
              </form>
              
              {/* Результаты поиска */}
              {searchResults.length > 0 && (
                <div className="search-results card mt-2">
                  <div className="card-body p-2">
                    {searchResults.map((item) => (
                      <div
                        key={item.id}
                        className={`search-result-item p-2 ${item.noResults ? 'text-muted' : 'hover-bg-light'}`}
                        onClick={() => !item.noResults && handleProductClick(item.id)}
                        style={{ 
                          cursor: item.noResults ? 'default' : 'pointer',
                          borderBottom: '1px solid #eee' 
                        }}
                      >
                        {item.noResults ? (
                          <div className="text-center">
                            {item.name}
                          </div>
                        ) : (
                          <div className="d-flex align-items-center">
                            <div className="flex-shrink-0 me-3">
                              <img 
                                src={`/${item.image}`} 
                                alt={item.name}
                                style={{ width: '40px', height: '40px', objectFit: 'contain' }}
                                onError={(e) => {
                                  e.target.src = "https://via.placeholder.com/40x40?text=No+Img";
                                }}
                              />
                            </div>
                            <div className="flex-grow-1">
                              <div className="small">{item.name}</div>
                              <div className="text-primary small">
                                {item.price?.toLocaleString()} ₽
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                    
                    {!searchResults[0]?.noResults && searchResults.length > 0 && (
                      <div className="text-center mt-2">
                        <Link 
                          to={`/catalog?search=${searchQuery}`}
                          className="btn btn-sm btn-outline-primary w-100"
                          onClick={() => setSearchOpen(false)}
                        >
                          Показать все результаты
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Search 
              style={{ fontSize: 28, margin: "0 10px", cursor: "pointer" }} 
              onClick={toggleSearch}
              className="search-icon"
            />
          )}
        </div>

        {/* Корзина */}
        <Link to="/cart" style={{ position: "relative", margin: "0 10px" }}>
          <ShoppingCart style={{ fontSize: 28 }} />
          {cartCount > 0 && (
            <span className="cart-count">{cartCount}</span>
          )}
        </Link>
        
        {/* Пользователь */}
        {user ? (
          <div className="dropdown" style={{ display: "inline-block" }}>
            <button 
              className="btn btn-link text-dark p-0 d-flex align-items-center"
              style={{ minWidth: "auto" }}
              data-bs-toggle="dropdown"
            >
              <Person style={{ fontSize: 28, marginRight: "5px" }} />
              <span style={{ fontSize: "0.9rem" }}>{user.name}</span>
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              <li>
                <Link className="dropdown-item" to="/profile">
                  <Person fontSize="small" className="me-2" /> Мой профиль
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/orders">
                  <ShoppingBag fontSize="small" className="me-2" /> Мои заказы
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/wishlist">
                  <Favorite fontSize="small" className="me-2" /> Список желаний
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/cart">
                  <ShoppingCart fontSize="small" className="me-2" /> Корзина ({cartCount})
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/store-locator">
                  <LocationOn fontSize="small" className="me-2" /> Магазины на карте
                </Link>
              </li>
              <li><hr className="dropdown-divider" /></li>
              <li>
                <button className="dropdown-item" onClick={logout}>
                  <ExitToApp fontSize="small" className="me-2" /> Выйти
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <Link to="/login" style={{ margin: "0 10px", textDecoration: "none" }}>
            <Person style={{ fontSize: 28, verticalAlign: "middle" }} />
            <span style={{ marginLeft: "5px", fontSize: "0.9rem" }}>Войти</span>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;