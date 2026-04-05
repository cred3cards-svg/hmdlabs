// prisma/seed.ts
import { PrismaClient, WBDistrict, FranchiseType, UserRole, ReportFormat } from "@prisma/client";
import bcrypt from "bcryptjs";
import { calculateFranchiseLeadScore, getLeadScoreLabel } from "../src/lib/utils";

const prisma = new PrismaClient();

const POPULAR_TESTS = [
  { name: "Complete Blood Count (CBC)", code: "CBC", mrp: 400, price: 249, tat: 6, sample: "Blood", category: "Haematology" },
  { name: "Liver Function Test (LFT)", code: "LFT", mrp: 650, price: 449, tat: 8, sample: "Blood", category: "Biochemistry" },
  { name: "Kidney Function Test (KFT)", code: "KFT", mrp: 750, price: 499, tat: 8, sample: "Blood", category: "Biochemistry" },
  { name: "Thyroid Profile (T3/T4/TSH)", code: "TFT", mrp: 900, price: 599, tat: 12, sample: "Blood", category: "Endocrinology" },
  { name: "HbA1c (Glycated Haemoglobin)", code: "HBA1C", mrp: 600, price: 399, tat: 6, sample: "Blood", category: "Diabetes" },
  { name: "Lipid Profile", code: "LIPID", mrp: 700, price: 449, tat: 8, sample: "Blood", category: "Cardiology" },
  { name: "Vitamin D (25-OH)", code: "VITD", mrp: 1400, price: 799, tat: 24, sample: "Blood", category: "Vitamins" },
  { name: "Vitamin B12", code: "VITB12", mrp: 1200, price: 699, tat: 24, sample: "Blood", category: "Vitamins" },
];

const PACKAGES = [
  { name: "Basic Health Screen", slug: "basic-health", targetGroup: "All Adults", mrp: 1800, price: 999, tests: ["CBC", "Blood Sugar (F)", "Urine Routine", "LFT", "KFT", "Lipid Profile"], description: "Essential health markers for a quick annual snapshot.", featured: false, popular: false },
  { name: "Aarogya Premium 50+", slug: "aarogya-premium", targetGroup: "Adults 30+", mrp: 4500, price: 2499, tests: ["CBC", "ESR", "Blood Sugar (F&PP)", "HbA1c", "LFT", "KFT", "Lipid Profile", "Thyroid (T3/T4/TSH)", "Urine Routine", "Vitamin D", "Vitamin B12"], description: "Comprehensive wellness panel for the health-conscious adult.", featured: true, popular: true },
  { name: "Diabetes Care", slug: "diabetes-care", targetGroup: "Diabetics", mrp: 3200, price: 1799, tests: ["HbA1c", "Blood Sugar (F&PP)", "Microalbumin", "KFT", "Lipid Profile", "CBC", "Urine Routine"], description: "Designed for diabetics to track glycaemic control and organ health.", featured: false, popular: false },
  { name: "Cardiac Risk Panel", slug: "heart-health", targetGroup: "Cardiac Risk", mrp: 3800, price: 1999, tests: ["Lipid Profile (Detailed)", "hs-CRP", "Homocysteine", "Troponin-I", "CBC", "Blood Sugar"], description: "Advanced cardiac risk assessment for high-risk individuals.", featured: false, popular: false },
  { name: "Women's Wellness", slug: "womens-wellness", targetGroup: "Women 18–60", mrp: 5500, price: 2999, tests: ["CBC", "Thyroid (T3/T4/TSH)", "Vitamin D", "Vitamin B12", "Iron Studies", "Calcium", "Blood Sugar", "Hormone Panel"], description: "Comprehensive screening tailored for women's unique health needs.", featured: false, popular: false },
  { name: "Senior Citizen Panel", slug: "senior-citizen", targetGroup: "Age 60+", mrp: 6000, price: 3499, tests: ["CBC", "ESR", "LFT", "KFT", "Thyroid", "HbA1c", "Lipid Profile", "Vitamin D", "Vitamin B12", "PSA (Male)", "Urine Routine"], description: "Age-appropriate comprehensive panel for elderly patients.", featured: false, popular: false },
  { name: "Corporate Wellness", slug: "corporate-wellness", targetGroup: "Working Adults", mrp: 2800, price: 1499, tests: ["CBC", "Blood Sugar (F)", "Lipid Profile", "LFT", "Urine Routine", "ECG Interpretation"], description: "Efficient workplace health screening package. Bulk rates available.", featured: false, popular: false },
  { name: "Thyroid + Hormone Panel", slug: "thyroid-hormone", targetGroup: "Women & Thyroid Patients", mrp: 2800, price: 1599, tests: ["T3", "T4", "TSH", "Anti-TPO", "Anti-TG", "LH", "FSH", "Prolactin", "Estradiol"], description: "Detailed thyroid and hormonal profile for diagnosis and monitoring.", featured: false, popular: false },
];

