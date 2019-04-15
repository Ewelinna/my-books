import "./styles/main.scss";
import axios from "axios";

const displayResult = data => {
  data.forEach(book => {
    const resultContainer = document.getElementById("result-container");

    const image = document.createElement("img");
    image.setAttribute("class", "image");
    image.src = book.image;
    resultContainer.appendChild(image);

    const titleDescriptionContainer = document.createElement("div");

    const title = document.createElement("h1");
    title.setAttribute("class", "title");
    title.textContent = book.title;
    titleDescriptionContainer.appendChild(title);

    const description = document.createElement("p");
    description.setAttribute("class", "description");
    description.textContent = book.description;
    titleDescriptionContainer.appendChild(description);

    resultContainer.appendChild(titleDescriptionContainer);
  });
};
const getResponse = () => {
  axios
    .get("https://www.googleapis.com/books/v1/volumes?q=harry")
    .then(response => {
      const result = response.data.items.map(item => {
        return {
          title: item.volumeInfo.title,
          description: item.volumeInfo.description,
          image: item.volumeInfo.imageLinks.smallThumbnail
        };
      });
      displayResult(result);
      console.log(result);
    })
    .catch(err => console.log(err));
};

const button = document.querySelector("button");

button.addEventListener("click", () => {
  getResponse();
});
