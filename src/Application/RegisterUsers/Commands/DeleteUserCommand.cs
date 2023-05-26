using Application.Common.Interfaces;
using Application.Employee.Command;
using Application.Models;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.RegisterUsers.Commands
{
    public class DeleteUserCommand : IRequest<Result>
    {
        public int UsrId { get; set; }
    }
    public class UserDeleteHandler : IRequestHandler<DeleteUserCommand, Result>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;
        public UserDeleteHandler(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<Result> Handle(DeleteUserCommand request, CancellationToken cancellationToken)
        {
            var emp = await _context.Set<Domain.Entities.Register>().FirstOrDefaultAsync(a => a.Id == request.UsrId, cancellationToken);
            if (emp == null)
                return Result.Failure(new string[] { "User not found" });
            _context.Set<Domain.Entities.Register>().Remove(emp);
            await _context.SaveChangesAsync(cancellationToken);
            return Result.Success("Record successfully Delete");
        }
    }
}