import { useNavigate } from 'react-router-dom';
import { theme } from '../../constants/theme';
import { Avatar } from '@mui/material';
import '../../styles/Header.css';

const HeaderApp = () => {
  const navigate = useNavigate();
  return (
    <div className="header-main-container" style={{ backgroundColor: theme.palette.background }}>
      <div
        className="logo-title"
        style={{ color: theme.palette.secondary }}
        onClick={() => navigate('/')}>
        R<span style={{ color: theme.palette.primary }}>e</span>accoon
      </div>
      <div className="avatar-container">
        <Avatar onClick={() => navigate("/user-profile")} sx={{ bgcolor: theme.palette.primary, width: '3vw', height: '3vw', cursor: 'pointer' }}>VP</Avatar>
      </div>
    </div>
  );
};

export default HeaderApp;
