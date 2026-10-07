// Las 17 reseñas de Google de RIFCLIMA (todas de 5 estrellas), copiadas tal cual de su ficha el 7-10-2026.
window.RESENAS = [
[
"Sandra Romero",
"Hace 5 meses",
"Me recomendaron esta empresa y no podemos estar más contentos! No dudaría en contratar sus servicios, muy profesionales y todo muy rápido."
],
[
"Yadi RD",
"Hace 5 meses",
"Me han instalado dos aires acondicionados, uno en el dormitorio y otro en el comedor. Los dos han quedado estéticamente bonitos, trabajo muy limpio.\nRecogen todo lo que ensucian.\nPensaba que en temporada alta tardarían una barbaridad en darme fecha de instalación pero la verdad que en menos de una semana  he tenido las máquinas funcionando ya. Recomiendo muchísimo los servicios de esta empresa. Muy eficaz."
],
[
"Ma José Carbonell",
"Hace 2 meses",
"Muy responsable y un profesional muy honesto. Me ha solucionado la avería del aire acondicionado de forma muy eficaz y rápida"
],
[
"Fenix Lounge",
"Hace 5 meses",
"Desde que trabajamos con esta empresa, el cambio en nuestro negocio ha sido excelente. Han mejorado notablemente nuestro funcionamiento, aportando profesionalidad, eficacia y soluciones adaptadas a nuestras necesidades.\n\nGracias a su implicación, todo funciona ahora de manera mucho más fluida y eficiente. Sin duda, una colaboración muy recomendable."
],
[
"Gema Ferris",
"Hace 4 semanas",
"Excelentes profesionales, vienen rápido y solucionan todo de forma muy eficaz, trabajan muy bien,los recomiendo al 100%"
],
[
"Mario Martinez Samblancat",
"Hace 5 meses",
"Profesionales 100% trato inmejorable,serios y sobretodo limpios al máximo,sin ninguna duda para volver a confiar con ellos!"
],
[
"Javi Ferrer",
"Hace 6 meses",
"Trato y servicio inmejorable, no dudaré en volver a contactar con el. 100% profesional y recomendable"
],
[
"Alejandro Benlloch Verdeguer",
"Hace 2 meses",
"Increíble trato, muy buena instalación,\nMuy recomendado"
],
[
"Beny Junior",
"Hace 5 meses",
"He tenido una experiencia excelente con Rif Clima. Desde el primer contacto, el trato fue muy profesional, cercano y claro. Me asesoraron perfectamente para elegir el aire acondicionado que mejor se adaptaba a mis necesidades, explicándolo todo de forma sencilla y sin presiones.\n\nEl día de la instalación, el equipo de Rif Clima llegó puntual y trabajó de manera muy limpia y organizada. Se nota que son verdaderos profesionales: realizaron la instalación con rapidez, pero sin descuidar ningún detalle, dejando todo perfectamente funcionando.\n\nAdemás, la relación calidad-precio es muy buena. También quiero destacar que después de la instalación se preocuparon por asegurarse de que todo estaba correcto y de resolver cualquier duda.\n\nSin duda, recomiendo Rif Clima al 100%. Si buscas confianza, profesionalidad y un trabajo bien hecho, no te van a decepcionar."
],
[
"Raul Alcaina",
"Hace 6 meses",
"Profesionalidad y calidad de 10 sin duda el mejor, tanto para casa como para mi local, muchas gracias"
],
[
"Manuel García",
"Hace 5 meses",
"El servicio de instalación de los aires ha sido muy rápido en el mismo día lo tenía todo terminado. Muy recomendable, gracias!"
],
[
"Adela Talens Gómez",
"Hace un mes",
"Grandes profesionales, con mucha rapidez, muy recomendables!!"
],
[
"vicente verdejo borja",
"Hace 5 meses",
"Grandes profesionales, se encontraron una preinstalacion de aire deficiente y lo solucionarion perfectamente, seguro que volvere a contactar con ellos en el futuro"
],
[
"MILIO GALIANA LLOPIS",
"Hace 4 meses",
"Estamos muy contentos, RIFCLIMA realiza un trabajo excelente."
],
[
"luis cervantes",
"Hace 5 meses",
"De lujo maravilloso 👏 👏 👏…"
],
[
"carlos vidal barbera",
"Hace 4 semanas",
"Buscaba una buena empresa para sustituir mi viejo aire acondicionado y al ver las buenas reseñas les llamé, me pasaron presupuesto y en pocos días ya tenía mi nuevo aparato funcionando. Son muy puntuales y limpios, la instalación ha quedado perfecta y el precio muy bien, tengo un buen aparato que funciona perfectamente."
],
[
"Abelleta Jose L.",
"Hace 2 meses",
"Rapidez, servicio y precio.\nContacté, por un problema en AA, un viernes de julio y el sábado por la mañana mi problema estaba resuelto; el coste me pareció muy razonable. Un 10."
]
];


