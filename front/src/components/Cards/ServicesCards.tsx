import { Card, CardActionArea, CardContent } from '@mui/material';
import { theme } from '../../constants/theme';
import '../../styles/ServicesCards.css';

interface Props {
  name: string;
  logo: any;
  setServiceSelected: React.Dispatch<React.SetStateAction<string>>;
  onClose: () => void;
}

const ServicesCards = ({ name, logo, setServiceSelected, onClose }: Props) => {
  const onClickOnCards = () => {
    setServiceSelected(name);
    onClose();
  };
  return (
    <Card sx={{ width: 200, height: 200, borderRadius: 2 }}>
      <CardActionArea
        sx={{ height: '100%', position: 'relative' }}
        onClick={onClickOnCards}>
        <CardContent sx={{ width: '100%', height: '100%' }}>
          <div className="card-text-name">{name}</div>
          <div className="card-text-logo">{logo}</div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ServicesCards;
