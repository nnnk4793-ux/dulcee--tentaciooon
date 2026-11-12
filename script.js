// DATOS DEL EMPRENDIMIENTO: ya están configurados con tus datos reales.
    const BUSINESS = {
      email: "mendozacruzalejandro7@gmail.com",
      phoneDisplay: "+591 71856626",
      phoneInternational: "59171856626",
      address: "Parque de la Unión Nacional, Oruro, Bolivia",
      mapLink: "https://maps.app.goo.gl/CzhXWRqBCYHVcuJR8?g_st=ac"
    };

    let cart = [];

    // Coloca automáticamente tus datos en la página.
    document.getElementById("emailText").textContent = BUSINESS.email;
    document.getElementById("emailText").href = "mailto:" + BUSINESS.email;
    document.getElementById("phoneText").textContent = BUSINESS.phoneDisplay;
    document.getElementById("phoneText").href = "tel:+" + BUSINESS.phoneInternational;
    document.getElementById("callButton").href = "tel:+" + BUSINESS.phoneInternational;
    document.getElementById("whatsappButton").href =
      "https://wa.me/" + BUSINESS.phoneInternational +
      "?text=" + encodeURIComponent("¡Hola! Quisiera información sobre los productos de Dulce Tentación.");

    function showNotice(message) {
      const notice = document.getElementById("notice");
      notice.textContent = message;
      notice.classList.add("show");
      clearTimeout(window.noticeTimer);
      window.noticeTimer = setTimeout(() => notice.classList.remove("show"), 2600);
    }

    function addToCart(name, price) {
      const found = cart.find(item => item.name === name);
      if (found) found.quantity += 1;
      else cart.push({ name, price, quantity: 1 });
      renderCart();
      showNotice(name + " se agregó al carrito ♡");
    }

    function changeQuantity(name, amount) {
      const item = cart.find(product => product.name === name);
      if (!item) return;
      item.quantity += amount;
      if (item.quantity <= 0) cart = cart.filter(product => product.name !== name);
      renderCart();
    }

    function removeFromCart(name) {
      cart = cart.filter(product => product.name !== name);
      renderCart();
    }

    function renderCart() {
      const container = document.getElementById("cartItems");
      const totalElement = document.getElementById("cartTotal");

      if (cart.length === 0) {
        container.className = "cart-empty";
        container.textContent = "Tu carrito está vacío. ¡Agrega algo delicioso!";
        totalElement.textContent = "Total: Bs 0";
        return;
      }

      container.className = "";
      let total = 0;
      container.innerHTML = "";

      cart.forEach(item => {
        const subtotal = item.price * item.quantity;
        total += subtotal;

        const row = document.createElement("div");
        row.className = "cart-row";

        const description = document.createElement("div");
        description.textContent = item.name + " — Bs " + item.price + " cada uno";

        const controls = document.createElement("div");
        controls.className = "quantity-controls";

        const minus = document.createElement("button");
        minus.type = "button";
        minus.textContent = "−";
        minus.setAttribute("aria-label", "Disminuir cantidad");
        minus.addEventListener("click", () => changeQuantity(item.name, -1));

        const quantity = document.createElement("span");
        quantity.textContent = item.quantity;

        const plus = document.createElement("button");
        plus.type = "button";
        plus.textContent = "+";
        plus.setAttribute("aria-label", "Aumentar cantidad");
        plus.addEventListener("click", () => changeQuantity(item.name, 1));

        controls.append(minus, quantity, plus);

        const remove = document.createElement("button");
        remove.type = "button";
        remove.className = "remove-button";
        remove.textContent = "Eliminar";
        remove.addEventListener("click", () => removeFromCart(item.name));

        const subtotalText = document.createElement("strong");
        subtotalText.textContent = "Bs " + subtotal.toFixed(2).replace(".", ",");

        const last = document.createElement("div");
        last.append(subtotalText, document.createElement("br"), remove);

        row.append(description, controls, last);
        container.appendChild(row);
      });

      totalElement.textContent = "Total: Bs " + total.toFixed(2).replace(".", ",");
    }

    function sendOrder() {
      if (cart.length === 0) {
        showNotice("Tu carrito está vacío. Agrega un producto primero.");
        return;
      }

      const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
      const lines = cart.map(item =>
        "• " + item.name + " x " + item.quantity + " = Bs " + (item.price * item.quantity)
      );

      const message = [
        "¡Hola, Dulce Tentación! Quisiera realizar este pedido:",
        "",
        ...lines,
        "",
        "Total: Bs " + total.toFixed(2).replace(".", ","),
        "",
        "Mi nombre es: "
      ].join("\n");

      const whatsappURL = "https://wa.me/" + BUSINESS.phoneInternational +
        "?text=" + encodeURIComponent(message);
      window.open(whatsappURL, "_blank", "noopener");
    }

    document.getElementById("contactForm").addEventListener("submit", function(event) {
      event.preventDefault();

      const name = document.getElementById("customerName").value.trim();
      const customerEmail = document.getElementById("customerEmail").value.trim();
      const message = document.getElementById("customerMessage").value.trim();

      const subject = encodeURIComponent("Consulta desde la página Dulce Tentación");
      const body = encodeURIComponent(
        "Nombre: " + name + "\nCorreo del cliente: " + customerEmail +
        "\n\nMensaje:\n" + message
      );

      // Abre la aplicación de correo del visitante con el mensaje preparado.
      window.location.href = "mailto:" + BUSINESS.email +
        "?subject=" + subject + "&body=" + body;
    });

    // Si una foto externa no carga, se muestra un fondo cálido en lugar de un espacio roto.
    document.querySelectorAll("img").forEach(img => {
      img.addEventListener("error", function() {
        this.alt = "Imagen del producto Dulce Tentación";
        this.style.background = "linear-gradient(135deg, #f7d9c7, #8a5738)";
        this.style.minHeight = "180px";
      });
    });
