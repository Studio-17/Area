import { useCallback } from "react";
import BigRoundedButton from "../components/Buttons/BigRoundedButton";
import { theme } from "../constants/theme";
import "../styles/DownloadSdk.css";

const DownloadSdk = () => {
  const downloadApk = useCallback(() => {
    const link = document.createElement("a");
    link.href = "/front_data/client.apk";
    link.download = "client.apk";
    link.click();
    URL.revokeObjectURL(link.href);
  }, []);
  return (
    <div
      className="download-main-container"
      style={{
        backgroundColor: theme.palette.background,
        color: theme.palette.secondary,
      }}
    >
      <BigRoundedButton
        label="Download APK"
        color="primary"
        onClick={() => downloadApk()}
      />
    </div>
  );
};

export default DownloadSdk;
