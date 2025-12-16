import React, { useEffect } from 'react';
import { Box, Card, Typography, Button, Stack } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import InstagramIcon from '@mui/icons-material/Instagram';
import { useLocation, useNavigate } from 'react-router-dom';

// This page provides a clear, official-looking button to start Instagram (Meta) OAuth flow.
// The button performs a GET to the backend OAuth start endpoint which should redirect to Meta's OAuth consent.

const ConnectWithInstagram = () => {
  // backend endpoint that starts OAuth. Adjust if your server uses a different path.
  const oauthStart = '/dashboard';
  const location = useLocation();
  const navigate = useNavigate();

  // If backend redirects back to this page with ?success=1 (or connected=1), forward to dashboard
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const ok = params.get('success') || params.get('connected') || params.get('status');
    if (ok === '1' || ok === 'connected' || ok === 'ok' || ok === 'true') {
      navigate('/dashboard');
    }
  }, [location.search, navigate]);

  return (
    <PageContainer title="Connect" description="Connect external accounts">
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '60vh',
        }}
      >
        <Card sx={{ p: 4, maxWidth: 720, width: '100%' }} elevation={6}>
          <Stack spacing={3} alignItems="center">
            <Typography variant="h4" fontWeight={700} align="center">
              Connect your Instagram account
            </Typography>

            <Typography color="textSecondary" align="center">
              Securely connect your Instagram account using Meta's official OAuth flow. We use the
              official OAuth endpoints provided by Meta (Instagram) and never store your credentials
              — authentication is handled by Meta and your consent is required for access.
            </Typography>

            <Button
              variant="contained"
              color="primary"
              size="large"
              startIcon={<InstagramIcon />}
              component="a"
              href={oauthStart}
            >
              Login with Instagram (Official Meta OAuth)
            </Button>

            <Typography variant="body2" color="textSecondary" align="center">
              By continuing, you'll be redirected to Instagram to grant access to your account.
              After granting permission you'll be redirected back to our application.
            </Typography>
          </Stack>
        </Card>
      </Box>
    </PageContainer>
  );
};

export default ConnectWithInstagram;
