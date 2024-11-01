console.log("JavaScript loaded");

function $$ (selector, context = document) {
	return Array.from(context.querySelectorAll(selector));
}

// Check if we are on the home page by looking for the 'home' class in the root element
const ARE_WE_HOME = document.documentElement.classList.contains("home");

// Define the array of pages (URLs and titles)
let pages = [
    { url: "./", title: "Home" },
    { url: "projects", title: "Projects" },
    { url: "meta", title: "Meta" },
    { url: "contact", title: "Contact" },
    { url: "https://github.com/Jaeun-Park", title: "Profile" }
];

// Create the <nav> element and add it to the body at the beginning
// let nav = document.createElement("nav");
// document.body.prepend(nav);

// Use a for loop to iterate over the pages and create links
for (let p of pages) {
    let url = p.url;
    let title = p.title;

    // If we are not on the home page and the URL is not absolute, prepend "../" to the URL
    if (!ARE_WE_HOME && !url.startsWith("http")) {
        url = "../" + url;
    }

    // Create link and add it to the <nav>
    //nav.insertAdjacentHTML("beforeend", `<a href="${url}">${title}</a>`);
    let a = document.createElement("a");
    a.href = url;
    a.textContent = title;
    const nav = document.getElementById("nav");
    nav.append(a);

    // Check if the link matches the current page
    if (a.host === location.host && a.pathname === location.pathname) {
        a.classList.add("current");
    }
    
    // Open external links in a new tab
    if (a.host !== location.host) {
        a.target = "_blank";
        a.rel = "noopener noreferrer"; // Ensures that no information about the original page is sent to the new tab
    }

}

// Output a message to confirm the navigation has been added
console.log("Navigation menu added to the page.");


// Insert the color scheme switcher at the top of the body
// document.body.insertAdjacentHTML("afterbegin", `
// 	<label class="color-scheme">
// 		Theme:
// 		<select id="color-scheme-switch">
//             <option value="auto">Automatic</option>
//             <option value="light">Light</option>
//             <option value="dark">Dark</option>
// 		</select>
// 	</label>`
// );

// // Get a reference to the <select> element
// const select = document.querySelector("#color-scheme-switch");

// // Function to apply the selected color scheme
// function setColorScheme(scheme) {
//     document.documentElement.style.setProperty("color-scheme", scheme);
// }

// // Load and apply the color scheme from localStorage on page load
// document.addEventListener("DOMContentLoaded", () => {
//     const savedScheme = localStorage.getItem("colorScheme") || "auto"; // Default to "auto" if nothing is saved
//     setColorScheme(savedScheme); // Apply the saved scheme
//     select.value = savedScheme; // Update the dropdown to reflect the saved scheme
// });

// // Attach an event listener for the input event
// select.addEventListener("input", function (event) {
//     const selectedScheme = event.target.value;
//     console.log("color scheme changed to", selectedScheme);

//     // Save the user's preference to localStorage
//     localStorage.setItem("colorScheme", selectedScheme);

//     // Apply the selected color scheme
//     setColorScheme(selectedScheme);
// });
 
