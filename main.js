const main = document.getElementById("main");
const polls = main.children;
const adminButton = document.getElementById("adminButton");
adminButton.addEventListener("click", adminToggle);
const createButton = document.getElementById("create");
createButton.addEventListener("click", createPoll);

let polldata = [];

let adminMode = false;

for (let i = 0; i < polls.length; i++) {
    const element = polls[i];
    element.addEventListener("click", () => {activate(i.toString())});
}

function loadPolls() {
    let loadedData = JSON.parse(localStorage.getItem("polldata"));

    if (loadedData == null) {
        return;
    }

    polldata = loadedData;

    for (let i = 0; i < polldata.length; i++) {
        const poll = polldata[i];
        addPoll(poll.title, poll.desc, poll.option1, poll.option2, poll.option3, poll.option4);
        updateVotes(i + 1);
    }
}

function createPoll(event) {
    event.preventDefault();

    const title = document.getElementById("newTitle").value;
    const desc = document.getElementById("newDesc").value;
    const option1 = document.getElementById("option1").value;
    const option2 = document.getElementById("option2").value;
    const option3 = document.getElementById("option3").value;
    const option4 = document.getElementById("option4").value;

    polldata.push({title: title, desc: desc, option1: option1, option2: option2, option3: option3, option4: option4, votes1: 0, votes2: 0, votes3: 0, votes4: 0});
    
    if (title == "" || option1 == "" || option2 == "") {
        alert("Äänestys tarvitsee otsikon ja kaksi vaihtoehtoa");
        return;
    }

    addPoll(title, desc, option1, option2, option3, option4);
}

function deletePoll(number) {
    polls[number].remove();
    polldata.splice(number - 1, 1);
    
    localStorage.setItem("polldata", JSON.stringify(polldata));
}

function addPoll(title, desc, option1, option2, option3, option4) {
    const number = polls.length;

    const pollElement = document.createElement("div");
    pollElement.setAttribute("class", "box");

    const titleElement = document.createElement("h2");
    titleElement.setAttribute("class", "title");
    titleElement.innerText = title;
    pollElement.appendChild(titleElement);

    if (desc != "") {
        const descElement = document.createElement("p");
        descElement.setAttribute("class", "desc");
        descElement.innerText = desc;
        pollElement.appendChild(descElement);
    }

    const votesElement = document.createElement("div");
    votesElement.setAttribute("class", "hidden");
    pollElement.appendChild(votesElement);

    votesElement.appendChild(addOption(option1, 1, number));
    votesElement.appendChild(addOption(option2, 2, number));
    if (option3 != "") {
        votesElement.appendChild(addOption(option3, 3, number));
    }
    if (option4 != "") {
        votesElement.appendChild(addOption(option4, 4, number));
    }

    const deleteButton = document.createElement("button");
    deleteButton.setAttribute("class", "delete");
    deleteButton.innerText = "Poista äänestys";
    votesElement.appendChild(deleteButton);
    deleteButton.addEventListener("click", () => {deletePoll(number)});

    if (!adminMode) {
        deleteButton.setAttribute("class", "delete hidden");
    }
    
    pollElement.addEventListener("click", () => activate(number.toString()));
    main.appendChild(pollElement);
    localStorage.setItem("polldata", JSON.stringify(polldata));
}

function addOption(name, number, poll) {
    const optionElement = document.createElement("div");
    const voteContainer = document.createElement("div");
    voteContainer.setAttribute("class", "flex");
    optionElement.appendChild(voteContainer);
    const voteButton = document.createElement("button");
    voteButton.innerText = name;
    voteContainer.appendChild(voteButton);
    const voteAmount = document.createElement("p");
    voteAmount.setAttribute("class", "voteAmount");
    voteAmount.innerText = "0 ääntä - 0%";
    voteContainer.appendChild(voteAmount);
    const barContainer = document.createElement("div");
    barContainer.setAttribute("class", "bar");
    optionElement.appendChild(barContainer);
    const bar = document.createElement("div");
    
    voteButton.addEventListener("click", () => {vote(poll, number)});
    switch (number) {
        case 1:
            bar.setAttribute("class", "red");
            break;
        case 2:
            bar.setAttribute("class", "blue");
            break;
        case 3:
            bar.setAttribute("class", "green");
            break;
        case 4:
            bar.setAttribute("class", "yellow");
            break;
    }

    bar.setAttribute("style", "width: 0%");
    barContainer.appendChild(bar);

    return optionElement;
}

