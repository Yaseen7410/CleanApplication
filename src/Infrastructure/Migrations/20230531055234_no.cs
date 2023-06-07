using Microsoft.EntityFrameworkCore.Migrations;

namespace Infrastructure.Migrations
{
    public partial class no : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Employee_Roles_RolesId",
                table: "Employee");

            migrationBuilder.DropForeignKey(
                name: "FK_Register_Roles_RolesId",
                table: "Register");

            migrationBuilder.DropColumn(
                name: "City",
                table: "Employee");

            migrationBuilder.RenameColumn(
                name: "Phone",
                table: "Employee",
                newName: "PhoneNo");

            migrationBuilder.AlterColumn<int>(
                name: "RolesId",
                table: "Register",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<int>(
                name: "RoleId",
                table: "Register",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<int>(
                name: "RolesId",
                table: "Employee",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<int>(
                name: "RoleId",
                table: "Employee",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddForeignKey(
                name: "FK_Employee_Roles_RolesId",
                table: "Employee",
                column: "RolesId",
                principalTable: "Roles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Register_Roles_RolesId",
                table: "Register",
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

            migrationBuilder.DropForeignKey(
                name: "FK_Register_Roles_RolesId",
                table: "Register");

            migrationBuilder.DropColumn(
                name: "RoleId",
                table: "Register");

            migrationBuilder.DropColumn(
                name: "RoleId",
                table: "Employee");

            migrationBuilder.RenameColumn(
                name: "PhoneNo",
                table: "Employee",
                newName: "Phone");

            migrationBuilder.AlterColumn<int>(
                name: "RolesId",
                table: "Register",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "RolesId",
                table: "Employee",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "City",
                table: "Employee",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Employee_Roles_RolesId",
                table: "Employee",
                column: "RolesId",
                principalTable: "Roles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Register_Roles_RolesId",
                table: "Register",
                column: "RolesId",
                principalTable: "Roles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
