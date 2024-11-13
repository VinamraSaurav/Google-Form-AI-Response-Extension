const form = document.querySelector('form'); 
const formElements = form.querySelectorAll('*');

// formElements.forEach(element => {
//   if (element.tagName === 'IMG') {
//     console.log(`Image URL: ${element.src}`);
//   } else if (element.innerText.trim()) {
//     console.log(`Text: ${element.innerText.trim()}`);
//   }
// });


const questions = [];
const listItems = form.querySelectorAll('div[role="listitem"]');

listItems.forEach(item => {
  const questionDiv = item.querySelector('div[data-params]');
  if (questionDiv) {
    questions.push(questionDiv.getAttribute('data-params'));
  }
});

console.log(questions);