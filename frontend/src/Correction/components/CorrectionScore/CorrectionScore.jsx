import axios from 'axios';
import { Component, useEffect, useState } from 'react';
import { Button, Carousel, Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import CorrectionDetails from '../CorrectionPage/CorrectionDetails';
import MyVerticallyCenteredModal from '../Modal/Modal';

function CorrectionScore(props) {
	let { id, course, type, className } = useParams();
	const [inputList, setInputList] = useState();
	const [score, setScore] = useState([]);
	const [ex, setEx] = useState(false);
	const [notes, setNotes] = useState('');
	const [isRev, setIsRev] = useState(false);
	const [modalShow, setModalShow] = useState(false);
	const [modalTitle, setModalTitle] = useState('Title');
	const [modalDescription, setModalDescription] = useState('Description');

	useEffect(() => {
		// console.log(props.correctionData)
		checkExist();
		if (props.correctionData.correction) {
			var obj = props.correctionData;
			for (let index = 0; index < obj.correction.length; index++) {
				console.log('beng');
				if (obj.correction[index].studentId === id) {
					setNotes(obj.correction[index].notes);
					console.log('tot');
					console.log(obj.correction[index].notes);
					if (obj.correction[index].revised) {
						setIsRev(obj.correction[index].revised);
					}

					break;
				}
			}
		}
		console.log('tes');
	}, [props.correctionData.correction]);

	function checkExist() {
		axios
			.get('http://localhost:4000/details/')
			.then((res) => {
				setInputList(res.data);
				console.log(res.data);
			})

			.catch(function (error) {
				console.log(error);
			});
		const requestOptions = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		};
		fetch(
			'http://localhost:4000/corrects/' +
				course +
				'/' +
				type +
				'/' +
				localStorage.getItem('username') +
				'/' +
				className +
				'',
			requestOptions
		)
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				console.log(
					'http://localhost:4000/corrects/' +
						course +
						'/' +
						type +
						'/' +
						localStorage.getItem('username') +
						'/' +
						className +
						''
				);

				if (data && data.length !== 0) {
					console.log('udah ada');
					setEx(true);
				} else {
					console.log('blm ada');
					setEx(false);
				}
			});
	}

	useEffect(() => {
		console.log(isRev);
	}, [isRev]);

	function changeStatus(status) {
		axios
			.post(
				'http://localhost:4000/corrects/change-status/' +
					props.correctionData.courseId +
					'/' +
					props.correctionData.class +
					'/' +
					localStorage.getItem('username') +
					'/' +
					props.correctionData.type,
				{ status: status }
			)
			.then((res) => {
				console.log(res.data);
				// window.open('http://academic-slc.apps.binus.ac.id/', '_blank');
			});
	}

	function handleScoreInput(i, value, size) {
		var obj = props.correctionData;
		var arr = score;
		if (!score) {
			arr = new Array(size);
		}
		console.log(size, i);
		arr[i] = value - '0';
		setScore(arr);
		var len = obj.correction.length;
		if (props.index === -1) {
			console.log('blm ada di db ' + props.index);

			obj.correction[len - 1].scores = score;
		} else {
			console.log('udah ada di db ' + props.index);
			obj.correction[props.index].scores[i] = value - '0';
		}

		props.setCorrectionData(obj);
		console.log(props.correctionData);
		if (!ex) {
			console.log('insert');
			axios
				.post('http://localhost:4000/corrects/create', props.correctionData)
				.then((res) => console.log(res.data));
		} else {
			console.log('update');
			if (props.index === -1) {
				console.log('ga ada update', len, props.index);
				console.log(
					props.correctionData.type,
					props.correctionData.correction[len - 1]
				);
				axios
					.post(
						'http://localhost:4000/corrects/update-correction/' +
							props.correctionData.courseId +
							'/' +
							props.correctionData.class +
							'/' +
							localStorage.getItem('username') +
							'/' +
							props.correctionData.type,
						props.correctionData.correction
					)
					.then((res) => console.log(res.data));
			} else {
				console.log('ada update', props.index);
				axios
					.post(
						'http://localhost:4000/corrects/update-correction/' +
							props.correctionData.courseId +
							'/' +
							props.correctionData.class +
							'/' +
							localStorage.getItem('username') +
							'/' +
							props.correctionData.type,
						props.correctionData.correction
					)
					.then((res) => console.log(res.data));
			}
		}
		checkExist();
	}

	function handleRevision(e) {
		setNotes(e.target.value);
	}

	useEffect(() => {
		// console.log(props.correctionData.correction)
		if (props.correctionData.correction) {
			var obj = props.correctionData;
			for (let index = 0; index < obj.correction.length; index++) {
				if (obj.correction[index].studentId === id) {
					console.log(obj.correction[index]);
					if (document.getElementById('ch-revised'))
						obj.correction[index].revised =
							document.getElementById('ch-revised').checked;
					obj.correction[index].notes = notes;
					console.log(obj);
					break;
				}
			}
			axios
				.post(
					'http://localhost:4000/corrects/update-correction/' +
						props.correctionData.courseId +
						'/' +
						props.correctionData.class +
						'/' +
						props.correctionData.corrector +
						'/' +
						props.correctionData.type,
					obj.correction
				)
				.then((res) => console.log(res.data));
		}
	}, [notes]);

	const [index, setIndex] = useState(0);

	const handleSelect = (selectedIndex, e) => {
		setIndex(selectedIndex);
	};
	return (
		<>
			<Container className='py-3' fluid>
				<Row>
					<Col>
						<Carousel
							activeIndex={index}
							onSelect={handleSelect}
							variant='dark'
							className='w-100'
							interval={null}
						>
							{props.template && props.template.details ? (
								props.template.details.map((data, i) => {
									return (
										<Carousel.Item key={i}>
											<Container className='justify-content-md-center w-75 pb-5 align-item-center'>
												<CorrectionDetails
													handleChange={handleScoreInput}
													existss={props.existss}
													setCorrectionData={props.setCorrectionData}
													index={props.index}
													correctionData={props.correctionData}
													idx={i}
													size={props.template.details.length}
													data={data}
												/>
											</Container>
										</Carousel.Item>
									);
								})
							) : (
								<div></div>
							)}
						</Carousel>
					</Col>
					<Col className='w-100'>
						{isRev || localStorage.getItem('isEditable') === 'false' ? (
							<div className='d-flex justify-content-between align-items-center flex-column'>
								<div class='form-floating w-75'>
									<textarea
										className='form-control w-100'
										placeholder='Notes'
										id='floatingTextarea2'
										style={{ height: '100px', resize: 'none' }}
										value={notes}
										onChange={(e) => handleRevision(e)}
									></textarea>
									<label for='floatingTextarea2'>Notes</label>
								</div>
								<div className='d-flex justify-content-center align-items-center gap-2'>
									<input
										class='form-check-input mt-0'
										type='checkbox'
										value=''
										aria-label='Checkbox for following text input'
										checked={isRev}
										onChange={(e) => setIsRev(e.target.checked)}
										id='ch-revised'
									></input>
									Revised ?
								</div>
							</div>
						) : (
							<></>
						)}

						{localStorage.getItem('isEditable') === 'false' ? (
							<div class='d-flex justify-content-end align-items-end gap-1'>
								<Button
									variant='success'
									onClick={(e) => {
										changeStatus('Approved');
										setModalTitle('Approve Correction');
										setModalDescription('Thank you');
										setModalShow(true);
									}}
								>
									Approve
								</Button>
								<Button
									variant='danger'
									onClick={(e) => {
										changeStatus('Revised');
										setModalTitle('Revise Correction');
										setModalDescription(
											'Corrector will happily accepted your revision'
										);
										setModalShow(true);
									}}
								>
									Revised
								</Button>
							</div>
						) : (
							<div className='d-flex justify-content-end align-items-center'>
								<Button
									variant='primary'
									onClick={(e) => {
										changeStatus('Submited');
										setModalTitle('Submit Correction');
										setModalDescription(
											'Your Correction has been submitted, please wait for the Subco to check it'
										);
										setModalShow(true);
									}}
								>
									Submit
								</Button>
							</div>
						)}
					</Col>
				</Row>

				{/* <div className='mt-3'>
					<h3>Column Detail List</h3>
					<Table className='table-stripped mt-3'>
						<thead>
							<tr>
								<th>Course Name</th>
								<th>Update</th>
								<th>Delete</th>
							</tr>
						</thead>
						<tbody>{inputList ? detailsList() : <tr></tr>}</tbody>
					</Table>
				</div> */}
			</Container>
			<MyVerticallyCenteredModal
				show={modalShow}
				onHide={() => {
					setModalShow(false);
					window.location.href = '/';
				}}
				title={modalTitle}
				description={
					// 'Your Correction has been submitted, please wait for the Subco to check it'
					modalDescription
				}
			/>
		</>
	);
}
export default CorrectionScore;
