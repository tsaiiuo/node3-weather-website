//declare
console.log("Client side javascript file is loaded!");

// fetch("http://puzzle.mead.io/puzzle").then((response) => {
//   response.json().then((data) => {
//     console.log(data);
//   });
// });

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const MessageOne = document.querySelector(".message-1");
const MessageTwo = document.querySelector(".message-2");
weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;

  fetch("/weather?address=" + location).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        console.log(data.error);
        MessageOne.textContent = data.error;
        MessageTwo.textContent = "";
      } else {
        console.log(data.location);
        MessageOne.textContent = data.location;
        console.log(data.forecast);
        MessageTwo.textContent = data.forecast;
      }
    });
  });
});
