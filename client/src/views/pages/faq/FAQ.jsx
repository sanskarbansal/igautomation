import React from 'react';
import {
  Box,
  Card,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stack,
  Button,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router-dom';

export default function FAQ() {
  const navigate = useNavigate();

  return (
    <Box sx={{ p: 3 }}>
      <Card sx={{ p: 3 }}>
        <Stack spacing={2}>
          <Box>
            <Typography variant="h4">FAQ</Typography>
            <Typography color="text.secondary" sx={{ mt: 1 }}>
              Common questions about using this automation testing tool.
            </Typography>
          </Box>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography fontWeight={700}>How do I create an automation?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Click the "Create Automation" button on the dashboard (or go to
                /dashboard/automation). Choose the trigger you want (for now, "User comments on your
                post/reel" is supported), select a specific post or choose any post, enter the
                keywords to match, and configure the reply (comment reply or an opening DM). Once
                you're ready, press "Create Automation" to save the rule.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography fontWeight={700}>Why is this free?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                This product is currently in a testing phase and provided free-of-charge so we can
                gather feedback and iterate quickly. In the future we may introduce paid plans or
                limits for advanced features — we'll communicate any pricing changes well in
                advance. Your feedback while testing is highly appreciated.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography fontWeight={700}>What limitations are there during testing?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Some features may be limited or mocked while we integrate with external APIs. For
                example, the example posts you see in the UI may be mock data until you connect your
                accounts. Expect intermittent changes as we update the product.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography fontWeight={700}>Is my data private and safe?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                We take privacy seriously. During testing we keep data stored securely on our
                servers and only request the minimum permissions needed to demonstrate features. If
                you have specific privacy concerns, please contact the team.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography fontWeight={700}>Need help or want to report an issue?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Stack spacing={1}>
                <Typography>
                  Use the support link or open an issue in the project if you're testing locally.
                </Typography>
                <Box>
                  <Button size="small" variant="contained" onClick={() => navigate('/dashboard')}>
                    Return to Dashboard
                  </Button>
                </Box>
              </Stack>
            </AccordionDetails>
          </Accordion>
        </Stack>
      </Card>
    </Box>
  );
}
