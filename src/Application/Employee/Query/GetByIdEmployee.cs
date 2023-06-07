using Application.Common.Interfaces;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Employee.Query
{
   public class GetByIdEmployee : IRequest<GetEMPDTO>
    {
        public string Email { get; set; }
    }
    public class GetByIdHandler : IRequestHandler<GetByIdEmployee, GetEMPDTO>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;
        public GetByIdHandler(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }



        public async Task<GetEMPDTO> Handle(GetByIdEmployee request, CancellationToken cancellationToken)
            {
            var emp = await _context.Set<Domain.Entities.Employee>().FirstOrDefaultAsync(a => a.Email == request.Email, cancellationToken);
            var edit = new GetEMPDTO();
            if (emp != null)
            {
                edit.Id = emp.Id;
                edit.Name = emp.Name;                                                                                                                                                                                          
                edit.Email = emp.Email;
                edit.Address = emp.Address;
                edit.PhoneNo = emp.PhoneNo;
                edit.RolesId = emp.RolesId;
                edit.Salary = emp.Salary;
                edit.DepartmentId = emp.DepartmentId;
                edit.DesignationId = emp.DesignationsId;
                edit.Image = emp.Image;
            }
            return edit;

        }
    }
}