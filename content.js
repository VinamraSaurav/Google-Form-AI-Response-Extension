const form = document.querySelector('form'); 
const formElements = form.querySelectorAll('*');




const questions = [];
const listItems = form.querySelectorAll('div[role="listitem"]');

listItems.forEach(item => {
  const questionDiv = item.querySelector('div[data-params]');
  if (questionDiv) {
    questions.push(questionDiv.getAttribute('data-params'));
  }
});

// console.log(questions);






const parsedQuestions = questions.map(question => {
  try {
    // Step 1: Remove the prefix (%.@.)
    let cleanedQuestion = question.substring(4);

    // Step 2: Basic Cleanup of non-JSON characters
    // Remove any non-JSON characters (this can be adjusted based on your data)
    cleanedQuestion = cleanedQuestion.replace(/[^a-zA-Z0-9,\[\]\{\}\:\"\'\-\.\_\s]/g, '');

    // Step 3: Fix common mistakes like missing commas or misplaced characters
    cleanedQuestion = cleanedQuestion.replace(/(\d)([a-zA-Z])/g, '$1,$2');  // Ensure numbers and words are separated by commas

    // Step 4: Ensure proper formatting (e.g., closing square/curly brackets, removing extra commas)
    cleanedQuestion = cleanedQuestion.replace(/,(\s*[\}\]])/g, '$1');  // Remove trailing commas before closing brackets/curly braces

    // Debugging: Log the cleaned-up string to check if it's valid JSON now
    console.log("Cleaned Question:", cleanedQuestion);

    // Step 5: Try to parse the cleaned-up string
    const parsed = JSON.parse(cleanedQuestion);

    // Step 6: Extract question and options
    const text = parsed[1];  // Question text
    const options = parsed[4][0][1].map(option => option[0]);  // Options

    // Optional image data (if exists)
    const image = parsed[6] ? parsed[6][0][0] : null;
    const imageText = parsed[6] ? parsed[6][0][2] : null;

    return { text, options, image, imageText };

  } catch (error) {
    console.error("Error parsing question:", question, error);
    return null;  // If there's an error, return null for this question
  }
});

console.log(parsedQuestions);
