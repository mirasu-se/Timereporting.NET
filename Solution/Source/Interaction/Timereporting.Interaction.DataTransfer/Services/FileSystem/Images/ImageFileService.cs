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

        public async Task<string> UploadTimereportImageAsync(IFormFile imageFile, string fileHostingUrl, Guid timereportId)
        {
            try
            {
                if (imageFile == null || imageFile.Length == 0)
                    throw new ArgumentException("No file uploaded.");

                if (imageFile.Length > 10 * 1024 * 1024) // Limit file size to 10 MB
                    throw new ArgumentException("File size exceeds the limit.");

                var fileDirectory = fileHostingUrl.TrimEnd('/'); // Remove trailing slash from the fileHostingUrl

                var fileName = $"TR_ID_{timereportId}{Path.GetExtension(imageFile.FileName)}";
                var filePath = Path.Combine(fileDirectory, fileName);

                if (!Directory.Exists(fileDirectory))
                {
                    Directory.CreateDirectory(fileDirectory);
                }

                // Check if a file with the same name already exists
                int autoIncrement = 1;
                while (File.Exists(filePath))
                {
                    // If a file with the same name exists, add an auto-increment number to the filename
                    fileName = $"TR_ID_{timereportId}_{autoIncrement}{Path.GetExtension(imageFile.FileName)}";
                    filePath = Path.Combine(fileDirectory, fileName);
                    autoIncrement++;
                }

                // Save the file to disk
                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    await imageFile.CopyToAsync(fileStream);
                }

                return fileName;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while uploading image.");
                throw;
            }
        }


        public async Task<string> UploadWorkplaceImageAsync(IFormFile imageFile, string fileHostingUrl, Guid id)
        {
            try
            {
                if (imageFile == null || imageFile.Length == 0)
                    throw new ArgumentException("No file uploaded.");

                if (imageFile.Length > 10 * 1024 * 1024) // Limit file size to 10 MB
                    throw new ArgumentException("File size exceeds the limit.");

                var fileDirectory = fileHostingUrl.TrimEnd('/'); // Remove trailing slash from the fileHostingUrl

                var fileName = $"WP_ID_{id}{Path.GetExtension(imageFile.FileName)}";
                var filePath = Path.Combine(fileDirectory, fileName);

                if (!Directory.Exists(fileDirectory))
                {
                    Directory.CreateDirectory(fileDirectory);
                }

                // Check if a file with the same name already exists
                int autoIncrement = 1;
                while (File.Exists(filePath))
                {
                    // If a file with the same name exists, add an auto-increment number to the filename
                    fileName = $"WP_ID_{id}_{autoIncrement}{Path.GetExtension(imageFile.FileName)}";
                    filePath = Path.Combine(fileDirectory, fileName);
                    autoIncrement++;
                }

                // Save the file to disk
                using (var fileStream = new FileStream(filePath, FileMode.Create))
                    await imageFile.CopyToAsync(fileStream);

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
