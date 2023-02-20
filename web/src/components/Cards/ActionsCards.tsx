import { Card, CardActionArea, CardContent } from '@mui/material';
import { theme } from '../../constants/theme';
import '../../styles/ActionsCards.css';

interface Props {
  actionContent?: string;
  reactionContent?: string;
  uuidOfAction?: string
  onClick: (actionContent?: string, reactionContent?: string, uuidOfAction?: string) => void;
}

const ActionsCards = ({ actionContent, reactionContent, onClick, uuidOfAction }: Props) => {
  return (
    <Card sx={{ width: 350, height: 250, borderRadius: 2 }}>
      <CardActionArea
        sx={{ height: '100%' }}
        onClick={() => onClick(actionContent && actionContent, reactionContent && reactionContent, uuidOfAction && uuidOfAction)}>
        <CardContent sx={{ padding: '30px' }}>
          {actionContent && (
            <>
              <div className="card-text-first-bloc">
                <div className="card-text-if" style={{ color: theme.palette.primary }}>
                  IF&nbsp;
                </div>

                <div className="card-text-first-line">{actionContent}</div>
              </div>
            </>
          )}
          {reactionContent && (
            <div className="card-text-second-bloc">
              <div className="card-text-then" style={{ color: theme.palette.primary }}>
                THEN&nbsp;
              </div>
              <div className="card-text-second-line">{reactionContent}</div>
            </div>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ActionsCards;