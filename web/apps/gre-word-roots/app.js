/* Word Roots Explorer: Latin and Greek roots, the GRE words built from them, and guessing new words from their parts. */
(function () {
  'use strict';
  // Questions: what a root means, and what a word built on it means.
  const rootItems = (roots, n, seed) => {
    const r = SK.rng(seed);
    const out = [];
    // Four wrong options whose text differs from the answer and from each other (two roots can share a meaning).
    const distinct = (right, pool) => { const seen = new Set([SK.norm(right)]), res = []; for (const v of pool) { if (!seen.has(SK.norm(v))) { seen.add(SK.norm(v)); res.push(v); } if (res.length === 4) break; } return res; };
    for (const root of SK.shuffle(r, roots)) {
      const others = SK.shuffle(r, roots.filter((x) => x.id !== root.id && SK.norm(x.meaning) !== SK.norm(root.meaning)));
      if (out.length % 2 === 0) {
        out.push(SK.shuffleItem(r, { id: 'root-' + root.id, type: 'single', topic: 'Root meanings', stem: 'What does the root **' + root.root + '** mean?', choices: [root.meaning].concat(distinct(root.meaning, others.map((o) => o.meaning))), answer: 0,
          explanation: '**' + root.root + '** (' + root.origin + ') means ' + root.meaning + ', as in ' + root.words.map((w) => w[0]).join(', ') + '.' }));
      } else {
        const [w, gloss] = SK.pick(r, root.words);
        out.push(SK.shuffleItem(r, { id: 'rw-' + root.id + '-' + w, type: 'single', topic: 'Words from roots', stem: 'The root **' + root.root + '** means *' + root.meaning + '*. Which meaning fits **' + w + '**?', choices: [gloss].concat(distinct(gloss, others.map((o) => SK.pick(r, o.words)[1]))), answer: 0,
          explanation: '**' + w + '**: ' + gloss + '. The root ' + root.root + ' (' + root.meaning + ') is the clue.' }));
      }
      if (out.length >= n) break;
    }
    return out;
  };
  const App = {
    about: 'Many hard GRE words are built from a small set of Latin and Greek roots. Learn about 55 roots, the GRE words that use each one, and practise working out a word\'s meaning from its parts, a useful fallback when you meet a word you have never seen.',
    how: ['Browse **Roots** to see each root with the words built from it.',
      'Learn the roots with **Root cards**, which use spaced repetition.',
      'Take the **Quiz** to name a root\'s meaning or use the root to pick a word\'s meaning.',
      'On test day, use roots as a clue, not a proof: some words have drifted from their roots.'],
    tabs: [
      { id: 'roots', label: 'Roots', render(el, ctx) {
        const gre = new Map(ctx.data.gre_words.map((w) => [w.w.toLowerCase(), w]));
        let term = '';
        const out = SK.h('div', {});
        const draw = () => {
          SK.clear(out);
          const hits = ctx.data.roots.filter((x) => !term || SK.norm(x.root + ' ' + x.meaning + ' ' + x.words.map((w) => w[0]).join(' ')).includes(SK.norm(term)));
          out.appendChild(SK.table(['Root', 'Meaning', 'Words built from it'], hits.map((x) => [SK.h('strong', { text: x.root }), x.meaning + ' (' + x.origin + ')',
            SK.h('span', {}, x.words.map(([w, g], i) => SK.h('span', {}, i ? '; ' : '', SK.h('strong', { text: w }), gre.has(w) ? ' ★' : '', ': ' + g)))])));
        };
        el.appendChild(SK.card('Roots', SK.h('p', { class: 'sk-muted sk-small', text: '★ marks words that are also in the GRE Vocab Builder bank.' }), SK.field('Search', SK.h('input', { type: 'text', oninput: (e) => { term = e.target.value; draw(); } })), out));
        draw();
      } },
      SK.cardsTab('cards', 'Root cards', (ctx) => ctx.data.roots.map((x) => ({ id: x.id, front: x.root, back: x.meaning, extra: x.words.map((w) => w[0]).join(', '), tag: x.origin }))),
      { id: 'quiz', label: 'Quiz', render(el, ctx) {
        SK.quizStarter(el, { title: 'Roots quiz', sizes: [10, 20, 30], make: (t, n, seed) => rootItems(ctx.data.roots, n, seed), seconds: (n) => n * 40 });
      } },
    ],
    rootItems,
    checks: {
      'every root has a meaning and at least two words': (data, assert) => {
        for (const x of data.roots) { assert.ok(x.meaning && x.words.length >= 2, x.root); for (const [w, g] of x.words) assert.ok(w && g, x.root); }
        assert.equal(new Set(data.roots.map((x) => x.id)).size, data.roots.length);
      },
      'quizzes are well formed with five different choices': (data, assert) => {
        for (let s = 1; s < 40; s++) for (const it of rootItems(data.roots, 20, s)) { assert.deepEqual(SK.validateItem(it), []); assert.equal(it.choices.length, 5); }
      },
    },
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = App; else SK.start(App);
})();
