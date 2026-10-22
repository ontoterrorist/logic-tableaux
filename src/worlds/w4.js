/* Mundo 4 · Ciudadela De Re: árboles modales de primer orden (dominio constante) */
(function (C) {
const { T, Q, A, V, table, tab, rule, r, kripke } = C;
C.world({
  k: 4, name: 'Ciudadela De Re', logic: 'Lógica modal de primer orden', badge: '□∀',
  intro: 'Tras estas murallas se cruzan los cuantificadores con la necesidad. Importa mucho quién va primero.',
  stages: [
    T('Cuantificar entre mundos', [
      { say: 'Ahora juntamos todo: cuantificadores y operadores modales. Las reglas son las que ya conoces. Lo nuevo es lo que pasa cuando {□} se cruza con {∀} o {∃}.' },
      { say: 'Compara {□∃xGx} con {∃x□Gx}. La primera es <b>de dicto</b>: en cada mundo hay algún G, quizá uno distinto cada vez. La segunda es <b>de re</b>: hay un individuo concreto que es G en todos los mundos.',
        fig: table(['Fórmula', 'Lectura', 'Ejemplo'], [['{□∃xGx}', 'de dicto', 'Necesariamente, alguien gana la lotería'], ['{∃x□Gx}', 'de re', 'Hay alguien que gana necesariamente']]) },
      { say: 'La lectura de re implica la de dicto, pero no al revés. Lo vas a probar enseguida.' }
    ]),
    T('Dominio constante', [
      { say: 'Ruth Barcan Marcus propuso en 1946 un principio célebre: {∀x□Fx→□∀xFx}. Si cada cosa es necesariamente F, entonces necesariamente todo es F. ¿Es válido? Depende de los dominios.' },
      { say: 'Si en todos los mundos existen los mismos individuos (<b>dominio constante</b>), sí. Si en otro mundo puede haber individuos nuevos, uno de ellos podría no ser F, y el principio falla.',
        fig: kripke([{ id: 'w1', t: 'existe a' }, { id: 'w2', t: 'existen a, b' }], [['w1', 'w2']], 'Dominios variables: en w2 hay un individuo b que no existía en w1.') },
      { say: 'Aquí trabajamos con dominio constante: un nombre designa lo mismo en todos los mundos, y las reglas de {∀} y {∃} usan los nombres de toda la rama, sea cual sea el mundo. Con eso valen la fórmula Barcan y su conversa.' },
      { say: 'Los sistemas llevan una C delante: <b>CK</b> es K con dominio constante, <b>CT</b> es T con dominio constante, y así. Las líneas siguen siendo {A, i}, con el número de mundo, pero los nombres no cambian de mundo.' }
    ]),
    A('La fórmula Barcan', 'CK', ['∀x□Fx'], '□∀xFx', {
      intro: 'La prueba es corta. Fíjate en cómo se propaga el nombre nuevo al mundo 1.',
      outro: 'Válido: en el mundo 1, el nombre {a} sale de {¬Fa}, y {□Fa} del mundo 0 lo contradice.' }),
    A('La conversa de Barcan', 'CK', ['□∀xFx'], '∀x□Fx', {
      intro: 'Ahora en la otra dirección.',
      outro: 'Válido: {¬□Fa} crea el mundo 1, y allí {∀xFx} baja a {Fa}.' }),
    A('De re a de dicto', 'CK', ['∃x□Fx'], '□∃xFx', {
      intro: 'Si hay algo que es necesariamente F, entonces necesariamente hay algo que es F.',
      outro: 'Válido: el individuo del mundo 0 también es F en el mundo 1, y entonces {∃xFx} no puede fallar allí.' }),
    A('Silogismo necesario', 'CK', ['□∀x(Fx→Gx)', '□Fa'], '□Ga', {
      intro: 'Un silogismo entero, pero dentro de otro mundo.',
      outro: 'Válido: en el mundo 1, el universal baja a {a} y el condicional se cierra.' }),
    A('Esencias en K', 'CK', ['∀x□Fx'], '∃xFx', {
      intro: 'En K nadie garantiza que el mundo 0 se vea a sí mismo. ¿Se sigue {∃xFx} de {∀x□Fx}? Construye el árbol.',
      outro: 'Inválido: en un mundo sin salidas, {□Fa} vale vacuamente y, aun así, {Fa} puede ser falsa.' }),
    A('Esencias realizadas', 'CT', ['∀x□Fx'], '∃xFx', {
      intro: 'En T lo necesario es verdadero, y el dominio no está vacío. Compara con el reto anterior.',
      outro: 'Válido: {□Fa} baja a {Fa} en el propio mundo, y eso contradice {¬∃xFx}.' }),
    Q('De dicto y de re', [
      { q: '¿Vale la inversa del reto «De re a de dicto», es decir, de {□∃xFx} a {∃x□Fx}?',
        opts: ['Sí', 'No: que siempre haya un ganador no significa que alguien gane siempre', 'Solo en S5'], ok: 1,
        why: 'En cada mundo puede ganar un individuo distinto. Si intentas el árbol, no termina: cada mundo nuevo trae un ganador nuevo, y cada ganador nuevo pide otro mundo.' },
      { q: '¿Qué supuesto hace válida la fórmula Barcan?', opts: ['Que todos los mundos tengan los mismos individuos', 'Que la accesibilidad sea reflexiva', 'Que no haya nombres'], ok: 0,
        why: 'Con dominio constante, lo que vale de cada individuo de aquí vale de cada individuo de allí, porque son los mismos.' }
    ]),
    A('Posibilidad de re', 'CK', ['∃x◇Fx'], '◇∃xFx', { boss: true,
      intro: 'El jefe de la ciudadela: hay algo que posiblemente es F; ¿es posible que algo sea F?',
      outro: 'Válido: el individuo {a} y el mundo donde es F bastan para que {∃xFx} valga allí.' }),
    V('El archivo de la ciudadela', { sys: ['CK', 'CT', 'CS4', 'CS5'], syms: '¬∧∨→↔∀∃□◇', goals: ['valid', 'invalid', 'split'],
      intro: 'El archivo construye árboles con mundos e individuos a la vez, con el mismo dominio en todos los mundos: por eso valen la fórmula Barcan y su conversa. Úsalo para separar lo <i>de dicto</i> de lo <i>de re</i>.',
      outro: 'La lógica modal de primer orden tampoco es decidible. Cuando un árbol crece sin cerrarse, como en {□∃xFx ⊢ ∃x□Fx}, el archivo responde «sin decidir».',
      ex: [[['∀x□Fx'], '□∀xFx', 'valid', 'CK'], [['□∃xFx'], '∃x□Fx', 'unknown', 'CK'], [['∃x□Fx'], '□∃xFx', 'valid', 'CK'], [['∀x□Fx'], '∃xFx', 'invalid', 'CK'], [['∀x□Fx'], '∃xFx', 'valid', 'CT'], [['◇∃xFx'], '∃x◇Fx', 'valid', 'CK']] })
  ]
});
})(window.CONTENT);
