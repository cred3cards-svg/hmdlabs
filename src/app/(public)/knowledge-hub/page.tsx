"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Calendar, User, ArrowRight, Loader2, BookOpen } from "lucide-react";
import { format } from "date-fns";

const CATEGORIES = [
  { label: "All", value: "ALL" },
  { label: "Health Tips", value: "HEALTH_TIPS" },
  { label: "Test Guides", value: "TEST_GUIDE" },
  { label: "Disease Info", value: "DISEASE_INFO" },
  { label: "Nutrition", value: "NUTRITION" },
  { label: "Preventive Care", value: "PREVENTIVE_CARE" },
  { label: "Lab Science", value: "LAB_SCIENCE" },
];

export default function KnowledgeHubPage() {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("ALL");

  useEffect(() => {
    async function fetchArticles() {
      setLoading(true);
      try {
        const res = await fetch("/api/knowledge/list");
        if (res.ok) {
          const data = await res.json();
          setArticles(data);
        }
      } catch (err) {
        console.error("Failed to fetch articles", err);
      } finally {
        setLoading(false);
      }
    }
    fetchArticles();
  }, []);

  const filteredArticles = articles.filter(art => {
    const matchesSearch = art.title.toLowerCase().includes(search.toLowerCase()) || 
                         art.excerpt?.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === "ALL" || art.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Hero Section */}
      <section className="bg-brand-900 text-white pt-24 pb-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 h-96 w-96 rounded-full bg-brand-800/30 blur-3xl" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-64 w-64 rounded-full bg-brand-700/20 blur-2xl" />
        
        <div className="section-container relative z-10 text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-800/50 border border-brand-700 text-brand-300 text-[10px] font-bold uppercase tracking-wider mb-6">
            <BookOpen className="h-3.5 w-3.5" /> HMD Knowledge Hub
          </span>
          <h1 className="text-4xl md:text-5xl font-bold font-display mb-6 tracking-tight leading-tight">
            Your Gateway to a <br className="hidden md:block" /> <span className="text-brand-300">Healthier Lifestyle.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-brand-100 text-lg mb-10 leading-relaxed opacity-90">
            Empowering you with evidence-based health insights, diagnostic guides, and the latest medical guidelines from leading Indian health authorities.
          </p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto relative group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-brand-400 group-focus-within:text-brand-300 transition-colors">
              <Search className="h-5 w-5" />
            </div>
            <input 
              type="text" 
              className="w-full h-14 pl-12 pr-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white/15 transition-all text-lg shadow-2xl" 
              placeholder="Search health topics, tests, or diseases..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="section-container -mt-16 relative z-20">
        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {CATEGORIES.map(cat => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                activeCategory === cat.value 
                ? "bg-brand-600 text-white shadow-xl shadow-brand-600/20 scale-105" 
                : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-100"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl shadow-sm">
            <Loader2 className="h-10 w-10 animate-spin text-brand-600 mb-4" />
            <p className="text-gray-500 font-medium">Curating your health feed...</p>
          </div>
        ) : filteredArticles.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredArticles.map((art, idx) => (
              <ArticleCard key={art.id} article={art} index={idx} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-dashed border-gray-200">
            <div className="h-16 w-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-gray-300" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">No articles found</h3>
            <p className="text-gray-500 mt-2">Try adjusting your filters or search terms.</p>
          </div>
        )}
      </section>
    </div>
  );
}

function ArticleCard({ article, index }: { article: any, index: number }) {
  return (
    <Link href={`/knowledge-hub/${article.slug.toLowerCase().trim()}`} className="group h-full">
      <article className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col h-full border border-gray-100 hover:-translate-y-2">
        {/* Image Proxy */}
        <div className="relative h-56 w-full overflow-hidden">
          <img 
            src={article.imageUrl || "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=800"} 
            alt={article.title}
            className="group-hover:scale-110 transition-transform duration-700 h-full w-full object-cover"
          />
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 rounded-lg bg-white/90 backdrop-blur-sm text-brand-700 text-[10px] font-black uppercase tracking-widest shadow-sm">
              {article.category.replace('_', ' ')}
            </span>
          </div>
        </div>

        <div className="p-6 flex flex-col flex-1">
          <div className="flex items-center justify-between text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-4">
            <div className="flex items-center gap-1.5">
              <Calendar className="h-3 w-3" /> {format(new Date(article.publishedAt), "MMM dd, yyyy")}
            </div>
            <div className="flex items-center gap-2">
              <User className="h-3 w-3" /> By {article.authorName.split(',')[0]}
            </div>
          </div>
          
          <h2 className="text-xl font-bold font-display text-gray-900 group-hover:text-brand-600 transition-colors mb-3 line-clamp-2">
            {article.title}
          </h2>
          
          <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3">
            {article.excerpt}
          </p>

          <div className="mt-auto flex items-center justify-between pt-6 border-t border-gray-50">
             <div className="flex items-center gap-1.5 text-brand-600 text-xs font-black uppercase tracking-tighter group-hover:translate-x-1 transition-transform">
               Read Article <ArrowRight className="h-3.5 w-3.5" />
             </div>
             <div className="text-[10px] text-gray-300 font-bold uppercase italic">
               5 min read
             </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
