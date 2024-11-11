import React, { useState } from 'react';
import AddCandidateForm from './AddCandidateForm';

const Dashboard: React.FC = () => {
  const [showForm, setShowForm] = useState(false);

  const handleAddCandidateClick = () => {
    setShowForm(true);
  };

  return (
    <div>
      <h1>Recruiter Dashboard</h1>
      <button onClick={handleAddCandidateClick}>Add New Candidate</button>
      {showForm && <AddCandidateForm />}
    </div>
  );
};

export default Dashboard;