//Select Parent container
const quotesCard = document.querySelector(".hero__quote");
//The Office API - Random quote
axios
  .get("https://www.officeapi.dev/api/quotes/random")
  //It gives us Michael Scott
  .then((response) => {
    quotesCard.innerText = response.data.data.content;
    console.log(response.data.data.character.firstname);
    let answerAuthor =
      response.data.data.character.firstname +
      " " +
      response.data.data.character.lastname;
    randomAnswers.push(answerAuthor);

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
        //We have our answers, both random and the correct one
        //update answers_answer label
        //value attribute in radio button
        // img.setAttribute('value',randomAnswers[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  })
  .catch((error) => {
    console.log(error);
  });

let randomAnswers = [];
