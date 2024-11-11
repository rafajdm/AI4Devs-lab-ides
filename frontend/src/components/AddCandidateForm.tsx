import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Box, Container, Typography, Alert } from '@mui/material';

const AddCandidateForm: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      education: '',
      experience: '',
      resume: null,
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('Required'),
      lastName: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      phone: Yup.string().required('Required'),
      address: Yup.string().required('Required'),
      education: Yup.string().required('Required'),
      experience: Yup.string().required('Required'),
      resume: Yup.mixed().required('Required'),
    }),
    onSubmit: async (values) => {
      try {
        const token = localStorage.getItem('token');
        const formData = new FormData();
        formData.append('firstName', values.firstName);
        formData.append('lastName', values.lastName);
        formData.append('email', values.email);
        formData.append('phone', values.phone);
        formData.append('address', values.address);
        formData.append('education', values.education);
        formData.append('experience', values.experience);
        if (values.resume) {
          formData.append('resume', values.resume);
        }

        const response = await fetch('http://localhost:3010/api/candidates', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Failed to submit the form');
        }

        setIsSubmitted(true);
        setError(null);
      } catch (err) {
        setError('Failed to submit the form. Please try again.');
      }
    },
  });

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Add New Candidate
      </Typography>
      {isSubmitted ? (
        <Typography variant="h6" color="primary">
          Candidate added successfully!
        </Typography>
      ) : (
        <form onSubmit={formik.handleSubmit}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              fullWidth
              id="firstName"
              name="firstName"
              label="First Name"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.firstName && Boolean(formik.errors.firstName)}
              helperText={formik.touched.firstName && formik.errors.firstName}
            />
            <TextField
              fullWidth
              id="lastName"
              name="lastName"
              label="Last Name"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
            />
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              fullWidth
              id="phone"
              name="phone"
              label="Phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
            />
            <TextField
              fullWidth
              id="address"
              name="address"
              label="Address"
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.address && Boolean(formik.errors.address)}
              helperText={formik.touched.address && formik.errors.address}
            />
            <TextField
              fullWidth
              id="education"
              name="education"
              label="Education"
              value={formik.values.education}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.education && Boolean(formik.errors.education)}
              helperText={formik.touched.education && formik.errors.education}
            />
            <TextField
              fullWidth
              id="experience"
              name="experience"
              label="Experience"
              value={formik.values.experience}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.experience && Boolean(formik.errors.experience)}
              helperText={formik.touched.experience && formik.errors.experience}
            />
            <input
              id="resume"
              name="resume"
              type="file"
              onChange={(event) => {
                if (event.currentTarget.files && event.currentTarget.files[0]) {
                  formik.setFieldValue('resume', event.currentTarget.files[0]);
                }
              }}
              onBlur={formik.handleBlur}
            />
            {formik.touched.resume && formik.errors.resume ? (
              <div>{formik.errors.resume}</div>
            ) : null}
            {error && <Alert severity="error">{error}</Alert>}
            <Button color="primary" variant="contained" fullWidth type="submit">
              Submit
            </Button>
          </Box>
        </form>
      )}
    </Container>
  );
};

export default AddCandidateForm;