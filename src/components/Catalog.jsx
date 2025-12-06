// src/components/Catalog.jsx
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard.jsx";
import api from "../services/api";

const Catalog = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceFilter, setPriceFilter] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [draggedItem, setDraggedItem] = useState(null);
  
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      
      try {
        console.log("Загружаем данные с локального API...");
        
        const productsResponse = await api.get("/products");
        const categoriesResponse = await api.get("/categories");
        
        console.log("Товаров получено:", productsResponse.data.length);
        console.log("Категорий получено:", categoriesResponse.data.length);
        
        const productsData = productsResponse.data;
        const categoriesData = categoriesResponse.data;
        
        // Добавляем категорию "Все товары"
        const allCategories = [
          { 
            id: "all", 
            name: "Semua Produk", 
            icon: "", 
            count: productsData.length,
            order: 0
          },
          ...categoriesData.map(cat => ({
            ...cat,
            count: productsData.filter(p => p.category === cat.id).length,
            order: parseInt(cat.id.replace(/\D/g, '')) || 999
          }))
        ];
        
        // Сортируем категории по order
        allCategories.sort((a, b) => a.order - b.order);
        
        setProducts(productsData);
        setFilteredProducts(productsData);
        setCategories(allCategories);
        
        console.log("Данные успешно загружены!");
        
        // Проверяем параметры URL для поиска
        const searchParams = new URLSearchParams(location.search);
        const urlSearch = searchParams.get('search');
        const urlCategory = searchParams.get('category');
        
        if (urlSearch) {
          setSearchQuery(urlSearch);
          handleSearch(urlSearch, productsData);
        }
        
        if (urlCategory) {
          setSelectedCategory(urlCategory);
        }
        
      } catch (err) {
        console.error("Ошибка загрузки с API:", err);
        console.log("Проверь: 1) Запущен ли сервер? 2) npm run server");
        
        // Если API не работает - демо данные
        const demoProducts = [
          {
            id: 1,
            name: "Realme 10 Pro+ 5G",
            description: "Curved Display, New Vision | 120Hz Curved Vision display | 108MP Pro light Camera",
            price: 5999000,
            originalPrice: 6499000,
            image: "assets/foto/bannerimage.png",
            category: "smartphone",
            discount: 8,
            rating: 4.5
          },
          {
            id: 2,
            name: "Realme C33",
            description: "Smartphone dengan baterai besar dan performa handal",
            price: 1898000,
            originalPrice: 1999000,
            image: "assets/foto/foto1.png",
            category: "smartphone",
            discount: 5,
            rating: 4.2
          },
          {
            id: 3,
            name: "Realme GT Neo 3",
            description: "Flagship Killer dengan charging 150W",
            price: 7999000,
            originalPrice: 8499000,
            image: "assets/foto/foto3.png",
            category: "smartphone",
            discount: 6,
            rating: 4.7
          }
        ];
        
        const demoCategories = [
          { id: "all", name: "Semua Produk", icon: "", count: 3, order: 0 },
          { id: "smartphone", name: "Smartphone", icon: "assets/foto/categoryimage1.png", count: 3, order: 1 },
          { id: "tv", name: "TV", icon: "assets/foto/cateogoryimage2.png", count: 0, order: 2 },
          { id: "laptop", name: "Laptop", icon: "assets/foto/cateogoryimage3.png", count: 0, order: 3 },
          { id: "accessories", name: "Aksesoris", icon: "assets/foto/categoryimage4.png", count: 0, order: 4 }
        ];
        
        setProducts(demoProducts);
        setFilteredProducts(demoProducts);
        setCategories(demoCategories);
        
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [location]);

  // Эффект для фильтрации товаров
  useEffect(() => {
    let result = [...products];
    
    // Фильтр по категории
    if (selectedCategory !== "all") {
      result = result.filter(product => product.category === selectedCategory);
    }
    
    // Фильтр по поисковому запросу
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
      );
    }
    
    // Фильтр по цене
    if (priceFilter !== "all") {
      switch(priceFilter) {
        case "under-2m":
          result = result.filter(p => p.price < 2000000);
          break;
        case "2m-5m":
          result = result.filter(p => p.price >= 2000000 && p.price <= 5000000);
          break;
        case "5m-10m":
          result = result.filter(p => p.price > 5000000 && p.price <= 10000000);
          break;
        case "over-10m":
          result = result.filter(p => p.price > 10000000);
          break;
      }
    }
    
    // Сортировка
    switch(sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "discount":
        result.sort((a, b) => (b.discount || 0) - (a.discount || 0));
        break;
      case "rating":
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
    }
    
    setFilteredProducts(result);
  }, [selectedCategory, searchQuery, priceFilter, sortBy, products]);

  const handleSearch = (query, productsArray = products) => {
    setSearchQuery(query);
    
    // Обновляем URL если поиск из формы
    if (query) {
      navigate(`/catalog?search=${encodeURIComponent(query)}`, { replace: true });
    } else {
      navigate('/catalog', { replace: true });
    }
  };

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    setSearchQuery("");
    
    if (categoryId === "all") {
      navigate('/catalog', { replace: true });
    } else {
      navigate(`/catalog?category=${categoryId}`, { replace: true });
    }
  };

  // Drag & Drop для категорий
  const handleDragStart = (e, categoryId) => {
    setDraggedItem(categoryId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetCategoryId) => {
    e.preventDefault();
    if (!draggedItem || draggedItem === targetCategoryId) return;
    
    const newCategories = [...categories];
    const draggedIndex = newCategories.findIndex(cat => cat.id === draggedItem);
    const targetIndex = newCategories.findIndex(cat => cat.id === targetCategoryId);
    
    if (draggedIndex !== -1 && targetIndex !== -1) {
      const [draggedCat] = newCategories.splice(draggedIndex, 1);
      newCategories.splice(targetIndex, 0, draggedCat);
      
      // Обновляем порядок
      newCategories.forEach((cat, index) => {
        cat.order = index;
      });
      
      setCategories(newCategories);
      
      // Сохраняем порядок в localStorage для сохранения между сессиями
      const order = newCategories.reduce((acc, cat, idx) => {
        acc[cat.id] = idx;
        return acc;
      }, {});
      localStorage.setItem('categoryOrder', JSON.stringify(order));
    }
    
    setDraggedItem(null);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  // Восстановление порядка из localStorage
  useEffect(() => {
    const savedOrder = localStorage.getItem('categoryOrder');
    if (savedOrder && categories.length > 0) {
      const order = JSON.parse(savedOrder);
      const sortedCategories = [...categories].sort((a, b) => {
        return (order[a.id] || 999) - (order[b.id] || 999);
      });
      setCategories(sortedCategories);
    }
  }, []);

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Memuat katalog...</p>
      </div>
    );
  }

  return (
    <div className="catalog-page container py-4">
      <h1 className="text-center mb-4">Katalog Produk</h1>
      
      {/* Поисковая строка */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Cari produk..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                />
                <button 
                  className="btn btn-primary"
                  onClick={() => handleSearch(searchQuery)}
                >
                  <i className="bi bi-search"></i> Cari
                </button>
                {searchQuery && (
                  <button 
                    className="btn btn-outline-secondary"
                    onClick={() => handleSearch("")}
                  >
                    <i className="bi bi-x"></i> Hapus
                  </button>
                )}
              </div>
              
              {searchQuery && (
                <div className="mt-2">
                  <small className="text-muted">
                    Menampilkan {filteredProducts.length} hasil untuk "{searchQuery}"
                  </small>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        {/* Сайдбар с фильтрами */}
        <div className="col-lg-3 mb-4">
          <div className="sticky-top" style={{ top: '20px' }}>
            <div className="card mb-3">
              <div className="card-header">
                <h5 className="mb-0">Kategori</h5>
              </div>
              <div className="card-body p-0">
                <div className="list-group list-group-flush">
                  <button
                    className={`list-group-item list-group-item-action ${selectedCategory === "all" ? "active" : ""}`}
                    onClick={() => handleCategorySelect("all")}
                  >
                    <div className="d-flex justify-content-between align-items-center">
                      <span>Semua Produk</span>
                      <span className="badge bg-primary rounded-pill">
                        {products.length}
                      </span>
                    </div>
                  </button>
                  
                  {categories.slice(1).map((category) => (
                    <button
                      key={category.id}
                      className={`list-group-item list-group-item-action ${selectedCategory === category.id ? "active" : ""} ${draggedItem === category.id ? 'dragging' : ''}`}
                      onClick={() => handleCategorySelect(category.id)}
                      draggable
                      onDragStart={(e) => handleDragStart(e, category.id)}
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, category.id)}
                      onDragEnd={handleDragEnd}
                      style={{ cursor: 'move' }}
                    >
                      <div className="d-flex justify-content-between align-items-center">
                        <span>{category.name}</span>
                        <div className="d-flex align-items-center gap-2">
                          <span className="badge bg-secondary rounded-pill">
                            {category.count}
                          </span>
                          <i className="bi bi-grip-vertical text-muted"></i>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Фильтр по цене */}
            <div className="card mb-3">
              <div className="card-header">
                <h5 className="mb-0">Filter Harga</h5>
              </div>
              <div className="card-body">
                <div className="list-group list-group-flush">
                  <button
                    className={`list-group-item list-group-item-action ${priceFilter === "all" ? "active" : ""}`}
                    onClick={() => setPriceFilter("all")}
                  >
                    Semua Harga
                  </button>
                  <button
                    className={`list-group-item list-group-item-action ${priceFilter === "under-2m" ? "active" : ""}`}
                    onClick={() => setPriceFilter("under-2m")}
                  >
                    Di bawah Rp 2.000.000
                  </button>
                  <button
                    className={`list-group-item list-group-item-action ${priceFilter === "2m-5m" ? "active" : ""}`}
                    onClick={() => setPriceFilter("2m-5m")}
                  >
                    Rp 2.000.000 - 5.000.000
                  </button>
                  <button
                    className={`list-group-item list-group-item-action ${priceFilter === "5m-10m" ? "active" : ""}`}
                    onClick={() => setPriceFilter("5m-10m")}
                  >
                    Rp 5.000.000 - 10.000.000
                  </button>
                  <button
                    className={`list-group-item list-group-item-action ${priceFilter === "over-10m" ? "active" : ""}`}
                    onClick={() => setPriceFilter("over-10m")}
                  >
                    Di atas Rp 10.000.000
                  </button>
                </div>
              </div>
            </div>

            {/* Сортировка */}
            <div className="card">
              <div className="card-header">
                <h5 className="mb-0">Urutkan</h5>
              </div>
              <div className="card-body">
                <select 
                  className="form-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="default">Default</option>
                  <option value="price-low">Harga: Rendah ke Tinggi</option>
                  <option value="price-high">Harga: Tinggi ke Rendah</option>
                  <option value="name-asc">Nama: A-Z</option>
                  <option value="name-desc">Nama: Z-A</option>
                  <option value="discount">Diskon Terbesar</option>
                  <option value="rating">Rating Tertinggi</option>
                </select>
              </div>
            </div>

            {/* Информация о drag & drop */}
            <div className="card mt-3">
              <div className="card-body">
                <p className="small text-muted mb-0">
                  <i className="bi bi-info-circle me-1"></i>
                  Seret kategori untuk mengubah urutan
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Список товаров */}
        <div className="col-lg-9">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-5">
              <div className="empty-state">
                <i className="bi bi-search display-1 text-muted mb-3"></i>
                <h4>Produk tidak ditemukan</h4>
                <p className="text-muted">
                  {searchQuery 
                    ? `Tidak ada produk yang cocok dengan "${searchQuery}"`
                    : "Tidak ada produk dalam kategori ini"}
                </p>
                <button 
                  className="btn btn-primary"
                  onClick={() => {
                    setSelectedCategory("all");
                    setSearchQuery("");
                    setPriceFilter("all");
                    setSortBy("default");
                  }}
                >
                  <i className="bi bi-arrow-clockwise me-2"></i>
                  Reset Filter
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Информация о результатах */}
              <div className="card mb-4">
                <div className="card-body py-2">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <span className="text-muted">
                        Menampilkan {filteredProducts.length} dari {products.length} produk
                      </span>
                      {selectedCategory !== "all" && (
                        <span className="ms-3">
                          Kategori: <strong>{categories.find(c => c.id === selectedCategory)?.name}</strong>
                        </span>
                      )}
                    </div>
                    <div className="d-flex gap-2">
                      <button 
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => {
                          setSelectedCategory("all");
                          setSearchQuery("");
                          setPriceFilter("all");
                          setSortBy("default");
                        }}
                      >
                        <i className="bi bi-x-circle me-1"></i>
                        Reset
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Сетка товаров */}
              <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                {filteredProducts.map(product => (
                  <div className="col" key={product.id}>
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>

              {/* Пагинация (если много товаров) */}
              {filteredProducts.length > 12 && (
                <div className="mt-5">
                  <nav aria-label="Page navigation">
                    <ul className="pagination justify-content-center">
                      <li className="page-item disabled">
                        <button className="page-link">Previous</button>
                      </li>
                      <li className="page-item active">
                        <button className="page-link">1</button>
                      </li>
                      <li className="page-item">
                        <button className="page-link">2</button>
                      </li>
                      <li className="page-item">
                        <button className="page-link">3</button>
                      </li>
                      <li className="page-item">
                        <button className="page-link">Next</button>
                      </li>
                    </ul>
                  </nav>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Catalog;