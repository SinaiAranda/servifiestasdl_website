// app.jsx
// Carga React desde el CDN (disponible globalmente como React/ReactDOM)
const { useMemo, useState, useEffect } = React;

// =====================
// ⚙️ Configuración
// =====================
const BUSINESS = {
  name: "Servifiestas DL",
  whatsapp: "+523111199990", // con código de país para WhatsApp
  phone: "591 00 74",
  address: "Calle Niños Héroes #78, Col. Lázaro Cárdenas, Tepic, Nayarit",
};

// Catálogo inicial (ejemplo) – puedes editar, agregar o quitar productos
const CATEGORIES = [
  // 1) SILLAS
  {
    id: "sillas",
    title: "Sillas",
    items: [
      { id: "silla-tiffany-acolchonada", name: "Silla Tiffany acolchonada", unit: "pieza" },
      { id: "silla-plegable", name: "Silla plegable", unit: "pieza" },
      { id: "silla-ring-dorada", name: "Silla Ring dorada", unit: "pieza" }, // si la manejas
    ],
  },

  // 2) MESAS
  {
    id: "mesas",
    title: "Mesas",
    items: [
      { id: "mesa-redonda", name: "Mesa redonda", unit: "pieza" },
      { id: "mesa-rectangular", name: "Mesa rectangular", unit: "pieza" },
      { id: "mesa-cuadrada", name: "Mesa cuadrada", unit: "pieza" },
      { id: "mesa-media-luna", name: "Mesa 1/2 luna", unit: "pieza" },
      { id: "mesa-alta-cocktail", name: "Mesa alta (cocktail)", unit: "pieza" },
    ],
  },

  // 3) MANTELERÍA
  {
    id: "manteleria",
    title: "Mantelería",
    items: [
      { id: "mantel-redondo", name: "Mantel redondo", unit: "pieza" },
      { id: "mantel-rectangular", name: "Mantel rectangular", unit: "pieza" },
      { id: "mantel-cuadrado", name: "Mantel cuadrado", unit: "pieza" },
      { id: "mantel-media-luna", name: "Mantel 1/2 luna", unit: "pieza" },
      { id: "bambalina-con-mantel", name: "Bambalina c/mantel", unit: "set" },
      { id: "camino-mesa", name: "Camino de mesa", unit: "pieza" },
      { id: "servilleta-tela", name: "Servilleta de tela", unit: "pieza" },
      { id: "forro-silla", name: "Forro de silla", unit: "pieza" },
      { id: "mono-para-silla", name: "Moño para silla", unit: "pieza" },
    ],
  },

  // 4) VAJILLAS (PLATOS / TAZA / TAZÓN)
  {
    id: "vajillas",
    title: "Vajillas",
    items: [
      { id: "plato-trinche", name: "Plato trinche", unit: "pieza" },
      { id: "plato-ensalada", name: "Plato de ensalada", unit: "pieza" },
      { id: "plato-postre", name: "Plato de postre", unit: "pieza" },
      { id: "plato-cafe", name: "Plato para café", unit: "pieza" },
      { id: "tazon-sopa", name: "Tazón", unit: "pieza" },
      { id: "taza-cafe", name: "Taza de café", unit: "pieza" },
      { id: "bajo-plato", name: "Base para plato trinche (bajo plato)", unit: "pieza" },
    ],
  },

  // 5) CRISTALERÍA (COPAS / VASOS)
  {
    id: "cristaleria",
    title: "Cristalería",
    items: [
      { id: "copa-vino", name: "Copa para vino", unit: "pieza" },
      { id: "copa-champagne", name: "Copa para champagne", unit: "pieza" },
      { id: "copa", name: "Copa (multiuso)", unit: "pieza" },
      { id: "vaso-old-fashioned", name: "Vaso cubero (old fashioned)", unit: "pieza" },
      { id: "vaso-highball", name: "Vaso highball", unit: "pieza" },
      { id: "vaso", name: "Vaso (estándar)", unit: "pieza" },
      { id: "hielera-mesa", name: "Hielera de mesa", unit: "pieza" },
      { id: "hielera-grande", name: "Hielera grande", unit: "pieza" },
      { id: "cenicero", name: "Cenicero", unit: "pieza" },
    ],
  },

  // 6) CUCHILLERÍA
  {
    id: "cuchilleria",
    title: "Cuchillería",
    items: [
      { id: "tenedor-mesa", name: "Tenedor de mesa", unit: "pieza" },
      { id: "cuchillo-mesa", name: "Cuchillo de mesa", unit: "pieza" },
      { id: "cuchara-sopera", name: "Cuchara sopera", unit: "pieza" },
      { id: "cuchara-cafetera", name: "Cuchara cafetera", unit: "pieza" },
    ],
  },

  // 7) TOLDOS Y CARPAS
  {
    id: "toldos",
    title: "Toldos y carpas",
    items: [
      { id: "toldo-3x3", name: "Toldo 3×3 m", unit: "pieza" },
      { id: "toldo-3x6", name: "Toldo 3×6 m", unit: "pieza" },
      { id: "toldo-5x5", name: "Toldo 5×5 m", unit: "pieza" },
      { id: "toldo-6x6", name: "Toldo 6×6 m", unit: "pieza" },
      { id: "toldo-6x9", name: "Toldo 6×9 m", unit: "pieza" },
      { id: "toldo-9x12", name: "Toldo 9×12 m", unit: "pieza" },
      // Si manejas otros: 10×10, 10×20, etc.
      { id: "pabellon-decorativo", name: "Pabellón decorativo", unit: "pieza" },
      { id: "templete", name: "Templete", unit: "módulo" },
    ],
  },

  // 8) CIELOS Y CORTINAS
  {
    id: "cielos-cortinas",
    title: "Cielos y cortinas",
    items: [
      { id: "cielo-3x3", name: "Cielo 3×3 m", unit: "pieza" },
      { id: "cielo-3x6", name: "Cielo 3×6 m", unit: "pieza" },
      { id: "cielo-5x5", name: "Cielo 5×5 m", unit: "pieza" },
      { id: "cielo-6x6", name: "Cielo 6×6 m", unit: "pieza" },
      { id: "cielo-9x12", name: "Cielo 9×12 m", unit: "pieza" },
      { id: "cielo-10x10", name: "Cielo 10×10 m", unit: "pieza" },
      { id: "cielo-10x20", name: "Cielo 10×20 m", unit: "pieza" },
      { id: "cortina-6", name: "Cortina 6 m", unit: "pieza" },
      { id: "cortina-9", name: "Cortina 9 m", unit: "pieza" },
      { id: "cortina-12", name: "Cortina 12 m", unit: "pieza" },
    ],
  },

  // 9) SALAS / LOUNGE
  {
    id: "salas",
    title: "Salas lounge",
    items: [
      { id: "sala-lounge-blanca", name: "Sala lounge blanca", unit: "set" },
      { id: "sillon-reina-trono", name: "Sillón reina / trono", unit: "pieza" },
    ],
  },

  // 10) ACCESORIOS Y SERVICIOS
  {
    id: "accesorios",
    title: "Accesorios y servicios",
    items: [
      { id: "centro-mesa", name: "Centro de mesa", unit: "pieza" },
      { id: "iluminacion-ambiental", name: "Iluminación ambiental", unit: "servicio" },
      { id: "pista-baile", name: "Pista de baile", unit: "módulo" },
      { id: "rockola", name: "Rockola", unit: "servicio" },
      { id: "brincolin", name: "Brincolín", unit: "servicio" },
      { id: "meseros", name: "Meseros", unit: "servicio" },
    ],
  },

  // 11) BANQUETES / TAQUIZAS (si lo manejas)
  {
    id: "banquetes",
    title: "Banquetes / Taquizas",
    items: [
      { id: "banquete", name: "Servicio de banquete", unit: "servicio" },
      { id: "taquiza", name: "Servicio de taquiza", unit: "servicio" },
    ],
  },
];

