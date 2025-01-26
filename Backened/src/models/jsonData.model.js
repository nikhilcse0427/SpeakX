import mongoose from 'mongoose'
const {Schema} = mongoose


const optionSchema = new Schema({
  text: { 
    type: String, 
    required: true
  },
  isCorrectAnswer: { 
    type: Boolean,
    required: true 
  }
});

const Option = mongoose.model('Option', optionSchema);



const blocksSchema = new mongoose.Schema({
  text:{
    type:String,
    required:true
  },
  showInOption:{
    type:Boolean,
    required:true
  },
  isAnswer:{
    type:Boolean,
    required:true
  }
})
const Block = mongoose.model('Block', blocksSchema);


const JsonDataSchema = new mongoose.Schema({
  type:{
    type:"String",
    required:true
  },

  anagramType:{
    type:String,
    required:true,
  },

  blocks:[blocksSchema],

  options: [optionSchema],

  siblingId: {
     type: mongoose.Schema.Types.ObjectId, 
     ref: 'Json' 
  },

  solution:{
    type:String,
    required:true
  },

  title:{
    type:String,
    required:true
  }

})
export const jsonData = mongoose.model('JsonData', JsonDataSchema);



// import mongoose from 'mongoose';

// const jsonDataSchema = new mongoose.Schema({
//   // Define your schema here
//   type: String,
//   anagramType: String,
//   blocks: Array,
//   siblingId: String,
//   solution: String,
//   title: String,
// });

// const jsonData = mongoose.model('jsonData', jsonDataSchema);

// export { jsonData };
