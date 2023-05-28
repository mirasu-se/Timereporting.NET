// Import application logger from appLogger.js
import appLogger from '../../../../application/logging/appLogger';

// Define the fetchAllTimereports component
function fetchAllTimereports() {
  // Make an API request to fetch all timereports
  fetch("http://localhost:5000/api/v1/timereport")
    .then((response) => response.json())
    .then((data) => {
      // Process the fetched data
      processTimereports(data);
      appLogger.logError("fetchAllTimereports:", data); // Log the error using the appLogger
    })
    .catch((error) => {
      console.error("Error fetching timereports:", error);
      appLogger.logError("Error fetching timereports:", error); // Log the error using the appLogger
    });
}

export default fetchAllTimereports;


function fetchTimereportByTimereportId(reportId) {
  // Make a GET request to fetch the report data
  fetch(`http://localhost:5000/api/v1/timereport/${reportId}`)
    .then(response => response.json())
    .then(data => {
      // Update the modal with the fetched report data
      document.getElementById(`reportModalLabel`).innerText = 'Time Report Details';
      document.getElementById(`name`).innerText = `Date: ${data.name}`;     
      document.getElementById(`date`).innerText = `Date: ${data.date}`;
      document.getElementById(`workplace`).innerText = `Workplace: ${data.workplace}`;
      document.getElementById(`hours`).innerText = `Hours Worked: ${data.hours}`;
      
      // Show the modal
      $(`#reportDetails_${reportId}`).modal('show');
    })
    .catch(error => {
      console.error('Error fetching report data:', error);
    });
} window.fetchTimereportByTimereportId = fetchTimereportByTimereportId;


function fetchTimereportsBetweenDatesForAllWorkplaces(fromDate, toDate) {
  // Make an API request to fetch timereports between the selected dates for all workplaces
  fetch(`http://localhost:5000/api/v1/timereport?from_date=${fromDate}&to_date=${toDate}`)
    .then((response) => response.json())
    .then((data) => {
      // Process the fetched data
      processTimereports(data);
    })
    .catch((error) => {
      console.error("Error fetching timereports:", error);
    });
} window.fetchTimereportsBetweenDatesForAllWorkplaces = fetchTimereportsBetweenDatesForAllWorkplaces;

function fetchTimereportsByStartDateForAllWorkplaces(fromDate) {
  // Make an API request to fetch timereports starting from the selected date for all workplaces
  fetch(`http://localhost:5000/api/v1/timereport?from_date=${fromDate}`)
    .then((response) => response.json())
    .then((data) => {
      // Process the fetched data
      processTimereports(data);
    })
    .catch((error) => {
      console.error("Error fetching timereports:", error);
    });
} window.fetchTimereportsByStartDateForAllWorkplaces = fetchTimereportsByStartDateForAllWorkplaces;

function fetchTimereportsByEndDateForAllWorkplaces(toDate) {
  // Make an API request to fetch timereports up to the selected end date for all workplaces
  fetch(`http://localhost:5000/api/v1/timereport?to_date=${toDate}`)
    .then((response) => response.json())
    .then((data) => {
      // Process the fetched data
      processTimereports(data);
    })
    .catch((error) => {
      console.error("Error fetching timereports:", error);
    });
} window.fetchTimereportsByEndDateForAllWorkplaces = fetchTimereportsByEndDateForAllWorkplaces;

function fetchTimereportsByWorkplace(workplaceId) {
  // Make an API request to fetch timereports for the selected workplace
  fetch(`http://localhost:5000/api/v1/timereport?workplace=${workplaceId}`)
    .then((response) => response.json())
    .then((data) => {
      // Process the fetched data
      processTimereports(data);
    })
    .catch((error) => {
      console.error("Error fetching timereports:", error);
    });
} window.fetchTimereportsByWorkplace = fetchTimereportsByWorkplace;

function fetchTimereportsByStartDate(workplaceId, fromDate) {
  // Make an API request to fetch timereports starting from the selected date for the selected workplace
  fetch(`http://localhost:5000/api/v1/timereport?workplace=${workplaceId}&from_date=${fromDate}`)
    .then((response) => response.json())
    .then((data) => {
      // Process the fetched data
      processTimereports(data);
    })
    .catch((error) => {
      console.error("Error fetching timereports:", error);
    });
} window.fetchTimereportsByStartDate = fetchTimereportsByStartDate;

