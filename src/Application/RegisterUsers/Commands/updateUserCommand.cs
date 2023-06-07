using Application.Common.Interfaces;
using Application.Employee;
using Application.Models;
using Application.UserAccount.Registration;
using AutoMapper;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.RegisterUsers.Commands
{
    public class updateUserCommand : RegUpdateDto,IRequest<Result>
    {
    }
    public class updateUserHandler : IRequestHandler<updateUserCommand, Result>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;
        public updateUserHandler(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<Result> Handle(updateUserCommand request, CancellationToken cancellationToken)
        {
           
                var emp = await _context.Set<Domain.Entities.Register>().FindAsync(request.Id);
                if (emp == null)
                    return Result.Failure(new string[] { "Employees not found" });
                else
                {
                    emp.Id = request.Id;
                    emp.Name = request.Name;
                    emp.Address = request.Address;
                    emp.PhoneNo = request.PhoneNo;
                    emp.Email = request.Email;
                    emp.RolesId = request.RolesId;
                }
                //_context.Set<Domain.Entities.Register>().Update(emp);
                await _context.SaveChangesAsync(cancellationToken);
                return Result.Success(new string[] { "Record Successfully Saved" });
            }
        }
    }

