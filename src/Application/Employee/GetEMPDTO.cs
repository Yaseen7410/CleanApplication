using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Employee
{
   public class GetEMPDTO
    {

        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string PhoneNo { get; set; }
        public string Salary { get; set; }
        public string Email { get; set; }
        public int DepartmentId { get; set; }
        public int DesignationId { get; set; }    
        public string Image { get; set; }
        public int RolesId { get; set; }
    }
}
