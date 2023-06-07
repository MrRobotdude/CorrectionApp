import { render } from '@testing-library/react';
import React, { useEffect, useState, useRef } from 'react';
import {
	Button,
	Modal,
	Table,
	Form,
	Spinner,
	OverlayTrigger,
	Tooltip,
} from 'react-bootstrap';
import { Routes, Route, Link } from 'react-router-dom';
import Correction from '../Correction/Correction';
import Header from '../Navbar/Header';
import http from '../http-common';
import axios from 'axios';
import {
	BsDownload,
	BsFillCaretRightFill,
	BsInfoCircleFill,
	BsInfo,
	BsInfoLg,
	BsPlus,
	BsFillPencilFill,
	BsPlusLg,
	BsX,
	BsPencilFill,
} from 'react-icons/bs';
import { FiGlobe } from 'react-icons/fi';
import { IoIosInformationCircle } from 'react-icons/io';
import moment from 'moment';
import Utility from '../utils/Utility.js';
import './Home.scss';

function Home() {
	const [token, setToken] = useState('');
	const [isExtracting, setIsExtracting] = useState(undefined);
	const [userData, setUserData] = useState({});
	const [url, setUrl] = useState({});
	const [currentSemester, setCurrentSemester] = useState('');
	const [correctionData, setCorrectionData] = useState();
	const [course, setCourse] = useState('');
	const [className, setClassName] = useState('');
	const [studentAnswers, setStudentAnswers] = useState();
	const [role, setRole] = useState('Software Teaching Assistant');
	const [correctionType, setCorrectionType] = useState('');
	const [subjectData, setSubjectData] = useState([{}]);
	const [newSubjectData, setNewSubjectData] = useState([{}]);
	const [templateData, setTemplateData] = useState([{}]);
	const [subjectSelected, setSubjectSelected] = useState('');
	const [type, setType] = useState('');
	const [submitedData, setSubmitedData] = useState([{}]);
	const [allCorData, setAllCorData] = useState([{}]);
	const [corrType, setCorType] = useState('');
	const [handleCourse, setHandleCourse] = useState([]);
	const [groupNumber, setGroupNumber] = useState(0);

	useEffect(() => {
		localStorage.removeItem('isEditable');
		http.post(`/delete-directory`, { path: './files' });
		setToken(sessionStorage.getItem('token'));
		if (!sessionStorage.getItem('token')) window.location = '/login';
		else {
			if (localStorage.getItem('onedrivetoken') == null) {
				const requestOptions1 = {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						Authorization: 'Bearer ' + sessionStorage.getItem('token'),
					},
				};
				fetch(
					'https://laboratory.binus.ac.id/lapi/api/Account/GetOneDriveToken',
					requestOptions1
				)
					.then((response) => response.json())
					.then((data1) => {
						console.log('duar ' + data1.token);
						localStorage.setItem('onedriveToken', data1.token);
						console.log(localStorage.getItem('onedriveToken'));
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
								localStorage.setItem('username', data.Username);
								setUserData(data);
							});

						const requestOptions2 = {
							method: 'GET',
							headers: {
								'Content-Type': 'application/json',
								Authorization: 'Bearer ' + sessionStorage.getItem('token'),
							},
						};
						fetch(
							'https://laboratory.binus.ac.id/lapi/api/Semester/Active',
							requestOptions2
						)
							.then((response) => response.json())
							.then((data) => {
								setCurrentSemester(data.SemesterId);
								const requestOptions1 = {
									method: 'GET',
									headers: {
										'Content-Type': 'application/json',
										Authorization: 'Bearer ' + sessionStorage.getItem('token'),
									},
								};
								const reqOpt = {
									method: 'POST',
									headers: {
										'Content-Type': 'application/json',
										Authorization: 'Bearer ' + sessionStorage.getItem('token'),
									},
								};
								fetch(
									'https://laboratory.binus.ac.id/lapi/api/Correction/GetCorrectionSchedules?semesterId=' +
										data.SemesterId,
									requestOptions1
								)
									.then((response) => response.json())
									.then((d) => {
										console.log(d);
										setCorrectionData(d);
									});

								fetch(
									'https://laboratory.binus.ac.id/lapi/api/Account/Me',
									requestOptions1
								)
									.then((response) => response.json())
									.then((d) => {
										localStorage.setItem('id', d.UserId);
										console.log(d);
										if (!d.Roles.includes('Software Subject Coordinator')) {
											// DU20-1
											fetch(
												'https://academic-slc.apps.binus.ac.id/api/e1c72423994bffe635ead59f770da6a2ea53b95ac2ff5d60cefdab5529038986/subco-queue/' +
													data.SemesterId +
													'/' +
													// localStorage.getItem('username') +
													'CC20-2' +
													'/approved',
												reqOpt
											)
												.then((response) => response.json())
												.then((data) => {
													console.log(data);
													setSubjectData(data);
													var resArr = [];
													if (subjectData && subjectData.payloads) {
														console.log('duar');
														subjectData.payloads.queue.lists.filter(function (
															item
														) {
															var i = resArr.findIndex(
																(x) =>
																	x.course.code === item.course.code &&
																	x.course.name === item.course.name &&
																	x.type === item.type
															);
															if (i <= -1) {
																resArr.push(item);
															}
															return null;
														});
														var obj = subjectData;
														obj.payloads.queue.lists = resArr;
														console.log(obj);
														setNewSubjectData(obj);
														var arr = new Array(
															obj.payloads.queue.lists.length
														);
														for (
															let index = 0;
															index < obj.payloads.queue.lists.length;
															index++
														) {
															arr.push(
																obj.payloads.queue.lists[index].course.code +
																	'-' +
																	obj.payloads.queue.lists[index].course.name
															);
														}
														arr = arr.filter((a) => a);
														setHandleCourse(arr);
													}
													fetch(
														'http://localhost:4000/details/',
														requestOptions1
													)
														.then((response) => response.json())
														.then((data) => {
															console.log(data);
															setTemplateData(data);
														});
												});
										}
									});
							});
					});
			}
		}
	}, []);

	useEffect(() => {
		var resArr = [];
		if (subjectData && subjectData.payloads) {
			subjectData.payloads.queue.lists.filter(function (item) {
				var i = resArr.findIndex(
					(x) =>
						x.course.code === item.course.code &&
						x.course.name === item.course.name &&
						x.type === item.type
				);
				if (i <= -1) {
					resArr.push(item);
				}
				return null;
			});
			var obj = subjectData;
			obj.payloads.queue.lists = resArr;
			setNewSubjectData(obj);
			var arr = new Array(obj.payloads.queue.lists.length);
			for (let index = 0; index < obj.payloads.queue.lists.length; index++) {
				arr.push(
					obj.payloads.queue.lists[index].course.code +
						'-' +
						obj.payloads.queue.lists[index].course.name
				);
			}
			arr = arr.filter((a) => a);
			setHandleCourse(arr);
			console.log(arr);
		}
		console.log(subjectData);
		console.log(resArr);
	}, [subjectData]);

	function uniqueBy(a, cond) {
		return a.filter((e, i) => a.findIndex((e2) => cond(e, e2)) === i);
	}

	useEffect(() => {
		const requestOptions1 = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + sessionStorage.getItem('token'),
			},
		};
		fetch('http://localhost:4000/corrects/', requestOptions1)
			.then((response) => response.json())
			.then((data) => {
				console.log(data);

				data = uniqueBy(
					data,
					(o1, o2) =>
						o1.courseName === o2.courseName &&
						o1.class === o2.class &&
						o1.type === o2.type
				);
				console.log(data);
				setAllCorData(
					data.filter((d) => d.corrector === localStorage.getItem('username'))
				);

				console.log(allCorData);

				setSubmitedData(
					data.filter(
						(d) =>
							d.status === 'Submited' && handleCourse.indexOf(d.courseName) > -1
					)
				);
			});
	}, [handleCourse]);

	useEffect(() => {
		console.log(`url : ${url}`);
		console.log(`groupNumberGlobal : ${groupNumber}`);
		// if (url){
		http.post('/extract', { url, groupNumber }).then(() => {
			setIsExtracting(false);
		});
		// } else{
		// 	console.log('url is not avaiable');
		// }
	}, [url, groupNumber]);

	useEffect(() => {
		if (isExtracting === false)
			window.location.href = `/correction/${groupNumber}/${course}/${corrType}/${className}`;
	}, [isExtracting]);

	function checkTemplate(code, name, type) {
		if (type === 'Assignment 1') type = 'Assignment';
		var exist = false;
		templateData.forEach((element) => {
			if (element.courseName === code + '-' + name && element.type === type)
				exist = true;
		});

		return exist;
	}

	function showModalSubco(item) {
		console.log(item);
		localStorage.setItem('isEditable', false);
		const requestOptions = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + sessionStorage.getItem('token'),
			},
		};
		//TEMBAK
		// showModal(
		// 	item.courseName,
		// 	item.class,
		// 	'742d7db4-c910-ec11-90f0-d8d385fce79e',
		// 	1,
		// 	item.type
		// );
		fetch(
			'https://laboratory.binus.ac.id/lapi/api/Course/GetSubjectsBySubjectName/?name=' +
				item.courseName,
			requestOptions
		)
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				showModal(
					item.courseName,
					item.class,
					data[0].CourseOutlineId,
					1,
					item.type
				);
			});
	}

	function getCourseId(courseName) {}
	function downloadAnswer(source, groupNumber) {
		const requestOptions = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + localStorage.getItem('onedriveToken'),
			},
		};

		fetch(source, requestOptions)
			.then((response) => response.json())
			.then((data) => {
				// console.log(data);
				// console.log(localStorage.getItem('onedriveToken'));
				window.open(data['@microsoft.graph.downloadUrl']);
				// setUrl(data['@microsoft.graph.downloadUrl']);
				// console.log(url);
				// console.log(groupNumber);
			});
	}

	function getCorrectionUrl(source, groupNumber) {
		const requestOptions = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + localStorage.getItem('onedriveToken'),
			},
		};

		fetch(source, requestOptions)
			.then((response) => response.json())
			.then((data) => {
				// groupNumberGlobal = groupNumber;
				console.log(`groupNumberGlobal : ${groupNumber}`);

				setGroupNumber(groupNumber);
				setUrl(data['@microsoft.graph.downloadUrl']);
			});
	}

	function getSubcoSchedule() {
		console.log(subjectSelected);
		console.log(type);
		const requestOptions1 = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + sessionStorage.getItem('token'),
			},
		};
		fetch(
			'https://laboratory.binus.ac.id/lapi/api/Correction/GetCorrectionScheduleForCoordinator?courseOutlineId=' +
				subjectSelected +
				'&type=' +
				type,
			requestOptions1
		)
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
			});
	}

	function MyVerticallyCenteredModal(props) {
		return (
			<Modal
				{...props}
				size='lg'
				aria-labelledby='contained-modal-title-vcenter'
				centered
				className='bg-black bg-opacity-70'
			>
				<Modal.Header closeButton>
					<Modal.Title id='contained-modal-title-vcenter'>{course}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<h4>{className}</h4>
					{studentAnswers && studentAnswers.length !== 0 ? (
						<Table striped bordered hover size='sm' responsive>
							<thead className='thead-light text-center'>
								<tr>
									<th>#</th>
									{studentAnswers[0].StudentName ? (
										<>
											<th>Student Number</th>
											<th>Student Name</th>
										</>
									) : (
										<th>Group Number</th>
									)}
									{/* <th>Student Name</th> */}
									<th>Size</th>
									<th>Uploader</th>
									<th>Upload Date</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody>
								{studentAnswers.map((item, i) => {
									return (
										<tr key={i}>
											<td>{i + 1}</td>
											<td>{item.GroupNumber}</td>
											{item.StudentName ? <td>{item.StudentName}</td> : <></>}
											<td>
												{item.TotalSize !== null
													? Utility.formatBytes(
															item.TotalSize.replaceAll(',', ''),
															2
													  )
													: '-'}
											</td>
											<td>{item.Uploader}</td>
											<td>
												{item.uploadDate !== null
													? moment(item.UploadDate).format('LLL')
													: '-'}
											</td>
											<td>
												<div className='d-flex justify-content-evenly w-100 h-100 align-items-center gap-1'>
													<OverlayTrigger
														placement='top'
														overlay={<Tooltip>Download</Tooltip>}
													>
														<Button
															variant='secondary'
															onClick={() => {
																downloadAnswer(item.Source, item.GroupNumber);
															}}
															size='sm'
														>
															<BsDownload />
														</Button>
													</OverlayTrigger>
													<OverlayTrigger
														placement='top'
														overlay={<Tooltip>Open</Tooltip>}
													>
														<Button
															variant='secondary'
															onClick={() => {
																setModalShow(false);
																getCorrectionUrl(item.Source, item.GroupNumber);
																localStorage.setItem('current-file-index', i);
															}}
															size='sm'
														>
															<BsFillCaretRightFill />
														</Button>
													</OverlayTrigger>
												</div>
											</td>
										</tr>
									);
								})}
							</tbody>
						</Table>
					) : (
						<p>No data</p>
					)}
				</Modal.Body>
				{/* <Modal.Footer>
					<Button onClick={props.onHide}>Close</Button>
				</Modal.Footer> */}
			</Modal>
		);
	}

	function getCorrectionStatus(status) {
		if (status === 'Submited') {
			return 'text-black bg-warning bg-opacity-50';
		} else if (status === 'Approved') {
			return 'text-black bg-success bg-opacity-50';
		} else if (status === 'Revised') {
			return 'text-black bg-danger bg-opacity-50';
		}
	}

	const [modalShow, setModalShow] = React.useState(false);
	const [deleteModalShow, setDeleteModalShow] = React.useState(false);

	function showModal(course, className, courseOutlineId, number, type) {
		console.log(course, className, courseOutlineId, number, type);
		setCourse(course);
		setCorType(type);
		setClassName(className);
		setModalShow(true);
		const requestOptions3 = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + sessionStorage.getItem('token'),
				'Accept-Encoding': 'gzip, deflate, br',
			},
		};
		fetch(
			'https://laboratory.binus.ac.id/lapi/api/Correction/GetAllStudentAnswers?semesterId=' +
				currentSemester +
				'&courseOutlineId=' +
				courseOutlineId +
				'&className=' +
				className +
				'&number=' +
				number +
				'&type=' +
				type,
			requestOptions3
		)
			.then((response) => response.json())
			.then((d) => {
				console.log(d);
				let temp_data = d.map((obj) => {
					return {
						GroupNumber: obj.GroupNumber,
						Source: obj.Source,
						CorType: type,
					};
				});
				localStorage.setItem(
					'correction-files-data',
					JSON.stringify(temp_data)
				);
				console.log(temp_data);
				setStudentAnswers(d);
			});
	}

	return (
		<div
			style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
		>
			{isExtracting ? (
				<div
					className='modal-loading w-100 h-100 position-absolute'
					style={{ 'z-index': 1000 }}
				>
					<Spinner animation='border' role='status' variant='primary'>
						<span className='visually-hidden'>Loading...</span>
					</Spinner>
				</div>
			) : (
				<div></div>
			)}

			<Header setRole={setRole} role={role} />

			{role === 'Software Teaching Assistant' ? (
				<div style={{ width: '90vw', marginTop: '80px' }} centered>
					{allCorData.length > 0 ? (
						<div>
							<h2>My Correction</h2>
							<Table striped bordered hover size='sm'>
								<thead className='text-center'>
									<tr>
										<th>Course</th>
										<th>Corrector</th>
										<th>Class</th>
										<th>Status</th>
										<th>Type</th>
										<th>Action</th>
									</tr>
								</thead>
								<tbody>
									{allCorData ? (
										allCorData.map((item, i) => {
											return (
												<tr
													key={i}
													className={getCorrectionStatus(item.status)}
												>
													<td>{item.courseName}</td>
													<td>{item.corrector}</td>
													<td>{item.class}</td>
													<td>{item.status}</td>
													<td>{item.type}</td>
													<td className='d-flex align-items-center justify-content-center'>
														<Button
															variant='secondary'
															className='d-flex align-items-center justify-content-center'
															onClick={() => {
																window.open(
																	'http://academic-slc.apps.binus.ac.id/',
																	'_blank'
																);
															}}
														>
															<FiGlobe />
														</Button>
													</td>
													{/* <td>
												<Button
													variant='primary'
													onClick={() =>
														{
															showModalSubco(item)
														}
													}
												>
													View Answer
												</Button>

												<MyVerticallyCenteredModal
													show={modalShow}
													onHide={() => setModalShow(false)}
												/>
											</td> */}
												</tr>
											);
										})
									) : (
										<tr></tr>
									)}
								</tbody>
							</Table>
						</div>
					) : (
						<></>
					)}

					<h2>All Correction</h2>
					<Table striped bordered hover size='sm'>
						<thead className='text-center align-middle'>
							<tr>
								<th>Course</th>
								<th>Class</th>
								<th>Start Date</th>
								<th>End Date</th>
								<th>Type</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{correctionData ? (
								correctionData.map((item, i) => {
									return (
										<tr key={i}>
											<td>{item.CourseName}</td>
											<td>{item.ClassName}</td>
											<td>{moment(item.StartDate).format('LLL')}</td>
											<td>{moment(item.EndDate).format('LLL')}</td>
											<td>{item.Type}</td>
											<td>
												<OverlayTrigger
													placement='top'
													overlay={<Tooltip>View Answers</Tooltip>}
												>
													<Button
														variant='secondary'
														onClick={() => {
															localStorage.setItem('isEditable', true);
															showModal(
																item.CourseName,
																item.ClassName,
																item.CourseOutlineId,
																item.Number,
																item.Type
															);
														}}
														size='sm'
													>
														<IoIosInformationCircle />
													</Button>
												</OverlayTrigger>

												<MyVerticallyCenteredModal
													show={modalShow}
													onHide={() => setModalShow(false)}
												/>
											</td>
										</tr>
									);
								})
							) : (
								<tr></tr>
							)}
						</tbody>
					</Table>
				</div>
			) : (
				<></>
			)}

			{role !== 'Software Subject Coordinator' ? (
				<div style={{ width: '90vw', marginTop: '10px' }}>
					{/* <Form.Group className="mb-10" controlId='formBasicSelect'>
						<Form.Label>Select Subject</Form.Label>

							<Form.Select onChange={(e)=>setSubjectSelected(e.target.value)}>
							{subjectData.map((d, i)=>{
									 return <option value={d.CourseOutlineId}>{d.Name}</option>
							})}
							</Form.Select>
						

						<Form.Label>Select Course</Form.Label>
						<Form.Select onChange={(e)=>setType(e.target.value)}>
							<option value="Assignment">Assignment</option>
							<option value="Project">Project</option>
							<option value="Mid Term">Mid Term</option>
							<option value="Final Term">Final Term</option>
						</Form.Select>

						
					</Form.Group> */}

					{/* <Button onClick={getSubcoSchedule}>Search</Button> */}
					{/* <h2>Correction Template</h2> */}
					<h2>All Correction</h2>
					<Table striped bordered hover size='sm'>
						<thead className='text-center align-middle'>
							<tr>
								<th>Course</th>
								<th>Type</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{newSubjectData && newSubjectData.payloads ? (
								newSubjectData.payloads.queue.lists.map((item, i) => {
									return (
										<tr key={i}>
											<td>{item.course.code + ' ' + item.course.name}</td>
											<td>{item.type}</td>
											<td>
												{!checkTemplate(
													item.course.code,
													item.course.name,
													item.type
												) ? (
													// <Link
													// 	to={`/create/${item.course.id}/${item.course.code}/${item.course.name}/${item.type}`}
													// >
													// 	Insert
													// </Link>

													<OverlayTrigger
														placement='top'
														overlay={<Tooltip>Add Template</Tooltip>}
													>
														<Button
															variant='primary'
															onClick={() => {
																window.location.href = `/create/${item.course.id}/${item.course.code}/${item.course.name}/${item.type}`;
															}}
															size='sm'
														>
															<BsPlus />
														</Button>
													</OverlayTrigger>
												) : (
													<></>
												)}
												{checkTemplate(
													item.course.code,
													item.course.name,
													item.type
												) ? (
													<div className='d-flex justify-content-center align-items-center gap-2'>
														<OverlayTrigger
															placement='top'
															overlay={<Tooltip>Update Template</Tooltip>}
														>
															<Button
																type='Submit'
																variant='warning'
																onClick={() => {
																	window.location.href =
																		'/update/' +
																		item.course.id +
																		'/' +
																		item.course.code +
																		'/' +
																		item.course.name +
																		'/' +
																		item.type;
																}}
																size='sm'
															>
																<BsPencilFill color='white' />
															</Button>
														</OverlayTrigger>

														<OverlayTrigger
															placement='top'
															overlay={<Tooltip>Delete Template</Tooltip>}
														>
															<Button
																type='Submit'
																variant='danger'
																onClick={() => {
																	axios
																		.delete(
																			'http://localhost:4000/details/delete/' +
																				item.course.id +
																				'/' +
																				item.type
																		)
																		.then((res) => {
																			console.log(
																				'Details successfully deleted!'
																			);
																			window.location.reload();
																		})
																		.catch((error) => {
																			console.log(error);
																		});
																}}
																size='sm'
															>
																<BsX />
															</Button>
														</OverlayTrigger>
													</div>
												) : (
													<></>
												)}

												<MyVerticallyCenteredModal
													show={modalShow}
													onHide={() => setModalShow(false)}
												/>
											</td>
										</tr>
									);
								})
							) : (
								<tr></tr>
							)}
						</tbody>
					</Table>

					{submitedData.length > 0 ? (
						<>
							<h2>Submitted Correction</h2>
							<Table striped bordered hover size='sm'>
								<thead className='text-center'>
									<tr>
										<th>Course</th>
										<th>Corrector</th>
										<th>Class</th>
										<th>Status</th>
										<th>Type</th>
										<th>Action</th>
									</tr>
								</thead>
								<tbody>
									{submitedData ? (
										submitedData.map((item, i) => {
											return (
												<tr key={i}>
													<td>{item.courseName}</td>
													<td>{item.corrector}</td>
													<td>{item.class}</td>
													<td>{item.status}</td>
													<td>{item.type}</td>
													<td>
														<OverlayTrigger
															placement='top'
															overlay={<Tooltip>View Answers</Tooltip>}
														>
															<Button
																variant='secondary'
																onClick={() => {
																	showModalSubco(item);
																}}
																size='sm'
															>
																<IoIosInformationCircle />
															</Button>
														</OverlayTrigger>

														<MyVerticallyCenteredModal
															show={modalShow}
															onHide={() => setModalShow(false)}
														/>
													</td>
												</tr>
											);
										})
									) : (
										<tr></tr>
									)}
								</tbody>
							</Table>
						</>
					) : (
						<></>
					)}
				</div>
			) : (
				<></>
			)}
		</div>
	);
}

export default Home;
