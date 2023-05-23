class imageProcessing {
    // Function to open the image file dialog
    static openImageFileDialog() {
      document.getElementById('image').click();
    }
    
    // Function to preview the image
    static previewImage(event) {
      document.getElementById("image-preview").src = URL.createObjectURL(event.target.files[0]);
    }
  }
  
  export default imageProcessing;
  
