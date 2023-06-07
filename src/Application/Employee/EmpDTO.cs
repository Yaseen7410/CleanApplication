using Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Employee
{
    public class EmpDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string PhoneNo { get; set; }
        public string Salary { get; set; }
        public string Email { get; set; }
        public string Image { get; set; }
        public int DepartmentId { get; set; }
        public Department Department { get; set; }
        public int DesignationId { get; set; }
        public Designations Designations { get; set; }
        public Project Project { get; set; }
        public int RolesId { get; set; }
    //    public Roles Roles { get; set; }
       




    }
}
