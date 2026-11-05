# Word Roots Explorer

Learn Latin and Greek roots, see the GRE words built from each, and guess new words from their parts.

Part of the [GRE and TOEFL Study Suite](https://github.com/Apurba94/gre-toefl-study-suite): 100 free study apps for the GRE General Test and more. It works offline, as a Windows program or in the browser.

## Download and run

- **Windows:** download `Word Roots Explorer.exe` from the [latest release](https://github.com/Apurba94/gre-word-roots/releases/latest) and open it. Nothing to install. It opens in its own window and saves your progress in your user folder.
- **Browser:** open it online in the suite's web edition at https://gre-toefl-study-suite.vercel.app/apps/gre-word-roots/ . Progress stays in that browser.
- **From source:** `python launcher.py` (Python 3.10 or later, no packages needed).

## What it does

Many hard GRE words are built from a small set of Latin and Greek roots. Learn about 55 roots, the GRE words that use each one, and practise working out a word's meaning from its parts, a useful fallback when you meet a word you have never seen.

Sections: Roots, Root cards, Quiz, Progress, About.

## How to use it

1. Browse **Roots** to see each root with the words built from it.
2. Learn the roots with **Root cards**, which use spaced repetition.
3. Take the **Quiz** to name a root's meaning or use the root to pick a word's meaning.
4. On test day, use roots as a clue, not a proof: some words have drifted from their roots.

## Good to know

- All questions, passages and definitions were written for this suite. None are official ETS questions. For official practice, use the materials on ets.org.
- It follows the GRE General Test as shortened in September 2023 and the TOEFL iBT as updated in January 2026. Formats change, so check ets.org before your test.
- Feedback on writing and speaking counts things a program can count honestly, such as length and linking words. It does not give an official score.
- Not endorsed by or affiliated with ETS. GRE and TOEFL are registered trademarks of ETS.

## For developers

The app is plain HTML and JavaScript in `web/`, run by a small Python launcher that serves it on 127.0.0.1 only and needs a secret token for saving. Tests: `node --test "tests/*.test.js"` (24 tests) and `python -m unittest discover -s tests`. Build the .exe with `python build_exe.py`.

Built with AI assistance (Claude Code). MIT licence. By JANIN A APURBA.
