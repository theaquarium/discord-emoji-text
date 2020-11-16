const inputTextarea = document.querySelector('#input-textarea');
const emojiTextarea = document.querySelector('#emoji-textarea');
const discordTextarea = document.querySelector('#discord-textarea');
const convertButton = document.querySelector('#convert-button');
const notification = document.querySelector('#notification');

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js', {scope: './'})
        .then((reg) => {
            // registration worked
            console.log(`Registration succeeded. Scope is ${reg.scope}` );
        }).catch((error) => {
            // registration failed
            console.log(`Registration failed with ${error}`);
        });
}

const variationSelector = '️';
const toEmojiMapping = {
    a: ['🅰'],
    b: ['🅱'],
    c: ['🇨'],
    d: ['🇩'],
    e: ['🇪'],
    f: ['🇫'],
    g: ['🇬'],
    h: ['🇭'],
    i: ['ℹ️', '🇮'],
    j: ['🇯'],
    k: ['🇰'],
    l: ['🇱'],
    m: ['♏', 'Ⓜ️', '🇲'],
    n: ['🇳'],
    o: ['🅾️'],
    p: ['🅿️'],
    q: ['🇶'],
    r: ['🇷'],
    s: ['🇸'],
    t: ['🇹'],
    u: ['⛎', '🇺'],
    v: ['🇻'],
    w: ['🇼'],
    x: ['❎', '❌'],
    y: ['🇾'],
    z: ['🇿'],
    id: ['🆔'],
    off: ['📴'],
    vs: ['🆚'],
    ab: ['🆎'],
    cl: ['🆑'],
    sos: ['🆘'],
    100: ['💯'],
    '!': ['❗'],
    '!!': ['‼️'],
    '?': ['❓'],
    '!?': ['⁉️'],
    atm: ['🏧'],
    ok: ['🆗'],
    up: ['🆙'],
    cool: ['🆒'],
    new: ['🆕'],
    free: ['🆓'],
    0: ['0️⃣'],
    1: ['1️⃣'],
    2: ['2️⃣'],
    3: ['3️⃣'],
    4: ['4️⃣'],
    5: ['5️⃣'],
    6: ['6️⃣'],
    7: ['7️⃣'],
    8: ['8️⃣'],
    9: ['9️⃣'],
    10: ['🔟'],
    '*': ['*️⃣'],
    '#': ['#️⃣'],
};

const discordRepresentations = {
    '🅰': ':a:',
    '🅱': ':b:',
    '🇨': ':regional_indicator_c:',
    '🇩': ':regional_indicator_d:',
    '🇪': ':regional_indicator_e:',
    '🇫': ':regional_indicator_f:',
    '🇬': ':regional_indicator_g:',
    '🇭': ':regional_indicator_h:',
    'ℹ️': ':information_source:',
    '🇮': ':regional_indicator_i:',
    '🇯': ':regional_indicator_j:',
    '🇰': ':regional_indicator_k:',
    '🇱': ':regional_indicator_l:',
    '♏': ':scorpius:',
    'Ⓜ️': ':m:',
    '🇲': ':regional_indicator_m',
    '🇳': ':regional_indicator_n:',
    '🅾️': ':o2:',
    '🅿️': ':parking:',
    '🇶': ':regional_indicator_q:',
    '🇷': ':regional_indicator_r:',
    '🇸': ':regional_indicator_s:',
    '🇹': ':regional_indicator_t:',
    '⛎': ':ophiuchus:',
    '🇺': ':regional_indicator_u:',
    '🇻': ':regional_indicator_v:',
    '🇼': ':regional_indicator_w:',
    '❎': ':negative_squared_cross_mark:',
    '❌': ':x:',
    '🇾': ':regional_indicator_y:',
    '🇿': ':regional_indicator_z:',
    '🆔': ':id:',
    '📴': ':mobile_phone_off:',
    '🆚': ':vs:',
    '🆎': ':ab:',
    '🆑': ':cl:',
    '🆘': ':sos:',
    '💯': ':100:',
    '❗': ':exclamation:',
    '‼️': ':bangbang:',
    '❓': ':question:',
    '⁉️': ':interrobang:',
    '🏧': ':atm:',
    '🆗': ':ok:',
    '🆙': ':up:',
    '🆒': ':cool:',
    '🆕': ':new:',
    '🆓': ':free:',
    '0️⃣': ':zero:',
    '1️⃣': ':one:',
    '2️⃣': ':two:',
    '3️⃣': ':three:',
    '4️⃣': ':four:',
    '5️⃣': ':five:',
    '6️⃣': ':six:',
    '7️⃣': ':seven:',
    '8️⃣': ':eight:',
    '9️⃣': ':nine:',
    '🔟': ':ten:',
    '*️⃣': ':asterisk:',
    '#️⃣': ':hash:'
};

