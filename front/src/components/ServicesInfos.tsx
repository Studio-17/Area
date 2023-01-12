import { theme } from '../constants/theme';
import '../styles/ServicesInfos.css';
import AreasCards from './Cards/AreasCards';

interface Props {
  name: string;
  onClickOnAreasCards: any;
}

const areas = [{ action: 'Received Email' }, { action: 'New event on calendar' }];

const ServicesInfos = ({ name, onClickOnAreasCards }: Props) => {

  return (
    <div
      className="services-infos-main-container"
      style={{ backgroundColor: theme.palette.background }}>
      <div className="main-name" style={{ color: theme.palette.primary }}>
        {name}
      </div>
      <div className="subtext">Choose one ...</div>
      <div className="list-of-cards-container">
        {areas.map((element, index) => (
          <AreasCards key={index} actionContent={element.action} onClick={onClickOnAreasCards} />
        ))}
      </div>
    </div>
  );
};

export default ServicesInfos;
