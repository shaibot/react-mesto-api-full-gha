import RegistrationPage from "./RegistrationPage";
import Header from "./Header";
import { Link } from "react-router-dom";
import { useState } from "react";

function Login({ handleLoginSubmit }) {
  const [formValues, setFormValues] = useState({
    email: '',
    password: ''
  })

  const handleChange = (evt) => {

    const { name, value } = evt.target;

    setFormValues({

      ...formValues,

      [name]: value

    });

  }

  function handleSubmit(evt) {
    evt.preventDefault();
    const { email, password } = formValues
    handleLoginSubmit(email, password)
  }
  return (
    <>
    <Header>
        <Link to="/sign-up" className="header__link">Зарегистрироваться
        </Link>
      </Header>
    <RegistrationPage
      name="login"
      title="Вход"
      buttonText="Войти"
      onSubmit={handleSubmit}
    >
      <input
        id="input-login-email"
        className="auth__input auth__input_name"
        name="email"
        type="email"
        placeholder="Email"
        minLength={2}
        maxLength={40}
        required
        value={formValues.email}
        onChange={handleChange}
      />

      <span id="input-login-email-error" className="popup__error" />
      <input
        id="input-login-password"
        name="password"
        type="password"
        className="auth__input auth__input_password"
        placeholder="Пароль"
        minLength={2}
        maxLength={200}
        required
        value={formValues.password}
        onChange={handleChange}
      />
      <span id="input-login-password-error" className="popup__error" />
    </RegistrationPage>
    </>
  );
}

export default Login;