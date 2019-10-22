/**
 * Interface for a file upload handled by the multer library
 * @deprecated
 * Created by: Long Hung Nguyen (longhungn)
 */
export class IMulterUploadedFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
}