// =====================
// 🧠 Utilidades
// =====================
const cls = (...s) => s.filter(Boolean).join(" ");

const useCart = () => {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem("servifiestas-cart");
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem("servifiestas-cart", JSON.stringify(items));
  }, [items]);

  const add = (product, qty = 1) => {
    setItems((prev) => {
      const next = { ...prev };
      next[product.id] = {
        ...(prev[product.id] || { ...product, qty: 0 }),
        qty: (prev[product.id]?.qty || 0) + qty,
      };
      return next;
    });
  };

  const update = (id, qty) => {
    setItems((prev) => {
      const next = { ...prev };
      if (qty <= 0) delete next[id];
      else next[id] = { ...next[id], qty };
      return next;
    });
  };

  const clear = () => setItems({});

  const list = useMemo(() => Object.values(items), [items]);

  return { items, list, add, update, clear };
};

// =====================
// 🎯 Componentes
// =====================
function App() {
  const cart = useCart();
  const [active, setActive] = useState("inicio");

  // Datos de cotización
  const [customer, setCustomer] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventPlace, setEventPlace] = useState("");

  const goto = (id) => setActive(id);

  const whatsAppLink = useMemo(() => {
    const lines = [
      `*${BUSINESS.name}* – Solicitud de cotización`,
      customer && `Nombre: ${customer}`,
      eventDate && `Fecha del evento: ${eventDate}`,
      eventPlace && `Lugar: ${eventPlace}`,
      "",
      "*Artículos solicitados:*",
      ...cart.list.map((x, i) => `${i + 1}. ${x.name} – ${x.qty} ${x.unit || ""}`),
      "",
      `📍 ${BUSINESS.address}`,
      `📞 ${BUSINESS.phone}`,
    ]
      .filter(Boolean)
      .join("\n");

    const encoded = encodeURIComponent(lines);
    return `https://wa.me/${BUSINESS.whatsapp.replace('+','')}?text=${encoded}`;
  }, [cart.list, customer, eventDate, eventPlace]);

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">

      <div className="max-w-6xl mx-auto px-4 flex justify-center">
        <img src="./assets/full_logo.png" alt="Evento Servifiestas DL" className="w-1/4 h-auto"/>
      </div>

      <header className="sticky top-0 z-50 backdrop-blur bg-white/70 border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col items-center">
          <nav className="flex gap-3 justify-center flex-wrap">
            {[
              ["inicio", "Inicio"],
              ["galeria", "Galería"],
              ["catalogo", "Catálogo"],
              ["cotizacion", "Cotización"],
              ["contacto", "Contacto"],
            ].map(([id, label]) => (
              <button
                key={id}
                onClick={() => goto(id)}
                className={cls(
                  "px-3 py-2 rounded-xl text-sm font-medium",
                  active === id
                    ? "bg-neutral-900 text-white"
                    : "hover:bg-neutral-100"
                )}
              >
                {label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Contenido */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {active === "inicio" && <Inicio />}
        {active === "galeria" && <Galeria />}
        {active === "catalogo" && <Catalogo cart={cart} />}
        {active === "cotizacion" && (
          <Cotizacion
            cart={cart}
            customer={customer}
            setCustomer={setCustomer}
            eventDate={eventDate}
            setEventDate={setEventDate}
            eventPlace={eventPlace}
            setEventPlace={setEventPlace}
            whatsAppLink={whatsAppLink}
          />
        )}
        {active === "contacto" && <Contacto />}
      </main>

      <footer className="border-t border-neutral-200 py-6 text-center text-sm text-neutral-500">
        © {new Date().getFullYear()} {BUSINESS.name}. Todos los derechos reservados.
      </footer>
    </div>
  );
}

function Inicio() {
  return (
    <section className="grid md:grid-cols-2 gap-8 items-center">
      <div>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
          Todo para tu evento en un solo lugar
        </h1>
        <p className="mt-4 text-neutral-700 leading-relaxed">
          En <strong>Servifiestas DL</strong> nos especializamos en la renta de mobiliario
          y ambientación para todo tipo de eventos: bodas, XV años, cumpleaños, y
          corporativos. Ofrecemos sillas, mesas, mantelería, cristalería, vajillas,
          cuchillería, salas lounge, toldos y carpas, además de accesorios para que tu
          celebración luzca impecable.
        </p>
        <ul className="mt-6 grid gap-2 text-neutral-700">
          <li>• Entrega, instalación y recolección puntuales</li>
          <li>• Amplia variedad de colores y estilos</li>
          <li>• Atención personalizada y cotización por WhatsApp</li>
        </ul>
      </div>
      <div className="relative w-full h-64 md:h-80 rounded-2xl bg-gradient-to-br from-fuchsia-500 via-rose-400 to-amber-300 shadow-xl">
        <img src="./assets/image_2.jpeg" alt="Evento Servifiestas" className="w-full h-99 object-cover"/>
      </div>
    </section>
  );
}

function Galeria() {
  // 5 imágenes de muestra (puedes reemplazar por tus URLs o subirlas a tu hosting)
  const images = [
    "./assets/gallery_1.jpeg",
    "./assets/gallery_2.jpeg",
    "./assets/gallery_3.jpeg",
    "./assets/gallery_4.jpeg",
    "./assets/gallery_5.jpeg",
  ];

  return (
    <section id="galeria">
      <h2 className="text-2xl font-bold mb-4">Galería</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`Evento ${i + 1}`}
            className="w-full h-44 object-cover rounded-xl shadow"
            loading="lazy"
          />
        ))}
      </div>
    </section>
  );
}

