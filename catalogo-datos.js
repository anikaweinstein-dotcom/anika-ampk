// ======= CATÁLOGO PARA INFLUENCERS =======
// Para actualizar precios o agregar productos, se cambia SOLO este archivo.
// Precios: Farmaland (farmaland.com.ar), con el descuento que tenían el 26/11/2026.
window.CATALOGO = {
  tope: 300000,
  preciosAl: "26 de noviembre de 2026",
  lugar: "Farmaland",
  masElegidos: ["ampk-protein", "creatina-hcl", "goodskin"],

  categorias: [
    "Proteína y músculo",
    "Piel y belleza",
    "Hormonas y mujer",
    "Digestión y metabolismo",
    "Energía y longevidad",
    "Corazón, vitaminas y defensas"
  ],

  productos: [
    { id: "ampk-protein", cat: "Proteína y músculo", nombre: "AMPK Proteína Vegana", presentacion: "Doypack 506 g · chocolate, frutilla, vainilla o banana", precio: 39950,
      contar: [
        "Proteína de arveja: 17 g por porción, 0 g de azúcar y sin maltodextrina.",
        "Contá cuándo la tomás: en el desayuno o la merienda te da saciedad; después de entrenar, ayuda al músculo.",
        "Mostrá lo fácil que es: 1 scoop, agua o leche, shaker y listo."
      ]},
    { id: "ampk-batido", cat: "Proteína y músculo", nombre: "AMPK Batido Proteico", presentacion: "Botella lista para tomar · chocolate, vainilla o frutilla", precio: 9900,
      contar: [
        "20 g de proteína y menos de 100 calorías, sin azúcar agregada.",
        "Gancho: «Estuviste ocupada todo el día y no querés perder el musculito». Agitás y tomás, en el auto o en la oficina."
      ]},
    { id: "creatina-hcl", cat: "Proteína y músculo", nombre: "AMPK Creatina HCl", presentacion: "60 cápsulas", precio: 49950,
      contar: [
        "No es solo para el gym: ayuda a la fuerza y la recuperación, y también a la memoria, la atención y la energía cerebral.",
        "Al ser HCl se absorbe mejor y se usa en dosis más chicas, sin pesadez ni retención de líquidos.",
        "Se toma todos los días, también los días que no entrenás."
      ]},
    { id: "ampk-sport", cat: "Proteína y músculo", nombre: "AMPK Sport Creatina", presentacion: "Monohidrato micronizada · 300 g", precio: 29450,
      contar: [
        "Es la creatina más estudiada: ayuda al rendimiento y a la masa muscular.",
        "5 g (un scoop) por día, todos los días."
      ]},
    { id: "aminoglu", cat: "Proteína y músculo", nombre: "Aminoglu", presentacion: "Glutamina micronizada · 300 g", precio: 24450,
      contar: [
        "5 g de glutamina por porción: ayuda a la masa muscular, a la energía en días de mucho estrés y a la salud del estómago.",
        "Contá en qué momento de tu rutina la sumás."
      ]},
    { id: "crujinat", cat: "Proteína y músculo", nombre: "Crujinat Bite Protein", presentacion: "Sobre de 15 g", precio: 3735,
      contar: [
        "Snack crocante de proteína de arveja: 56 calorías el sobre.",
        "Mostralo como colación o arriba de una ensalada o un yogur."
      ]},

    { id: "goodskin", cat: "Piel y belleza", nombre: "Goodskin Extreme Collagen", presentacion: "15 sticks bebibles · 30 días", precio: 59250,
      contar: [
        "Colágeno marino tipo 1 y 3 con ácido hialurónico, vitamina C y biotina.",
        "Mostrá cómo se toma: directo del stick o en un vasito de agua. Simple y rico.",
        "Ayuda a la elasticidad de la piel, las líneas finas, el pelo y las uñas. La primera evaluación es a las 12 semanas: contá tu proceso real."
      ]},

    { id: "metasitol-mujer", cat: "Hormonas y mujer", nombre: "Metasitol Mujer", presentacion: "60 cápsulas", precio: 71910, profesional: true,
      contar: [
        "Lo explica una nutricionista o médica: cómo actúa a nivel hormonal. Tiene myo-inositol y D-chiro inositol 40:1 más ácido fólico, y ayuda en el SOP, la resistencia a la insulina y la fertilidad.",
        "De una creadora, solo si tiene una historia real para contar (por ejemplo, que quedó embarazada mientras lo tomaba): en primera persona, «en mi caso…», y contando que lo indicó su médica.",
        "Nunca decir que cura el SOP ni prometer un embarazo."
      ]},
    { id: "metasitol-ri", cat: "Hormonas y mujer", nombre: "Metasitol RI", presentacion: "60 cápsulas", precio: 56100, profesional: true,
      contar: [
        "Pensado para el azúcar en sangre, la resistencia a la insulina y la inflamación.",
        "Ayuda a la respuesta metabólica y a controlar el peso corporal. 2 cápsulas por día, con las comidas.",
        "Contá por qué lo elegiste y cerrá con «consultalo con tu médico»."
      ]},

    { id: "ampk-comprimidos", cat: "Digestión y metabolismo", nombre: "AMPK Nutrientes", presentacion: "30 comprimidos", precio: 31500,
      contar: [
        "Minerales quelatados, vitamina C y un aminoácido esencial que ayudan a la actividad metabólica.",
        "1 comprimido por día en el desayuno. Ayuda a mejorar la composición corporal junto con buena alimentación y movimiento.",
        "Los resultados se ven con constancia: contá tu rutina, no prometas kilos."
      ]},
    { id: "satial-food", cat: "Digestión y metabolismo", nombre: "Satial Food", presentacion: "Polvo para espolvorear sobre la comida", precio: 29450,
      contar: [
        "Faseolamina: ayuda a disminuir la absorción de los carbohidratos del almidón.",
        "Mostralo en acción: una cucharadita sobre la pizza, la pasta o la empanada."
      ]},
    { id: "satial-total", cat: "Digestión y metabolismo", nombre: "Satial Total", presentacion: "Polvo para espolvorear", precio: 29450,
      contar: [
        "Suma Neutralasa: ayuda con las comidas que tienen azúcar.",
        "Ideal para mostrar con un postre o una merienda dulce."
      ]},
    { id: "floragut-b420", cat: "Digestión y metabolismo", nombre: "Floragut B420 Metabolismo", presentacion: "30 cápsulas", precio: 65730,
      contar: [
        "Probiótico de consumo diario: ayuda a reducir la hinchazón y el malestar digestivo.",
        "Contá el «antes»: la panza inflada a la tarde. Y el eje intestino-cerebro: la panza también influye en cómo te sentís.",
        "1 cápsula por día con el estómago vacío."
      ]},
    { id: "daozima", cat: "Digestión y metabolismo", nombre: "Daozima", presentacion: "30 cápsulas", precio: 53550, profesional: true,
      contar: [
        "Lo explica una nutricionista: «¿Te duele la cabeza? Muchos alimentos liberan histamina, y si tenés déficit de DAO te puede dar migraña, hinchazón o cansancio».",
        "Daozima es la enzima DAO: ayuda con esos síntomas. Viene en cápsula gastrorresistente, que protege la enzima en el estómago.",
        "1 cápsula 15 minutos antes de las comidas con mucha histamina."
      ]},

    { id: "telomerina", cat: "Energía y longevidad", nombre: "Telomerina NAD+", presentacion: "30 cápsulas", precio: 41100,
      contar: [
        "El NAD+ es una molécula de energía celular que baja con los años. Telomerina ayuda a reponerlo.",
        "Ayuda a la energía y a un envejecimiento saludable. Ideal a partir de los 35 o 40 años."
      ]},
    { id: "telomerina-nmn", cat: "Energía y longevidad", nombre: "Telomerina NMN", presentacion: "30 cápsulas", precio: 50750,
      contar: [
        "NMN: el precursor directo del NAD+. Ayuda a la energía, a disminuir el cansancio y a la función cognitiva.",
        "Contá cómo te sentís en tu día a día."
      ]},

    { id: "menacor-omega3", cat: "Corazón, vitaminas y defensas", nombre: "Menacor Omega 3", presentacion: "30 cápsulas · 1400 mg de omega 3", precio: 62550,
      contar: [
        "EPA 600 mg + DHA 600 mg: ayuda al corazón, la memoria y las articulaciones.",
        "Contá por qué lo sumaste a tu rutina."
      ]},
    { id: "vitamet", cat: "Corazón, vitaminas y defensas", nombre: "Vitamet Complejo B", presentacion: "30 comprimidos", precio: 22050,
      contar: [
        "Vitaminas B activas y metiladas: ayudan a la energía, a tener menos cansancio y a la concentración.",
        "Dato que engancha: la orina puede salir más amarilla por la vitamina B2. Es normal."
      ]},
    { id: "nutri100-c", cat: "Corazón, vitaminas y defensas", nombre: "Nutri100 Vitamina C 1000", presentacion: "30 cápsulas", precio: 16950,
      contar: [
        "Ayuda a las defensas, es antioxidante e interviene en la formación del colágeno."
      ]},
    { id: "nutri100-d3", cat: "Corazón, vitaminas y defensas", nombre: "Nutri100 Vitamina D3 4000 UI", presentacion: "30 cápsulas", precio: 15450,
      contar: [
        "Gancho: «¿Cuántas horas de sol tomaste esta semana?» Ayuda a las defensas, los huesos y los músculos."
      ]},
    { id: "benelta", cat: "Corazón, vitaminas y defensas", nombre: "Benelta Flex", presentacion: "30 cápsulas", precio: 40250,
      contar: [
        "Cúrcuma fitosomada con pimienta negra: ayuda a la movilidad de las articulaciones y a las molestias después de entrenar o bailar."
      ]}
  ]
};
