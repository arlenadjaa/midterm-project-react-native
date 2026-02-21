export interface FormErrors {
  name?: string;
  email?: string;
  contact?: string;
  reason?: string;
}

export const validateApplicationForm = (
  name: string,
  email: string,
  contact: string,
  reason: string,
): FormErrors => {
  const errors: FormErrors = {};

  if (!name.trim()) errors.name = "Name is required.";

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.trim()) {
    errors.email = "Email is required.";
  } else if (!emailRegex.test(email)) {
    errors.email = "Please enter a valid email address.";
  }

  const phoneRegex = /^[0-9]{10,15}$/;
  if (!contact.trim()) {
    errors.contact = "Contact number is required.";
  } else if (!phoneRegex.test(contact)) {
    errors.contact = "Contact must be between 10 to 15 digits.";
  }

  if (!reason.trim()) {
    errors.reason = "This field is required.";
  } else if (reason.trim().length < 10) {
    errors.reason = "Please provide at least 10 characters.";
  }

  return errors;
};
