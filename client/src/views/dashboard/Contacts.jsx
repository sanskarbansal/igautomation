import React from 'react';
import { Card, Typography } from '@mui/material';

export default function Contacts() {
  return (
    <Card sx={{ p: 3 }}>
      <Typography variant="h4" mb={2}>
        Contacts
      </Typography>
      <Typography color="textSecondary">Your contacts will be listed here.</Typography>
    </Card>
  );
}
