var shell = new ActiveXObject("WScript.Shell");
var fso = new ActiveXObject("Scripting.FileSystemObject");

function showUsage() {
    WScript.Echo("Usage: cscript " + WScript.ScriptName + " [options]");
    WScript.Echo("");
    WScript.Echo("Options:");
    WScript.Echo("  -edit:path          Edit procedure file");
    WScript.Echo("  -run:path           Run procedure file");
    WScript.Echo("  -mode:window|console Execution mode");
    WScript.Echo("  -type:ext           File type for new files");
    WScript.Echo("  -arg:value          Add argument (can be used multiple times)");
    WScript.Echo("");
    WScript.Echo("Examples:");
    WScript.Echo("  cscript " + WScript.ScriptName + " -run:backup.bat -arg:source -arg:destination");
    WScript.Echo("  cscript " + WScript.ScriptName + " -run:script.vbs -arg:\"file with spaces.txt\" -mode:console");
}

function createTemplate(extension) {
    var template = "";
    switch(extension.toLowerCase()) {
        case "bat":
        case "cmd":
            template = "@echo off\nrem Batch procedure with arguments\necho Number of arguments: %#\necho Argument 1: %1\necho Argument 2: %2\necho All arguments: %*\npause\n";
            break;
        case "vbs":
            template = "' VBScript procedure with arguments\\nSet args = WScript.Arguments\\nIf args.Count > 0 Then\\n    WScript.Echo \\\"Number of arguments: \\\" & args.Count\\n    For i = 0 To args.Count - 1\\n        WScript.Echo \\\"Argument \\\" & i & \\\": \\\" & args(i)\\n    Next\\nElse\\n    WScript.Echo \\\"No arguments provided\\\"\\nEnd If\\nWScript.Echo \\\"Press any key to continue...\\\"\\nDo While Not WScript.StdIn.AtEndOfStream\\n    Line = WScript.StdIn.Read(1)\\n    Exit Do\\nLoop\"";
            break;
        case "js":
            template = "// JavaScript procedure with arguments\\nWScript.Echo(\\\"Number of arguments: \\\" + WScript.Arguments.length);\\nfor (var i = 0; i < WScript.Arguments.length; i++) {\\n    WScript.Echo(\\\"Argument \\\" + i + \\\": \\\" + WScript.Arguments(i));\\n}\\nWScript.Echo(\\\"Press any key to continue...\\\");\\nvar input = WScript.StdIn.Read(1);\"";
            break;
        default:
            template = "rem Procedure file with arguments\\n";
    }
    return template;
}

function editProcedure(filePath, fileType) {
    try {
        var fullPath = filePath;
        
        if (fso.GetExtensionName(fullPath) === "") {
            fullPath = filePath + "." + (fileType || "bat");
        }
        
        WScript.Echo("Editing: " + fullPath);
        
        if (!fso.FileExists(fullPath)) {
            var ext = fso.GetExtensionName(fullPath);
            var template = createTemplate(ext);
            
            var file = fso.CreateTextFile(fullPath, true);
            file.Write(template);
            file.Close();
            WScript.Echo("Created new " + ext.toUpperCase() + " file with arguments template");
        }
        
        shell.Run("notepad.exe \"" + fullPath + "\"", 1, true);
        WScript.Echo("Notepad closed. File saved: " + fullPath);
        
        return fullPath;
        
    } catch (e) {
        WScript.Echo("Error: " + e.message);
        return null;
    }
}

