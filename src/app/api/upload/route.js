import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import uniqid from "uniqid";

export async function POST(req) {
    const data = await req.formData();

    if(data.get('file')) {
        const file = data.get('file');
        const region = 'eu-central-1'

        const s3Client = new S3Client({
            region: region,
            credentials: {
                accessKeyId: process.env.S3_AWS_ACCESS_KEY,
                secretAccessKey: process.env.S3_AWS_SECRET_KEY,
            },
        });

        const ext = file.name.split('.').slice(-1)[0];
        const newFileName = uniqid() + '.' + ext;

        const chunks = [];
        for await (const chunk of file.stream()) {
            chunks.push(chunk);
        }
        const buffer = Buffer.concat(chunks);

        const bucket = 'krisii0327-cardiary-app';

        s3Client.send(new PutObjectCommand({
            Bucket: bucket,
            Key: newFileName,
            ACL: 'public-read',
            ContentType: file.type,
            Body: buffer,
        }));

        const imageLink = 'https://'+bucket+'.s3.'+ region +'.amazonaws.com/'+newFileName;
        return Response.json(imageLink);
    }

    return Response.json(true);
}