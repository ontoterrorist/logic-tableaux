/* Pruebas del motor de árboles con la notación de Logic Tableaux: node tools/engine-test.js */
globalThis.window = globalThis;
require('../src/logic.js');
require('../src/tableau.js');
const L = globalThis.Logic, T = globalThis.Tableau;
let bad = 0, n = 0;
function check(sys, prem, concl, want) {
  n++;
  let r;
  try { r = T.solve(sys, prem.map(L.parse), L.parse(concl), 600); } catch (e) { console.log('ERROR', sys, prem, concl, e.message); bad++; return; }
  const ok = r.verdict === want;
  if (!ok) bad++;
  if (!ok || process.argv.includes('-v')) console.log((ok ? 'ok  ' : 'MAL ') + sys.padEnd(4) + ' ' + prem.join(', ') + ' ⊢ ' + concl + ' → ' + r.verdict + ' (esperado ' + want + ', ' + r.t.nodes.length + ' líneas)');
}
const V = 'valid', I = 'invalid', U = 'unknown';
/* mundo 1: proposicional clásica */
check('CL', ['P→Q', 'Q→R'], 'P→R', V);
check('CL', ['P↔Q', 'Q↔R'], 'P↔R', V);
check('CL', ['P→Q', 'Q'], 'P', I);
check('CL', ['P∨Q', 'P'], '¬Q', I);
check('CL', ['¬(P∧Q)'], '¬P∨¬Q', V);
check('CL', [], '((P→Q)→P)→P', V);
/* mundo 2: primer orden */
check('FOL', ['∀x(Hx→Mx)', 'Ha'], 'Ma', V);
check('FOL', ['∃x∀yRxy'], '∀y∃xRxy', V);
check('FOL', ['∃xFx', '∃xGx'], '∃x(Fx∧Gx)', I);
check('FOL', [], '∃x(Fx→∀yFy)', V);
check('FOL', ['∀y∃xRxy'], '∃x∀yRxy', U);
/* mundo 3: modal */
check('K', ['□(P→Q)', '□P'], '□Q', V);
check('K', ['□P'], '◇P', I);
check('T', ['P'], '◇P', V);
check('T', ['□P'], '□□P', I);
check('S4', ['□P'], '□□P', V);
check('S4', ['◇P'], '□◇P', I);
check('S5', ['◇P'], '□◇P', V);
check('S5', ['◇□P'], '□P', V);
/* mundo 4: modal de primer orden, dominio constante */
check('CK', ['∀x□Fx'], '□∀xFx', V);
check('CK', ['□∀xFx'], '∀x□Fx', V);
check('CK', ['∃x□Fx'], '□∃xFx', V);
check('CK', ['□∃xFx'], '∃x□Fx', U);
check('CK', ['∀x□Fx'], '∃xFx', I);
check('CT', ['∀x□Fx'], '∃xFx', V);
/* mundo 5 y 7: intuicionista */
check('I', ['P'], '¬¬P', V);
check('I', ['¬¬P'], 'P', I);
check('I', [], 'P∨¬P', I);
check('I', [], '¬¬(P∨¬P)', V);
check('I', ['¬(P∨Q)'], '¬P∧¬Q', V);
check('I', ['¬(P∧Q)'], '¬P∨¬Q', I);
check('IQ', ['∃x¬Fx'], '¬∀xFx', V);
check('IQ', ['¬¬∃xFx'], '∃xFx', I);
check('IQ', [], '∀x(Fx∨¬Fx)', I);
/* mundos 6 y 8: LP */
check('LP', ['P', '¬P'], 'Q', I);
check('LP', ['P∨Q', '¬P'], 'Q', I);
check('LP', [], 'P∨¬P', V);
check('LP', ['P', '¬P∨Q'], 'Q∨(P∧¬P)', V);
check('QLP', ['∀x(Fx∨Gx)', '∃x¬Fx'], '∃xGx', I);
check('QLP', ['∀x(Fx∨Gx)', '∃x¬Fx'], '∃x(Gx∨(Fx∧¬Fx))', V);
check('QLP', [], '¬∃x(Fx∧¬Fx)', V);
/* mundo 9: K4 y GL */
check('K4', ['□(G↔¬□G)'], '□G→□(P∧¬P)', V);
check('K4', [], '□P→□□P', V);
check('GL', [], '□(□P→P)→□P', V);
check('K4', [], '□(□P→P)→□P', U);
check('GL', ['□P'], 'P', I);
check('GL', ['¬□(P∧¬P)'], '¬□¬□(P∧¬P)', V);
console.log(bad ? `${bad} problemas en ${n} pruebas` : `${n} pruebas del motor, todas bien`);
process.exit(bad ? 1 : 0);
