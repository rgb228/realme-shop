import React from "react";

const TestImages = () => {
  const images = [
    "/assets/foto/logo 2.png",
    "/assets/foto/bannerimage.png",
    "/assets/foto/categoryimage1.png",
    "/assets/foto/cateogoryimage2.png",
    "/assets/foto/cateogoryimage3.png",
    "/assets/foto/categoryimage4.png"
  ];

  return (
    <div className="container py-5">
      <h1>Проверка изображений</h1>
      <div className="row">
        {images.map((src, index) => (
          <div key={index} className="col-md-4 mb-3">
            <div className="card">
              <div className="card-body">
                <p>{src}</p>
                <img 
                  src={src} 
                  alt={`Test ${index}`}
                  style={{ width: "100%", height: "150px", objectFit: "contain" }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2Y4ZjlmYSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIiBmaWxsPSIjNjY2Ij5JbWFnZSBub3QgZm91bmQ8L3RleHQ+PC9zdmc+";
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestImages;
