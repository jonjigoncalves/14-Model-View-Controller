// const registrationForm = document.getElementById('registrationForm');
// console.log(registrationForm);

// // Add an event listener to the form submission
// registrationForm.addEventListener('submit', async function (event) {
//     event.preventDefault();
//     // console.log('world');
//   // Get the form inputs by their IDs
//   const nameInput = document.getElementById('name');
//   const emailInput = document.getElementById('Email');
//   const passwordInput = document.getElementById('password');
  

//   // Get the values from the form inputs
//   const name = nameInput.value;
//   const email = emailInput.value;
//   const password = passwordInput.value;
  

//   // Create an object to store the user data
//   const userData = { name, email, password };

//   // Convert the object to a JSON string and store it in local storage
// //   localStorage.setItem('userData', JSON.stringify(userData));
// try {
//     // Send a POST request to the server for login
//     const response = await fetch('/api/users/register', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(userData),
//     });
//     // console.log(response);
//     if(response.ok) {
//         window.location.href = '/dashboard'
    
//     }
//     else{
//         console.log('login failed');
//     }

//  }
//  catch(err) {
//     console.log(err);
//  }

// //   window.location.href = '/';


// });