import Link from "next/link";
import { ArrowRight, BookOpen, Calendar } from "lucide-react";

const ARTICLES = [
  { title: "Understanding Your CBC Report: A West Bengal Patient's Guide", category: "Test Guide", readTime: "5 min", slug: "understanding-cbc-report" },
  { title: "Why HbA1c is the Gold Standard for Diabetes Monitoring", category: "Disease Info", readTime: "4 min", slug: "hba1c-diabetes-monitoring" },
  { title: "Monsoon Health Risks in West Bengal: Key Tests to Book Now", category: "Health Tips", readTime: "6 min", slug: "monsoon-health-risks-wb" },
  { title: "Vitamin D Deficiency in Bengal: Causes, Symptoms & Solutions", category: "Nutrition", readTime: "5 min", slug: "vitamin-d-deficiency-bengal" },
];

export default function KnowledgeHubPreview() {
  return (
    <section className="section-py bg-gray-50">
      <div className="section-container">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="section-title">Knowledge Hub</h2>
            <p className="section-subtitle max-w-xl">
              Evidence-based health information tailored for West Bengal.
            </p>
          </div>
          <Link href="/knowledge-hub" className="btn-secondary hidden sm:inline-flex">
            All Articles
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ARTICLES.map((article) => (
            <Link
              key={article.slug}
              href={`/knowledge-hub/${article.slug}`}
              className="card p-5 flex flex-col gap-3 hover:no-underline"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50">
                <BookOpen className="h-5 w-5 text-brand-700" />
              </div>
              <div>
                <span className="inline-flex rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600 mb-2">
                  {article.category}
                </span>
                <h3 className="text-sm font-semibold text-gray-900 leading-snug font-display">{article.title}</h3>
              </div>
              <div className="mt-auto flex items-center gap-1.5 text-xs text-gray-500">
                <Calendar className="h-3.5 w-3.5" />
                {article.readTime} read
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
