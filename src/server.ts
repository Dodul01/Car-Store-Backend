import app from "./app";
const port = 5000;

function server() {
  try {
    app.listen(port, () => {
        console.log(`Server is running on port : ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

server();