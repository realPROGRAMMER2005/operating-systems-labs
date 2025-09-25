// Применения булевских операторов.
var x = false;
var y = true;
var z = 0;
z != x;
WScript.Echo(z); //выводит true
z = x || y;
WScript.Echo(z); //выводит true
z = x && y;
WScript.Echo(z); //выводит false 