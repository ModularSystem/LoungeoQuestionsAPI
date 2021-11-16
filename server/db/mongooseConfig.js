const mongoose = require('mongoose');

const URI = process.env.MONGODB_URI || 'mongodb://localhost/qanda';
mongoose.connect(URI);

const productSchema = mongoose.Schema({
  productId: Number,
  questions: Array,
});

const Product = mongoose.model('Product', productSchema);

const questionSchema = mongoose.Schema({
  questionId: Number,
  body: String,
  date: Date,
  asker_name: String,
  question_helpfulness: Boolean,
  reported: Boolean,
  product_id: Number,
  answers: [
    {
      answer_id: Number,
      body: String,
      date: Date,
      answerer_name: String,
      helpfulness: Boolean,
      photos: [
        {
          photo_id: Number,
          url: String,
        },
      ],
    },
  ],
});

const Question = mongoose.model('Question', questionSchema);

module.exports = { Product, Question };
