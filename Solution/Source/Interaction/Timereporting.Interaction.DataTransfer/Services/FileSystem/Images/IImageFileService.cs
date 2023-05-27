using Microsoft.AspNetCore.Http;

namespace Timereporting.Interaction.DataTransfer.Services.FileSystem.Images
{
    public interface IImageFileService
    {
        Task<string> UploadImageAsync(IFormFile file, string storageDirectory);
    }
}