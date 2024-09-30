class Calculator {
	// Constructor is called when a new Calculator object is created
	constructor (previousOperandTextElement, currentOperandTextElement) {
		// Store the text elements (UI) for displaying the previous and current operands
		this.previousOperandTextElement = previousOperandTextElement;
		this.currentOperandTextElement = currentOperandTextElement;
		// Initialize the calculator by calling the clear method to reset it
		this.clear(); // Note: This was previously incorrect as `this.clear` instead of `this.clear();`
	}

	// Method to reset the calculator to its initial state
	clear() {
		// Empty the current and previous operand values
		this.currentOperand = '';
		this.previousOperand = '';
		// Reset the operation as undefined, meaning no operation is selected
		this.operation = undefined;
	}

	// Method to delete the last entered digit from the current operand
	delete() {
		// Slice off the last character from the current operand string
		this.currentOperand = this.currentOperand.slice(0, -1);
	}

	// Method to append a number to the current operand (used when a user presses a number button)
	appendNumber(number) {
		// Prevent adding another decimal point if the current operand already has one
		if (number === '.' && this.currentOperand.includes('.')) return;
		// Convert both current operand and number to strings and concatenate them
		this.currentOperand = this.currentOperand.toString() + number.toString();
	}

	// Method to choose an operation (like +, -, *, ÷)
	chooseOperation(operation) {
		// If there's no current operand, do nothing (e.g., prevent operation without a number)
		if (this.currentOperand === '') return;
		// If there is a previous operand, compute the result before applying a new operation
		if (this.previousOperand !== '') {
			this.compute();
		}
		// Set the selected operation (e.g., +, -, *, ÷)
		this.operation = operation;
		// Move the current operand to the previous operand and clear the current operand for the next input
		this.previousOperand = this.currentOperand;
		this.currentOperand = '';
	}

	// Method to compute the result based on the chosen operation and operands
	compute() {
		let computation; // Variable to store the result of the computation
		// Convert previous and current operand strings to numbers
		const prev = parseFloat(this.previousOperand);
		const current = parseFloat(this.currentOperand);
		// If either previous or current operand is not a number, exit the function
		if (isNaN(prev) || isNaN(current)) return;
		// Perform the appropriate calculation based on the chosen operation
		switch (this.operation) {
			case '+':
				computation = prev + current; // Addition
				break;
			case '-':
				computation = prev - current; // Subtraction
				break;
			case '*':
				computation = prev * current; // Multiplication
				break;
			case '÷':
				computation = prev / current; // Division
				break;
			default:
				// If no valid operation is selected, exit the function
				return;
		}
		// Update the current operand to be the result of the computation
		this.currentOperand = computation;
		// Reset the operation to undefined (no operation is selected now)
		this.operation = undefined;
		// Clear the previous operand (since we used it in the computation)
		this.previousOperand = '';
	}

	getDisplayNumber(number) {
		const stringNumber = number.toString();
		const integerDigits = parseFloat(stringNumber.split('.')[0]);
		const decimalDigits = stringNumber.split('.')[1];
		let integerDisplay;
		if (isNaN(integerDigits)) {
			integerDisplay = '';
		} else {
			integerDisplay = integerDigits.toLocaleString('en', {
				maximumFractionDigits: 0 });
		}
		if (decimalDigits != null) {
			return `${integerDisplay}.${decimalDigits}`;
		} else {
			return integerDisplay;
		}
	}

	updateDisplay() {
		this.currentOperandTextElement.innerText = 
			this.getDisplayNumber(this.currentOperand);
		if (this.operation != null) {
			this.previousOperandTextElement.innerText = 
				`${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
		} else {
			this.previousOperandTextElement.innerText = '';
		}
	}

}

// Document Object Model (DOM) Selections
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalButton = document.querySelector('[data-equal]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const currentOperandTextElement = document.querySelector (
	'[data-current-operand]');
const previousOperandTextElement = document.querySelector (
	'[data-previous-operand]');


// Calculator Instance Creation
const calculator = new Calculator (previousOperandTextElement, 
	currentOperandTextElement);

// Add event listners for number buttons
numberButtons.forEach(button => {
	button.addEventListener('click', () => {
		calculator.appendNumber(button.innerText);
		calculator.updateDisplay();
	});
});

// Add event listners for operation buttons
operationButtons.forEach(button => {
	button.addEventListener('click', () => {
		calculator.chooseOperation(button.innerText);
		calculator.updateDisplay();
	});
});

// Add event listners for èqual button
equalButton.addEventListener('click', button => {
	calculator.compute();
	calculator.updateDisplay();
});

// Add event listners for all-clear button
allClearButton.addEventListener('click', button => {
	calculator.clear();
	calculator.updateDisplay();
});

// Add event listners for delete button
deleteButton.addEventListener('click', button => {
	calculator.delete();
	calculator.updateDisplay();
});