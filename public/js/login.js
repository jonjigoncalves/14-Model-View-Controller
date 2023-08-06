// const loginForm = document.querySelector('#loginForm');
// // console.log(loginForm);

// loginForm.addEventListener('submit', async function (event) {
//     event.preventDefault();


//     const emailInput = document.getElementById('Email');
//     const passwordInput = document.getElementById('password');

//     const email = emailInput.value;
//     const password = passwordInput.value;
//     console.log(email);

//     const credentials = {
//         email: email,
//         password: password,
//     };

//     try {
//         // Send a POST request to the server for login
//         const response = await fetch('/api/users/login', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(credentials),
//         });


//         if (response.ok) {
//             const data = await response.json(); // Parse the response JSON
//             console.log(data);
//             if (data) {
//                 window.location.href = '/dashboard'
//             }
//             else {
//                 console.log('no data found');
//             }
//         } else {
//             console.log('failed');
//         }
//     }
//     catch (err) {
//         console.log(err);
//     }
    
// });
