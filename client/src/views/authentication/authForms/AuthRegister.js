import React, { useState } from 'react';
import { Box, Typography, Button, Divider, Alert, CircularProgress } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import CustomFormLabel from '../../../components/forms/theme-elements/CustomFormLabel';
import { Stack } from '@mui/system';
import AuthSocialButtons from './AuthSocialButtons';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { register as registerThunk } from '../../../store/auth/AuthSlice';

const AuthRegister = ({ title, subtitle, subtext }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState(null);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { name: '', username: '', email: '', phone: '', password: '' } });

  const onSubmit = async (values) => {
    setServerError(null);
    try {
      await dispatch(
        registerThunk({
          name: values.name,
          username: values.username,
          email: values.email,
          phone: values.phone,
          password: values.password,
        }),
      ).unwrap();
      // after successful register, navigate to login page
      navigate('/auth/login');
    } catch (err) {
      const message = err?.message || err?.msg || JSON.stringify(err) || 'Registration failed';
      setServerError(message);
    }
  };

  return (
    <>
      {title ? (
        <Typography fontWeight="700" variant="h3" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}
      {/* <AuthSocialButtons title="Sign up with" /> */}

      {/* <Box mt={3}>
        <Divider>
          <Typography
            component="span"
            color="textSecondary"
            variant="h6"
            fontWeight="400"
            position="relative"
            px={2}
          >
            or sign up with
          </Typography>
        </Divider>
      </Box> */}

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Box>
          <Stack mb={3}>
            <CustomFormLabel htmlFor="name">Name</CustomFormLabel>
            <Controller
              name="name"
              control={control}
              rules={{ required: 'Name is required' }}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  id="name"
                  variant="outlined"
                  fullWidth
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              )}
            />

            <CustomFormLabel htmlFor="username">Username</CustomFormLabel>
            <Controller
              name="username"
              control={control}
              rules={{
                required: 'Username is required',
                minLength: { value: 3, message: 'Minimum 3 characters' },
                maxLength: { value: 30, message: 'Maximum 30 characters' },
                pattern: {
                  value: /^[a-zA-Z0-9_\-\.]+$/,
                  message: 'Invalid username (letters, numbers, _-. allowed)',
                },
              }}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  id="username"
                  variant="outlined"
                  fullWidth
                  error={!!errors.username}
                  helperText={errors.username?.message}
                />
              )}
            />

            <CustomFormLabel htmlFor="email">Email Address</CustomFormLabel>
            <Controller
              name="email"
              control={control}
              rules={{
                required: 'Email is required',
                pattern: { value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/, message: 'Invalid email address' },
              }}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  id="email"
                  variant="outlined"
                  fullWidth
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              )}
            />

            <CustomFormLabel htmlFor="phone">Phone</CustomFormLabel>
            <Controller
              name="phone"
              control={control}
              rules={{
                required: 'Phone is required',
                pattern: {
                  // basic international phone validation (digits, optional leading +, 7-20 chars)
                  value: /^\+?[0-9\s\-()]{7,20}$/,
                  message: 'Invalid phone number',
                },
              }}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  id="phone"
                  variant="outlined"
                  fullWidth
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
                />
              )}
            />

            <CustomFormLabel htmlFor="password">Password</CustomFormLabel>
            <Controller
              name="password"
              control={control}
              rules={{
                required: 'Password is required',
                minLength: { value: 6, message: 'Minimum 6 characters' },
              }}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  id="password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              )}
            />
          </Stack>

          {serverError ? (
            <Box mb={2}>
              <Alert severity="error">{serverError}</Alert>
            </Box>
          ) : null}

          <Button
            color="primary"
            variant="contained"
            size="large"
            fullWidth
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? <CircularProgress size={20} color="inherit" /> : 'Sign Up'}
          </Button>
        </Box>
      </form>

      {subtitle}
    </>
  );
};

export default AuthRegister;
