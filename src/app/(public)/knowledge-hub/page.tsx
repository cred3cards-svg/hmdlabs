import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Tag, Clock, ArrowRight, TrendingUp } from "lucide-react";

export const metadata: Metadata = {
  title: "Knowledge Hub – Health Tips, Test Guides & Disease Info | HMD Labs West Bengal",
  description:
    "Expert health articles, diagnostic test guides, disease information and preventive care tips curated for West Bengal patients. Free health knowledge from NABL accredited HMD Labs.",
};

const CATEGORIES = [
  { label: "All Articles", slug: "all", count: 48 },
  { label: "Health Tips", slug: "health-tips", count: 12 },
  { label: "Test Guides", slug: "test-guide", count: 15 },
  { label: "Disease Info", slug: "disease-info", count: 8 },
  { label: "Nutrition", slug: "nutrition", count: 6 },
  { label: "Preventive Care", slug: "preventive-care", count: 5 },
  { label: "Lab Science", slug: "lab-science", count: 2 },
];

const FEATURED_ARTICLE = {
  title: "Complete Guide to Blood Tests: What Every West Bengal Patient Should Know",
  excerpt:
    "From CBC to LFT – understand your diagnostic reports, normal ranges, and what abnormal values mean for your health.",
  category: "Test Guide",
  readTime: "8 min read",
  date: "March 2025",
  tags: ["Blood Test", "Report Understanding", "CBC", "LFT"],
};

