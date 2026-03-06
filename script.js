// easter eggs-----------------------------------------
const invisibleColumn = document.getElementById("invisibleColumn");
const invisibleColumn2 = document.getElementById("invisibleColumn2");
const selfie = document.querySelector(".selfie");

let userInput = "";
const secretWord = "hej";

if (invisibleColumn) {
  invisibleColumn.addEventListener("click", () => {
    selfie.src = "images/mask2.png";
    document.body.style.background = "url(images/matrix.png)";
  });
}

document.addEventListener("keydown", function (input) {
  userInput += input.key;

  userInput = userInput.slice(-secretWord.length);

  if (userInput === secretWord) {
    alert("Hejsan :)");
    userInput = "";
  }
});

//JSON--------------------------
async function getData() {
  try {
    const response = await fetch("myCV.json");
    if (!response.ok) {
      throw new Error("Kunde inte hämta data..." + response.statusText);
    }
    const data = await response.json();
    showEmployments(data.employments);
    showEducations(data.educations);
  } catch (error) {
    showError(error);
  }
}

getData();

function showEmployments(employments) {
  const employmentListElement = document.getElementById("work-column");

  employments.forEach((employment) => {
    const employmentElement = document.createElement("div");
    employmentElement.className = "work-column";

    employmentElement.innerHTML = `
          <h4>${employment.years}</h4>
          <h4>${employment.employer}</h4>
          <h3>- ${employment.title}</h3>
          <ul>${employment.workTasks.map((task) => `<li>${task}</li>`).join("")}</ul>
          <hr class="divider" />
    `;
    employmentListElement.appendChild(employmentElement);
  });
}
function showEducations(educations) {
  const educationListElement = document.getElementById("education-column");

  educations.forEach((education) => {
    const educationElement = document.createElement("div");
    educationElement.className = "education-column";

    educationElement.innerHTML = `
    <br>
    <h3>${education.title}</h3>
          <h4>${education.school}</h4>
          <p>${education.yearsActive}</p>
          <br>
    `;

    educationListElement.appendChild(educationElement);
  });
}

function showError(error) {
  const cvColumns = document.getElementById("CV-columns");

  cvColumns.innerHTML = `
    <p class="error">Ett fel inträffade: ${error.message}</p>`;
}

// API gitHub--------------------------
const reposContainer = document.getElementById("repos");
const loadingText = document.getElementById("loadingText");

async function getRepos() {
  try {
    const response = await fetch(
      `https://api.github.com/users/RobinJohansson1992/repos`,
    );

    if (!response.ok) {
      throw new Error("Något gick fel...");
    }

    const repos = await response.json();

    await new Promise((resolve) => setTimeout(resolve, 2000));

    loadingText.classList.add("hidden");

    repos.forEach((repo) => {
      const repoDiv = document.createElement("div");
      repoDiv.classList.add("repo");

      const title = document.createElement("h3");
      title.textContent = repo.name;
      title.classList.add("repo-title");

      const description = document.createElement("p");
      description.textContent = repo.description || "Beskrivning saknas...";
      description.classList.add("repo-description");

      const link = document.createElement("a");
      link.href = repo.html_url;
      link.textContent = "GitHub";
      link.target = "_blank";
      link.classList.add("repo-link");

      repoDiv.appendChild(title);
      repoDiv.appendChild(description);
      repoDiv.appendChild(link);

      reposContainer.appendChild(repoDiv);
    });
  } catch (error) {
    loadingText.textContent = "Något gick fel...";
    loadingText.classList.add("loadingFail");
    console.error(error);
  }
}

getRepos();


