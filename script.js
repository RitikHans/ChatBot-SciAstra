const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".close-btn");
const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");

let userMessage = null; // Variable to store the user's message
const inputInitHeight = chatInput.scrollHeight;

const featuredQuestions = [
    { question: "What is SciAstra about?", answer: "SciAstra is a platform dedicated to advancing scientific research and education through innovative solutions." },
    { question: "How can I contribute to SciAstra's mission?", answer: "You can contribute by participating in research projects, sharing knowledge, or supporting our initiatives." },
    { question: "What fields does SciAstra cover?", answer: "SciAstra covers a wide range of scientific disciplines, including physics, chemistry, biology, and more." },
    { question: "Are there opportunities for student researchers?", answer: "Yes, SciAstra provides opportunities for students to engage in research projects and gain valuable experience." },
    { question: "Can I submit my research work to SciAstra?", answer: "Absolutely! SciAstra welcomes research submissions from scientists and researchers around the world." },
    { question: "How does SciAstra support STEM education?", answer: "SciAstra offers educational resources, workshops, and programs to promote STEM (Science, Technology, Engineering, and Mathematics) education." },
    { question: "Tell me about SciAstra's upcoming events.", answer: "Explore our events page for information on upcoming conferences, webinars, and scientific gatherings." },
    { question: "How does SciAstra leverage technology in science?", answer: "SciAstra integrates cutting-edge technologies to enhance research methodologies and scientific exploration." },
    { question: "Is SciAstra involved in community outreach programs?", answer: "Yes, SciAstra actively participates in community outreach to promote science awareness and education." },
    { question: "Can I access research papers through SciAstra?", answer: "SciAstra provides access to a vast repository of research papers and scientific publications." },
    { question: "What collaborations has SciAstra established?", answer: "SciAstra collaborates with renowned institutions, researchers, and organizations globally to foster scientific advancements." },
    { question: "How can educators integrate SciAstra into their curriculum?", answer: "Educators can incorporate SciAstra's resources and projects to enrich their STEM curriculum." },
    { question: "What role does SciAstra play in environmental research?", answer: "SciAstra actively supports research initiatives focused on environmental conservation and sustainability." },
    { question: "Are there mentorship programs available at SciAstra?", answer: "SciAstra offers mentorship programs connecting experienced researchers with aspiring scientists." },
    { question: "How can I stay updated on SciAstra's latest developments?", answer: "Stay informed by subscribing to our newsletter and following SciAstra on social media for the latest news and updates." },
];

const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", `${className}`);
    let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi;
}

const generateResponse = (chatElement) => {
    const messageElement = chatElement.querySelector("p");

    const featuredAnswer = featuredQuestions.find(({ question }) => userMessage.toLowerCase() === question.toLowerCase());

    if (featuredAnswer) {
        messageElement.textContent = featuredAnswer.answer;
    } else {
        messageElement.classList.add("error");
        messageElement.textContent = "I'm sorry, I didn't understand that. Can you please ask another question?";
        chatbox.scrollTo(0, chatbox.scrollHeight);
    }
}

const handleChat = () => {
    userMessage = chatInput.value.trim();
    if (!userMessage) return;

    chatInput.value = "";
    chatInput.style.height = `${inputInitHeight}px`;

    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);

    setTimeout(() => {
        const incomingChatLi = createChatLi("Thinking...", "incoming");
        chatbox.appendChild(incomingChatLi);
        chatbox.scrollTo(0, chatbox.scrollHeight);
        generateResponse(incomingChatLi);
    }, 600);
}

chatInput.addEventListener("input", () => {
    chatInput.style.height = `${inputInitHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
        e.preventDefault();
        handleChat();
    }
});

sendChatBtn.addEventListener("click", handleChat);
closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));
