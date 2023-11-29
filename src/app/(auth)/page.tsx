import GenerateExcelButton from "@/components/GenerateExcelButton";
import {getServerSession} from "next-auth";
import {authOptions} from "@/utils/auth";
import prisma from "@/lib/prisma";
import ProjectChart from "@/components/ProjectChart";
import {getNumberOfProjectsByPriority, getNumberOfProjectsPerMonth} from "@/utils/utils";

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

    const projectsCountPerMonth = await getNumberOfProjectsPerMonth(2023);



    return (
        <>
            <div>
                <GenerateExcelButton projects={projects}/>
                <div className="mt-16">
                    <p className="mb-10 text-[22px] tracking-wider">Graphics about projects and bugs</p>
                    <ProjectChart numberOfProjectsByLowPriority={numberOfProjectsByLowPriority}
                                  numberOfProjectsByMediumPriority={numberOfProjectsByMediumPriority}
                                  numberOfProjectsByHighPriority={numberOfProjectsByHighPriority}
                                  projectsCountPerMonth={projectsCountPerMonth}
                    />
                </div>
            </div>
        </>
    );
}


