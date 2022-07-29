let perfil = document.querySelector(".perfil");
let search = document.querySelector(".placeholder");
let btn = document.querySelector("#btn");
let reset = document.querySelector("#reset");

function getInfo(dados) {
  if (dados.message === "Not Found") {
    alert("Digite um usuário válido!");
    perfil.classList.add("hidden");
    search.classList.remove("hidden");
    resetPage();
  } else {
    let name = document.querySelector(".name");
    name.innerHTML = dados.name;
    let avatar = document.querySelector(".img");
    avatar.setAttribute("src", dados.avatar_url);
    let id = document.querySelector(".id");
    id.innerHTML = dados.id;
    getRepos();
  }
}
function getRepos() {
  let user = document.querySelector("#user");
  let value = user.value;
  fetch(`https://api.github.com/users/${value}/repos`)
    .then((response) => response.json())
    .then((data) => {
      const svg = document.querySelector('.svg')
      let arr = data.map((item, i) => {
        return item.name;
      }
      );
      svg.style.position = "absolute"
      svg.style.visibility = "hidden"
      showRepos(arr);
    });
}

function showRepos(info) {
  let repos = document.querySelector(".repos");
  info.map(function (element, i) {
    let li = `<li>${element}</li>`;
    return repos.insertAdjacentHTML("afterbegin", li);
  });
}

function resetPage() {
  location.reload();
}

btn.addEventListener("click", function action() {
  let user = document.querySelector("#user");
  let value = user.value;
  perfil.classList.remove("hidden");
  search.classList.add("hidden");
  let result = fetch(`https://api.github.com/users/${value}`);
  result.then((response) => response.json()).then((dados) => getInfo(dados));
});

reset.addEventListener("click", resetPage);
