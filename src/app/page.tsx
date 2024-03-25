"use client";
import { Html5QrcodeError, Html5QrcodeResult } from "html5-qrcode/esm/core";
import dynamic from "next/dynamic";
import React from "react";

const Html5QrcodePlugin = dynamic(
  () => import("@/app/components/Html5QrcodePlugin"),
  { ssr: false }
);
const ScanQrCodePage = () => {
  const onNewScanResult = (
    decodedText: string,
    result: Html5QrcodeResult
  ): void => {
    alert(decodedText);
  };
  const onNewScanError = (
    errorMessage: string,
    error: Html5QrcodeError
  ): void => {
    // handle decoded results here
    alert(errorMessage);
  };
  return (
    <div className="bg-white min-h-screen flex items-center justify-center px-4">
      <Html5QrcodePlugin
        fps={10}
        qrbox={328}
        disableFlip={false}
        qrCodeSuccessCallback={onNewScanResult}
        qrCodeErrorCallback={onNewScanError}
        verbose={true}
        useBarCodeDetectorIfSupported
      />
    </div>
  );
};

export default ScanQrCodePage;
