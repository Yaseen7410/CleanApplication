using Application.Common.Helper;
using Application.Common.Interfaces;
using Application.Models;
using AutoMapper;
using Domain.Entities;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Employee.Query
{
   public class getDepartments: GridQuery, IRequest<GridResult<Department>>
    {
    }
public class GetDepartmentQueryHandler : IRequestHandler<getDepartments, GridResult<Department>>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;
    public GetDepartmentQueryHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

   

        public async Task<GridResult<Department>> Handle(getDepartments request, CancellationToken cancellationToken)
        {
            try
            {

                var VelData = await _context.Set<Department>().Select(x => new Department
                {
                    Id = x.Id,
                    Name = x.Name,
                    //  Department=x.Department,

                }).DynamicPageAsync(request, cancellationToken);
                return VelData;
            }
            catch (Exception)
            {

                return null;
            }
        }
    }
}
