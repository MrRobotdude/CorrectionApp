import React, { useEffect, useState } from 'react';
import {
	Button,
	Container,
	Dropdown,
	DropdownButton,
	Nav,
	Navbar,
} from 'react-bootstrap';

function Header(props) {
	const [token, setToken] = useState('');
	const [userData, setUserData] = useState({});

	const [correctionData, setCorrectionData] = useState({});
	useEffect(() => {
		setToken(sessionStorage.getItem('token'));
		console.log('a');
		if (!sessionStorage.getItem('token')) window.location = '/login';
		else {
			const requestOptions = {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + sessionStorage.getItem('token'),
				},
			};
			fetch(
				'https://laboratory.binus.ac.id/lapi/api/Account/Me',
				requestOptions
			)
				.then((response) => response.json())
				.then((data) => {
					console.log(data);
					setUserData(data);
				});
		}
	}, [props.role]);

	function changeRole(a) {
		props.setRole(a);
		localStorage.setItem('role', a);
	}

	function logout() {
		localStorage.removeItem('username');
		localStorage.removeItem('onedriveToken');
		localStorage.removeItem('current-file-path');
		localStorage.removeItem('role');
		localStorage.removeItem('id');
		localStorage.removeItem('current-file-index');
		localStorage.removeItem('correction-files-data');
		localStorage.removeItem('isEditable');
		sessionStorage.removeItem('token');

		window.location = '/login';
	}
	return (
		<Navbar
			collapseOnSelect
			expand='lg'
			bg='light'
			variant='light'
			style={{ width: '100vw' }}
			fixed='top'
		>
			<Container>
				<Navbar.Brand href='/'>
					<b>Correction App</b>
				</Navbar.Brand>
				<Navbar.Toggle aria-controls='responsive-navbar-nav' />
				<Navbar.Collapse id='responsive-navbar-nav'>
					<Nav className='me-auto'>
						{/* <Nav.Link href='#features'>Home</Nav.Link> */}
					</Nav>
					<div className='d-flex gap-2'>
						{userData ? (
							<Nav>
								<Nav.Link href='#deets'>{userData.Username}</Nav.Link>
								<DropdownButton
									id='dropdown-basic-button'
									title={props.role}
									variant='secondary'
								>
									{userData.Roles ? (
										userData.Roles.map((a, i) => {
											return (
												<Dropdown.Item
													href=''
													onClick={() => changeRole(a)}
													key={i}
												>
													{a}
												</Dropdown.Item>
											);
										})
									) : (
										<p></p>
									)}
								</DropdownButton>
							</Nav>
						) : (
							<p> non</p>
						)}
						<Nav>
							<Button onClick={logout} variant='light'>
								Logout
							</Button>
						</Nav>
					</div>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default Header;
