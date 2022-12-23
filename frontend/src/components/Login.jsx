import React from 'react';

function Login(props) {
  const { setHeaderLink, onLogin } = props;
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  React.useEffect(() => {
    setHeaderLink({
      name: "Регистрация",
      link: "/sign-up"
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
    onLogin({
      password: password,
      email: email
    });
  }

  return (
    <div className="login">
      <p className="login__title">
        Вход
      </p>
      <form onSubmit={handleSubmit} className="login__form">
        <input required className="login__input" type="text" value={email} onChange={handleChangeEmail} placeholder="Email" />
        <input required className="login__input" type="password" value={password} onChange={handleChangePassword} placeholder="Пароль" />
        <button type="submit" className="login__button">Войти</button>
      </form>
    </div>
  )
}

export default Login;
