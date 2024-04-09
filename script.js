document.getElementById("button1").addEventListener("click", function () {
  setTimeout(function () {
    startCountdown(100, 10);
    toggleButtonVisibility(); // Call function to toggle button visibility
  }, 5000); // 5-second delay
  hideDescription(); // Show description
});

document.getElementById("button2").addEventListener("click", function () {
  setTimeout(function () {
    startCountdown(50, 5);
    toggleButtonVisibility(); // Call function to toggle button visibility
  }, 5000); // 5-second delay
  hideDescription(); // Show description
});

document.getElementById("button3").addEventListener("click", function () {
  setTimeout(function () {
    startCountdown(30, 4);
    toggleButtonVisibility(); // Call function to toggle button visibility
  }, 5000); // 5-second delay
  hideDescription(); // Show description
});

document.getElementById("resetButton").addEventListener("click", function () {
  resetCountdown();
  toggleButtonVisibility(); // Show buttons again
  document.getElementById("description").classList.remove("hidden"); // Show description
});

function playClap1Sound() {
  var audio = new Audio("clap1.mp3");
  audio.play();
}

function playClap2Sound() {
  var audio = new Audio("clap2.mp3");
  audio.play();
}

function playBeepSound() {
  var audio = new Audio("beep.mp3");
  audio.play();
}

function toggleButtonVisibility() {
  document.getElementById("buttons").classList.add("hidden"); // Hide buttons
  document.getElementById("countdown").classList.remove("hidden"); // Show countdown
  document.getElementById("description").classList.add("hidden"); // Hide description
  document.getElementById("resetButton").classList.remove("hidden"); // Show reset button
}

document.getElementById("resetButton").addEventListener("click", function () {
  resetCountdown();
  document.getElementById("buttons").classList.remove("hidden"); // Show buttons again
  document.getElementById("description").classList.remove("hidden"); // Show description
});
function hideDescription() {
  var description = document.getElementById("description");
  description.classList.add("hidden");
}

var countdownInterval; // Variable to store the countdown interval
var pinkFlashIntervals = []; // Array to store the intervals for pink background flash
var flashTimings = []; // Array to store the timings for flashes
var flashCount = 0; // Variable to store the count of flashes

function startCountdown(duration, flashCountValue) {
  closeModal();
  var countdownText = document.getElementById("countdownText");
  var flashCountElement = document.getElementById("flashCount");
  var remainingTime = duration;
  var flashIndex = 0;

  // Display countdown text
  countdownText.innerText = formatTime(remainingTime);
  flashCountElement.innerText = "Flashes: 0"; // Initialize flash count

  // Clear any existing countdown interval
  clearInterval(countdownInterval);

  // Clear any existing pink flash intervals
  pinkFlashIntervals.forEach((interval) => clearInterval(interval));
  pinkFlashIntervals = []; // Clear the array

  // Generate random timings for flashes in ascending order
  flashTimings = generateRandomTimings(duration, flashCountValue).sort(
    (a, b) => a - b
  );

  // Log the generated random timing array to the console
  console.log("Random Timing Array:", flashTimings);

  // Update countdown every second
  countdownInterval = setInterval(function () {
    remainingTime--;
    countdownText.innerText = formatTime(remainingTime);

    // Check if the current time matches any of the flash timings
    if (
      flashIndex < flashTimings.length &&
      duration - remainingTime === flashTimings[flashIndex]
    ) {
      // Increment flash count
      flashCount++;
      // Update flash count display
      flashCountElement.innerText = "Flashes: " + flashCount;

      // Determine background color based on selected radio button
      var colorOption = document.querySelector(
        'input[name="colorOption"]:checked'
      ).value;
      var randomTiming = flashTimings[flashIndex];

      if (colorOption === "oneColor") {
        // One color: always yellow
        document.body.style.backgroundColor = "Yellow";
        playClap1Sound();
      } else if (colorOption === "twoColor") {
        // Two color: odd - red, even - yellow
        if (randomTiming % 2 === 0) {
          document.body.style.backgroundColor = "yellow";
          playClap1Sound();
        } else {
          document.body.style.backgroundColor = "red";
          playClap2Sound();
        }
      } else {
        // Three color: original logic (based on prime, odd, even)
        if (isPrime(randomTiming)) {
          // Prime number
          document.body.style.backgroundColor = "darkblue";
          playBeepSound();
        } else if (randomTiming % 2 === 0) {
          // Even number
          document.body.style.backgroundColor = "red";
          playClap2Sound();
        } else {
          // Odd number
          document.body.style.backgroundColor = "yellow";
          playClap1Sound();
        }
      }

      // Reset background color after 1.5 seconds
      setTimeout(function () {
        document.body.style.backgroundColor = "rgba(160, 159, 159, 0.541)";
      }, 750);

      // Move to the next flash timing
      flashIndex++;
    }

    if (remainingTime <= 0) {
      clearInterval(countdownInterval);
      // Perform any actions when countdown finishes
    }
  }, 1000);
}

