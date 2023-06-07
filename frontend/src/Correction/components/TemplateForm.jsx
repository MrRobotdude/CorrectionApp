import React, { useEffect, useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export const TemplateForm = ({ detail, onSubmit }) => {
	const [inputList, setInputList] = useState([
		{ columnName: '', maxScore: '', notes: '' },
	]);
	const { template, handleSubmit } = useForm({
		defaultValues: { text: detail ? detail.columnName : '' },
	});

	const navigate = useNavigate();

	const submitHandler = handleSubmit(() => {
		onSubmit(template);
		navigate('/correction-page');
	});

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
		list.splice(index, 1);
		setInputList(list);
	};

	// handle click event of the Add button
	const handleAddClick = () => {
		setInputList([...inputList, { columnName: '', maxScore: '', notes: '' }]);
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
									name='columnName'
									value={x.columnName}
									onChange={(e) => handleInputChange(e, i)}
								/>
								<br />
								<Form.Control
									type='text'
									placeholder='Max Score'
									name='maxScore'
									onChange={(e) => handleInputChange(e, i)}
								/>
								<br />
								<Form.Control
									as='textarea'
									rows={3}
									placeholder='Notes'
									name='notes'
									onChange={(e) => handleInputChange(e, i)}
								/>
								<br />
							</Card.Body>
						</Card>
						{inputList.length !== 1 && (
							<Button className='m-3' onClick={() => handleRemoveClick(i)}>
								Remove
							</Button>
						)}
						{inputList.length - 1 === i && (
							<Button className='m-3' onClick={handleAddClick}>
								Add
							</Button>
						)}
						{inputList.length - 1 === i && (
							<Button className='m-3' onClick={submitHandler}>
								Save
							</Button>
						)}
					</div>
				);
			})}
			<div style={{ marginTop: 20 }}>{JSON.stringify(inputList)}</div>
		</div>
	);
};
