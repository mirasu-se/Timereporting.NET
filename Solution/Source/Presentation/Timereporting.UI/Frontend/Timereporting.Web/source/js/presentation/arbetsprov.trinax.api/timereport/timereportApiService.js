import appConfig from '../../../application/appConfig';
import WorkplaceApi from '../workplace/workplaceApi';
import TrinaxApiClient from '../trinaxApiClient';

const selectedApiEndpoint = document.getElementById('api-endpoint').value;
const authorizationKey = `${appConfig.getApiAuthorizationKey()}`;
const trinaxApiClient = new TrinaxApiClient(selectedApiEndpoint, authorizationKey);
const workplaceApi = new WorkplaceApi(trinaxApiClient);

class TimereportApiService {
  async createTimereportTableRows(data) {
    console.log("[API RESPONSE]:", data);
    // Sort the data by report.id in descending order
    // Last report should be displayed at the top for better UI/UX functionality
    data.sort((b, a) => a.id - b.id);
    
    // Clean the time-report-table by removing all existing rows
    const tableBody = document.querySelector("#time-report-table tbody");
    tableBody.innerHTML = "";
    
    // Fetch workplace data for each report and create new table rows based on the fetched data
    for (const report of data) {
      const workplace = await workplaceApi.getWorkplaceById(report.workplace_id);
      const row = `<tr>
        <td>${report.date}</td>
        <td>${workplace.name}</td>
        <td>${report.hours}</td>
        <td>
          <button type="button" class="btn btn-light" data-bs-toggle="modal" data-bs-target="#timereportDetails_${report.id}">
            <i class="btn btn-secondary bi bi-info-circle m-0"></i>
          </button>
        </td>
      </tr>`;
      tableBody.insertAdjacentHTML("beforeend", row);
    }
  }
  
 createTimereportDetailsModal(data) {
    const modalContainer = document.querySelector("#modal-container");
    modalContainer.innerHTML = "";
    
    data.forEach(async (report) => {
    // Since Arbetsplatsnamn is required (according to email instructions)  and not avilible by default in direct timereport reponse we will fatch it from workplaceApi
    // We are here in a forEach loop which means that this will execute asyncronuse calls on workplace endpoint only to get workplace name
    // This should make a lot of unnecessary reqwuests on our API and in reality we should eaither expand table columns in our database 
    // or if columns already exists we should reconfigure timereport API controller to expose requred data property in the API interface
    const workplace = await workplaceApi.getWorkplaceById(report.workplace_id);
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
                    <p id="date"><strong>Datum:</strong> ${report.date}</p>
                    <p id="hours"><strong>Arbetstimmar:</strong> ${report.hours}</p>
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

export default TimereportApiService;