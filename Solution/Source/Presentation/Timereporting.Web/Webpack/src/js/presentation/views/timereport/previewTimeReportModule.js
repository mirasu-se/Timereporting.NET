// Fake API endpoint URL
const apiUrl = "https://api.example.com/time-reports";

// Function to generate random time report data
function generateRandomData() {
  const reports = [];
  const workspaces = ["Workplace 1", "Workplace 2", "Workplace 3"];

  // Generate three random time reports
  for (let i = 1; i <= 3; i++) {
    const date = getRandomDate();
    const workplace = workspaces[Math.floor(Math.random() * workspaces.length)];
    const hours = getRandomFloat(4, 10).toFixed(2);

    reports.push({ date, workplace, hours });
  }

  return reports;
}

// Function to get a random date within a range
function getRandomDate() {
  const start = new Date("2022-01-01");
  const end = new Date();

  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  ).toLocaleDateString();
}

// Function to get a random float number within a range
function getRandomFloat(min, max) {
  return Math.random() * (max - min) + min;
}

// Function to fetch data from the fake API
function fetchTimeReports() {
  // Make an API request to fetch data
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      // Clean the time-report-table by removing all existing rows
      const tableBody = document.querySelector("#time-report-table tbody");
      tableBody.innerHTML = "";

      // Generate new table rows based on the fetched data
      data.forEach((report) => {
        const row = `<tr>
          <td>${report.date}</td>
          <td>${report.workplace}</td>
          <td>${report.hours}</td>
          <td>
            <button type="button" class="btn btn-light" data-bs-toggle="modal" data-bs-target="#createReportModal">
              <i class="btn btn-secondary bi bi-info-circle m-0"></i>
            </button>
          </td>
        </tr>`;
        tableBody.insertAdjacentHTML("beforeend", row);
      });
    })
    .catch((error) => {
      console.error("Error fetching time reports:", error);
    });
}

// Event listener for the getReportsButton click event
const getReportsButton = document.getElementById("getReportsButton");
getReportsButton.addEventListener("click", (event) => {
  event.preventDefault();
  console.log("button clicked");
  // Simulate fetching data from the API and updating the table
  const fakeData = generateRandomData();
  fetchTimeReports(fakeData);
});

window.fetchTimeReports = fetchTimeReports;
