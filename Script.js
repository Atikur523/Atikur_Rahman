
const btn = document.querySelector('#btn');
const content = document.querySelector('#content');
const voice = document.querySelector('#voice');
const responseDiv = document.querySelector('#response');

// Function for speech synthesis (text-to-speech)
function speak(text) {
    const text_speak = new SpeechSynthesisUtterance(text);
    text_speak.lang = 'bn-BD'; // Bengali language
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.volume = 1;
    window.speechSynthesis.speak(text_speak);

    // Display the spoken text in the response div
    responseDiv.innerText = text;
}

// Greeting function
function wishMe() {
    let day = new Date();
    let hours = day.getHours();

    if (hours >= 0 && hours < 12) {
        speak('Good morning, sir!');
    } 
    else if (hours >= 12 && hours < 16) {
        speak('Good afternoon, sir!');
    } 
    else {
        speak('Good evening, sir!');
    }
}

// SpeechRecognition Setup
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (!SpeechRecognition) {
    alert('আপনার ব্রাউজার স্পিচ রিকগনিশন সমর্থন করে না। অনুগ্রহ করে Chrome বা Edge ব্যবহার করুন।');
}

const recognition = new SpeechRecognition();
recognition.lang = 'bn-BD';

recognition.onresult = (event) => {
    let currentIndex = event.resultIndex;
    let transcript = event.results[currentIndex][0].transcript;
    content.innerText = transcript;
    console.log('Transcript:', transcript); // Debugging
    takeCommand(transcript.toLowerCase());
};

btn.addEventListener('click', () => {
    btn.style.display = 'none';
    voice.style.display = 'block';

    try {
        recognition.start();
    } catch (err) {
        console.error('Recognition Error:', err);
        recognition.stop();
        recognition.start();
    }
});

// Process Commands
function takeCommand(message) {
    btn.style.display = 'flex';
    voice.style.display = 'none';
    console.log('Command Received:', message);

    if (message.includes('হ্যালো') || message.includes('আস্সালামুআলাইকুম')) {
        speak('হ্যালো স্যার, আপনাকে কীভাবে সাহায্য করতে পারি?');
    } 
    else if (message.includes('তুমি কে')) {
        speak('আমি রোবো অ্যাসিস্ট্যান্ট, তৈরি করেছেন আতিকুর রহমান রানা স্যার');
    } 
    else if (message.includes('ইউটিউব')) {
        speak('ইউটিউব খুলছি...');
        window.open('https://www.youtube.com/');
    } 
    else if (message.includes('ফেসবুক ')) {
        speak('ফেসবুক খুলছি...');
        window.open('https://www.facebook.com/');
    } 
    else if (message.includes('টুইটার')) {
        speak('টুইটার খুলছি...');
        window.open('https://x.com/?lang=en');
    } 
    else if (message.includes('ইন্সট্রাগ্রাম ')) {
        speak('ইন্সট্রাগ্রাম খুলছি...');
        window.open('https://www.instagram.com/');
    } 
    else if (message.includes('গুগল')) {
        speak('গুগল খুলছি...');
        window.open('https://www.google.com/');
    } 
    else if (message.includes('ক্যালকুলেটর')) {
        speak('ক্যালকুলেটর খুলছি...');
        window.open('file:///C:/Users/ATIKUR/AppData/Local/Temp/Rar$EXa732.32473.rartemp/calculator/index.html');
    } 
    else if (message.includes('সময়')) {
        const time = new Date().toLocaleTimeString('bn-BD', { hour: 'numeric', minute: 'numeric' });
        speak(`এখন সময় ${time}`);
    } 
    else if (message.includes('তারিখ')) {
        const date = new Date().toLocaleDateString('bn-BD', { day: 'numeric', month: 'short' });
        speak(`আজকের তারিখ ${date}`);
    } 
    // Default behavior for unknown questions
    else {
        speak('আমি ইন্টারনেট থেকে এই তথ্য পেয়েছি.');
        window.open(`https://www.google.com/search?q=${encodeURIComponent(message)}`);
    }
}