// Muro de opiniones: columnas equilibradas (sin huecos), textos largos recortados con «Leer más»
// y las primeras 8 visibles con un botón para ver las 17.
(() => {
  const R = window.RESENAS;
  const colores = ['#1d5fa6', '#e2333d', '#3fa9ff', '#ff7a59', '#7b61ff', '#14a3a3'];
  const esc = (t) => t.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[c]);
  const inicial = (n) => esc(n.trim()[0].toUpperCase());
  // «vicente verdejo borja» y «MILIO GALIANA LLOPIS» → Tipo Título; el resto (p. ej. «Yadi RD») se deja tal cual
  const nombre = (n) => {
    const titulo = (x) => x.toLowerCase().split(' ').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    return esc(n === n.toLowerCase() || n === n.toUpperCase() ? titulo(n) : n);
  };

  // pila de caras en la ficha de puntuación
  const faces = document.querySelector('[data-faces]');
  if (faces) faces.innerHTML = R.slice(0, 6).map(([n], k) => `<span style="background:${colores[k % colores.length]}">${inicial(n)}</span>`).join('') + `<span class="more">+${R.length - 6}</span>`;

  const wall = document.querySelector('[data-wall]');
  const more = document.querySelector('[data-more]');
  if (!wall) return;
  const iniciales = () => (innerWidth < 700 ? 4 : 8);
  let todas = false;

  const tarjeta = ([n, t, q], k) => `<article class="card op">
      <span class="stars" aria-label="5 estrellas">★★★★★</span>
      <blockquote class="op__text"><p>${esc(q).replace(/\n+/g, '</p><p>')}</p></blockquote>
      <button class="op__more" type="button" hidden>Leer más</button>
      <footer class="op__who"><span class="op__face" style="background:${colores[k % colores.length]}">${inicial(n)}</span><span><b>${nombre(n)}</b><small>${esc(t)} · Google</small></span></footer>
    </article>`;

  const pintar = () => {
    const n = innerWidth >= 1280 ? 2 : innerWidth >= 700 ? 2 : 1;
    const lista = todas ? R : R.slice(0, iniciales());
    const cols = Array.from({ length: n }, () => ({ h: 0, html: [] }));
    // reparto en la columna más baja, estimando la altura por la longitud del texto (recortado a ~320 caracteres)
    lista.forEach((r, k) => {
      const c = cols.reduce((a, b) => (b.h < a.h ? b : a));
      c.html.push(tarjeta(r, k)); c.h += 150 + Math.min(r[2].length, 320) * 0.55;
    });
    wall.style.setProperty('--cols', n);
    wall.innerHTML = cols.map((c) => `<div class="wall__col">${c.html.join('')}</div>`).join('');
    // «Leer más» solo en las que de verdad se recortan
    wall.querySelectorAll('.op').forEach((op) => {
      const tx = op.querySelector('.op__text'), bt = op.querySelector('.op__more');
      if (tx.scrollHeight > tx.clientHeight + 4) {
        bt.hidden = false;
        bt.addEventListener('click', () => { const abierta = op.classList.toggle('is-open'); bt.textContent = abierta ? 'Leer menos' : 'Leer más'; window.ScrollTrigger?.refresh(); });
      }
    });
    if (more) { more.textContent = todas ? 'Ver menos opiniones' : `Ver las ${R.length} opiniones`; }
    window.ScrollTrigger?.refresh();
  };

  more?.addEventListener('click', () => {
    todas = !todas; pintar();
    if (!todas) document.querySelector('#opiniones').scrollIntoView({ behavior: 'smooth' });
  });
  let ancho = innerWidth, t;
  addEventListener('resize', () => { clearTimeout(t); t = setTimeout(() => { if ((innerWidth >= 700) !== (ancho >= 700)) pintar(); ancho = innerWidth; }, 150); });
  pintar();
})();
