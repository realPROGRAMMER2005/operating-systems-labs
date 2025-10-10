@echo off
echo Advanced Batch Calculator
echo ========================

if "%~3"=="" (
    echo Usage: calculator3.bat number1 number2 operation
    echo Operations: +, -, *, /, add, subtract, multiply, divide
    goto end
)

set num1=%~1
set num2=%~2
set op=%~3

:: Преобразуем текстовые операции в символы
if /i "%op%"=="add" set op=+
if /i "%op%"=="subtract" set op=-
if /i "%op%"=="multiply" set op=*
if /i "%op%"=="divide" set op=/

:: Выполняем вычисление
set /a "result=num1 %op% num2"
echo Result: %num1% %op% %num2% = %result%

:end
pause