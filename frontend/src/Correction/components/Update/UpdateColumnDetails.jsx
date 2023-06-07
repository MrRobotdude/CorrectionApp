import axios from 'axios';
import { Component, useEffect, useState } from 'react';
import { Button, Card, Form, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Header from '../../../Navbar/Header';
import MyVerticallyCenteredModal from '../Modal/Modal';

function UpdateColumnDetails(props) {
	const [inputList, setInputList] = useState();
	const [course, setCourse] = useState('');
	const [modalShow, setModalShow] = useState(false);

	useEffect(() => {
		axios
			.get('http://localhost:4000/details/' + props.detailsId)
			.then((res) => setInputList(res.data));
		setCourse(props.Course);
		console.log(props.detailsId);
	}, [props.Course]);

	function onSubmit(e) {
		e.preventDefault();
		console.log(`Form submitted:`);
		// console.log(`Column Name: ${inputList[0].details_columnName}`);
		// console.log(`Max Score: ${this.state.details_maxScore}`);
		// console.log(`Notes: ${this.state.details_notes}`);

		// const newDetail = {
		//     details_columnName: this.state.details_columnName,
		//     details_maxScore: this.state.details_maxScore,
		//     details_notes: this.state.details_notes,
		// };

		const obj = inputList;

		console.log(obj);

		axios
			.post('http://localhost:4000/details/update/' + props.detailsId, obj)
			.then((res) => console.log(res.data));

		setModalShow(true);

		// this.setState({
		//     details_columnName: '',
		//     details_maxScore: '',
		//     details_notes: '',
		// })
	}

	const navigate = useNavigate();

	// const submitHandler = handleSubmit(()=>{
	//     onSubmit(template);
	//     navigate("/correction-page");
	// })

	// handle input change
	const handleInputChange = (e, index) => {
		const { name, value } = e.target;
		const list = [...inputList.details];
		list[index][name] = value;
		console.log(list[index][name]);
		const obj = {
			courseId: props.detailsId,
			courseName: props.Course,
			type: props.type,
			details: list,
		};
		setInputList(obj);
	};

	// handle click event of the Remove button
	const handleRemoveClick = (index) => {
		const list = [...inputList.details];
		console.log(inputList);
		console.log(index);
		list.splice(index, 1);
		const obj = {
			courseName: props.Course,
			details: list,
		};
		setInputList(obj);
	};

	// handle click event of the Add button
	const handleAddClick = () => {
		setInputList({
			courseName: props.Course,
			details: [
				...inputList.details,
				{ details_columnName: '', details_maxScore: '', details_notes: '' },
			],
		});
	};

	return (
		<div>
			{inputList ? (
				inputList.details.map((x, i) => {
					return (
						<div>
							<Card>
								<Card.Body>
									<Form.Control
										type='text'
										placeholder='Column Name'
										name='details_columnName'
										defaultValue={inputList.details[i].details_columnName}
										onChange={(e) => handleInputChange(e, i)}
									/>
									<br />
									<Form.Control
										type='text'
										placeholder='Max Score'
										name='details_maxScore'
										defaultValue={inputList.details[i].details_maxScore}
										onChange={(e) => handleInputChange(e, i)}
									/>
									<br />
									<Form.Control
										as='textarea'
										rows={3}
										placeholder='Notes'
										name='details_notes'
										defaultValue={inputList.details[i].details_notes}
										onChange={(e) => handleInputChange(e, i)}
									/>
									<br />
								</Card.Body>
							</Card>
							<div className='d-flex align-items-center justify-content-start gap-2 my-3'>
								{inputList.details.length !== 1 && (
									<Button onClick={() => handleRemoveClick(i)}>Remove</Button>
								)}
								{inputList.details.length - 1 === i && (
									<Button onClick={handleAddClick}>Add</Button>
								)}
								{inputList.details.length - 1 === i && (
									<Button onClick={onSubmit}>Save</Button>
								)}
							</div>
						</div>
					);
				})
			) : (
				<div />
			)}
			{/* <div style={{ marginTop: 20 }}>{JSON.stringify(inputList) + course}</div> */}
			<MyVerticallyCenteredModal
				show={modalShow}
				onHide={() => {
					setModalShow(false);
					window.location.href = '/';
				}}
				title={'Template has been saved'}
				description={"Let's go on to the next correction !"}
			/>
		</div>
	);
}

export default UpdateColumnDetails;
