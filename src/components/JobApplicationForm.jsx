// src/components/JobApplicationForm.js
import React from 'react';
import useForm from '../hooks/useForm';
import './JobApplicationForm.css';

const JobApplicationForm = () => {
  const initialValues = {
    fullName: '',
    email: '',
    phoneNumber: '',
    position: '',
    relevantExperience: '',
    portfolioURL: '',
    managementExperience: '',
    additionalSkills: [],
    interviewTime: ''
  };

  const validate = (values) => {
    let errors = {};

    if (!values.fullName) {
      errors.fullName = 'Full Name is required';
    }

    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Email address is invalid';
    }

    if (!values.phoneNumber) {
      errors.phoneNumber = 'Phone Number is required';
    } else if (!/^\d+$/.test(values.phoneNumber)) {
      errors.phoneNumber = 'Phone Number must be a valid number';
    }

    if ((values.position === 'Developer' || values.position === 'Designer') && !values.relevantExperience) {
      errors.relevantExperience = 'Relevant Experience is required';
    } else if (values.relevantExperience && values.relevantExperience <= 0) {
      errors.relevantExperience = 'Relevant Experience must be greater than 0';
    }

    if (values.position === 'Designer' && !values.portfolioURL) {
      errors.portfolioURL = 'Portfolio URL is required';
    } else if (values.portfolioURL && !/^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/.test(values.portfolioURL)) {
      errors.portfolioURL = 'Portfolio URL is invalid';
    }

    if (values.position === 'Manager' && !values.managementExperience) {
      errors.managementExperience = 'Management Experience is required';
    }

    if (values.additionalSkills.length === 0) {
      errors.additionalSkills = 'At least one skill must be selected';
    }

    if (!values.interviewTime) {
      errors.interviewTime = 'Preferred Interview Time is required';
    }

    return errors;
  };

  const { handleChange, handleSubmit, values, errors, isSubmitting } = useForm(initialValues, validate);

  return (
    <div className="container">
      <h1>Job Application Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fullName">Full Name</label>
          <input type="text" id="fullName" name="fullName" value={values.fullName} onChange={handleChange} />
          {errors.fullName && <span>{errors.fullName}</span>}
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" value={values.email} onChange={handleChange} />
          {errors.email && <span>{errors.email}</span>}
        </div>
        <div>
          <label htmlFor="phoneNumber">Phone Number</label>
          <input type="number" id="phoneNumber" name="phoneNumber" value={values.phoneNumber} onChange={handleChange} />
          {errors.phoneNumber && <span>{errors.phoneNumber}</span>}
        </div>
        <div>
          <label htmlFor="position">Applying for Position</label>
          <select id="position" name="position" value={values.position} onChange={handleChange}>
            <option value="">Select Position</option>
            <option value="Developer">Developer</option>
            <option value="Designer">Designer</option>
            <option value="Manager">Manager</option>
          </select>
        </div>
        {(values.position === 'Developer' || values.position === 'Designer') && (
          <div>
            <label htmlFor="relevantExperience">Relevant Experience (Years)</label>
            <input type="number" id="relevantExperience" name="relevantExperience" value={values.relevantExperience} onChange={handleChange} />
            {errors.relevantExperience && <span>{errors.relevantExperience}</span>}
          </div>
        )}
        {values.position === 'Designer' && (
          <div>
            <label htmlFor="portfolioURL">Portfolio URL</label>
            <input type="text" id="portfolioURL" name="portfolioURL" value={values.portfolioURL} onChange={handleChange} />
            {errors.portfolioURL && <span>{errors.portfolioURL}</span>}
          </div>
        )}
        {values.position === 'Manager' && (
          <div>
            <label htmlFor="managementExperience">Management Experience</label>
            <textarea id="managementExperience" name="managementExperience" value={values.managementExperience} onChange={handleChange}></textarea>
            {errors.managementExperience && <span>{errors.managementExperience}</span>}
          </div>
        )}
        <div>
          <label>Additional Skills</label>
          <div>
            <label>
              <input type="checkbox" name="additionalSkills" value="JavaScript" checked={values.additionalSkills.includes('JavaScript')} onChange={handleChange} />
              JavaScript
            </label>
          </div>
          <div>
            <label>
              <input type="checkbox" name="additionalSkills" value="CSS" checked={values.additionalSkills.includes('CSS')} onChange={handleChange} />
              CSS
            </label>
          </div>
          <div>
            <label>
              <input type="checkbox" name="additionalSkills" value="Python" checked={values.additionalSkills.includes('Python')} onChange={handleChange} />
              Python
            </label>
          </div>
          {errors.additionalSkills && <span>{errors.additionalSkills}</span>}
        </div>
        <div>
          <label htmlFor="interviewTime">Preferred Interview Time</label>
          <input type="datetime-local" id="interviewTime" name="interviewTime" value={values.interviewTime} onChange={handleChange} />
          {errors.interviewTime && <span>{errors.interviewTime}</span>}
        </div>
        <button type="submit">Submit</button>
      </form>
      {isSubmitting && (
        <div className="summary">
          <h3>Summary</h3>
          <p><strong>Full Name:</strong> {values.fullName}</p>
          <p><strong>Email:</strong> {values.email}</p>
          <p><strong>Phone Number:</strong> {values.phoneNumber}</p>
          <p><strong>Position:</strong> {values.position}</p>
          {(values.position === 'Developer' || values.position === 'Designer') && (
            <p><strong>Relevant Experience:</strong> {values.relevantExperience} years</p>
          )}
          {values.position === 'Designer' && (
            <p><strong>Portfolio URL:</strong> {values.portfolioURL}</p>
          )}
          {values.position === 'Manager' && (
            <p><strong>Management Experience:</strong> {values.managementExperience}</p>
          )}
          <p><strong>Additional Skills:</strong> {values.additionalSkills.join(', ')}</p>
          <p><strong>Preferred Interview Time:</strong> {values.interviewTime}</p>
        </div>
      )}
    </div>
  );
};

export default JobApplicationForm;
