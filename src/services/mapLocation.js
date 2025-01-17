// // Initialize default coordinates
// let lat = 111;
// let long = 112;

// // Move this function outside so it can be accessed by all functions
// async function getLatLongFromServer() {
//     try {
//         // const response = await fetch('/latLongForMap');
//         // const data = await response.json();
//         // console.log("data", data);

//         // // Update the coordinates

        

//         // Store in localStorage
//         sessionStorage.setItem('userLat', lat);
//         sessionStorage.setItem('userLong', long);

//         console.log("Coordinates from server:", lat, long);
//         console.log("==================>", sessionStorage.getItem('userLat'));

//         return data;

//         //bring data from server that it brought from db
//         //Maybe the above code will remain the same, we'll just need to change localStorage to sessionStorage





//     } catch (error) {
//         console.error('Error getting variables:', error);
//         return { lat: 12, long: 12 }; // Return defaults on error
//     }
// }

// // Initialize coordinates when page loads
// document.addEventListener("DOMContentLoaded", async () => {
//     await getLatLongFromServer();
//     console.log("Final coordinates:", lat, "  <->  ", long);

//     const button = document.getElementById("getLocation");
//     if (button) {
//         button.addEventListener("click", async () => {
//             await getLatLongFromServer();
//             console.log("Updated coordinates:", lat, "  <->  ", long);
//         });
//     }
// });

// // Export functions that use the shared getLatLongFromServer
// export async function getLat() {
//     const data = await getLatLongFromServer();
//     return data.lat;
// }

// export async function getLong() {
//     const data = await getLatLongFromServer();
//     return data.long;
// }

// window.addEventListener('beforeunload', function () {
//     sessionStorage.clear();
// });  //remove it if thinking of session storage.