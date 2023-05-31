import TimereportingWorkplaceApi from '../../timereporting.api/workplace/timereportingWorkplaceApi';
import TimereportingApiClient from '../../timereporting.api/timereportingApiClient';

const selectedApiEndpoint = "http://localhost:5000/api/v1";
const timereportingApiClient = new TimereportingApiClient(selectedApiEndpoint);
const timereportingWorkplaceApi = new TimereportingWorkplaceApi(timereportingApiClient);

class TimereportingApiService {

  createTimereportTableRows(data) {
    console.log("[API - RESPONSE]:", data);
    // Sort the data by report.id in ascending order
    data.sort((b, a) => a.id - b.id);
  
    // Clean the time-report-table by removing all existing rows
    const tableBody = document.querySelector("#time-report-table tbody");
    tableBody.innerHTML = "";
  
    // create new table rows based on the fetched data
    data.forEach(async (report) => {
      const workplace = await timereportingWorkplaceApi.getWorkplaceById(report.workplaceId);
      const row = `<tr>
        <td>${new Date(report.date).toISOString().split('T')[0]}</td>
        <td>${workplace.name}</td>
        <td>${report.hours.toFixed(2)}</td>
        <td>
          <button type="button" class="btn btn-light" data-bs-toggle="modal" data-bs-target="#timereportDetails_${report.id}">
            <i class="btn btn-secondary bi bi-info-circle m-0"></i>
          </button>
        </td>
      </tr>`;
      tableBody.insertAdjacentHTML("beforeend", row);
    });
  }
  
  createTimereportDetailsModal(data) {
    const modalContainer = document.querySelector("#modal-container");
    modalContainer.innerHTML = "";
  
    data.forEach(async (report) => {
      const workplace = await timereportingWorkplaceApi.getWorkplaceById(report.workplaceId);
      const modal = `
      <div id="modal-container"> 
        <div class="modal fade" id="timereportDetails_${report.id}" tabindex="-1" aria-labelledby="timereportModalLabel" aria-hidden="true">
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
                  <p id="id"><strong>RAPPORT ID -</strong> ${report.id}</p>
                  <p id="workplace"><strong>Arbetsplats Id:</strong> ${report.workplaceId}</p>
                  <p id="name"><strong>Arbetsplatsnamn:</strong> ${workplace.name}</p>
                  <p id="date"><strong>Datum:</strong> ${new Date(report.date).toISOString().split('T')[0]}</p>
                  <p id="hours"><strong>Arbetstimmar:</strong> ${report.hours.toFixed(2)}</p>
                  <p id=""><strong>Info:</strong> ${report.info}</p>
                  <div class="text-center">
                    <img src="${report.imageFile || '/img/default/timereport/no_time_report_image.png'}" alt="Workplace Image" class="img-fluid">
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
}

export default TimereportingApiService;