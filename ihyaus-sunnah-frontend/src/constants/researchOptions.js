export const researchCategories = [
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
]

export const researchTypes = [
  "بحث التخرج",
  "بحث فصلي",
  "بحث ميداني",
  "دراسة كتاب",
  "دراسة حديثية",
  "دراسة قرآنية",
  "بحث فقهي",
  "بحث لغوي",
  "بحث اجتماعي",
]

export const researchStatusOptions = [
  { value: "published", label: "منشور" },
  { value: "draft", label: "مسودة" },
  { value: "under-review", label: "قيد المراجعة" },
]

export const getResearchStatusLabel = (status) =>
  researchStatusOptions.find((option) => option.value === status)?.label || status
