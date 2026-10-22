/* Mundo 3 · Archipiélago de los Mundos: árboles modales (K, T, S4, S5) */
(function (C) {
const { T, Q, A, V, table, tab, rule, r, kripke } = C;
const M1 = kripke([{ id: 'w1', t: '' }, { id: 'w2', t: 'P' }, { id: 'w3', t: 'P, Q' }], [['w1', 'w2'], ['w1', 'w3']],
  'En w1 valen {□P} y {◇Q}, pero no {□Q}.');
C.world({
  k: 3, name: 'Archipiélago de los Mundos', logic: 'Lógica modal proposicional', badge: '□',
  intro: 'Cada isla es un mundo posible. Lo necesario vale en todas las que alcanzas; lo posible, en alguna. Los árboles llevan ahora un número de mundo en cada línea.',
  stages: [
    T('Necesario y posible', [
      { say: 'Bienvenido al archipiélago. Aquí las oraciones no son verdaderas o falsas sin más: lo son <b>en un mundo posible</b>. Añadimos dos operadores: {□A}, «es necesario que A», y {◇A}, «es posible que A».' },
      { say: 'Un <b>modelo de Kripke</b> tiene mundos y una relación de <b>accesibilidad</b> entre ellos. {□A} es verdadera en un mundo si {A} lo es en todos los mundos accesibles desde él. {◇A} lo es si {A} es verdadera en alguno.', fig: M1 },
      { say: 'Ojo con un mundo desde el que no se ve ningún otro: ahí todo {□A} es verdadero «vacuamente» y todo {◇A} es falso. Si no hay mundos accesibles, no hay ninguno donde {A} falle.' },
      { say: 'Según las propiedades de la accesibilidad obtenemos distintos sistemas: K, T, S4, S5. Empezamos por <b>K</b>, el más básico, que no supone nada sobre la relación.' }
    ]),
    Q('Lee el modelo', [
      { q: 'En el modelo del dibujo (w1 ve a w2 y a w3; {P} vale en w2 y w3; {Q}, solo en w3), ¿vale {◇Q} en w1?', opts: ['Sí', 'No'], ok: 0, why: 'w1 ve a w3, y allí {Q} es verdadera.' },
      { q: '¿Vale {□P} en w1?', opts: ['Sí', 'No'], ok: 0, why: 'Los dos mundos que ve w1 hacen verdadera {P}.' },
      { q: '¿Vale {□Q} en w1?', opts: ['Sí', 'No'], ok: 1, why: 'w1 ve a w2, y allí {Q} es falsa.' },
      { q: '¿Vale {□(P∧¬P)} en w2, que no ve a ningún mundo?', opts: ['Sí, vacuamente', 'No, nunca'], ok: 0, why: 'Todo lo que empieza por {□} es verdadero en un mundo sin salidas, incluso una contradicción.' }
    ]),
    T('Árboles con mundos', [
      { say: 'Los árboles modales son como los clásicos con dos novedades. Cada línea es o bien {A, i} («A es verdadera en el mundo i») o bien {irj} («el mundo i ve al mundo j»). La lista inicial lo pone todo en el mundo 0.' },
      { say: 'Las reglas de las conectivas son las de siempre, llevando el número de mundo. Y hay cuatro reglas modales.',
        fig: rule(r(['{□A, i}', '{irj}'], [['{A, j}']], 'para cada j que i vea'), r(['{◇A, i}'], [['{irj}', '{A, j}']], 'con un mundo j nuevo'), r(['{¬□A, i}'], [['{◇¬A, i}']]), r(['{¬◇A, i}'], [['{□¬A, i}']])) },
      { say: 'Una rama se cierra cuando tiene {A, i} y {¬A, i} con el <b>mismo</b> número. {P, 0} y {¬P, 1} no chocan: dicen que {P} es verdadera en un mundo y falsa en otro.' },
      { say: 'Cuidado con {□}: se aplica a cada mundo accesible, y si más tarde aparece otro, hay que volver. Por eso su línea nunca se marca como terminada.',
        fig: tab('K', ['□(P→Q)', '□P'], '□Q', 'Distribución: {◇¬Q} crea el mundo 1, y allí {□} baja {P→Q} y {P}.') }
    ]),
    A('Distribución', 'K', ['□(P→Q)', '□P'], '□Q', {
      intro: 'El principio que da nombre al sistema K: la necesidad se distribuye sobre el condicional. Primero haz que la conclusión negada cree el mundo 1.',
      outro: 'Válido: en el mundo 1, {P→Q} y {P} dan {Q}, que contradice {¬Q}.' }),
    A('Necesitación', 'K', [], '□(P→P)', {
      intro: 'Todo teorema es necesario. Sin premisas, el árbol arranca de {¬□(P→P), 0}.',
      outro: 'Válido: en el mundo nuevo, {¬(P→P)} se contradice sola.' }),
    A('Repartir la caja', 'K', ['□(P∧Q)'], '□P∧□Q', {
      intro: 'La conclusión negada abre dos ramas, y cada una crea su propio mundo.',
      outro: 'Válido: en cada rama, el mundo nuevo recibe {P∧Q} de la premisa y choca con lo que falta.' }),
    A('Juntar cajas', 'K', ['□P∧□Q'], '□(P∧Q)', {
      intro: 'La dirección contraria. Separa primero la premisa: la regla de {□} solo actúa sobre fórmulas que empiezan por {□}.',
      outro: 'Válido: el mundo nuevo recibe {P} y {Q}, y la conclusión negada no puede sostenerse.' }),
    T('La posibilidad', [
      { say: '{◇A} dice que {A} vale en algún mundo accesible. Por eso su regla <b>crea un mundo nuevo</b>: no sabemos cuál es, pero existe y lo vemos desde donde estamos.' },
      { say: '{¬◇A} y {¬□A} se convierten una en la otra: «es imposible que A» es «necesariamente no A», y «no es necesario que A» es «es posible que no A».' },
      { say: 'Cuando haya que elegir, crea primero los mundos con {◇} y después aplica los {□} a todos los mundos que ya existan: así no tendrás que volver atrás.' }
    ]),
    A('Lo imposible lo implica todo', 'K', ['¬◇P'], '□(P→Q)', {
      intro: 'Una paradoja de la implicación estricta: lo imposible implica estrictamente cualquier cosa.',
      outro: 'Válido: la premisa se vuelve {□¬P}, y en el mundo que crea la conclusión negada, {P} choca con {¬P}.' }),
    A('Posibilidad heredada', 'K', ['□(P→Q)', '◇P'], '◇Q', { boss: true,
      intro: 'El jefe de K. La premisa {◇P} crea un mundo y la conclusión negada, {□¬Q}, lo obliga a cumplir {¬Q}.',
      outro: 'Válido: en ese mundo, {P→Q} y {P} dan {Q}, que contradice {¬Q}.' }),
    A('Sin salida', 'K', ['□P'], '◇P', {
      intro: 'En K no se sabe nada de las flechas. ¿Se sigue {◇P} de {□P}? Construye el árbol: el mundo 0 no ve a ninguno.',
      outro: 'Inválido: en un mundo sin salidas, {□P} vale vacuamente y {◇P} es falsa.' }),
    T('Los sistemas T, S4 y S5', [
      { say: 'Cada sistema añade reglas sobre las flechas, que el árbol aplica por sí solo. En <b>T</b>, cada mundo se ve a sí mismo: la accesibilidad es <b>reflexiva</b>. Así {□A} implica {A}.' },
      { say: '<b>S4</b> añade que la accesibilidad es <b>transitiva</b>: si i ve a j y j ve a k, entonces i ve a k. Con eso {□A} implica {□□A}.' },
      { say: '<b>S5</b> añade que es <b>simétrica</b>: si i ve a j, j ve a i. Con las tres propiedades, todos los mundos se ven entre sí, y {◇A} implica {□◇A}.',
        fig: table(['Sistema', 'Flechas', 'Valida'], [['K', 'cualquiera', '{□(A→B)→(□A→□B)}'], ['T', 'reflexivas', '{□A→A}'], ['S4', 'reflexivas y transitivas', '{□A→□□A}'], ['S5', 'de equivalencia', '{◇A→□◇A}']]) },
      { say: 'Cada sistema incluye las reglas de los anteriores. En cada reto verás en qué sistema trabajas y, en el libro de reglas, las propiedades de las flechas.' }
    ]),
    A('Lo real es posible', 'T', ['P'], '◇P', {
      intro: 'En T, lo que es verdadero es posible: el mundo se ve a sí mismo.',
      outro: 'Válido: {□¬P} aplicado al propio mundo 0 choca con {P}.' }),
    A('Lo necesario es posible', 'T', ['□P'], '◇P', {
      intro: 'Esto no vale en K, pero sí en T.',
      outro: 'Válido: con {□P} y {□¬P}, el mundo 0 contiene {P} y {¬P}.' }),
    A('Necesariamente necesario', 'S4', ['□P'], '□□P', {
      intro: 'El axioma característico de S4. La transitividad hace que {P} llegue hasta el mundo más lejano.',
      outro: 'Válido: si 0 ve a 1 y 1 ve a 2, entonces 0 ve a 2, y {□P} llega hasta allí.' }),
    A('Posiblemente posible', 'S4', ['◇◇P'], '◇P', {
      intro: 'En S4 las modalidades repetidas se colapsan.',
      outro: 'Válido: la transitividad conecta el mundo inicial con el último mundo.' }),
    A('Necesariamente posible', 'S5', ['◇P'], '□◇P', {
      intro: 'El axioma característico de S5: lo posible es necesariamente posible.',
      outro: 'Válido: por simetría y transitividad, el mundo nuevo ve también al mundo donde vale {P}.' }),
    A('El axioma B', 'S5', ['P'], '□◇P', {
      intro: 'Lo que es verdadero es necesariamente posible. Combina lo que sabes de T y de S5.',
      outro: 'Válido: cada mundo que 0 ve vuelve a verlo, y en 0 vale {P}.' }),
    A('T no basta', 'T', ['□P'], '□□P', {
      intro: 'En T, la necesidad no llega más lejos que un paso. Construye el árbol completo: una rama no se va a cerrar.',
      outro: 'Inválido: sin transitividad, el mundo 2 no es accesible desde el 0, y allí {P} puede ser falsa.' }),
    Q('Marcos y axiomas', [
      { q: '¿Qué propiedad de la accesibilidad hace válida {□P→P}?', opts: ['Transitividad', 'Reflexividad', 'Simetría'], ok: 1,
        why: 'Si cada mundo se ve a sí mismo, lo que vale en todos los mundos accesibles vale también en el propio.' },
      { q: 'En un mundo desde el que no se accede a ningún otro, ¿qué pasa?', opts: ['Vale {□P} para cualquier P, y no vale ninguna {◇P}', 'No vale ni {□P} ni {◇P}', 'Vale {◇P} para cualquier P'], ok: 0,
        why: '{□P} dice «P vale en todos los mundos accesibles»: si no hay ninguno, se cumple vacíamente. Por eso en K no se sigue {◇P} de {□P}.' },
      { q: '¿En qué sistema {◇□P} implica {□P}?', opts: ['T', 'S4', 'S5'], ok: 2,
        why: 'En S5 solo cuenta el último operador de una cadena. Es justo lo que vas a probar ahora.' }
    ]),
    A('Posiblemente necesario', 'S5', ['◇□P'], '□P', { boss: true,
      intro: 'El jefe del archipiélago. Sobre este principio se apoya el argumento ontológico modal.',
      outro: 'Válido: en S5 todos los mundos se ven, y el mundo donde vale {□P} los obliga a todos a cumplir {P}.' }),
    V('El faro de los mundos', { sys: ['K', 'T', 'S4', 'S5'], syms: '¬∧∨→↔□◇', goals: ['valid', 'invalid', 'split'],
      intro: 'El faro decide la validez en K, T, S4 y S5: elige el sistema con los botones de arriba. Si el argumento falla, dibuja un <b>modelo de Kripke</b> con sus mundos, sus flechas y lo que vale en cada uno.',
      outro: 'Cada axioma corresponde a una propiedad de las flechas: T a la reflexividad, 4 a la transitividad y 5 a la propiedad euclídea.',
      ex: [[['□(P→Q)', '□P'], '□Q', 'valid', 'K'], [['□P'], 'P', 'invalid', 'K'], [['□P'], '□□P', 'invalid', 'T'], [['◇P'], '□◇P', 'invalid', 'S4'], [['P'], '□◇P', 'invalid', 'S4'], [['◇P', '◇Q'], '◇(P∧Q)', 'invalid', 'S5'], [['□(P∨Q)'], '□P∨□Q', 'invalid', 'S5']] })
  ]
});
})(window.CONTENT);
