import {getTasks} from "@/utils/utils";
import Kanban from "@/components/Kanban/Kanban";
import BugModal from "@/components/Bugs/BugModal/BugModal";
import prisma from "@/lib/prisma";
import {ColumnEnum} from "@prisma/client";

export default async function ProjectId({params}: { params: any }) {

  const tasks = await getTasks(params.id);

  async function handleUpdateTaskColumn(taskId: number, columnId: ColumnEnum){
    "use server"
    await prisma.task.update({
      where: {
        id: taskId
      },
      data: {
        columnId: columnId
      }
    })

  }

  return (

    <>
      <div className="sm:px-0 px-20 mt-32">
        <BugModal buttonName="Add a bug" title="Add a bug" />
      </div>
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 md:gap-6 sm:gap-8 sm:px-0 px-20 md:gap-y-0 gap-y-8 mt-10">
        <Kanban defaultTasks={tasks} handleUpdateTaskColumn={handleUpdateTaskColumn}/>
      </div>
    </>

  )

}

