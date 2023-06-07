
using Domain.Common;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities
{
    public class Employee :AuditableEntity
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string PhoneNo { get; set; }
        //public string City { get; set; }
        public string Salary { get; set; }
        public string Image { get; set; }
        public string Email { get; set; }
        [ForeignKey("DepartmentId")]
        public int DepartmentId { get; set; }
        public Department Department { get; set; }
        [ForeignKey("DesignationsId")]
        public int DesignationsId { get; set; }
        public Designations Designations { get; set; }
        [ForeignKey("ProjectId")]
        public int?  ProjectId { get; set; }
        public Project Project { get; set; }
        [ForeignKey("RolesId")]
        public int RolesId { get; set; }
        public Roles   Roles { get; set; }
    }
}


