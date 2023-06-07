import axios from 'axios';
import { Component, useEffect, useState } from 'react';
import {
	Button,
	Card,
	Carousel,
	Container,
	Form,
	Table,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CorrectionDetails from './CorrectionDetails';

const Details = (props) => (
	<tr>
		<td>{props.data.courseName}</td>
		<td>
			<Link to={'/update/' + props.data._id}>Edit</Link>
		</td>
		<td>
			<Button
				type='Submit'
				onClick={() => {
					axios
						.delete('http://localhost:4000/details/delete/' + props.data._id)
						.then((res) => {
							console.log('Details successfully deleted!');
							window.location.reload();
						})
						.catch((error) => {
							console.log(error);
						});
				}}
			>
				Delete
			</Button>
		</td>
	</tr>
);

function CorrectionPage() {
	const [inputList, setInputList] = useState();

	useEffect(() => {
		console.log('tes');
		axios
			.get('http://localhost:4000/details/')
			.then((res) => {
				setInputList(res.data);
				console.log(res.data);
			})

			.catch(function (error) {
				console.log(error);
			});
	}, []);

	function detailsList() {
		return inputList.map(function (x) {
			return <Details data={x}></Details>;
		});
	}

	const [index, setIndex] = useState(0);
	const [type, setType] = useState('');

	const [items, setItems] = useState();

	// useEffect(() => {
	//     setItems([
	//         {columnName: "foo", maxScore: 10, notes: "foo", id: 0},
	//         {columnName: "bar", maxScore: 10, notes: "bar", id: 1},
	//         {columnName: "bazz", maxScore: 10, notes: "bazz", id: 2},
	//     ])
	// })

	const handleSelect = (selectedIndex, e) => {
		setIndex(selectedIndex);
	};
	return (
		<>
			<Container>
				<Carousel
					activeIndex={index}
					onSelect={handleSelect}
					variant='dark'
					className='mt-5'
					interval={null}
				>
					{inputList && inputList[0] ? (
						inputList[0].details.map(function (x) {
							return (
								<Carousel.Item>
									<Container className='justify-content-md-center w-75 pb-5'>
										<CorrectionDetails data={x} />
									</Container>
								</Carousel.Item>
							);
						})
					) : (
						<div></div>
					)}
				</Carousel>
				<div className='mt-3'>
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
				</div>
			</Container>
		</>
	);
}

export default CorrectionPage;
