// Funcionalidades para la página de microfinanzas

document.addEventListener('DOMContentLoaded', function() {
  
  // ========== SIMULADOR DE CRÉDITOS ==========
  const formSimulador = document.getElementById('formSimulador');
  const productoSelect = document.getElementById('productoSelect');
  const montoInput = document.getElementById('monto');
  const tasaInput = document.getElementById('tasa');
  const mesesInput = document.getElementById('meses');
  
  // Actualizar valores cuando se selecciona un producto
  productoSelect.addEventListener('change', function() {
    if (this.value) {
      const [montoMax, tasaDefault, plazoMax] = this.value.split(',').map(Number);
      montoInput.max = montoMax;
      montoInput.placeholder = `Hasta S/ ${montoMax.toLocaleString()}`;
      tasaInput.value = tasaDefault;
      mesesInput.max = plazoMax;
      mesesInput.placeholder = `Hasta ${plazoMax} meses`;
    }
  });
  
  // Simular crédito
  formSimulador.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const monto = parseFloat(montoInput.value);
    const tasa = parseFloat(tasaInput.value);
    const meses = parseInt(mesesInput.value);
    
    if (!monto || !tasa || !meses) {
      alert('Por favor, complete todos los campos');
      return;
    }
    
    // Cálculo de cuota mensual (sistema francés)
    const tasaMensual = tasa / 100 / 12;
    const cuota = monto * (tasaMensual * Math.pow(1 + tasaMensual, meses)) / (Math.pow(1 + tasaMensual, meses) - 1);
    const totalPagar = cuota * meses;
    
    // Mostrar resultados
    document.getElementById('cuota').textContent = `S/ ${cuota.toFixed(2)}`;
    document.getElementById('montoResultado').textContent = `S/ ${monto.toLocaleString()}`;
    document.getElementById('totalPagar').textContent = `S/ ${totalPagar.toFixed(2)}`;
    document.getElementById('tasaResultado').textContent = `${tasa}%`;
    document.getElementById('plazoResultado').textContent = `${meses} meses`;
    
    // Scroll suave a resultados
    document.getElementById('simulador').scrollIntoView({ behavior: 'smooth' });
  });
  
  // ========== MAPA INTERACTIVO ==========
  const marcadores = document.querySelectorAll('.sucursal-marker');
  const infoSucursal = document.getElementById('sucursal-info');
  const detallesSucursales = document.querySelectorAll('.sucursal-details');
  
  marcadores.forEach(marcador => {
    marcador.addEventListener('click', function() {
      const sucursal = this.getAttribute('data-sucursal').toLowerCase();
      
      // Ocultar todos los detalles
      detallesSucursales.forEach(detalle => {
        detalle.classList.add('d-none');
      });
      
      // Mostrar detalles de la sucursal seleccionada
      const detalleSucursal = document.getElementById(`sucursal-${sucursal}`);
      if (detalleSucursal) {
        detalleSucursal.classList.remove('d-none');
        infoSucursal.classList.add('d-none');
      }
      
      // Animación de clic en el marcador
      const punto = this.querySelector('.marker-point');
      punto.style.fill = '#0d6efd';
      setTimeout(() => {
        punto.style.fill = '#198754';
      }, 300);
    });
  });
  
  // ========== NAVEGACIÓN SUAVE ==========
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const offsetTop = targetElement.offsetTop - 80; // Ajuste para navbar fijo
        
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // ========== ANIMACIONES AL SCROLL ==========
  const elementosAnimados = document.querySelectorAll('.card, .table');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });
  
  elementosAnimados.forEach(elemento => {
    elemento.style.opacity = 0;
    elemento.style.transform = 'translateY(20px)';
    elemento.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(elemento);
  });
  
  // ========== FORMULARIO DE CONTACTO ==========
  const formContacto = document.getElementById('formContacto');
  
  if (formContacto) {
    formContacto.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Simulación de envío exitoso
      const boton = this.querySelector('button[type="submit"]');
      const textoOriginal = boton.textContent;
      
      boton.textContent = 'Enviando...';
      boton.disabled = true;
      
      setTimeout(() => {
        alert('¡Gracias por tu consulta! Un asesor se comunicará contigo pronto.');
        formContacto.reset();
        boton.textContent = textoOriginal;
        boton.disabled = false;
      }, 2000);
    });
  }
  
  // ========== BOTONES DE SIMULACIÓN EN TABLA ==========
  document.querySelectorAll('.simular-btn').forEach(boton => {
    boton.addEventListener('click', function() {
      const producto = this.getAttribute('data-producto');
      
      // Configurar valores según el producto
      let montoMax, tasaDefault, plazoMax;
      
      switch(producto) {
        case 'Microcrédito Emprendedor':
          montoMax = 20000;
          tasaDefault = 30;
          plazoMax = 24;
          break;
        case 'Capital de Trabajo':
          montoMax = 50000;
          tasaDefault = 28;
          plazoMax = 36;
          break;
        case 'Mejoras del Negocio':
          montoMax = 80000;
          tasaDefault = 25;
          plazoMax = 48;
          break;
      }
      
      // Establecer valores en el simulador
      montoInput.value = Math.round(montoMax * 0.6); // 60% del monto máximo
      tasaInput.value = tasaDefault;
      mesesInput.value = Math.round(plazoMax * 0.7); // 70% del plazo máximo
      
      // Hacer scroll al simulador
      document.getElementById('simulador').scrollIntoView({ behavior: 'smooth' });
    });
  });
  
  // ========== CONFIGURACIÓN DE LIGHTBOX ==========
  if (typeof lightbox !== 'undefined') {
    lightbox.option({
      'resizeDuration': 200,
      'wrapAround': true,
      'imageFadeDuration': 300,
      'positionFromTop': 100
    });
  }
});