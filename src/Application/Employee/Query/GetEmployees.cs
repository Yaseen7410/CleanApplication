using Application.Common.Helper;
using Application.Common.Interfaces;
using Application.Models;
using AutoMapper;
using Domain.Entities;
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
    public class GetEmployees : GridQuery, IRequest<GridResult<EmpDTO>>
    {
    }
    public class GetCustomersListQueryHandler : IRequestHandler<GetEmployees, GridResult<EmpDTO>>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;
        public GetCustomersListQueryHandler(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<GridResult<EmpDTO>> Handle(GetEmployees request, CancellationToken cancellationToken)
        {
            try
            {
                var VelData = _context.Set<Domain.Entities.Employee>().Select(x => new EmpDTO
                {
                    Id = x.Id,
                    Name = x.Name,
                    Address = x.Address,
                    PhoneNo = x.PhoneNo,
                    Salary = x.Salary,
                    Department = x.Designations.Department,
                    Designations = x.Designations,
                    Project = x.Project
                });
                var total = await VelData.CountAsync(cancellationToken);
                var totalPages = (int)Math.Ceiling((double)total / request.PageSize);
                var data = await VelData.Skip((request.Page - 1) * request.PageSize)
                    .Take(request.PageSize)
                    .ToListAsync(cancellationToken);
                return new GridResult<EmpDTO>
                {
                    Data = data,
                    Total = total,
                    Page = totalPages
                };
            }

            catch (Exception)
            {

                return null;
            }
        }
    }
}
