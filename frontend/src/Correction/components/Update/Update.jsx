import axios from 'axios';
import { useEffect, useState } from 'react';
import { Card, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Header from '../../../Navbar/Header';
// import Header from '../../Navbar/Header';
import UpdateColumnDetails from './UpdateColumnDetails';

function Update() {
	const { id, code, name, type } = useParams();
	const [course, setCourse] = useState('');
	const [role, setRole] = useState('Software Teaching Assistant');

	function handleChange(e) {
		console.log('e.target.value', e.target.value);
		setCourse(e.target.value);
		console.log('course: ' + course);
	}

	useEffect(() => {
		axios
			.get('http://localhost:4000/details/' + id)
			.then((res) => console.log(res.data));
	}, []);

	return (
		<div
			style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
		>
			<Header setRole={setRole} role={role} />
			<div style={{ width: '90vw', marginTop: '80px' }}>
				<Card>
					<Card.Body>
						<Card.Title>Update Correction Template</Card.Title>
						{/* <Form.Group controlId='formBasicSelect'>
							<Form.Label>Select Course</Form.Label>
							<Form.Control
								as='select'
								value={course}
								onChange={(e) => handleChange(e)}
							>
								<option value='ISYS6169001-Database Systems'>
									ISYS6169001-Database Systems
								</option>
								<option value='ISYS6197003-Business Application Development'>
									ISYS6197003-Business Application Development
								</option>
								<option value='COMP6115001-Object Oriented Analysis & Design'>
									COMP6115001-Object Oriented Analysis & Design
								</option>
							</Form.Control>
						</Form.Group> */}
						<UpdateColumnDetails
							detailsId={id}
							Course={code + '-' + name}
							type={type}
						/>
					</Card.Body>
				</Card>
			</div>
		</div>
	);
}

export default Update;
