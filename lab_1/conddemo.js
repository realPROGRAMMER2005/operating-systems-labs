// conddemo.js
var weekday=new Date().getDay();// ��������� ��� ������
var str;
switch(weekday) {
case 0:
    str="�������";
    break;
case 1:
 str="������";
    break;
case 2:
    str="������";
    break;
case 3:
    str="������";
    break;
case 4:
    str="��������";
    break;
case 5:
 str="�����";
 break;
case 6:
    str="������";
    break;
default:
    str="�����������";
}
WScript.Echo("������� "+str+" ���� ������ ("+( (weekday == 0 || weekday == 6)?"��������":"�������")+")"); 