/* Mundo 1 · Pradera Proposicional: árboles de la lógica clásica */
(function (C) {
const { T, A, V, table, tab, rule, r } = C;
C.world({
  k: 1, name: 'Pradera Proposicional', logic: 'Lógica proposicional clásica', badge: '∧',
  intro: 'Aquí se aprende el oficio: cómo se arma un árbol, qué hace cada regla y cuándo una rama se cierra.',
  stages: [
    T('Qué es un árbol', [
      { say: '¡Hola! Soy <b>Minerva</b>. Vamos a recorrer diez mundos, y en cada uno aprenderás una lógica distinta. Todos comparten una herramienta: los <b>árboles</b>, también llamados tableaux. Empezamos por la lógica proposicional clásica.' },
      { say: 'Un argumento es <b>válido</b> cuando la conclusión se sigue de las premisas solo por su forma. Para estudiar la forma usamos letras ({P}, {Q}, {R}) en lugar de oraciones, y conectivas para combinarlas.',
        fig: table(['Símbolo', 'Se lee', 'Ejemplo'], [['{¬}', 'no', '{¬P}'], ['{∧}', 'y', '{P∧Q}'], ['{∨}', 'o', '{P∨Q}'], ['{→}', 'si… entonces', '{P→Q}'], ['{↔}', 'si y solo si', '{P↔Q}']]) },
      { say: 'Un árbol es un interrogatorio. Para probar {P→Q, P ⊢ Q} preguntamos: ¿puede ser verdad todo esto a la vez: las premisas y la <b>negación</b> de la conclusión? Esa lista de partida es la <b>lista inicial</b>. Si es imposible, el argumento es válido.',
        fig: tab('CL', ['P→Q', 'P'], 'Q', 'Las tres primeras líneas son la lista inicial. Las demás salen de aplicar reglas.') },
      { say: 'Las reglas descomponen una fórmula en otras más simples. Unas añaden líneas a la misma rama; otras parten la rama en dos, porque hay dos maneras de que la fórmula sea verdadera. Una rama se <b>cierra</b> (×) cuando contiene una fórmula y su negación. Si se cierran todas, nadie puede refutar el argumento: es válido.' },
      { say: 'Así se juega: toca una línea y pulsa <b>Aplicar regla</b>. Cuando veas dos líneas que se contradicen en la misma rama, tócalas y pulsa <b>Cerrar</b>. Una línea que ya dio todo lo que tenía queda marcada con una palomita. Si te atascas, pide una <b>pista</b>.' }
    ]),
    T('Reglas sin ramas', [
      { say: 'Las reglas más cómodas no abren ramas. La conjunción {A∧B} es verdadera solo si lo son las dos partes, así que ambas pasan a la misma rama. Una doble negación se cancela.',
        fig: rule(r(['{A∧B}'], [['{A}', '{B}']]), r(['{¬¬A}'], [['{A}']])) },
      { say: 'Las negaciones de la disyunción y del condicional también son rígidas. {¬(A∨B)} exige que las dos sean falsas; {¬(A→B)} solo puede ser verdadera si {A} lo es y {B} no.',
        fig: rule(r(['{¬(A∨B)}'], [['{¬A}', '{¬B}']]), r(['{¬(A→B)}'], [['{A}', '{¬B}']])) },
      { say: 'Aquí están todas las reglas sin ramas. Cuando tengas que elegir por dónde seguir, empieza por ellas: el árbol queda más pequeño.' }
    ]),
    A('Dar la vuelta', 'CL', ['P', 'Q'], 'Q∧P', {
      intro: 'La lista inicial tiene {P}, {Q} y {¬(Q∧P)}. Esa última se descompone con una regla que ramifica; mira cómo se cierran las dos ramas.',
      outro: 'Válido: las dos ramas se cierran. Con {P} y {Q} verdaderas, {Q∧P} no puede fallar.' }),
    A('Desmontar y montar', 'CL', ['P∧(Q∧R)'], 'R∧P', {
      intro: 'Primero desmonta la premisa con la regla de {∧}; después ataca la conclusión negada.',
      outro: 'Válido: la conjunción de la premisa entrega {P} y {R}, y eso basta para refutar cualquier negación de {R∧P}.' }),
    T('El condicional', [
      { say: '{A→B} dice que si se da {A}, se da {B}. Es verdadero cuando {A} es falso o {B} es verdadero; por eso la regla abre dos ramas: en una {¬A}, en la otra {B}.',
        fig: rule(r(['{A→B}'], [['{¬A}'], ['{B}']])) },
      { say: 'Fíjate cómo se obtiene el modus ponens. De {P→Q} salen dos ramas; en la de {¬P} choca con la premisa {P}, y en la de {Q} choca con {¬Q}, que viene de negar la conclusión.',
        fig: tab('CL', ['P→Q', 'P'], 'Q', 'Las dos ramas se cierran: el modus ponens es válido.') },
      { say: 'Con varios condicionales conviene dejar para el final las reglas que ramifican. Y cuando una rama ya se contradice, ciérrala y no sigas trabajando en ella.' }
    ]),
    A('Modus ponens en cadena', 'CL', ['P→Q', 'Q→R', 'P'], 'R', {
      intro: 'Dos condicionales abren varias ramas. Ciérralas una a una.',
      outro: 'Válido: en cada rama aparece alguna fórmula junto a su negación.' }),
    A('Silogismo hipotético', 'CL', ['P→Q', 'Q→R'], 'P→R', {
      intro: 'La conclusión negada, {¬(P→R)}, no ramifica: empieza por ahí.',
      outro: 'Válido: de {¬(P→R)} salen {P} y {¬R}, y los dos condicionales se encargan del resto.' }),
    A('Lo que ya estaba', 'CL', [], 'P→(Q→P)', {
      intro: 'Un teorema: sin premisas, la lista inicial es solo la negación de la fórmula.',
      outro: 'Válido: la fórmula es una verdad lógica. Su negación se contradice sin ayuda de premisas.' }),
    A('Exportación', 'CL', ['(P∧Q)→R'], 'P→(Q→R)', {
      intro: 'Aplica primero lo que no ramifica: la conclusión negada te da {P}, {Q} y {¬R}.',
      outro: 'Válido: con {P}, {Q} y {¬R}, el condicional de la premisa abre dos ramas que se cierran.' }),
    T('La disyunción', [
      { say: '{A∨B} dice que al menos una de las dos es verdadera. No sabemos cuál, así que el árbol se parte: en una rama suponemos {A}; en la otra, {B}. Es la regla que más ramas crea.',
        fig: rule(r(['{A∨B}'], [['{A}'], ['{B}']]), r(['{¬(A∧B)}'], [['{¬A}'], ['{¬B}']])) },
      { say: 'La negación de la conjunción hace lo mismo: no se dan las dos a la vez si falla {A} o si falla {B}. Es una de las leyes de De Morgan, que aquí salen solas.' },
      { say: 'En un árbol cada rama es una posibilidad. Si todas las posibilidades acaban en contradicción, el argumento es válido; si alguna se queda abierta, esa rama te cuenta cómo podría ser el mundo en que las premisas valen y la conclusión no.' }
    ]),
    A('Conmutar', 'CL', ['P∨Q'], 'Q∨P', {
      intro: 'La conclusión negada, {¬(Q∨P)}, da {¬Q} y {¬P}. La premisa abre las ramas.',
      outro: 'Válido: la disyunción es conmutativa.' }),
    A('Dilema', 'CL', ['P∨Q', 'P→R', 'Q→R'], 'R', {
      intro: 'Pase lo que pase, llegas a {R}. Mira cuántas ramas se abren.',
      outro: 'Válido: en cada caso se llega a {R}, y la conclusión negada lo contradice.' }),
    A('Distribuir', 'CL', ['P∧(Q∨R)'], '(P∧Q)∨(P∧R)', {
      intro: 'Desmonta la conjunción de la premisa y la negación de la disyunción de la conclusión antes de ramificar.',
      outro: 'Válido: la conjunción se distribuye sobre la disyunción.' }),
    T('Negación y absurdo', [
      { say: 'En un árbol no hace falta una regla especial para el absurdo: la lista inicial ya <i>supone lo contrario</i> de la conclusión, y la contradicción que cierra la rama es el absurdo.' },
      { say: 'Por eso las pruebas de teoremas clásicos son cortas. Para probar {P∨¬P}, el árbol parte de {¬(P∨¬P)}, que da {¬P} y {¬¬P}: contradicción inmediata.',
        fig: tab('CL', [], 'P∨¬P', 'Una sola rama, cerrada en tres líneas: el tercero excluido es una verdad lógica.') },
      { say: 'Esto tiene un costo oculto: aceptamos la doble negación sin discutir. La regla que cancela {¬¬A} es la que hace <i>clásica</i> a esta lógica. Recuérdala: en el Mundo 5 la perderemos.' }
    ]),
    A('Modus tollens', 'CL', ['P→Q', '¬Q'], '¬P', {
      intro: 'La conclusión negada es {¬¬P}. Empieza por ahí.',
      outro: 'Válido: si {P} implicara {Q} y {Q} fuese falsa, {P} tendría que serlo.' }),
    A('No contradicción', 'CL', [], '¬(P∧¬P)', {
      intro: 'El principio de no contradicción, como teorema.',
      outro: 'Válido: negarlo da {P∧¬P}, que se contradice a sí mismo.' }),
    A('Silogismo disyuntivo', 'CL', ['P∨Q', '¬P'], 'Q', {
      intro: 'Una de las dos ramas de la disyunción choca con {¬P}.',
      outro: 'Válido: la rama de {P} se cierra con {¬P} y la de {Q} con {¬Q}.' }),
    A('Contraposición', 'CL', ['¬Q→¬P'], 'P→Q', {
      intro: 'Empieza por la conclusión negada: {P} y {¬Q}.',
      outro: 'Válido: la contrapuesta equivale al condicional original.' }),
    A('Tercero excluido', 'CL', [], 'P∨¬P', { boss: true,
      intro: 'El teorema más famoso de la lógica clásica. Mira lo corto que es su árbol.',
      outro: 'Válido: toda proposición es verdadera o falsa. Guarda este árbol: en el Mundo 5 ya no se cerrará.' }),
    T('Bicondicional', [
      { say: '{A↔B} es verdadera cuando las dos partes valen lo mismo. El árbol se parte en dos: o ambas verdaderas, o ambas falsas. Su negación es la imagen especular: difieren.',
        fig: rule(r(['{A↔B}'], [['{A}', '{B}'], ['{¬A}', '{¬B}']]), r(['{¬(A↔B)}'], [['{A}', '{¬B}'], ['{¬A}', '{B}']])) },
      { say: 'Los árboles con muchos bicondicionales crecen rápido. Paciencia: cada uno abre dos ramas, y casi todas se cierran enseguida.' }
    ]),
    A('Cadena de equivalencias', 'CL', ['P↔Q', 'Q↔R'], 'P↔R', {
      intro: 'Un árbol con varias ramas. Ve cerrando las que ya se contradicen.',
      outro: 'Válido: la equivalencia es transitiva.' }),
    T('Ramas abiertas y contramodelos', [
      { say: '¿Y los argumentos que <i>no</i> son válidos? Entonces alguna rama se queda <b>abierta</b> y completa: ya aplicaste todas las reglas y no hay contradicción. Esa rama es un <b>contraejemplo</b>.' },
      { say: 'Se lee fácil: toda letra que aparece sola en la rama vale V, toda letra negada vale F. Con esa valuación, las premisas son verdaderas y la conclusión falsa.' },
      { say: 'En el juego, cuando una rama no tenga nada más que hacer, toca su final (○) y pulsa <b>Abierta</b>. Te mostraré la valuación que la rama describe.' }
    ]),
    A('Afirmar el consecuente', 'CL', ['P→Q', 'Q'], 'P', {
      intro: 'Una falacia clásica. Construye el árbol completo: una rama no se va a cerrar.',
      outro: 'Inválido: con {P} falsa y {Q} verdadera, las dos premisas son verdaderas y la conclusión falsa.' }),
    A('La o inclusiva', 'CL', ['P∨Q', 'P'], '¬Q', {
      intro: 'En lógica, {∨} es inclusiva. Muestra que de {P∨Q} y {P} no se sigue {¬Q}.',
      outro: 'Inválido: si las dos son verdaderas, {P∨Q} lo es. La disyunción lógica no excluye que se den ambas.' }),
    A('De Morgan', 'CL', ['¬(P∧Q)'], '¬P∨¬Q', { boss: true,
      intro: 'El jefe del mundo. Dos conectivas, un árbol corto: aplica las reglas con orden.',
      outro: 'Válido: negar que se den las dos equivale a que falle al menos una.' }),
    V('El oráculo de la pradera', { sys: ['CL'], syms: '¬∧∨→↔', goals: ['valid', 'invalid', 'own'],
      intro: 'El oráculo construye árboles solo. Escribe premisas y conclusión y pulsa <b>Construir árbol</b>. Si dice «válido», todas las ramas se cierran; si dice «inválido», te enseña la rama abierta y su contraejemplo.',
      outro: 'Corrección y completitud juntas: un argumento proposicional se prueba con un árbol exactamente cuando ninguna valuación lo refuta.',
      ex: [[['P→Q', 'Q→R'], 'P→R', 'valid'], [['P∨Q', 'P→R', 'Q→R'], 'R', 'valid'], [['¬(P∧Q)'], '¬P∨¬Q', 'valid'], [['P∨Q', 'P'], '¬Q', 'invalid'], [['P→Q'], 'Q→P', 'invalid'], [['(P∧Q)→R'], '(P→R)∨(Q→R)', 'valid'], [[], '((P→Q)→P)→P', 'valid']] })
  ]
});
})(window.CONTENT);
