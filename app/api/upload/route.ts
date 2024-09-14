import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import fs from "node:fs/promises";
const ffmpeg: any = require('fluent-ffmpeg');
// const pathToFfmpeg: any = require("ffmpeg-static");

export async function POST(req: Request) {
    const formData = await req.formData();

    const file = formData.get("file") as File;
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);
    await fs.writeFile(`./public/uploads/${file.name}`, buffer);
    revalidatePath("/");
    const audioName =
      file.name.substring(0, file.name.lastIndexOf(".")) + ".wav";

    const processVideoToAudio = async () => {
        return new Promise((resolve, reject) => {
            ffmpeg(`./public/uploads/${file.name}`)
            .inputOptions('-vn')
            .output(`./public/uploads/${audioName}`)
            .on("end", async () => {
                revalidatePath("/");
                console.log("ffmpeg Processing finished!");
                resolve(`/uploads/${audioName}`)
            })
            .on("error", (err:any) => {
                console.error("Error:", err);
                reject(err);
            })
            .run();
        })
    }
    try {
        const result:unknown = await processVideoToAudio()
        
        return NextResponse.json({
            status: 200,
            url: result,
        });
       
    } catch (error) {
        // 处理错误情况
        console.error("Failed to format:", error);
        return NextResponse.json({ status: 403 });
    }
}
