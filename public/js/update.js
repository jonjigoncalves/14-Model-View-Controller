// const submitBtn = document.getElementById('submitBtn');
// document.querySelector('#editForm').addEventListener('submit', function(event) {
//     // Prevent the default form submission
//     event.preventDefault(); 
//     const title = document.querySelector("#title").value
//     const text = document.querySelector("#text").value
//     const form = event.target;
//      const formData = {
//       title: title,
//       text: text
//     }

   
//     fetch(form.action, {
//       method: 'PUT',
//        headers: {
//         'Content-Type': 'application/json' 
//       },
//       body: JSON.stringify(formData) 
//     })
//     .then(response => response.json())
//     .then(data => {
//       console.log('Blog updated successfully:', data);
     
//     })
//     .catch(error => {
//       console.error('Error updating blog:', error);
      
//     });
//   });


