import React, { memo } from "react";
import Button from "components/HTML/Button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { teamMembersData } from "components/constants";
import Member from "./Member";

const TeamMembers: React.FC = () => {
  return (
    <section className="size-full bg-slate-900/90">
      <div className="container flexColCenter space-y-4 lg:space-y-6 text-white padding-container">
        <div className="size-full flexColCenter md:flex-row md:flexBetween space-y-4">
          <div className="size-full flexColStart">
            <h3 className="bold-24 lg:text-3xl xl:text-4xl mb-4 font-sans whitespace-normal capitalize">
              Meet the Awesome Team
            </h3>
            <p className="w-full max-w-lg regular-14 lg:regular-16 text-slate-300/90">
              Real Estate help's you easily find your property. You just need to
              Register, Login & Search for{" "}
              <strong className="border-b border-slate-300/80">
                Opportunities
              </strong>
              {""}.
            </p>
          </div>
          <Link
            to={"/team"}
            aria-label="link"
            className="size-fit border-none outline-none ring-0"
          >
            <Button
              type="button"
              title="View"
              aria-label="team section"
              autoFocus
              className="flexCenter gap-x-2 px-4 lg:px-6  py-2 lg:py-3 whitespace-nowrap regular-14 lg:regular-16 border border-white rounded-full bg-transparent basic-transition duration-150 hover:text-black hover:scale-105 hover:bg-white"
            >
              View all Team{" "}
              <span>
                <span className="sr-only">Arrow Right</span>
                <ArrowRight className="size-4" />
              </span>
            </Button>
          </Link>
        </div>
        <div className="size-full gap-4 md:gap-6 flexColCenter md:flex-row md:flexBetween">
          {teamMembersData.map((item) => {
            return <Member key={item.id} data={item} />;
          })}
        </div>
      </div>
    </section>
  );
};

const MemoTeamMembers = memo(TeamMembers);

export default MemoTeamMembers;
