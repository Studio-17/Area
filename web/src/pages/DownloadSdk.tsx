import BigRoundedButton from "../components/Buttons/BigRoundedButton";
import { theme } from "../constants/theme";
import "../styles/DownloadSdk.css";

const DownloadSdk = () => {
  return (
    <div
      className="download-main-container"
      style={{
        backgroundColor: theme.palette.background,
        color: theme.palette.secondary,
      }}
    >
      <BigRoundedButton
        label="Download SDK"
        color="primary"
        onClick={() => null}
      />
    </div>
  );
};

export default DownloadSdk;
