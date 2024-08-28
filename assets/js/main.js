// Helper function to safely manipulate elements by ID
function setElementDisplayById(elementId, displayStyle) {
  const element = document.getElementById(elementId);
  if (element) {
    element.style.display = displayStyle;
  } else {
    //console.warn(`Element with ID ${elementId} not found.`);
  }
}

// Helper function to safely manipulate elements by class name
function setElementDisplayByClass(className, displayStyle) {
  const elements = document.getElementsByClassName(className);
  if (elements.length > 0) {
    for (const element of elements) {
      element.style.display = displayStyle;
    }
  } else {
    //console.warn(`Elements with class name ${className} not found.`);
  }
}

// Function to display user avatar
function displayAvatar() {
  const loggedInUser = localStorage.getItem("loggedInUser");
  if (loggedInUser) {
    const userDataString = localStorage.getItem(loggedInUser);
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      const avatarData = userData.avatar;
      if (avatarData) {
        const avatarImage = document.getElementById("avatarImage");
        if (avatarImage) {
          avatarImage.src = avatarData;
        } else {
          console.error("Avatar image element not found.");
        }
      } else {
        console.error("Avatar data not found in user data.");
      }
    } else {
      console.error("User data not found in LocalStorage for logged-in user.");
    }
  } else {
    console.error("No logged-in user found in LocalStorage.");
  }
}

// Check if user is logged in and update the username placeholder accordingly
document.addEventListener("DOMContentLoaded", function () {
  const loggedInUser = localStorage.getItem("loggedInUser");
  if (loggedInUser) {
    displayAvatar();

    const userLabel = document.getElementById("userLabel");
    if (userLabel) {
      userLabel.textContent = loggedInUser;
    }

    setElementDisplayById("signupButton", "none");
    setElementDisplayById("userProfile", "flex");
    setElementDisplayById("progress-bar", "inline-flex");
    setElementDisplayById("badge-card", "flex");
    setElementDisplayById("mark-complete", "flex");
    setElementDisplayByClass("completion-status", "flex");
    setElementDisplayByClass("progress-container", "block");
  } else {
    setElementDisplayById("signupButton", "flex");
    setElementDisplayById("loginButton", "flex");
    setElementDisplayById("signupButtonCTA", "flex");
    setElementDisplayById("loginButtonCTA", "flex");
  }
});

// Function to handle signout
function handleLogout() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "/"; // Reload the page after signout to update the UI
}

// Event listener for signout button click
const logoutButton = document.getElementById("logoutButton");
if (logoutButton) {
  logoutButton.addEventListener("click", handleLogout);
}
