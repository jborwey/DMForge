using Microsoft.AspNetCore.Identity;
using System;
using System.ComponentModel.DataAnnotations;

    public class Items
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [MaxLength(100)]
        public string Title { get; set; }
        [Required]
        public string Description { get; set; }

    }