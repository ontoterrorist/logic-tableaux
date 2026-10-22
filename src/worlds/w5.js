/* Mundo 5 · Taller del Constructor: árboles intuicionistas */
(function (C) {
const { T, Q, A, V, table, tab, rule, r, kripke } = C;
C.world({
  k: 5, name: 'Taller del Constructor', logic: 'Lógica intuicionista', badge: '¬¬',
  intro: 'En este taller solo cuenta lo que se construye. Una regla se queda en la puerta, y los árboles aprenden a mirar hacia el futuro.',
  stages: [
    T('La verdad como construcción', [
      { say: 'Este taller es de L. E. J. Brouwer. Para el <b>intuicionismo</b>, afirmar una proposición matemática es tener una construcción que la pruebe. La verdad no está ahí esperando: se construye.' },
      { say: 'Eso cambia el significado de las conectivas. Es la interpretación BHK (Brouwer, Heyting, Kolmogórov).',
        fig: table(['Una prueba de…', 'consiste en…'], [['{A∧B}', 'una prueba de A y una prueba de B'], ['{A∨B}', 'una prueba de A o una de B, sabiendo cuál'], ['{A→B}', 'un método que convierte pruebas de A en pruebas de B'], ['{¬A}', 'un método que convierte cualquier prueba de A en un absurdo']]) },
      { say: 'Con esa lectura, {P∨¬P} deja de ser obvia: exigiría tener una prueba de {P} o una refutación de {P}, y hay problemas abiertos para los que no tenemos ninguna de las dos.' }
    ]),
    T('Estados de conocimiento', [
      { say: 'Kripke dio una semántica para el intuicionismo. Los puntos son <b>estados de conocimiento</b> ordenados en el tiempo. Lo que ya está probado sigue probado después: el conocimiento solo crece.' },
      { say: '{¬A} vale en un estado si {A} no llega a valer en ningún estado posterior. {A→B} vale si en todo estado posterior donde valga {A} vale también {B}.',
        fig: kripke([{ id: 'w0', t: '' }, { id: 'w1', t: 'P' }], [['w0', 'w1']],
          'En w0 no vale {P}: aún no está probada. Tampoco vale {¬P}: en w1 se prueba. Así que en w0 no vale {P∨¬P}.') },
      { say: 'Ese diagrama es un contramodelo del tercero excluido. Y sin embargo {¬¬(P∨¬P)} sí se puede probar: el tercero excluido no es demostrable, pero tampoco refutable.' }
    ]),
    T('Árboles que miran al futuro', [
      { say: 'En los árboles intuicionistas cada línea lleva un signo y un estado: {A,+i} dice «A está probada en el estado i»; {A,−i}, «A no está probada en i». Una línea {irj} dice que j es un estado posterior a i.' },
      { say: 'Las reglas de {∧} y {∨} se parecen a las clásicas. Pero {¬} y {→} miran a <b>todos los estados posteriores</b>, y al negar crean uno nuevo.',
        fig: rule(r(['{¬A,+i}', '{irj}'], [['{A,−j}']], 'para cada j'), r(['{¬A,−i}'], [['{irj}', '{A,+j}']], 'j nuevo'), r(['{A→B,−i}'], [['{irj}', '{A,+j}', '{B,−j}']], 'j nuevo'), r(['{A→B,+i}', '{irj}'], [['{A,−j}'], ['{B,+j}']], 'para cada j')) },
      { say: 'Una rama se cierra cuando tiene {A,+i} y {A,−i} en el mismo estado. Además, lo probado se hereda: una letra probada en {i} sigue probada en los estados que {i} ve. El árbol aplica esa herencia solo.',
        fig: tab('I', ['P'], '¬¬P', 'La rama se cierra: lo que vale en el estado 0 vale también en el estado 1.') },
      { say: 'Fíjate en la diferencia con la lógica clásica: aquí la lista inicial pone la conclusión como {C,−0} («no probada»), no como {¬C}. Es lo que impide usar la doble negación a la ligera.' }
    ]),
    A('La mitad buena', 'I', ['P'], '¬¬P', {
      intro: 'La doble negación sí se puede <i>introducir</i>.',
      outro: 'Válido: si {P} está probada en el estado 0, sigue probada en todos los posteriores.' }),
    A('Triple negación', 'I', ['¬¬¬P'], '¬P', {
      intro: 'Tres negaciones se reducen a una. Dos no se reducen a ninguna.',
      outro: 'Válido: la rama se cierra con {¬¬¬P} y {P}.' }),
    A('Contraposición constructiva', 'I', ['P→Q'], '¬Q→¬P', {
      intro: 'Esta dirección de la contraposición vale también aquí.',
      outro: 'Válido: en los estados posteriores, {P→Q} y {¬Q} refutan {P}.' }),
    A('De Morgan constructivo', 'I', ['¬(P∨Q)'], '¬P∧¬Q', {
      intro: 'Esta ley de De Morgan vale también aquí. La que venciste en el Mundo 1 no.',
      outro: 'Válido: negar una disyunción refuta cada parte.' }),
    A('Del «o» al «si»', 'I', ['¬P∨Q'], 'P→Q', {
      intro: 'Vale en esta dirección. La inversa, de {P→Q} a {¬P∨Q}, no es constructiva.',
      outro: 'Válido: en cada estado posterior donde valga {P}, la disyunción fuerza {Q}.' }),
    A('Sin tercero excluido', 'I', [], 'P∨¬P', {
      intro: 'En el Mundo 1 este árbol se cerraba en tres líneas. Ahora construye el árbol completo: una rama no se va a cerrar.',
      outro: 'Inválido: la rama abierta es el modelo de dos estados: en el 0 no se sabe nada de {P}, y en el 1 se prueba.' }),
    A('Sin doble negación', 'I', ['¬¬P'], 'P', {
      intro: 'Saber que {P} no puede refutarse no es haberla construido. Construye el árbol.',
      outro: 'Inválido: en el mismo modelo de dos estados, {¬¬P} vale en el 0 y {P} no.' }),
    Q('¿Constructivo o no?', [
      { q: '¿Se puede probar {¬¬P→P} en lógica intuicionista?', opts: ['Sí', 'No'], ok: 1,
        why: 'En el modelo de dos estados, en w0 vale {¬¬P} (no hay estado posterior donde valga {¬P}) pero no vale {P}.' },
      { q: '¿Y {¬(P∧Q)→(¬P∨¬Q)}?', opts: ['Sí', 'No'], ok: 1,
        why: 'Saber que {P} y {Q} no pueden darse juntas no te dice cuál de las dos falla, y una disyunción exige saber cuál.' },
      { q: '¿Y {(¬P∨¬Q)→¬(P∧Q)}?', opts: ['Sí', 'No'], ok: 0,
        why: 'Si tienes refutada una de las dos, cualquier prueba de {P∧Q} lleva al absurdo. Es una prueba por casos corriente.' },
      { q: 'Si en lógica intuicionista se prueba {A∨B} sin premisas, ¿qué más se sabe?', opts: ['Nada más', 'Que se puede probar {A} o se puede probar {B}', 'Que {A} y {B} son equivalentes'], ok: 1,
        why: 'Es la <b>propiedad de la disyunción</b>. La lógica clásica no la tiene: prueba {P∨¬P} sin probar ninguna de las dos.' }
    ]),
    A('Doble negación repartida', 'I', ['¬¬(P∧Q)'], '¬¬P', {
      intro: 'La doble negación atraviesa la conjunción.',
      outro: 'Válido: la premisa y la conclusión negada se contradicen en los estados posteriores.' }),
    A('Tercero no refutable', 'I', [], '¬¬(P∨¬P)', { boss: true,
      intro: 'Teorema de Glivenko: si una fórmula proposicional se prueba clásicamente, su doble negación se prueba intuicionistamente. Compruébalo con el tercero excluido.',
      outro: 'Válido: el tercero excluido no se puede probar, pero tampoco refutar.' }),
    A('Glivenko otra vez', 'I', [], '¬¬(¬¬P→P)', { boss: true,
      intro: 'El último jefe del taller: la eliminación de la doble negación tampoco es refutable.',
      outro: 'Válido: aunque {¬¬P→P} no se prueba, negarla lleva siempre al absurdo.' }),
    V('El banco de pruebas', { sys: ['I'], cmp: 'CL', syms: '¬∧∨→↔', goals: ['valid', 'gap', 'own'],
      intro: 'El banco compara dos lógicas a la vez: la intuicionista y la clásica. Si un argumento falla constructivamente, dibuja los estados de conocimiento que lo refutan: cada flecha lleva a un estado que sabe más.',
      outro: 'Todo argumento intuicionista es clásico, pero no al revés. Lo que se pierde es justo lo que necesita la doble negación.',
      ex: [[['P'], '¬¬P', 'valid'], [['¬¬P'], 'P', 'invalid'], [[], 'P∨¬P', 'invalid'], [[], '¬¬(P∨¬P)', 'valid'], [['¬(P∧Q)'], '¬P∨¬Q', 'invalid'], [['P→Q'], '¬P∨Q', 'invalid'], [[], '((P→Q)→P)→P', 'invalid'], [['¬¬¬P'], '¬P', 'valid']] })
  ]
});
})(window.CONTENT);
