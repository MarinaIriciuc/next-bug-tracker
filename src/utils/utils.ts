"use server"
import prisma from "@/lib/prisma";
import {revalidatePath} from "next/cache";
import {projectSchema, ProjectSchema} from "@/schemas/ProjectSchema";
import {getServerSession} from "next-auth";
import {authOptions} from "@/utils/auth";
import {bugSchema} from "@/schemas/BugSchema";


export async function getProjects() {
    const session = await getServerSession(authOptions);

    return prisma.project.findMany({
        where: {
            userId: session?.user.id
        }
    });
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
            userId: session?.user.id
        }
    })
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

    revalidatePath("/")

}

export async function createTask(task: any) {
    const session = await getServerSession(authOptions);
    const result = bugSchema.safeParse(task)

    if (!result.success) {
        throw result.error;
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
    await prisma.task.create({
        data: {
            description: task.description,
            priority: task.priority,
            deadline: task.deadline,
            projectId: session?.user.id,
        }
    });
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

export async function sortProject(sortBy: any){
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