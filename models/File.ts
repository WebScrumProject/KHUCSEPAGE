import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

interface DBFile extends mongoose.Document {
  fileUrl: String;
  fileName: String;
}

type DBFileModel = mongoose.Model<DBFile, {}, {}>;

const FileSchema = new Schema<DBFile>({
  fileUrl: {
    type: String,
    required: true,
  },
  fileName: {
    type: String,
    required: true,
  },
});

const File = mongoose.model<DBFile, DBFileModel>("File", FileSchema);

export { DBFile, File, DBFileModel };
