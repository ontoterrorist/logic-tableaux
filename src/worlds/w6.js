/* Mundo 6 · Caverna de las Contradicciones: árboles de LP, la lógica de la paradoja */
(function (C) {
const { T, Q, A, M, V, table, tab, rule, r } = C;
C.world({
  k: 6, name: 'Caverna de las Contradicciones', logic: 'Lógica paraconsistente (LP)', badge: '⊥',
  intro: 'Aquí abajo una contradicción no hace estallar nada. Entra con cuidado: el árbol ya no cierra una rama por cualquier choque.',
  stages: [
    T('La explosión', [
      { say: 'Última parada de las lógicas proposicionales. En lógica clásica e intuicionista vale el principio de <b>explosión</b>: de una contradicción se sigue cualquier cosa, {P, ¬P ⊢ Q}. Tú misma lo viste: la rama de {P} y {¬P} se cierra sin mirar a {Q}.' },
      { say: 'Eso significa que una teoría con una sola contradicción lo prueba todo y deja de servir. Pero razonamos a diario con información inconsistente: bases de datos con errores, teorías científicas en conflicto, leyes que chocan, paradojas.' },
      { say: 'Una lógica es <b>paraconsistente</b> si rechaza la explosión. Algunos filósofos, como Graham Priest, van más lejos y sostienen que hay contradicciones verdaderas (<b>dialeteísmo</b>). La oración del mentiroso, «esta oración es falsa», sería una.' }
    ]),
    T('LP: tres valores', [
      { say: 'La <b>Lógica de la Paradoja</b> (LP) añade un tercer valor. Una oración puede ser verdadera (V), falsa (F) o <b>ambas cosas</b> (A).' },
      { say: 'Las conectivas se calculan ordenando los valores: F, A, V. La conjunción toma el menor, la disyunción el mayor, y la negación intercambia V y F y deja A como está.',
        fig: [table(['{A}', '{¬A}'], [['V', 'F'], ['A', 'A'], ['F', 'V']]), table(['{∧}', 'V', 'A', 'F'], [['<b>V</b>', 'V', 'A', 'F'], ['<b>A</b>', 'A', 'A', 'F'], ['<b>F</b>', 'F', 'F', 'F']])] },
      { say: 'Un argumento es válido en LP si, siempre que las premisas son <b>al menos verdaderas</b> (V o A), la conclusión también lo es. V y A son los valores <b>designados</b>.' },
      { say: 'Ahora te toca desactivar la explosión. Busca una valuación donde las premisas sean designadas y la conclusión no.' }
    ]),
    M('Desactivar la bomba', 'LP', ['P', '¬P'], 'Q', {
      intro: 'En lógica clásica esto no tiene contraejemplo. En LP sí: usa el tercer valor.',
      outro: 'Si {P} es verdadera y falsa a la vez, {P} y {¬P} son designadas, y {Q} puede ser simplemente falsa. La explosión no es válida en LP.' }),
    M('Adiós al silogismo disyuntivo', 'LP', ['P∨Q', '¬P'], 'Q', {
      intro: 'El silogismo disyuntivo es el motor oculto de la explosión. Muestra que tampoco vale.',
      outro: 'Falla cuando {P} es verdadera y falsa a la vez. Y como el condicional material {P→Q} es {¬P∨Q}, con él falla también el modus ponens.' }),
    T('Árboles de LP', [
      { say: 'Los árboles de LP llevan un signo en cada línea. {A,+} dice que {A} es <b>designada</b> (valor V o A); {A,−} dice que {A} no lo es (valor F). El árbol busca valores que hagan designadas las premisas y no designada la conclusión.' },
      { say: 'La negación no tiene regla propia sobre {¬A,+}: puede ser designada aunque {A} también lo sea. Lo que sí hay son reglas de De Morgan y de doble negación, que mueven la negación hacia dentro, con el mismo signo.',
        fig: rule(r(['{¬¬A,±}'], [['{A,±}']]), r(['{¬(A∧B),±}'], [['{¬A∨¬B,±}']]), r(['{¬(A∨B),±}'], [['{¬A∧¬B,±}']])) },
      { say: 'Una rama se cierra con {A,+} y {A,−}, como siempre. Pero ahora hay un cierre más: {A,−} y {¬A,−} juntas son imposibles, porque en LP toda fórmula es verdadera o falsa. {A,+} y {¬A,+} no chocan: eso es justo una contradicción verdadera.' },
      { say: 'Un dato curioso: LP tiene exactamente los mismos <b>teoremas</b> que la lógica clásica. Hasta {¬(P∧¬P)} es un teorema. Lo que cambia son las <b>inferencias</b> válidas: hay menos.' }
    ]),
    A('Explosión en el árbol', 'LP', ['P', '¬P'], 'Q', {
      intro: 'La lista inicial tiene {P,+}, {¬P,+} y {Q,−}. Esas líneas no chocan: construye el árbol y mira qué queda.',
      outro: 'Inválido: con {P} verdadera y falsa a la vez y {Q} falsa, las premisas son designadas y la conclusión no.' }),
    A('De Morgan a secas', 'LP', ['¬(P∨Q)'], '¬P', {
      intro: 'Sin reducción al absurdo. La negación se mueve con De Morgan.',
      outro: 'Válido: {¬(P∨Q)} da {¬P∧¬Q}, y de ahí {¬P,+}, que contradice {¬P,−}.' }),
    A('No contradicción, pese a todo', 'LP', [], '¬(P∧¬P)', {
      intro: 'LP admite contradicciones verdaderas y aun así prueba la ley de no contradicción.',
      outro: 'Válido: {¬(P∧¬P),−} se vuelve {¬P∨¬¬P,−}, y una disyunción no designada exige que las dos partes lo sean: choca con el cierre propio de LP.' }),
    A('De Morgan y vuelta', 'LP', ['¬(P∧Q)'], '¬Q∨¬P', {
      intro: 'La prueba por casos sigue funcionando como siempre.',
      outro: 'Válido: de {¬(P∧Q)} sale {¬P∨¬Q}, y cada caso se cierra contra la conclusión.' }),
    A('Silogismo disyuntivo con salvedad', 'LP', ['P', '¬P∨Q'], 'Q∨(P∧¬P)', {
      intro: 'El silogismo disyuntivo no vale en LP, pero sí una versión prudente: o bien {Q}, o bien hay una contradicción.',
      outro: 'Válido: o {Q} es designada, o {¬P} lo es junto con {P}, y eso hace designada a {P∧¬P}.' }),
    A('Modus ponens con salvedad', 'LP', ['¬(P∧¬Q)', 'P'], 'Q∨(P∧¬P)', { boss: true,
      intro: 'El jefe final. {¬(P∧¬Q)} es otra forma de escribir «si P entonces Q». En LP solo puedes separar el consecuente con una salvedad.',
      outro: 'Válido: la premisa se vuelve {¬P∨¬¬Q}. En una rama {P} y {¬P} son designadas, y entonces {P∧¬P} también; en la otra, {Q} lo es.' }),
    T('El mapa de las lógicas', [
      { say: 'Has recorrido seis lógicas. Mira qué acepta cada una.',
        fig: table(['Principio', 'Clásica', 'Intuicionista', 'LP'], [['{P∨¬P}', 'sí', 'no', 'sí'], ['{¬¬P ⊢ P}', 'sí', 'no', 'sí'], ['{P, ¬P ⊢ Q}', 'sí', 'sí', 'no'], ['{P∨Q, ¬P ⊢ Q}', 'sí', 'sí', 'no']]) },
      { say: 'La lógica clásica lo acepta todo. La intuicionista renuncia al tercero excluido a cambio de pruebas constructivas. La paraconsistente renuncia a la explosión para convivir con contradicciones. Las modales no quitan nada: añaden operadores para hablar de necesidad y posibilidad.' },
      { say: 'Cada una responde a una idea distinta de qué es la verdad y qué significa que algo se siga de algo. Queda un examen final. Después, la caverna es tuya.' }
    ]),
    Q('Examen final', [
      { q: '¿Qué se pierde al pasar de la lógica clásica a la intuicionista?', opts: ['La doble negación: {¬¬P→P}', 'El modus ponens', 'La conjunción'], ok: 0,
        why: 'Sin ella no se pueden probar ni {P∨¬P} ni {¬¬P→P}: el árbol deja una rama abierta.' },
      { q: '¿Qué representa un mundo nuevo en un árbol modal?', opts: ['Un supuesto cualquiera', 'Un mundo accesible desde el actual', 'Un individuo arbitrario'], ok: 1,
        why: 'Por eso {◇A} lo crea y {□A} se aplica a todos los que ya existen.' },
      { q: '¿Qué tienen en común la lógica clásica y LP?', opts: ['Los mismos teoremas', 'Las mismas inferencias válidas', 'Los mismos valores de verdad'], ok: 0,
        why: 'LP prueba las mismas fórmulas sin premisas, pero valida menos inferencias: fallan la explosión y el silogismo disyuntivo.' },
      { q: '¿Cuál de estas lógicas rechaza {P, ¬P ⊢ Q}?', opts: ['Intuicionista', 'S5', 'LP'], ok: 2,
        why: 'Solo las lógicas paraconsistentes rechazan la explosión. ¡Q.E.D.!' }
    ]),
    V('El detector de explosiones', { sys: ['LP'], cmp: 'CL', syms: '¬∧∨→↔', goals: ['valid', 'gap', 'own'],
      intro: 'El detector analiza cada argumento en LP, con árboles de signos, y también en la lógica clásica. Busca argumentos clásicamente válidos que fallen en LP: su contraejemplo siempre usa el valor A.',
      outro: 'LP no pierde teoremas, pierde inferencias: las que, como la explosión, pasan de una contradicción a cualquier cosa.',
      ex: [[['P', '¬P'], 'Q', 'invalid'], [['P∨Q', '¬P'], 'Q', 'invalid'], [['P', 'P→Q'], 'Q', 'invalid'], [[], 'P∨¬P', 'valid'], [[], '¬(P∧¬P)', 'valid'], [['¬(P∧Q)'], '¬P∨¬Q', 'valid'], [['P'], 'Q∨¬Q', 'valid']] })
  ]
});
})(window.CONTENT);
