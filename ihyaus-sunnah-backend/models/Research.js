import mongoose from "mongoose";

const researchCategories = [
  "دراسات القرآن",
  "دراسات الحديث",
  "الفقه وأصوله",
  "العقيدة",
  "السيرة النبوية",
  "اللغة العربية",
  "التربية الإسلامية",
  "الدعوة والإرشاد",
  "الدراسات المجتمعية",
  "المرأة والأسرة",
  "تنمية الشباب",
];

const researchTypes = [
  "بحث التخرج",
  "بحث فصلي",
  "بحث ميداني",
  "دراسة كتاب",
  "دراسة حديثية",
  "دراسة قرآنية",
  "بحث فقهي",
  "بحث لغوي",
  "بحث اجتماعي",
];

const researchSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    researchCategory: {
      type: String,
      required: true,
      enum: researchCategories,
    },
    researchType: {
      type: String,
      required: true,
      enum: researchTypes,
    },
    staffId: { type: mongoose.Schema.Types.ObjectId, ref: "Staff" },
    programId: { type: mongoose.Schema.Types.ObjectId, ref: "Program" },
    status: {
      type: String,
      enum: ["published", "draft", "under-review"],
      default: "published",
      index: true,
    },
    summary: { type: String, required: true, trim: true },
    pdfUrl: { type: String, trim: true },
    pdfFileName: { type: String, trim: true },
    pdfKey: { type: String, trim: true },
    imageUrl: { type: String, trim: true },
    imageFileName: { type: String, trim: true },
    imageKey: { type: String, trim: true },
    tags: { type: [String], default: [] },
  },
  { timestamps: true }
);

researchSchema.index({
  title: "text",
  summary: "text",
  author: "text",
  tags: "text",
});

export const Research = mongoose.model("Research", researchSchema);
export { researchCategories, researchTypes };
