import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import FormCheckInput from 'react-bootstrap/esm/FormCheckInput';
import { useParams } from 'react-router-dom';

function CorrectionDetails(props) {
	const [inputList, setInputList] = useState([
		{ columnName: '', maxScore: '', notes: '' },
	]);

	function changeScore(e) {
		console.log(props.idx, e.target.value, props.size);
		props.handleChange(props.idx, e.target.value, props.size);
	}

	useEffect(() => {
		console.log('lagiii');
		console.log(props.existss);

		// var arr = [];
		// if(!scores) {
		// 	setScores(props.correctionData[props.index].scores)
		// }
	});

	useEffect(() => {
		console.log('change');
	}, [props.correctionData]);

	return (
		<Card>
			<Card.Body>
				<Card.Title>{props.data.details_columnName}</Card.Title>
				<Row>
					<Form.Label>{props.data.details_notes}</Form.Label>
				</Row>
				{localStorage.getItem('isEditable') === 'true' ? (
					<Row>
						<Col>
							<Form.Control
								type='number'
								placeholder='Score'
								max={props.data.details_maxScore}
								min={0}
								onChange={(e) => changeScore(e)}
							/>
						</Col>
						<Col>
							<Form.Label>/ {props.data.details_maxScore}</Form.Label>
						</Col>
						<Col />
						<Col />
					</Row>
				) : (
					<></>
				)}
				{localStorage.getItem('isEditable') === 'true' &&
				props.correctionData &&
				props.correctionData.correction &&
				props.correctionData.correction[props.index] &&
				props.correctionData.correction[props.index].scores[props.idx] ? (
					<Row>
						<Form.Label>
							*Old value{' '}
							{props.correctionData.correction[props.index].scores[props.idx]}
						</Form.Label>
					</Row>
				) : (
					<></>
				)}
				{localStorage.getItem('isEditable') === 'false' &&
				props.correctionData &&
				props.correctionData.correction &&
				props.correctionData.correction[props.index] &&
				props.correctionData.correction[props.index].scores[props.idx] ? (
					<Row>
						<Col>
							<Form.Label>
								<b>
									{
										props.correctionData.correction[props.index].scores[
											props.idx
										]
									}
								</b>{' '}
								/ {props.data.details_maxScore}
							</Form.Label>
						</Col>
					</Row>
				) : (
					<></>
				)}
			</Card.Body>
		</Card>
	);
}

export default CorrectionDetails;
