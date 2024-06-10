const github = new Github();

const ui = new UI();

const searchUser = document.getElementById("serchUser");
serchUser.addEventListener("keyup", (e) => {
  console.log(e.target.value);
  const userText = e.target.value;
  if (userText !== "") {
    github.getUser(userText).then((data) => {
      if (data.profile.message === "Not Found") {
        alert("X");
      } else {
        ui.showProfile(data.profile);
        ui.showRepos(data.repos);
      }
    });
  } else {
  }
});
