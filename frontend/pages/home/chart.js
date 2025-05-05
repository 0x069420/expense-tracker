const ctx = document.getElementById('chart').getContext('2d');
const gasto = document.getElementById('btn-gasto');
const myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    datasets: [{
      label: 'Gasto diario (UYU)',
      data: [1200, 502, 339, 521, 602, 359, 1205],
      backgroundColor: ['#383838', '#666666', '#9b9b9b']
    }]
  }
});

const ptx = document.getElementById('chart-pie').getContext('2d');
new Chart(ptx, {
  type: 'pie',
  data: {
    labels: ['Comida', 'Transporte', 'Entretenimiento', 'Servicios', 'Otros'],
    datasets: [{
      data: [350, 100, 150, 200, 50],
      backgroundColor: [
        '#0d0d0d',
        '#383838',
        '#666666',
        '#9b9b9b',
        '#d3d3d3'
      ],
      borderWidth: 1
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false 
      },
      title: {
        display: true,
        text: 'Gastos por Categoría',
        color: '#fff'
      }
    }
  }
});



function mostrarPopup() {
  document.getElementById('popup').style.display = 'block';
}

function cerrarPopup() {
  document.getElementById('popup').style.display = 'none';
}

function enviarGasto() {
  const valor = document.getElementById('valorGasto').value;
  const tipo = document.getElementById('tipoGasto').value;

  fetch('http://localhost:5000/a/api/gastos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ valor, tipo })
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error('Error:', error);
  });

  cerrarPopup();
}

