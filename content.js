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

// function parseFormData(questions) {
//   return questions.map(question => {
//     try {
//       // Remove the "%.@." prefix and parse the JSON string
//       const cleanedQuestion = question.substring(4);
      
//       // Use a more lenient regex to clean the string while preserving structure
//       let jsonStr = cleanedQuestion
//         .replace(/\\"/g, '"')  // Handle escaped quotes
//         .replace(/\\/g, '\\\\')  // Handle remaining backslashes
//         .replace(/[\u0000-\u001F]+/g, '')  // Remove control characters
//         .replace(/([,\[\]])([\w])/g, '$1"$2')  // Add quotes around unquoted strings
//         .replace(/([a-zA-Z0-9])([\[\],])/g, '$1"$2')  // Add closing quotes
//         .replace(/,\s*([}\]])/g, '$1');  // Remove trailing commas
      
//       const parsed = JSON.parse(jsonStr);
      
//       const formData = {
//         text: '',
//         options: [],
//         imgUrl: null,
//         imgText: null
//       };
      
//       // Extract question text
//       if (parsed[1]) {
//         formData.text = parsed[1];
//       }
      
//       // Extract options
//       if (parsed[4] && 
//           Array.isArray(parsed[4][0]) && 
//           parsed[4][0][1] && 
//           Array.isArray(parsed[4][0][1])) {
//         formData.options = parsed[4][0][1].map(opt => {
//           if (Array.isArray(opt)) {
//             return opt[0];  // Get first element if it's an array
//           }
//           return opt;
//         });
//       }
      
//       // Extract image URL if present at index 5
//       if (parsed[5] && 
//           Array.isArray(parsed[5]) && 
//           parsed[5][0] && 
//           Array.isArray(parsed[5][0]) && 
//           parsed[5][0][0]) {
//         formData.imgUrl = `https://drive.google.com/uc?export=view&id=${parsed[5][0][0]}`;
//       }
      
//       return formData;
      
//     } catch (error) {
//       console.log("Error details:", error);
//       console.log("Problematic question:", question);
      
//       // Return partial data if possible by using regex
//       try {
//         const text = question.match(/"([^"]+)"/)?.[1] || '';
//         const options = [];
//         const optionsMatch = question.match(/\[\[(?:\[([^\]]+)\])/);
//         if (optionsMatch) {
//           const optionsStr = optionsMatch[1];
//           options.push(...optionsStr.split(',').map(opt => 
//             opt.replace(/["\\]/g, '').trim()
//           ).filter(Boolean));
//         }
        
//         return {
//           text,
//           options,
//           imgUrl: null,
//           imgText: null
//         };
//       } catch (e) {
//         return {
//           text: '',
//           options: [],
//           imgUrl: null,
//           imgText: null
//         };
//       }
//     }
//   });
// }

// // Test the function with your sample data
// // const questions = [
// //   `%.@.[193574675,"kya aap ko lagta hai ye extension kaam ka hai ?",null,2,[[366340186,[[\"haa\",null,null,null,false],[\"nhi bilkul nhi\",null,null,null,false],[\"are bakwas hai\",null,null,null,false],[\"bahut acha hai\",null,null,null,false]],false,null,null,null,null,null,false,null,[]]],null,null,null,null,null,null,[null,"kya aap ko lagta hai ye extension kaam ka hai ?"]],"i1","i2","i3",false,"i4"]`,
// //   `%.@.[1608060970,"mere result ko kitna rate kroge ?",null,5,[[944260292,[[\"1\"],[\"2\"],[\"3\"],[\"4\"],[\"5\"]],false,[\"\",\"\"],null,null,null,null,null,null,[]]],null,null,null,null,[[\"1By2dkiw6YfvEMtuBVKHrWWy5oERkW3_9DA_bIYxvaNuJxko\",null,[740,957,0]]],null,[null,"mere result ko kitna rate kroge ?"]],"i18","i19","i20",false,"i21"]`
// // ];

// const parsedData = parseFormData(questions);
// console.log(JSON.stringify(parsedData, null, 2));




function parseFormData(questions) {
  return questions.map(question => {
    try {
      const formData = {
        text: '',
        options: [],
        imgUrl: null,
        imgText: null
      };

      // Extract question text - taking the first quoted string after the initial numbers
      const textMatch = question.match(/^\%\.\@\.\[\d+,"([^"]+)"/);
      if (textMatch) {
        formData.text = textMatch[1];
      }

      // Extract options - looking specifically in the options section
      // Find the section that contains the options array
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

      // Extract image ID - looking for the specific image section pattern
      const imageSection = question.match(/\[\[\["([^"]+)",null,\[\d+,\d+,\d+\]\]/);
      if (imageSection) {
        formData.imgUrl = `https://drive.google.com/uc?export=view&id=${imageSection[1]}`;
      }

      return formData;
    } catch (error) {
      console.error("Error parsing question:", error);
      return {
        text: '',
        options: [],
        imgUrl: null,
        imgText: null
      };
    }
  });
}


const parsedData = parseFormData(questions);
console.log(JSON.stringify(parsedData, null, 2));