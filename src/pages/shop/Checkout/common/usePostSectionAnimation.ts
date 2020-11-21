import {scrollToTopOfDiv} from "src/utils/scrolling";
import {ISectionType} from "../context";

export const usePostSectionAnimation = (section: ISectionType, setLoading: (loading?: ISectionType)=> void) => {
  return () => {
    scrollToTopOfDiv(section, -100);
    setTimeout(function () {
      setLoading(section);
    }, 100);
  };
};
