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
  if(imgDiv) data['img-url'] = imgDiv.getAttribute('src');
  if (questionDiv) {
    data['data-params'] = questionDiv.getAttribute('data-params');
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
        description: '',  // Added description field
        options: [],
        imgUrl: question['img-url'],
        imgText: null
      };

      // First decode HTML entities in the question string
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

      // Extract options - looking for the validation array pattern
      const optionsSection = question.match(/\[\[\d+,\[(.*?)\],false/);
      if (optionsSection) {
        // Extract all quoted strings from the options section
        const optionsMatches = optionsSection[1].match(/\["([^"]+)"/g);
        if (optionsMatches) {
          formData.options = optionsMatches.map(opt => 
            opt.match(/\["([^"]+)"/)[1]
          );
        }
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