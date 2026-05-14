// src/components/staff/StaffGrid.jsx

import StaffCard from "./StaffCard";

const StaffGrid = ({ staff }) => {
  const grouped = {};

  staff.forEach((member) => {
    if (!grouped[member.category]) {
      grouped[member.category] = [];
    }

    grouped[member.category].push(member);
  });

  return (
    <section className="pb-24">
      <div className="container-custom space-y-24">
        {Object.entries(grouped).map(([category, members]) => (
          <div key={category}>
            <div className="mb-12">
              <h2 className="text-4xl font-serif font-bold text-primary mb-3">
                {category}
              </h2>

              <div className="w-24 h-1 bg-secondary rounded-full" />
            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-10">
              {members.map((member) => (
                <StaffCard key={member.id} staff={member} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StaffGrid;
