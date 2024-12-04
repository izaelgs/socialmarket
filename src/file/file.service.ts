import { Injectable, InternalServerErrorException } from "@nestjs/common";
import * as AWS from "aws-sdk";
import { v4 as uuidv4 } from "uuid";
import * as dotenv from "dotenv";

dotenv.config();

@Injectable()
export class FileService {
  AWS_S3_BUCKET = "socialmarket-files";

  s3 = new AWS.S3({
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_S3_ACCESS_KEY,
  });

  async upload(file: Express.Multer.File, path: string) {
    const newFileName = uuidv4();

    return await this.s3_upload(file.buffer, newFileName, file.mimetype, path);
  }

  async s3_upload(file: Buffer, name: string, mimetype: string, path: string) {
    const params = {
      Bucket: this.AWS_S3_BUCKET,
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
      console.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  async s3_delete(Key: string) {
    const params = {
      Bucket: this.AWS_S3_BUCKET,
      Key: Key,
    };

    try {
      const s3Response = await this.s3.deleteObject(params).promise();
      return s3Response;
    } catch (error) {
      throw error;
    }
  }
}
