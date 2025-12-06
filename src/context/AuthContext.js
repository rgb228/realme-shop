import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("realme_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && password.length >= 6) {
          const mockUser = {
            id: 1,
            email,
            name: email.split("@")[0],
            phone: "+62 812-3456-7890",
            address: "Jakarta, Indonesia",
            orders: 3,
            cartItems: 2,
            points: 150,
            recentOrders: [
              { id: "ORD-001", total: 5999000, date: "2024-01-15", status: "Доставлен" },
              { id: "ORD-002", total: 1898000, date: "2024-01-10", status: "В обработке" }
            ]
          };
          
          setUser(mockUser);
          localStorage.setItem("realme_user", JSON.stringify(mockUser));
          resolve();
        } else {
          reject(new Error("Неверные учетные данные"));
        }
      }, 1000);
    });
  };

  const register = async (email, password, name) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && password.length >= 6 && name) {
          const newUser = {
            id: Date.now(),
            email,
            name,
            phone: "",
            address: "",
            orders: 0,
            cartItems: 0,
            points: 50,
            recentOrders: []
          };
          
          setUser(newUser);
          localStorage.setItem("realme_user", JSON.stringify(newUser));
          resolve();
        } else {
          reject(new Error("Пожалуйста, заполните все поля"));
        }
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("realme_user");
  };

  const updateProfile = (updatedData) => {
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    localStorage.setItem("realme_user", JSON.stringify(updatedUser));
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
