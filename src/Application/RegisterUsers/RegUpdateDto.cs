﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.RegisterUsers
{
   public class RegUpdateDto
    {
        public int Id { get; set; }
        
        public string Name { get; set; }

        public string Email { get; set; }

        public string Address { get; set; }
       
        public string PhoneNo { get; set; }

        public int RolesId { get; set; }
    }
}
