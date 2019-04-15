import "./styles/main.scss";
import axios from "axios";

const getResponse = () => {
  const input = document.querySelector("input").value;
  axios
    .get("https://www.googleapis.com/books/v1/volumes?q=" + input)
    .then(response => {
      const result = response.data.items.map(item => {
        return {
          title: item.volumeInfo.title,
          description: item.volumeInfo.description,
          image: item.volumeInfo.imageLinks
            ? item.volumeInfo.imageLinks.smallThumbnail
            : undefined
        };
      });
      displayResult(result);
    })
    .catch(err => console.log(err));
};

const shortenText = (text, maxLength) => {
    var trimmedString = text.substr(0, maxLength);
    return trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")))
}

const displayResult = data => {
  const resultContainer = document.getElementById("result-container");
  while (resultContainer.firstChild) {
    resultContainer.removeChild(resultContainer.firstChild);
  }

  data.forEach(book => {
    const singleEntryContainer = document.createElement("div");
    singleEntryContainer.setAttribute("class", "single-entry-container");

    if (book.image) {
      const image = document.createElement("img");
      image.setAttribute("class", "cover");
      image.src = book.image;
      singleEntryContainer.appendChild(image);
    }

    const titleDescriptionContainer = document.createElement("div");
    titleDescriptionContainer.setAttribute(
      "class",
      "title-description-container"
    );

    const title = document.createElement("h1");
    title.setAttribute("class", "title");
    title.textContent = book.title;
    titleDescriptionContainer.appendChild(title);

    if (book.description) {
      const description = document.createElement("p");
      description.setAttribute("class", "description");
      book.description = shortenText(book.description, 100);
      description.textContent = `${book.description}...`;
      titleDescriptionContainer.appendChild(description);
    }
    singleEntryContainer.appendChild(titleDescriptionContainer);
    resultContainer.appendChild(singleEntryContainer);
  });
};

const button = document.querySelector("button");

button.addEventListener("click", () => {
  getResponse();
});

document.querySelector("input").addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.querySelector("button").click();
  }
});

