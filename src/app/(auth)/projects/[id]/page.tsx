import {getTasks} from "@/utils/utils";
import Kanban from "@/components/Kanban/Kanban";
import BugModal from "@/components/Bugs/BugModal/BugModal";

export default async function ProjectId({params}: { params: any }) {

  const tasks = await getTasks(params.id)


  return (
    <div className="flex gap-3">
      <BugModal buttonName="Add a bug" title="Add a bug"/>
      <Kanban defaultTasks={tasks}/>


      {/*<div className="mt-12">*/}
      {/*    {tasks.map(function (task) {*/}
      {/*        return (*/}
      {/*            <>*/}
      {/*                <Popover>*/}
      {/*                    <PopoverTrigger>*/}
      {/*                        <BugCard task={task} key={task.id}/>*/}
      {/*                    </PopoverTrigger>*/}
      {/*                    <PopoverContent side="right" className="border-2 border-gray-200 shadow-xl bg-gray-100">*/}
      {/*                        <div>*/}
      {/*                            <p className="text-gray-600 text-[12px] tracking-wide uppercase">Description</p>*/}
      {/*                            <p className="text-[13px]">{task.description}</p>*/}
      {/*                        </div>*/}
      {/*                        <div className="flex items-center mt-5 gap-3">*/}
      {/*                            <p className="text-gray-600 text-[12px] tracking-wide uppercase">Priority</p>*/}
      {/*                            <p className={`${task.priority === "low" ? "bg-green-500" :*/}
      {/*                                task.priority === "medium" ? "bg-yellow-400" :*/}
      {/*                                    "bg-red-400"} text-white rounded uppercase text-[14px] w-20 flex justify-center`}>{task.priority}</p>*/}
      {/*                        </div>*/}
      {/*                        <div className="flex items-center gap-3 mt-5">*/}
      {/*                            <p className="text-gray-600 text-[12px] tracking-wide uppercase">Members*/}
      {/*                                (3):</p>*/}
      {/*                            <UserAvatar/>*/}
      {/*                        </div>*/}
      {/*                        <div className="mt-5 flex items-center gap-3">*/}
      {/*                            <p className="text-gray-600 text-[12px] tracking-wide uppercase">Deadline</p>*/}
      {/*                            <p className="text-gray-600 text-[12px] tracking-wide uppercase">15.05.2023</p>*/}
      {/*                        </div>*/}
      {/*                    </PopoverContent>*/}
      {/*                </Popover>*/}
      {/*            </>*/}
      {/*        )*/}
      {/*    })}*/}

      {/*</div>*/}
    </div>
  )

}

