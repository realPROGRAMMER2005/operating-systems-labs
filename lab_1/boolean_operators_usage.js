// ���������� ��������� ����������.
var x = false;
var y = true;
var z = 0;
z != x;
WScript.Echo(z); //������� true
z = x || y;
WScript.Echo(z); //������� true
z = x && y;
WScript.Echo(z); //������� false 