document.addEventListener('DOMContentLoaded', () => {

    // --- Caesar Cipher Logic ---
    const caesarInput = document.getElementById('caesar-input');
    const caesarKey = document.getElementById('caesar-key');
    const caesarEncryptBtn = document.getElementById('caesar-encrypt');
    const caesarDecryptBtn = document.getElementById('caesar-decrypt');
    const caesarOutput = document.getElementById('caesar-output');

    const caesarCipher = (text, shift, decrypt = false) => {
        return text.split('').map(char => {
            if (char.match(/[a-z]/i)) {
                const code = char.charCodeAt(0);
                const isUpperCase = char === char.toUpperCase();
                const base = isUpperCase ? 65 : 97;

                let processedShift = decrypt ? (26 - shift) : shift;

                const newCode = ((code - base + processedShift) % 26) + base;
                return String.fromCharCode(newCode);
            }
            return char;
        }).join('');
    };

    caesarEncryptBtn.addEventListener('click', () => {
        const text = caesarInput.value;
        const shift = parseInt(caesarKey.value, 10);
        caesarOutput.value = caesarCipher(text, shift);
    });

    caesarDecryptBtn.addEventListener('click', () => {
        const text = caesarInput.value;
        const shift = parseInt(caesarKey.value, 10);
        // Decryption is encryption with a negative shift. We handle this in the function.
        caesarOutput.value = caesarCipher(text, shift, true);
    });


    // --- Vigenère Cipher Logic ---
    const vigenereInput = document.getElementById('vigenere-input');
    const vigenereKey = document.getElementById('vigenere-key');
    const vigenereEncryptBtn = document.getElementById('vigenere-encrypt');
    const vigenereDecryptBtn = document.getElementById('vigenere-decrypt');
    const vigenereOutput = document.getElementById('vigenere-output');

    const vigenereCipher = (text, key, decrypt = false) => {
        if (!key) {
            alert('Please enter a keyword for the Vigenère cipher.');
            return '';
        }

        const keyUpper = key.toUpperCase().replace(/[^A-Z]/g, '');
        let keyIndex = 0;

        return text.split('').map(char => {
            if (char.match(/[a-z]/i)) {
                const code = char.charCodeAt(0);
                const isUpperCase = char === char.toUpperCase();
                const base = isUpperCase ? 65 : 97;

                const keyChar = keyUpper[keyIndex % keyUpper.length];
                const shift = keyChar.charCodeAt(0) - 65; // A=0, B=1...
                keyIndex++;

                let processedShift = decrypt ? (26 - shift) : shift;

                const newCode = ((code - base + processedShift) % 26) + base;
                return String.fromCharCode(newCode);
            }
            return char;
        }).join('');
    };

    vigenereEncryptBtn.addEventListener('click', () => {
        const text = vigenereInput.value;
        const key = vigenereKey.value;
        vigenereOutput.value = vigenereCipher(text, key);
    });

    vigenereDecryptBtn.addEventListener('click', () => {
        const text = vigenereInput.value;
        const key = vigenereKey.value;
        vigenereOutput.value = vigenereCipher(text, key, true);
    });
});