function runProcedure(filePath, mode, procedureArgs) {
    try {
        if (!fso.FileExists(filePath)) {
            WScript.Echo("Error: File not found - " + filePath);
            return false;
        }
        
        var ext = fso.GetExtensionName(filePath).toLowerCase();
        var command = "";
        
        WScript.Echo("Running: " + filePath);
        WScript.Echo("Arguments: " + (procedureArgs || "(none)"));
        WScript.Echo("Mode: " + mode);
        
        // Всегда показываем вывод, но управляем поведением окна
        if (mode === "console") {
            // "Консольный" режим - запускаем в текущем окне
            switch(ext) {
                case "bat":
                case "cmd":
                    command = "\"" + filePath + "\" " + procedureArgs;
                    break;
                case "vbs":
                    command = "cscript.exe //nologo \"" + filePath + "\" " + procedureArgs;
                    break;
                case "js":
                    command = "cscript.exe //nologo \"" + filePath + "\" " + procedureArgs;
                    break;
                case "ps1":
                    command = "powershell.exe -ExecutionPolicy Bypass -File \"" + filePath + "\" " + procedureArgs;
                    break;
                case "exe":
                    command = "\"" + filePath + "\" " + procedureArgs;
                    break;
                default:
                    command = "\"" + filePath + "\" " + procedureArgs;
            }
            
            WScript.Echo("=== OUTPUT ===");
            // Запускаем процесс и перехватываем вывод
            var exec = shell.Exec(command);
            var output = "";
            while (!exec.StdOut.AtEndOfStream) {
                var line = exec.StdOut.ReadLine();
                WScript.Echo(line);
            }
            WScript.Echo("==============");
            
        } else {
            // "Оконный" режим - запускаем в новом окне
            switch(ext) {
                case "bat":
                case "cmd":
                    command = "cmd.exe /k \"\"" + filePath + "\" " + procedureArgs + "\"";
                    break;
                case "vbs":
                case "js":
                    command = "cmd.exe /k cscript.exe //nologo \"" + filePath + "\" " + procedureArgs;
                    break;
                case "ps1":
                    command = "powershell.exe -NoExit -ExecutionPolicy Bypass -File \"" + filePath + "\" " + procedureArgs;
                    break;
                case "exe":
                    command = "cmd.exe /k \"" + filePath + "\" " + procedureArgs;
                    break;
                default:
                    command = "cmd.exe /k \"" + filePath + "\" " + procedureArgs;
            }
            
            shell.Run(command, 1, true);
        }
        
        WScript.Echo("Procedure execution completed.");
        return true;
        
    } catch (e) {
        WScript.Echo("Error running procedure: " + e.message);
        return false;
    }
}

// Функция для удаления пробелов в начале и конце строки (аналог trim)
function trimString(str) {
    if (str == null || str == "") return "";
    // Удаляем пробелы в начале
    while (str.length > 0 && str.charAt(0) == ' ') {
        str = str.substring(1);
    }
    // Удаляем пробелы в конце
    while (str.length > 0 && str.charAt(str.length - 1) == ' ') {
        str = str.substring(0, str.length - 1);
    }
    return str;
}

function main() {
    var editFile = "";
    var runFile = "";
    var mode = "window";
    var fileType = "bat";
    var procedureArgs = [];
    
    // Сбор аргументов
    for (var i = 0; i < WScript.Arguments.length; i++) {
        var arg = WScript.Arguments(i);
        
        if (arg.indexOf("-edit:") === 0) {
            editFile = arg.substring(6);
        } else if (arg.indexOf("-run:") === 0) {
            runFile = arg.substring(5);
        } else if (arg.indexOf("-mode:") === 0) {
            mode = arg.substring(6);
        } else if (arg.indexOf("-type:") === 0) {
            fileType = arg.substring(6);
        } else if (arg.indexOf("-arg:") === 0) {
            var argument = arg.substring(5);
            procedureArgs.push(argument);
        } else if (arg === "-?" || arg === "-help") {
            showUsage();
            return;
        }
    }
    
    // Объединяем аргументы в строку
    var argsString = "";
    for (var j = 0; j < procedureArgs.length; j++) {
        // Добавляем кавычки вокруг каждого аргумента с пробелами
        if (procedureArgs[j].indexOf(" ") !== -1) {
            argsString += "\"" + procedureArgs[j] + "\" ";
        } else {
            argsString += procedureArgs[j] + " ";
        }
    }
    // Используем нашу функцию вместо trim()
    argsString = trimString(argsString);
    
    // Выполняем действие
    if (editFile) {
        var createdFile = editProcedure(editFile, fileType);
        if (createdFile && WScript.Arguments.length === 1) {
            var response = shell.Popup("Run the procedure now?", 0, "Procedure Manager", 4 + 32);
            if (response === 6) {
                runProcedure(createdFile, "window", "");
            }
        }
    } else if (runFile) {
        runProcedure(runFile, mode, argsString);
    } else {
        showUsage();
    }
}

if (WScript.Arguments.length === 0) {
    showUsage();
} else {
    main();
}