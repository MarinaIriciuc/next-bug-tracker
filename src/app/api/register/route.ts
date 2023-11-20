export default async function POST(req: Request){

    const {email} = await req.json();
    console.log(email)
}