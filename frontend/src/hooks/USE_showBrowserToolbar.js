//
//

export function USE_showBrowserToolbar() {
  const scroll = window.scrollY;
  window.scrollTo(0, -1);
  setTimeout(() => {
    window.scrollTo(0, scroll);
  }, 50);
}
