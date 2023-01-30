import { Fade, Modal } from '@mui/material';
import { Box } from '@mui/system';
import ServicesCards from '../Cards/ServicesCards';

interface Props {
  open: boolean;
  onClose: () => void;
  setServiceSelected: React.Dispatch<React.SetStateAction<string>>;
}

const services = [
  { name: 'Spotify', logo: '' },
  { name: 'Github', logo: '' },
  { name: 'Google', logo: '' },
  { name: 'Outlook', logo: '' },
  { name: 'Reddit', logo: '' }
];

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'auto',
  height: 'auto',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gridGap: '1vw'
};

const ServicesModal = ({ open, onClose, setServiceSelected }: Props) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Fade in={open}>
        <div className="modal-main-container">
          <Box sx={style}>
            {services.map((service, index) => (
              <ServicesCards
                onClose={onClose}
                setServiceSelected={setServiceSelected}
                name={service.name}
                logo={service.logo}
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
