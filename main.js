// Motion (vendor/motion.js, MIT) exposes the global `Motion`. No bundler, no CDN.
(function () {
  "use strict";
  const { animate, inView, hover, press } = Motion;

  // The head script adds `js` only when the system allows motion. Without it every rule is
  // already drawn, nothing on the page is hidden, and none of this should run.
  if (!document.documentElement.classList.contains("js")) return;

  const RULES = ".band:not(.band-surface) > .shell, .foot > .shell";
  const PRESSABLE = "[data-press]";
  const SPRING = { type: "spring", stiffness: 500, damping: 25 };

  // The chalk line. Ease-out and no overshoot: a snapped string stops dead on the timber,
  // and this is a building firm. --draw is the registered <number> the rule's pseudo-element
  // reads as scaleX, so only a transform on a 1px box changes — no layout, no paint.
  const started = performance.now();
  inView(
    RULES,
    (el) => {
      // The rule under the hero is already on screen, so it draws shortly after paint and
      // that is the whole load sequence. The rest draw the moment they arrive.
      const atLoad = performance.now() - started < 250;
      animate(el, { "--draw": 1 }, { duration: 0.55, ease: "easeOut", delay: atLoad ? 0.25 : 0 });
    },
    // No `once` option exists in Motion 13: inView unobserves any element whose callback
    // returns nothing, so returning nothing is what makes this run once per rule.
    { amount: 0.1 }
  );

  // Press feedback on the number and the call button. Motion's press filters secondary
  // pointers and handles Enter, which the pointerdown listener it replaces did not.
  hover(PRESSABLE, (el) => {
    animate(el, { scale: 1.02 }, SPRING);
    return () => animate(el, { scale: 1 }, SPRING);
  });
  press(PRESSABLE, (el) => {
    animate(el, { scale: 0.97 }, SPRING);
    return () => animate(el, { scale: 1 }, SPRING);
  });
})();
