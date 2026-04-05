import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const district = searchParams.get("district") || "";
  const city = searchParams.get("city") || "";
  const lat = parseFloat(searchParams.get("lat") || "0");
  const lng = parseFloat(searchParams.get("lng") || "0");

  // TODO: Query Prisma:
  // const labs = await prisma.lab.findMany({
  //   where: {
  //     isActive: true,
  //     ...(district ? { district: district as WBDistrict } : {}),
  //     ...(city ? { city: { contains: city, mode: "insensitive" } } : {}),
  //   },
  //   orderBy: { name: "asc" },
  // });

  // TODO: If lat/lng provided, sort by proximity using Haversine formula

  // Demo data
  const labs = [
    {
      id: "lab_1",
      name: "HMD Labs – Kolkata Main",
      code: "KOL-MAIN",
      type: "MAIN_LAB",
      isNABL: true,
      is24x7: true,
      city: "Kolkata",
      district: "KOLKATA",
      addressLine1: "12 Science City Road, Sector V",
      pincode: "700091",
      phone: "033-1234-5678",
      latitude: 22.5726,
      longitude: 88.3639,
    },
    {
      id: "lab_2",
      name: "HMD Labs – Howrah",
      code: "HWR-01",
      type: "COLLECTION_CENTER",
      isNABL: true,
      is24x7: false,
      city: "Howrah",
      district: "HOWRAH",
      addressLine1: "45 GT Road, Shibpur",
      pincode: "711102",
      phone: "033-2345-6789",
      latitude: 22.5958,
      longitude: 88.3129,
    },
    {
      id: "lab_3",
      name: "HMD Labs – Durgapur",
      code: "DGP-01",
      type: "COLLECTION_CENTER",
      isNABL: true,
      is24x7: false,
      city: "Durgapur",
      district: "PASCHIM_BARDHAMAN",
      addressLine1: "City Centre, Steel City",
      pincode: "713216",
      phone: "0343-234-5678",
      latitude: 23.4786,
      longitude: 87.3119,
    },
  ];

  const filtered = labs.filter((l) => {
    if (district && l.district !== district.toUpperCase().replace(/ /g, "_")) return false;
    return true;
  });

  return NextResponse.json({ labs: filtered, total: filtered.length });
}
