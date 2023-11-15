import BugModal from "@/components/Bugs/BugModal/BugModal";
import {useParams} from "next/navigation";
import {getTasks} from "@/utils/utils";
import {getServerSession} from "next-auth";
import {authOptions} from "@/utils/auth";
import BugCard from "@/components/Bugs/BugCard/BugCard";

export default async function ProjectId({params}) {

    const tasks = await getTasks(params.id)

    return (
        <>
            <BugModal/>
            <div className="mt-12">
                {tasks.map(function (task) {
                    return (
                        <>
                            <BugCard task={task} key={task.id}/>
                        </>
                    )
                })}
            </div>
        </>
    )

}