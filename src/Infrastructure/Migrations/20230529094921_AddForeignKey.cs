using Microsoft.EntityFrameworkCore.Migrations;

namespace Infrastructure.Migrations
{
    public partial class AddForeignKey : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "RolesId",
                table: "Employee",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Employee_RolesId",
                table: "Employee",
                column: "RolesId");

            migrationBuilder.AddForeignKey(
                name: "FK_Employee_Roles_RolesId",
                table: "Employee",
                column: "RolesId",
                principalTable: "Roles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Employee_Roles_RolesId",
                table: "Employee");

            migrationBuilder.DropIndex(
                name: "IX_Employee_RolesId",
                table: "Employee");

            migrationBuilder.DropColumn(
                name: "RolesId",
                table: "Employee");
        }
    }
}
