// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import './index.scss';
import {
	BsCaretRightFill,
	BsCaretLeftFill,
	BsCaretLeft,
	BsCaretDown,
	BsCaretDownFill,
	BsChevronDown,
	BsChevronRight,
	BsChevronUp,
} from 'react-icons/bs';
import {
	Button,
	Container,
	Row,
	Col,
	Nav,
	ButtonGroup,
	OverlayTrigger,
	Tooltip,
} from 'react-bootstrap';

const Tree = ({ data = [], setActiveFile, activeFile }) => {
	return (
		<div className='d-tree'>
			<ul className='d-flex d-tree-container flex-column'>
				{data.map((tree, i) => (
					<TreeNode
						key={i}
						activeFile={activeFile}
						setActiveFile={setActiveFile}
						node={tree}
					/>
				))}
			</ul>
		</div>
	);
};

const TreeNode = ({ node, setActiveFile, activeFile }) => {
	const [childVisible, setChildVisiblity] = useState(false);

	const hasChild = node.children ? true : false;

	function setCurrentFile() {
		if (!hasChild) {
			console.log('saya sebuah file');
			console.log(activeFile);
			setActiveFile(node.path);
		} else {
			console.log('saya sebuah directory');
		}
		// localStorage.setItem('current-file-path', node.path);
	}

	return (
		<li className='d-tree-node border-0'>
			<div
				className='d-flex justify-content-center align-items-center'
				onClick={(e) => setChildVisiblity((v) => !v)}
			>
				{hasChild && (
					<div className='d-flex w-100 justify-content-center align-items-center d-tree-head p-0 px-2'>
						<div
							className={`d-inline d-tree-toggler ${
								childVisible ? 'active' : ''
							}`}
						>
							<BsChevronRight />
						</div>
						<div
							className='col d-tree-head m-1 fw-bold'
							onClick={setCurrentFile}
							style={{ cursor: 'pointer' }}
						>
							{/* <i className={`mr-1 ${node.icon}`}> </i> */}
							{node.name}
						</div>
					</div>
				)}

				{hasChild ? (
					<></>
				) : (
					<div
						className='col d-tree-head px-5'
						onClick={setCurrentFile}
						style={{ cursor: 'pointer' }}
					>
						{/* <i className={`mr-1 ${node.icon}`}> </i> */}
						{node.name}
					</div>
				)}
			</div>

			{hasChild && childVisible && (
				<div className='d-tree-content'>
					<ul className='d-flex d-tree-container flex-column'>
						<Tree
							data={node.children}
							setActiveFile={setActiveFile}
							activeFile={activeFile}
						/>
					</ul>
				</div>
			)}
		</li>
	);
};

export default Tree;
