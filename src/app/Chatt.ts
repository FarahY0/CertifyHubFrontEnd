// import { InstructorService } from "./instructor.service";

// const { StreamChat } = require('stream-chat');

// // Initialize Stream Chat client
// const client = new StreamChat('YOUR_API_KEY', 'YOUR_API_SECRET');

// // Function to map and sync users to Stream Chat
// async function syncUsersToStreamChat() {
//   try {
//     // Fetch user data from your database (Replace this with your actual database query)
//     const usersFromDB = await InstructorService.getAllUsers(); // Example function to fetch users from your database

//     // Loop through the fetched users and create/update them in Stream Chat
//     for (const user of usersFromDB) {
//       const { id, name, image } = user; // Extract user information from your database

//       // Create or update the user in Stream Chat
//       await client.upsertUser({
//         id,
//         name,
//         image,
//       });
      
//       console.log(`User ${name} synced to Stream Chat`);
//     }
//   } catch (error) {
//     console.error('Error syncing users to Stream Chat:', error);
//   }
// }

// // Call the function to sync users when needed
// syncUsersToStreamChat();
