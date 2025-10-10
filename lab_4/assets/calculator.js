// callculator.js
WScript.Echo("JavaScript Calculator");
WScript.Echo("=====================");

var args = WScript.Arguments;

if (args.length < 3) {
    WScript.Echo("Usage: calculator.js number1 number2 operation");
    WScript.Echo("Operations: add, subtract, multiply, divide");
    WScript.Quit(1);
}

var num1 = parseFloat(args(0));
var num2 = parseFloat(args(1));
var operation = args(2).toLowerCase();
var result;

switch(operation) {
    case "add":
        result = num1 + num2;
        WScript.Echo("Result: " + num1 + " + " + num2 + " = " + result);
        break;
    case "subtract":
        result = num1 - num2;
        WScript.Echo("Result: " + num1 + " - " + num2 + " = " + result);
        break;
    case "multiply":
        result = num1 * num2;
        WScript.Echo("Result: " + num1 + " * " + num2 + " = " + result);
        break;
    case "divide":
        if (num2 === 0) {
            WScript.Echo("Error: Division by zero!");
        } else {
            result = num1 / num2;
            WScript.Echo("Result: " + num1 + " / " + num2 + " = " + result);
        }
        break;
    default:
        WScript.Echo("Error: Unknown operation. Use: add, subtract, multiply, divide");
}

var input = WScript.StdIn.Read(1);