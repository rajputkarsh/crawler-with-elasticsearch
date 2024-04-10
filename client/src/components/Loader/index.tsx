import { useEffect, useState } from "react";
import Lottie from "lottie-web";
import loaderAnimation from "../../assets/loader.json";

interface LoaderProps {
  timer?: number;
}

function Loader({ timer = 30 }: LoaderProps) {
  const [showLoader, setShowLoader] = useState<boolean>(true);

  useEffect(() => {
    const lottieInstance = Lottie.loadAnimation({
      container: document.querySelector("#lottie-loader") as Element,
      animationData: loaderAnimation,
      renderer: "svg",
      loop: true,
      autoplay: true,
    });

    setTimeout(() => {
      setShowLoader(false);
    }, timer * 1000);

    return () => lottieInstance.destroy();
  }, []);

  return (
    <>
      {showLoader && (
        <div className="loader">
          <div id="lottie-loader"></div>
        </div>
      )}
    </>
  );
}

export default Loader;
