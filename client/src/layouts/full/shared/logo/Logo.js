import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import LogoDark from 'src/assets/images/logos/logo_sanskar.svg';
import { ReactComponent as LogoDarkRTL } from 'src/assets/images/logos/logo_sanskar.svg';
import { ReactComponent as LogoLight } from 'src/assets/images/logos/logo_sanskar.svg';
import { ReactComponent as LogoLightRTL } from 'src/assets/images/logos/logo_sanskar.svg';
import { styled, Typography } from '@mui/material';

const Logo = () => {
  const customizer = useSelector((state) => state.customizer);
  const LinkStyled = styled(Link)(() => ({
    height: customizer.TopbarHeight,
    width: customizer.isCollapse ? '40px' : '180px',
    overflow: 'hidden',
    display: 'block',
  }));

  if (customizer.activeDir === 'ltr') {
    return (
      <Typography variant="h4" color="info" padding={2}>
        IG Automation Tool
      </Typography>
    );
  }
  return (
    <LinkStyled
      to="/"
      style={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {customizer.activeMode === 'dark' ? (
        <Typography variant="h4" color="info" padding={2}>
          IG Automation Tool
        </Typography>
      ) : (
        <Typography variant="h4" color="info" padding={2}>
          IG Automation Tool
        </Typography>
      )}
    </LinkStyled>
  );
};

export default Logo;
