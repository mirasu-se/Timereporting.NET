import AppLogger from "../../../infrastructure/logging/loggers/appLogger";
import TimereportApiFactory from "./timereportApiFactory";

const apiEndpoint = "http://localhost:5000/api/v1";

class GetByIdService {
    async deliverTimereportsByWorkplaceId(workplaceId) {
        // Make an API request to fetch timereports for the selected workplace
        fetch(`${apiEndpoint}/timereport?workplace=${workplaceId}`)
        .then((response) => response.json())
        .then((data) => {
            // Process the fetched data
            TimereportApiFactory.generateTimereportTableRows(data);
            TimereportApiFactory.generateTimereportDetailsModal(data);
        })
        .catch((error) => {
            AppLogger.logError("Error fetching timereports:", error);
        });
    } 

    async deliverTimereportByTimereportId(reportId) {
    // Make a GET request to fetch the report data
    fetch(`${apiEndpoint}/timereport/${reportId}`)
        .then(response => response.json())
        .then(data => {
        // Update the modal with the fetched report data
        TimereportApiFactory.generateTimereportTableRows(data);
        TimereportApiFactory.generateTimereportDetailsModal(data);
        // Show the modal
        $(`#reportDetails_${reportId}`).modal('show');
        })
        .catch(error => {
        AppLogger.logError('Error fetching report data:', error);
        });
    } 
}

export default GetByIdService;