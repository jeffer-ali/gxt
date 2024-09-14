import { NextResponse } from "next/server";
// import { revalidatePath } from "next/cache";
import fs from "node:fs/promises";
import cosUpload from "@/lib/cosUpload"

export async function POST(req: Request) {
    const formData = await req.formData();

    const file = formData.get("file") as File;
    console.log('upload文件名', file.name);
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);
    await fs.writeFile(`/tmp/${file.name}`, buffer);

    try {
        const result:string | null | undefined = await cosUpload(`/tmp/${file.name}`, `gxt/${file.name}`)
        
        if(result) {
            return NextResponse.json({
                status: 200,
                url: result,
            });
        }
       
        return NextResponse.json({ status: 404 });
    } catch (error) {
        // 处理错误情况
        console.error("cos上传失败:", error);
        return NextResponse.json({ status: 403 });
    }
}
