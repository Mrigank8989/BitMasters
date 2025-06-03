const { insertQuestion } = require('../module/questionModel');

const addQuestion = async (req, res) => {
  try {
    const {
      quiz_id,
      question_text,
      option_1,
      option_2,
      option_3,
      option_4,
      correct_option
    } = req.body;


    await insertQuestion({
      quiz_id,
      question_text,
      option_1,
      option_2,
      option_3,
      option_4,
      correct_option
    });

    res.status(201).json({ message: 'Question added successfully.' });
  } catch (error) {
    console.error('Error inserting question:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

module.exports = {
  addQuestion
};
