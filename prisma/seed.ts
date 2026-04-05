// prisma/seed.ts
// Demo seed data for HMD Labs – West Bengal
// Run: npm run db:seed

import { PrismaClient, WBDistrict, FranchiseType } from "@prisma/client";
import { calculateFranchiseLeadScore, getLeadScoreLabel } from "../src/lib/utils";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding HMD Labs database...");

  // ── Test Categories ──────────────────────────────────────────────────────
  const categories = await Promise.all([
    prisma.testCategory.upsert({
      where: { slug: "haematology" },
      update: {},
      create: { name: "Haematology", slug: "haematology", icon: "🩸", sortOrder: 1 },
    }),
    prisma.testCategory.upsert({
      where: { slug: "biochemistry" },
      update: {},
      create: { name: "Biochemistry", slug: "biochemistry", icon: "🧪", sortOrder: 2 },
    }),
    prisma.testCategory.upsert({
      where: { slug: "endocrinology" },
      update: {},
      create: { name: "Endocrinology", slug: "endocrinology", icon: "⚗️", sortOrder: 3 },
    }),
    prisma.testCategory.upsert({
      where: { slug: "diabetes" },
      update: {},
      create: { name: "Diabetes", slug: "diabetes", icon: "💉", sortOrder: 4 },
    }),
    prisma.testCategory.upsert({
      where: { slug: "vitamins" },
      update: {},
      create: { name: "Vitamins & Minerals", slug: "vitamins", icon: "💊", sortOrder: 5 },
    }),
  ]);

  console.log(`✅ ${categories.length} test categories created`);

  // ── Tests ────────────────────────────────────────────────────────────────
  const tests = await Promise.all([
    prisma.test.upsert({
      where: { code: "CBC" },
      update: {},
      create: {
        name: "Complete Blood Count (CBC)",
        slug: "complete-blood-count-cbc",
        code: "CBC",
        categoryId: categories[0].id,
        description: "CBC measures components and features of blood including red cells, white cells, platelets.",
        preparation: "No special preparation needed.",
        sampleType: "Blood",
        turnaroundTime: 6,
        mrpPrice: 400,
        discountedPrice: 249,
        homeSampleFee: 50,
        isPopular: true,
        nabAccredited: true,
        tags: ["blood", "anaemia", "infection", "haemoglobin"],
      },
    }),
    prisma.test.upsert({
      where: { code: "LFT" },
      update: {},
      create: {
        name: "Liver Function Test (LFT)",
        slug: "liver-function-test-lft",
        code: "LFT",
        categoryId: categories[1].id,
        description: "Measures liver enzymes, proteins and bilirubin to assess liver health.",
        preparation: "8-10 hours fasting required.",
        sampleType: "Blood",
        turnaroundTime: 8,
        mrpPrice: 650,
        discountedPrice: 449,
        homeSampleFee: 50,
        isPopular: true,
        nabAccredited: true,
        tags: ["liver", "jaundice", "fatty liver", "enzymes"],
      },
    }),
    prisma.test.upsert({
      where: { code: "TFT" },
      update: {},
      create: {
        name: "Thyroid Profile (T3 T4 TSH)",
        slug: "thyroid-profile-t3-t4-tsh",
        code: "TFT",
        categoryId: categories[2].id,
        description: "Complete thyroid panel to diagnose hypothyroidism, hyperthyroidism.",
        preparation: "No fasting required. Avoid biotin supplements 2 days prior.",
        sampleType: "Blood",
        turnaroundTime: 12,
        mrpPrice: 900,
        discountedPrice: 599,
        homeSampleFee: 50,
        isPopular: true,
        nabAccredited: true,
        tags: ["thyroid", "TSH", "T3", "T4", "hypothyroidism"],
      },
    }),
    prisma.test.upsert({
      where: { code: "HBA1C" },
      update: {},
      create: {
        name: "HbA1c (Glycated Haemoglobin)",
        slug: "hba1c-glycated-haemoglobin",
        code: "HBA1C",
        categoryId: categories[3].id,
        description: "Reflects average blood glucose over the past 3 months.",
        preparation: "No fasting required.",
        sampleType: "Blood",
        turnaroundTime: 6,
        mrpPrice: 600,
        discountedPrice: 399,
        homeSampleFee: 50,
        isPopular: true,
        nabAccredited: true,
        tags: ["diabetes", "HbA1c", "blood sugar", "glucose"],
      },
    }),
    prisma.test.upsert({
      where: { code: "VITD" },
      update: {},
      create: {
        name: "Vitamin D (25-Hydroxy)",
        slug: "vitamin-d-25-hydroxy",
        code: "VITD",
        categoryId: categories[4].id,
        description: "Measures 25-hydroxyvitamin D levels in blood.",
        preparation: "No special preparation.",
        sampleType: "Blood",
        turnaroundTime: 24,
        mrpPrice: 1400,
        discountedPrice: 799,
        homeSampleFee: 50,
        isPopular: true,
        nabAccredited: true,
        tags: ["vitamin D", "deficiency", "bones", "immunity"],
      },
    }),
  ]);

  console.log(`✅ ${tests.length} tests created`);

  // ── Labs ─────────────────────────────────────────────────────────────────
  const kolkataLab = await prisma.lab.upsert({
    where: { code: "KOL-MAIN" },
    update: {},
    create: {
      name: "HMD Labs – Kolkata Main Lab",
      code: "KOL-MAIN",
      type: "MAIN_LAB",
      isNABL: true,
      nabLicence: "MC-4521",
      is24x7: true,
      addressLine1: "12 Science City Road, Sector V",
      city: "Kolkata",
      district: WBDistrict.KOLKATA,
      pincode: "700091",
      state: "West Bengal",
      phone: "033-1234-5678",
      email: "kolkata@hmdlabs.in",
      latitude: 22.5726,
      longitude: 88.3639,
      services: ["Blood", "Urine", "Stool", "Microbiology", "Histopathology", "Radiology"],
    },
  });

  const howrahLab = await prisma.lab.upsert({
    where: { code: "HWR-01" },
    update: {},
    create: {
      name: "HMD Labs – Howrah Collection Center",
      code: "HWR-01",
      type: "COLLECTION_CENTER",
      isNABL: true,
      is24x7: false,
      addressLine1: "45 GT Road, Shibpur",
      city: "Howrah",
      district: WBDistrict.HOWRAH,
      pincode: "711102",
      state: "West Bengal",
      phone: "033-2345-6789",
      services: ["Blood", "Urine", "Stool"],
      operatingHours: {
        mon: "6:00 AM – 10:00 PM",
        tue: "6:00 AM – 10:00 PM",
        wed: "6:00 AM – 10:00 PM",
        thu: "6:00 AM – 10:00 PM",
        fri: "6:00 AM – 10:00 PM",
        sat: "6:00 AM – 10:00 PM",
        sun: "7:00 AM – 8:00 PM",
      },
    },
  });

  console.log(`✅ ${2} labs created`);

  // ── Packages ─────────────────────────────────────────────────────────────
  const healthPackage = await prisma.package.upsert({
    where: { slug: "full-body-checkup-wb" },
    update: {},
    create: {
      name: "Full Body Health Checkup – West Bengal Special",
      slug: "full-body-checkup-wb",
      shortName: "Full Body",
      description: "Comprehensive 82-parameter health checkup specially designed for West Bengal patients. Covers all vital organ functions.",
      targetGroup: "Adults 18+",
      mrpPrice: 4500,
      discountedPrice: 1499,
      homeSampleFee: 0,
      isPopular: true,
      isFeatured: true,
      sortOrder: 1,
      tags: ["full body", "comprehensive", "popular", "cholesterol", "diabetes"],
    },
  });

  // Link tests to package
  await prisma.packageTest.createMany({
    data: tests.map((t) => ({ packageId: healthPackage.id, testId: t.id })),
    skipDuplicates: true,
  });

  console.log(`✅ 1 package created with ${tests.length} tests`);

  // ── Testimonials ─────────────────────────────────────────────────────────
  await prisma.testimonial.createMany({
    skipDuplicates: true,
    data: [
      {
        name: "Subrata Ghosh",
        city: "Kolkata",
        district: WBDistrict.KOLKATA,
        rating: 5,
        text: "Booked CBC and LFT online at 11 PM. Phlebotomist arrived at 7 AM sharp. Report was ready by 2 PM. Truly 24×7 service!",
        isVerified: true,
        isActive: true,
        sortOrder: 1,
      },
      {
        name: "Priya Banerjee",
        city: "Howrah",
        district: WBDistrict.HOWRAH,
        rating: 5,
        text: "The NABL accreditation gives so much confidence. My doctor specifically asked for reports from an NABL lab and HMD Labs delivered perfectly.",
        isVerified: true,
        isActive: true,
        sortOrder: 2,
      },
      {
        name: "Dr. Amit Mondal",
        city: "Durgapur",
        district: WBDistrict.PASCHIM_BARDHAMAN,
        rating: 5,
        text: "As a general physician in Durgapur, I regularly refer patients to HMD Labs. The report quality and turnaround time are excellent.",
        isVerified: true,
        isActive: true,
        sortOrder: 3,
      },
    ],
  });

  console.log(`✅ 3 testimonials created`);

  // ── Demo Franchise Lead ──────────────────────────────────────────────────
  const franchiseScore = calculateFranchiseLeadScore({
    investmentCapacity: 3000000,
    existingSpace: true,
    businessExperience: 8,
    franchiseType: "MINI_LAB",
  });

  await prisma.franchiseLead.upsert({
    where: { id: "demo-lead-1" },
    update: {},
    create: {
      id: "demo-lead-1",
      applicantName: "Rajesh Kumar Das",
      phone: "9876543210",
      email: "rajesh.das@example.com",
      franchiseType: FranchiseType.MINI_LAB,
      preferredDistrict: WBDistrict.NADIA,
      preferredCity: "Krishnanagar",
      investmentCapacity: 3000000,
      existingSpace: true,
      spaceArea: 600,
      businessExperience: 8,
      currentOccupation: "Pharmacy Owner",
      city: "Krishnanagar",
      district: WBDistrict.NADIA,
      pincode: "741101",
      status: "CONTACTED",
      score: getLeadScoreLabel(franchiseScore) as any,
      leadScore: franchiseScore,
      source: "website",
      termsAccepted: true,
      termsAcceptedAt: new Date(),
      notes: "Pharmacy owner with existing space. High-quality lead.",
    },
  });

  console.log(`✅ Demo franchise lead created (score: ${franchiseScore} – ${getLeadScoreLabel(franchiseScore)})`);

  // ── Knowledge Hub Articles ───────────────────────────────────────────────
  await prisma.knowledgeHubArticle.createMany({
    skipDuplicates: true,
    data: [
      {
        title: "Complete Guide to Blood Tests in West Bengal",
        slug: "complete-guide-blood-tests-west-bengal",
        excerpt: "Understanding CBC, LFT, KFT and other common blood tests.",
        content: "# Complete Guide to Blood Tests\n\nBlood tests are the cornerstone of modern diagnostics...",
        category: "TEST_GUIDE",
        tags: ["blood test", "CBC", "LFT", "guide"],
        authorName: "HMD Labs Medical Team",
        isPublished: true,
        publishedAt: new Date("2025-01-15"),
        metaTitle: "Complete Blood Test Guide – HMD Labs West Bengal",
        metaDescription: "Understand your blood test reports. CBC, LFT, KFT explained for West Bengal patients.",
      },
      {
        title: "Dengue Season in West Bengal: Tests & Prevention",
        slug: "dengue-season-west-bengal-tests-prevention",
        excerpt: "Every monsoon, West Bengal sees dengue spikes. Know the tests and early warning signs.",
        content: "# Dengue in West Bengal\n\nDengue fever is a mosquito-borne viral disease...",
        category: "DISEASE_INFO",
        tags: ["dengue", "monsoon", "NS1", "West Bengal"],
        authorName: "Dr. Priya Sharma",
        isPublished: true,
        publishedAt: new Date("2025-02-01"),
        metaTitle: "Dengue Tests & Prevention – West Bengal | HMD Labs",
        metaDescription: "Dengue diagnosis with NS1 Antigen, IgM/IgG tests. Know the symptoms and prevention for West Bengal.",
      },
    ],
  });

  console.log(`✅ 2 knowledge hub articles created`);

  console.log("\n🎉 Seed complete! Database ready for HMD Labs.");
  console.log("📍 Lab: http://localhost:5555 (Prisma Studio: npm run db:studio)");
  console.log("🌐 App: http://localhost:3000 (npm run dev)");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