function fetchTimereportsByEndDate(workplaceId, toDate) {
  // Make an API request to fetch timereports up to the selected end date for the selected workplace
  fetch(`http://localhost:5000/api/v1/timereport?workplace=${workplaceId}&to_date=${toDate}`)
    .then((response) => response.json())
    .then((data) => {
      // Process the fetched data
      processTimereports(data);
    })
    .catch((error) => {
      console.error("Error fetching timereports:", error);
    });
} window.fetchTimereportsByEndDate = fetchTimereportsByEndDate;

function fetchTimereportsBetweenDates(workplaceId, fromDate, toDate) {
  // Make an API request to fetch timereports between the selected dates for the selected workplace
  fetch(`http://localhost:5000/api/v1/timereport?workplace=${workplaceId}&from_date=${fromDate}&to_date=${toDate}`)
    .then((response) => response.json())
    .then((data) => {
      // Process the fetched data
      processTimereports(data);
    })
    .catch((error) => {
      console.error("Error fetching timereports:", error);
    });
} window.fetchTimereportsBetweenDates = fetchTimereportsBetweenDates;

function fetchTimeReports(event) {
  event.preventDefault();

  // Get selected values
  var workplaceId = document.getElementById("workplace-filter").value;
  var fromDate = document.getElementById("from-date").value;
  var toDate = document.getElementById("to-date").value;

  // Determine the appropriate action based on the selected filters
  if (workplaceId && fromDate && toDate) {
    // Fetch timereports between selected dates for selected workplace
    fetchTimereportsBetweenDates(workplaceId, fromDate, toDate);
  } else if (workplaceId && fromDate) {
    // Fetch timereports starting from the selected date for selected workplace
    fetchTimereportsByStartDate(workplaceId, fromDate);
  } else if (workplaceId && toDate) {
    // Fetch timereports up to the selected end date for selected workplace
    fetchTimereportsByEndDate(workplaceId, toDate);
  } else if (workplaceId) {
    // Fetch timereports for the selected workplace
    fetchTimereportsByWorkplace(workplaceId);
  } else if (fromDate && toDate) {
    // Fetch timereports between the selected dates for all workplaces
    fetchTimereportsBetweenDatesForAllWorkplaces(fromDate, toDate);
  } else if (fromDate) {
    // Fetch timereports starting from the selected date for all workplaces
    fetchTimereportsByStartDateForAllWorkplaces(fromDate);
  } else if (toDate) {
    // Fetch timereports up to the selected end date for all workplaces
    fetchTimereportsByEndDateForAllWorkplaces(toDate);
  } else {
    // Fetch all timereports from all workplaces
    fetchAllTimereports();
  }
} window.fetchTimeReports = fetchTimeReports;

function processTimereports(data) {
  console.log("Processing timereports:", data);
  // Sort the data by report.id in ascending order
  data.sort((a, b) => a.id - b.id);

  // Clean the time-report-table by removing all existing rows
  const tableBody = document.querySelector("#time-report-table tbody");
  tableBody.innerHTML = "";

  // Generate new table rows based on the fetched data
  data.forEach((report) => {
    const buttonId = `btn_${report.id}`; // Unique ID for the button
    const dateParts = report.date.split('T')[0]; // Extract the date part before the 'T' delimiter
    const formattedDate = dateParts.split('-').reverse().join('-'); // Rearrange the date parts to format it as 'YYYY-MM-DD'

    const row = `<tr>
      <td>${formattedDate}</td>
      <td>${report.name}</td>
      <td>${report.hours.toFixed(2)}</td>
      <td>
        <button type="button" class="btn btn-light" data-bs-toggle="modal" data-bs-target="#timereportDetails_${report.id}">
          <i class="btn btn-secondary bi bi-info-circle m-0"></i>
        </button>
      </td>
    </tr>`;
    tableBody.insertAdjacentHTML("beforeend", row);
  });

  // Generate the modal elements
  const modalContainer = document.querySelector("#modal-container");
  modalContainer.innerHTML = "";

  data.forEach((report) => {
    const modalId = `timereportDetails_${report.id}`;

    const modal = `
    <div id="modal-container"> 
      <div class="modal fade" id="${modalId}" tabindex="-1" aria-labelledby="timereportModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="timereportModalLabel">
                Tidsrapportdetaljer
              </h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Stäng"></button>
            </div>
            <div class="card">
              <div class="card-body">
                <p><strong>Id:</strong> ${report.id}</p>
                <p><strong>Name:</strong> ${report.name}</p>
                <p><strong>Time:</strong> ${report.createdTime}</p>
                <p><strong>Info:</strong> ${report.info}</p>
                <div class="text-center">
                  <img src="${report.imageUrl || '/img/default/timereport/no_time_report_image.png'}" alt="Workplace Image" class="img-fluid">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>`;
    modalContainer.insertAdjacentHTML("beforeend", modal);
  });
}
