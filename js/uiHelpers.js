/**
 * Initializes touch event listeners for mobile control buttons.
 * Sets up touchstart and touchend events for controlling game actions.
 * Prevents default behavior for cancelable events.
 * @function
 */
function mobileButtonsTouchEvents() {
  addTouchEventListeners("leftMobileButton", 
    () => { keyboard.LEFT = true; }, 
    () => { keyboard.LEFT = false; }
  );

  addTouchEventListeners("jumpMobileButton", 
    () => { keyboard.SPACE = true; }, 
    () => { keyboard.SPACE = false; }
  );

  addTouchEventListeners("rightMobileButton", 
    () => { keyboard.RIGHT = true; }, 
    () => { keyboard.RIGHT = false; }
  );

  addTouchEventListeners("throwMobileButton", 
    () => { keyboard.D = true; }, 
    () => { keyboard.D = false; }
  );
}

/**
 * Adds touchstart and touchend event listeners to a specified button.
 * Calls the provided functions to set keyboard states on touch events.
 *
 * @param {string} buttonId - The ID of the button to which event listeners are attached.
 * @param {function} onTouchStart - Function to call when the button is touched (sets the key to true).
 * @param {function} onTouchEnd - Function to call when the touch ends (sets the key to false).
 */
function addTouchEventListeners(buttonId, onTouchStart, onTouchEnd) {
  let button = document.getElementById(buttonId);

  button.addEventListener("touchstart", (e) => {
    if (e.cancelable) e.preventDefault();
    onTouchStart(); // Call the function to set the keyboard key to true
  });

  button.addEventListener("touchend", (e) => {
    if (e.cancelable) e.preventDefault();
    onTouchEnd(); // Call the function to set the keyboard key to false
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
