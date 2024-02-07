// file = Html5QrcodePlugin.jsx
import { Html5QrcodeScanner } from 'html5-qrcode';
import { useEffect } from 'react';

const qrcodeRegionId = "html5qr-code-full-region";

interface Config {
  fps: number,
  qrbox: number,
  aspectRatio: number,
  disableFlip: boolean,
}

// Creates the configuration object for Html5QrcodeScanner.
const createConfig = (props: Config) => {
  let config: Config = {
    fps: props.fps,
    qrbox: props.qrbox,
    aspectRatio: props.aspectRatio,
    disableFlip: props.disableFlip,
  };

  return config;
};

const Html5QrcodePlugin = (props: any) => {
  useEffect(() => {
      // when component mounts
      const config = createConfig(props);
      const verbose = props.verbose === true;
      // Suceess callback is required.
      if (!(props.qrCodeSuccessCallback)) {
          throw "qrCodeSuccessCallback is required callback.";
      }
      const scanner = new Html5QrcodeScanner(qrcodeRegionId, config, verbose);
      scanner.render(props.qrCodeSuccessCallback, props.qrCodeErrorCallback);

      // cleanup function when component will unmount
      return () => {
        scanner.clear().catch(error => {
            console.error("Failed to clear html5QrcodeScanner. ", error);
        });
      };
  }, [props.qrCodeSuccessCallback, props.qrCodeErrorCallback, props.verbose]);

  return (
    <div className={props.className} id={qrcodeRegionId} />
  );
};

export default Html5QrcodePlugin;