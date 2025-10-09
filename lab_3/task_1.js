var args = WScript.Arguments;

if (args.length < 3) {
    WScript.Echo("Usage: cscript " + WScript.ScriptName + " <command_name> <output_path> <output_file>");
    WScript.Quit(1);
}

var commandName = args(0);
var outputPath = args(1);
var outputFile = args(2);
var fullPath = outputPath + "\\" + outputFile;

function getDosHelp(command) {
    var shell = new ActiveXObject("WScript.Shell");
    // Сохраняем текущую локаль и устанавливаем английскую
    var exec = shell.Exec("cmd.exe /c @echo off & for /f \"tokens=2 delims=:\" %a in ('chcp') do set OLD_CP=%a & chcp 437 >nul & help " + command + " & chcp %OLD_CP% >nul");
    var output = "";

    while (!exec.StdOut.AtEndOfStream) {
        var line = exec.StdOut.ReadLine();
        output += line + "\r\n";
    }

    return output;
}

var helpText = getDosHelp(commandName);


var fso = new ActiveXObject("Scripting.FileSystemObject");
var file = fso.CreateTextFile(fullPath, true);
file.Write(helpText);
file.Close();

WScript.Echo("Help for command " + commandName + " saved to file: " + fullPath);