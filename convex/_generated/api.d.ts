/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as admin_donations from "../admin/donations.js";
import type * as admin_projects from "../admin/projects.js";
import type * as admin_releases from "../admin/releases.js";
import type * as admin_settings from "../admin/settings.js";
import type * as admin_supporters from "../admin/supporters.js";
import type * as auth from "../auth.js";
import type * as http from "../http.js";
import type * as lib_auth from "../lib/auth.js";
import type * as lib_customFunctions from "../lib/customFunctions.js";
import type * as lib_releaseValidator from "../lib/releaseValidator.js";
import type * as nfoReleases from "../nfoReleases.js";
import type * as portfolio from "../portfolio.js";
import type * as seed from "../seed.js";
import type * as seedData from "../seedData.js";
import type * as seedNfo from "../seedNfo.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  "admin/donations": typeof admin_donations;
  "admin/projects": typeof admin_projects;
  "admin/releases": typeof admin_releases;
  "admin/settings": typeof admin_settings;
  "admin/supporters": typeof admin_supporters;
  auth: typeof auth;
  http: typeof http;
  "lib/auth": typeof lib_auth;
  "lib/customFunctions": typeof lib_customFunctions;
  "lib/releaseValidator": typeof lib_releaseValidator;
  nfoReleases: typeof nfoReleases;
  portfolio: typeof portfolio;
  seed: typeof seed;
  seedData: typeof seedData;
  seedNfo: typeof seedNfo;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
