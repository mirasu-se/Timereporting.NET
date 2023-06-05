import appConfig from '../../../application/appConfig';

class FallbackWorkplaceDataPresenter {
  async presentSelectOptions(data, selectElement) {
    if (data != null) {
      selectElement.empty();
      selectElement.append('<option value="00000000-0000-0000-0000-000000000000" class="get-all-option" selected>Få alla tidrapporter</option>');
      // Add options for each workplace
      for (const workplace of data) {
        selectElement.append($('<option>', {
          value: workplace.workplaceId,
          text: workplace.name,
        }));
      }
    } else {
      // Generate similar content when data is null
      selectElement.empty();
      selectElement.append('<option value="" disabled selected>No options available</option>');
    }
  }

  async presentTableRows(data) {
    if (data != null) {
      console.log("[API RESPONSE]:", data);
      // Sort the data by workplace.id in descending order
      // Last added workplace should be displayed at the top for better UI/UX functionality
      data.sort((b, a) => a.id - b.id);

      // Clean the workplace-table by removing all existing rows
      const tableBody = document.querySelector("#workplace-table tbody");
      tableBody.innerHTML = "";

      // Fetch workplace data and create new table rows based on the fetched data
      for (const workplace of data) {
        const row = `<tr>
          <td>${workplace.id}</td>
          <td>${workplace.name}</td>
          <td>${workplace.createdTimeString}</td>
          <td>
            <button type="button" class="btn btn-light" data-bs-toggle="modal" data-bs-target="#workplaceDetails_${workplace.id}">
              <i class="btn btn-secondary bi bi-info-circle m-0"></i>
            </button>
          </td>
        </tr>`;
        tableBody.insertAdjacentHTML("beforeend", row);
      }
    } else {
      // Generate similar content when data is null
      const tableBody = document.querySelector("#workplace-table tbody");
      tableBody.innerHTML = "<tr><td colspan='4'>No data available.</td></tr>";
    }
  }

  presentDetailsModal(data) {
    if (data != null) {
      const modalContainer = document.querySelector("#modal-container");
      modalContainer.innerHTML = "";

      data.forEach(async (workplace) => {
        let imgSrc = workplace.imageUrl ? `${appConfig.getAppResourceHostingUrl() + workplace.imageUrl}` : "/img/default/workplace/no_workplace_image.png";
        const modal = `
          <div id="modal-container"> 
            <div class="modal fade" id="workplaceDetails_${workplace.id}" tabindex="-1" aria-labelledby="workplaceModalLabel" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="workplaceModalLabel">
                      Tidsrapportdetaljer [FALLBACK]
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Stäng"></button>
                  </div>
                  <div class="card">
                    <div class="card-body">
                      <p id="workplace"><strong>Arbetsplats Seq:</strong> ${workplace.id}</p>
                      <p id="workplace"><strong>Arbetsplats Id:</strong> ${workplace.workplaceId}</p>
                      <p id="name"><strong>Arbetsplatsnamn:</strong> ${workplace.name}</p>
                      <p id="date"><strong>Skapade tid:</strong> ${workplace.createdTimeString}</p>
                      <div class="text-center">
                      <img src="${imgSrc}" alt="Timereport image attachment" class="img-fluid">
                    </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>`;
        modalContainer.insertAdjacentHTML("beforeend", modal);
      });
    } else {
      // Generate similar content when data is null
      const modalContainer = document.querySelector("#modal-container");
      modalContainer.innerHTML = "<p>No details available.</p>";
    }
  }
}

export default FallbackWorkplaceDataPresenter;