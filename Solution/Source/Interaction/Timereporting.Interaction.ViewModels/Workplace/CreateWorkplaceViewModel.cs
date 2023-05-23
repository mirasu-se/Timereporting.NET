using System;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;

namespace Timereporting.Interaction.ViewModels.Workplace
{
    public class CreateWorkplaceViewModel
    {
        [Required(ErrorMessage = "Name is required.")]
        [MaxLength(255, ErrorMessage = "Name cannot exceed 255 characters.")]
        public string Name { get; set; }

        [MaxLength(1024, ErrorMessage = "Description cannot exceed 1024 characters.")]
        public string? Description { get; set; }

        [Required(ErrorMessage = "Image file is required.")]
        public IFormFile ImageFile { get; set; }

        [Required(ErrorMessage = "Address is required.")]
        [MaxLength(255, ErrorMessage = "Address cannot exceed 255 characters.")]
        public string? Address { get; set; }

        [Required(ErrorMessage = "City is required.")]
        [MaxLength(255, ErrorMessage = "City cannot exceed 255 characters.")]
        public string? City { get; set; }

        [Required(ErrorMessage = "Zip code is required.")]
        [MaxLength(10, ErrorMessage = "Zip code cannot exceed 10 characters.")]
        public string? ZipCode { get; set; }

        [Required(ErrorMessage = "User created is required.")]
        public Guid UserCreated { get; set; }

        [Required(ErrorMessage = "Time created is required.")]
        [DataType(DataType.Time)]
        public DateTime TimeCreated { get; set; }

        [DataType(DataType.Time)]
        public DateTime? LastTimeUpdated { get; set; }

        public Guid? UserUpdated { get; set; }

        public bool? IsDeleted { get; set; }

        [DataType(DataType.Time)]
        public DateTime? TimeDeleted { get; set; }

        public Guid? UserDeleted { get; set; }
    }
}
