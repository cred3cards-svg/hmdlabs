import { NextAdminOptions } from "@premieroctet/next-admin";

export const options: NextAdminOptions = {
  title: "HMD Labs Dashboard",
  sidebar: {
    groups: [
      {
        title: "Lab Catalog",
        models: ["TestCategory", "Test", "Package", "PackageTest"],
      },
      {
        title: "Operations",
        models: ["Lab", "Order", "OrderItem", "SampleTrackingEvent", "Report"],
      },
      {
        title: "Users & Customers",
        models: ["User", "FamilyMember", "Prescription"],
      },
      {
        title: "Leads & CRM",
        models: ["FranchiseLead", "FranchiseActivity", "DoctorLead", "CorporateLead", "ContactInquiry"],
      },
      {
        title: "CMS",
        models: ["Testimonial", "Banner", "KnowledgeHubArticle"],
      },
      {
        title: "System Config",
        models: ["Account", "Session", "OTPToken"],
      }
    ],
  },
  model: {
    User: {
      title: "User Management",
      list: {
        display: ["name", "email", "phone", "role", "isActive"],
        search: ["name", "email", "phone"],
      },
      edit: {
        display: ["name", "email", "phone", "role", "isActive", "gender", "dateOfBirth", "addressLine1", "city", "state", "district"],
      },
    },
    Test: {
      title: "Diagnostic Tests",
      list: {
        display: ["name", "code", "mrpPrice", "discountedPrice", "isPopular"],
        search: ["name", "code"],
      },
    },
    Package: {
      title: "Health Packages",
      list: {
        display: ["name", "slug", "mrpPrice", "discountedPrice", "targetGroup", "isFeatured", "isPopular"],
        search: ["name", "slug"],
      },
      edit: {
        styles: {
          _form: "grid grid-cols-2 gap-4",
        }
      }
    },
    Order: {
      title: "Lab Orders",
      list: {
        display: ["orderNumber", "status", "paymentStatus", "totalAmount", "createdAt"],
        search: ["orderNumber"],
      },
    },
    FranchiseLead: {
      title: "Franchise Leads",
      icon: "UserGroupIcon",
      list: {
        display: ["applicantName", "phone", "preferredDistrict", "status", "score", "createdAt"],
        search: ["applicantName", "phone", "email"],
        filters: [
          {
            name: "status",
            title: "Status",
          },
          {
            name: "score",
            title: "Priority",
          },
          {
            name: "preferredDistrict",
            title: "District",
          }
        ],
      },
      edit: {
        display: [
          "applicantName",
          "phone",
          "email",
          "status",
          "score",
          "franchiseType",
          "preferredDistrict",
          "preferredCity",
          "notes",
          "internalNotes",
          "lastContactedAt",
          "nextFollowUpAt",
          "leadScore",
          "source"
        ],
        styles: {
          _form: "grid grid-cols-2 gap-4",
          notes: "col-span-2",
          internalNotes: "col-span-2",
        }
      },
    },
    FranchiseActivity: {
      title: "Lead Activities",
      list: {
        display: ["type", "description", "staffName", "outcome", "createdAt"],
        search: ["description", "staffName"],
      },
    },
    Testimonial: {
      title: "Testimonials",
      list: {
        display: ["name", "city", "rating", "isActive"],
        search: ["name", "city"],
      },
    },
  },
};
