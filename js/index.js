// ========================== Start Global Variables
var siteNameInput = document.getElementById("siteName"); // Input element for site name
var siteUrlInput = document.getElementById("siteURL"); // Input element for site url
var btnSubmit = document.getElementById("submit-btn"); // Button to add a new site

var siteList = []; // Array to store the list of sites

var message = document.querySelector('.message')
var anima = document.querySelector('.animation')

// Load site data from localStorage if available
if (localStorage.getItem("siteContainer") !== null) {
  siteList = JSON.parse(localStorage.getItem("siteContainer")); // Load sites into the list
  displayData(); // Display site data on the page
}
// ========================== End Global Variables

// ?========================== Start Functions

// Function to add a new site
function submitSite() {
  if (checkNameValid() && checkURLValid()){
    var site = {
      name: siteNameInput.value.trim(), // Trim the input value for site name
      siteUrl: siteUrlInput.value.trim(), // Trim the input value for site url
    };
    
    siteList.push(site); // Add the new site to the site list

    // Save the updated site list to localStorage
    localStorage.setItem("siteContainer", JSON.stringify(siteList));

    displayData(); // Display updated site data

    clearForm(); // Clear the form fields
  }
  else {
    message.classList.remove('display-message')
    anima.classList.remove('anim')
}
}

// Function to display site data on the page
function displayData() {
  var cartona = "";
  for (var i = 0; i < siteList.length; i++) {
    cartona += createRows(i); // Generate HTML content for each site
  }

  document.getElementById("tableContent").innerHTML = cartona; // Inject the generated HTML into the page
}


// Function to create the HTML content for each site
function createRows(i) {

  return `
    <tr>
              <td>${i + 1}</td>
              <td>${siteList[i].name}</td>
              <td><button  class="btn btn-visit"  onclick="visitWebsite( '${siteList[i].siteUrl}' )">
                <i class="fa-solid fa-eye pe-2"></i>
                Visit
              </button></td>
              <td><button  class="btn btn-delete pe-2" onclick="deleteItem( ${i} )">
                <i class="fa-solid fa-trash-can"></i>
                Delete
              </button></td>
            </tr>
  `;
}

// Function to delete a site from the list
function deleteItem(index) {
  siteList.splice(index, 1); // Remove the site from the array

  // Save the updated list to localStorage
  localStorage.setItem("siteContainer", JSON.stringify(siteList));

  displayData(); // Refresh the displayed site data
}

// Function to open a URL
function visitWebsite(url) {
  if (url) {
    window.open(url, "_blank");
  } else {
    alert("URL not found!");
  }
}

// Function to check valid value
function checkNameValid() {
  var regularName = /^\w{3,}(\s+\w+)*$/;
  var text = siteNameInput.value ;
  if(regularName.test(text)){
    siteNameInput.classList.add("is-valid");
    siteNameInput.classList.remove("is-invalid");
    return true;
  }
  else{
    siteNameInput.classList.add("is-invalid");
    siteNameInput.classList.remove("is-valid");
    return false;
  }
}
function checkURLValid(){
  var regularUrl =  /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/ ;
  var text = siteUrlInput.value ;
  if(regularUrl.test(text)){
    siteUrlInput.classList.add("is-valid");
    siteUrlInput.classList.remove("is-invalid");
    return true;
  }
  else{
    siteUrlInput.classList.add("is-invalid");
    siteUrlInput.classList.remove("is-valid");
    return false;
  }
}

// Function to close model
function closeMassage() {
  message.classList.add('display-message')
}

// Function to clear the input form
function clearForm() {
  siteNameInput.value = null;
  siteUrlInput.value = null;
}

// ?========================== End Functions
