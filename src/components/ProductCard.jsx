// src/components/ProductCard.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Star, StarBorder } from "@mui/icons-material";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        i < Math.floor(rating) ? 
          <Star key={i} style={{ color: "#ffd700", fontSize: 16 }} /> : 
          <StarBorder key={i} style={{ color: "#ddd", fontSize: 16 }} />
      );
    }
    return stars;
  };

  const handleAddToCart = (e) => {
    e.preventDefault(); // Предотвращаем переход по ссылке
    e.stopPropagation(); // Останавливаем всплытие события
    
    addToCart(product, 1); // Добавляем 1 штуку товара
    alert(`${product.name} добавлен в корзину!`);
  };

  const handleQuickBuy = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    addToCart(product, 1);
    navigate("/cart"); // Переходим сразу в корзину
  };

  return (
    <div className="product-card">
      {product.discount > 0 && (
        <div className="discount">-{product.discount}%</div>
      )}
      
      <Link to={`/product/${product.id}`} className="product-card-link">
        <img src={`/${product.image}`} alt={product.name} />
        <h3>{product.name}</h3>
        
        <div className="rating">
          {renderStars(product.rating)}
          <span>({product.rating})</span>
        </div>
        
        {product.originalPrice ? (
          <>
            <div className="original-price">
              {product.originalPrice.toLocaleString('ru-RU')} ₽
            </div>
            <div className="price">
              {product.price.toLocaleString('ru-RU')} ₽
            </div>
          </>
        ) : (
          <div className="price">
            {product.price.toLocaleString('ru-RU')} ₽
          </div>
        )}
      </Link>
      
      <div className="product-card-buttons">
        <button 
          className="btn btn-outline-dark" 
          onClick={handleAddToCart}
        >
          В корзину
        </button>
        <button 
          className="btn btn-warning" 
          onClick={handleQuickBuy}
        >
          Купить
        </button>
      </div>
    </div>
  );
};

export default ProductCard;