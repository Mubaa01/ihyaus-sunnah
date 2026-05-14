// Completed Series Store - Books and Islamic texts completed by the foundation

export const defaultCompletedSeries = [
  {
    id: "series-1",
    title: "Tafsir Ibn Kathir - Complete",
    author: "Imam Ibn Kathir",
    category: "Qur'anic Exegesis",
    completionDate: "2024-03-15",
    totalVolumes: 8,
    language: "Arabic",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=400&fit=crop",
    description: "Complete 8-volume tafsir of the Holy Qur'an by the renowned scholar Ibn Kathir.",
    instructor: "Dr. Umar Farooq",
    duration: "2 years",
    participants: 45,
    highlights: [
      "Comprehensive explanation of verses",
      "Historical context and hadith references",
      "Practical lessons for modern life"
    ]
  },
  {
    id: "series-2",
    title: "Sahih Al-Bukhari - Complete",
    author: "Imam Al-Bukhari",
    category: "Hadith Sciences",
    completionDate: "2024-01-20",
    totalVolumes: 9,
    language: "Arabic",
    image: "https://images.unsplash.com/photo-1584634731339-252c581abfc5?w=300&h=400&fit=crop",
    description: "The complete collection of authentic hadith compiled by Imam Al-Bukhari.",
    instructor: "Sheikh Abdulrazzak",
    duration: "18 months",
    participants: 32,
    highlights: [
      "Most authentic hadith collection",
      "Detailed authentication methodology",
      "Practical applications in daily life"
    ]
  },
  {
    id: "series-3",
    title: "Riyad-us-Saliheen",
    author: "Imam An-Nawawi",
    category: "Islamic Ethics",
    completionDate: "2023-11-10",
    totalVolumes: 2,
    language: "Arabic",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=400&fit=crop",
    description: "Garden of the Righteous - collection of hadith on Islamic manners and ethics.",
    instructor: "Ustadha Fatima",
    duration: "8 months",
    participants: 28,
    highlights: [
      "Islamic manners and etiquette",
      "Character development",
      "Social relationships guidance"
    ]
  },
  {
    id: "series-4",
    title: "Al-Arba'un Nawawiyyah",
    author: "Imam An-Nawawi",
    category: "Hadith Collection",
    completionDate: "2023-09-05",
    totalVolumes: 1,
    language: "Arabic",
    image: "https://images.unsplash.com/photo-1609599006353-6290aa7e9fe3?w=300&h=400&fit=crop",
    description: "The Forty Hadith of Imam An-Nawawi - essential hadith for every Muslim.",
    instructor: "Dr. Umar Farooq",
    duration: "4 months",
    participants: 67,
    highlights: [
      "Fundamental Islamic principles",
      "Comprehensive coverage of faith",
      "Memorization and understanding"
    ]
  },
  {
    id: "series-5",
    title: "Seerah of Prophet Muhammad ﷺ",
    author: "Various Scholars",
    category: "Biography",
    completionDate: "2023-07-12",
    totalVolumes: 4,
    language: "Arabic",
    image: "https://images.unsplash.com/photo-1519817650390-64a93db51149?w=300&h=400&fit=crop",
    description: "Complete biography of the Prophet Muhammad ﷺ using authentic sources.",
    instructor: "Sheikh Abdulrazzak",
    duration: "12 months",
    participants: 52,
    highlights: [
      "Life of the Prophet ﷺ",
      "Lessons from his seerah",
      "Historical accuracy and authenticity"
    ]
  },
  {
    id: "series-6",
    title: "Fiqh As-Sunnah",
    author: "Sayyid Sabiq",
    category: "Islamic Jurisprudence",
    completionDate: "2023-05-08",
    totalVolumes: 5,
    language: "Arabic",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=400&fit=crop",
    description: "Comprehensive fiqh manual based on Qur'an and Sunnah.",
    instructor: "Sheikh Abdulrazzak",
    duration: "14 months",
    participants: 38,
    highlights: [
      "Practical Islamic rulings",
      "Evidence-based approach",
      "Contemporary applications"
    ]
  }
];

export const getCompletedSeries = () => {
  try {
    const stored = localStorage.getItem("ihyaus_completed_series");
    return stored ? JSON.parse(stored) : defaultCompletedSeries;
  } catch {
    return defaultCompletedSeries;
  }
};

export const saveCompletedSeries = (series) => {
  localStorage.setItem("ihyaus_completed_series", JSON.stringify(series));
};

export const getCompletedSeriesById = (id) => {
  const series = getCompletedSeries();
  return series.find((s) => s.id === id);
};

export const addCompletedSeries = (newSeries) => {
  const series = getCompletedSeries();
  const withId = {
    ...newSeries,
    id: `series-${Date.now()}`,
  };
  series.unshift(withId); // Add to beginning (most recent first)
  saveCompletedSeries(series);
  return withId;
};

export const updateCompletedSeries = (id, updates) => {
  const series = getCompletedSeries();
  const index = series.findIndex((s) => s.id === id);
  if (index !== -1) {
    series[index] = { ...series[index], ...updates };
    saveCompletedSeries(series);
    return series[index];
  }
  return null;
};

export const deleteCompletedSeries = (id) => {
  const series = getCompletedSeries();
  const filtered = series.filter((s) => s.id !== id);
  saveCompletedSeries(filtered);
  return filtered;
};

export const getSeriesStats = () => {
  const series = getCompletedSeries();
  return {
    totalSeries: series.length,
    totalVolumes: series.reduce((sum, s) => sum + s.totalVolumes, 0),
    totalParticipants: series.reduce((sum, s) => sum + s.participants, 0),
    categories: [...new Set(series.map(s => s.category))],
    recentCompletions: series.filter(s => {
      const completionDate = new Date(s.completionDate);
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
      return completionDate >= sixMonthsAgo;
    }).length
  };
};
