import { useNavigate } from 'react-router-dom';
import { theme } from '../../constants/theme';
import BigRoundedButton from '../Buttons/BigRoundedButton';
import BigRoundedButtonOutlined from '../Buttons/BigRoundedButtonOutlined';
import '../../styles/Header.css';

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="header-main-container" style={{ backgroundColor: theme.palette.background }}>
      <div className="logo-title" style={{ color: theme.palette.secondary }}>
        R<span style={{ color: theme.palette.primary }}>e</span>accoon
      </div>
      <div className="buttons-container">
        <BigRoundedButtonOutlined
          label='Sign up'
          color='primary'
          onClick={() => navigate('/authentification')}
        />
        <BigRoundedButton label={'Sign in'} color={'primary'} onClick={() => navigate('/authentification')} />
      </div>
    </div>
  );
};

export default Header;
