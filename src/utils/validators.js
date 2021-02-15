export const validateRegisterInput = ({ email, username, password, confirmPassword }) => {
  const errors = [];

  if (email.trim() === '') {
    errors.push({ email: 'Email не должен быть пустым' });
  } else {
    const regExp = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regExp)) {
      errors.push({ email: 'Невалидный email' })
    }
  }

  if (username.trim() === '') {
    errors.push({ username: 'Username не должен быть пустым' });
  }

  if (password.trim() === '') {
    errors.push({ password: 'Password не должен быть пустым' })
  } else if (password.length < 6) {
    errors.push({ password: 'Password не должен быть менее 6 символов' });
  } else if (password !== confirmPassword) {
    errors.push({ password: 'Passwords должны совпадать' });
  }

  return errors;
}

export const validateLoginInput = ({ username, password }) => {
  const errors = [];

  if (username.trim() === '') {
    errors.push({ username: 'Username не должен быть пустым' })
  }

  if (password.trim() === '') {
    errors.push({ password: 'Password не должен быть пустым' })
  }

  return errors;
}

export const validateNewsForm = ({ title, text }) => {
  const errors = [];

  if (title.trim() === '') {
    errors.push({ title: 'Title не должен быть пустым' })
  }

  if (text.trim() === '') {
    errors.push({ text: 'Text не должен быть пустым' })
  }

  return errors;
}

export const validateUserForm = ({ firstname, lastname, age, city, social }) => {
  const errors = [];

  if (age < 0 || age > 100) {
    errors.push({ age: 'Некорректный возвраст' });
  }

  return errors;
}