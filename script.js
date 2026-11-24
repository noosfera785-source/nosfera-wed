// ==========================================
// 1. NAVEGACIÓN Y VISTAS
// ==========================================
window.cambiarVista = function(vistaId, elementoNav) {
  document.querySelectorAll(".ViewContainer").forEach(v => {
    v.classList.add("hidden");
  });
  
  const vistaActiva = document.getElementById(vistaId);
  if (vistaActiva) {
    vistaActiva.classList.remove("hidden");
  }

  if (elementoNav) {
    document.querySelectorAll(".nav-tab").forEach(t => {
      t.classList.remove("selected");
    });
    elementoNav.classList.add("selected");
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
};

document.addEventListener("DOMContentLoaded", () => {
  // Ocultar Loader inicial
  const loader = document.querySelector(".Loader");
  if (loader) {
    setTimeout(() => { loader.style.display = "none"; }, 600);
  }

  // ==========================================
  // 2. RENDERIZAR CONTENIDO DINÁMICO
  // ==========================================
  const shopifyGrid = document.getElementById("shopifyCatalogGrid");
  if (shopifyGrid) {
    shopifyGrid.innerHTML = `
      <div class="CatalogCard">
        <div class="CatalogCard-img" style="background-image: url('https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=800&q=80')">
          <span class="Catalog-tag">Moda & Ropa</span>
        </div>
        <div class="CatalogCard-info">
          <h4>Minimal Fashion</h4>
          <p>Filtros por talla y color, carrito deslizable.</p>
          <span style="color:#d8b4fe; font-weight:bold; font-size:0.85rem;">Precio: Variable según artículos</span>
        </div>
      </div>
      <div class="CatalogCard">
        <div class="CatalogCard-img" style="background-image: url('https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80')">
          <span class="Catalog-tag">Tecnología</span>
        </div>
        <div class="CatalogCard-info">
          <h4>Tech & Gadgets</h4>
          <p>Comparador técnico y diseño moderno.</p>
          <span style="color:#d8b4fe; font-weight:bold; font-size:0.85rem;">Precio: Variable según artículos</span>
        </div>
      </div>
    `;
  }

  const pagesGrid = document.getElementById("pagesGrid");
  if (pagesGrid) {
    pagesGrid.innerHTML = `
      <div class="CatalogCard">
        <div class="CatalogCard-img" style="background-image: url('https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80')">
          <span class="Catalog-tag">Web Independiente</span>
        </div>
        <div class="CatalogCard-info">
          <h4>Landing Page Corporativa</h4>
          <p>Sitio web ultrarrápido con formulario de contacto.</p>
          <span style="color:#d8b4fe; font-weight:bold; font-size:0.85rem;">Precio: Variable según proyecto</span>
        </div>
      </div>
    `;
  }

  // ==========================================
  // 3. BOTÓN DE CONTACTO DIRECTO
  // ==========================================
  const btnReveal = document.getElementById("btnRevealContact");
  const contactDetails = document.getElementById("contactDetails");
  if (btnReveal && contactDetails) {
    btnReveal.onclick = function() {
      contactDetails.classList.toggle("hidden");
      btnReveal.textContent = contactDetails.classList.contains("hidden")
        ? "Mostrar Contacto Directo"
        : "Ocultar Contacto";
    };
  }

  // Cargar datos de contacto guardados
  function loadContact() {
    const email = localStorage.getItem("contactEmail") || "sebastian178requena@gmail.com";
    const phone = localStorage.getItem("contactPhone") || "+58 400 000 0000";
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    const waUrl = `https://wa.me/${cleanPhone}`;

    const dispEmail = document.getElementById("displayContactEmail");
    const dispPhone = document.getElementById("displayContactPhone");
    const floatWa = document.getElementById("floatingWhatsappBtn");

    if (dispEmail) { dispEmail.textContent = email; dispEmail.href = `mailto:${email}`; }
    if (dispPhone) { dispPhone.textContent = phone; dispPhone.href = waUrl; }
    if (floatWa) { floatWa.href = waUrl; }
  }
  loadContact();

  // ==========================================
  // 4. AUTENTICACIÓN SEGURA (CONECTADA AL BACKEND)
  // ==========================================
  const openAdminLogin = document.getElementById("openAdminLogin");
  const ownerLoginModal = document.getElementById("ownerLoginModal");
  const closeOwnerLogin = document.getElementById("closeOwnerLogin");
  const ownerAuthForm = document.getElementById("ownerAuthForm");
  const openAdminModal = document.getElementById("openAdminModal");
  const adminModal = document.getElementById("adminModal");
  const closeAdminModal = document.getElementById("closeAdminModal");

  // Verificar si ya hay una sesión activa
  if (sessionStorage.getItem("isOwnerAuthenticated") === "true") {
    openAdminModal?.classList.remove("hidden");
    openAdminLogin?.classList.add("hidden");
  }

  openAdminLogin?.addEventListener("click", (e) => { 
    e.preventDefault(); 
    ownerLoginModal?.classList.remove("hidden"); 
  });
  
  closeOwnerLogin?.addEventListener("click", () => {
    ownerLoginModal?.classList.add("hidden");
  });

  // Envío del formulario validando con la función del servidor
  ownerAuthForm?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const passInput = document.getElementById("ownerPassInput");
    const password = passInput ? passInput.value.trim() : "";
    
    try {
      // Petición a la función serverless (en /api/login)
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });

      const data = await response.json();

      if (data.success) {
        sessionStorage.setItem("isOwnerAuthenticated", "true");
        ownerLoginModal?.classList.add("hidden");
        openAdminLogin?.classList.add("hidden");
        openAdminModal?.classList.remove("hidden");
        alert("¡Acceso seguro concedido!");
        if (passInput) passInput.value = "";
      } else {
        alert("Contraseña incorrecta.");
      }
    } catch (error) {
      console.error("Error de conexión:", error);
      alert("No se pudo conectar con el servidor de autenticación. Asegúrate de ejecutarlo en un entorno compatible (ej. Vercel o Live Server con backend).");
    }
  });

  openAdminModal?.addEventListener("click", (e) => { 
    e.preventDefault(); 
    adminModal?.classList.remove("hidden"); 
  });
  
  closeAdminModal?.addEventListener("click", () => {
    adminModal?.classList.add("hidden");
  });
});