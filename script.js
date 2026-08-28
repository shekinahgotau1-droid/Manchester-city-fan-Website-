// ======================================================
// FIREBASE
// ======================================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";


// ======================================================
// FIREBASE CONFIG
// ======================================================

const firebaseConfig = {

    // ⚠️ REPLACE THIS WITH YOUR REAL FIREBASE API KEY
    apiKey: "YOUR_REAL_FIREBASE_API_KEY",

    authDomain: "manchester-city-website-2db74.firebaseapp.com",

    projectId: "manchester-city-website-2db74",

    storageBucket: "manchester-city-website-2db74.firebasestorage.app",

    messagingSenderId: "260655316074",

    appId: "1:260655316074:web:c5073dcbda3a0fc91d9e13"

};


const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

console.log("🔥 Firebase connected!");


// ======================================================
// CITY AI
// ======================================================

window.sendMessage = function () {

    const input =
        document.getElementById("user-input");

    const messages =
        document.getElementById("messages");


    if (!input || !messages) {

        alert("AI chat box was not found.");

        return;

    }


    const question =
        input.value.trim();


    if (question === "") {

        return;

    }


    // USER MESSAGE

    const userMessage =
        document.createElement("div");

    userMessage.className =
        "user-message";

    userMessage.textContent =
        "You: " + question;

    messages.appendChild(userMessage);


    // AI RESPONSE

    const aiMessage =
        document.createElement("div");

    aiMessage.className =
        "ai-message";

    aiMessage.textContent =
        "🤖 City AI: " +
        getCityAIResponse(question);

    messages.appendChild(aiMessage);


    input.value = "";

    messages.scrollTop =
        messages.scrollHeight;

};


// ======================================================
// AI RESPONSES
// ======================================================

function getCityAIResponse(question) {

    const q =
        question.toLowerCase();


    if (
        q.includes("hello") ||
        q.includes("hi") ||
        q.includes("hey")
    ) {

        return "Hello, Cityzen! 💙 How can I help you?";

    }


    if (q.includes("haaland")) {

        return "Erling Haaland is Manchester City's number 9 striker. ⚽💙";

    }


    if (q.includes("foden")) {

        return "Phil Foden is a Manchester City midfielder who came through the club's academy. 💙";

    }


    if (
        q.includes("guardiola") ||
        q.includes("pep")
    ) {

        return "Pep Guardiola is Manchester City's manager. 🔵";

    }


    if (
        q.includes("stadium") ||
        q.includes("etihad")
    ) {

        return "Manchester City play their home matches at the Etihad Stadium. 🏟️";

    }


    if (
        q.includes("trophy") ||
        q.includes("trophies")
    ) {

        return "Manchester City have won major trophies including the Premier League, FA Cup, League Cup and Champions League. 🏆";

    }


    if (q.includes("champions league")) {

        return "Manchester City won their first UEFA Champions League in 2023. 🏆";

    }


    if (
        q.includes("manchester united") ||
        q.includes("united")
    ) {

        return "Manchester City and Manchester United are rivals in the Manchester derby. 🔵🔴";

    }


    if (q.includes("best player")) {

        return "That's a difficult question! City have many excellent players, and different fans have different favourites. 💙";

    }


    return "I'm still learning! 🤖 Try asking about Haaland, Foden, Guardiola, the Etihad, trophies or the Champions League.";

}


// ======================================================
// COMMUNITY
// ======================================================

window.addCommunityPost = async function () {

    const nameInput =
        document.getElementById("communityName");

    const textInput =
        document.getElementById("communityText");


    const name =
        nameInput.value.trim();

    const text =
        textInput.value.trim();


    if (name === "" || text === "") {

        alert("Please enter your name and message.");

        return;

    }


    try {

        // SAVE POST TO FIREBASE

        await addDoc(
            collection(db, "communityPosts"),
            {

                name: name,

                text: text,

                likes: 0,

                createdAt: serverTimestamp()

            }
        );


        // Clear inputs

        nameInput.value = "";

        textInput.value = "";


        alert("💙 Your post has been added to the community!");


        // Reload posts

        loadCommunityPosts();


    } catch (error) {

        console.error(
            "Community error:",
            error
        );

        alert(
            "❌ Could not post. Check your Firebase setup."
        );

    }

};


