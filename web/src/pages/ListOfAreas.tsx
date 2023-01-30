import { theme } from '../constants/theme';
import AreasCards from '../components/Cards/AreasCards';
import { useNavigate } from 'react-router-dom';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import '../styles/ListOfAreas.css';

const areas = [
  { action: 'Email received', reaction: 'Music played' },
  { action: 'Branch deleted', reaction: 'Message on discord' },
  { action: 'Branch deleted', reaction: 'Message on discord' },
  { action: 'Branch deleted', reaction: 'Message on discord' },
  { action: 'Branch deleted', reaction: 'Message on discord' },
  { action: 'Branch deleted', reaction: 'Message on discord' },
  { action: 'Branch deleted', reaction: 'Message on discord' },
  { action: 'Branch deleted', reaction: 'Message on discord' },
  { action: 'Email received', reaction: 'Music played' },
  { action: 'Email received', reaction: 'Music played' }
];

const ListOfAreas = () => {
  const navigate = useNavigate();
  const onClickOnAreaCards : any = (actionContent?: string | undefined, reactionContent?: string | undefined) => {
    console.log(actionContent, reactionContent);
  };
  return (
    <div
      className="list-of-areas-main-container"
      style={{ backgroundColor: theme.palette.background }}>
      <div className="main-text">Your current Coonies ...</div>
      <div className="list-of-areas">
        {areas.map((area, index) => (
          <AreasCards onClick={onClickOnAreaCards} actionContent={area.action} reactionContent={area.reaction} key={index} />
        ))}
      </div>
      <Fab
        style={{ position: 'fixed', bottom: 36, right: 36, width: 70, height: 70 }}
        color="primary"
        onClick={() => navigate('/new-area')}>
        <AddIcon />
      </Fab>
    </div>
  );
};

export default ListOfAreas;
