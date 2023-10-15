import { useMediaQuery as useResponsive } from "react-responsive";

const BREAKPOINT = {
  SM: 0,
  MD: 848,
  LG: 1280,

  MEDIA_SM: "(min-width: 0px)",
  MEDIA_MD: "(min-width: 848px)",
  MEDIA_LG: "(min-width: 1280px)",
};

export const useMediaQuery = () => {
  const isSM = useResponsive({ query: `${BREAKPOINT.MEDIA_SM}` });
  const isMD = useResponsive({ query: `${BREAKPOINT.MEDIA_MD}` });
  const isLG = useResponsive({ query: `${BREAKPOINT.MEDIA_LG}` });

  return {
    isLG,
    isMD,
    isSM,
  };
};
