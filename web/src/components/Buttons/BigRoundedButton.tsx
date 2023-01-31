import { Button } from '@mui/material';
import '../../styles/BigRoundedButton.css'

interface Props {
  label: string;
  color: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning' | undefined;
  onClick: () => void;
}

const BigRoundedButton = ({ label, color, onClick }: Props) => {
  return (
    <div className="big-rounded-button-container">
      <Button className='big-rounded-button' color={color} variant="contained" onClick={onClick}>{label}</Button>
    </div>
  );
};

export default BigRoundedButton;
