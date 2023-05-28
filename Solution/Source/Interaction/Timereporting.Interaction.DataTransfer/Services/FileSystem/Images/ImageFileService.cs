using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

namespace Timereporting.Interaction.DataTransfer.Services.FileSystem.Images
{
    public class ImageFileService : IImageFileService
    {
        private readonly ILogger<ImageFileService> _logger;

        public ImageFileService(ILogger<ImageFileService> logger)
        {
            _logger = logger;
        }

        public async Task<string> UploadImageAsync(IFormFile image, string storageDirectory)
        {
            try
            {
                if (image == null || image.Length == 0)
                    throw new ArgumentException("No file uploaded.");

                if (image.Length > 10 * 1024 * 1024) // Limit file size to 10 MB
                    throw new ArgumentException("File size exceeds the limit.");

                // Generate a unique filename for the image
                var fileName = image.Name;

                // Save the image to the storage directory
                var filePath = Path.Combine(storageDirectory, fileName);
                Directory.CreateDirectory(storageDirectory);

                // Check if a file with the same name already exists
                int autoIncrement = 1;
                while (File.Exists(filePath))
                {
                    // If a file with the same name exists, add an auto-increment number to the filename
                    fileName = $"{fileName}_{autoIncrement}{Path.GetExtension(image.FileName)}";
                    filePath = Path.Combine(storageDirectory, fileName);
                    autoIncrement++;
                }

                // Save the file to disk
                using (var fileStream = new FileStream(filePath, FileMode.Create))
                    await image.CopyToAsync(fileStream);

                return fileName;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while uploading image.");
                throw;
            }
        }
    }

}
