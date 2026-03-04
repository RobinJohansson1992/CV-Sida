const invisibleColumn = document.getElementById("invisibleColumn");
const invisibleColumn2 = document.getElementById("invisibleColumn2");

let userInput = "";
const secretWord = "hej";

if (invisibleColumn) {
  invisibleColumn.addEventListener("click", () => {
    document.body.style.backgroundImage = "none";
    document.body.style.backgroundColor = "black";
  });
}

if (invisibleColumn2) {
  invisibleColumn2.addEventListener("click", () => {
    document.body.style.backgroundImage = "none";
    document.body.style.backgroundColor = "indigo";
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
      throw new Error("Kunde inte hämta data" + response.statusText);
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
