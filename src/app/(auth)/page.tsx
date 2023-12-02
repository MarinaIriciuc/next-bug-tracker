import GenerateExcelButton from "@/components/GenerateExcelButton";
import {getServerSession} from "next-auth";
import {authOptions} from "@/utils/auth";
import prisma from "@/lib/prisma";
import ProjectChart from "@/components/ProjectChart";
import {
  getNumberOfBugsByStatus,
  getNumberOfBugsPerMonth,
  getNumberOfProjectsByPriority,
  getNumberOfProjectsPerMonth
} from "@/utils/utils";

export default async function Home() {

  const session = await getServerSession(authOptions);
  const projects = await prisma.project.findMany({
    where: {
      userId: session?.user.id
    }
  })

  const numberOfProjectsByLowPriority = await getNumberOfProjectsByPriority("low");
  const numberOfProjectsByMediumPriority = await getNumberOfProjectsByPriority("medium");
  const numberOfProjectsByHighPriority = await getNumberOfProjectsByPriority("high");

  const currentYear = new Date().getFullYear();
  const projectsCountPerMonth = await getNumberOfProjectsPerMonth(currentYear);
  const bugsCountPerMonth = await getNumberOfBugsPerMonth(currentYear);

  const numberOfBugsToDo = await getNumberOfBugsByStatus("todo");
  const numberOfBugsInProgress = await getNumberOfBugsByStatus("in_progress");
  const numberOfBugsDone = await getNumberOfBugsByStatus("done");


  return (
    <>
      <div className="lg:px-0 px-10">
        <p className="text-[16px] tracking-wider mt-28">Download a report for managing your projects and bugs for a
          year</p>
        <GenerateExcelButton projects={projects}/>
        <div className="mt-16">
          <p className="mb-10 text-[22px] tracking-wider">Graphics about projects and bugs</p>
          <ProjectChart numberOfProjectsByLowPriority={numberOfProjectsByLowPriority}
                        numberOfProjectsByMediumPriority={numberOfProjectsByMediumPriority}
                        numberOfProjectsByHighPriority={numberOfProjectsByHighPriority}
                        projectsCountPerMonth={projectsCountPerMonth}
                        bugsCountPerMonth={bugsCountPerMonth}
                        numberOfBugsToDo={numberOfBugsToDo}
                        numberOfBugsInProgress={numberOfBugsInProgress}
                        numberOfBugsDone={numberOfBugsDone}
          />
        </div>
      </div>
    </>
  );
}


