import { Button } from '@mui/material';
import '../../styles/BigRoundedButton.css';

interface Props {
  label: string;
  color: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning' | undefined;
  onClick: () => void;
}

const BigRoundedButtonOutlined = ({ label, color, onClick }: Props) => {
  return (
    <div className="big-rounded-button-container">
      <Button className="big-rounded-button-outlined" color={color} variant="outlined" onClick={onClick}>
        {label}
      </Button>
    </div>
  );
};

export default BigRoundedButtonOutlined;
