import axios from 'axios';
import { Component, useEffect, useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import MyVerticallyCenteredModal from '../Modal/Modal';

function CreateColumnDetails(props) {
	const [inputList, setInputList] = useState([
		{ details_columnName: '', details_maxScore: '', details_notes: '' },
	]);
	const [course, setCourse] = useState('');
	const [id, setId] = useState('');
	const [modalShow, setModalShow] = useState(false);

	useEffect(() => {
		setCourse(props.Course);
		console.log(course);
	}, [props.Course]);

	useEffect(() => {
		setId(props.courseId);
		console.log(id);
	}, [props.courseId]);

	function onSubmit(e) {
		e.preventDefault();
		console.log(`Form submitted:`);
		console.log(`Column Name: ${inputList[0].details_columnName}`);

		setModalShow(true);
		// console.log(`Max Score: ${this.state.details_maxScore}`);
		// console.log(`Notes: ${this.state.details_notes}`);

		// const newDetail = {
		//     details_columnName: this.state.details_columnName,
		//     details_maxScore: this.state.details_maxScore,
		//     details_notes: this.state.details_notes,
		// };

		var temp = props.type;
		if (props.type === 'Assignment 1') temp = 'Assignment';
		const obj = {
			courseId: id,
			type: temp,
			courseName: course,
			details: inputList,
		};

		console.log(obj);

		axios
			.post('http://localhost:4000/details/add', obj)
			.then((res) => console.log(res.data));

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
		const list = [...inputList];
		list[index][name] = value;
		console.log(list[index][name]);
		setInputList(list);
	};

	// handle click event of the Remove button
	const handleRemoveClick = (index) => {
		const list = [...inputList];
		console.log(inputList);
		console.log(index);
		list.splice(index, 1);
		console.log(list);
		setInputList(list);
	};

	// handle click event of the Add button
	const handleAddClick = () => {
		setInputList([
			...inputList,
			{ details_columnName: '', details_maxScore: '', details_notes: '' },
		]);
	};

	return (
		<div>
			{inputList.map((x, i) => {
				return (
					<div>
						<Card>
							<Card.Body>
								<Form.Control
									type='text'
									placeholder='Column Name'
									name='details_columnName'
									value={inputList[i].details_columnName}
									onChange={(e) => handleInputChange(e, i)}
								/>
								<br />
								<Form.Control
									type='text'
									placeholder='Max Score'
									name='details_maxScore'
									value={inputList[i].details_maxScore}
									onChange={(e) => handleInputChange(e, i)}
								/>
								<br />
								<Form.Control
									as='textarea'
									rows={3}
									placeholder='Notes'
									name='details_notes'
									value={inputList[i].details_notes}
									onChange={(e) => handleInputChange(e, i)}
								/>
								<br />
							</Card.Body>
						</Card>
						<div className='d-flex align-items-center justify-content-start gap-2 my-3'>
							{inputList.length !== 1 && (
								<Button onClick={() => handleRemoveClick(i)}>Remove</Button>
							)}
							{inputList.length - 1 === i && (
								<Button onClick={handleAddClick}>Add</Button>
							)}
							{inputList.length - 1 === i && (
								<Button onClick={onSubmit}>Create</Button>
							)}
						</div>
					</div>
				);
			})}
			{/* <div style={{ marginTop: 20 }}>{JSON.stringify(inputList) + course}</div> */}
			<MyVerticallyCenteredModal
				show={modalShow}
				onHide={() => {
					setModalShow(false);
					window.location.href = '/';
				}}
				title={'Template has been created'}
				description={"Let's go on to the next correction !"}
			/>
		</div>
	);
}

export default CreateColumnDetails;
