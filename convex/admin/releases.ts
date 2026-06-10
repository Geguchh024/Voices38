import { v } from "convex/values";
import { adminMutation, adminQuery } from "../lib/customFunctions";

export const list = adminQuery({
  args: {},
  returns: v.array(
    v.object({
      _id: v.id("releases"),
      slug: v.string(),
      title: v.string(),
      format: v.string(),
      releaseDate: v.string(),
      crackDate: v.optional(v.string()),
      releaseType: v.optional(v.string()),
      genre: v.string(),
      protection: v.string(),
      description: v.optional(v.string()),
      developer: v.optional(v.string()),
      isoHash: v.optional(v.string()),
      installNote: v.optional(v.string()),
      downloadUrl: v.optional(v.string()),
      featured: v.boolean(),
      sortOrder: v.number(),
    })
  ),
  handler: async (ctx) => {
    const releases = await ctx.db
      .query("releases")
      .withIndex("by_featured_and_order")
      .collect();
    return releases.map((r) => ({
      _id: r._id,
      slug: r.slug,
      title: r.title,
      format: r.format,
      releaseDate: r.releaseDate,
      crackDate: r.crackDate,
      releaseType: r.releaseType,
      genre: r.genre,
      protection: r.protection,
      description: r.description,
      developer: r.developer,
      isoHash: r.isoHash,
      installNote: r.installNote,
      downloadUrl: r.downloadUrl,
      featured: r.featured,
      sortOrder: r.sortOrder,
    }));
  },
});

export const create = adminMutation({
  args: {
    slug: v.string(),
    title: v.string(),
    format: v.string(),
    releaseDate: v.string(),
    crackDate: v.optional(v.string()),
    releaseType: v.optional(v.string()),
    genre: v.string(),
    protection: v.string(),
    description: v.optional(v.string()),
    developer: v.optional(v.string()),
    isoHash: v.optional(v.string()),
    installNote: v.optional(v.string()),
    downloadUrl: v.optional(v.string()),
    featured: v.boolean(),
  },
  returns: v.id("releases"),
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("releases")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique();
    if (existing) {
      throw new Error("A release with this slug already exists");
    }

    const all = await ctx.db.query("releases").collect();
    const sortOrder = all.length;

    return await ctx.db.insert("releases", { ...args, sortOrder });
  },
});

export const update = adminMutation({
  args: {
    id: v.id("releases"),
    slug: v.optional(v.string()),
    title: v.optional(v.string()),
    format: v.optional(v.string()),
    releaseDate: v.optional(v.string()),
    crackDate: v.optional(v.string()),
    releaseType: v.optional(v.string()),
    genre: v.optional(v.string()),
    protection: v.optional(v.string()),
    description: v.optional(v.string()),
    developer: v.optional(v.string()),
    isoHash: v.optional(v.string()),
    installNote: v.optional(v.string()),
    downloadUrl: v.optional(v.string()),
    featured: v.optional(v.boolean()),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    const release = await ctx.db.get("releases", id);
    if (!release) throw new Error("Release not found");

    const cleanUpdates: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(updates)) {
      if (value !== undefined) cleanUpdates[key] = value;
    }

    await ctx.db.patch("releases", id, cleanUpdates);
    return null;
  },
});

export const remove = adminMutation({
  args: { id: v.id("releases") },
  returns: v.null(),
  handler: async (ctx, args) => {
    await ctx.db.delete("releases", args.id);
    return null;
  },
});

export const toggleFeatured = adminMutation({
  args: { id: v.id("releases") },
  returns: v.null(),
  handler: async (ctx, args) => {
    const release = await ctx.db.get("releases", args.id);
    if (!release) throw new Error("Release not found");
    await ctx.db.patch("releases", args.id, { featured: !release.featured });
    return null;
  },
});
