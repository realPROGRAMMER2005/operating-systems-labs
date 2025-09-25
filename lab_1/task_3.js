function calculateAn(n, p) {
    return 1 / (Math.pow(n, p) * Math.sin(3.1415 / n));
}

var n = 5;
var p = 2;
var sum = 0;

for (var k = 1; k <= n; k++) {
    var term = calculateAn(k, p);
    sum += term;
}

WScript.Echo(sum);