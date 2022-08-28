import fileUpload from 'express-fileupload';
import {v4 as uuid} from 'uuid';
import {fileStorage} from '../../config/bootstrap';
import {FileMetaData} from '../interface/types/File';
/**
 * File manager Class for Handling Files
 * @class{FileManager}
 */
export class FileManager {
  private _fileStoragePath : any = fileStorage || './FILESYSTEM/';
  /**
   * Upload a file
   * @param{fileUpload.UploadedFile|fileUpload.UploadedFile[]} uploadedFile
   * @return{FileMetaData| boolean}
   */
  public upload = async (uploadedFile :
        fileUpload.UploadedFile|fileUpload.UploadedFile[]):
          Promise<FileMetaData| boolean> =>{
    if (!Array.isArray(uploadedFile)) {
      const uuidForFileNaming: string = uuid();
      const filePath : string =
        this._fileStoragePath+uuidForFileNaming+'_'+uploadedFile.name;
      uploadedFile.mv(filePath, (error)=>{
        return false;
      });
      const fileMetaData: FileMetaData =
        {path: filePath,
          size: uploadedFile.size,
          mimetype: uploadedFile.mimetype};
      return fileMetaData;
    } else {
      return false;
    }
  };
}
