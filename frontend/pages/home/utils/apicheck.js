fetch('http://localhost:5000/api/check-db')
      .then(response => response.json())
      .then(data => {
        const statusElement = document.getElementById('dbStatus');
        if (data.message === 'Conexión a MongoDB exitosa') {
          statusElement.textContent = 'Conexion exitosa';
          statusElement.style.display = 'block';
          setTimeout(() => {
            statusElement.style.display = 'none';
          }, 3000);
        
        } else {
          statusElement.textContent = 'Error al conectar a la base de datos.';
          statusElement.style.color = 'red';
        }
      });