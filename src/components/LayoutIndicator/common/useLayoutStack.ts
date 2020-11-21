import {useCallback, useRef} from "react";
import {IAvailableMedia} from "../../ResponsiveIf";


interface IProps {
  set: (layout: IAvailableMedia) => void
}
export const useLayoutStack = ({set}: IProps) => {
  const layoutsStackRef = useRef<IAvailableMedia[]>(['xs', 'sm', 'md', 'lg', 'xl']);
  const lastIndexRef = useRef(0);

  const layoutIn = useCallback(function (layout: IAvailableMedia, reverse?: boolean) {
    const next = layoutsStackRef.current.findIndex(el => el === layout);
    if (next !== lastIndexRef.current) {
      lastIndexRef.current = next;
      set(layout);
    }
  }, []);

  const layoutOut = useCallback(function (layout: IAvailableMedia, reverse?: boolean) {
    const currentIndex = layoutsStackRef.current.findIndex(el => el === layout);
    let next = reverse ? currentIndex + 1 : currentIndex - 1;

    if (next !== -1 && next !== lastIndexRef.current) {
      set(layoutsStackRef.current[next]);
      lastIndexRef.current = next;
    }
  }, []);

  return { layoutIn, layoutOut };
};
