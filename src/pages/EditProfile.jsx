import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowBack, Save, Person, Email, Phone, LocationOn } from '@mui/icons-material';

const EditProfile = () => {
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || ''
  });
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Имитация API запроса
      await new Promise(resolve => setTimeout(resolve, 1000));
      updateProfile(formData);
      setSuccess(true);
      
      setTimeout(() => {
        navigate('/profile');
      }, 1500);
    } catch (error) {
      console.error('Ошибка обновления:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="d-flex align-items-center mb-4">
            <Link to="/profile" className="btn btn-outline-secondary me-3">
              <ArrowBack /> Отмена
            </Link>
            <h1>Редактирование профиля</h1>
          </div>

          {success && (
            <div className="alert alert-success alert-dismissible fade show">
              Профиль успешно обновлен!
            </div>
          )}

          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">
                      <Person /> Имя
                    </label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="col-md-6 mb-3">
                    <label className="form-label">
                      <Email /> Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    <Phone /> Телефон
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    className="form-control"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+62 812-3456-7890"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    <LocationOn /> Адрес доставки
                  </label>
                  <textarea
                    name="address"
                    className="form-control"
                    rows="3"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Введите полный адрес доставки"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">О себе</label>
                  <textarea
                    className="form-control"
                    rows="2"
                    placeholder="Расскажите немного о себе"
                  />
                </div>

                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                  <button
                    type="button"
                    className="btn btn-outline-secondary me-2"
                    onClick={() => navigate('/profile')}
                  >
                    Отмена
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Сохранение...
                      </>
                    ) : (
                      <>
                        <Save /> Сохранить изменения
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="card mt-4">
            <div className="card-header">
              <h5>Безопасность</h5>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label className="form-label">Новый пароль</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Введите новый пароль"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Подтвердите пароль</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Повторите новый пароль"
                />
              </div>
              <button className="btn btn-warning">
                Обновить пароль
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;