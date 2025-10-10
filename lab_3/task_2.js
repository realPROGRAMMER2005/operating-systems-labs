var address = WScript.Arguments(0) + "\\";
var name_p = WScript.Arguments(1);
var mode = WScript.Arguments(2); // cmd or window

var Shell = WScript.CreateObject("WScript.Shell");
Shell.Run("notepad.exe " + address + name_p + ".txt", 1, true);

if (mode == "cmd")
    Shell.Run("cmd.exe /K cscript " + address + name_p + ".txt");
else if (mode == "window")
    Shell.Run("cmd.exe /K wscript " + address + name_p + ".txt & exit");
else
    WScript.Echo("Ошибка выбора режима запуска процедуры!");