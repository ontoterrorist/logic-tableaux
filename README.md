# Logic Tableaux

Juego de estilo Game Boy Advance para aprender lógica formal con **árboles (tableaux)**. Es la hermana de Logic Advance: mismos diez mundos, de la lógica clásica a los teoremas de Gödel, y la misma guía, Minerva la lechuza, pero en vez de deducción natural estilo Fitch se razona construyendo árboles. Solo en español.

**Jugar:** https://ontoterrorist.github.io/logic-tableaux/

| Mundo | Lógica |
|---|---|
| 0 · Campamento Base | proposiciones, tablas de verdad, consistencia y validez |
| 1 · Pradera Proposicional | árboles de la lógica clásica |
| 2 · Bosque de los Cuantificadores | primer orden |
| 3 · Archipiélago de los Mundos | modal K, T, S4 y S5 |
| 4 · Ciudadela De Re | modal de primer orden (dominio constante) |
| 5 · Taller del Constructor | intuicionista |
| 6 · Caverna de las Contradicciones | LP, la lógica paraconsistente |
| 7 · Jardín de los Testigos | intuicionista de primer orden |
| 8 · Abismo de las Paradojas | LP de primer orden |
| 9 · Torre de Gödel | numeración de Gödel, incompletud, K4 y GL |

Construyes los árboles regla a regla, cierras ramas, lees contramodelos, y al final de cada mundo una máquina construye árboles por ti.

## Desarrollo

```
node build.js            # genera index.html (GitHub Pages)
node test.js             # comprueba todas las etapas
node tools/engine-test.js
```

Se edita `src/` (`worlds/w0.js` … `w9.js` son los mundos, `tableau.js` es el motor) y se vuelve a ejecutar `node build.js`.
