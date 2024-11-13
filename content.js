const form = document.querySelector('form'); 
const formElements = form.querySelectorAll('*');

const questions = [];
const listItems = form.querySelectorAll('div[role="listitem"]');

listItems.forEach(item => {
  const data = {
    'data-params': '',
    'img-url': null,
  }
  const questionDiv = item.querySelector('div[data-params]');
  const imgDiv = item.querySelector('img');
  if(questionDiv) data['data-params'] = questionDiv.getAttribute('data-params');
  if(imgDiv) data['img-url'] = imgDiv.getAttribute('src');
  if (questionDiv||imgDiv) {
    questions.push(data);
  }
});

function decodeHtmlEntities(str) {
  const element = document.createElement('div');
  element.innerHTML = str;
  return element.textContent;
}

function parseFormData(questions) {
  return questions.map(question => {
    try {
      const formData = {
        text: '',
        description: '',
        options: [],
        imgUrl: question['img-url'],
        imgText: null
      };

      // Decode HTML entities in the question string
      question = decodeHtmlEntities(question['data-params']);

      // Extract question text - second item in the array
      const textMatch = question.match(/^\%\.\@\.\[\d+,"([^"]+)"/);
      if (textMatch) {
        formData.text = textMatch[1];
      }

      // Extract description - third item in the array
      const descriptionMatch = question.match(/^\%\.\@\.\[\d+,"[^"]+","([^"]+)"/);
      if (descriptionMatch) {
        formData.description = descriptionMatch[1];
      }

      // Extract options - more flexible extraction logic
      const optionsSection = question.match(/\[\[\d+,\[(.*?)\]\]\]/);
      if (optionsSection) {
        // Extracting each option within the nested array pattern
        const optionsMatches = optionsSection[1].split(/],\[/);

        formData.options = optionsMatches.map(option => {
          const match = option.match(/"([^"]+)"/);
          return match ? match[1] : null;
        }).filter(opt => opt !== null);  // Remove any null values
      }

      return formData;
    } catch (error) {
      console.error("Error parsing question:", error);
      return {
        text: '',
        description: '',
        options: [],
        imgUrl: null,
        imgText: null
      };
    }
  });
}

const parsedData = parseFormData(questions);
console.log(JSON.stringify(parsedData, null, 2));
