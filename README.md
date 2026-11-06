# AISLE task card

A standalone English design demo for the AISLE task catalogue and a colour-matching case.

**Live demo:** https://yangsen-hub-dot.github.io/AISLE-task-card/

## What is included

- A visual showcase and four top-level task categories: Experimental optimisation, Constraint adherence, Adaptive robustness, and Multimodal spectral reasoning.
- Four concise task cards and a matching task list.
- An animated colour-matching case with stage selection, pause, and replay controls.
- Reduced-motion support and automatic suspension when the animation is out of view.
- A Suzhou experiment film from the AISLE website.
- A dedicated [Task 02 replay](https://yangsen-hub-dot.github.io/AISLE-task-card/constraint-adherence.html), linked from both the task cards and task list.

## Run locally

Open index.html in a modern browser. No build tools, server, or package installation are required.

GitHub Pages serves the main branch from the repository root.

## Content and sources

The featured case uses the published Suzhou Real-4D criteria: four components, 12 scored experiments per run, and a success threshold of ΔE₀₀ ≤ 1.

- [Published task description](https://aisle.science/tasks.html#optimization)
- [Official AISLE website](https://aisle.science/)
- [Suzhou experiment image](https://aisle.science/assets/experiments/suzhou.webp)
- [Suzhou experiment film](https://aisle.science/assets/experiments/suzhou.mp4)
- DM Sans and Source Serif 4 fonts are bundled from the public assets referenced by the AISLE website.

The workflow drawing, labels A–D, and colour swatches are illustrative. They are not recorded formulations, measurements, or run results. The film shows experimental equipment and operation, not a complete recorded task run.

This repository is a separate design demo. It does not modify the AISLE production site or its original repository. Third-party media and fonts retain their original rights and licences.

## Task 02 illustrated replay

The 36-second video uses the supplied presentation's GPT-5.5 v2 Case C: unsafe executions 3 and 5, a safe target match at 4, and a whole-run failure. Colour-error values are approximately digitized from the chart. Recipes, actions and apparatus are illustrative. The separate absorption spectrum is redrawn from a supplied example image; it is not a measurement from a replay round.

GPT identifies the active case. Codex, Claude, Gemini and DeepSeek icons are labelled examples, without additional model results. Brand marks use Lobe Icons (`@lobehub/icons-static-svg` 1.102.0); its MIT licence is retained in `assets/task02-icons-LICENSE.txt`. The exported video retains its visual-review-pending label.
