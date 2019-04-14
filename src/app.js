import "./styles/main.scss";
import axios from "axios";

axios
  .get("https://www.googleapis.com/books/v1/volumes?q=harry")
  .then(response => {
    let kiwi = response.data.items.map(item => {
      return {
        title: item.volumeInfo.title,
        description: item.volumeInfo.description,
        image: item.volumeInfo.imageLinks
      };
    });

    console.log(kiwi);
  })
  .catch(err => console.log(err));


