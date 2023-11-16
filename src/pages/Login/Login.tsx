/* eslint-disable @typescript-eslint/no-unused-vars */
import Button from '../../components/Button/Button';
import Heading from '../../components/Heading/Heading';
import Input from '../../components/Input/Input';
import styles from './Login.module.css';
import { FormEvent } from 'react';


export type LoginForm = {
	loginEmail: {
		value: string;
	};
	loginPassword: {
		value: string;
	};
};

export function Login() {
	const submit = async (e: FormEvent) => {
		e.preventDefault();
		const target = e.target as typeof e.target & LoginForm;
		const { loginEmail, loginPassword } = target;
		await checkData(loginEmail.value, loginPassword.value);
	};

	

	const checkData = async (loginEmail: string, loginPassword: string) => {
		try {
			const response = await fetch(
				'https://purpleschool.ru/pizza-api-demo/auth/login',
				{
					method: 'POST',
					body: JSON.stringify({ email: loginEmail, password: loginPassword })
				}
			);
			if (!response.ok) {
				console.log('Запрос завершился с ошибкой', response.status);
				return;
			}
			const data = await response.json();
			console.log('Данные получены', data);
		} catch (e) {
			console.error(e);
			return;
		}
	};

	return (
		<>
			<div className={styles['login']}>
				<Heading>Вход</Heading>
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