const ARTICLES = [
  {
    title: "Why Fasting Matters Before Your Blood Test",
    excerpt: "Learn which tests require fasting, how long to fast, and what you can drink before your sample collection.",
    category: "Test Guide",
    readTime: "5 min",
    date: "Feb 2025",
    tags: ["Fasting", "Blood Test Prep"],
    popular: true,
  },
  {
    title: "Dengue Season in West Bengal: Symptoms, Tests & Prevention",
    excerpt: "Every monsoon, West Bengal sees dengue spikes. Know the NS1 Antigen, IgM/IgG tests and early warning signs.",
    category: "Disease Info",
    readTime: "6 min",
    date: "Jan 2025",
    tags: ["Dengue", "Monsoon", "West Bengal"],
    popular: true,
  },
  {
    title: "Thyroid Disorders in Women: Understanding TSH, T3, T4",
    excerpt: "Hypothyroidism affects 1 in 10 women in India. Know the symptoms, tests, and normal reference ranges.",
    category: "Health Tips",
    readTime: "7 min",
    date: "Jan 2025",
    tags: ["Thyroid", "Women Health", "Hormones"],
    popular: true,
  },
  {
    title: "Diabetes Management: HbA1c vs Blood Glucose – What's the Difference?",
    excerpt: "HbA1c gives a 3-month average; glucose shows today's level. Both matter. Here's why.",
    category: "Disease Info",
    readTime: "5 min",
    date: "Dec 2024",
    tags: ["Diabetes", "HbA1c", "Blood Sugar"],
    popular: false,
  },
  {
    title: "Vitamin D Deficiency: Why It's Epidemic in Kolkata Despite Sunshine",
    excerpt: "Paradoxically, Indians are vitamin D deficient despite abundant sun. Understand the causes and testing.",
    category: "Nutrition",
    readTime: "4 min",
    date: "Dec 2024",
    tags: ["Vitamin D", "Deficiency", "Kolkata"],
    popular: false,
  },
  {
    title: "Understanding Your Complete Blood Count (CBC) Report",
    excerpt: "Haemoglobin, WBC, platelets, MCV, MCH – decode every parameter in your CBC report with normal ranges.",
    category: "Test Guide",
    readTime: "9 min",
    date: "Nov 2024",
    tags: ["CBC", "Report Reading", "Haematology"],
    popular: true,
  },
  {
    title: "Liver Health: When Should You Get an LFT?",
    excerpt: "Fatty liver, jaundice, alcohol use – know the indicators for getting a Liver Function Test done.",
    category: "Health Tips",
    readTime: "5 min",
    date: "Nov 2024",
    tags: ["Liver", "LFT", "Fatty Liver"],
    popular: false,
  },
  {
    title: "Annual Health Checkup at 30, 40, 50: Age-Specific Test Guide",
    excerpt: "Your body's needs change with age. Here's exactly which tests to prioritize at each decade.",
    category: "Preventive Care",
    readTime: "6 min",
    date: "Oct 2024",
    tags: ["Preventive", "Annual Checkup", "Age-Specific"],
    popular: false,
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  "Test Guide": "bg-brand-50 text-brand-700",
  "Health Tips": "bg-green-50 text-green-700",
  "Disease Info": "bg-red-50 text-red-700",
  "Nutrition": "bg-orange-50 text-orange-700",
  "Preventive Care": "bg-purple-50 text-purple-700",
  "Lab Science": "bg-gray-100 text-gray-700",
};

export default function KnowledgeHubPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-brand-900 text-white py-12">
        <div className="section-container">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="h-6 w-6 text-amber-400" />
            <span className="badge-nabl text-xs">Expert Health Content</span>
          </div>
          <h1 className="text-3xl font-bold font-display sm:text-4xl">Knowledge Hub</h1>
          <p className="mt-2 text-brand-200 max-w-2xl">
            Evidence-based health articles, diagnostic guides and preventive care tips — curated by 
            HMD Labs' medical team for patients across West Bengal.
          </p>

          {/* Search */}
          <div className="mt-6 flex max-w-xl gap-2">
            <input
              type="text"
              placeholder="Search articles, topics, conditions..."
              className="flex-1 rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-sm text-white placeholder-brand-300 focus:outline-none focus:ring-2 focus:ring-white/20"
            />
            <button className="btn-accent shrink-0">Search</button>
          </div>
        </div>
      </div>

      <div className="section-container py-10">
        {/* Category tabs */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.slug}
              className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-colors whitespace-nowrap ${
                cat.slug === "all"
                  ? "bg-brand-700 text-white"
                  : "bg-white border border-gray-200 text-gray-700 hover:border-brand-300 hover:text-brand-700"
              }`}
            >
              {cat.label}
              <span className="ml-1.5 text-[10px] opacity-60">{cat.count}</span>
            </button>
          ))}
        </div>

        {/* Featured article */}
        <div className="mb-10 rounded-3xl bg-gradient-to-r from-brand-900 to-brand-700 p-8 text-white">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="h-5 w-5 text-amber-400" />
            <span className="text-sm font-semibold text-amber-400">Featured Article</span>
          </div>
          <h2 className="text-2xl font-bold font-display sm:text-3xl leading-tight max-w-2xl">
            {FEATURED_ARTICLE.title}
          </h2>
          <p className="mt-3 text-brand-200 max-w-xl">{FEATURED_ARTICLE.excerpt}</p>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-brand-300">
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" /> {FEATURED_ARTICLE.readTime}
            </span>
            <span>{FEATURED_ARTICLE.date}</span>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {FEATURED_ARTICLE.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-white/10 px-3 py-0.5 text-xs">
                {tag}
              </span>
            ))}
          </div>
          <Link
            href="/knowledge-hub/blood-test-guide"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-brand-900 hover:bg-brand-50 transition-colors"
          >
            Read Article <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Articles grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {ARTICLES.map((article, i) => (
            <Link
              key={i}
              href={`/knowledge-hub/${article.title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")}`}
              className="card p-5 flex flex-col hover:-translate-y-0.5 transition-transform"
            >
              {/* Placeholder image */}
              <div className="rounded-xl bg-gradient-to-br from-brand-50 to-brand-100 h-32 mb-4 flex items-center justify-center">
                <BookOpen className="h-10 w-10 text-brand-200" />
              </div>

              <div className="flex items-center gap-2 mb-2">
                <span
                  className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${
                    CATEGORY_COLORS[article.category] || "bg-gray-100 text-gray-700"
                  }`}
                >
                  {article.category}
                </span>
                {article.popular && (
                  <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-700">
                    Popular
                  </span>
                )}
              </div>

              <h3 className="font-semibold text-gray-900 text-sm leading-snug font-display flex-1">
                {article.title}
              </h3>
              <p className="mt-1.5 text-xs text-gray-500 leading-relaxed line-clamp-2">{article.excerpt}</p>

              <div className="mt-3 flex items-center justify-between text-xs text-gray-400">
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" /> {article.readTime}
                </span>
                <span>{article.date}</span>
              </div>

              <div className="mt-2 flex flex-wrap gap-1">
                {article.tags.slice(0, 2).map((tag) => (
                  <span key={tag} className="flex items-center gap-0.5 text-[9px] text-gray-400">
                    <Tag className="h-2.5 w-2.5" /> {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>

        {/* Load more */}
        <div className="mt-10 text-center">
          <button className="btn-secondary">Load More Articles</button>
        </div>
      </div>
    </div>
  );
}
