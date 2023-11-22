import {atom} from "jotai";
import {Project, Task} from "@prisma/client";

export const currentProjectAtom = atom<Project | null>(null)
export const currentTaskAtom = atom<Task | null>(null)
export const modalOpenedAtom = atom<boolean>(false)

export const activeTaskAtom = atom<Task | null>(null);

export interface IColumn {
    id: string,
    name: string
}
export const columnsAtom = atom<IColumn[]>([
    {
        id: "todo",
        name: "To Do"
    },
    {
        id: "in_progress",
        name: "In Progress"
    },
    {
        id: "done",
        name: "Done"
    }
])