function vote(poll, option) {
    switch (option) {
        case 1:
            polldata[poll - 1].votes1 += 1;
            break;
        case 2:
            polldata[poll - 1].votes2 += 1;
            break;
        case 3:
            polldata[poll - 1].votes3 += 1;
            break;
        case 4:
            polldata[poll - 1].votes4 += 1;
            break;
    }

    updateVotes(poll);
    
    localStorage.setItem("polldata", JSON.stringify(polldata));
}

function updateVotes(poll) {
    const totalVotes = polldata[poll - 1].votes1 + polldata[poll - 1].votes2 + polldata[poll - 1].votes3 + polldata[poll - 1].votes4;

    if (totalVotes == 0) {
        return;
    }

    const votes1percent = polldata[poll - 1].votes1 / totalVotes * 100;
    const votes2percent = polldata[poll - 1].votes2 / totalVotes * 100;
    const votes3percent = polldata[poll - 1].votes3 / totalVotes * 100;
    const votes4percent = polldata[poll - 1].votes4 / totalVotes * 100;

    const votes1Amount = polls[poll].lastElementChild.children[0].firstElementChild.lastElementChild;
    const votes1bar = polls[poll].lastElementChild.children[0].lastElementChild.firstElementChild;
    votes1Amount.innerText = polldata[poll - 1].votes1 + " ääntä - " + votes1percent.toFixed(0) + "%";
    votes1bar.setAttribute("style", "width: " + votes1percent + "%");

    const votes2Amount = polls[poll].lastElementChild.children[1].firstElementChild.lastElementChild;
    votes2Amount.innerText = polldata[poll - 1].votes2 + " ääntä - " + votes2percent.toFixed(0) + "%";
    const votes2bar = polls[poll].lastElementChild.children[1].lastElementChild.firstElementChild;
    votes2bar.setAttribute("style", "width: " + votes2percent + "%");

    if (polldata[poll - 1].option3 != "") {
        const votes3Amount = polls[poll].lastElementChild.children[2].firstElementChild.lastElementChild;
        votes3Amount.innerText = polldata[poll - 1].votes3 + " ääntä - " + votes3percent.toFixed(0) + "%";
        const votes3bar = polls[poll].lastElementChild.children[2].lastElementChild.firstElementChild;
        votes3bar.setAttribute("style", "width: " + votes3percent + "%");
    }
    
    if (polldata[poll - 1].option4 != "") {
        const votes4Amount = polls[poll].lastElementChild.children[3].firstElementChild.lastElementChild;
        votes4Amount.innerText = polldata[poll - 1].votes4 + " ääntä - " + votes4percent.toFixed(0) + "%";
        const votes4bar = polls[poll].lastElementChild.children[3].lastElementChild.firstElementChild;
        votes4bar.setAttribute("style", "width: " + votes4percent + "%");
    }
}

function activate(number) {
    for (let i = 0; i < polls.length; i++) {
        const poll = polls[i].lastElementChild;
        poll.setAttribute("class", "hidden");
    }

    const votesElement = polls[number].lastElementChild;
    votesElement.setAttribute("class", "votes");
}

function adminToggle() {
    adminMode = !adminMode;

    const deleteButtons = document.getElementsByClassName("delete");

    if (adminMode) {
        polls[0].setAttribute("class", "box");
        for (const button of deleteButtons) {
            button.setAttribute("class", "delete");
        }
    }
    else {
        polls[0].setAttribute("class", "hidden");
        for (const button of deleteButtons) {
            button.setAttribute("class", "delete hidden");
        }
    }
}

loadPolls();