import {
  Html5Qrcode,
  Html5QrcodeScanner,
  QrcodeErrorCallback,
  QrcodeSuccessCallback,
} from "html5-qrcode";
import type { Html5QrcodeScannerConfig } from "html5-qrcode/esm/html5-qrcode-scanner";
import { useEffect } from "react";

const qrcodeRegionId = "html5qr-code-full-region";

// Creates the configuration object for Html5QrcodeScanner.
const createConfig = (
  props: Partial<Html5QrcodeScannerConfig>
): Html5QrcodeScannerConfig => {
  const config: Html5QrcodeScannerConfig = {
    fps: 10,
  };
  if (props.fps) {
    config.fps = props.fps;
  }
  if (props.qrbox) {
    config.qrbox = props.qrbox;
  }
  if (props.aspectRatio) {
    config.aspectRatio = props.aspectRatio;
  }
  if (props.disableFlip !== undefined) {
    config.disableFlip = props.disableFlip;
  }
  return config;
};
interface Html5QrcodePluginType extends Partial<Html5QrcodeScannerConfig> {
  qrCodeSuccessCallback: QrcodeSuccessCallback;
  qrCodeErrorCallback: QrcodeErrorCallback;
  verbose: boolean;
}

const Html5QrcodePlugin = (props: Html5QrcodePluginType) => {
  useEffect(() => {
    let html5QrCode: null | Html5Qrcode = null;
    const config = createConfig(props);
    if (!props.qrCodeSuccessCallback) {
      throw "qrCodeSuccessCallback is required callback.";
    }
    Html5Qrcode.getCameras()
      .then((devices) => {
        if (devices && devices.length) {
          html5QrCode = new Html5Qrcode(qrcodeRegionId);
          html5QrCode
            .start(
              { facingMode: "environment" },
              config,
              props.qrCodeSuccessCallback,
              props.qrCodeErrorCallback
            )
            .catch((err) => {
              alert(err);
            });
        }
      })
      .catch((err) => {
        alert("دسترسی رد شد");
        console.log(err);
      });

    return () => {
      if (html5QrCode) {
        html5QrCode.clear();
      }
    };
  }, []);

  return <div id={qrcodeRegionId} className="h-full w-full" />;
};

export default Html5QrcodePlugin;
