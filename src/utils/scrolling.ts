export const scrollToTop = () => {
  if (typeof window !== "undefined") {
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  }
};

export const scrollToTopOfDiv = (divId: string, offset: number = 0) => {
  if (typeof window !== "undefined") {
    const el = document.getElementById(divId);

    if (el) {
      const rect = el.getBoundingClientRect();
      window.scrollTo({top: window.scrollY + rect.top + offset, behavior: 'smooth'});
    }
  }
};

export const scrollToTopLastFetchedRow = (selector: string) => {
  return !selector ? false : document.querySelector(selector).scrollIntoView({behavior: 'smooth'})
}
