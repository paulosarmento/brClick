export function scrollTo(id: string) {
  const el = document.querySelector(id);
  if (!el) return;

  el.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}
