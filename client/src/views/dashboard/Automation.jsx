import React, { useState } from 'react';
import {
  Card,
  Typography,
  Box,
  Grid,
  Avatar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stack,
  Checkbox,
  Radio,
  Input,
  RadioGroup,
  FormControlLabel,
  Switch,
} from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import TranslateOutlinedIcon from '@mui/icons-material/TranslateOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import axios from '../../utils/axios';
import useToast from '../../hooks/useToast';
import { RadioButtonChecked } from '@mui/icons-material';
import CustomTextField from '../../components/forms/theme-elements/CustomTextField';

import CustomRadio from 'src/components/forms/theme-elements/CustomRadio';
import { useTheme } from '@emotion/react';

const mockPosts = [
  { id: 'p1', type: 'post', title: 'New product launch', preview: 'New product launch' },
  { id: 'r1', type: 'reel', title: 'Behind the scenes reel', preview: 'Behind the scenes reel' },
  { id: 'p2', type: 'post', title: 'How-to guide', preview: 'How-to guide' },
];

export default function Automation() {
  const theme = useTheme();
  const { success, error } = useToast();
  const [selectedTrigger] = useState('comment');
  const [selectedPost, setSelectedPost] = useState({ id: '', preview: '' });

  const [selectedWords, setSelectedWords] = useState({ type: 'any', words: [] });

  const [openPostDialog, setOpenPostDialog] = useState(false);

  // reply / DM states
  const [openDm, setOpenDm] = useState(true);
  const [dmMessage, setDmMessage] = useState(
    "Hey there! I'm so happy you're here, thanks so much for your interest 😊\n\nClick below and I'll send you the link in just a sec ✨",
  );
  const [dmButtonLabel, setDmButtonLabel] = useState('');
  const [requireFollow, setRequireFollow] = useState(false);
  const [requireFollowMessage, setRequireFollowMessage] = useState('');

  function handleSelectPost(e) {
    setSelectedPost(e.target.value);
  }
  function handleSelectedWords(e) {
    setSelectedWords(e.target.value);
  }

  function handleCreate() {}

  return (
    <Box sx={{ p: 3 }}>
      <Stack spacing={2}>
        <Card sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar sx={{ bgcolor: 'warning.main' }}>
              <AddIcon color="inherit" />
            </Avatar>
            <Box>
              <Typography variant="body2" color="text.secondary">
                Select a Trigger
              </Typography>
              <Typography variant="h6">When to run automation</Typography>
            </Box>
          </Box>

          {/* Selected trigger pill */}
          <Box alignSelf="stretchcha" gap={2}>
            <Box
              sx={{
                border: 1,
                borderColor: 'divider',
                borderRadius: 2,
                p: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <InstagramIcon color="secondary" />
                <Typography>User Comments on your post or reel</Typography>
              </Box>
              <IconButton size="small">
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>
        </Card>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant="h6" color="text.secondary">
            Which post or reel to monitor?
          </Typography>
        </Box>
        <Card sx={{ p: 2, gap: 2, width: '100%' }}>
          <RadioGroup
            row
            aria-labelledby="demo-form-control-label-placement"
            name="position"
            value={selectedPost}
            onChange={handleSelectPost}
          >
            <Stack spacing={1} width={'100%'}>
              <Box
                sx={{
                  border: 1,
                  borderColor: 'divider',
                  p: 2,
                  width: '100%',
                }}
              >
                <FormControlLabel
                  value="specific_post"
                  control={<CustomRadio />}
                  label="Specific post"
                />

                <Box>
                  <Box sx={{ mt: 1 }}>
                    <Grid container spacing={1}>
                      {mockPosts.slice(0, 3).map((p) => (
                        <Grid item key={p.id}>
                          <Box
                            role="button"
                            tabIndex={selectedPost.id === 'specific' ? 0 : -1}
                            aria-disabled={selectedPost.id !== 'specific'}
                            style={{
                              pointerEvents: selectedPost.id === 'specific' ? 'auto' : 'none',
                              opacity: selectedPost.id === 'specific' ? 1 : 0.6,
                            }}
                            onKeyDown={(e) => {
                              if (
                                (e.key === 'Enter' || e.key === ' ') &&
                                selectedPost.id === 'specific'
                              ) {
                                e.preventDefault();
                                setSelectedPost(p);
                              }
                            }}
                            onClick={() => setSelectedPost(p)}
                            sx={{
                              width: 84,
                              height: 84,
                              borderRadius: 1,
                              border: 1,
                              borderColor: selectedPost.id === p.id ? 'primary.main' : 'divider',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              cursor: 'pointer',
                              p: 1,
                              backgroundColor: 'background.paper',
                            }}
                          >
                            <Avatar
                              variant="rounded"
                              sx={{ width: '100%', height: '100%', bgcolor: 'grey.100' }}
                            >
                              <ImageOutlinedIcon color="action" />
                            </Avatar>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>

                    <Box sx={{ mt: 1 }}>
                      <Button size="small" onClick={() => setOpenPostDialog(true)}>
                        Show all posts
                      </Button>
                    </Box>

                    <Dialog
                      open={openPostDialog}
                      onClose={() => setOpenPostDialog(false)}
                      fullWidth
                      maxWidth="sm"
                    >
                      <DialogTitle>All Posts & Reels</DialogTitle>
                      <DialogContent dividers>
                        <Grid container spacing={2}>
                          {mockPosts.map((p) => (
                            <Grid item xs={12} sm={6} md={4} key={p.id}>
                              <Box
                                onClick={() => {
                                  setSelectedPost(p);
                                  setOpenPostDialog(false);
                                }}
                                sx={{
                                  border: 1,
                                  borderColor: 'divider',
                                  borderRadius: 1,
                                  p: 1,
                                  display: 'flex',
                                  flexDirection: 'column',
                                  gap: 1,
                                  cursor: 'pointer',
                                  alignItems: 'center',
                                }}
                              >
                                <Avatar
                                  variant="rounded"
                                  sx={{ width: '100%', height: 120, bgcolor: 'grey.100' }}
                                >
                                  <ImageOutlinedIcon sx={{ fontSize: 36 }} color="action" />
                                </Avatar>
                                <Typography fontWeight={700} noWrap>
                                  {p.title}
                                </Typography>
                                <Typography color="text.secondary" variant="caption">
                                  {p.type}
                                </Typography>
                              </Box>
                            </Grid>
                          ))}
                        </Grid>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={() => setOpenPostDialog(false)}>Close</Button>
                      </DialogActions>
                    </Dialog>
                  </Box>
                </Box>
              </Box>

              <Box
                px={2}
                py={1}
                flexGrow={1}
                sx={{
                  border: `1px solid ${theme.palette.divider}`,
                }}
              >
                <FormControlLabel value="any_post" control={<CustomRadio />} label="Any post" />
              </Box>
            </Stack>
          </RadioGroup>
        </Card>
        <Box></Box>
        <Typography variant="h6" color="text.secondary">
          On which comments to trigger actions?
        </Typography>

        <Stack direction="column" spacing={2}>
          <Card sx={{ p: 2, gap: 2 }}>
            <RadioGroup
              row
              aria-labelledby="demo-form-control-label-placement"
              name="position"
              value={selectedWords}
              onChange={handleSelectedWords}
            >
              <Stack direction="row" spacing={2} width="100%" useFlexGap flexWrap="wrap">
                <Box
                  px={2}
                  py={1}
                  flexGrow={1}
                  sx={{
                    border: `1px solid ${theme.palette.divider}`,
                    width: '100%',
                  }}
                >
                  <FormControlLabel
                    value="specific_words"
                    control={<CustomRadio />}
                    label="Specific Words"
                  />
                  <Box>
                    {selectedWords === 'specific_words' && (
                      <>
                        <CustomTextField
                          fullWidth
                          size="small"
                          variant="outlined"
                          placeholder="Enter words separated by commas"
                          // value={triggerWords.words.join(', ')}
                          sx={{ mt: 1 }}
                        />
                        <Typography color="text.secondary" variant="body2" sx={{ mt: 1 }}>
                          use commas to seperate words
                        </Typography>
                      </>
                    )}
                  </Box>
                </Box>

                <Box
                  px={2}
                  py={1}
                  flexGrow={1}
                  sx={{
                    border: `1px solid ${theme.palette.divider}`,
                  }}
                >
                  <FormControlLabel value="any_word" control={<CustomRadio />} label="Any word" />
                </Box>
              </Stack>
            </RadioGroup>
          </Card>
        </Stack>

        <Typography variant="h6" color="text.secondary">
          What to reply?
        </Typography>
        <Card sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="subtitle1">an opening DM</Typography>
          </Box>

          <Box sx={{ mt: 2 }}>
            <CustomTextField
              multiline
              rows={5}
              fullWidth
              value={dmMessage}
              onChange={(e) => setDmMessage(e.target.value)}
              sx={{ p: 1 }}
            />

            <Box sx={{ mt: 2 }}>
              <CustomTextField
                fullWidth
                placeholder="Add a button label e.g Yes, send the link"
                value={dmButtonLabel}
                onChange={(e) => setDmButtonLabel(e.target.value)}
              />
            </Box>
          </Box>

          <Box sx={{ mt: 2 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={requireFollow}
                  onChange={(e) => setRequireFollow(e.target.checked)}
                />
              }
              label="a DM asking to follow you before they get the link"
            />
          </Box>
          {requireFollow && (
            <Box sx={{ mt: 2 }}>
              <CustomTextField
                fullWidth
                multiline
                row={5}
                placeholder="Message shown when asking the user to follow you"
                value={requireFollowMessage}
                onChange={(e) => setRequireFollowMessage(e.target.value)}
              />
            </Box>
          )}
        </Card>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
          <Button variant="contained" onClick={handleCreate}>
            Create Automation
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}
