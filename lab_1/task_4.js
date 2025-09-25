function checkTextValidity(text, maxLength) {
    return text.length <= maxLength && text.charAt(text.length - 1) === ".";
}

function checkLineLength(line, maxLineLength) {
    return line.length <= maxLineLength;
}

function trimLine(line) {
    var start = 0;
    var end = line.length - 1;
    while (start <= end && line.charAt(start) === " ") start++;
    while (end >= start && line.charAt(end) === " ") end--;
    return line.substring(start, end + 1);
}

function splitIntoWords(trimmedLine) {
    return trimmedLine.split(" ");
}

function isValidWord(word, maxWordLength, targetLetter) {
    if (word.length === 0) return false;
    
    var wordToCheck = removePunctuationFromEnd(word).toLowerCase();
    targetLetter = targetLetter.toLowerCase();
    
    if (wordToCheck.length > maxWordLength) return false;
    if (wordToCheck.length === 0) return false;
    
    return wordToCheck.charAt(wordToCheck.length - 1) === targetLetter;
}

function getCleanWord(word) {
    return removePunctuationFromEnd(word);
}

function findWordsEndingWithLetter(line, maxWordLength, targetLetter) {
    var trimmedLine = trimLine(line);
    var words = splitIntoWords(trimmedLine);
    var foundWords = [];
    
    for (var j = 0; j < words.length; j++) {
        if (isValidWord(words[j], maxWordLength, targetLetter)) {
            var wordToAdd = getCleanWord(words[j]);
            foundWords.push(wordToAdd);
        }
    }
    return foundWords;
}

function isPunctuation(char) {
    return char === "." || char === "," || char === "!" || char === "?" || char === ";";
}

function removePunctuationFromEnd(word) {
    var cleanedWord = word;
    while (cleanedWord.length > 0 && isPunctuation(cleanedWord.charAt(cleanedWord.length - 1))) {
        cleanedWord = cleanedWord.substring(0, cleanedWord.length - 1);
    }
    return cleanedWord;
}

var text = "Привет, мир!\nЭто красивый День, А.\nПогода, а!\nЛето А.";
var maxLength = 100; // NL
var maxLineLength = 40; // NS
var maxWordLength = 10; // NW
var targetLetter = "а";


if (!checkTextValidity(text, maxLength)) {
    WScript.Echo("Ошибка: текст превышает NL символов или не заканчивается точкой.");
    WScript.Quit(1);
}

var lines = text.split("\n");
var foundWords = [];
var wordCount = 0;

for (var i = 0; i < lines.length; i++) {
    if (!checkLineLength(lines[i], maxLineLength)) {
        WScript.Echo("Ошибка: строка " + (i + 1) + " превышает NS символов.");
        WScript.Quit(1);
    }
    var words = findWordsEndingWithLetter(lines[i], maxWordLength, targetLetter);
    foundWords = foundWords.concat(words);
    wordCount += words.length;
}

WScript.Echo("Исходный текст:\n" + text);
WScript.Echo("Найденные слова: " + foundWords.join(", "));
WScript.Echo("Количество слов: " + wordCount);