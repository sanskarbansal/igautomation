import React from 'react';
import { Card, Typography } from '@mui/material';

export default function Talk() {
  return (
    <Card sx={{ p: 3 }}>
      <Typography variant="h4" mb={2}>
        Talk with founder
      </Typography>
      <Typography color="textSecondary">Start a conversation with the founder here.</Typography>
    </Card>
  );
}
