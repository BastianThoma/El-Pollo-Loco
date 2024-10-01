/**
 * Adds touch event listeners for mobile control buttons.
 * Handles `touchstart` and `touchend` events for controlling game actions.
 * Prevents default behavior for cancelable events.
 * @function
 */
function mobileButtonsTouchEvents() {
  document
    .getElementById("leftMobileButton")
    .addEventListener("touchstart", (e) => {
      if (event.cancelable) event.preventDefault();
      keyboard.LEFT = true;
    });

  document
    .getElementById("leftMobileButton")
    .addEventListener("touchend", (e) => {
      if (event.cancelable) event.preventDefault();
      keyboard.LEFT = false;
    });

  document
    .getElementById("jumpMobileButton")
    .addEventListener("touchstart", (e) => {
      if (event.cancelable) event.preventDefault();
      keyboard.SPACE = true;
    });

  document
    .getElementById("jumpMobileButton")
    .addEventListener("touchend", (e) => {
      if (event.cancelable) event.preventDefault();
      keyboard.SPACE = false;
    });

  document
    .getElementById("rightMobileButton")
    .addEventListener("touchstart", (e) => {
      if (event.cancelable) event.preventDefault();
      keyboard.RIGHT = true;
    });

  document
    .getElementById("rightMobileButton")
    .addEventListener("touchend", (e) => {
      if (event.cancelable) event.preventDefault();
      keyboard.RIGHT = false;
    });

  document
    .getElementById("throwMobileButton")
    .addEventListener("touchstart", (e) => {
      if (event.cancelable) event.preventDefault();
      keyboard.D = true;
    });

  document
    .getElementById("throwMobileButton")
    .addEventListener("touchend", (e) => {
      if (event.cancelable) event.preventDefault();
      keyboard.D = false;
    });
}

/**
 * Toggles visibility of an element by adding or removing CSS classes.
 * @function
 * @param {string} elementSelector - CSS selector of the element to show or hide.
 * @param {string} action - Action to perform, either "show" or "hide".
 * @param {string} [displayClass="d-flex"] - The class to apply when showing the element (default is "d-flex").
 * @param {string} [hideClass="d-none"] - The class to apply when hiding the element (default is "d-none").
 */
function toggleElementAction(
  elementSelector,
  action,
  displayClass = "d-flex",
  hideClass = "d-none"
) {
  let element = document.querySelector(elementSelector);
  if (action === "show") {
    element.classList.remove(hideClass);
    element.classList.add(displayClass);
  } else if (action === "hide") {
    element.classList.remove(displayClass);
    element.classList.add(hideClass);
  }
}
