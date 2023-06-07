import mongoose from 'mongoose';
const Schema = mongoose.Schema;

let Details = new Schema({
	courseId:{
		type:String,
	},
	courseName: {
		type: String,
	},
	type:{
		type: String,
	},
	details: [
		{
			details_columnName: String,
			details_maxScore: String,
			details_notes: String,
		},
	],
});

export default mongoose.model('Details', Details);
