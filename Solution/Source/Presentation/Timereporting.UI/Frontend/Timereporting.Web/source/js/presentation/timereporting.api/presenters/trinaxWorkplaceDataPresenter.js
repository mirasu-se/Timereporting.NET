class TrinaxWorkplaceDataPresenter {
  async presentSelectOptions(data, selectElement) {
    if(data != null){
      selectElement.empty();
      // Add options for each workplace
      for (const workplace of data) {
        selectElement.append($('<option>', {
          value: workplace.id,
          text: workplace.name,
        }));
      }
    }
  }

  async presentTableRows(data) {
    if(data != null){
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
          <td>${workplace.created_time}</td>
          <td>
            <button type="button" class="btn btn-light" data-bs-toggle="modal" data-bs-target="#workplaceDetails_${workplace.id}">
              <i class="btn btn-secondary bi bi-info-circle m-0"></i>
            </button>
          </td>
        </tr>`;
        tableBody.insertAdjacentHTML("beforeend", row);
      }
    }
  }
  
 presentDetailsModal(data) {
  if(data != null){
      const modalContainer = document.querySelector("#modal-container");
      modalContainer.innerHTML = "";     
      data.forEach(async (workplace) => {
        const modal = `
          <div id="modal-container"> 
            <div class="modal fade" id="workplaceDetails_${workplace.id}" tabindex="-1" aria-labelledby="workplaceModalLabel" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="workplaceModalLabel">
                      Tidsrapportdetaljer [TRINAX]
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Stäng"></button>
                  </div>
                  <div class="card">
                    <div class="card-body">
                      <p id="workplace"><strong>Arbetsplats Id:</strong> ${workplace.id}</p>
                      <p id="name"><strong>Arbetsplatsnamn:</strong> ${workplace.name}</p>
                      <p id="date"><strong>Skapade tid:</strong> ${workplace.created_time}</p>
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
}

export default TrinaxWorkplaceDataPresenter;