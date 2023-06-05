using Microsoft.AspNetCore.Http;

namespace Timereporting.Interaction.DataTransfer.Services.FileSystem.Images
{
    public interface IImageFileService
    {
        Task<string> UploadTimereportImageAsync(IFormFile image, string storageDirectory, Guid id);
        Task<string> UploadWorkplaceImageAsync(IFormFile image, string storageDirectory, Guid id);
    }
}