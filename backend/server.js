import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import Details from './details.model.js';
import Corrections from './corrections.model.js';
import CorrectionController from './api/correction.controller.js';

const app = express();
const PORT = 4000;
const detailsRoutes = express.Router();
const correctionRoutes = express.Router();

app.use(cors());
app.use(bodyParser.json());

app.use('/corrects', correctionRoutes);

mongoose.connect('mongodb://127.0.0.1:27017/details', {
	useNewUrlParser: true,
});
const connection = mongoose.connection;

connection.once('open', function () {
	console.log('MongoDB database connection established successfully');
});

detailsRoutes.route('/').get(function (req, res) {
	Details.find(function (err, details) {
		if (err) {
			console.log(err);
		} else {
			res.json(details);
		}
	});
});

detailsRoutes.route('/:id').get(function (req, res) {
	let id = req.params.id;
	Details.findOne({ courseId: id }, function (err, details) {
		res.json(details);
	});
});

detailsRoutes.route('/delete/:id/:type').delete((req, res, next) => {
	console.log(req.params.id, req.params.type);
	var typeParam = req.params.type;
	if (typeParam == 'Assignment 1') {
		typeParam = 'Assignment';
	}
	Details.findOne({ courseId: req.params.id, type: typeParam }).remove(
		(error, data) => {
			if (error) {
				return next(error);
			} else {
				res.status(200).json({
					msg: data,
				});
			}
		}
	);
});

detailsRoutes.route('/update/:id').post(function (req, res) {
	Details.findOne({ courseId: req.params.id }, function (err, details) {
		console.log(req.params.id);
		if (!details) res.status(404).send('data is not found');
		else {
			details.courseName = req.body.courseName;
			details.details = req.body.details;
			// details.details_columnName = req.body.details.details_columnName;
			// details.details_maxScore = req.body.details_maxScore;
			// details.details_notes = req.body.details_notes;
		}
		console.log(req.body);

		details
			.save()
			.then((details) => {
				res.json('Detail updated!');
			})
			.catch((err) => {
				res.status(400).send('Update not possible');
			});
	});
});

detailsRoutes.route('/add').post(function (req, res) {
	console.log(req.body);
	let details = new Details(req.body);
	details
		.save()
		.then((details) => {
			res.status(200).json({ details: 'detail added successfully' });
		})
		.catch((err) => {
			res.status(400).send('adding new detail failed');
		});
});

correctionRoutes.route('/').get(function (req, res) {
	Corrections.find(function (err, details) {
		if (err) {
			console.log(err);
		} else {
			res.json(details);
		}
	});
});

correctionRoutes
	.route('/delete/:id/:class/:corrector/:type')
	.delete((req, res, next) => {
		Corrections.findOne({
			class: req.params.class,
			courseId: req.params.id,
			corrector: req.params.corrector,
			type: req.params.type,
		}).remove((error, data) => {
			if (error) {
				return next(error);
			} else {
				res.status(200).json({
					msg: data,
				});
			}
		});
	});

correctionRoutes.route('/delete').delete((req, res, next) => {
	Corrections.remove((error, data) => {
		if (error) {
			return next(error);
		} else {
			res.status(200).json({
				msg: data,
			});
		}
	});
});

detailsRoutes.route('/delete').delete((req, res, next) => {
	Details.remove((error, data) => {
		if (error) {
			return next(error);
		} else {
			res.status(200).json({
				msg: data,
			});
		}
	});
});

correctionRoutes.route('/create').post(function (req, res) {
	console.log(req.body);
	let cor = new Corrections(req.body);
	cor
		.save()
		.then((cor) => {
			res.status(200).json({ cor: 'corrections added successfully' });
		})
		.catch((err) => {
			res.status(400).send('adding new cor failed');
		});
});

correctionRoutes.route('/:id').get(function (req, res) {
	Corrections.find({ corrector: req.params.id }, function (err, cor) {
		if (err) {
			return next(err);
		} else {
			res.status(200).json(cor);
		}
	});
});

detailsRoutes.route('/:course/:type').get(function (req, res) {
	Details.findOne(
		{ courseName: req.params.course, type: req.params.type },
		function (err, det) {
			if (err) {
				return next(err);
			} else {
				res.status(200).json(det);
			}
		}
	);
});

correctionRoutes.route('/:name/:type/:ini/:class').get(function (req, res) {
	Corrections.findOne(
		{
			courseName: req.params.name,
			type: req.params.type,
			corrector: req.params.ini,
			class: req.params.class,
		},
		function (err, cor) {
			if (err) {
				return next(err);
			} else {
				res.status(200).json(cor);
			}
		}
	);
});

correctionRoutes
	.route('/change-status/:id/:class/:corrector/:type')
	.post(function (req, res) {
		Corrections.findOne(
			{
				class: req.params.class,
				courseId: req.params.id,
				corrector: req.params.corrector,
				type: req.params.type,
			},
			function (err, cor) {
				if (!cor) res.status(404).send('data is not found');
				else {
					cor.status = req.body.status;
					console.log(req.body);
					cor
						.save()
						.then((cor) => {
							res.json('Correction updated!');
						})
						.catch((err) => {
							res.status(400).send('Update not possible');
						});
				}
			}
		);
	});

correctionRoutes
	.route('/update-correction/:id/:class/:corrector/:type')
	.post(function (req, res) {
		Corrections.findOne(
			{
				class: req.params.class,
				courseId: req.params.id,
				corrector: req.params.corrector,
				type: req.params.type,
			},
			function (err, cor) {
				if (!cor || err) res.status(404).send('data is not found');
				else {
					cor.correction = req.body;
					console.log(req.body);
					cor
						.save()
						.then((corr) => {
							res.json('cor updated!');
						})
						.catch((err) => {
							res.status(400).send('Update not possible');
						});
				}
			}
		);
	});

app.get('/testing', CorrectionController.apiTesting);
app.post('/extract', CorrectionController.extract);
app.post('/delete-directory', CorrectionController.apiDeleteDirectory);
app.get('/directory-list/:path', CorrectionController.getDirectoryList);
app.post('/read-file', CorrectionController.getTextBasedData);

app.use('/details', detailsRoutes);

app.use('*', (req, res) => res.status(404).json({ error: 'not found' }));

app.listen(PORT, function () {
	console.log('Server is running on Port: ' + PORT);
});

// id_template;
// courseName;
// corrector;
// correction : [
// 	{
// 		studentid;
// 		scores : [1,2,3,4,4];
// 	}
// ]
