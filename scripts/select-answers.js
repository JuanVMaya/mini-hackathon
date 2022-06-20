axios.get("https://www.officeapi.dev/api/characters").then((data) => {
  console.log(data);
}).catch((error) => {
    console.log(error);
})
