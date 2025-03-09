document.addEventListener("partialsLoaded", () => {
  console.log("index.js підключено!");
  import("./header.js");
  import("./who-i-am.js");
  import('./carousel-animated.js');
  import('./header-intro.js');
  import('./main.section.hello-there.partial.js');
  import('./our-slider.js');
  import("./logo-modal.js");
  import("./main.section.collaboration.button.js");
});
