// src/hooks/validate.js
const validate = (values) => {
    const errors = {};
    if (!values.fullName) errors.fullName = 'Full Name is required.';
    if (!values.email) errors.email = 'Email is required.';
    else if (!/\S+@\S+\.\S+/.test(values.email)) errors.email = 'Email is invalid.';
    if (!values.phoneNumber) errors.phoneNumber = 'Phone Number is required.';
    else if (!/^\d+$/.test(values.phoneNumber)) errors.phoneNumber = 'Phone Number must be a valid number.';
    if ((values.position === 'Developer' || values.position === 'Designer') && (!values.relevantExperience || values.relevantExperience <= 0)) {
        errors.relevantExperience = 'Relevant Experience is required and must be greater than 0.';
    }
    if (values.position === 'Designer' && (!values.portfolioUrl || !/^https?:\/\/[^\s$.?#].[^\s]*$/.test(values.portfolioUrl))) {
        errors.portfolioUrl = 'Portfolio URL is required and must be a valid URL.';
    }
    if (values.position === 'Manager' && !values.managementExperience) {
        errors.managementExperience = 'Management Experience is required.';
    }
    if (!values.skills.some(skill => skill.checked)) {
        errors.skills = 'At least one skill must be selected.';
    }
    if (!values.preferredInterviewTime) {
        errors.preferredInterviewTime = 'Preferred Interview Time is required.';
    }
    return errors;
};

export default validate;
