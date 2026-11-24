// Dibuja el CRM de influencers con lo que hay en datos.js (marcas + influencers). No hace falta tocar este archivo.
(function () {
  var d = window.DATOS || {};
  var $ = function (id) { return document.getElementById(id); };
  var esc = function (s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };
  var okUrl = function (u) { return /^https?:\/\//.test(u || ""); };

  // ---------- Colores y fuente ----------
  var c = d.colores || {}, r = document.documentElement.style;
  if (c.marca) r.setProperty("--marca", c.marca);
  if (c.acento) r.setProperty("--acento", c.acento);
  if (d.fuente) {
    var l = document.createElement("link");
    l.rel = "stylesheet";
    l.href = "https://fonts.googleapis.com/css2?family=" + encodeURIComponent(d.fuente) + ":wght@400;500;700;800&display=swap";
    document.head.appendChild(l);
    r.setProperty("--fuente", "'" + d.fuente + "', system-ui, sans-serif");
  }
  document.title = "Influencers · " + (d.cliente || "") ;
  $("nav-marca").textContent = d.cliente || "";

  // ---------- Formatos ----------
  var MES = ["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic"];
  var MESL = ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"];
  var parse = function (iso) { var p = String(iso || "").split("-"); return p.length === 3 ? new Date(+p[0], +p[1] - 1, +p[2]) : null; };
  var fcorta = function (iso) { var t = parse(iso); return t ? t.getDate() + " " + MES[t.getMonth()] + " " + String(t.getFullYear()).slice(2) : esc(iso || "—"); };
  var plata = function (n) {
    try { return new Intl.NumberFormat("es-AR", { style: "currency", currency: d.moneda || "ARS", maximumFractionDigits: 0 }).format(n || 0); }
    catch (e) { return "$" + Math.round(n || 0).toLocaleString("es-AR"); }
  };
  var plataCorta = function (n) {
    if (n >= 1e6) return "$ " + (n / 1e6).toLocaleString("es-AR", { maximumFractionDigits: 1 }) + " M";
    if (n >= 1e3) return "$ " + Math.round(n / 1e3).toLocaleString("es-AR") + " mil";
    return "$ " + Math.round(n);
  };
  var segs = function (n) {
    n = +n || 0;
    if (n >= 1e6) return (n / 1e6).toLocaleString("es-AR", { maximumFractionDigits: 1 }) + " M";
    if (n >= 1e3) return (n / 1e3).toLocaleString("es-AR", { maximumFractionDigits: 1 }) + " mil";
    return String(n);
  };
  var pct = function (a, b) { return b ? Math.round(a * 100 / b) + "%" : "—"; };

  // ---------- Datos ----------
  var MARCAS = d.marcas || [];
  var marcaDe = {}; MARCAS.forEach(function (m) { marcaDe[m.id] = m; });
  var colorMarca = function (id) { return (marcaDe[id] && marcaDe[id].color) || "#888"; };
  var nombreMarca = function (id) { return (marcaDe[id] && marcaDe[id].nombre) || id; };

  var ESTADOS = [
    ["por-contactar", "Por contactar"],
    ["contactado", "Contactado"],
    ["acepto", "Dijo que sí"],
    ["entregado", "Producto entregado"],
    ["publico", "Publicó"],
    ["no", "Dijo que no"]
  ];
  var ESTADO = {}; ESTADOS.forEach(function (e) { ESTADO[e[0]] = e[1]; });
  var ACUERDO = { canje: "Canje", pago: "Pago", "canje-pago": "Canje + pago", producto: "Solo producto" };
  var ENTREGA = { local: "Vino al local", delivery: "Delivery", envio: "Envío por correo" };

  var INF = (d.influencers || []).map(function (x) {
    x.usuario = String(x.usuario || "").replace(/^@/, "").trim();
    x.marcas = x.marcas || [];
    x.pagos = x.pagos || [];
    x.publicaciones = x.publicaciones || [];
    x.enviado = x.enviado || [];
    if (!ESTADO[x.estado]) x.estado = "por-contactar";
    x._pagado = x.pagos.reduce(function (s, p) { return s + (+p.monto || 0); }, 0);
    return x;
  });
  var dijoSi = function (x) { return x.estado === "acepto" || x.estado === "entregado" || x.estado === "publico"; };
  var contactado = function (x) { return x.estado !== "por-contactar"; };
  var entregado = function (x) { return x.estado === "entregado" || x.estado === "publico"; };
  var publico = function (x) { return x.estado === "publico" || x.publicaciones.length > 0; };

  // ---------- Estado de la vista ----------
  var filtroMarca = "todas", filtroEstado = "todos", q = "", orden = "reciente", vistaGasto = "mes";
  var sel = decodeURIComponent(location.hash.slice(1));

  var deMarca = function (x) { return filtroMarca === "todas" || x.marcas.indexOf(filtroMarca) >= 0; };
  var pagosVisibles = function () {
    var out = [];
    INF.filter(deMarca).forEach(function (x) {
      x.pagos.forEach(function (p) {
        if (filtroMarca !== "todas" && p.marca && p.marca !== filtroMarca) return;
        out.push({ fecha: p.fecha, monto: +p.monto || 0, x: x });
      });
    });
    return out;
  };

  // ---------- KPIs ----------
  function kpis() {
    var L = INF.filter(deMarca);
    var cont = L.filter(contactado), si = L.filter(dijoSi), pub = L.filter(publico);
    var segSi = si.reduce(function (s, x) { return s + (+x.seguidores || 0); }, 0);
    var segTodos = L.reduce(function (s, x) { return s + (+x.seguidores || 0); }, 0);
    var nPubs = L.reduce(function (s, x) { return s + x.publicaciones.length; }, 0);
    var vistas = L.reduce(function (s, x) { return s + x.publicaciones.reduce(function (a, p) { return a + (+p.vistas || 0); }, 0); }, 0);
    var P = pagosVisibles();
    var total = P.reduce(function (s, p) { return s + p.monto; }, 0);
    var hoy = new Date(), esteMes = P.filter(function (p) { var t = parse(p.fecha); return t && t.getMonth() === hoy.getMonth() && t.getFullYear() === hoy.getFullYear(); })
      .reduce(function (s, p) { return s + p.monto; }, 0);
    var producto = L.reduce(function (s, x) { return s + (+x.valorProducto || 0); }, 0);

    var k = [
      { n: cont.length, l: "Influencers contactados", s: "de " + L.length + " en la lista", main: true },
      { n: si.length, l: "Dijeron que sí", s: "Tasa de respuesta: " + pct(si.length, cont.length) },
      { n: pub.length, l: "Publicaron", s: nPubs + (nPubs === 1 ? " publicación" : " publicaciones") + (vistas ? " · " + segs(vistas) + " vistas" : "") },
      { n: segs(segSi), l: "Seguidores de los que dijeron sí", s: "Toda la lista: " + segs(segTodos) },
      { n: plataCorta(total), l: "Gastado en influencers", s: "Este mes: " + plata(esteMes) + (producto ? " · en producto: " + plata(producto) : "") },
      { n: segSi && total ? plata(total / segSi * 1000) : "—", l: "Costo cada 1.000 seguidores", s: "Gasto ÷ seguidores de los que dijeron sí" }
    ];
    $("kpis").innerHTML = k.map(function (x) {
      return '<div class="kpi' + (x.main ? " main" : "") + '"><div class="k-num">' + esc(x.n) + '</div><div class="k-lbl">' + esc(x.l) +
        '</div><div class="k-sub">' + esc(x.s) + "</div></div>";
    }).join("");

    // Embudo
    var f = [
      ["En la lista", L.length], ["Contactados", cont.length], ["Dijeron que sí", si.length],
      ["Producto entregado", L.filter(entregado).length], ["Publicaron", pub.length], ["Dijeron que no", L.filter(function (x) { return x.estado === "no"; }).length]
    ];
    var max = Math.max(1, L.length);
    $("funnel").innerHTML = f.map(function (r, i) {
      return '<div class="f-row"><span>' + r[0] + '</span><div class="f-bar"><span style="width:' + (r[1] * 100 / max) + "%" +
        (i === 5 ? ";background:#c9504e" : "") + '"></span></div><span class="f-num">' + r[1] + "</span></div>";
    }).join("");
  }

  // ---------- Gasto por mes / semana ----------
  function lunes(t) { var x = new Date(t); var w = (x.getDay() + 6) % 7; x.setDate(x.getDate() - w); x.setHours(0, 0, 0, 0); return x; }
  function gasto() {
    var P = pagosVisibles(), hoy = new Date(), cols = [];
    if (vistaGasto === "mes") {
      for (var i = 5; i >= 0; i--) {
        var m = new Date(hoy.getFullYear(), hoy.getMonth() - i, 1);
        cols.push({ lbl: MES[m.getMonth()] + " " + String(m.getFullYear()).slice(2), cur: i === 0,
          test: (function (m) { return function (t) { return t.getMonth() === m.getMonth() && t.getFullYear() === m.getFullYear(); }; })(m) });
      }
    } else {
      var L0 = lunes(hoy);
      for (var j = 7; j >= 0; j--) {
        var a = new Date(L0); a.setDate(a.getDate() - 7 * j);
        var b = new Date(a); b.setDate(b.getDate() + 7);
        cols.push({ lbl: a.getDate() + " " + MES[a.getMonth()], cur: j === 0,
          test: (function (a, b) { return function (t) { return t >= a && t < b; }; })(a, b) });
      }
    }
    cols.forEach(function (col) {
      col.v = P.reduce(function (s, p) { var t = parse(p.fecha); return s + (t && col.test(t) ? p.monto : 0); }, 0);
    });
    var max = Math.max.apply(null, cols.map(function (x) { return x.v; }));
    if (!max) {
      $("spend").innerHTML = '<p class="empty-mini">Todavía no hay pagos cargados.</p>';
    } else {
      $("spend").innerHTML = cols.map(function (col) {
        return '<div class="s-col" title="' + esc(col.lbl + ": " + plata(col.v)) + '"><span class="s-val">' + (col.v ? plataCorta(col.v) : "") +
          '</span><div class="s-bar' + (col.cur ? " cur" : "") + '" style="height:' + (col.v / max * 100) + '%"></div><span class="s-lbl">' + col.lbl + "</span></div>";
      }).join("");
    }
    // Por tipo de acuerdo
    var por = {};
    P.forEach(function (p) { var k = ACUERDO[p.x.acuerdo] || "Sin definir"; por[k] = (por[k] || 0) + p.monto; });
    var semana = P.filter(function (p) { var t = parse(p.fecha); return t && t >= lunes(hoy); }).reduce(function (s, p) { return s + p.monto; }, 0);
    $("spend-split").innerHTML = '<span>Esta semana: <b>' + plata(semana) + "</b></span>" +
      Object.keys(por).map(function (k) { return "<span>" + esc(k) + ": <b>" + plata(por[k]) + "</b></span>"; }).join("");
  }
  [].forEach.call($("spend-seg").querySelectorAll("button"), function (b) {
    b.addEventListener("click", function () {
      vistaGasto = b.getAttribute("data-v");
      [].forEach.call($("spend-seg").querySelectorAll("button"), function (o) { o.classList.toggle("on", o === b); });
      gasto();
    });
  });

  // ---------- Marcas ----------
  function marcas() {
    if (!MARCAS.length) { $("sec-marcas").style.display = "none"; return; }
    $("marcas").innerHTML = MARCAS.map(function (m) {
      var L = INF.filter(function (x) { return x.marcas.indexOf(m.id) >= 0; });
      var g = 0; L.forEach(function (x) { x.pagos.forEach(function (p) { if (!p.marca || p.marca === m.id) g += +p.monto || 0; }); });
      return '<div class="marca"><div class="marca-dot" style="background:' + esc(m.color || "#888") + '">' + esc((m.nombre || m.id).slice(0, 2).toUpperCase()) +
        '</div><div><div class="marca-name">' + esc(m.nombre || m.id) + '</div><div class="marca-meta">' + L.length + " influencers · " +
        L.filter(dijoSi).length + " dijeron sí · " + plata(g) + "</div>" + (m.detalle ? '<div class="marca-meta">' + esc(m.detalle) + "</div>" : "") + "</div></div>";
    }).join("");
  }

  // ---------- Filtros ----------
  function chips() {
    var cM = [["todas", "Todas las marcas", null]].concat(MARCAS.map(function (m) { return [m.id, m.nombre || m.id, m.color]; }));
    $("chips-marca").innerHTML = MARCAS.length > 1 ? cM.map(function (m) {
      return '<button class="chip' + (filtroMarca === m[0] ? " on" : "") + '" data-m="' + esc(m[0]) + '">' +
        (m[2] ? '<i style="background:' + esc(m[2]) + '"></i>' : "") + esc(m[1]) + "</button>";
    }).join("") : "";
    var base = INF.filter(deMarca);
    $("chips-estado").innerHTML = [["todos", "Todos"]].concat(ESTADOS).map(function (e) {
      var n = e[0] === "todos" ? base.length : base.filter(function (x) { return x.estado === e[0]; }).length;
      if (!n && e[0] !== "todos" && filtroEstado !== e[0]) return "";
      return '<button class="chip' + (filtroEstado === e[0] ? " on" : "") + '" data-e="' + e[0] + '">' + e[1] + ' <span class="c-n">' + n + "</span></button>";
    }).join("");
  }
  document.addEventListener("click", function (ev) {
    var b = ev.target.closest && ev.target.closest(".chip");
    if (!b) return;
    if (b.hasAttribute("data-m")) { filtroMarca = b.getAttribute("data-m"); filtroEstado = "todos"; }
    if (b.hasAttribute("data-e")) filtroEstado = b.getAttribute("data-e");
    todo();
  });
  $("q").addEventListener("input", function () { q = this.value.toLowerCase().trim(); lista(); });
  $("orden").addEventListener("change", function () { orden = this.value; lista(); });

  // ---------- Foto ----------
  function iniciales(x) {
    var n = (x.nombre || x.usuario || "?").replace(/[^\p{L}\p{N} ]/gu, " ").trim().split(/\s+/);
    return ((n[0] || "?")[0] + (n[1] ? n[1][0] : "")).toUpperCase();
  }
  function foto(x, big) {
    var src = x.foto || ("fotos/" + x.usuario + ".jpg");
    var col = colorMarca(x.marcas[0]);
    return '<div class="av' + (big ? " big" : "") + '" style="background:' + esc(col) + '">' + esc(iniciales(x)) +
      '<img src="' + esc(src) + '" alt="" loading="lazy" onerror="this.remove()"></div>';
  }

  // ---------- Lista ----------
  function visibles() {
    var L = INF.filter(deMarca).filter(function (x) { return filtroEstado === "todos" || x.estado === filtroEstado; });
    if (q) L = L.filter(function (x) {
      return [x.usuario, x.nombre, x.ciudad, x.nicho].join(" ").toLowerCase().indexOf(q) >= 0;
    });
    var ult = function (x) {
      var f = [x.contactado || "", x.fechaEntrega || ""]; x.pagos.forEach(function (p) { f.push(p.fecha || ""); }); x.publicaciones.forEach(function (p) { f.push(p.fecha || ""); });
      return f.sort().pop();
    };
    L.sort(orden === "seguidores" ? function (a, b) { return (b.seguidores || 0) - (a.seguidores || 0); }
      : orden === "gasto" ? function (a, b) { return b._pagado - a._pagado; }
      : function (a, b) { return ult(b).localeCompare(ult(a)); });
    return L;
  }
  function lista() {
    var L = visibles();
    if (!INF.length) {
      $("ilist").innerHTML = '<li class="empty"><b>Todavía no hay influencers cargados</b>Cuando Anika sume los Instagram, aparecen acá con su foto y seguidores.</li>';
    } else if (!L.length) {
      $("ilist").innerHTML = '<li class="empty"><b>No hay resultados</b>Probá con otro filtro o búsqueda.</li>';
    } else {
      $("ilist").innerHTML = L.map(function (x) {
        return '<li class="irow' + (x.usuario === sel ? " on" : "") + '" tabindex="0" data-u="' + esc(x.usuario) + '">' + foto(x) +
          '<div style="min-width:0"><div class="i-name">' + esc(x.nombre || "@" + x.usuario) + '</div><div class="i-meta">@' + esc(x.usuario) +
          " · " + segs(x.seguidores) + " seg." + x.marcas.map(function (m) { return ' <i title="' + esc(nombreMarca(m)) + '" style="background:' + esc(colorMarca(m)) + '"></i>'; }).join("") +
          '</div></div><span class="st st-' + x.estado + '">' + ESTADO[x.estado] + "</span></li>";
      }).join("");
    }
    if (!sel || !INF.some(function (x) { return x.usuario === sel; })) sel = L[0] ? L[0].usuario : "";
    detalle();
  }
  function elegir(u) {
    sel = u;
    history.replaceState(null, "", "#" + encodeURIComponent(u));
    [].forEach.call(document.querySelectorAll(".irow"), function (r) { r.classList.toggle("on", r.getAttribute("data-u") === u); });
    detalle();
    if (window.innerWidth < 980) $("detail").scrollIntoView({ behavior: "smooth", block: "start" });
  }
  $("ilist").addEventListener("click", function (ev) { var r = ev.target.closest(".irow"); if (r) elegir(r.getAttribute("data-u")); });
  $("ilist").addEventListener("keydown", function (ev) {
    var r = ev.target.closest(".irow"); if (r && (ev.key === "Enter" || ev.key === " ")) { ev.preventDefault(); elegir(r.getAttribute("data-u")); }
  });

  // ---------- Detalle ----------
  function box(l, v, s) { return '<div class="d-box"><div class="l">' + l + '</div><div class="v">' + v + (s ? " <small>" + s + "</small>" : "") + "</div></div>"; }
  function detalle() {
    var x = INF.filter(function (i) { return i.usuario === sel; })[0];
    if (!x) {
      $("detail").innerHTML = '<div class="empty"><b>Elegí un influencer</b>Acá se ve todo: qué se le mandó, cuánto se pagó y qué publicó.</div>';
      return;
    }
    var ig = "https://www.instagram.com/" + encodeURIComponent(x.usuario) + "/";
    var h = '<div class="d-head">' + foto(x, true) + '<div><div class="d-name">' +
      esc(x.nombre || "@" + x.usuario) + ' <span class="st st-' + x.estado + '">' + ESTADO[x.estado] + '</span></div>' +
      '<div><a class="d-user" href="' + ig + '" target="_blank" rel="noopener">@' + esc(x.usuario) + " ↗</a></div>" +
      '<div class="d-line">' + [x.ciudad, x.nicho].filter(Boolean).map(esc).join(" · ") + "</div>" +
      '<div class="tags" style="margin-top:8px">' + x.marcas.map(function (m) {
        return '<span class="tag" style="border-color:' + esc(colorMarca(m)) + ';color:' + esc(colorMarca(m)) + '">' + esc(nombreMarca(m)) + "</span>";
      }).join("") + "</div></div></div>";

    h += '<div class="d-grid">' +
      box("Seguidores", segs(x.seguidores)) +
      box("Acuerdo", esc(ACUERDO[x.acuerdo] || "Sin definir")) +
      box("Pagado", plata(x._pagado), x.pagos.length ? x.pagos.length + (x.pagos.length === 1 ? " pago" : " pagos") : "") +
      box("Contactado", x.contactado ? fcorta(x.contactado) : "Todavía no", x.via ? "por " + esc(x.via) : "") +
      box("Entrega", esc(ENTREGA[x.entrega] || "—"), x.fechaEntrega ? fcorta(x.fechaEntrega) : "") +
      (x.valorProducto ? box("Valor en producto", plata(x.valorProducto)) : "") +
      (x.codigo ? box("Código de descuento", esc(x.codigo), x.ventas != null ? esc(x.ventas) + " ventas" : "") : "") +
      (x.proximo ? box("Próximo paso", esc(x.proximo.texto || x.proximo), x.proximo.fecha ? fcorta(x.proximo.fecha) : "") : "") +
      "</div>";

    if (x.enviado.length) h += '<div class="d-sec"><h4>Qué se le mandó</h4><div class="tags">' + x.enviado.map(function (e) { return '<span class="tag">' + esc(e) + "</span>"; }).join("") + "</div></div>";

    if (x.publicaciones.length) {
      h += '<div class="d-sec"><h4>Publicaciones</h4><ul class="tline">' + x.publicaciones.slice().sort(function (a, b) { return String(b.fecha).localeCompare(String(a.fecha)); }).map(function (p) {
        var t = esc(p.tipo || "Publicación") + (p.marca ? " · " + esc(nombreMarca(p.marca)) : "");
        return '<li><span class="f">' + fcorta(p.fecha) + "</span><span>" + (okUrl(p.link) ? '<a href="' + esc(p.link) + '" target="_blank" rel="noopener">' + t + " ↗</a>" : t) +
          "</span><span class=\"m\">" + (p.vistas ? segs(p.vistas) + " vistas" : "") + "</span></li>";
      }).join("") + "</ul></div>";
    }

    if (x.pagos.length) {
      h += '<div class="d-sec"><h4>Pagos</h4><ul class="tline">' + x.pagos.slice().sort(function (a, b) { return String(b.fecha).localeCompare(String(a.fecha)); }).map(function (p) {
        return '<li><span class="f">' + fcorta(p.fecha) + "</span><span>" + esc(p.detalle || "Pago") + (p.marca ? " · " + esc(nombreMarca(p.marca)) : "") +
          '</span><span class="m">' + plata(p.monto) + "</span></li>";
      }).join("") + "</ul></div>";
    }

    if (x.historial && x.historial.length) {
      h += '<div class="d-sec"><h4>Historial</h4><ul class="tline">' + x.historial.slice().sort(function (a, b) { return String(b.fecha).localeCompare(String(a.fecha)); }).map(function (e) {
        return '<li><span class="f">' + fcorta(e.fecha) + "</span><span>" + esc(e.texto) + "</span><span></span></li>";
      }).join("") + "</ul></div>";
    }
    if (x.notas) h += '<div class="d-sec"><h4>Notas</h4><div class="note">' + esc(x.notas) + "</div></div>";
    $("detail").innerHTML = h;
  }

  // ---------- Armar todo ----------
  function todo() { kpis(); gasto(); marcas(); chips(); lista(); }
  var mf = parse(d.actualizado);
  $("crm-sub").textContent = "Quiénes contactamos, qué se mandó, cuánto se invirtió y qué publicaron." +
    (mf ? " Actualizado el " + mf.getDate() + " de " + MESL[mf.getMonth()] + "." : "");
  $("pie").textContent = "Gestión de influencers: " + (d.yo || "Anika");
  todo();
})();
