// Press feedback on the phone number and the call button, and nothing else.
// :active is the obvious way and it is not reliable on touch — iOS Safari only starts
// honouring it once an element carries a touch handler — so the pressed state is a class.
for (const el of document.querySelectorAll("[data-press]")) {
  const off = () => el.classList.remove("is-pressed");
  el.addEventListener("pointerdown", () => el.classList.add("is-pressed"));
  el.addEventListener("pointerup", off);
  el.addEventListener("pointercancel", off);
  el.addEventListener("pointerleave", off);
}
