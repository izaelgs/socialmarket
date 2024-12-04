import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { S3 } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
import * as dotenv from "dotenv";
import * as path from "path";

dotenv.config();

@Injectable()
export class FileService {
  AWS_S3_BUCKET = "socialtraders-files";
  AWS_REGION = "sa-east-1";

  s3 = new S3({
    region: this.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_S3_ACCESS_KEY,
    },
  });

  async upload(file: Express.Multer.File, folder: string) {
    const fileExt = path.extname(file.originalname);
    const newFileName = uuidv4().slice(0, 8) + fileExt; // Using only first 8 chars of UUID
    const key = `${folder}/${newFileName}`.replace(/\/+/g, "/"); // Normalize slashes

    return await this.s3_upload(file.buffer, key, file.mimetype);
  }

  async s3_upload(file: Buffer, key: string, mimetype: string) {
    const params = {
      Bucket: this.AWS_S3_BUCKET,
      Key: key,
      Body: file,
      ACL: "public-read" as const,
      ContentType: mimetype,
      ContentDisposition: "inline",
    };

    try {
      await this.s3.putObject(params);
      return `https://${this.AWS_S3_BUCKET}.s3.${this.AWS_REGION}.amazonaws.com/${key}`;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        error.message || "Erro ao enviar arquivo para S3",
      );
    }
  }

  async s3_delete(key: string) {
    const params = {
      Bucket: this.AWS_S3_BUCKET,
      Key: key,
    };

    try {
      return await this.s3.deleteObject(params);
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        error.message || "Erro ao deletar arquivo do S3",
      );
    }
  }
}
