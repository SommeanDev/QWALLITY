$(document).ready(function () {
      $(".navbar-collapse").addClass("hidden"); // Add the "hidden" class to hide the navbar inside the toggle button by default
      $(".navbar-toggler").addClass("collapsed"); // Add the "collapsed" class to the toggle button to visually indicate that the navbar is hidden

      $(".navbar-toggler").click(function () {
        $(".navbar-collapse").toggleClass("hidden"); // Toggle the "hidden" class when the toggle button is clicked
      });
    });



$(document).ready(function () { 
  const loadingContainer = document.getElementById("loading-container");
  const links = document.getElementsByTagName("a");
  const searchForm = document.getElementById("search-form");
  const searchButton = document.getElementById("search-button");
  const imageContainer = document.getElementById("image-container");
  const homeImages = document.getElementById("home-images");

  Array.from(links).forEach(function (link) {
    link.addEventListener("click", function (event) {
      const href = this.getAttribute("href");

      if (href.startsWith("https://drive.google.com/uc?export=download&id=")) {
        // Directly open the link without showing the loading animation
        window.location.href = href;
      } else {
        event.preventDefault();

        // Show the loading animation
        loadingContainer.style.opacity = 0.9;
        loadingContainer.style.display = "block";

        setTimeout(function () {
          window.location.href = href;
        }, 700); // Adjust the duration as needed (in milliseconds)
      }
    });
  });

  searchForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Show the loading animation
    loadingContainer.style.display = "block";
    loadingContainer.style.opacity = 0.9;
    loadingContainer.style.display = "block";

    // Hide contents below the "home" div
    imageContainer.style.display = "none";
    homeImages.style.display = "none";

    // Simulate loading delay (you can replace this with your actual loading logic)
    setTimeout(function () {
      // Hide the loading animation
      loadingContainer.style.display = "none";

      // Show contents below the "home" div
      imageContainer.style.display = "block";
    }, 2000); // Adjust the duration as needed (in milliseconds)
  });
});
