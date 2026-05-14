// src/components/staff/FeaturedLeadership.jsx

import StaffCard from "./StaffCard";

const FeaturedLeadership = ({ leaders }) => {
  return (
    <section className="py-20">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="section-subtitle">
            Leadership Team
          </p>

          <h2 className="section-title">
            Guiding the Vision of the Foundation
          </h2>

          <p className="section-description">
            Experienced educators and leaders committed to nurturing
            Islamic knowledge, sincerity, and community development.
          </p>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-10">

          {leaders.map((leader) =>{
            if(leader.category === "Board of Trustees"){
              const leaderData = leader;

              return (
                <StaffCard key={leaderData.id} staff={leaderData} featured />
              )
            }
          
          
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturedLeadership;