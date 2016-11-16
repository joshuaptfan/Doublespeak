var safe = false; // if true, accomodate X11 clipboard limitations

function embedString() {
    var decoyStr = document.getElementById('out-decoy').value,
        encodedStr = encodeString('STR\0' + document.getElementById('out-secret').value),
        outputStr = '',
        i = 0,
        j = 0;
    while (i < decoyStr.length-1) {
        outputStr += decoyStr[i++];
        for (; j < i * 10; j++)
            if (encodedStr[j])
                outputStr += encodedStr[j];
    }
    if (!safe) {
        if (j < encodedStr.length)
            outputStr += encodedStr.slice(j);
    } else {
        var warn = document.getElementById('warn');
        if (j < encodedStr.length) {
            warn.style.opacity = 1;
            warn.innerHTML = 'Please provide ' + Math.ceil(encodedStr.slice(j).length / 10) + ' more characters of decoy text to store entire message.';
        } else
            warn.style.opacity = 0;
    }
    if (decoyStr.length > 0)
        outputStr += decoyStr[i];
    document.getElementById('out-text').value = outputStr;
}

function encodeString(str) {
    var strBytes = stringToBytes(str),
        outputStr = '',
        encodingChars = [
            '\u200B', // zero width space
            '\u200C', // zero width non-joiner
            '\u200D', // zero width joiner
            '\uFEFF'  // zero width non-breaking space
        ];
    for (var i = 0, sLen = str.length; i < sLen; i++)
        for (var j = 6; j >= 0; j -= 2)
            outputStr += encodingChars[(strBytes[i] >> j) & 0x3];
    return outputStr;
}

function decodeString() {
    window.setTimeout(function(){
        var secretStr = document.getElementById('in-text').value.match(/[\u200B\u200C\u200D\uFEFF]/g),
            outputStr = '',
            encodingVals = {
                '\u200B':0,
                '\u200C':1,
                '\u200D':2,
                '\uFEFF':3
            };
        if (secretStr != null) {
            for (var i = 0, sLen = secretStr.length; i < sLen; i += 4) {
                var charCode = 0;
                for (var j = 0; j < 4; j++) {
                    charCode += encodingVals[secretStr[i + j]] << (6 - j * 2);
                }
                outputStr += String.fromCharCode(charCode);
            }
        }
        if (outputStr.slice(0, 4) == 'STR\0')
            document.getElementById('in-secret').value = outputStr.slice(4);
        else
            console.log('File extraction is not supported at this time.')
    }, 1);
}

// Credit: http://stackoverflow.com/questions/1240408/reading-bytes-from-a-javascript-string
function stringToBytes(str) {
    var byteArray = [];
    for (var i = 0; i < str.length; i++)
        if (str.charCodeAt(i) <= 0x7F)
            byteArray.push(str.charCodeAt(i));
        else {
            var h = encodeURIComponent(str.charAt(i)).substr(1).split('%');
            for (var j = 0; j < h.length; j++)
                byteArray.push(parseInt(h[j], 16));
        }
    return byteArray;
};

function scale() {
    document.body.style.fontSize = window.innerWidth * 0.02 + 'px';
}

function resizeTextarea(el) {
    el.style.height = '';
    el.style.height = Math.min(el.scrollHeight, document.body.style.fontSize.slice(0,-2) * 12) + 'px';
}

document.onreadystatechange = function() {
    scale();
    document.getElementById('out-secret').addEventListener('keyup', embedString, false);
    document.getElementById('out-decoy').addEventListener('keyup', embedString, false);
    new Clipboard('.copy');

    if (navigator.userAgent.test(/Mac|iP(hone|od|ad)/)) {
        document.getElementById('in-text').placeholder = 'Paste [Command+V] here';
        document.getElementById('out-text').placeholder = 'Copy [Command+C] this text';
    }
}