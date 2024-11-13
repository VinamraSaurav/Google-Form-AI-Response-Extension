document.addEventListener('DOMContentLoaded', () => {
    // Select the form element
    // const form = document.querySelector('form');
    
    // if (form) {
    //     console.log('Form:', form);
        
    //     // Select all question containers within the form
    //     const questions = form.querySelectorAll('[role="listitem"]'); // Modify if necessary

    //     questions.forEach((question, index) => {
    //         // Extract the question text
    //         const questionHeading = question.querySelector('[role="heading"]');
    //         if (questionHeading) {
    //             console.log(`Question ${index + 1}:`, questionHeading.textContent.trim());
    //         }

    //         // Extract choices if available
    //         const responses = question.querySelectorAll('input[type="radio"], input[type="checkbox"]');
    //         if (responses.length > 0) {
    //             responses.forEach((response, choiceIndex) => {
    //                 const label = response.closest('label');
    //                 if (label) {
    //                     console.log(`Choice ${choiceIndex + 1}:`, label.textContent.trim());
    //                 }
    //             });
    //         }
    //     });
    // } else {
    //     console.warn('No form element found on this page.');
    // }
    console.log('Content script loaded successfully!');
});
