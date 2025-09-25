var x = 2;
var sum = 0;
var n = 5;
for (var k = 1; k <= n; k++) {
    var factKMinus1 = 1;
    for (var i = 2; i <= k - 1; i++) {
        factKMinus1 *= i;
    }
    var fact2K = 1;
    for (var i = 2; i <= 2 * k; i++) {
        fact2K *= i;
    }
    var power2Kx = 1;
    for (var i = 0; i < 2 * k; i++) {
        power2Kx *= x;
    }
    var term = (factKMinus1 * factKMinus1 / fact2K) * power2Kx;
    sum += term;
}
WScript.Echo(sum);