const TESTIMONIALS = [
  { name: "Subrata Chakraborty", city: "Howrah", rating: 5, text: "Got my cardiac panel done at HMD Labs Howrah. Results were ready in 6 hours. Doctors at SSKM appreciated the quality of the report. Truly world-class!" },
  { name: "Priyanka Mondal", city: "Nadia", rating: 5, text: "Home collection at 6am, report by afternoon. The phlebotomist was professional and the WhatsApp OTP download was seamless. Highly recommended." },
  { name: "Dr. Arun Ghosh", city: "Kolkata (Medical)", rating: 5, text: "As a physician, I insist on NABL-certified results. HMD Labs' accuracy and turnaround time are exceptional. I refer all my patients here." },
  { name: "Mahua Banerjee", city: "Durgapur", rating: 5, text: "Diabetes care package covered everything my diabetologist asked for. The printed report was beautifully formatted and the interpretation guide was helpful." },
  { name: "Rajib Das", city: "Siliguri", rating: 5, text: "Even in Siliguri, HMD Labs has great coverage. The franchise center here is well-equipped. I'm glad WB finally has a truly pan-state lab brand." },
  { name: "Sumitra Roy", city: "Midnapore", rating: 5, text: "My elderly mother needed senior citizen panel done at home. The team was so gentle and caring. Reports came on time. Five stars without hesitation." },
];


async function main() {
  console.log("🌱 Seeding HMD Labs database...");

  // ── Super Admin ────────────────────────────────────────────────────────
  const adminPasswordHash = await bcrypt.hash("admin123", 10);
  await prisma.user.upsert({
    where: { email: "admin@hmdlabs.in" },
    update: {
      passwordHash: adminPasswordHash,
      role: UserRole.SUPER_ADMIN,
    },
    create: {
      email: "admin@hmdlabs.in",
      name: "HMD Super Admin",
      passwordHash: adminPasswordHash,
      role: UserRole.SUPER_ADMIN,
    },
  });
  console.log("✅ Super Admin user created (admin@hmdlabs.in)");

  // ── Categories ────────────────────────────────────────────────────────
  const uniqueCategories = Array.from(new Set(POPULAR_TESTS.map(t => t.category)));
  for (const catName of uniqueCategories) {
    const slug = catName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    await prisma.testCategory.upsert({
      where: { slug: slug },
      update: { name: catName },
      create: { name: catName, slug: slug },
    });
  }

  // ── Tests ────────────────────────────────────────────────────────
  for (const t of POPULAR_TESTS) {
    const category = await prisma.testCategory.findUnique({ where: { name: t.category } });
    if (!category) continue;
    
    await prisma.test.upsert({
      where: { code: t.code },
      update: {
        name: t.name,
        mrpPrice: t.mrp,
        discountedPrice: t.price,
        isPopular: true
      },
      create: {
        name: t.name,
        slug: t.code.toLowerCase(),
        code: t.code,
        categoryId: category.id,
        sampleType: t.sample,
        turnaroundTime: t.tat,
        mrpPrice: t.mrp,
        discountedPrice: t.price,
        isPopular: true
      }
    });
  }
  console.log(`✅ ${POPULAR_TESTS.length} popular tests seeded.`);

  // Custom package tests that aren't in popular tests array
  const packageExtraTests = Array.from(new Set(PACKAGES.flatMap(p => p.tests)));
  const baseCategory = await prisma.testCategory.findFirst();
  for (const extra of packageExtraTests) {
    const code = extra.substring(0, 8).toUpperCase().replace(/[^A-Z0-9]/g, '');
    await prisma.test.upsert({
      where: { code: code },
      update: {},
      create: {
        name: extra,
        slug: code.toLowerCase() + '-' + Date.now().toString().slice(-4),
        code: code,
        categoryId: baseCategory!.id,
        sampleType: "Blood",
        turnaroundTime: 12,
        mrpPrice: 500,
        discountedPrice: 300,
        isPopular: false
      }
    });
  }

  // ── Packages ────────────────────────────────────────────────────────
  for (const pkg of PACKAGES) {
    const createdPkg = await prisma.package.upsert({
      where: { slug: pkg.slug },
      update: {
        name: pkg.name,
        targetGroup: pkg.targetGroup,
        mrpPrice: pkg.mrp,
        discountedPrice: pkg.price,
        description: pkg.description,
        isFeatured: pkg.featured,
        isPopular: pkg.popular,
      },
      create: {
        name: pkg.name,
        slug: pkg.slug,
        targetGroup: pkg.targetGroup,
        mrpPrice: pkg.mrp,
        discountedPrice: pkg.price,
        description: pkg.description,
        isFeatured: pkg.featured,
        isPopular: pkg.popular,
      }
    });

    // Link tests
    for (const testName of pkg.tests) {
      const code = testName.substring(0, 8).toUpperCase().replace(/[^A-Z0-9]/g, '');
      const dbTest = await prisma.test.findUnique({ where: { code } });
      if (dbTest) {
        await prisma.packageTest.upsert({
          where: { packageId_testId: { packageId: createdPkg.id, testId: dbTest.id } },
          update: {},
          create: { packageId: createdPkg.id, testId: dbTest.id }
        });
      }
    }
  }
  console.log(`✅ ${PACKAGES.length} packages seeded and linked.`);

  // ── Testimonials ────────────────────────────────────────────────────────
  for (const t of TESTIMONIALS) {
    // Basic city to enum mapping or just string
    await prisma.testimonial.create({
      data: {
        name: t.name,
        city: t.city,
        rating: t.rating,
        text: t.text,
        isActive: true,
      }
    });
  }
  console.log(`✅ ${TESTIMONIALS.length} testimonials seeded.`);

  console.log("🎉 Seed complete! Database ready for HMD Labs.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
