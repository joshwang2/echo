let prevCommands: String[] = [];
let prevOutputs: String[] = [];

//True implies our mode is brief, otherwise it is verbose
// starts in brief mode
let mode = true;

//Current command the user is inputting
let currCommand: HTMLCollectionOf<Element> = document.getElementsByClassName('repl-command-box');

// The window.onload callback is invoked when the window is first loaded by the browser
window.onload = () => {    
    prepareKeypress()    
    prepareSubmitPress();
    
    // If you're adding an event for a button click, do something similar.
    // The event name in that case is "click", not "keypress", and the type of the element 
    // should be HTMLButtonElement. The handler function for a "click" takes no arguments.
}

function prepareKeypress() {
    // As far as TypeScript knows, there may be *many* elements with this class.
    // accessing any inputs to the repl command box
    const maybeInputs: HTMLCollectionOf<Element> = document.getElementsByClassName('repl-command-box')
    // Assumption: there's only one thing
    const maybeInput: Element | null = maybeInputs.item(0)
    // do we need to account for the case of more than one thing?

    // Is the thing there? Is it of the expected type? 
    //  (Remember that the HTML author is free to assign the repl-input class to anything :-) )
    if(maybeInput == null) {
        console.log("Couldn't find input element")
    } else if(!(maybeInput instanceof HTMLInputElement)) {
        console.log(`Found element ${maybeInput}, but it wasn't an input`)
    } else {
        // Notice that we're passing *THE FUNCTION* as a value, not calling it.
        // The browser will invoke the function when a key is pressed with the input in focus.
        //  (This should remind you of the strategy pattern things we've done in Java.)
        maybeInput.addEventListener("keypress", handleKeypress);
        // update prevCommands
        prevCommands.push(maybeInput.toString()); // converting input to string to be called back on later
        // we're receiving and storing the command, we still need to run it
        // after running it we should update the outputs, and print the output to the console
        if (mode) {
            console.log(maybeInput); //maybeOutput needed?
        }
        else {
            console.log("Command: " + maybeInput);

            console.log("Output: ")

        }
    }
}

// We'll use a global state reference for now
let pressCount = 0
function getPressCount() {
    return pressCount
}

function handleKeypress(event: KeyboardEvent) {    
    // The event has more fields than just the key pressed (e.g., Alt, Ctrl, etc.)
    pressCount = pressCount + 1
    console.log(`key pressed: ${event.key}. ${getPressCount()} presses seen so far.`)
}


function prepareSubmitPress() {
    const maybeButtons: HTMLCollectionOf<Element> = document.getElementsByClassName('repl-submit-box')
    // Assumption: there's only one thing
    const maybeButton: Element | null = maybeButtons.item(0)
    if(maybeButton == null) {
        console.log("No clicks");
    } else if(!(maybeButton instanceof HTMLButtonElement)) {
        console.log(`Found element ${maybeButton}, not button`);
    } else {
        // Notice that we're passing *THE FUNCTION* as a value, not calling it.
        // The browser will invoke the function when a key is pressed with the input in focus.
        //  (This should remind you of the strategy pattern things we've done in Java.)
        maybeButton.addEventListener("click", handleButtonPress);
    }
}

function handleButtonPress(event: MouseEvent) {    
    // The event has more fields than just the key pressed (e.g., Alt, Ctrl, etc.)
    currCommand = document.getElementsByClassName('repl-command-box');
    console.log(currCommand);
}

function changeMode(event: KeyboardEvent) {
    mode = !mode;
}

// Provide this to other modules (e.g., for testing!)
// The configuration in this project will require /something/ to be exported.
export {prepareSubmitPress, handleButtonPress, handleKeypress, prepareKeypress, getPressCount}
