const main = document.getElementById("main");
const polls = main.children;
const adminButton = document.getElementById("adminButton");
adminButton.addEventListener("click", adminToggle)
const deleteButtons = document.getElementsByClassName("delete");

let adminMode = false;

for (let i = 0; i < polls.length; i++) {
    const element = polls[i];
    element.addEventListener("click", () => {activate(i.toString())});
}

function activate(number) {
    for (let i = 0; i < polls.length; i++) {
        const poll = polls[i].lastElementChild;
        poll.setAttribute("class", "hidden");
    }

    const votes = document.getElementById("votes" + number);
    votes.setAttribute("class", "votes");
}

function adminToggle() {
    adminMode = !adminMode;

    if (adminMode) {
        polls[0].setAttribute("class", "box");
        for (const button of deleteButtons) {
            button.setAttribute("class", "delete");
        }
    }
    else {
        polls[0].setAttribute("class", "box hidden");
        for (const button of deleteButtons) {
            button.setAttribute("class", "delete hidden");
        }
    }
}