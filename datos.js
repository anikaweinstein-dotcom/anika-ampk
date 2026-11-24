// ======= DATOS DEL CLIENTE =======
// Esto es lo único que se cambia. Lo demás arma la página solo.
window.DATOS = {
  cliente: "AMPK · Framingham Pharma",
  yo: "Anika Weinstein",
  titulo: "Contenido para redes",
  resumen: "Videos auténticos para TikTok e Instagram con mi experiencia real usando AMPK.",
  actualizado: "2026-11-23",
  colores: { marca: "#035CB8", acento: "#FFB4B6" },
  fuente: "Montserrat",
  contacto: "",

  logros: [
    { numero: "0", texto: "videos entregados" }
  ],

  objetivos: [
    { titulo: "Estilo propio de AMPK en video", detalle: "Azul y rojo de la caja de AMPK, Montserrat como Framingham.", estado: "curso", progreso: 30 },
    { titulo: "Primeros videos publicados", detalle: "", estado: "pendiente" }
  ],

  avances: [
    { fecha: "2026-11-23", titulo: "Arranque del proyecto", detalle: "Página de avances creada." }
  ],

  // ======= CRM DE INFLUENCERS (página "Influencers") =======
  moneda: "ARS",
  marcas: [
    { id: "ampk", nombre: "AMPK", color: "#035CB8" }
  ],

  // estado: "por-contactar" | "contactado" | "acepto" (dijo que sí) | "entregado" | "publico" | "no"
  // acuerdo: "canje" | "pago" | "canje-pago" | "producto"   ·   entrega: "local" | "delivery" | "envio"
  // La foto va en fotos/<usuario>.jpg (si no está, se ven las iniciales).
  influencers: [
    // {
    //   usuario: "usuario_de_instagram", nombre: "Nombre", seguidores: 12500, ciudad: "CABA", nicho: "Fitness",
    //   marcas: ["ampk"], estado: "contactado", contactado: "2026-11-20", via: "DM",
    //   acuerdo: "canje-pago", entrega: "delivery", fechaEntrega: "2026-11-22", enviado: ["AMPK x 60"], valorProducto: 59500,
    //   pagos: [ { fecha: "2026-11-22", monto: 50000, detalle: "1 reel + 3 historias" } ],
    //   publicaciones: [ { fecha: "2026-11-25", tipo: "Reel", link: "https://www.instagram.com/reel/...", vistas: 18000 } ],
    //   codigo: "SOFI10", ventas: 4, proximo: { texto: "Pedir métricas", fecha: "2026-12-01" },
    //   historial: [ { fecha: "2026-11-20", texto: "Primer DM" } ], notas: ""
    // }
  ],

  proximos: [
    "Definir el estilo de la marca",
    "Grabar y editar el primer video"
  ]
};
