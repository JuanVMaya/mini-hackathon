//Select Parent container
const quotesCard = document.querySelector(".hero__quote");
function generateNewQuote() {
  //The Office API - Random quote
  axios
    .get("https://www.officeapi.dev/api/quotes/random")
    //It gives us Michael Scott
    .then((response) => {
      quotesCard.innerText = response.data.data.content;
      console.log(response.data.data.character.firstname);
      finalAnswer =
        response.data.data.character.firstname +
        " " +
        response.data.data.character.lastname;
      randomAnswers.push(finalAnswer);

      //The office API - Character Info
      axios
        .get("https://www.officeapi.dev/api/characters")
        .then((response) => {
          //Generate three random extra answers
          let userData = response.data.data;
          for (let i = 0; i < 3; ) {
            let randomUser =
              userData[Math.floor(Math.random() * userData.length)];
            //Check if the randomAnswer does not have the NEW random value
            if (
              !randomAnswers.includes(
                randomUser.firstname + " " + randomUser.lastname
              )
            ) {
              randomAnswers.push(
                randomUser.firstname + " " + randomUser.lastname
              );
              i++;
            }
          }
          randomAnswers.sort();
          let characterLabels = document.querySelectorAll(".answers__answer");
          for (let i = 0; i < 4; i++) {
            characterLabels[i].innerText = randomAnswers[i];
            let answerRadio = document.createElement("input");
            answerRadio.setAttribute("value", randomAnswers[i]);
            answerRadio.setAttribute("type", "radio");
            answerRadio.setAttribute("name", "answer");
            answerRadio.classList.add("answers__answer-radio");
            characterLabels[i].appendChild(answerRadio);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => {
      console.log(error);
    });
}

let randomAnswers = [];
let finalAnswer = "";
let score = 0;
let submittedFlag = false;
generateNewQuote();

//Submission of the form
let formEl = document.querySelector(".answers__form");
let skipButton = document.querySelector(".button--skip");
let heroPaperEl = document.querySelector(".hero__paper");

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!submittedFlag) {
    let answer = event.target.querySelector("input[type=radio]:checked").value;

    if (finalAnswer === answer) {
      heroPaperEl.classList.add("hero__paper--correct");
      score += 1;
      console.log(score);
    } else {
      heroPaperEl.classList.add("hero__paper--wrong");
    }
    skipButton.innerText = "Next";
    submittedFlag = true;
  }
});

//Reset the form and generate new quote
skipButton.addEventListener("click", (event) => {
  formEl.reset();
  generateNewQuote();
  randomAnswers = [];
  skipButton.innerText = "Skip";
  heroPaperEl.classList.remove("hero__paper--correct");
  heroPaperEl.classList.remove("hero__paper--wrong");
  submittedFlag = false;
});