function resetCountdown() {
  // Clear the countdown interval
  clearInterval(countdownInterval);

  // Clear any existing pink flash intervals
  pinkFlashIntervals.forEach((interval) => clearInterval(interval));
  pinkFlashIntervals = []; // Clear the array

  // Reset the countdown text
  document.getElementById("countdownText").innerText = "";

  // Reset the background color
  document.body.style.backgroundColor = "rgba(160, 159, 159, 0.541)";

  // Reset the flash count
  flashCount = 0;

  // Reset the flash count display
  document.getElementById("flashCount").innerText = "Flashes: 0";

  // Perform any other reset actions if necessary
}

function generateRandomTimings(duration, flashCountValue) {
  var timings = [];
  var lastTiming = 0;

  // Generate random timings between 7 and duration
  for (var i = 0; i < flashCountValue; i++) {
    var newTiming = Math.floor(Math.random() * (duration - 7)) + 7;

    // Ensure minimum difference of 3 between consecutive timings
    while (Math.abs(newTiming - lastTiming) < 5) {
      newTiming = Math.floor(Math.random() * (duration - 7)) + 7;
    }

    timings.push(newTiming);
    lastTiming = newTiming;
  }

  // Sort the timings array in ascending order
  timings.sort((a, b) => a - b);
  return timings;
}

// Function to format time as MM:SS
function formatTime(seconds) {
  var minutes = Math.floor(seconds / 60);
  var remainingSeconds = seconds % 60;
  return (
    minutes +
    ":" +
    (remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds)
  );
}

// Function to check if a number is prime
function isPrime(num) {
  if (num <= 1) {
    return false;
  }
  for (var i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) {
      return false;
    }
  }
  return true;
}

// Get the modal
var modal = document.getElementById("myModal");

// Get all buttons that open the modal
var buttons = document.querySelectorAll("#buttons button");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// Function to open the modal
function openModal() {
  modal.style.display = "block";
}

// Function to close the modal
function closeModal() {
  modal.style.display = "none";
}

// Add click event listeners to all buttons
buttons.forEach(function (button) {
  button.onclick = openModal;
});

// When the user clicks on <span> (x), close the modal
span.onclick = closeModal;

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    closeModal();
  }
};
function resetCountdown() {
  // Clear the countdown interval
  clearInterval(countdownInterval);

  // Clear any existing pink flash intervals
  pinkFlashIntervals.forEach((interval) => clearInterval(interval));
  pinkFlashIntervals = []; // Clear the array

  // Reset the countdown text
  document.getElementById("countdownText").innerText = "";

  // Reset the background color
  document.body.style.backgroundColor = "rgba(160, 159, 159, 0.541)";

  // Reset the flash count
  flashCount = 0;

  // Reset the flash count display
  document.getElementById("flashCount").innerText = "Flashes: 0";

  // Hide the reset button
  document.getElementById("resetButton").classList.add("hidden");
}
