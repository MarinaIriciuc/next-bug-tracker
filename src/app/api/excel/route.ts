import { PrismaClient } from '@prisma/client';
import XLSX from 'xlsx';
import {getServerSession} from "next-auth";
import {authOptions} from "@/utils/auth";


export default async function GET(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).end(); // Returnează codul 405 dacă metoda nu este GET
  }
    const prisma = new PrismaClient();
    const userId = await getServerSession(authOptions);
    // Obține datele relevante din baza de date
    const projects = await prisma.project.findMany({
        where: {
            userId: userId?.user.id
        },
    });

    // Construiește formatul de date XLSX
    const data = projects.map((project) => ({
        name: project.name,
        description: project.description,
        // Adaugă mai multe câmpuri după nevoie
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Projects');

    // Generează fișierul XLSX în memorie
    const buffer = XLSX.write(wb, { bookType: 'xlsx', type: 'buffer' });

    // Trimite fișierul către client pentru descărcare
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=projects.xlsx');
    res.end(buffer);
}
