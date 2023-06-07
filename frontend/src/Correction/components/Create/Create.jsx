import { useState } from 'react';
import { Card, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Header from '../../../Navbar/Header';
// import Header from '../../Navbar/Header';
import CreateColumnDetails from './CreateColumnDetails';

function Create() {
	let { id, code, name, type } = useParams();
	const [course, setCourse] = useState('');
	const [role, setRole] = useState('Software Teaching Assistant');

	function handleChange(e) {
		console.log('e.target.value', e.target.value);
		setCourse(e.target.value);
		console.log('course: ' + course);
	}

	return (
		<div
			style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
		>
			<Header setRole={setRole} role={role} />
			<div style={{ width: '90vw', marginTop: '80px' }}>
				<Card>
					<Card.Body>
						<Card.Title>{code + ' ' + name}</Card.Title>
						{/* <select defaultValue={course} 
                        onChange={handleChange} 
                        >
                            <option value="Orange">Orange</option>
                            <option value="Radish">Radish</option>
                            <option value="Cherry">Cherry</option>
                        </select> */}
						{/* <Form> */}
						{/* <Form.Group controlId='formBasicSelect'>
							<Form.Label>Select Course</Form.Label>
							<Form.Select value={course} onChange={(e) => handleChange(e)}>
								<option value='select'>Select Course</option>
								<option value='ISYS6169001-Database Systems'>
									ISYS6169001-Database Systems
								</option>
								<option value='ISYS6197003-Business Application Development'>
									ISYS6197003-Business Application Development
								</option>
								<option value='COMP6115001-Object Oriented Analysis & Design'>
									COMP6115001-Object Oriented Analysis & Design
								</option>
							</Form.Select>
						</Form.Group> */}
						<CreateColumnDetails
							Course={code + '-' + name}
							courseId={id}
							type={type}
						/>
						{/* </Form> */}
					</Card.Body>
				</Card>
			</div>
		</div>
	);
}

export default Create;
