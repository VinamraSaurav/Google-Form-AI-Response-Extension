const form = document.querySelector('form'); 
const formElements = form.querySelectorAll('*');

formElements.forEach(element => {
  if (element.tagName === 'IMG') {
    console.log(`Image URL: ${element.src}`);
  } else if (element.innerText.trim()) {
    console.log(`Text: ${element.innerText.trim()}`);
  }
});
