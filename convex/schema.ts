import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

export default defineSchema({
  ...authTables,

  releases: defineTable({
    slug: v.string(),
    title: v.string(),
    format: v.string(),
    releaseDate: v.string(),
    shopReleaseDate: v.optional(v.string()),
    releaseType: v.optional(v.string()),
    genre: v.string(),
    protection: v.string(),
    description: v.optional(v.string()),
    developer: v.optional(v.string()),
    isoHash: v.optional(v.string()),
    installNote: v.optional(v.string()),
    releaseSupporters: v.optional(v.array(v.string())),
    testers: v.optional(v.array(v.string())),
    downloadUrl: v.optional(v.string()),
    featured: v.boolean(),
    sortOrder: v.number(),
  })
    .index("by_slug", ["slug"])
    .index("by_featured_and_order", ["featured", "sortOrder"]),

  projects: defineTable({
    slug: v.string(),
    name: v.string(),
    version: v.string(),
    progress: v.number(),
    eta: v.string(),
    sortOrder: v.number(),
  }).index("by_slug", ["slug"]),

  supporters: defineTable({
    name: v.string(),
    sortOrder: v.number(),
  }),

  cryptoWallets: defineTable({
    symbol: v.string(),
    address: v.string(),
    sortOrder: v.number(),
  }),

  siteSettings: defineTable({
    key: v.string(),
    installationSteps: v.array(v.string()),
    notes: v.string(),
    contactEmail: v.optional(v.string()),
  }).index("by_key", ["key"]),
});
