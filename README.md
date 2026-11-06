# AISLE task card

A standalone English design preview for the AISLE task catalogue, illustrated cases and proposed task specifications.

**Live demo:** https://yangsen-hub-dot.github.io/AISLE-task-card/

## What is included

- A visual showcase and four top-level task categories: Experimental optimisation, Constraint adherence, Adaptive robustness, and Multimodal spectral reasoning.
- Six task cards and a matching task list.
- An animated colour-matching case with stage selection, pause, and replay controls.
- Reduced-motion support and automatic suspension when the animation is out of view.
- A Suzhou experiment film from the AISLE website.
- A dedicated [Task 02 replay](https://yangsen-hub-dot.github.io/AISLE-task-card/constraint-adherence.html), linked from both the task cards and task list.
- Interactive [Task 03 adaptive robustness](https://yangsen-hub-dot.github.io/AISLE-task-card/adaptive-robustness.html) and [Task 04 spectral inference](https://yangsen-hub-dot.github.io/AISLE-task-card/spectral-inference.html) scenes, linked from both catalogue views.
- An interactive solid electrolyte prediction case.
- The homepage Featured case embeds the solid electrolyte 3D scene with stage controls; the colour-matching walkthrough remains in its own task card and page.
- A proposed [Quantum Dot Formulation Optimisation task](https://yangsen-hub-dot.github.io/AISLE-task-card/quantum-dot.html), with formulation ranges, spectral observations, query rules and independent scoring criteria.

## Run locally

Serve the repository with a local static HTTP server, then open index.html. The interactive Three.js scenes use JavaScript modules and same-origin messaging. No build step is required.

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

## Quantum Dot Formulation Optimisation

The sixth card links to `quantum-dot.html`, a specification preview of a proposed Experimental optimisation task. It describes 48 candidate formulations mapped to paired measurements on a 96-well plate, with fluorescence at exactly 600 nm as the objective. The query budget K remains configurable; the formal benchmark budget has not been set.

This addition publishes the task description only. The card illustration is schematic. A worked example, spectral replay, online execution and model results are not included. The complete `plate-spectra.html`, hidden measurements and reference optimum are not published in this repository. In a benchmark deployment, the environment and evaluator must retain them separately from the model-facing interface.

The task page has no script dependency. Its dedicated styles and schematic cover are `assets/quantum-dot.css` and `assets/quantum-dot-card.svg`; the existing catalogue renders its entry in both browsing modes.

## Task 02 illustrated replay

The 36-second video uses the supplied presentation's GPT-5.5 v2 Case C: unsafe executions 3 and 5, a safe target match at 4, and a whole-run failure. Colour-error values are approximately digitized from the chart. Recipes, actions and apparatus are illustrative. The separate absorption spectrum is redrawn from a supplied example image; it is not a measurement from a replay round.

GPT, Codex, Claude, Gemini and DeepSeek appear with equal icon, label and frame sizes in one Agents / Models panel. They are examples evaluated separately, not participants in a shared run. GPT-5.5 Case C is retained as source attribution. Brand marks use Lobe Icons (@lobehub/icons-static-svg 1.102.0); its MIT licence is retained in assets/task02-icons-LICENSE.txt. The exported video retains its visual-review-pending label.

## Task 03 and Task 04 illustrated workflows

Task 03 is a 38-second hidden-transfer-drift illustration. Measured samples appear sequentially with commands 50 / 50 / 62.5 µL, illustrative delivered volumes 50 / 40 / 50 µL and schematic optical signals 100 / 80 / 100%. Delivered volume is viewer explanation, not agent telemetry. The original BEARS research film remains available through a source link.

Task 04 is a 40-second synthetic spectral inference illustration: seven known-pH buffers, four acquired observations and an eight-action budget. The final pKa and 95% interval are conditional on known spectral bases and noise. The methyl-orange structure provides viewer context, with identity hidden from the agent; neither measured model performance nor experimental uncertainty is claimed.

Both use the same equal model presentation as Task 02. Legacy task-video.html query links load the interactive scenes. The Task 01 walkthrough, solid electrolyte page and quantum dot specification are retained.

## Interactive stage controls

Task 02, 03 and 04 pages render the existing Three.js scenes directly, with a continuous stage slider, six stage buttons, and play/pause. They do not embed or load MP4 players. The exported videos remain archived assets.

The controls preserve the 36/38/40-second timelines and measurement gates. Seeking backwards clears later observations and estimates. Models remain equal peers. Scene state is rendered on demand; playback pauses when hidden or off screen. Shared controls accept only same-origin messages from their own scene frame. Each task bundles the existing renderer, model icons and illustrative dataset under assets/interactive; provenance files and licences are retained. Visual review remains pending.
