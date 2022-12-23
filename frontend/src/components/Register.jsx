import React from 'react';
import { Link } from 'react-router-dom';

function Register(props) {
  const { setHeaderLink, onRegister } = props;
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  React.useEffect(() => {
    setHeaderLink({
      name: "Вход",
      link: "/sign-in"
    });
  }, [])

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    setEmail('');
    setPassword('');
    onRegister({
      password: password,
      email: email
    });
  }

  return (
    <div className="signup">
      <p className="signup__title">
        Регистрация
      </p>
      <form onSubmit={handleSubmit} className="signup__form">
        <input required className="signup__input" type="text" value={email} onChange={handleChangeEmail} placeholder="Email" />
        <input required className="signup__input" type="password" value={password} onChange={handleChangePassword} placeholder="Пароль" />
        <button type="submit" className="signup__button" >Зарегистрироваться</button>
      </form>
      <p className="signup__text">Уже зарегистрированы? <Link to="/sign-in" className="signup__login-link">Войти</Link></p>
    </div>
  )
}

export default Register;