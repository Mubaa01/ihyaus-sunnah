import mongoose from "mongoose";
import dotenv from "dotenv";
import { Research, researchCategories, researchTypes } from "./models/Research.js";

dotenv.config();

const authors = [
  "عبد الله أحمد",
  "فاطمة محمود",
  "محمد إبراهيم",
  "عائشة يوسف",
  "خديجة سليمان",
  "عمر حسن",
  "مريم عبد الرحمن",
  "زينب علي",
  "إسماعيل خالد",
  "حفصة عبد الكريم",
  "مصطفى ناصر",
];

const imageUrls = [
  "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1519682337058-a94d519337bc?q=80&w=1200&auto=format&fit=crop",
  "",
];

const titleSubjects = {
  "دراسات القرآن": ["أثر تدبر القرآن في تزكية النفس", "منهج القرآن في بناء القيم", "دلالات الهداية في سورة النور"],
  "دراسات الحديث": ["منهج المحدثين في نقد الرواية", "أثر السنة في تهذيب السلوك", "دراسة تطبيقية في أحاديث الآداب"],
  "الفقه وأصوله": ["القواعد الفقهية في العبادات", "مقاصد الشريعة في رعاية الأسرة", "أثر العرف في الفتوى المعاصرة"],
  "العقيدة": ["أثر العقيدة الصحيحة في الاستقامة", "دلائل التوحيد في القرآن", "منهج أهل السنة في باب الإيمان"],
  "السيرة النبوية": ["الدروس التربوية من الهجرة", "القيادة النبوية في بناء المجتمع", "أخلاق النبي صلى الله عليه وسلم في الدعوة"],
  "اللغة العربية": ["أثر النحو في فهم النصوص الشرعية", "بلاغة البيان في القرآن الكريم", "تنمية مهارة الكتابة العربية للطلاب"],
  "التربية الإسلامية": ["أساليب التربية الإيمانية للناشئة", "دور المعلم في غرس القيم", "التوازن بين العلم والعمل في التربية"],
  "الدعوة والإرشاد": ["فقه الخطاب الدعوي للشباب", "أثر القدوة في نجاح الدعوة", "وسائل الإرشاد في المجتمع المعاصر"],
  "الدراسات المجتمعية": ["دور المسجد في إصلاح المجتمع", "التكافل الاجتماعي في ضوء السنة", "أثر التعليم الشرعي في الاستقرار الأسري"],
  "المرأة والأسرة": ["مكانة الأم في التربية الإسلامية", "حقوق الزوجين في ضوء الشريعة", "بناء الأسرة المسلمة بين العلم والعمل"],
  "تنمية الشباب": ["الشباب وحفظ الوقت في المنهج الإسلامي", "تنمية المسؤولية لدى طلاب العلم", "أثر الصحبة الصالحة في بناء الشخصية"],
};

const makeSummary = (category, title) =>
  `يتناول هذا البحث موضوع "${title}" ضمن مجال ${category}، ويعرض أهم المسائل العلمية المتعلقة به من خلال الرجوع إلى النصوص الشرعية وأقوال أهل العلم، مع إبراز الجوانب التطبيقية التي يحتاجها طالب العلم والمجتمع.`;

const seedResearch = researchCategories.flatMap((category, categoryIndex) =>
  titleSubjects[category].map((title, itemIndex) => {
    const number = categoryIndex * 3 + itemIndex + 1;

    return {
      title,
      author: authors[(categoryIndex + itemIndex) % authors.length],
      researchCategory: category,
      researchType: researchTypes[(categoryIndex + itemIndex) % researchTypes.length],
      status: itemIndex === 2 ? "under-review" : "published",
      summary: makeSummary(category, title),
      pdfUrl: `https://example.com/research/arabic-research-${number}.pdf`,
      pdfFileName: `arabic-research-${number}.pdf`,
      imageUrl: imageUrls[(categoryIndex + itemIndex) % imageUrls.length],
      tags: [category, "بحث طلابي", "seed-research"],
    };
  })
);

async function seed() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined");
    }

    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 8000,
    });

    await Research.deleteMany({ tags: "seed-research" });
    const result = await Research.insertMany(seedResearch);

    console.log(`Seeded ${result.length} Arabic research items.`);
    console.log(`Categories covered: ${researchCategories.length}`);
    process.exit(0);
  } catch (error) {
    console.error("Research seeding failed:", error.message);
    process.exit(1);
  }
}

seed();
