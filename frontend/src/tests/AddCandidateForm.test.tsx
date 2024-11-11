import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AddCandidateForm from '../components/AddCandidateForm';

test('renders AddCandidateForm and submits data', async () => {
  render(<AddCandidateForm />);

  fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'John' } });
  fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: 'Doe' } });
  fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john.doe@example.com' } });
  fireEvent.change(screen.getByLabelText(/Phone/i), { target: { value: '1234567890' } });
  fireEvent.change(screen.getByLabelText(/Address/i), { target: { value: '123 Main St' } });
  fireEvent.change(screen.getByLabelText(/Education/i), { target: { value: 'Bachelor' } });
  fireEvent.change(screen.getByLabelText(/Experience/i), { target: { value: '5 years' } });
  fireEvent.change(screen.getByLabelText(/Resume/i), { target: { files: [new File(['resume'], 'resume.pdf', { type: 'application/pdf' })] } });

  fireEvent.click(screen.getByText(/Submit/i));

  expect(await screen.findByText(/Candidate added successfully!/i)).toBeInTheDocument();
});