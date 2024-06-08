function toggleAnswer(id) {
    var answer = document.getElementById(id);
    var questionBox = document.querySelector(".question-box[onclick*='" + id + "']");
    var answers = document.getElementsByClassName("answer");

    if (answer.style.display === "none" || answer.style.display === "") {
        for (var i = 0; i < answers.length; i++) {
            answers[i].style.display = "none";
        }
        answer.style.display = "block";
        document.body.classList.add("active-answer");
        questionBox.classList.add("active");
    } else {
        answer.style.display = "none";
        document.body.classList.remove("active-answer");
        questionBox.classList.remove("active");
    }
}

function incrementCounter(id) {
    var counter = document.getElementById(id);
    counter.innerText = parseInt(counter.innerText) + 1;
}

function decrementCounter(id) {
    var counter = document.getElementById(id);
    var count = parseInt(counter.innerText);
    if (count > 0) {
        counter.innerText = count - 1;
    }
}

function resetCounter(id) {
    var counter = document.getElementById(id);
    counter.innerText = 0;
}

function toggleScript() {
    var scriptContainer = document.getElementById('script-container');
    if (scriptContainer.style.display === "none") {
        scriptContainer.style.display = "flex";
    } else {
        scriptContainer.style.display = "none";
    }
}
