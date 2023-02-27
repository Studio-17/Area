import { Fade, Modal } from "@mui/material";
import { Box } from "@mui/system";
import { Service } from "../../models/serviceModels";
import ServicesCards from "../Cards/ServicesCards";
import githubLogo from "../../assets/github.png";
import googleLogo from "../../assets/google.png";
import miroLogo from "../../assets/miro.png";
import spotifyLogo from "../../assets/spotify.png";
import discordLogo from "../../assets/discord.png";
import notionLogo from "../../assets/notion.png";
import dropBoxLogo from "../../assets/dropbox.png";
import twitchLogo from "../../assets/twitch.png";
import typeformLogo from "../../assets/typeform.png";
import deezerLogo from "../../assets/deezer.png";

interface Props {
  open: boolean;
  onClose: () => void;
  setServiceSelected: React.Dispatch<React.SetStateAction<Service | null>>;
  services: Service[] | undefined;
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  height: "auto",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gridGap: "1vw",
};

const logos = [deezerLogo, discordLogo, dropBoxLogo, githubLogo, googleLogo, miroLogo, notionLogo, spotifyLogo, twitchLogo, typeformLogo];

const ServicesModal = ({
  open,
  onClose,
  setServiceSelected,
  services,
}: Props) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Fade in={open}>
        <div className="modal-main-container">
          <Box sx={style}>
            {services?.map((service, index) => (
              <ServicesCards
                onClose={onClose}
                setServiceSelected={setServiceSelected}
                service={service}
                logo={logos[index]}
                key={index}
              />
            ))}
          </Box>
        </div>
      </Fade>
    </Modal>
  );
};

export default ServicesModal;
