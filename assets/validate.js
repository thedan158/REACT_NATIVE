// function check if email is valid

function validatePhone(value, setPhoneError) {
  if (value == '') {
    setPhoneError('');
  } else if (value.length < 10) {
    setPhoneError('Phone number must be at least 10 characters');
  } else {
    setPhoneError('');
  }
}

function validatePasswordConfirm(value, password, setPasswordConfirmError) {
  if (value == '') {
    setPasswordConfirmError('');
  } else if (value !== password) {
    setPasswordConfirmError('Password does not match');
  } else {
    setPasswordConfirmError('');
  }
}

const validate = {
  validatePhone,
  validatePasswordConfirm,
};

export default validate;
