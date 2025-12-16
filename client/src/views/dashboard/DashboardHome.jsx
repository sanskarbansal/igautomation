import React from 'react';
import { Typography, Card, Box, Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function DashboardHome() {
  const navigate = useNavigate();
  return (
    <Card sx={{ p: 3 }}>
      <Stack spacing={2} direction="column">
        <Box>
          <Typography variant="h4" mb={1}>
            Dashboard
          </Typography>
          <Typography color="text.secondary">
            Welcome to your dashboard. Select an item from the left to get started.
          </Typography>
        </Box>

        <Box
          sx={{ display: 'flex', gap: 2, alignItems: 'center', justifyContent: 'space-between' }}
        >
          <Typography color="text.secondary">Statistics coming soon</Typography>

          <Button variant="contained" onClick={() => navigate('/dashboard/automation')}>
            Create Automation
          </Button>
        </Box>
      </Stack>
    </Card>
  );
}
