export default function BugCard({task} : {task: any}) {

    return (
        <>
            <div className="card mb-5 w-52 rounded-md px-4 py-2 shadow-2xl">
                <div className="card-header">
                    <p className="bg-green-500 text-white rounded">{task.priority}</p>
                </div>
                <div className="card-body">
                    <p>{task.description}</p>
                </div>
                <div className="card-footer">
                    {task.deadline}
                </div>
            </div>
        </>
    )
}