import DeleteCardButton from "@/components/Projects/ProjectCard/DeleteCardButton";

export default function ProjectCard({project}: { project: any }) {
    return (
        <>
            <div className="project-card">
                <div className="card-header">
                    <img src="https://i.ibb.co/FYPRZg8/hxfc-V5-V-e-In-X3jb-VUhj-At1su-B7z-B88u-Gd1j20b.webp"
                         className="rounded-t-xl" alt=""/>
                </div>
                <div className="card-body p-5 bg-gray-800">
                    <p className="font-extrabold text-[18px] tracking-wide">{project.name}</p>
                </div>
                <div className="card-footer bg-gray-800 rounded-b-xl pb-5 ps-5 pe-5 flex justify-between">
                    <p className="text-card">marina.vercel</p>
                    <p className="text-card text-green-400 font-semibold">25 %</p>
                    <DeleteCardButton projectId={project.id}/>
                </div>
            </div>
        </>
    )
}