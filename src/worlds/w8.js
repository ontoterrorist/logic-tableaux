/* Mundo 8 · Abismo de las Paradojas: árboles de LP de primer orden */
(function (C) {
const { T, Q, A, M, V, table, tab, rule, r } = C;
C.world({
  k: 8, name: 'Abismo de las Paradojas', logic: 'Lógica paraconsistente de primer orden (LP)', badge: '¬∀',
  intro: 'En el fondo del abismo hay objetos que son y no son a la vez. La lógica aguanta.',
  stages: [
    T('Objetos contradictorios', [
      { say: 'Bajamos un nivel más. En la versión de primer orden de LP, un predicado tiene una <b>extensión</b> (los individuos de los que es verdadero) y una <b>antiextensión</b> (aquellos de los que es falso). Entre las dos cubren todo el dominio, pero pueden solaparse.' },
      { say: 'Si un individuo está en las dos, {Fa} vale A: es verdadera y falsa. Los cuantificadores se calculan como una conjunción y una disyunción grandes: {∀xFx} toma el menor valor entre todos los individuos y {∃xFx}, el mayor.',
        fig: table(['{Fa}', '{Fb}', '{∀xFx}', '{∃xFx}'], [['V', 'V', 'V', 'V'], ['V', 'A', 'A', 'V'], ['A', 'F', 'F', 'A'], ['F', 'F', 'F', 'F']]) },
      { say: 'Un ejemplo célebre es el conjunto de Russell, {R}: el de todos los conjuntos que no se pertenecen a sí mismos. La teoría ingenua de conjuntos prueba que {R} se pertenece y que no se pertenece. Con lógica clásica, la teoría entera estalla. Con LP, la contradicción queda encerrada en {R}.', mood: 'neutral' },
      { say: 'Un argumento es válido si conserva los valores designados (V y A) en todo dominio y toda interpretación. Vas a comprobar que el silogismo disyuntivo sigue fallando, ahora con cuantificadores.' }
    ]),
    M('Un individuo paradójico', 'LP', ['∀x(Fx∨Gx)', '∃x¬Fx'], '∃xGx', { dom: ['a', 'b'],
      intro: 'El dominio tiene dos individuos, a y b. Busca valores que hagan designadas las premisas y no la conclusión.',
      outro: 'Basta un individuo paradójico: si {Fa} vale A, a cumple {Fx∨Gx} y también {¬Fx}, aunque nada sea G.' }),
    T('Árboles de LP con cuantificadores', [
      { say: 'Los árboles de primer orden de LP llevan los signos del mundo anterior. Las reglas de los cuantificadores son las del Bosque, pero con signo: un universal designado se aplica a todos los nombres; uno no designado crea un nombre nuevo.',
        fig: rule(r(['{∀xA,+}'], [['{A(a),+}']], 'para cada nombre a'), r(['{∀xA,−}'], [['{A(c),−}']], 'c nuevo'), r(['{∃xA,+}'], [['{A(c),+}']], 'c nuevo'), r(['{∃xA,−}'], [['{A(a),−}']], 'para cada nombre a')) },
      { say: 'Los cuantificadores negados se mueven igual que las conectivas: {¬∀xA} equivale a {∃x¬A}, y {¬∃xA} a {∀x¬A}, con el mismo signo.',
        fig: rule(r(['{¬∀xA,±}'], [['{∃x¬A,±}']]), r(['{¬∃xA,±}'], [['{∀x¬A,±}']])) },
      { say: 'Compara tres mundos. De {¬∀xFx} a {∃x¬Fx}: en el Bosque fue un árbol de tres líneas, en el Taller no se puede probar, en LP es un solo paso. Cada lógica reparte de otra forma lo fácil y lo imposible.' }
    ]),
    A('Un solo paso', 'QLP', ['¬∀xFx'], '∃x¬Fx', {
      intro: 'El cuantificador negado se mueve con una sola regla.',
      outro: 'Válido: {¬∀xFx,+} pasa a {∃x¬Fx,+}, que contradice {∃x¬Fx,−}.' }),
    A('Nadie, luego este tampoco', 'QLP', ['¬∃xFx'], '¬Fa', {
      intro: 'Primero mueve la negación hacia dentro; después baja al caso particular.',
      outro: 'Válido: {∀x¬Fx} se aplica a {a} y choca con {¬Fa,−}.' }),
    A('Tercero excluido para todos', 'QLP', [], '∀x(Fx∨¬Fx)', {
      intro: 'Lo que el intuicionista no puede probar, en LP sale en pocos pasos.',
      outro: 'Válido: un individuo cualquiera no puede ser a la vez no verdadero y no falso, y eso cierra la rama.' }),
    A('Nada es contradictorio', 'QLP', [], '¬∃x(Fx∧¬Fx)', {
      intro: 'LP demuestra que no hay objetos contradictorios… y aun así admite modelos donde los hay. Las dos cosas valen a la vez.',
      outro: 'Válido: es un teorema, como en la lógica clásica, aunque haya modelos con objetos contradictorios.' }),
    A('Un objeto inconsistente', 'QLP', ['∃x(Fx∧¬Fx)'], '∃xFx∧¬∀xFx', {
      intro: 'De un objeto contradictorio no se sigue cualquier cosa. Se sigue justo esto.',
      outro: 'Válido: el individuo contradictorio es F y, a la vez, no F, así que algo es F y no todo lo es.' }),
    A('Silogismo disyuntivo con salvedad', 'QLP', ['∀x(Fx∨Gx)', '¬Fa'], 'Ga∨(Fa∧¬Fa)', {
      intro: 'Como en la Caverna: o bien {Ga}, o bien a es un objeto contradictorio.',
      outro: 'Válido: o {Ga} es designada, o {Fa} lo es junto con {¬Fa}.' }),
    A('Un individuo paradójico, en el árbol', 'QLP', ['∀x(Fx∨Gx)', '∃x¬Fx'], '∃xGx', {
      intro: 'El mismo argumento que refutaste a mano. Ahora deja que el árbol encuentre el contramodelo.',
      outro: 'Inválido: el individuo del existencial es F y no F a la vez, y nada es G.' }),
    Q('Leyes que resisten', [
      { q: 'En LP de primer orden, ¿es válido pasar de {∃x(Fx∧¬Fx)} a {∀xGx}?', opts: ['Sí, por explosión', 'No: la contradicción no contagia a los demás predicados'], ok: 1,
        why: 'Un individuo puede ser F y no F mientras todo lo demás sigue su curso. Eso es justamente ser paraconsistente.' },
      { q: '¿Cuál de estas es un teorema de LP?', opts: ['{∃x(Fx∧¬Fx)}', '{¬∃x(Fx∧¬Fx)}', 'Ninguna de las dos'], ok: 1,
        why: 'LP tiene los mismos teoremas que la lógica clásica, también con cuantificadores. Eso no impide que {∃x(Fx∧¬Fx)} sea verdadera en algunas interpretaciones.' },
      { q: 'En un dominio con solo a y b, {Fa} vale A y {Fb} vale V. ¿Cuánto vale {∀xFx}?', opts: ['V', 'A', 'F'], ok: 1,
        why: 'El universal toma el menor valor. Es designado, así que se acepta {∀xFx}, y también {¬∀xFx}.' }
    ]),
    A('Silogismo disyuntivo cuantificado', 'QLP', ['∀x(Fx∨Gx)', '∃x¬Fx'], '∃x(Gx∨(Fx∧¬Fx))', { boss: true,
      intro: 'El jefe del abismo: el argumento que viste fallar, reparado con su salvedad y con cuantificadores.',
      outro: 'Válido: el individuo del existencial cumple {Fx∨Gx}; o es {G}, o es {F} y no {F} a la vez.' }),
    V('La sonda del abismo', { sys: ['QLP'], cmp: 'CL', syms: '¬∧∨→↔∀∃', goals: ['valid', 'gap', 'own'],
      intro: 'La sonda evalúa argumentos con cuantificadores en LP y en la lógica clásica. Si encuentra un contraejemplo, te lo dibuja: cuánto vale cada predicado para cada individuo.',
      outro: 'Una contradicción en un individuo no contagia a los demás. Así es como LP encierra una paradoja.',
      ex: [[['∀x(Fx∨Gx)', '∃x¬Fx'], '∃xGx', 'invalid'], [['¬∀xFx'], '∃x¬Fx', 'valid'], [[], '¬∃x(Fx∧¬Fx)', 'valid'], [['∃x(Fx∧¬Fx)'], '∀xGx', 'invalid'], [['∀x(Fx→Gx)', 'Fa'], 'Ga', 'invalid'], [['∀x(Fx∨Gx)', '¬Fa'], 'Ga∨(Fa∧¬Fa)', 'valid']] })
  ]
});
})(window.CONTENT);
