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

        public async Task<string> UploadImageAsync(IFormFile file, string storageDirectory)
        {
            try
            {
                if (file == null || file.Length == 0)
                    throw new ArgumentException("No file uploaded.");

                if (file.Length > 10 * 1024 * 1024) // Limit file size to 10 MB
                    throw new ArgumentException("File size exceeds the limit.");

                // Generate a unique filename for the image
                var fileName = $"{Guid.NewGuid()}{Path.GetExtension(file.FileName)}";

                // Save the image to the storage directory
                var filePath = Path.Combine(storageDirectory, fileName);
                Directory.CreateDirectory(storageDirectory);

                // Check if a file with the same name already exists
                int autoIncrement = 1;
                while (File.Exists(filePath))
                {
                    // If a file with the same name exists, add an auto-increment number to the filename
                    fileName = $"{Guid.NewGuid()}-{autoIncrement}{Path.GetExtension(file.FileName)}";
                    filePath = Path.Combine(storageDirectory, fileName);
                    autoIncrement++;
                }

                // Save the file to disk
                using (var fileStream = new FileStream(filePath, FileMode.Create))
                    await file.CopyToAsync(fileStream);

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
