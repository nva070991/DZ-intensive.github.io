import Button from '../../components/Button/Button';
import Heading from '../../components/Heading/Heading';
import Input from '../../components/Input/Input';
import styles from './Login.module.css';
import { FormEvent, useState } from 'react';

type LoginForm = {
	loginEmail: {
		value: string;
	};
	loginPassword: {
		value: string;
	};
};

export function Login() {
	const [loginErrorMessage, setLoginErrorMessage] = useState('');

	const submit = async (e: FormEvent) => {
		e.preventDefault();

		const target = e.target as typeof e.target & LoginForm;
		const { loginEmail, loginPassword } = target;

		if (!loginEmail.value || !loginPassword.value) {
			setLoginErrorMessage('Введите email и пароль');
			return;
		}

		await checkData(loginEmail.value, loginPassword.value);
	};

	const checkData = async (loginEmail: string, loginPassword: string) => {
		try {
			const response = await fetch('', {
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				},
				method: 'POST',
				body: JSON.stringify({ email: loginEmail, password: loginPassword })
			});
			if (!response.ok) {
				setLoginErrorMessage('Неверная почта или пароль');
				return;
			}
			setLoginErrorMessage('');
			const data = await response.json();
			console.log('Промис с токеном', data);
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<>
			<div className={styles['login']}>
				<Heading>Вход</Heading>
				{loginErrorMessage && (
					<div className={styles['error']}>Error: {loginErrorMessage}</div>
				)}

				<form className={styles['form']} onSubmit={submit}>
					<div className={styles['field']}>
						<label htmlFor="loginEmail">Ваш e-mail</label>
						<Input
							autoComplete="current-login"
							id="loginEmail"
							name="loginEmail"
							placeholder="Email"
							type="email"
							maxLength={200}
						/>
					</div>
					<div className={styles['field']}>
						<label htmlFor="loginPassword">Ваш пароль</label>
						<Input
							minLength={6}
							maxLength={200}
							autoComplete="current-password"
							id="loginPassword"
							name="loginPassword"
							type="password"
							placeholder="Пароль"
						/>
					</div>
					<Button onClick={() => {}} appearence="big">
						Вход
					</Button>
				</form>
			</div>
		</>
	);
}
