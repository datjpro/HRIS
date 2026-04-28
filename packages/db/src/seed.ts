import { prisma } from "./client";

async function main() {
  const adminPassword = await Bun.password.hash("Admin@123456");
  const employeePassword = await Bun.password.hash("Employee@123456");

  const hrDepartment = await prisma.department.upsert({
    where: { code: "HR" },
    update: { name: "Human Resources", isActive: true },
    create: { code: "HR", name: "Human Resources", isActive: true }
  });

  const techDepartment = await prisma.department.upsert({
    where: { code: "TECH" },
    update: { name: "Technology", isActive: true },
    create: { code: "TECH", name: "Technology", isActive: true }
  });

  const adminUser = await prisma.user.upsert({
    where: { email: "admin@company.com" },
    update: { fullName: "System Admin", role: "ADMIN", department: hrDepartment.name },
    create: {
      email: "admin@company.com",
      fullName: "System Admin",
      role: "ADMIN",
      department: hrDepartment.name,
      accounts: { create: { provider: "credentials", password: adminPassword } }
    }
  });

  const hrUser = await prisma.user.upsert({
    where: { email: "hr@company.com" },
    update: { fullName: "HR Lead", role: "HR", department: hrDepartment.name },
    create: {
      email: "hr@company.com",
      fullName: "HR Lead",
      role: "HR",
      department: hrDepartment.name,
      accounts: { create: { provider: "credentials", password: employeePassword } }
    }
  });

  const managerUser = await prisma.user.upsert({
    where: { email: "manager@company.com" },
    update: { fullName: "Tech Manager", role: "MANAGER", department: techDepartment.name },
    create: {
      email: "manager@company.com",
      fullName: "Tech Manager",
      role: "MANAGER",
      department: techDepartment.name,
      accounts: { create: { provider: "credentials", password: employeePassword } }
    }
  });

  const employeeUser = await prisma.user.upsert({
    where: { email: "employee@company.com" },
    update: {
      fullName: "Demo Employee",
      role: "EMPLOYEE",
      managerId: managerUser.id,
      department: techDepartment.name
    },
    create: {
      email: "employee@company.com",
      fullName: "Demo Employee",
      role: "EMPLOYEE",
      managerId: managerUser.id,
      department: techDepartment.name,
      accounts: { create: { provider: "credentials", password: employeePassword } }
    }
  });

  await prisma.employeeProfile.upsert({
    where: { userId: hrUser.id },
    update: { employeeCode: "EMP-HR-001", departmentId: hrDepartment.id, jobTitle: "HR Lead", hireDate: new Date("2025-01-01") },
    create: {
      userId: hrUser.id,
      employeeCode: "EMP-HR-001",
      departmentId: hrDepartment.id,
      jobTitle: "HR Lead",
      hireDate: new Date("2025-01-01")
    }
  });

  const managerProfile = await prisma.employeeProfile.upsert({
    where: { userId: managerUser.id },
    update: { employeeCode: "EMP-TECH-001", departmentId: techDepartment.id, jobTitle: "Manager", hireDate: new Date("2025-01-01") },
    create: {
      userId: managerUser.id,
      employeeCode: "EMP-TECH-001",
      departmentId: techDepartment.id,
      jobTitle: "Manager",
      hireDate: new Date("2025-01-01")
    }
  });

  const employeeProfile = await prisma.employeeProfile.upsert({
    where: { userId: employeeUser.id },
    update: { employeeCode: "EMP-TECH-002", departmentId: techDepartment.id, jobTitle: "Engineer", hireDate: new Date("2025-02-01") },
    create: {
      userId: employeeUser.id,
      employeeCode: "EMP-TECH-002",
      departmentId: techDepartment.id,
      jobTitle: "Engineer",
      hireDate: new Date("2025-02-01")
    }
  });

  const existingContract = await prisma.contract.findFirst({
    where: { employeeProfileId: employeeProfile.id, status: "ACTIVE" }
  });

  if (!existingContract) {
    await prisma.contract.create({
      data: {
        employeeProfileId: employeeProfile.id,
        departmentId: techDepartment.id,
        contractType: "FULL_TIME",
        startDate: new Date("2025-02-01"),
        baseSalary: 20000000,
        salaryCurrency: "VND",
        payrollCycle: "MONTHLY",
        status: "ACTIVE"
      }
    });
  }

  await prisma.salaryBand.upsert({
    where: { departmentId_roleLevel: { departmentId: techDepartment.id, roleLevel: "Engineer" } },
    update: { minBaseSalary: 15000000, maxBaseSalary: 30000000, allowanceDefault: 1000000 },
    create: {
      departmentId: techDepartment.id,
      roleLevel: "Engineer",
      minBaseSalary: 15000000,
      maxBaseSalary: 30000000,
      allowanceDefault: 1000000
    }
  });

  await prisma.kpiMetric.upsert({
    where: { code: "TECH-DELIVERY" },
    update: { name: "Delivery KPI", departmentId: techDepartment.id, weight: 1 },
    create: {
      departmentId: techDepartment.id,
      code: "TECH-DELIVERY",
      name: "Delivery KPI",
      weight: 1,
      targetValue: 100,
      unit: "%"
    }
  });

  console.log("Seed completed");
  console.log("Admin login: admin@company.com / Admin@123456");
  console.log("HR login: hr@company.com / Employee@123456");
  console.log("Manager login: manager@company.com / Employee@123456");
  console.log("Employee login: employee@company.com / Employee@123456");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
