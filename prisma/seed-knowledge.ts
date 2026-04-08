import { PrismaClient, KnowledgeHubCategory } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const articles: any[] = [
    {
      title: "India's New 2024 Dietary Guidelines: Bridging the Nutrition Gap",
      slug: "icmr-nin-dietary-guidelines-2024",
      excerpt: "The ICMR-NIN 2024 report highlights a critical shift in Indian nutrition. Learn the new standards for balanced plates, sugar limits, and salt intake.",
      category: "HEALTH_TIPS",
      authorName: "HMD Labs Medical Team",
      isPublished: true,
      publishedAt: new Date(),
      imageUrl: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=800",
      content: `
## The 2024 Nutritional Reset

The **Indian Council of Medical Research (ICMR)** and the **National Institute of Nutrition (NIN)** have released their first major update to dietary guidelines in over a decade. These 2024 guidelines address a dual burden in India: rising obesity and persistent micronutrient deficiencies.

### 1. The Proportional Plate
The new "My Plate" for India suggests that **cereals and millets should contribute no more than 45%** of daily calories. This is a significant shift from traditional high-carb diets. 
*   **Pulses and Meat:** Up to 15%
*   **Vegetables and Fruits:** Remaining 40% (at least 400g vegetables and 100g fruits daily)

### 2. Sugar and Salt: The Strict New Limits
The guidelines are firm on limiting processed foods:
*   **Added Sugar:** No more than 5% of daily calories (roughly 25g-30g for an average adult).
*   **Salt:** Capped at 5g per day to combat rising hypertension.

### 3. Protein Quality Matters
Rather than focusing solely on quantity, the ICMR emphasizes diverse protein sources. Combining cereals with pulses (ratio of 3:1) ensures a complete amino acid profile for vegetarians.

### Why This Matters for You
Following these guidelines can prevent up to **80% of Type 2 Diabetes** cases in the Indian population. Regular screening for blood glucose and lipid profiles is recommended to track your metabolic progress.
      `,
      tags: ["ICMR", "Nutrition", "Diet", "Health Tips"]
    },
    {
      title: "Managing Type 2 Diabetes in 2025: Beyond Just Blood Sugar",
      slug: "managing-type-2-diabetes-2025",
      excerpt: "Modern diabetes care focuses on holistic metabolic health. Discover how lifestyle triggers and early screening can reverse pre-diabetes.",
      category: "DISEASE_INFO",
      authorName: "Dr. Aarti Sharma, Endocrinologist",
      isPublished: true,
      publishedAt: new Date(),
      imageUrl: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800",
      content: `
## A Holistic Shift in Diabetes Care

In 2025, diabetes management is moving away from "managing the number" to "managing the person." With India often called the 'diabetes capital', early detection and lifestyle reversal have never been more critical.

### The Glycemic Index (GI) Strategy
It's not just about stopping sugar; it's about choosing **Low GI foods**. 
*   Substitute white rice with **Brown Top Millet** or **Steel-cut Oats**.
*   Include fiber at every meal (salads before main course).

### The Role of Physical Activity
The latest medical consensus suggests that **post-meal walks (10-15 minutes)** are more effective at stabilizing blood glucose than a single long gym session. Muscle contraction during walking helps soak up glucose from the bloodstream even without high insulin levels.

### When to Screen?
If you are over 30 and have a sedentary lifestyle, an **HbA1c test** every six months is the gold standard for tracking your 3-month average sugar levels.

### Related Tests
It is vital to monitor **Kidney Function (KFT)** and **Liver Function (LFT)** regularly, as chronic high sugar can impact multi-organ health.
      `,
      tags: ["Diabetes", "Endocrinology", "Metabolic Health"]
    },
    {
      title: "The Thyroid-Diabetes Link: Why You Should Screen Both",
      slug: "thyroid-diabetes-connection",
      excerpt: "Did you know that 1 in 3 diabetic patients also has a thyroid disorder? Understand the metabolic link and why dual screening is vital.",
      category: "TEST_GUIDE",
      authorName: "HMD Labs Editorial Team",
      isPublished: true,
      publishedAt: new Date(),
      imageUrl: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=800",
      content: `
## The Intertwined Hormones

Thyroid hormones and insulin are the masters of your metabolism. When one fails, the other often follows. Recent studies in India show a high prevalence of **Hypothyroidism** among Type 2 Diabetic patients.

### How Thyroid Impacts Diabetes
1.  **Hypothyroidism:** Slows metabolism, leading to weight gain and increased insulin resistance.
2.  **Hyperthyroidism:** Can increase glucose production in the liver, making sugar harder to control.

### Symptoms to Watch
*   Unexplained weight changes despite stable sugar levels.
*   Persistent fatigue or muscle weakness.
*   Cold intolerance or dry skin.

### The Screening Recommendation
For patients who have had diabetes for more than 5 years, an annual **Thyroid Profile (T3, T4, TSH)** is mandatory to prevent cardiovascular complications.
      `,
      tags: ["Thyroid", "Hormones", "Screening"]
    },
    {
      title: "Vitamin B12 & D: The Silent Epidemics in Indian Households",
      slug: "vitamin-b12-d-deficiency-india",
      excerpt: "Over 70% of Indians are deficient in Vitamin D or B12. Learn the symptoms of 'Micro-malnutrition' and how to bridge the gap Safely.",
      category: "PREVENTIVE_CARE",
      authorName: "HMD Labs Medical Team",
      isPublished: true,
      publishedAt: new Date(),
      imageUrl: "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?auto=format&fit=crop&q=80&w=800",
      content: `
## Understanding 'Micro-Malnutrition'

You might be eating enough calories but not enough nutrients. In India, **Vitamin B12** and **Vitamin D** deficiencies are widespread across all socio-economic groups.

### Vitamin B12: The Energy Maker
Especially common in vegetarian diets, B12 is crucial for nerve health.
*   **Symptoms:** Numbness in hands/feet, memory fog, chronic fatigue.
*   **Metformin Link:** Long-term diabetes medication (metformin) can interfere with B12 absorption.

### Vitamin D: The Sunshine Vitamin
Despite being a tropical country, indoor lifestyles have left millions with low Vitamin D.
*   **Impact:** Weak bones, low immunity, and higher risk of depression.
*   **Target:** ICMR suggests maintaining levels between **30-100 ng/mL**.

### The Action Plan
Don't wait for symptoms. A simple **Vitamin Profile blood test** can identify deficiencies before they turn into chronic pain or nerve damage.
      `,
      tags: ["Vitamins", "B12", "Vitamin D", "Preventive"]
    }
  ];

  console.log("Seeding Knowledge Hub articles...");

  for (const article of articles) {
    const standardizedSlug = article.slug.toLowerCase().trim();
    await prisma.knowledgeHubArticle.upsert({
      where: { slug: standardizedSlug },
      update: { ...article, slug: standardizedSlug, isPublished: true },
      create: { ...article, slug: standardizedSlug, isPublished: true },
    });
  }

  console.log("Seeding completed successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
