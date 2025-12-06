import React from "react";

const Footer = () => {
  return (
    <div className="k2 mt-4">
      <div className="row">
        <div className="col-3">
          <h1>Поддержка</h1>
          <p>
            Часто задаваемые вопросы<br />
            Решение проблем<br />
            Сервисные центры
          </p>
        </div>
        <div className="col-3">
          <h1>О компании</h1>
          <p>
            Наш бренд<br />
            Пресс-центр<br />
            Магазины
          </p>
        </div>
        <div className="col-3">
          <h1>Контакты</h1>
          <p>service.ru@realme.com</p>
          <div>
            <img src="/assets/foto/logoander1.png" alt="Социальная сеть 1" />
            <img src="/assets/foto/logoander2.png" alt="Социальная сеть 2" />
            <img src="/assets/foto/logoander3.png" alt="Социальная сеть 3" />
          </div>
        </div>
        <div className="col-3">
          <img className="realmi-ander" src="/assets/foto/logo 2.png" alt="Realme логотип" />
          <p>"Realme - Соединяем мечты, меняем жизнь"</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;