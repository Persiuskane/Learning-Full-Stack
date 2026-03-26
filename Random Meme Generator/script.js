// Selecting the Buttons
const showMemeBtn = document.querySelector("meme");;
const showJokeBtn = document.getElementById("joke");
const showQuoteBtn = document.getElementById("quote");
const showRiddleBtn = document.getElementById("riddle");
const showAnswerBtn = document.getElementById("answer");

let riddleNumber = null;

const memes = [
    "https://m.media-amazon.com/images/M/MV5BZTI4ZGMxN2UtODlkYS00MTBjLWE1YzctYzc3NDViMGI0ZmJmXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    "https://upload.wikimedia.org/wikipedia/en/6/60/Frieren_Beyond_Journey%27s_End.jpg",
    "https://static.wikia.nocookie.net/frieren/images/3/35/Frieren_anime_profile.png/revision/latest?cb=20230521074853",
]

const jokes = [
    "Why don't scientists trust atoms? Because they make up everything!",
    "Why did the scarecrow win an award? He was outstanding in his field!",
    "What do you call a fake noodle? An impasta!",
    "Why don't eggs tell jokes? They'd crack each other up!",
    "What did one ocean say to the other ocean? Nothing, they just waved!",
    "Why did the coffee file a police report? It got mugged!",
    "What do you call a bear with no teeth? A gummy bear!",
    "Why did the cookie go to the doctor? Because it felt crumbly!",
    "What did the big flower say to the little flower? Hi, bud!",
    "Why don't skeletons fight each other? They don't have the guts!"
]

const quotes = [
    "Do not believe anything merely because you have heard it... But when you yourselves know that these things are bad, then reject them and abandon them. - Buddha",
    "Health is the greatest gift, contentment the greatest wealth, faithfulness the best relationship. - Buddha",
    "Mindfulness is the path to the Deathless. Heedlessness is the path to death. - Dhammapada",
    "You yourself, as much as anybody in the entire universe, deserve your love and affection. - Buddha",
    "Understanding the self is the beginning of wisdom. - Theravada Teaching",
    "Better than a thousand hollow words, is one word that brings peace. - Dhammapada",
    "Attachment is the root of suffering. - Core Buddhist Teaching",
    "The mind is everything. What you think you become. - Buddha",
    "Let yourself be silently drawn by the strange pull of what you really love. - Rumi (Sufi, but universal wisdom)",
    "Patience is not an absence of action; rather it is 'timing' - it waits on the right time to act. - The Bhagavad Gita adapted to Theravada understanding"
]

const riddles = [
    { riddle: "I speak without a mouth and hear without ears. I have no body, but I come alive with wind. What am I?", answer: "An echo" },
    { riddle: "The more you take, the more you leave behind. What am I?", answer: "Footprints" },
    { riddle: "I have cities, but no houses. I have mountains, but no trees. I have water, but no fish. What am I?", answer: "A map" },
    { riddle: "I am taken from a mine and shut up in a wooden case, from which I am never released, yet I am used by almost everyone. What am I?", answer: "Pencil lead/graphite" },
    { riddle: "What gets wetter the more it dries?", answer: "A towel" },
    { riddle: "I have keys, but no locks. I have space, but no room. You can enter, but you can't go outside. What am I?", answer: "A keyboard" },
    { riddle: "What has a head and a tail, but no body?", answer: "A coin" },
    { riddle: "I am not alive, but I grow. I don't have lungs, but I need air. What am I?", answer: "Fire" },
    { riddle: "What English word is both a noun and a verb, yet if you spell it backwards it becomes an adjective?", answer: "Evil (live spelled backwards means lively/alive)" },
    { riddle: "I am an odd number and if you take away one letter from me, I become even. What am I?", answer: "Seven (remove the 's')" },
    { riddle: "I am invisible, can travel at the speed of light, and can bend around objects. What am I?", answer: "Light" },
    { riddle: "What can break, but never falls, and what can fall, but never breaks?", answer: "Day and night" },
    { riddle: "I have a face and two hands, but no arms or legs. What am I?", answer: "A clock" },
    { riddle: "The more of this there is, the less you see. What am I?", answer: "Darkness" },
    { riddle: "What has a neck but no head?", answer: "A bottle" },
    { riddle: "I am always coming but never arrive. What am I?", answer: "Tomorrow" },
    { riddle: "What question can you never answer 'yes' to?", answer: "Are you asleep?" },
    { riddle: "I am not made of atoms, yet I have a mass. I have no form, but I take up space. I am infinite yet can fit in your hand. What am I?", answer: "Infinity/knowledge/time (conceptual answer)" },
    { riddle: "I contain cities, but not houses. I contain forests, but not trees. I contain water, but not fish. What am I?", answer: "A globe" },
    { riddle: "What is seen in the middle of March and April that can't be seen at the beginning or end of either month?", answer: "The letter 'R'" }
]

// Add Element Function
function addElement(element,elementId,content,appendAfterId){
    let newContent; 
    const oldElement =  document.getElementById(elementId);
    const appendAfter = document.getElementById(appendAfterId);
    const parentDiv = appendAfter.parentNode;
    console.log(appendAfter);
    
    // Search the Element is their
    if (oldElement === null) {
        const newElement = document.createElement(element);
        newElement.setAttribute('id',elementId);
        if (element === "img") {
            newElement.setAttribute("src",content);
            newElement.setAttribute("width","300");         
        } else {
            newContent = document.createTextNode(content);
            newElement.appendChild(newContent);
        }
        
        parentDiv.insertBefore(newElement,appendAfter.nextSibling);
    }else {
        if (element === "img"){
            oldElement.setAttribute("src",content);
        }else {
            oldElement.textContent = content;
        }            
    }
    
    return 0;
}

// Generate a Random Number
function randomNumber(max){
    return Math.floor(Math.random() * max)
}

// Show Meme Function
function showMemeFunc(){
    const memeNumber = randomNumber(memes.length);
    addElement("img","memeImg",memes[memeNumber],"memeHead");
}

// Show Joke Function
function showJokeFunc(){
    const jokeNumber = randomNumber(jokes.length);
    addElement("p","jokeText",jokes[jokeNumber],"jokeHead");
}

// Show Quote Function
function showQuoteFunc(){
    const quoteNumber = randomNumber(jokes.length);
    addElement("p","quoteText",quotes[quoteNumber],"quoteHead");
}

// Show Riddle Function
function showRiddleFunc(){
    riddleNumber = randomNumber(jokes.length);
    addElement("p","riddleText",riddles[riddleNumber].riddle,"riddleHead");
}

// Show Answer Function
function showAnswerFunc(){
    if(riddleNumber !== null){
        addElement("p","answerText",riddles[riddleNumber].answer,"riddleText");
        
    }else {
        alert("Please Look at a Riddle First");
    }
}