import { Injectable } from "@nestjs/common";
// import { writeFile } from "fs/promises";
import * as AWS from "aws-sdk";
import { v4 as uuidv4 } from "uuid";

@Injectable()
export class FileService {
  AWS_S3_BUCKET = "social-market";

  s3 = new AWS.S3({
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_S3_ACCESS_KEY,
  });

  async upload(file: Express.Multer.File, path: string) {
    console.log({
      accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_S3_ACCESS_KEY,
    });

    const newFileName = uuidv4();

    return await this.s3_upload(
      file.buffer,
      this.AWS_S3_BUCKET,
      newFileName,
      file.mimetype,
      path,
    );
  }

  async s3_upload(
    file: Buffer,
    bucket: string,
    name: string,
    mimetype: string,
    path: string,
  ) {
    const params = {
      Bucket: bucket,
      Key: String(name),
      Body: file,
      ACL: "public-read",
      ContentType: mimetype,
      ContentDisposition: "inline",
      path,
      CreateBucketConfiguration: {
        LocationConstraint: "ap-south-1",
      },
    };

    try {
      const s3Response = await this.s3.upload(params).promise();
      return s3Response;
    } catch (error) {
      throw error;
    }
  }
}
