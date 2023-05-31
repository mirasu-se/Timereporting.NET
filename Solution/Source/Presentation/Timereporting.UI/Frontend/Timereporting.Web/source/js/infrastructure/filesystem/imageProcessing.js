class ImageProcessing {
  // Function to open the image file dialog
  openImageFileDialog() {
    document.getElementById('image-input').click();
  }
  
  // Function to preview the image
  previewImage(event) {
    document.getElementById("image-preview").src = URL.createObjectURL(event.target.files[0]);
  }
}

export default ImageProcessing;
