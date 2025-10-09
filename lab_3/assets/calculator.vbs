' VBScript Calculator with Interactive Pause
WScript.Echo "VBScript Calculator"
WScript.Echo "==================="

Set args = WScript.Arguments

If args.Count < 3 Then
    WScript.Echo "Usage: calculator.vbs number1 number2 operation"
    WScript.Echo "Operations: add, subtract, multiply, divide"
    WScript.Sleep(3000)
    WScript.Quit 1
End If

' Преобразуем аргументы в числа
num1 = CDbl(args(0))
num2 = CDbl(args(1))
operation = LCase(args(2))

Select Case operation
    Case "add"
        result = num1 + num2
        WScript.Echo num1 & " + " & num2 & " = " & result
    Case "subtract"
        result = num1 - num2
        WScript.Echo num1 & " - " & num2 & " = " & result
    Case "multiply"
        result = num1 * num2
        WScript.Echo num1 & " * " & num2 & " = " & result
    Case "divide"
        If num2 = 0 Then
            WScript.Echo "Error: Cannot divide by zero!"
        Else
            result = num1 / num2
            WScript.Echo num1 & " / " & num2 & " = " & result
        End If
    Case Else
        WScript.Echo "Error: Unknown operation '" & operation & "'"
        WScript.Echo "Available operations: add, subtract, multiply, divide"
End Select

WScript.Echo ""
WScript.Echo "Calculation completed."