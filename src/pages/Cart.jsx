import React from "react";
import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { Delete, LocalShipping } from "@mui/icons-material";

const Cart = () => {
  const { 
    cart, 
    updateQuantity, 
    removeFromCart, 
    cartTotal, 
    cartCount,
    clearCart 
  } = useCart();
  
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Ваша корзина пуста!");
      return;
    }
    alert("Спасибо! Ваш заказ принят.");
    clearCart();
    navigate("/");
  };

  return (
    <div className="fon">
      <div className="txcent">
        <h1>Корзина</h1>
      </div>

      <section>
        <div className="full">
          <div className="two">
            <LocalShipping style={{ fontSize: 40, marginRight: 20 }} />
            <div className="txtwo">
              <h1>Поздравляем!</h1>
              <p>Вы получили бесплатную доставку</p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="vse" id="cartItems">
          {cart.length === 0 ? (
            <div className="text-center py-5">
              <h3>Ваша корзина пуста</h3>
              <Link to="/catalog" className="btn btn-primary mt-3">
                Начать покупки
              </Link>
            </div>
          ) : (
            cart.map(item => (
              <div className="row" key={item.id}>
                <div className="col-2">
                  <img 
                    src={`/${item.image}`} 
                    alt={item.name}
                    style={{ width: "100px", height: "100px", objectFit: "contain" }}
                  />
                </div>
                <div className="col-4">
                  <h4>{item.name}</h4>
                  {item.color && <p>Цвет: {item.color}</p>}
                  {item.configuration && <p>Конфигурация: {item.configuration}</p>}
                </div>
                <div className="col-2">
                  <div className="counter">
                    <button 
                      className="change"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button 
                      className="change"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="col-2">
                  <p>{item.price.toLocaleString('ru-RU')} ₽</p>
                </div>
                <div className="col-2">
                  <button 
                    className="btn btn-danger btn-sm"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <Delete /> Удалить
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="yavshoke">
            <h1>Итого</h1>
            <h4>{cartTotal.toLocaleString('ru-RU')} ₽</h4>
            <button 
              type="button" 
              className="btn btn-warning" 
              onClick={handleCheckout}
            >
              Оформить заказ ({cartCount})
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default Cart;