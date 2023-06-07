import React from 'react';
import { Button, Modal } from 'react-bootstrap';

function MyVerticallyCenteredModal(props) {
	return (
		<Modal
			{...props}
			size='lg'
			aria-labelledby='contained-modal-title-vcenter'
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title id='contained-modal-title-vcenter'>
					{props.title}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<h4>{props.subheading ? props.subheading : ''}</h4>
				<p>{props.description}</p>
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={props.onHide}>Close</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default MyVerticallyCenteredModal;
