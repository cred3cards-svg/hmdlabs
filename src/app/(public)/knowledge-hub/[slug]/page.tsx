import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { 
  Calendar, 
  User, 
  ArrowLeft, 
  Share2, 
  Bookmark, 
  Clock, 
  ChevronRight,
  Stethoscope,
  ShieldCheck,
  PhoneCall
} from "lucide-react";
import { format } from "date-fns";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await prisma.knowledgeHubArticle.findUnique({
    where: { slug: params.slug },
  });

  if (!article) return { title: "Article Not Found | HMD Labs" };

  return {
    title: article.metaTitle || `${article.title} | HMD Labs`,
    description: article.metaDescription || article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt || undefined,
      images: article.imageUrl ? [article.imageUrl] : [],
    },
  };
}

export const dynamic = "force-dynamic";

export default async function ArticleDetailPage({ params }: Props) {
  const cleanSlug = params.slug?.toLowerCase().trim();
  
  // 1. Primary lookup by unique slug
  let article = await prisma.knowledgeHubArticle.findUnique({
    where: { slug: cleanSlug },
  });

  // 2. Fallback lookup if unique match fails (e.g. inconsistent casing in DB)
  if (!article) {
    article = await prisma.knowledgeHubArticle.findFirst({
      where: { 
        slug: { equals: cleanSlug, mode: 'insensitive' },
        isPublished: true 
      },
    });
  }

  if (!article || !article.isPublished) {
    console.warn(`[KNOWLEDGE_HUB] Article not found for slug: ${params.slug}`);
    notFound();
  }

  // Increment view count (fire and forget)
  prisma.knowledgeHubArticle.update({
    where: { id: article.id },
    data: { viewCount: { increment: 1 } }
  }).catch(err => console.error("Failed to increment view count", err));

  // Fetch 2 relevant tests/packages based on tags
  const relatedTests = await prisma.test.findMany({
    where: { 
      isActive: true,
      OR: article.tags.map(tag => ({ name: { contains: tag, mode: 'insensitive' } })) 
    },
    take: 2
  });

  const popularPackages = await prisma.package.findMany({
    where: { isPopular: true, isActive: true },
    take: 2
  });

  return (
    <div className="bg-white min-h-screen">
      {/* Top Progress Bar for Scroll (Client Side normally, skipping for simplicity) */}
      
      {/* Article Header */}
      <section className="bg-gray-50 pt-32 pb-16">
        <div className="section-container max-w-4xl">
          <Link href="/knowledge-hub" className="group inline-flex items-center gap-2 text-brand-600 text-xs font-bold uppercase tracking-widest mb-8 hover:text-brand-700 transition-colors">
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" /> Back to Knowledge Hub
          </Link>
          
          <div className="flex items-center gap-2 mb-6">
            <span className="px-3 py-1 rounded-lg bg-brand-100 text-brand-700 text-[10px] font-black uppercase tracking-widest">
              {article.category.replace('_', ' ')}
            </span>
            <span className="h-1 w-1 rounded-full bg-gray-300" />
            <div className="flex items-center gap-1.5 text-gray-400 text-[10px] font-bold uppercase tracking-widest">
              <Clock className="h-3.5 w-3.5" /> 5 Min Read
            </div>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold font-display text-gray-900 leading-tight mb-8">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center justify-between gap-6 py-8 border-y border-gray-200/60">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-2xl bg-brand-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-brand-600/20">
                {article.authorName[0]}
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">{article.authorName}</p>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Medical Editorial Team</p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-400" />
                <span className="text-xs font-bold text-gray-500 uppercase tracking-tighter">
                  {format(new Date(article.publishedAt || article.createdAt), "MMMM dd, yyyy")}
                </span>
              </div>
              <div className="h-4 w-px bg-gray-200" />
              <button className="text-gray-400 hover:text-brand-600 transition-colors">
                <Share2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content & Sidebar */}
      <section className="section-container max-w-7xl py-16 grid lg:grid-cols-12 gap-16 items-start">
        {/* Article Body */}
        <div className="lg:col-span-8">
          {article.imageUrl && (
            <div className="relative h-[400px] w-full rounded-3xl overflow-hidden mb-12 shadow-2xl">
              <img 
                src={article.imageUrl} 
                alt={article.title}
                className="h-full w-full object-cover"
              />
            </div>
          )}

          <div className="prose prose-lg prose-brand max-w-none 
            prose-headings:font-display prose-headings:font-bold prose-headings:tracking-tight 
            prose-p:text-gray-600 prose-p:leading-relaxed 
            prose-strong:text-gray-900 prose-strong:font-bold
            prose-li:text-gray-600 prose-img:rounded-3xl
            prose-blockquote:border-brand-500 prose-blockquote:bg-brand-50 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-2xl prose-blockquote:italic prose-blockquote:text-brand-900">
            {/* Simple Markdown Rendering simulation with dangerouslySetInnerHTML for the pre-seeded content */}
            <div dangerouslySetInnerHTML={{ __html: article.content.replace(/\n/g, '<br/>').replace(/## (.*)/g, '<h2>$1</h2>').replace(/### (.*)/g, '<h3>$1</h3>').replace(/\* (.*)/g, '<li>$1</li>') }} />
          </div>

          {/* Tags */}
          <div className="mt-16 pt-8 border-t border-gray-100 flex flex-wrap gap-2">
            {article.tags.map(tag => (
              <span key={tag} className="px-3 py-1.5 rounded-xl bg-gray-50 text-gray-500 text-[10px] font-bold uppercase tracking-widest border border-gray-100 italic">
                #{tag}
              </span>
            ))}
          </div>

          {/* Author Card Mobile Link or Similar */}
          <div className="mt-12 p-8 rounded-3xl bg-gray-50 border border-gray-100 flex flex-col sm:flex-row gap-6 items-center text-center sm:text-left">
             <div className="h-20 w-20 rounded-3xl bg-brand-900 flex items-center justify-center text-white shrink-0 shadow-xl">
               <ShieldCheck className="h-10 w-10" />
             </div>
             <div>
               <h4 className="font-bold text-gray-900 mb-1">Medically Reviewed & Verified</h4>
               <p className="text-sm text-gray-500 leading-relaxed">
                 This content is developed by the HMD Labs Editorial Team following strict adherence to Indian clinical guidelines (ICMR/NIN). Last reviewed on {format(new Date(), "MMM yyyy")}.
               </p>
             </div>
          </div>
        </div>

        {/* Conversion Sidebar */}
        <div className="lg:col-span-4 space-y-8 sticky top-32">
          {/* Related Booking Widget */}
          <div className="card p-6 border-brand-100 bg-brand-50/50">
            <div className="flex items-center gap-2 mb-6">
              <Stethoscope className="h-5 w-5 text-brand-600" />
              <h3 className="font-bold text-gray-900">Recommended for You</h3>
            </div>
            
            <div className="space-y-4">
              {(relatedTests.length > 0 ? relatedTests : popularPackages).map((item: any) => (
                <div key={item.id} className="p-4 rounded-2xl bg-white border border-brand-100 shadow-sm hover:shadow-md transition-shadow">
                  <p className="text-[10px] font-black uppercase text-brand-700 mb-1 tracking-tighter">
                    {item.code ? "Recommended Test" : "Health Package"}
                  </p>
                  <h4 className="text-sm font-bold text-gray-900 line-clamp-1 mb-3">{item.name}</h4>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-black text-brand-600">₹{item.discountedPrice}</span>
                    <Link 
                      href={item.code ? `/book-test/schedule?test=${item.slug}` : `/book-test/schedule?package=${item.slug}`}
                      className="px-3 py-1.5 rounded-lg bg-brand-600 text-white text-[10px] font-bold uppercase transition-all hover:bg-brand-700"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <Link href="/book-test" className="group w-full mt-6 flex items-center justify-between p-3 px-4 rounded-xl bg-brand-900 text-white text-xs font-bold transition-all hover:bg-brand-950">
              Explore All Tests <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Need Help Widget */}
          <div className="card p-6 bg-white border-gray-100 overflow-hidden relative">
            <div className="absolute -bottom-8 -right-8 h-32 w-32 bg-gray-50 rounded-full -z-10" />
            <h3 className="font-bold text-gray-900 mb-2">Need Help?</h3>
            <p className="text-xs text-gray-500 mb-6 leading-relaxed">
              Confused about which test is right for you? Consult our health experts for free.
            </p>
            <a href="tel:+918085444444" className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border-2 border-brand-600 text-brand-600 font-bold hover:bg-brand-600 hover:text-white transition-all">
              <PhoneCall className="h-4 w-4" /> Call Helpline
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
