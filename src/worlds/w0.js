/* Mundo 0 · Campamento Base: preliminares */
(function (C) {
const { T, Q, M, TT, V, table } = C;
C.world({
  k: 0, name: 'Campamento Base', logic: 'Preliminares: proposiciones, tablas y validez', badge: 'P',
  intro: 'Antes de salir de viaje conviene revisar el equipaje: qué es una proposición, cómo se combinan y cuándo un argumento es válido.',
  stages: [
    T('Qué es una proposición', [
      { say: '¡Bienvenido al campamento base! Soy <b>Minerva</b>. Antes de construir árboles hay que saber con qué material trabaja la lógica: las <b>proposiciones</b>.' },
      { say: 'Una proposición es lo que dice una oración declarativa: algo que puede ser <b>verdadero o falso</b>. Las preguntas, las órdenes y los deseos no afirman nada, así que no expresan proposiciones.', mood: 'neutral',
        fig: table(['Oración', '¿Expresa una proposición?'], [['«Llueve en Valdivia»', 'Sí'], ['«2 + 2 = 5»', 'Sí: es falsa, pero es una proposición'], ['«¿Llueve?»', 'No: es una pregunta'], ['«Cierra la puerta»', 'No: es una orden'], ['«Ojalá llueva»', 'No: es un deseo']]) },
      { say: 'La lógica clásica supone el principio de <b>bivalencia</b>: cada proposición tiene exactamente uno de dos valores de verdad, verdadero (V) o falso (F). Más adelante visitarás lógicas que ponen en duda ese supuesto.' },
      { say: 'Una proposición es <b>atómica</b> si no contiene otra proposición como parte: «llueve». Es <b>compuesta</b> si se arma con otras: «llueve y hace frío». A las atómicas las abreviamos con letras: {P}, {Q}, {R}.' }
    ]),
    Q('¿Proposición o no?', [
      { q: '¿Cuál de estas oraciones expresa una proposición?', opts: ['«¿Qué hora es?»', '«La Tierra gira alrededor del Sol»', '«Pásame la sal»'], ok: 1,
        why: 'Es la única que afirma algo que puede ser verdadero o falso. Las otras son una pregunta y una petición.' },
      { q: '«La Luna es de queso». ¿Expresa una proposición?', opts: ['No, porque es falsa', 'Sí: es falsa, pero tiene valor de verdad', 'Solo si alguien se la cree'], ok: 1,
        why: 'Ser proposición no exige ser verdadera. Basta con que tenga sentido preguntar si lo es.' },
      { q: '¿Cuál de estas proposiciones es atómica?', opts: ['«Llueve y hace frío»', '«No llueve»', '«Llueve»'], ok: 2,
        why: 'Las otras dos contienen la proposición «llueve» como parte, combinada con «y» o con «no».' },
      { q: '«Ojalá apruebe el examen» es…', opts: ['un deseo: no expresa una proposición', 'una proposición verdadera', 'una proposición falsa'], ok: 0,
        why: 'Quien la dice no afirma que vaya a aprobar. No hay nada que evaluar como verdadero o falso.' }
    ]),
    T('Contenido proposicional', [
      { say: 'No confundas la oración con la proposición. «Llueve», «Está lloviendo» e «It is raining» son tres oraciones distintas, pero dicen lo mismo. Eso que tienen en común es su <b>contenido proposicional</b>.', mood: 'neutral' },
      { say: 'El contenido tampoco es lo mismo que la <b>fuerza</b> con que se usa. Estas tres oraciones comparten un contenido, pero con una se afirma, con otra se pregunta y con otra se ordena.', mood: 'neutral',
        fig: table(['Oración', 'Fuerza', 'Contenido'], [['«Cierras la puerta»', 'afirmación', 'que cierras la puerta'], ['«¿Cierras la puerta?»', 'pregunta', 'que cierras la puerta'], ['«¡Cierra la puerta!»', 'orden', 'que cierras la puerta']]) },
      { say: 'Al revés, una misma oración puede expresar proposiciones distintas según quién la diga y cuándo. «Yo tengo hambre» dice una cosa en boca de Ana y otra en boca de Luis. A la lógica le interesa el contenido, no las palabras.' },
      { say: 'Entonces, ¿cómo se identifica un contenido? Por sus <b>condiciones de verdad</b>: conocer el contenido de una proposición es saber en qué situaciones sería verdadera y en cuáles falsa. Las tablas de verdad harán precisa esta idea.' }
    ]),
    Q('Lo mismo con otras palabras', [
      { q: '¿Qué par de oraciones afirma lo mismo?', opts: ['«Ana ama a Luis» y «Luis ama a Ana»', '«Ana ama a Luis» y «Luis es amado por Ana»', '«Ana ama a Luis» y «Ana no odia a Luis»'], ok: 1,
        why: 'La voz activa y la pasiva cambian las palabras, no el contenido: son verdaderas exactamente en las mismas situaciones.' },
      { q: '«La ventana está abierta» y «¿Está abierta la ventana?» comparten…', opts: ['la fuerza, pero no el contenido', 'el contenido, pero no la fuerza', 'ni una cosa ni la otra'], ok: 1,
        why: 'El contenido es el mismo: que la ventana está abierta. Con una se afirma y con la otra se pregunta.' },
      { q: 'Pedro dice «yo soy chileno» y Kenji dice «yo soy chileno». Tenemos…', opts: ['la misma oración y la misma proposición', 'la misma oración y dos proposiciones distintas', 'dos oraciones y la misma proposición'], ok: 1,
        why: 'Una habla de Pedro y la otra de Kenji: pueden tener valores de verdad distintos, así que son proposiciones distintas.' }
    ]),
    T('Conectores', [
      { say: 'Las proposiciones compuestas se forman con <b>conectores</b>. Los de la lógica clásica son <b>veritativo-funcionales</b>: el valor de la compuesta depende solo del valor de sus partes.',
        fig: table(['Conector', 'Nombre', 'Se lee', 'Ejemplo'], [['{¬}', 'negación', 'no', '{¬P}'], ['{∧}', 'conjunción', 'y', '{P∧Q}'], ['{∨}', 'disyunción', 'o', '{P∨Q}'], ['{→}', 'condicional', 'si… entonces', '{P→Q}'], ['{↔}', 'bicondicional', 'si y solo si', '{P↔Q}']]) },
      { say: '<b>Formalizar</b> es pasar del castellano a fórmulas. Primero eliges una letra para cada proposición atómica; luego buscas el conector principal. «Si llueve y no llevo paraguas, me mojo» queda {(P∧¬Q)→R}.',
        fig: table(['Letra', 'Proposición'], [['{P}', 'llueve'], ['{Q}', 'llevo paraguas'], ['{R}', 'me mojo']]) },
      { say: 'Los paréntesis importan. {P∧(Q∨R)} y {(P∧Q)∨R} no dicen lo mismo: en la primera {P} tiene que darse sí o sí; en la segunda basta con {R}.' },
      { say: 'Algunas pistas de traducción. En {P→Q}, {P} es el <b>antecedente</b> y {Q} el <b>consecuente</b>.',
        fig: table(['En castellano', 'Fórmula'], [['P pero Q', '{P∧Q}'], ['ni P ni Q', '{¬P∧¬Q}'], ['P si Q', '{Q→P}'], ['P solo si Q', '{P→Q}'], ['P a menos que Q', '{¬Q→P}']]) }
    ]),
    Q('Formalizar', [
      { q: 'Con {P}: «llueve» y {Q}: «hace frío». ¿Cómo se formaliza «Llueve pero no hace frío»?', opts: ['{P∧¬Q}', '{¬(P∧Q)}', '{P∨¬Q}'], ok: 0,
        why: '«Pero» es una conjunción. La negación afecta solo a «hace frío».' },
      { q: 'Añadimos {R}: «salgo». «Si llueve o hace frío, no salgo» es…', opts: ['{P∨(Q→¬R)}', '{(P∨Q)→¬R}', '{(P∧Q)→¬R}'], ok: 1,
        why: 'El conector principal es el condicional: todo «llueve o hace frío» es el antecedente.' },
      { q: '«Salgo solo si no llueve» es…', opts: ['{¬P→R}', '{R→¬P}', '{R↔¬P}'], ok: 1,
        why: '«Solo si» introduce una condición necesaria: si salgo, es que no llueve. No dice que siempre que no llueva vaya a salir.' },
      { q: '«Ni llueve ni hace frío» es…', opts: ['{¬P∧¬Q}', '{¬(P∧Q)}', '{¬P∨¬Q}'], ok: 0,
        why: 'Niega las dos cosas. {¬(P∧Q)} solo dice que no se dan ambas a la vez.' }
    ]),
    T('Tablas de verdad', [
      { say: 'Una <b>valuación</b> le asigna V o F a cada letra. La tabla de verdad de un conector dice qué valor tiene la compuesta en cada caso. La negación invierte el valor.',
        fig: [table(['{A}', '{¬A}'], [['V', 'F'], ['F', 'V']]), table(['{A}', '{B}', '{A∧B}', '{A∨B}', '{A→B}', '{A↔B}'], [['V', 'V', 'V', 'V', 'V', 'V'], ['V', 'F', 'F', 'V', 'F', 'F'], ['F', 'V', 'F', 'V', 'V', 'F'], ['F', 'F', 'F', 'F', 'V', 'V']])] },
      { say: 'Tres cosas que conviene recordar. La conjunción solo es verdadera si lo son las dos partes. La disyunción es <b>inclusiva</b>: solo es falsa si las dos partes lo son. Y el condicional solo es falso cuando el antecedente es verdadero y el consecuente falso.' },
      { say: 'Para una fórmula compuesta haces una fila por cada valuación: con dos letras son 4 filas, con tres son 8. Se calcula de dentro hacia fuera: primero las partes y al final el conector principal.',
        fig: table(['{P}', '{Q}', '{¬P}', '{¬P∨Q}'], [['V', 'V', 'F', 'V'], ['V', 'F', 'F', 'F'], ['F', 'V', 'V', 'V'], ['F', 'F', 'V', 'V']]) },
      { say: 'En los retos de tabla, toca cada casilla para poner V y tócala otra vez para cambiarla a F. Cuando hayas llenado todas las columnas, pulsa <b>Comprobar</b>.' }
    ]),
    TT('Tu primera tabla', 'CL', ['P∧Q', '¬(P∧Q)'], {
      intro: 'Llena primero la columna de {P∧Q} y úsala para calcular {¬(P∧Q)}.',
      outro: 'La negación invierte la columna: {¬(P∧Q)} solo es falsa cuando {P} y {Q} son verdaderas.' }),
    TT('El condicional y su contrapuesta', 'CL', ['P→Q', '¬Q→¬P'], {
      intro: 'Calcula las dos columnas con cuidado y compáralas al terminar.',
      outro: 'Las dos columnas son idénticas: {P→Q} y {¬Q→¬P} son equivalentes. Dicen lo mismo con otras palabras.' }),
    TT('Tres letras, ocho filas', 'CL', ['Q∨R', 'P∧(Q∨R)'], {
      intro: 'Con tres letras hay ocho valuaciones. Ve por partes: primero {Q∨R}.',
      outro: '{P∧(Q∨R)} es verdadera en tres de las ocho filas: hace falta {P} y al menos una de las otras dos.' }),
    T('Contenido, equivalencia y tautologías', [
      { say: 'Mira la columna final de una tabla. Si todo son V, la fórmula es una <b>tautología</b>: es verdadera pase lo que pase. Si todo son F, es una <b>contradicción</b>. Si hay de las dos, es una <b>contingencia</b>.', mood: 'neutral',
        fig: table(['{P}', '{P∨¬P}', '{P∧¬P}'], [['V', 'V', 'F'], ['F', 'V', 'F']]) },
      { say: 'Ahora podemos precisar qué es el contenido: son las condiciones de verdad, es decir, la columna de la tabla. Dos fórmulas con la misma columna son <b>lógicamente equivalentes</b>: tienen el mismo contenido dicho de dos maneras. Ya lo viste con {P→Q} y {¬Q→¬P}.', mood: 'neutral' },
      { say: 'Cuantas más situaciones excluye una proposición, más dice. {P∧Q} dice más que {P}, porque descarta más filas. Una tautología no descarta ninguna: no informa de nada. Una contradicción las descarta todas: no puede ser verdadera.' }
    ]),
    TT('Siempre verdadera', 'CL', ['P∧Q', '(P∧Q)→P'], {
      intro: 'Calcula la tabla de {(P∧Q)→P} y fíjate en su columna.',
      outro: 'Todo V: es una tautología. No puede ser falsa porque, si {P∧Q} es verdadera, {P} también lo es.' }),
    Q('Clasifica', [
      { q: '{P∧¬P} es una…', opts: ['tautología', 'contradicción', 'contingencia'], ok: 1,
        why: 'Sea cual sea el valor de {P}, una de las dos partes es falsa, así que la conjunción siempre lo es.' },
      { q: '{P→P} es una…', opts: ['tautología', 'contradicción', 'contingencia'], ok: 0,
        why: 'Un condicional solo es falso con antecedente verdadero y consecuente falso, y aquí son la misma proposición.' },
      { q: '¿Cuál tiene el mismo contenido que {¬(P∧Q)}?', opts: ['{¬P∧¬Q}', '{¬P∨¬Q}', '{P∨Q}'], ok: 1,
        why: 'Negar que se den las dos es decir que al menos una falla. Es una de las leyes de De Morgan; puedes comprobarla con una tabla.' },
      { q: '¿Cuál de estas dice más, es decir, excluye más situaciones?', opts: ['{P∨Q}', '{P}', '{P∧Q}'], ok: 2,
        why: '{P∧Q} solo es verdadera en una fila de cuatro. {P} lo es en dos y {P∨Q} en tres.' }
    ]),
    T('Consistencia', [
      { say: 'Un conjunto de proposiciones es <b>consistente</b> si todas pueden ser verdaderas a la vez: hay al menos una valuación que las hace verdaderas a todas. Si no hay ninguna, es <b>inconsistente</b>.', mood: 'neutral' },
      { say: 'En una tabla conjunta buscas una fila donde todas valgan V. Aquí no hay ninguna: {P}, {P→Q} y {¬Q} forman un conjunto inconsistente.',
        fig: table(['{P}', '{Q}', '{P→Q}', '{¬Q}', '¿Las tres V?'], [['V', 'V', 'V', 'F', 'no'], ['V', 'F', 'F', 'V', 'no'], ['F', 'V', 'V', 'F', 'no'], ['F', 'F', 'V', 'V', 'no']]) },
      { say: 'Consistente no significa verdadero. Significa solo que las proposiciones no se estorban entre sí: «llueve» y «hace frío» son consistentes aunque hoy haga sol. Una contradicción, en cambio, es inconsistente ella sola.' },
      { say: 'En los dos retos siguientes tienes que mostrar que un conjunto es consistente: encuentra una valuación que haga verdaderas todas sus proposiciones.' }
    ]),
    M('Tres que conviven', 'CL', ['P∨Q', '¬P', 'Q→R'], null, {
      intro: 'Busca una valuación que haga verdaderas las tres proposiciones a la vez.',
      outro: 'Con {P} falsa y {Q} y {R} verdaderas, las tres son verdaderas. Una sola valuación basta para que el conjunto sea consistente.' }),
    M('Con un poco de maña', 'CL', ['P→Q', '¬Q', 'P∨R'], null, {
      intro: 'Este conjunto deja menos margen. Empieza por la proposición que solo puede ser verdadera de una manera.',
      outro: '{¬Q} obliga a que {Q} sea falsa; entonces {P→Q} obliga a que {P} sea falsa, y {P∨R} a que {R} sea verdadera.' }),
    Q('¿Consistente o no?', [
      { q: '¿Es consistente el conjunto formado por {P}, {P→Q} y {¬Q}?', opts: ['Sí', 'No'], ok: 1,
        why: 'Si {P} y {P→Q} son verdaderas, {Q} tiene que serlo, y entonces {¬Q} es falsa.' },
      { q: '¿Y el formado por {P→Q} y {¬P}?', opts: ['Sí', 'No'], ok: 0,
        why: 'Con {P} falsa las dos son verdaderas, valga {Q} lo que valga.' },
      { q: '¿Y el formado por {P∨Q}, {¬P} y {¬Q}?', opts: ['Sí', 'No'], ok: 1,
        why: 'Las dos negaciones exigen que {P} y {Q} sean falsas, y entonces {P∨Q} es falsa.' },
      { q: 'Si un conjunto es consistente, ¿son verdaderas todas sus proposiciones?', opts: ['Sí, siempre', 'No: solo pueden serlo a la vez', 'Depende de cuántas sean'], ok: 1,
        why: 'La consistencia habla de posibilidad conjunta, no de verdad de hecho.' }
    ]),
    T('Validez', [
      { say: 'Un <b>argumento</b> tiene premisas y una conclusión. Es <b>válido</b> cuando es imposible que las premisas sean verdaderas y la conclusión falsa: ninguna valuación lo consigue. En el juego lo verás escrito así: {P→Q, P ⊢ Q}.', mood: 'neutral' },
      { say: 'Con una tabla: marca las filas donde todas las premisas son V y mira la conclusión en esas filas. En este argumento solo hay una, la primera, y en ella la conclusión es V. Es válido.',
        fig: table(['{P}', '{Q}', 'Premisa {P→Q}', 'Premisa {P}', 'Conclusión {Q}'], [['V', 'V', 'V', 'V', 'V'], ['V', 'F', 'F', 'V', 'F'], ['F', 'V', 'V', 'F', 'V'], ['F', 'F', 'V', 'F', 'F']]) },
      { say: 'Válido no quiere decir que las premisas sean verdaderas. «Si la Luna es de queso, es comestible; la Luna es de queso; luego es comestible» es válido. La validez depende de la forma. Un argumento válido con premisas verdaderas se llama <b>sólido</b>.' },
      { say: 'Validez y consistencia son dos caras de lo mismo: un argumento es válido exactamente cuando sus premisas, junto con la <b>negación</b> de la conclusión, forman un conjunto inconsistente. Un <b>contraejemplo</b> es una valuación que muestra lo contrario.', mood: 'neutral' },
      { say: 'Las tablas siempre funcionan, pero crecen muy rápido: con diez letras ya son 1024 filas. En el Mundo 1 aprenderás otro método, los <b>árboles</b>, que busca un contraejemplo de forma ordenada y se detiene en cuanto lo encuentra o descarta que exista.', mood: 'neutral' }
    ]),
    TT('Modus tollens en tabla', 'CL', ['P→Q', '¬Q', '¬P'], {
      intro: 'Las dos primeras columnas son las premisas y la tercera la conclusión. Llénalas y busca las filas con premisas verdaderas.',
      outro: 'Solo en la última fila son verdaderas las dos premisas, y ahí la conclusión también lo es. El argumento {P→Q, ¬Q ⊢ ¬P} es válido.' }),
    M('Negar el antecedente', 'CL', ['P→Q', '¬P'], '¬Q', {
      intro: 'Este argumento parece razonable y no lo es. Encuentra el contraejemplo: premisas verdaderas y conclusión falsa.',
      outro: 'Con {P} falsa y {Q} verdadera, las premisas son verdaderas y la conclusión falsa. «Negar el antecedente» es una falacia.' }),
    Q('Validez', [
      { q: 'Un argumento válido tiene una conclusión falsa. ¿Qué se sigue?', opts: ['Eso es imposible', 'Al menos una premisa es falsa', 'En realidad era inválido'], ok: 1,
        why: 'Si todas las premisas fueran verdaderas, la conclusión tendría que serlo. Como no lo es, alguna premisa falla.' },
      { q: '¿Es válido {P→Q, Q→R ⊢ P→R}?', opts: ['Sí', 'No'], ok: 0,
        why: 'Para que la conclusión fuera falsa haría falta {P} verdadera y {R} falsa, y entonces alguna premisa sería falsa.' },
      { q: 'Un argumento es válido exactamente cuando sus premisas forman un conjunto inconsistente junto con…', opts: ['la conclusión', 'la negación de la conclusión', 'una tautología'], ok: 1,
        why: 'Decir que no pueden darse premisas verdaderas y conclusión falsa es decir que las premisas y la negación de la conclusión no pueden ser verdaderas a la vez.' },
      { q: '¿Puede un argumento válido tener premisas falsas y conclusión verdadera?', opts: ['Sí', 'No'], ok: 0,
        why: '«Todos los peces vuelan; las águilas son peces; luego las águilas vuelan». La validez solo prohíbe premisas verdaderas con conclusión falsa.' }
    ]),
    V('La máquina de tablas', { sys: ['CL'], mv: true, syms: '¬∧∨→↔', goals: ['valid', 'invalid', 'own'],
      intro: 'Al final del campamento hay una máquina que hace tablas de verdad sola. Escribe las premisas y la conclusión y pulsa <b>Calcular valores</b>: te dirá si el argumento es válido y, si no, te enseñará el contraejemplo.',
      outro: 'Una tabla siempre termina. Por eso la validez en lógica proposicional es <b>decidible</b>: basta revisar las 2ⁿ filas. En el Mundo 1 aprenderás un método que ahorra filas: los árboles.',
      ex: [[['P→Q', 'P'], 'Q', 'valid'], [['P→Q', 'Q'], 'P', 'invalid'], [['P→Q', '¬Q'], '¬P', 'valid'], [['P→Q', '¬P'], '¬Q', 'invalid'], [['P∨Q', '¬P'], 'Q', 'valid'], [['P'], 'P∧Q', 'invalid']] })
  ]
});
})(window.CONTENT);
