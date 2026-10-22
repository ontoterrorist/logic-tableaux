/* Mundo 7 · Jardín de los Testigos: árboles intuicionistas de primer orden */
(function (C) {
const { T, Q, A, V, table, tab, rule, r, kripke } = C;
C.world({
  k: 7, name: 'Jardín de los Testigos', logic: 'Lógica intuicionista de primer orden', badge: '∃',
  intro: 'Aquí afirmar que algo existe obliga a mostrarlo. Cada existencial pide su testigo, y cada estado de conocimiento tiene sus propios individuos.',
  stages: [
    T('Cuantificar construyendo', [
      { say: 'Volvemos al taller de Brouwer, ahora con cuantificadores. La lectura constructiva se extiende así: probar {∃xA(x)} es exhibir un individuo concreto, el <b>testigo</b>, junto con una prueba de que cumple {A}.', mood: 'neutral' },
      { say: 'Y probar {∀xA(x)} es dar un método que, para cada individuo, produce una prueba de que cumple {A}.',
        fig: table(['Una prueba de…', 'consiste en…'], [['{∃xA(x)}', 'un testigo c y una prueba de {A(c)}'], ['{∀xA(x)}', 'un método que da una prueba de {A(c)} para cada c'], ['{¬∃xA(x)}', 'un método que lleva al absurdo cualquier testigo']]) },
      { say: 'Las reglas son las del Bosque, pero con estados de conocimiento. Lo que falta, como en el Mundo 5, es la doble negación. Por eso «no todos son F» ya no basta para concluir «hay uno que no es F»: nadie te ha dado el testigo.' },
      { say: 'A cambio se gana la <b>propiedad de la existencia</b>: si la lógica intuicionista prueba {∃xA(x)} sin premisas, entonces prueba {A(c)} para algún individuo concreto. Una prueba de existencia siempre trae a su testigo.' }
    ]),
    T('Individuos que aparecen', [
      { say: 'En los estados de conocimiento de primer orden, cada estado tiene su propio <b>dominio</b>, y los dominios solo crecen: lo ya construido no desaparece, pero pueden aparecer individuos nuevos. La línea {Ea,+i} dice «a existe en el estado i».' },
      { say: 'Las reglas de los cuantificadores tienen en cuenta eso: {∃xA,+i} da un individuo nuevo que existe en {i}; {∀xA,+i} solo habla de individuos que existen en los estados posteriores. Para negar un universal hay que crear un estado nuevo y un individuo nuevo.',
        fig: rule(r(['{∃xA,+i}'], [['{Ec,+i}', '{A(c),+i}']], 'c nuevo'), r(['{∀xA,−i}'], [['{irj}', '{Ec,+j}', '{A(c),−j}']], 'j y c nuevos'), r(['{∀xA,+i}', '{irj}'], [['{Ea,−j}'], ['{A(a),+j}']], 'para cada nombre a')) },
      { say: 'Los árboles son más largos que los clásicos: cada nombre y cada estado le dan trabajo a todos los cuantificadores. Ve con orden: primero lo que crea individuos y estados, luego lo que los recorre.' }
    ]),
    A('Un testigo en contra', 'IQ', ['∃x¬Fx'], '¬∀xFx', {
      intro: 'Un contraejemplo refuta un universal. La inversa, de {¬∀xFx} a {∃x¬Fx}, no es constructiva: no te da el testigo.',
      outro: 'Válido: el testigo {a} de la premisa llega al estado donde se supone {∀xFx}, y allí {Fa} choca con {¬Fa}.' }),
    A('Ninguno, luego todos no', 'IQ', ['¬∃xFx'], '∀x¬Fx', {
      intro: 'Esta ley ya la probaste en el Bosque. No usa la doble negación, así que también vale aquí.',
      outro: 'Válido: si hubiera un {Fa} en un estado posterior, {∃xFx} valdría ya y contradiría la premisa.' }),
    A('Todos no, luego ninguno', 'IQ', ['∀x¬Fx'], '¬∃xFx', {
      intro: 'La dirección contraria. Para refutar un existencial, supón que hay testigo y llévalo al absurdo.',
      outro: 'Válido: el testigo {a} cumple {Fa} y, por el universal, también {¬Fa}.' }),
    A('El testigo se reparte', 'IQ', ['∃x(Fx∧Gx)'], '∃xFx∧∃xGx', {
      intro: 'Un mismo testigo sirve para dos existenciales.',
      outro: 'Válido: {Fa∧Ga} da {Fa} y {Ga}, y con esos dos testigos no queda nada que negar.' }),
    A('Del método al testigo', 'IQ', ['∀x(Fx→Gx)'], '∃xFx→∃xGx', {
      intro: 'Un universal es un método. Aplícaselo al testigo y tendrás un testigo nuevo.',
      outro: 'Válido: con {Fa} se obtiene {Ga}, y {∃xGx} queda probada.' }),
    A('Testigo bajo doble negación', 'IQ', ['∃x¬¬Fx'], '¬¬∃xFx', { boss: true,
      intro: 'El jefe del jardín: la doble negación puede salir del existencial hacia fuera. Hacia dentro, no. El árbol es largo; ve con orden.',
      outro: 'Válido: el testigo {a} cumple {¬¬Fa}, y cualquier estado posterior donde {Fa} se probara contradice {¬Fa}.' }),
    A('Sin testigo', 'IQ', ['¬¬∃xFx'], '∃xFx', {
      intro: 'Saber que no puede refutarse que haya un F no es tener un F a la vista. Construye el árbol.',
      outro: 'Inválido: en el estado 0 no hay ningún individuo que sea F; el testigo solo llega después.' }),
    A('Todo decidido', 'IQ', [], '∀x(Fx∨¬Fx)', {
      intro: 'El tercero excluido para cada individuo tampoco es constructivo. Construye el árbol.',
      outro: 'Inválido: hay un estado con un individuo del que aún no se sabe si es F; solo en un estado posterior se prueba que lo es.' }),
    T('Mundos que crecen', [
      { say: '{∀xA} vale en un estado si {A} vale de todos los individuos de ese estado <i>y de todos los estados posteriores</i>. {∃xA} vale si {A} vale ya de algún individuo presente.',
        fig: kripke([{ id: 'w0', t: 'Ea' }, { id: 'w1', t: 'Ea, Eb, Fa' }], [['w0', 'w1']],
          'En w0 vale {¬∀xFx}: b nunca llega a ser F. Pero no vale {∃x¬Fx}: el único individuo de w0 es a, y {Fa} se prueba en w1.') },
      { say: 'Ese modelo es un contraejemplo de {¬∀xFx→∃x¬Fx}. El clásico razona «si no todos, alguno no»; el constructivista pregunta «¿cuál?», y en w0 no hay respuesta.' }
    ]),
    Q('¿Con testigo o sin él?', [
      { q: '¿Se puede probar {¬∀xFx→∃x¬Fx} en lógica intuicionista?', opts: ['Sí', 'No'], ok: 1,
        why: 'Saber que no todos son F no entrega ningún individuo concreto que no lo sea. El modelo de los dos estados lo refuta.' },
      { q: '¿Y {∃x¬Fx→¬∀xFx}?', opts: ['Sí', 'No'], ok: 0,
        why: 'Aquí el testigo viene en la premisa: basta aplicarle el universal para llegar al absurdo. Lo acabas de probar.' },
      { q: '¿Y {∀x¬¬Fx→¬¬∀xFx}?', opts: ['Sí', 'No'], ok: 1,
        why: 'Es el «desplazamiento de la doble negación». Que cada individuo sea irrefutablemente F no da un método uniforme para todos; falla en modelos con infinitos estados, y por eso el árbol no termina.' },
      { q: 'Si se prueba {∃xA(x)} sin premisas, ¿qué garantiza la lógica intuicionista?', opts: ['Nada más', 'Que se puede probar {A(c)} para algún c concreto', 'Que {A} vale de todos los individuos'], ok: 1,
        why: 'Es la <b>propiedad de la existencia</b>, hermana de la propiedad de la disyunción. En lógica clásica falla: se prueba {∃x(Fx→∀yFy)} sin poder señalar a nadie.' }
    ]),
    V('El buscador de testigos', { sys: ['IQ'], cmp: 'CL', syms: '¬∧∨→↔∀∃', goals: ['valid', 'gap', 'own'],
      intro: 'El buscador compara la lógica intuicionista de primer orden con la clásica y, cuando hay contramodelo, te lo dibuja con sus estados y sus individuos.',
      outro: 'Algunos argumentos solo se refutan con infinitos estados, como {∀x¬¬Fx ⊢ ¬¬∀xFx}. Entonces el árbol crece sin cerrarse y el buscador reconoce que no puede decidir.',
      ex: [[['¬∀xFx'], '∃x¬Fx', 'invalid'], [['∃x¬Fx'], '¬∀xFx', 'valid'], [['¬¬∃xFx'], '∃xFx', 'invalid'], [[], '∀x(Fx∨¬Fx)', 'invalid'], [['∃x(Fx∧Gx)'], '∃xFx∧∃xGx', 'valid'], [['¬¬∃xFx', '∀x(Fx→Gx)'], '¬¬∃xGx', 'valid'], [['∀x¬¬Fx'], '¬¬∀xFx', 'unknown']] })
  ]
});
})(window.CONTENT);