// ======================================================
// LOAD COMMUNITY POSTS
// ======================================================

async function loadCommunityPosts() {

    const posts =
        document.getElementById("communityPosts");


    if (!posts) {

        return;

    }


    try {

        const snapshot =
            await getDocs(
                collection(db, "communityPosts")
            );


        posts.innerHTML = "";


        if (snapshot.empty) {

            posts.innerHTML =
                "<p>No posts yet. Be the first Cityzen to post! 💙</p>";

            return;

        }


        snapshot.forEach((doc) => {

            const data =
                doc.data();


            createCommunityPost(

                doc.id,

                data.name || "Cityzen",

                data.text || "",

                data.likes || 0

            );

        });


    } catch (error) {

        console.error(
            "Error loading community:",
            error
        );

        posts.innerHTML =
            "<p>❌ Could not load community posts.</p>";

    }

}


// ======================================================
// CREATE COMMUNITY POST
// ======================================================

function createCommunityPost(
    id,
    name,
    text,
    likes
) {

    const posts =
        document.getElementById("communityPosts");


    const post =
        document.createElement("div");

    post.className =
        "community-post";


    // NAME

    const nameElement =
        document.createElement("strong");

    nameElement.textContent =
        name;


    // MESSAGE

    const textElement =
        document.createElement("p");

    textElement.textContent =
        text;


    // LIKE BUTTON

    const likeButton =
        document.createElement("button");

    likeButton.type =
        "button";

    likeButton.innerHTML =
        "❤️ " + likes;


    likeButton.onclick =
        function () {

            likes++;

            likeButton.innerHTML =
                "❤️ " + likes;

        };


    // REPLY BUTTON

    const replyButton =
        document.createElement("button");

    replyButton.type =
        "button";

    replyButton.textContent =
        "💬 Reply";


    replyButton.onclick =
        function () {

            showReplyBox(post);

        };


    // REPLIES

    const replies =
        document.createElement("div");

    replies.className =
        "community-replies";


    post.appendChild(nameElement);

    post.appendChild(textElement);

    post.appendChild(likeButton);

    post.appendChild(replyButton);

    post.appendChild(replies);


    posts.appendChild(post);

}


// ======================================================
// REPLY
// ======================================================

function showReplyBox(post) {

    const replies =
        post.querySelector(
            ".community-replies"
        );


    // Don't create multiple boxes

    if (
        replies.querySelector("input")
    ) {

        return;

    }


    const input =
        document.createElement("input");

    input.type =
        "text";

    input.placeholder =
        "Write a reply...";


    const button =
        document.createElement("button");

    button.type =
        "button";

    button.textContent =
        "Reply";


    button.onclick =
        function () {

            const text =
                input.value.trim();


            if (text === "") {

                return;

            }


            const reply =
                document.createElement("p");

            reply.textContent =
                "↳ " + text;


            replies.appendChild(reply);


            input.remove();

            button.remove();

        };


    replies.appendChild(input);

    replies.appendChild(button);

}


// ======================================================
// OLD COMMENTS
// ======================================================

window.likeComment = function (button) {

    const span =
        button.querySelector("span");


    let likes =
        Number(span.textContent);


    likes++;


    span.textContent =
        likes;

};


window.replyToComment = function (button) {

    const comment =
        button.parentElement;


    const replyBox =
        comment.querySelector(".replyBox");


    if (replyBox.querySelector("input")) {

        return;

    }


    const input =
        document.createElement("input");

    input.type =
        "text";

    input.placeholder =
        "Write a reply...";


    const replyButton =
        document.createElement("button");

    replyButton.type =
        "button";

    replyButton.textContent =
        "Reply";


    replyButton.onclick =
        function () {

            const text =
                input.value.trim();


            if (text === "") {

                return;

            }


            const reply =
                document.createElement("p");

            reply.textContent =
                "↳ " + text;


            replyBox.appendChild(reply);


            input.remove();

            replyButton.remove();

        };


    replyBox.appendChild(input);

    replyBox.appendChild(replyButton);

};


// ======================================================
// START COMMUNITY
// ======================================================

loadCommunityPosts();

console.log(
    "🤖 City AI + 💬 Community are ready!"
);