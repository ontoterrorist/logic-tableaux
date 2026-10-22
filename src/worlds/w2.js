/* Mundo 2 · Bosque de los Cuantificadores: árboles de primer orden */
(function (C) {
const { T, Q, A, V, table, tab, rule, r } = C;
C.world({
  k: 2, name: 'Bosque de los Cuantificadores', logic: 'Lógica de primer orden', badge: '∀',
  intro: 'Entre estos árboles las oraciones se abren: hay individuos, propiedades y dos cuantificadores. Los árboles también crecen aquí, y a veces sin parar.',
  stages: [
    T('Nombres, predicados y cuantificadores', [
      { say: 'La lógica proposicional no ve dentro de las oraciones. La de <b>primer orden</b> sí: distingue individuos y lo que se dice de ellos. Los <b>nombres</b> ({a}, {b}, {c}…) designan individuos; los <b>predicados</b> ({F}, {G}, {R}…) expresan propiedades y relaciones.',
        fig: table(['Fórmula', 'Se lee'], [['{Fa}', 'a es F'], ['{Rab}', 'a está en la relación R con b'], ['{∀xFx}', 'todo es F'], ['{∃xFx}', 'algo es F']]) },
      { say: 'Los <b>cuantificadores</b> usan variables ({x}, {y}, {z}). «Todos los humanos son mortales» se escribe {∀x(Hx→Mx)}. «Algún humano es sabio» se escribe {∃x(Hx∧Sx)}. Fíjate en el patrón: {∀} suele ir con {→}, y {∃} con {∧}.' },
      { say: 'Todas las reglas de los árboles proposicionales siguen valiendo. Solo añadimos cuatro: una para cada cuantificador y una para cada cuantificador negado.' }
    ]),
    T('Las reglas de ∀ y ∃', [
      { say: 'Si todo es {F}, entonces cualquier individuo es {F}. La regla de {∀} pone, en lugar de la variable, <b>cada nombre</b> que aparezca en la rama. Si todavía no hay ninguno, inventa uno.',
        fig: rule(r(['{∀xA(x)}'], [['{A(a)}']], 'para cada nombre a de la rama')) },
      { say: 'Si algo es {F} pero no sabemos qué, le ponemos un nombre provisional: «llamemos {c} a ese individuo». El nombre tiene que ser <b>nuevo</b>, o estaríamos suponiendo que es alguien que ya conocemos.',
        fig: rule(r(['{∃xA(x)}'], [['{A(c)}']], 'con un nombre c nuevo')) },
      { say: 'Los cuantificadores negados se cambian de lugar con la negación: «no todo es F» es «algo no es F», y «nada es F» es «todo es no F».',
        fig: rule(r(['{¬∀xA(x)}'], [['{∃x¬A(x)}']]), r(['{¬∃xA(x)}'], [['{∀x¬A(x)}']])) },
      { say: 'Una diferencia importante: la regla de {∃} se usa una vez; la de {∀} no se agota nunca, porque cada nombre nuevo que aparezca le da trabajo otra vez. Por eso la línea de un {∀} no se marca como usada.' }
    ]),
    A('Sócrates', 'FOL', ['∀x(Hx→Mx)', 'Ha'], 'Ma', {
      intro: 'Todos los humanos son mortales. {a} es humano. Ya sabes cómo acaba.',
      outro: 'Válido: el universal baja a {a}, y las dos ramas del condicional se contradicen.' }),
    A('De todos a alguno', 'FOL', ['∀xFx'], '∃xFx', {
      intro: 'En lógica clásica el dominio nunca está vacío: si todo es {F}, algo es {F}.',
      outro: 'Válido: {¬∃xFx} se convierte en {∀x¬Fx}, y con el nombre que se inventó choca con {∀xFx}.' }),
    A('Narciso', 'FOL', ['Laa'], '∃xLxa', {
      intro: '{Laa} dice que a se ama a sí mismo. Prueba que alguien ama a {a}.',
      outro: 'Válido: el negado universal aplicado a {a} contradice la premisa.' }),
    T('El individuo arbitrario', [
      { say: '¿Cómo se prueba que <i>todo</i> es {F}? No puedes revisar los individuos uno por uno. En un árbol se hace lo contrario: se supone que <i>no todo</i> es {F}.' },
      { say: '{¬∀xFx} se convierte en {∃x¬Fx} y recibe un nombre <b>nuevo</b>, {c}. Ese {c} es un individuo arbitrario: de él no sabemos nada salvo lo que dicen las líneas de la rama. Si aun así la rama se contradice, es que cualquier individuo habría servido.',
        fig: tab('FOL', ['∀x(Fx→Gx)', '∀xFx'], '∀xGx', 'El nombre nuevo {a} aparece al negar la conclusión. El universal de las premisas se aplica a él y todo se cierra.') },
      { say: 'Por eso la condición del nombre nuevo es tan importante. Si la premisa fuera {Fa}, no podrías concluir {∀xFx}: de {a} sabes algo particular, y el árbol lo mostraría con una rama abierta.' }
    ]),
    A('Barbara', 'FOL', ['∀x(Fx→Gx)', '∀xFx'], '∀xGx', {
      intro: 'Empieza por la conclusión negada: te dará el nombre nuevo. Después aplica los universales a ese nombre.',
      outro: 'Válido: con el nombre nuevo, {Fa→Ga} y {Fa} dan {Ga}, que contradice {¬Ga}.' }),
    A('Repartir el todo', 'FOL', ['∀x(Fx∧Gx)'], '∀xFx∧∀xGx', {
      intro: 'El universal se reparte sobre la conjunción.',
      outro: 'Válido: las dos ramas de la conclusión negada piden un nombre nuevo, y en cada una la premisa lo contradice.' }),
    T('Ponerle nombre al existente', [
      { say: 'Cuando una premisa es {∃xA(x)} hay que ponerle nombre antes de seguir. Haz esta regla <b>primero</b>: así el nombre nuevo ya existe cuando apliques los universales, y ellos también lo usarán.' },
      { say: 'El orden importa mucho en los árboles de primer orden. Primero lo que no ramifica y crea nombres ({∃}, {¬∀}); después los universales sobre todos los nombres; las ramas por último.' },
      { say: 'En general, un árbol de primer orden puede no terminar nunca: cada {∃} crea un nombre, y cada nombre le da trabajo a todos los {∀}. Más adelante verás un ejemplo. Los que vas a hacer ahora sí terminan.' }
    ]),
    A('Quedarse con una parte', 'FOL', ['∃x(Fx∧Gx)'], '∃xFx', {
      intro: 'Ponle nombre al individuo que existe y trabaja con él.',
      outro: 'Válido: {Fa∧Ga} da {Fa}, y {¬∃xFx} aplicado a {a} la contradice.' }),
    A('Darii', 'FOL', ['∀x(Fx→Gx)', '∃xFx'], '∃xGx', {
      intro: 'Todo F es G, y algo es F.',
      outro: 'Válido: con el nombre del existente, la premisa universal da {Ga}, que contradice {¬Ga}.' }),
    A('Nadie', 'FOL', ['¬∃xFx'], '∀x¬Fx', {
      intro: 'Si no hay ningún F, entonces todos son no-F.',
      outro: 'Válido: la conclusión negada da un individuo {a} con {Fa}, que contradice la premisa.' }),
    A('Orden de cuantificadores', 'FOL', ['∃x∀yRxy'], '∀y∃xRxy', {
      intro: 'Si alguien se relaciona con todos, entonces con cada uno se relaciona alguien.',
      outro: 'Válido: el que se relaciona con todos sirve de testigo para cada uno.' }),
    Q('¿Y al revés?', [
      { q: 'Acabas de probar que {∃x∀yRxy} implica {∀y∃xRxy}. ¿Vale también la inversa?',
        opts: ['Sí, son equivalentes', 'No: «cada uno tiene una madre» no implica «hay una madre de todos»', 'Solo si el dominio es infinito'], ok: 1,
        why: 'Lee {Rxy} como «x es madre de y». Que cada uno tenga su madre no significa que exista una única madre de todos. Si pruebas con un árbol, no termina nunca: cada madre nueva necesita otra madre.' },
      { q: '¿Por qué la regla de {∃} exige un nombre nuevo?',
        opts: ['Para que el árbol sea más corto', 'Porque no sabemos quién es el individuo, y no podemos suponer que es alguien que ya conocemos', 'Porque los nombres no pueden repetirse'], ok: 1,
        why: 'Si usáramos un nombre viejo, estaríamos añadiendo información que no tenemos, y podríamos «probar» cosas que no se siguen.' },
      { q: 'Un árbol de primer orden nunca termina. ¿Qué puedes concluir?', opts: ['Que el argumento es válido', 'Que el argumento es inválido', 'Nada seguro: la lógica de primer orden no es decidible'], ok: 2,
        why: 'Church y Turing probaron en 1936 que ningún método decide siempre la validez en primer orden. Los árboles prueban todo lo válido, pero no siempre pueden refutar lo inválido.' }
    ]),
    A('Dos existenciales', 'FOL', ['∃xFx', '∃xGx'], '∃x(Fx∧Gx)', {
      intro: 'Que algo sea F y algo sea G no dice que sea lo mismo. Construye el árbol: una rama no se va a cerrar.',
      outro: 'Inválido: {a} es F, {b} es G, y ninguno es las dos cosas.' }),
    A('Repartir mal', 'FOL', ['∀x(Fx∨Gx)'], '∀xFx∨∀xGx', {
      intro: 'Todo es F o G. ¿Se sigue que todo es F o todo es G? Construye el árbol completo.',
      outro: 'Inválido: {a} puede ser F sin ser G y {b} ser G sin ser F.' }),
    A('El bebedor', 'FOL', [], '∃x(Fx→∀yFy)', { boss: true,
      intro: 'El jefe del bosque, una paradoja famosa: «en todo bar hay alguien tal que, si él bebe, todos beben». Es una verdad lógica. Mira cómo la prueba el árbol.',
      outro: 'Válido: si todos beben, cualquiera sirve; si alguien no bebe, ese sirve, porque su antecedente es falso.' }),
    V('El vigía del bosque', { sys: ['FOL'], syms: '¬∧∨→↔∀∃', goals: ['valid', 'invalid', 'own'],
      intro: 'El vigía construye el árbol y, si se hace demasiado grande, se detiene y reconoce que no sabe. Con predicados de un solo lugar, como {Fx}, siempre llega a una respuesta.',
      outro: 'Con relaciones como {Rxy}, el vigía a veces tendrá que decir «sin decidir»: la lógica de primer orden no es decidible.',
      ex: [[['∀x(Hx→Mx)', 'Ha'], 'Ma', 'valid'], [['∃x∀yRxy'], '∀y∃xRxy', 'valid'], [['∃xFx', '∃xGx'], '∃x(Fx∧Gx)', 'invalid'], [['∀x(Fx∨Gx)'], '∀xFx∨∀xGx', 'invalid'], [['¬∀xFx'], '∃x¬Fx', 'valid'], [['∀y∃xRxy'], '∃x∀yRxy', 'unknown']] })
  ]
});
})(window.CONTENT);
