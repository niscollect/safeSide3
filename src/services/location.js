const button = document.getElementById("getLocation");

// These variables will hold the actual values
let lat = null, long = null;

function gotLocation(position) {
    lat = position.coords.latitude;
    long = position.coords.longitude;
    
    console.log(lat, "->", long);
    sessionStorage.setItem('userLat', lat);
    sessionStorage.setItem('userLong', long);
}

function failedToGet() {
    console.log("There was some issue");
}

// Create a promise that will resolve when location is set
let locationPromise = null;

button.addEventListener("click", () => {
    console.log("HERE HERE");
    // Create a new promise when button is clicked
    locationPromise = new Promise((resolve) => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                gotLocation(position);
                resolve({ lat, long });
            }, 
            failedToGet
        );
    });
});

// Export async functions that wait for location
export async function getLat() {
    // Wait for location to be set if button was clicked
    if (locationPromise) {
        const location = await locationPromise;
        return location.lat;
    }
    // Return stored value or null if button wasn't clicked
    return parseFloat(sessionStorage.getItem('userLat')) || null;
}

export async function getLong() {
    if (locationPromise) {
        const location = await locationPromise;
        return location.long;
    }
    return parseFloat(sessionStorage.getItem('userLong')) || null;
}