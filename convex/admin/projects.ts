import { v } from "convex/values";
import { adminMutation, adminQuery } from "../lib/customFunctions";

export const list = adminQuery({
  args: {},
  returns: v.array(
    v.object({
      _id: v.id("projects"),
      slug: v.string(),
      name: v.string(),
      version: v.string(),
      progress: v.number(),
      eta: v.string(),
      sortOrder: v.number(),
    })
  ),
  handler: async (ctx) => {
    const projects = await ctx.db.query("projects").collect();
    return projects.map((p) => ({
      _id: p._id,
      slug: p.slug,
      name: p.name,
      version: p.version,
      progress: p.progress,
      eta: p.eta,
      sortOrder: p.sortOrder,
    }));
  },
});

export const create = adminMutation({
  args: {
    slug: v.string(),
    name: v.string(),
    version: v.string(),
    progress: v.number(),
    eta: v.string(),
  },
  returns: v.id("projects"),
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("projects")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique();
    if (existing) {
      throw new Error("A project with this slug already exists");
    }

    const all = await ctx.db.query("projects").collect();
    const sortOrder = all.length;

    return await ctx.db.insert("projects", { ...args, sortOrder });
  },
});

export const update = adminMutation({
  args: {
    id: v.id("projects"),
    slug: v.optional(v.string()),
    name: v.optional(v.string()),
    version: v.optional(v.string()),
    progress: v.optional(v.number()),
    eta: v.optional(v.string()),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    const project = await ctx.db.get(id);
    if (!project) throw new Error("Project not found");

    const cleanUpdates: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(updates)) {
      if (value !== undefined) cleanUpdates[key] = value;
    }

    await ctx.db.patch(id, cleanUpdates);
    return null;
  },
});

export const remove = adminMutation({
  args: { id: v.id("projects") },
  returns: v.null(),
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
    return null;
  },
});
