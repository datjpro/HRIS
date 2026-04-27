import type { EmployeeProfile } from "@hris/shared-types";

type ProfileCardProps = {
  profile: EmployeeProfile;
};

export function ProfileCard({ profile }: ProfileCardProps) {
  return (
    <section>
      <h2>{profile.fullName}</h2>
      <p>{profile.email}</p>
      <p>{profile.departmentName}</p>
      <p>{profile.role}</p>
    </section>
  );
}

