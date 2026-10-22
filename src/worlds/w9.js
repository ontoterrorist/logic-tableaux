/* Mundo 9 · Torre de Gödel: aritmética, numeración de Gödel y teoremas de incompletud */
(function (C) {
const { T, Q, A, V, GN, table } = C;
C.world({
  k: 9, name: 'Torre de Gödel', logic: 'Aritmética formal y teoremas de incompletud', badge: '⌜G⌝',
  intro: 'Desde lo alto de esta torre la lógica se mira a sí misma. Sube con calma: cada piso prepara el siguiente.',
  stages: [
    T('El programa de Hilbert', [
      { say: 'Hacia 1920 David Hilbert propuso asegurar toda la matemática de una vez: encerrarla en un <b>sistema formal</b>, con axiomas y reglas tan precisos que una máquina pudiera revisar cada prueba.', mood: 'neutral' },
      { say: 'El sistema ideal debía ser consistente y completo, y su consistencia debía poder demostrarse con métodos elementales, fuera de toda duda.',
        fig: table(['Propiedad', 'Qué pide'], [['consistente', 'nunca prueba {A} y {¬A}'], ['completo', 'para toda oración {A}, prueba {A} o prueba {¬A}'], ['efectivo', 'un procedimiento mecánico revisa si una prueba es correcta']]) },
      { say: 'En 1931 Kurt Gödel, con 25 años, mostró que ese ideal es inalcanzable para cualquier sistema capaz de expresar la aritmética. Para entender sus dos teoremas hay que subir cinco pisos: aritmética formal, numeración de Gödel, demostrabilidad, autorreferencia y, al final, las pruebas.', mood: 'neutral' }
    ]),
    T('La aritmética formal', [
      { say: 'Nuestro sistema hablará de los números naturales. Su lenguaje tiene un nombre, {0}; una función «sucesor», {S}; suma y producto; la igualdad; y toda la lógica de primer orden. No hay cifras: {S0} es el uno, {SS0} el dos, {SSS0} el tres.',
        fig: table(['Símbolo', 'Significa'], [['{0}', 'el cero'], ['{S}', 'el sucesor: el número siguiente'], ['{+}  {×}', 'suma y producto'], ['{SSS0}', 'el numeral del 3']]) },
      { say: 'Los axiomas básicos son siete y forman la <b>aritmética de Robinson</b>, llamada Q. Son tan modestos que apenas dicen cómo se suma y se multiplica.',
        fig: table(['Axiomas de Q'], [['{∀x ¬Sx=0}'], ['{∀x∀y(Sx=Sy→x=y)}'], ['{∀x(x=0∨∃y x=Sy)}'], ['{∀x x+0=x}'], ['{∀x∀y x+Sy=S(x+y)}'], ['{∀x x×0=0}'], ['{∀x∀y x×Sy=(x×y)+x}']]) },
      { say: 'La <b>aritmética de Peano</b>, PA, añade el esquema de <b>inducción</b>: si algo vale del cero y pasa de cada número al siguiente, vale de todos. Con PA se prueba prácticamente toda la teoría de números habitual.' },
      { say: 'Dos nociones que no hay que confundir nunca. Una oración es <b>verdadera</b> si se cumple en los números naturales de verdad, el modelo estándar {ℕ}. Es <b>demostrable</b> en una teoría T si hay una prueba formal a partir de los axiomas de T; se escribe {T ⊢ A}. Todo el asunto de esta torre es la distancia entre ambas.' }
    ]),
    Q('Números y teorías', [
      { q: '¿Cómo se escribe el número 3 en el lenguaje de la aritmética?', opts: ['{3}', '{SSS0}', '{S+S+S}'], ok: 1,
        why: 'El lenguaje no tiene cifras: solo {0} y el sucesor. El numeral del 3 es {SSS0}.' },
      { q: '¿Qué añade PA a la aritmética de Robinson?', opts: ['El producto', 'El esquema de inducción', 'Los números negativos'], ok: 1,
        why: 'Q ya tiene suma y producto. La inducción es lo que permite probar leyes generales, como que la suma es conmutativa.' },
      { q: '{T ⊢ A} significa que…', opts: ['{A} es verdadera en los números naturales', 'hay una prueba formal de {A} a partir de los axiomas de T', '{A} es un axioma de T'], ok: 1,
        why: 'Demostrable y verdadera son nociones distintas: una es sintáctica y depende de T; la otra es semántica y depende de {ℕ}.' }
    ]),
    T('La numeración de Gödel', [
      { say: 'Primera idea genial: los números pueden hablar de fórmulas si a cada fórmula se le asigna un número. Se empieza dando un código a cada símbolo.',
        fig: Object.assign(table(['Símbolo', '{0}', '{S}', '{+}', '{×}', '{=}', '{(}', '{)}', '{¬}', '{→}', '{∀}', '{x}'], [['Código', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11']]), { tight: true }) },
      { say: 'Una fórmula es una fila de símbolos. Para convertirla en un solo número se usan los primos en orden, 2, 3, 5, 7…, y cada uno se eleva al código del símbolo que ocupa su lugar. La fórmula {0=0} tiene códigos 1, 5, 1, así que su número es 2<sup>1</sup> · 3<sup>5</sup> · 5<sup>1</sup> = 2430.' },
      { say: 'Como cada número se descompone en primos de una única manera, el camino de vuelta también funciona: del número se recuperan los exponentes y, con ellos, la fórmula. Nada se pierde.' },
      { say: 'El mismo truco se repite un piso más arriba: una <b>prueba</b> es una fila de fórmulas, así que también recibe su número. Escribiremos {⌜A⌝} para el número de Gödel de {A}. Los detalles del código no importan; lo que importa es que codificar y decodificar sean operaciones mecánicas.' }
    ]),
    GN('Tu primer número de Gödel', 'enc', ['0', '=', '0'], {
      intro: 'Codifica la fórmula {0=0}: elige el exponente de cada primo según la tabla de códigos.',
      outro: 'El número de Gödel de {0=0} es 2430. Una oración verdadera sobre el cero, convertida en un número.' }),
    GN('De vuelta a los símbolos', 'dec', ['S', '0', '=', 'S', '0'], {
      intro: 'Ahora al revés. Este número ya está descompuesto en primos: lee cada exponente y elige el símbolo que le corresponde.',
      outro: 'El número 20 212 500 es la fórmula {S0=S0}: «uno es igual a uno».' }),
    GN('Una fórmula con negación', 'enc', ['¬', '0', '=', 'S', '0'], {
      intro: 'Codifica {¬0=S0}, «cero no es uno». Son cinco símbolos, así que hacen falta los cinco primeros primos.',
      outro: 'Los números crecen muy rápido, pero eso no importa: lo esencial es que cada fórmula tiene el suyo y que se puede recuperar.' }),
    T('La sintaxis se vuelve aritmética', [
      { say: 'Segunda idea: como las fórmulas son números, las propiedades de las fórmulas son propiedades de números. «Ser una fórmula bien formada», «ser un axioma», «seguirse por modus ponens» se convierten en relaciones aritméticas entre códigos.' },
      { say: 'La más importante es la relación de prueba: {Prf(m, n)} vale cuando m es el código de una prueba, en T, de la fórmula cuyo código es n. Comprobarla es mecánico: se decodifica m y se revisa línea por línea. Por eso exigimos que T sea <b>efectivamente axiomatizada</b>.' },
      { say: 'Y aquí entra la aritmética: toda relación que se comprueba mecánicamente es <b>representable</b> en Q. Con sus propias fórmulas, T puede revisar pruebas de T.',
        fig: table(['Si…', 'entonces…'], [['m es una prueba de la fórmula n', '{T ⊢ Prf(m, n)}'], ['m no es una prueba de la fórmula n', '{T ⊢ ¬Prf(m, n)}']]) },
      { say: 'Con ella se define el <b>predicado de demostrabilidad</b>: {Prov(n)} dice «existe un m tal que {Prf(m, n)}». Ojo con la asimetría: revisar una prueba dada es mecánico, pero buscar una prueba puede no terminar nunca. {Prov} es de la forma {Σ₁}: un existencial delante de algo comprobable.' },
      { say: 'De ahí sale una propiedad que usaremos: si T demuestra {A}, entonces T demuestra {Prov(⌜A⌝)}. Basta tomar el código de la prueba y comprobarlo. En general, T demuestra toda oración {Σ₁} verdadera.' }
    ]),
    Q('Pruebas como números', [
      { q: '¿Por qué de un número de Gödel se puede recuperar la fórmula original?', opts: ['Porque los números son infinitos', 'Porque la descomposición en primos es única', 'Porque T es completa'], ok: 1,
        why: 'Los exponentes de los primos, leídos en orden, son los códigos de los símbolos.' },
      { q: '¿En qué se diferencian {Prf(m, n)} y {Prov(n)}?', opts: ['{Prf} se comprueba mecánicamente; {Prov} exige buscar una prueba que quizá no exista', '{Prf} habla de fórmulas y {Prov} de números', 'En nada'], ok: 0,
        why: 'Revisar una prueba dada siempre termina. Buscar una prueba entre todos los números puede no terminar nunca.' },
      { q: 'Si T demuestra {A}, ¿qué demuestra también T?', opts: ['{Prov(⌜A⌝)}', '{¬Prov(⌜A⌝)}', '{Prov(⌜¬A⌝)}'], ok: 0,
        why: 'Hay una prueba con un código concreto m, y T puede comprobar {Prf(m, ⌜A⌝)}.' }
    ]),
    T('El lema diagonal', [
      { say: 'Tercera idea, la más sutil: la <b>autorreferencia</b>. Una oración no puede contener escrito su propio número de Gödel, porque sería más larga que ella misma. Hay que llegar por un rodeo.', mood: 'neutral' },
      { say: 'El rodeo es la <b>diagonalización</b>. Toma una fórmula con una variable libre, {B(x)}, y sustituye la variable por el numeral del código de la propia fórmula: obtienes {B(⌜B⌝)}. Esta operación sobre códigos es mecánica, así que T puede hablar de ella.' },
      { say: 'Una versión en castellano, debida a Quine: «da una falsedad cuando va precedida de su propia cita» da una falsedad cuando va precedida de su propia cita. La oración habla de una expresión, y al aplicarle la operación indicada se obtiene la oración misma.' },
      { say: '<b>Lema diagonal</b>: para cualquier fórmula {A(x)} existe una oración {D} tal que T demuestra {D ↔ A(⌜D⌝)}. Es decir, {D} dice de sí misma «tengo la propiedad A». No es magia ni circularidad: es una sustitución bien calculada.', mood: 'neutral' }
    ]),
    Q('Autorreferencia', [
      { q: '¿Qué garantiza el lema diagonal?', opts: ['Que toda oración es verdadera o falsa', 'Que para cada propiedad {A(x)} hay una oración que dice «yo tengo A»', 'Que toda fórmula tiene un número de Gödel'], ok: 1,
        why: 'Y lo garantiza para cualquier propiedad expresable: ser demostrable, no serlo, tener un código par…' },
      { q: 'Si aplicamos el lema a la propiedad «no ser demostrable», obtenemos una oración que dice…', opts: ['«Soy falsa»', '«No soy demostrable»', '«Soy demostrable»'], ok: 1,
        why: 'Esa es la oración de Gödel. La del mentiroso, «soy falsa», necesitaría un predicado de verdad, y ese no existe dentro de la aritmética.' }
    ]),
    T('La oración de Gödel', [
      { say: 'Ya están todas las piezas. Aplica el lema diagonal a la propiedad «no ser demostrable», {¬Prov(x)}. Obtienes una oración {G} tal que T demuestra {G ↔ ¬Prov(⌜G⌝)}.' },
      { say: '{G} dice: «no soy demostrable en T». Se parece a la paradoja del mentiroso, pero hay una diferencia decisiva: no habla de <i>verdad</i>, sino de <i>demostrabilidad</i>, y esa sí es una noción aritmética. Por eso {G} no es una paradoja: es una oración aritmética perfectamente legítima.' },
      { say: '<b>Primer teorema de incompletud</b>: si T es consistente, efectivamente axiomatizada y contiene la aritmética básica, hay oraciones que T no puede probar ni refutar. {G} es una de ellas. Hay dos caminos para demostrarlo, y vas a recorrer los dos.',
        fig: table(['Camino', 'Supone', 'Usa'], [['semántico', 'que T solo demuestra verdades', 'la noción de verdad en {ℕ}'], ['sintáctico', 'que T es consistente, y algo más', 'solo pruebas, sin hablar de verdad']]) }
    ]),
    T('La prueba semántica', [
      { say: 'Empecemos por el camino corto. Supón que T es <b>correcta</b>: todo lo que demuestra es verdadero en {ℕ}. Nos preguntamos si T puede demostrar {G}.', mood: 'neutral' },
      { say: 'Si T demostrara {G}, entonces {G} sería verdadera, por corrección. Pero {G} dice que no es demostrable: sería demostrable y, a la vez, verdadero que no lo es. Contradicción. Luego T no demuestra {G}.' },
      { say: 'Y entonces {G} es <b>verdadera</b>, porque dice exactamente eso: que no es demostrable. Su negación {¬G} es falsa, así que T, que solo demuestra verdades, tampoco demuestra {¬G}. Conclusión: {G} es verdadera e indecidible en T.' },
      { say: 'El argumento es limpio, pero usa la noción de verdad, que no pertenece al sistema. En el reto siguiente lo reconstruyes con dos letras: {G}, «la oración de Gödel es verdadera», y {D}, «T demuestra la oración de Gödel».' }
    ]),
    A('Verdadera e indemostrable', 'CL', ['G↔¬D', 'D→G'], 'G∧¬D', {
      intro: 'La primera premisa es lo que dice {G}; la segunda, que T es correcta. Demuestra que {G} es verdadera y que T no la demuestra.',
      outro: 'Válido: si {D} fuera verdadera, {G} lo sería, y entonces {¬D}: contradicción. Luego {¬D}, y {G} sale de la primera premisa.' }),
    T('La prueba sintáctica', [
      { say: 'Gödel quiso un argumento que no hablara de verdad, solo de pruebas. La hipótesis mínima es que T sea <b>consistente</b>. Primera mitad: T no demuestra {G}.' },
      { say: 'Supón que T demuestra {G}. Entonces existe una prueba, con su código, y T puede comprobarla: T demuestra {Prov(⌜G⌝)}. Pero {G} equivale en T a {¬Prov(⌜G⌝)}, así que T demuestra una oración y su negación.',
        fig: table(['Paso', 'Por qué'], [['{T ⊢ G}', 'es el supuesto'], ['{T ⊢ Prov(⌜G⌝)}', 'T comprueba esa prueba'], ['{T ⊢ ¬Prov(⌜G⌝)}', 'por lo que dice {G}'], ['T es inconsistente', 'demuestra una oración y su negación']]) },
      { say: 'Segunda mitad: T no demuestra {¬G}. Aquí Gödel necesitó algo más fuerte, la <b>{ω}-consistencia</b>: T no demuestra «existe un número con la propiedad A» mientras refuta A de cada número concreto, uno por uno.' },
      { say: 'Supón que T demuestra {¬G}, es decir, {Prov(⌜G⌝)}: «existe una prueba de G». Por la primera mitad no hay tal prueba, así que para cada número m, T demuestra {¬Prf(m, ⌜G⌝)}. T afirma que existe lo que refuta caso por caso: no es {ω}-consistente.' },
      { say: 'En 1936 J. B. Rosser eliminó esa hipótesis extra con una oración más astuta: «si hay una prueba de mí, hay otra más corta de mi negación». Con ella basta la simple consistencia: toda teoría consistente, efectiva y con aritmética básica es incompleta.' }
    ]),
    A('T no demuestra G', 'CL', ['D→R', '¬(D∧R)'], '¬D', {
      intro: '{D}: «T demuestra G». {R}: «T refuta G», es decir, demuestra su negación. La primera premisa resume el argumento de la página anterior; la segunda dice que T es consistente.',
      outro: 'Válido: si {D}, entonces {R}, y T demostraría a la vez {G} y su negación.' }),
    A('T no refuta G', 'CL', ['(R∧¬D)→¬W', 'W', '¬D'], '¬R', {
      intro: '{W}: «T es {ω}-consistente». Si T refutara {G} sin demostrarla, dejaría de serlo. Y ya sabes que T no demuestra {G}.',
      outro: 'Válido: {R} junto con {¬D} daría {¬W}, que contradice {W}.' }),
    T('Qué dice y qué no dice', [
      { say: 'El teorema se cita mucho y mal. Dice: toda teoría <b>consistente</b>, <b>efectivamente axiomatizada</b> y que contenga la aritmética de Robinson es <b>incompleta</b>. Las tres condiciones hacen falta.',
        fig: table(['Si falta…', 'Ejemplo', 'Resultado'], [['la aritmética', 'la aritmética de Presburger, solo con suma', 'es completa y decidible'], ['la axiomatización efectiva', 'tomar como axiomas todas las verdades de {ℕ}', 'es completa, pero nadie puede revisar sus pruebas'], ['la consistencia', 'una teoría inconsistente', 'lo demuestra todo']]) },
      { say: 'No dice que {G} sea indemostrable «en absoluto». {G} se demuestra en teorías más fuertes, por ejemplo en T más el axioma {G}. Pero esa teoría nueva tiene su propia oración de Gödel. La incompletud no se cura añadiendo axiomas.' },
      { say: 'Tampoco contradice el <b>teorema de completitud</b> que Gödel había probado en 1929. Aquel dice que la <i>lógica</i> es completa: lo que vale en todos los modelos se puede demostrar. Como T no demuestra {G}, hay modelos de T donde {G} es falsa: modelos <b>no estándar</b>, con «números» extraños más allá de los naturales.' },
      { say: 'Un pariente cercano es el teorema de <b>Tarski</b>: la verdad aritmética no es definible en la aritmética. Si hubiera una fórmula {True(x)}, el lema diagonal daría una oración que dice «soy falsa», y esa sí es contradictoria. La demostrabilidad es definible; la verdad, no. Por eso no pueden coincidir.' }
    ]),
    Q('Malentendidos', [
      { q: '¿Cuál de estas afirmaciones es correcta?', opts: ['Hay verdades matemáticas que ningún sistema puede demostrar', 'Cada sistema consistente con aritmética deja sin decidir alguna oración, que otro sistema más fuerte sí decide', 'La matemática es inconsistente'], ok: 1,
        why: 'La incompletud es siempre relativa a un sistema. No hay una oración «absolutamente indemostrable».' },
      { q: 'La aritmética de Presburger, que solo tiene suma, es completa y decidible. ¿Contradice eso a Gödel?', opts: ['Sí', 'No: sin producto no puede expresar la numeración de Gödel'], ok: 1,
        why: 'El teorema solo se aplica a teorías que contienen suficiente aritmética, y para eso hacen falta suma y producto.' },
      { q: 'Si a PA le añadimos {G} como axioma nuevo…', opts: ['obtenemos una teoría completa', 'la teoría nueva tiene su propia oración indecidible', 'la teoría se vuelve inconsistente'], ok: 1,
        why: 'La teoría ampliada sigue cumpliendo las tres condiciones, así que el teorema se le aplica otra vez.' },
      { q: 'El teorema de completitud de 1929 y el de incompletud de 1931…', opts: ['se contradicen', 'hablan de cosas distintas: la completitud de la lógica y la incompletud de las teorías aritméticas', 'son el mismo teorema'], ok: 1,
        why: 'La lógica de primer orden demuestra todo lo que vale en todos los modelos. {G} no vale en todos los modelos de T: falla en algunos no estándar.' }
    ]),
    T('El segundo teorema', [
      { say: 'Queda la pregunta de Hilbert: ¿puede T demostrar su propia consistencia? Primero hay que poder decirlo. «T es consistente» se escribe {Con(T)}: es la oración {¬Prov(⌜0=S0⌝)}, «T no demuestra que cero es uno».' },
      { say: 'Ahora mira la primera mitad de la prueba sintáctica: «si T es consistente, T no demuestra G». Ese razonamiento es tan elemental que puede formalizarse <i>dentro</i> de T. El resultado es que T demuestra {Con(T) → ¬Prov(⌜G⌝)}, o sea, {Con(T) → G}.' },
      { say: '<b>Segundo teorema de incompletud</b>: si T es consistente, T no demuestra {Con(T)}. Porque si la demostrara, por modus ponens demostraría {G}, y el primer teorema lo prohíbe. Ninguna teoría razonable certifica su propia consistencia.' },
      { say: 'Para formalizar el razonamiento bastan tres propiedades de {Prov}, las <b>condiciones de derivabilidad</b>. Si lees {□A} como «T demuestra A», son viejas conocidas del Archipiélago.',
        fig: table(['Condición', 'En símbolos modales'], [['si T demuestra {A}, T demuestra {Prov(⌜A⌝)}', 'de {A} se pasa a {□A}'], ['{Prov} respeta el modus ponens', '{□(A→B)→(□A→□B)}'], ['si algo es demostrable, es demostrable que lo es', '{□A→□□A}']]) },
      { say: 'Así que puedes demostrar los dos teoremas con árboles modales, en el sistema K4: mundos, flechas transitivas, y nada más. Cuidado: aquí no hay flechas reflexivas, la regla de T. Que T demuestre algo no garantiza, <i>dentro de T</i>, que sea verdad. La premisa {□(G↔¬□G)} es el lema diagonal, y {□(P∧¬P)} significa «T demuestra una contradicción», es decir, «T es inconsistente».' }
    ]),
    A('El primer teorema, formalizado', 'K4', ['□(G↔¬□G)'], '□G→□(P∧¬P)', {
      intro: 'Demuestra que si T demuestra {G}, entonces T es inconsistente: demuestra una contradicción, {P∧¬P}. Es la primera mitad de la prueba sintáctica, ahora dentro del sistema K4.',
      outro: 'Válido: en el mundo 1, {G} equivale a {¬□G}; pero {□G} llega hasta allí y hasta más lejos por transitividad, y la rama se contradice.' }),
    A('El segundo teorema', 'K4', ['□(G↔¬□G)', '□G→□(P∧¬P)', '□(□G→□(P∧¬P))'], '□¬□(P∧¬P)→□(P∧¬P)', { boss: true,
      intro: 'El jefe de la torre. La segunda premisa es lo que acabas de probar; la tercera, lo mismo dentro de una caja, porque T demuestra sus propios teoremas. Demuestra que si T demuestra su consistencia, {□¬□(P∧¬P)}, entonces es inconsistente.',
      outro: 'Válido: dentro de la caja, {□G} llevaría a {□(P∧¬P)} y chocaría con la consistencia; luego {¬□G} y, por el lema diagonal, {G}. Fuera de la caja, eso da {□G} y, con la segunda premisa, la inconsistencia.' }),
    T('Después de Gödel', [
      { say: 'El argumento del segundo teorema tiene una forma general, el <b>teorema de Löb</b>: si T demuestra «si A es demostrable, entonces A», es que T ya demuestra {A}. En símbolos, {□(□A→A)→□A}. El segundo teorema es el caso en que {A} es {⊥}.' },
      { say: 'Añadir ese principio a K4 da la <b>lógica de la demostrabilidad</b>, GL: la lógica modal exacta de lo que una teoría como PA puede decir sobre sus propias pruebas. En los árboles se nota enseguida: al crear un mundo nuevo para {◇A}, GL le añade {□¬A}, y eso impide cadenas infinitas.' },
      { say: 'En 1936 Alan Turing llegó a la incompletud por otro camino. Ningún programa decide, en general, si otro programa se detiene. Si una teoría fuera completa y correcta sobre esas cuestiones, bastaría buscar pruebas para decidirlo. Incompletud e <b>indecidibilidad</b> son dos caras del mismo fenómeno.' },
      { say: 'La consistencia de PA sí se puede demostrar, pero desde fuera. Gerhard Gentzen lo hizo en 1936 con inducción transfinita hasta el ordinal {ε₀}, un principio que PA no puede justificar. El programa de Hilbert no murió: cambió de forma.', mood: 'neutral' },
      { say: 'También hay oraciones indecidibles «naturales», sin autorreferencia: el teorema de Goodstein no se demuestra en PA, y la hipótesis del continuo no se decide en la teoría de conjuntos usual. La incompletud no es un truco: es un rasgo de la matemática.' }
    ]),
    Q('Examen de la torre', [
      { q: '¿Qué dice la oración de Gödel?', opts: ['«Soy falsa»', '«No soy demostrable en T»', '«T es inconsistente»'], ok: 1,
        why: 'Habla de demostrabilidad, no de verdad. Por eso no es paradójica.' },
      { q: 'En la prueba semántica se supone que T es…', opts: ['correcta: solo demuestra verdades', 'completa', 'decidible'], ok: 0,
        why: 'La prueba sintáctica cambia esa hipótesis por la consistencia, que no menciona la verdad.' },
      { q: 'Gödel usó una hipótesis extra para mostrar que T no demuestra {¬G}. ¿Cuál era y quién la eliminó?', opts: ['La {ω}-consistencia; Rosser', 'La completitud; Tarski', 'La inducción; Peano'], ok: 0,
        why: 'Con la oración de Rosser basta la consistencia simple.' },
      { q: 'Si T es consistente, ¿puede demostrar {Con(T)}?', opts: ['Sí, siempre', 'No: es el segundo teorema', 'Solo si T es PA'], ok: 1,
        why: 'Si la demostrara, demostraría {G}, y eso es imposible para una teoría consistente.' },
      { q: 'Si lees {□A} como «T demuestra A», ¿qué propiedad de las flechas <i>no</i> vale?', opts: ['Transitividad: si T demuestra A, demuestra que lo demuestra', 'Reflexividad: de {□A} se sigue {A}', 'Que cada mundo vea a algún otro'], ok: 1,
        why: 'Por el teorema de Löb, T solo demuestra {□A→A} cuando ya demuestra {A}. ¡Has llegado a lo más alto de la torre!' }
    ]),
    V('El oráculo de Löb', { sys: ['K', 'K4', 'GL'], syms: '¬∧∨→↔□', goals: ['split', 'valid', 'own'],
      intro: 'Lee {□A} como «la teoría demuestra A». K4 es lo que usaste en la torre. <b>GL</b> (Gödel-Löb) añade el axioma de Löb, {□(□A→A)→□A}, y por el teorema de Solovay es exactamente la lógica de la demostrabilidad en PA. Compara los sistemas con los botones de arriba.',
      outro: 'En K4 el árbol de la fórmula de Löb crece sin cerrarse; en GL cada mundo nuevo trae {□¬A}, y eso corta la cadena. Por eso en GL no vale {□A→A}: una teoría consistente no demuestra su propia corrección.',
      ex: [[[], '□(□P→P)→□P', 'unknown', 'K4'], [[], '□(□P→P)→□P', 'valid', 'GL'], [['□(G↔¬□G)'], '□G→□(P∧¬P)', 'valid', 'K4'], [['□(G↔¬□G)', '¬□(P∧¬P)'], '¬□G', 'valid', 'K4'], [['□(G↔¬□G)', '¬□(P∧¬P)'], '¬□¬G', 'invalid', 'GL'], [[], '□P→□□P', 'invalid', 'K'], [['□P'], 'P', 'invalid', 'GL']] })
  ]
});
})(window.CONTENT);
