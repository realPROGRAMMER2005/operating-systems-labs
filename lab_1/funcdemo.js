// funcdemo.js � ���������� ���������� ����� ����� ������� �� ���������
function hypotenuse(x,y) { 
    return Math.sqrt(x*x+y*y);
}
var x1=2;
var y1=3;
var x2=5;
var y2=6;

WScript.Echo("���������� ����� ("+x1+","+y1+") � ("+x2+y2+") ����� " +hypotenuse(x2-x1,y2-y1)); 