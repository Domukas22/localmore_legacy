//
//

import { useState, useEffect } from "react";

function USE_isMobileDevice() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
    };

    setIsMobile(checkIsMobile());
  }, []);

  return isMobile;
}

export default USE_isMobileDevice;
