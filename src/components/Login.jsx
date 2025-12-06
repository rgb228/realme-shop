import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Email, Lock, Person } from '@mui/icons-material';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      if (isLogin) {
        await login(email, password);
        navigate('/profile');
      } else {
        await register(email, password, name);
        navigate('/profile');
      }
    } catch (err) {
      setError(err.message || 'Произошла ошибка');
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header text-center">
              <h3>{isLogin ? 'Вход в аккаунт' : 'Регистрация'}</h3>
            </div>
            <div className="card-body">
              {error && (
                <div className="alert alert-danger">{error}</div>
              )}
              
              <form onSubmit={handleSubmit}>
                {!isLogin && (
                  <div className="mb-3">
                    <label className="form-label">
                      <Person /> Имя
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                )}
                
                <div className="mb-3">
                  <label className="form-label">
                    <Email /> Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                
                <div className="mb-3">
                  <label className="form-label">
                    <Lock /> Пароль
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength="6"
                  />
                </div>
                
                <button type="submit" className="btn btn-primary w-100 mb-3">
                  {isLogin ? 'Войти' : 'Зарегистрироваться'}
                </button>
                
                <div className="text-center">
                  <button
                    type="button"
                    className="btn btn-link"
                    onClick={() => setIsLogin(!isLogin)}
                  >
                    {isLogin ? 'Нет аккаунта? Зарегистрируйтесь' : 'Уже есть аккаунт? Войдите'}
                  </button>
                </div>
              </form>
              
              <hr />
              
              <div className="text-center">
                <p>Или войдите с помощью</p>
                <div className="d-flex justify-content-center gap-3">
                  <button className="btn btn-outline-dark">
                    Google
                  </button>
                  <button className="btn btn-outline-primary">
                    Facebook
                  </button>
                </div>
              </div>
              
              <div className="mt-3 text-center">
                <Link to="/" className="text-decoration-none">
                  ← Вернуться на главную
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;