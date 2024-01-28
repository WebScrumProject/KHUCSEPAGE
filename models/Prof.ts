import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

interface History {
  Date: string;
  Content: string;
}

interface DBProf extends mongoose.Document {
  profName: string;
  profMajor: string;
  profPhone: string;
  profEmail: string;
  profLab: string;
  profLink: string;
  recNumber: string;
  recDate: string;
  profHistory: History[];
  labHistory: History[];
}

type DBProfModel = mongoose.Model<DBProf, {}, {}>;

const profSchema = new Schema<DBProf>({
  profName: { type: String, required: true },
  profMajor: { type: String, required: true },
  profPhone: { type: String, required: true },
  profEmail: { type: String, required: true },
  profLab: { type: String, required: true },
  profLink: { type: String, required: true },
  recNumber: { type: String, required: true },
  recDate: { type: String, required: true },
  profHistory: [
    {
      Date: { type: String },
      Content: { type: String },
    },
  ],
  labHistory: [
    {
      Date: { type: String },
      Content: { type: String },
    },
  ],
});

const Prof = mongoose.model<DBProf, DBProfModel>("Prof", profSchema);

export { DBProf, Prof, DBProfModel };
