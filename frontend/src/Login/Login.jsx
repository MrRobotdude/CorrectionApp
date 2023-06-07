import { Button } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import './Login.css';
import Particles from 'react-tsparticles';

function Login() {
	const [uname, setUsername] = useState('');
	const [pass, setPassword] = useState('');

	useEffect(() => {
		console.log(sessionStorage.getItem('token'));
		if (sessionStorage.getItem('token') !== null) window.location = '/';
	}, []);
	function loginAccount(e) {
		e.preventDefault();
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username: uname, password: pass }),
		};
		fetch(
			'https://laboratory.binus.ac.id/lapi/api/Account/LogOn',
			requestOptions
		)
			.then((response) => response.json())
			.then((data) => {
				sessionStorage.setItem('token', data.access_token);

				if (data.Message !== undefined) {
					console.log(data);
				} else {
					const requestOptions1 = {
						method: 'GET',
						headers: {
							'Content-Type': 'application/json',
							Authorization: 'Bearer ' + sessionStorage.getItem('token'),
						},
					};
					fetch(
						'https://laboratory.binus.ac.id/lapi/api/Account/GetOneDriveToken',
						requestOptions1
					)
						.then((response) => response.json())
						.then((data1) => {
							console.log('duar ' + data1.token);
							sessionStorage.setItem('onedriveToken', data1.token);
							console.log(sessionStorage.getItem('onedriveToken'));
							alert('a');
						});

					window.location = '/';
				}
			});
	}

	const particlesInit = (main) => {
		console.log(main);

		// you can initialize the tsParticles instance (main) here, adding custom shapes or presets
	};

	const particlesLoaded = (container) => {
		console.log(container);
	};

	return (
		<main className='form-signin vw-100 vh-100 d-flex justify-content-center align-items-center position-relative bg-primary'>
			<Particles
				id='tsparticles'
				// init={particlesInit}
				// loaded={particlesLoaded}
				options={{
					background: {
						color: {
							value: 'blue',
						},
					},
					fpsLimit: 60,
					interactivity: {
						events: {
							onClick: {
								enable: true,
								mode: 'push',
							},
							onHover: {
								enable: true,
								mode: 'repulse',
							},
							resize: true,
						},
						modes: {
							bubble: {
								distance: 400,
								duration: 10,
								opacity: 0.8,
								size: 40,
							},
							push: {
								quantity: 4,
							},
							repulse: {
								distance: 200,
								duration: 2,
							},
						},
					},
					particles: {
						color: {
							value: '#ffffff',
						},
						links: {
							color: '#ffffff',
							distance: 150,
							enable: true,
							opacity: 0.5,
							width: 1,
						},
						collisions: {
							enable: true,
						},
						move: {
							direction: 'none',
							enable: true,
							outMode: 'bounce',
							random: false,
							speed: 6,
							straight: false,
						},
						number: {
							density: {
								enable: true,
								area: 800,
							},
							value: 80,
						},
						opacity: {
							value: 0.5,
						},
						shape: {
							type: 'circle',
						},
						size: {
							random: true,
							value: 5,
						},
					},
					detectRetina: true,
				}}
			/>
			<div className='w-45 h-30 d-flex justify-content-center align-items-center bg-white rounded'>
				<Form
					className='m-5 w-100 d-flex flex-column align-items-center justify-content-center'
					onSubmit={loginAccount}
				>
					<h1 className='h2 mb-3 fw-bold'>Correction App</h1>
					<Form.Group className='mb-3 w-100' controlId='formBasicEmail'>
						<Form.Label>Initial</Form.Label>
						<Form.Control
							type='text'
							placeholder='Initial'
							onChange={(e) => setUsername(e.target.value)}
						/>
					</Form.Group>
					<Form.Group className='mb-3 w-100' controlId='formBasicPassword'>
						<Form.Label>Password</Form.Label>
						<Form.Control
							type='password'
							placeholder='Password'
							onChange={(e) => setPassword(e.target.value)}
						/>
					</Form.Group>
					<Button id='loginBtn' variant='primary' type='submit'>
						Sign in
					</Button>
				</Form>
			</div>
		</main>
	);
}

export default Login;