function Catalogo({ cart }) {
  const [query, setQuery] = useState("");
  const [added, setAdded] = useState(null); // estado para la animación ✔

  const filtered = useMemo(() => {
    if (!query) return CATEGORIES;
    const q = query.toLowerCase();
    return CATEGORIES.map((c) => ({
      ...c,
      items: c.items.filter((it) => it.name.toLowerCase().includes(q)),
    }));
  }, [query]);

  // función que agrega + muestra animación
  const handleAdd = (item, qty = 1) => {
    cart.add(item, qty);
    setAdded(item.id);
    setTimeout(() => setAdded(null), 1000); // ✔ desaparece en 1s
  };

  return (
    <section id="catalogo">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
        <h2 className="text-2xl font-bold">Catálogo</h2>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar productos..."
          className="w-full md:w-80 px-3 py-2 rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-900"
        />
      </div>

      <div className="grid gap-8">
        {filtered.map((cat) => (
          <div key={cat.id}>
            <h3 className="text-xl font-semibold mb-3">{cat.title}</h3>
            {cat.items.length === 0 ? (
              <div className="text-neutral-500 text-sm">Sin resultados</div>
            ) : (
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                {cat.items.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 bg-white rounded-2xl border border-neutral-200 shadow-sm hover:shadow-md transition relative"
                  >
                    <div className="h-28 mb-3 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-400 text-sm">
                      Imagen del producto
                    </div>
                    <div className="font-medium">{item.name}</div>
                    <div className="text-xs text-neutral-500">Unidad: {item.unit}</div>
                    <div className="mt-3 flex items-center gap-2 relative">
                      <button
                        onClick={() => handleAdd(item, 1)}
                        className="px-3 py-2 rounded-xl bg-neutral-900 text-white text-sm relative"
                      >
                        Agregar
                      </button>
                      <button
                        onClick={() => handleAdd(item, 5)}
                        className="px-3 py-2 rounded-xl border border-neutral-300 text-sm"
                      >
                        +5
                      </button>

                      {/* Animación ✔ */}
                      {added === item.id && (
                        <span className="absolute -right-8 text-green-600 text-xl animate-bounce">
                          ✔
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function Cotizacion({ cart, customer, setCustomer, eventDate, setEventDate, eventPlace, setEventPlace, whatsAppLink }) {
  return (
    <section id="cotizacion">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
        <h2 className="text-2xl font-bold">Cotización</h2>
        <button onClick={cart.clear} className="px-3 py-2 rounded-xl border border-neutral-300 text-sm">
          Vaciar lista
        </button>
      </div>

      {cart.list.length === 0 ? (
        <div className="text-neutral-500">Tu carrito está vacío. Agrega artículos desde el catálogo.</div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-neutral-500 border-b">
                  <th className="py-2">Producto</th>
                  <th className="py-2 w-28">Cantidad</th>
                  <th className="py-2 w-16">Quitar</th>
                </tr>
              </thead>
              <tbody>
                {cart.list.map((x) => (
                  <tr key={x.id} className="border-b last:border-0">
                    <td className="py-3 pr-3">
                      <div className="font-medium">{x.name}</div>
                      <div className="text-xs text-neutral-500">{x.unit}</div>
                    </td>
                    <td className="py-3">
                      <input
                        type="number"
                        min={0}
                        value={x.qty}
                        onChange={(e) => cart.update(x.id, Number(e.target.value))}
                        className="w-24 px-2 py-1 rounded-lg border border-neutral-300"
                      />
                    </td>
                    <td className="py-3">
                      <button
                        onClick={() => cart.update(x.id, 0)}
                        className="px-2 py-1 rounded-lg border border-neutral-300"
                      >
                        ✕
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <aside className="p-4 rounded-2xl border border-neutral-200 bg-white shadow-sm">
            <h3 className="font-semibold mb-3">Datos para tu cotización</h3>
            <div className="grid gap-3">
              <input
                value={customer}
                onChange={(e) => setCustomer(e.target.value)}
                placeholder="Tu nombre"
                className="px-3 py-2 rounded-xl border border-neutral-300"
              />
              <input
                type="date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                className="px-3 py-2 rounded-xl border border-neutral-300"
              />
              <input
                value={eventPlace}
                onChange={(e) => setEventPlace(e.target.value)}
                placeholder="Lugar del evento"
                className="px-3 py-2 rounded-xl border border-neutral-300"
              />
              <a
                href={whatsAppLink}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-emerald-600 text-white font-medium hover:bg-emerald-700"
              >
                Enviar por WhatsApp
              </a>
              <p className="text-xs text-neutral-500">
                Se abrirá WhatsApp con tu lista de artículos y datos. Nuestro número: {BUSINESS.whatsapp}
              </p>
            </div>
          </aside>
        </div>
      )}
    </section>
  );
}

function Contacto() {
  return (
    <section id="contacto" className="grid md:grid-cols-2 gap-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">Contacto</h2>
        <p className="text-neutral-700">
          ¡Será un gusto atenderte! Escríbenos o visítanos para conocer todo nuestro
          catálogo y opciones de montaje.
        </p>
        <div className="mt-4 grid gap-2 text-neutral-800">
          <div>🕙 <strong>Horario de Atención:</strong> 10:00 am a 21:00 pm </div>
          <div>📍 <strong>Dirección:</strong> {BUSINESS.address}</div>
          <div>📞 <strong>Teléfono:</strong> {BUSINESS.phone}</div>
          <div>
            💬 <strong>WhatsApp:</strong>{" "}
            <a className="underline" href={`https://wa.me/${BUSINESS.whatsapp.replace('+','')}`} target="_blank" rel="noreferrer">
              {BUSINESS.whatsapp}
            </a>
          </div>
        </div>
      </div>
      <div className="rounded-2xl border border-neutral-200 bg-white shadow-sm p-4">
        <div className="aspect-video w-full rounded-xl overflow-hidden shadow">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2544.3682776919477!2d-104.88578174559088!3d21.479017764048145!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x842737307495f1e5%3A0x4710f96e83ddf5fb!2sServifiestas%20DL!5e0!3m2!1ses!2smx!4v1756266646721!5m2!1ses!2smx" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  );
}

// Montar la app en #root
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
