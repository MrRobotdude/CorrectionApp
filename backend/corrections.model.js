import mongoose from 'mongoose';
const Schema = mongoose.Schema;
// id_template;
// courseName;
// corrector;
// correction : [
// 	{
// 		studentid;
// 		scores : [1,2,3,4,4];
// 	}
// ]

let Corrections = new Schema({
    templateId: {
        type: String,
    },
    class:{
        type: String,
    },
    courseId: {
        type: String,
    },
	courseName: {
		type: String,
	},
    corrector:{
        type: String,
    },
    status:{
        type: String,
    },
    type:{
        type: String,
    },
    correction:[
        {
            studentId:String,
            scores:[Number],
            revised: String,
            notes:String
        }
    ]
});

export default mongoose.model('Corrections', Corrections);
