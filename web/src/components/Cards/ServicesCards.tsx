import { Card, CardActionArea, CardContent } from '@mui/material';
import { Service } from '../../models/serviceModels';
import '../../styles/ServicesCards.css';

interface Props {
  service: Service;
  logo: any;
  setServiceSelected: React.Dispatch<React.SetStateAction<Service | null>>;
  onClose: () => void;
}

const ServicesCards = ({ service, logo, setServiceSelected, onClose }: Props) => {
  const onClickOnCards = () => {
    setServiceSelected(service);
    onClose();
  };
  return (
    <Card sx={{ width: 200, height: 200, borderRadius: 2 }}>
      <CardActionArea
        sx={{ height: '100%', position: 'relative' }}
        onClick={onClickOnCards}>
        <CardContent sx={{ width: '100%', height: '100%' }}>
          <div className="card-text-name">{service.name}</div>
          <div className="card-text-logo">{logo}</div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ServicesCards;