convertButton.addEventListener('click', () => {
    const text = inputTextarea.value;
    let emojiConversion = text;
    const sortedKeys = Object.keys(toEmojiMapping).sort((a, b) => b.length - a.length);
    sortedKeys.forEach((key) => {
        const stringKey = key.toString();
        const possibleMappings = toEmojiMapping[stringKey];
        const splitText = emojiConversion.split(stringKey);
        let emojiReplacement = '';
        for (let i = 0; i < splitText.length - 1; i += 1) {
            const nextSegment = splitText[i];
            if (!nextSegment.startsWith(variationSelector)) {
                let option;
                if (possibleMappings.length > 1) {
                    const isGood = Math.random() > 0.8;
                    if (isGood) {
                        option = possibleMappings[0];
                    } else {
                        option = possibleMappings[
                            Math.floor(Math.random() * (possibleMappings.length - 1)) + 1
                        ];
                    }
                } else {
                    option = possibleMappings[0];
                }
                emojiReplacement += `${nextSegment}${option} `;
            } else {
                emojiReplacement += `${nextSegment}${stringKey}`;
            }
        }
        emojiConversion = emojiReplacement + splitText[splitText.length - 1];
    });

    emojiTextarea.value = emojiConversion;

    let discordConversion = emojiConversion;
    Object.keys(discordRepresentations).forEach((key) => {
        discordConversion = discordConversion.replaceAll(key, discordRepresentations[key]);
    });

    discordTextarea.value = discordConversion;
});

let hideNotificationTimeout;
let hideNotificationVisibilityTimeout;

function hideNotification() {
    notification.style.right = `-${notification.clientWidth}px`;
    clearTimeout(hideNotificationVisibilityTimeout);
    hideNotificationVisibilityTimeout = setTimeout(() => {
        notification.style.visibility = 'hidden';
    }, 750);
}

function showNotification(notificationText) {
    document.querySelector('#notification-message').innerHTML = `${notificationText}`;
    notification.style.visibility = 'visible';
    notification.style.right = '1rem';
    clearTimeout(hideNotificationTimeout);
    clearTimeout(hideNotificationVisibilityTimeout);
    hideNotificationTimeout = setTimeout(hideNotification, 5000);
}

emojiTextarea.addEventListener('click', () => {
    copyTextToClipboard(emojiTextarea.value);
    showNotification('Emojis copied!');
});

discordTextarea.addEventListener('click', () => {
    copyTextToClipboard(discordTextarea.value);
    showNotification('Discord emojis copied!');
});

document.querySelector('#notification-close').addEventListener('click', () => {
    hideNotification();
});

// https://stackoverflow.com/a/30810322/8005366
function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;

    // Avoid scrolling to bottom
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        const successful = document.execCommand('copy');
        const msg = successful ? 'successful' : 'unsuccessful';
        console.log('Fallback: Copying text command was ' + msg);
    } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
    }

    document.body.removeChild(textArea);
}
function copyTextToClipboard(text) {
    if (!navigator.clipboard) {
        fallbackCopyTextToClipboard(text);
        return;
    }
    navigator.clipboard.writeText(text).then(() => {
        console.log('Async: Copying to clipboard was successful!');
    }, (err) => {
        console.error('Async: Could not copy text: ', err);
    });
}
