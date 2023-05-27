import { useState } from "react";
import RegistrationPage from "./RegistrationPage";
import Header from "./Header";
import { Link } from "react-router-dom";

function Register({handleRegisterSubmit}) {
  const [isValue, setIsValue] = useState({
    email: '',
    password: ''
  })

  const handleChange = (evt) => {

    const { name, value } = evt.target;

    setIsValue({

      ...isValue,

      [name]: value

    });

  }

  function handleSubmit(evt) {
    evt.preventDefault();
    const { email, password } = isValue
    handleRegisterSubmit(email, password)  
  }

  return (
    <>
      <Header>
        <Link to="/sign-in" className="header__link">Войти
        </Link>
      </Header>
      <RegistrationPage
        name="register"
        title="Регистрация"
        buttonText="Зарегистрироваться"
        onSubmit={handleSubmit}
      >
        <input
          id="input-register-email"
          className="auth__input auth__input_name"
          name="email"
          type="email"
          placeholder="Email"
          minLength={2}
          maxLength={40}
          required
          value={isValue.email}
          onChange={handleChange}
        />

        <span id="input-register-email-error" className="popup__error" />
        <input
          id="input-register-password"
          name="password"
          type="password"
          className="auth__input auth__input_password"
          placeholder="Пароль"
          minLength={2}
          maxLength={200}
          required
          value={isValue.password}
          onChange={handleChange}
        />
        <span id="input-register-password-error" className="popup__error" />
      </RegistrationPage>
      <Link to="/sign-in" className="auth__link">Уже зарегистрированы? Войти</Link>
    </>

  );
}

export default Register;