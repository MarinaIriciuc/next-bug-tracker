"use server"
import prisma from "@/lib/prisma";
import {revalidatePath} from "next/cache";
import {projectSchema, ProjectSchema} from "@/schemas/ProjectSchema";
import {getServerSession} from "next-auth";
import {authOptions} from "@/utils/auth";
import {bugSchema} from "@/schemas/BugSchema";
import {settingSchema} from "@/schemas/SettingSchema";
import XLSX from 'xlsx';
import writeXlsxFile from "write-excel-file";
import {constants} from "os";

export async function getProjects(page: number = 1, sortBy: any, term: any) {
    const session = await getServerSession(authOptions);
    if (!page) page = 0;
    const projectsPerPage: number = 8;
    return prisma.project.findMany({
        where: {
            userId: session?.user.id
        },
        name: {
            contains: term,
        },
        take: projectsPerPage,
        skip: (page - 1) * projectsPerPage,
        orderBy: {
            createdAt: sortBy
        }
    })
}

export async function createProject(project: ProjectSchema) {

    const session = await getServerSession(authOptions);
    const result = projectSchema.safeParse(project)
    if (!result.success) {
        throw result.error;
    }
    await prisma.project.create({
        data: {
            name: project.name,
            description: project.description,
            priority: project.priority,
            userId: session?.user.id
        }
    })
    revalidatePath("/projects");

}

export async function editProject(projectId: any, updatedProject: any) {
    const existingProject = await prisma.project.findUnique({
        where: {
            id: projectId,
        },
    });
    if (!existingProject) {
        throw ("Project not found");
    }
    const result = projectSchema.safeParse(updatedProject)
    if (!result.success) {
        throw result.error;
    }
    const project = await prisma.project.update({
        where: {
            id: projectId,
        },
        data: {
            name: updatedProject.name,
            description: updatedProject.description,
            priority: updatedProject.priority,
        },
    });
    revalidatePath("/projects")
}

export async function deleteProject(id: string) {

    const session = await getServerSession(authOptions);

    await prisma.project.delete({
        where: {
            id: id,
            userId: session?.user.id
        }
    })

    revalidatePath("/projects")

}

export async function createTask(task: any) {
    const session = await getServerSession(authOptions);
    const result = bugSchema.safeParse(task)
    if (!result.success) {
        throw result.error
    }

    const userProjects = await prisma.user.findUnique({
        where: {
            id: session?.user.id,
        },
        select: {
            projects: {
                select: {
                    id: true,
                },
            },
        },
    });
    const createdTask = prisma.task.create({
        data: {
            title: task.title,
            description: task.description,
            priority: task.priority,
            deadline: task.deadline,
            projectId: task.projectId,
        }
    });
    revalidatePath("/projects")
    return createdTask;
}

export async function getTasks(projectId: any) {

    return prisma.task.findMany({
        where: {
            projectId: projectId,
        },
        include: {
            project: true,
        },
    });

}

export async function editTask(taskId: any, updatedTask: any) {
    const existingTask = await prisma.task.findUnique({
        where: {
            id: taskId,
        },
    });
    if (!existingTask) {
        throw ("Task not found");
    }
    const result = bugSchema.safeParse(updatedTask)
    if (!result.success) {
        throw result.error
    }
    const project = await prisma.task.update({
        where: {
            id: taskId,
        },
        data: {
            title: updatedTask.title,
            description: updatedTask.description,
            priority: updatedTask.priority,
            deadline: updatedTask.deadline,
        },
    });

    revalidatePath("/projects")
}

export async function deleteTask(id: any) {

    await prisma.task.delete({
        where: {
            id: id,
        }
    })

    revalidatePath("/")
}

export async function searchProject(term: string = "") {
    const session = await getServerSession(authOptions);


    return prisma.project.findMany({
        where: {
            name: {
                contains: term
            },
            userId: session?.user.id
        }
    })
}

export async function sortProject(sortBy: any) {
    const session = await getServerSession(authOptions);
    return prisma.project.findMany({
        where: {
            userId: session?.user.id
        },
        orderBy: {
            createdAt: sortBy
        }
    });
}

export async function updateUserProfile(updatedData: any) {
    const session = await getServerSession(authOptions);
    const result = settingSchema.safeParse(updatedData)
    if (!result.success) {
        throw result.error
    }
    return prisma.user.update({
        where: {
            id: session?.user.id
        },
        data: {
            firstName: updatedData.firstName,
            lastName: updatedData.lastName,
            email: updatedData.email,
            username: updatedData.username,
            // password: updatedData.password,
        }
    })
}
export async function getNumberOfProjectsByPriority(priority: any) {
    const session = await getServerSession(authOptions);
    return prisma.project.count({
        where: {
            priority: priority,
            userId: session?.user.id
        },
    });
}
export async function getNumberOfProjectsPerMonth(year: any) {
    const session = await getServerSession(authOptions)
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const projectsPerMonth:any = {};
    for (const month of months) {
        const startDate = new Date(year, months.indexOf(month), 1);
        const endDate = new Date(year, months.indexOf(month) + 1, 0);
        const projectCount = await prisma.project.count({
            where: {
                userId: session?.user.id,
                AND: [
                    { createdAt: { gte: startDate } },
                    { createdAt: { lte: endDate } }
                ]
            }
        });
        projectsPerMonth[month] = projectCount;
    }
    return projectsPerMonth;
}

// export async function generateExcels() {
//
//     const session = await getServerSession(authOptions);
//
//     const projects = await prisma.project.findMany({
//         where: {
//             userId: session?.user.id
//         }
//     })
//
//
//     const HEADER_ROW = [
//         {value: 'Name', fontWeight: 'bold'},
//         {value: 'Date of Birth', fontWeight: 'bold'},
//         // {value: 'Cost', fontWeight: 'bold'},
//         // {value: 'Paid', fontWeight: 'bold'},
//     ];
//
//     const DATA_ROW_1 = projects.map(function (project){
//         return [{ type: String,  value: project.name }, {type: String, value: project.description}]
//     })
//
//
//     // const DATA_ROW_1 = [
//     //     {type: String, value: 'John Smith'},
//     //     {type: Date, value: new Date(), format: 'mm/dd/yyyy'},
//     //     {type: Number, value: 1800},
//     //     {type: Boolean, value: true},
//     // ];
//     const data = [HEADER_ROW, DATA_ROW_1];
// }


