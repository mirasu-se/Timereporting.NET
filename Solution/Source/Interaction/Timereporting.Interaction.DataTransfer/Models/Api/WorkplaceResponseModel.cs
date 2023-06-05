﻿using Microsoft.AspNetCore.Http;

namespace Timereporting.Interaction.DataTransfer.Models.Api
{
    public class WorkplaceResponseModel
    {
        public int Id { get; set; }

        public Guid WorkplaceId { get; set; }

        public string Name { get; set; }

        public string? Info { get; set; }

        public IFormFile? ImageFile { get; set; }

        public string? ImageUrl { get; set; }

        public byte[]? ImageData { get; set; }

        public DateTime CreatedTime { get; set; }
    }
}
