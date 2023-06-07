import React, { useEffect, useState, useContext } from 'react';
import './Correction.scss';
import { useParams } from 'react-router-dom';
import Tree from '../Tree';
import http from '../http-common';
import TextEditor from '../TextEditor/TextEditor';
import { CurrentFileProvider } from './CurrentFileContext';
import CorrectionScore from './components/CorrectionScore/CorrectionScore';
import {
	Button,
	Container,
	Row,
	Col,
	Nav,
	ButtonGroup,
	OverlayTrigger,
	Tooltip,
	Stack,
	Navbar,
	NavDropdown,
} from 'react-bootstrap';
import {
	BsCaretRightFill,
	BsCaretLeftFill,
	BsCaretLeft,
	BsCaretDown,
	BsCaretDownFill,
} from 'react-icons/bs';
import MyVerticallyCenteredModal from './components/Modal/Modal';

const Correction = () => {
	let { id, course, type, className } = useParams();
	const [treeData, setTreeData] = useState([]);
	const [activeFile, setActiveFile] = useState('');
	const [templateData, setTemplateData] = useState([{}]);
	const [correctionData, setCorrectionData] = useState({});
	const [exists, setExists] = useState(false);
	const [index, setIndex] = useState(-1);

	const [isExtracting, setIsExtracting] = useState(true);
	const [url, setUrl] = useState({});
	const [corrType, setCorType] = useState();
	const [groupNumber, setGroupNumber] = useState(0);
	const [correctionFileData, setCorrectionFileData] = useState(
		JSON.parse(localStorage.getItem('correction-files-data'))
	);
	const [correctionFileIndex, setCorrectionFileIndex] = useState(
		JSON.parse(localStorage.getItem('current-file-index'))
	);

	const [modalShow, setModalShow] = useState(false);

	// const [correctionFileUrls, setCorrectionFileUrls] = useState(
	// 	JSON.parse(localStorage.getItem('correction-file-urls'))
	// );
	// const [correctionFileNames, setCorrectionFileNames] = useState(
	// 	JSON.parse(localStorage.getItem('correction-file-names'))
	// );

	// let correctionFileUrls = localStorage.getItem('correction-file-urls');
	// let correctionFileIndex = localStorage.getItem('current-file-index');

	// let temp_data = JSON.parse(
	// 	localStorage.getItem('correction-file-urls')
	// );
	// let current_file_index = JSON.parse(
	// 	localStorage.getItem('current-file-index')
	// );

	// useEffect(() => {
	// 	setCorrectionFileUrls(localStorage.getItem('correction-file-urls'));
	// 	setCorrectionFileIndex(localStorage.getItem('current-file-index'));
	// });

	useEffect(() => {
		console.log(`url : ${url}`);
		http.post('/extract', { url, groupNumber }).then(() => {
			setIsExtracting(false);
			setCorType(correctionFileData[correctionFileIndex + 1].CorType);
		});
	}, [url, groupNumber]);

	useEffect(() => {
		if (isExtracting === false)
			window.location.href = `/correction/${groupNumber}/${course}/${corrType}/${className}`;
	}, [isExtracting, corrType]);

	function getCorrectionUrl(source, groupNumber) {
		console.log(groupNumber);
		console.log(correctionFileData);
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
				http.post(`/delete-directory`, { path: './files' });
				http.post(`/delete-directory`, { path: './temp_files' });
				setGroupNumber(groupNumber);
				setUrl(data['@microsoft.graph.downloadUrl']);
			});
	}

	useEffect(() => {
		let path = './files';

		console.log(path);
		http.get(`/directory-list/${path}`).then((data) => {
			let tempData = data.data.directoryList.children;

			tempData.forEach((element) => {
				setTreeData((treeData) => [...treeData, element]);
			});
		});
		const requestOptions = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		};
		fetch(
			'http://localhost:4000/details/' + course + '/' + type,
			requestOptions
		)
			.then((response) => response.json())
			.then((d) => {
				console.log(d);
				setTemplateData(d);
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
							setExists(true);
							console.log('masuk sini' + exists);
							var idx = -1;
							var testIdx = -1;
							for (idx = 0; idx < data.correction.length; idx++) {
								if (data.correction[idx].studentId === id) {
									setIndex(idx);
									testIdx = idx;
									console.log('ada ini anak' + idx);
									break;
								} else {
									console.log('bukan ', id);
								}
							}
							console.log(testIdx);
							if (testIdx === -1) {
								console.log('tambah array baru krn ga ada sblmny nim ini');
								console.log(data.correction);
								data.correction.push({
									studentId: id,
									scores: [],
									revised: '',
									notes: '',
								});
								console.log(data.correction);
							}
							setCorrectionData(data);
						} else {
							setExists(false);
							var obj = {
								template_id: d._id,
								class: className,
								courseId: d.courseId,
								courseName: d.courseName,
								corrector: localStorage.getItem('username'),
								status: 'None',
								type: d.type,
								correction: [
									{
										studentId: id,
										scores: [],
										revised: '',
										notes: '',
									},
								],
							};
							setCorrectionData(obj);
						}
						console.log(correctionData);
					});
			});
	}, []);

	useEffect(() => {
		console.log(correctionData);
	}, [correctionData]);

	useEffect(() => {
		console.log(exists);
	}, [exists]);

	return (
		<Container fluid>
			{/* <header className='navbar d-flex-nowrap sticky-top p-0 bg-light w-100'> */}

			<Row className='sticky-top responsive' fluid>
				<Container className='bg-light sticky-top responsive' fluid>
					<Row className='h-100'>
						<Col
							className='border-1 bg-light p-1 justify-content-center align-item-center'
							sm={2}
						>
							<Button
								variant='link'
								style={{ 'text-decoration': 'none' }}
								className='text-black bold'
								onClick={() => (window.location.href = '/')}
							>
								<b>Correction App</b>
							</Button>
						</Col>
						<Col className='border-1 bg-light p-1'>
							<Container sm={1}>
								<Row className='justify-content-between align-item-center'>
									<Col sm='auto'>
										<Button
											variant='outline-secondary'
											style={{ border: 'none' }}
										>
											{id}
										</Button>
									</Col>
									<Col
										sm='auto'
										className='justify-content-center align-item-center'
									>
										<ButtonGroup aria-label='Basic example' size='sm'>
											<OverlayTrigger
												placement='bottom'
												overlay={<Tooltip>Previous Student</Tooltip>}
											>
												<Button
													variant='outline-secondary'
													onClick={() => {
														if (!(correctionFileIndex - 1 < 0)) {
															getCorrectionUrl(
																correctionFileData[correctionFileIndex - 1]
																	.Source,
																correctionFileData[correctionFileIndex - 1]
																	.GroupNumber
															);
															let idx =
																JSON.parse(
																	localStorage.getItem('current-file-index')
																) -
																'0' -
																1;
															localStorage.setItem('current-file-index', idx);
														}
													}}
												>
													<BsCaretLeftFill />
												</Button>
											</OverlayTrigger>

											<OverlayTrigger
												placement='bottom'
												overlay={<Tooltip>Next Student</Tooltip>}
											>
												<Button
													variant='outline-secondary'
													onClick={() => {
														if (
															!(
																correctionFileIndex + 1 >
																correctionFileData.length
															)
														) {
															getCorrectionUrl(
																correctionFileData[correctionFileIndex + 1]
																	.Source,
																correctionFileData[correctionFileIndex + 1]
																	.GroupNumber
															);

															let idx =
																JSON.parse(
																	localStorage.getItem('current-file-index')
																) -
																'0' +
																1;
															localStorage.setItem('current-file-index', idx);
														}
													}}
												>
													<BsCaretRightFill />
												</Button>
											</OverlayTrigger>
										</ButtonGroup>
									</Col>
								</Row>
							</Container>
						</Col>
					</Row>
				</Container>
			</Row>

			<Row className='my-1 responsive w-100' fluid>
				<Container fluid>
					<Row className='h-100 w-100' sm={2} fluid>
						<Col
							className='col-md-3 col-lg-2 d-md-block bg-light sidebar collapse sidebar'
							sm={2}
						>
							<Tree
								activeFile={activeFile}
								setActiveFile={setActiveFile}
								data={treeData}
							/>
						</Col>

						<Col className='content bg-light p-0' style={{ width: '81vw' }}>
							<Stack>
								<Row className='text-editor'>
									<TextEditor activeFile={activeFile} />
								</Row>
								<Row className='score-container sticky-bottom bottom-0 bg-light d-flex align-items-center justify-content-center'>
									<CorrectionScore
										existss={exists}
										index={index}
										template={templateData}
										correctionData={correctionData}
										setCorrectionData={setCorrectionData}
									/>
								</Row>
							</Stack>
						</Col>
					</Row>
				</Container>
			</Row>

			<MyVerticallyCenteredModal
				show={modalShow}
				onHide={() => {
					setModalShow(false);
					window.location.href = '/';
				}}
				title={'Template has been created'}
				description={"Let's go on to the next correction !"}
			/>
		</Container>
	);
};

export default Correction;
