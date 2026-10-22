/* Logic Tableaux — piezas comunes del contenido. Cada mundo vive en src/worlds/w<N>.js. En los textos, {…} marca una fórmula.
   Etapas: T teoría · Q preguntas · A árbol (la jugadora lo construye) · M valores (contraejemplo a mano)
           TT tabla de verdad · GN numeración de Gödel · V la máquina (escribe una inferencia y el motor la analiza) */
(function (root) {
'use strict';
const list = [];
const T = (title, pages) => ({ t: 'T', title, pages });
const Q = (title, qs) => ({ t: 'Q', title, qs });
const A = (title, sys, prem, concl, o) => Object.assign({ t: 'A', title, sys, prem, concl }, o);
const M = (title, sys, prem, concl, o) => Object.assign({ t: 'M', title, sys, prem, concl }, o);
const TT = (title, sys, cols, o) => Object.assign({ t: 'TT', title, sys, cols }, o);
const GN = (title, mode, word, o) => Object.assign({ t: 'GN', title, mode, word }, o);
const V = (title, o) => Object.assign({ t: 'V', title }, o);
const table = (head, rows, o) => Object.assign({ k: 'table', head, rows }, o);
const tab = (sys, prem, concl, cap) => ({ k: 'tab', sys, prem, concl, cap });
const rule = (...rules) => ({ k: 'rule', rules });
const r = (top, alts, note) => ({ top, alts, note });
const kripke = (w, e, cap, o) => Object.assign({ k: 'kripke', w, e, cap }, o);

/* numeración de Gödel usada en el Mundo 9: código de cada símbolo */
const GODEL = [['0', 1], ['S', 2], ['+', 3], ['×', 4], ['=', 5], ['(', 6], [')', 7], ['¬', 8], ['→', 9], ['∀', 10], ['x', 11]];

/* libro de reglas: lo que vale en cada sistema */
function RULEBOOK(sys) {
  const out = [];
  const add = (id, name, desc) => out.push({ id, name, desc });
  const at = sys.W ? ', i' : '';
  if (!sys.sg) {
    add('¬¬', 'Doble negación', `De {¬¬A${at}} se pasa a {A${at}}.`);
    add('∧', 'Conjunción', `{A∧B${at}} da {A${at}} y {B${at}} en la misma rama.`);
    add('¬∧', 'Conjunción negada', `{¬(A∧B)${at}} abre dos ramas: {¬A${at}} | {¬B${at}}.`);
    add('∨', 'Disyunción', `{A∨B${at}} abre dos ramas: {A${at}} | {B${at}}.`);
    add('¬∨', 'Disyunción negada', `{¬(A∨B)${at}} da {¬A${at}} y {¬B${at}}.`);
    add('→', 'Condicional', `{A→B${at}} abre dos ramas: {¬A${at}} | {B${at}}.`);
    add('¬→', 'Condicional negado', `{¬(A→B)${at}} da {A${at}} y {¬B${at}}.`);
    add('↔', 'Bicondicional', `{A↔B${at}} abre dos ramas: {A${at}}, {B${at}} | {¬A${at}}, {¬B${at}}.`);
    add('¬↔', 'Bicondicional negado', `{¬(A↔B)${at}} abre dos ramas: {A${at}}, {¬B${at}} | {¬A${at}}, {B${at}}.`);
    if (sys.md === 'K') {
      add('□', 'Necesidad', '{□A, i} junto a {irj} da {A, j}, para cada j que i vea. Nunca se marca como usada: si aparece otro j, se vuelve a aplicar.');
      add('◇', 'Posibilidad', sys.gl ? '{◇A, i} da {irj}, {A, j} y {□¬A, j} con un mundo j nuevo. Ese {□¬A, j} es la regla de Löb: impide cadenas infinitas.' : '{◇A, i} da {irj} y {A, j} con un mundo j nuevo.');
      add('¬□', 'Necesidad negada', '{¬□A, i} da {◇¬A, i}.');
      add('¬◇', 'Posibilidad negada', '{¬◇A, i} da {□¬A, i}.');
    }
    if (sys.md === 'U') {
      add('□', 'Necesidad (S5 sin flechas)', '{□A, i} da {A, j} para todo mundo j de la rama.');
      add('◇', 'Posibilidad (S5 sin flechas)', '{◇A, i} da {A, j} con un mundo j nuevo.');
      add('¬□', 'Necesidad negada', '{¬□A, i} da {◇¬A, i}.');
      add('¬◇', 'Posibilidad negada', '{¬◇A, i} da {□¬A, i}.');
    }
    if (sys.fo) {
      add('∀', 'Universal', `{∀xA${at}} da {A(a)${at}} para cada nombre a de la rama (si no hay ninguno, se inventa uno). Nunca se marca como usada.`);
      add('∃', 'Particular', `{∃xA${at}} da {A(c)${at}} con un nombre c nuevo.`);
      add('¬∀', 'Universal negado', `{¬∀xA${at}} da {∃x¬A${at}}.`);
      add('¬∃', 'Particular negado', `{¬∃xA${at}} da {∀x¬A${at}}.`);
    }
  } else if (sys.int) {
    add('∧', 'Conjunción', '{A∧B,+i} da {A,+i} y {B,+i}; {A∧B,−i} abre {A,−i} | {B,−i}.');
    add('∨', 'Disyunción', '{A∨B,+i} abre {A,+i} | {B,+i}; {A∨B,−i} da {A,−i} y {B,−i}.');
    add('→+', 'Condicional verdadero', '{A→B,+i} junto a {irj} abre {A,−j} | {B,+j}, para cada j.');
    add('→−', 'Condicional no verdadero', '{A→B,−i} da {irj}, {A,+j} y {B,−j}, con j nuevo.');
    add('¬+', 'Negación verdadera', '{¬A,+i} junto a {irj} da {A,−j}, para cada j.');
    add('¬−', 'Negación no verdadera', '{¬A,−i} da {irj} y {A,+j}, con j nuevo.');
    if (sys.fo === 'int') {
      add('∃+', 'Particular verdadero', '{∃xA,+i} da {Ec,+i} y {A(c),+i}, con c nuevo.');
      add('∃−', 'Particular no verdadero', '{∃xA,−i} abre {Ea,−i} | {A(a),−i}, para cada nombre a.');
      add('∀−', 'Universal no verdadero', '{∀xA,−i} da {irj}, {Ec,+j} y {A(c),−j}, con j y c nuevos.');
      add('∀+', 'Universal verdadero', '{∀xA,+i} junto a {irj} abre {Ea,−j} | {A(a),+j}, para cada nombre a.');
      add('ini', 'Lista inicial', 'Empieza con {Ea,+0} para cada nombre de las premisas y la conclusión (o {Ec,+0} si no hay ninguno). {Ea} significa «a existe».');
    }
  } else {
    add('∧+', 'Conjunción', '{A∧B,+} da {A,+} y {B,+}.');
    add('∧−', 'Conjunción no verdadera', '{A∧B,−} abre {A,−} | {B,−}.');
    add('∨+', 'Disyunción', '{A∨B,+} abre {A,+} | {B,+}.');
    add('∨−', 'Disyunción no verdadera', '{A∨B,−} da {A,−} y {B,−}.');
    add('¬¬', 'Doble negación', '{¬¬A,±} da {A,±} (con el mismo signo).');
    add('¬∧', 'De Morgan', '{¬(A∧B),±} da {¬A∨¬B,±}.');
    add('¬∨', 'De Morgan', '{¬(A∨B),±} da {¬A∧¬B,±}.');
    add('→', 'Condicional', '{A→B} se trata como {¬A∨B}.');
    add('↔', 'Bicondicional', '{A↔B} se trata como {(A→B)∧(B→A)}.');
    if (sys.fo) {
      add('∀+', 'Universal verdadero', '{∀xA,+} da {A(a),+} para cada nombre a (uno nuevo si no hay).');
      add('∀−', 'Universal no verdadero', '{∀xA,−} da {A(c),−}, con c nuevo.');
      add('∃+', 'Particular verdadero', '{∃xA,+} da {A(c),+}, con c nuevo.');
      add('∃−', 'Particular no verdadero', '{∃xA,−} da {A(a),−} para cada nombre a.');
      add('¬∀', 'Cuantificadores negados', '{¬∀xA,±} da {∃x¬A,±}; {¬∃xA,±} da {∀x¬A,±}.');
    }
  }
  return out;
}
function CLOSURE(sys) {
  if (!sys.sg) return 'Una rama se cierra cuando tiene {A} y {¬A}' + (sys.W ? ' en el mismo mundo' : '') + '.';
  let s = 'Una rama se cierra cuando tiene {A,+} y {A,−}' + (sys.W ? ' en el mismo mundo' : '') + '.';
  if (sys.cl === 'lp') s += ' Además (LP) con {A,−} y {¬A,−}: nada puede ser a la vez no verdadero y no falso.';
  return s;
}

root.CONTENT = {
  worlds: list, GODEL,
  world(w) { list.push(w); },
  finish() { list.sort((a, b) => a.k - b.k); },
  T, Q, A, M, TT, GN, V, table, tab, rule, r, kripke, RULEBOOK, CLOSURE
};
})(typeof window !== 'undefined' ? window : globalThis);
