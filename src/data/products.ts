/**
 * PRODUCT CATALOGUE — edit this file to add, remove or update products.
 *
 * Products listed here are the ones shown in FROZZY's Instagram posts.
 * Prices are not published, so `price` is left undefined and the card shows
 * "Price on WhatsApp". Add a price (e.g. price: "₹450") only when confirmed.
 *
 * Images: each product uses src/assets/products/<id>-480.webp and <id>-800.webp,
 * produced by `npm run images`. Photos are representative stock images; drop a
 * real pack shot in raw/products/<id>.jpg and re-run `npm run images` to replace one.
 */

export type CategoryId = "frozen" | "dairy" | "pantry" | "spreads";

export interface Category {
  id: CategoryId | "all";
  label: string;
}

export interface Product {
  id: string;
  name: string;
  brand?: string;
  category: CategoryId;
  description: string;
  size?: string;
  price?: string;
}

export const CATEGORIES: Category[] = [
  { id: "all", label: "All" },
  { id: "frozen", label: "Frozen" },
  { id: "dairy", label: "Dairy & Cheese" },
  { id: "pantry", label: "Pantry & Sauces" },
  { id: "spreads", label: "Spreads, Syrups & Seasoning" },
];

export const PRODUCTS: Product[] = [
  {
    id: "oh-potato-french-fries",
    name: "French Fries",
    brand: "Ohh! Potato",
    category: "frozen",
    description: "Frozen straight-cut fries for frying, air frying or baking.",
    size: "2.5 kg",
  },
  {
    id: "breaded-chicken-tenders",
    name: "Breaded Chicken Tenders",
    category: "frozen",
    description: "Crumb-coated chicken strips, ready to cook from frozen.",
  },
  {
    id: "mixed-vegetables",
    name: "Mixed Vegetables",
    category: "frozen",
    description: "A frozen mix of peas, corn and diced vegetables.",
  },
  {
    id: "vanilla-ice-cream",
    name: "Vanilla Ice Cream",
    category: "frozen",
    description: "Classic vanilla ice cream in a family tub.",
  },
  {
    id: "strawberry-yogurt",
    name: "Strawberry Yogurt",
    category: "dairy",
    description: "Chilled fruit yogurt cups.",
  },
  {
    id: "schreiber-cheese-sauce",
    name: "Cheese Sauce",
    brand: "Schreiber",
    category: "dairy",
    description: "Ready-to-use cheese sauce for nachos, fries and dips.",
  },
  {
    id: "schreiber-cheese-slices",
    name: "Cheese Slices",
    brand: "Schreiber",
    category: "dairy",
    description: "Sliced cheese for burgers, sandwiches and toasties.",
  },
  {
    id: "habit-panko",
    name: "Panko Original Crumbs",
    brand: "Habit",
    category: "pantry",
    description: "Japanese-style breadcrumbs for a light, crisp coating.",
  },
  {
    id: "habit-penne-rigate",
    name: "Classic Penne Rigate",
    brand: "Habit",
    category: "pantry",
    description: "Durum wheat pasta for bakes and sauces.",
  },
  {
    id: "habit-sliced-jalapenos",
    name: "Sliced Jalapeños",
    brand: "Habit",
    category: "pantry",
    description: "Pickled jalapeño slices, in jars and cans.",
  },
  {
    id: "habit-black-olives",
    name: "Sliced Black Olives",
    brand: "Habit",
    category: "pantry",
    description: "Sliced black olives for pizza, pasta and salads.",
  },
  {
    id: "habit-green-olives",
    name: "Sliced Green Olives",
    brand: "Habit",
    category: "pantry",
    description: "Sliced green olives for toppings and platters.",
  },
  {
    id: "habit-tomato-puree",
    name: "Tomato Puree",
    brand: "Habit",
    category: "pantry",
    description: "Smooth tomato puree for gravies, sauces and soups.",
  },
  {
    id: "habit-olive-pomace-oil",
    name: "Olive Pomace Oil",
    brand: "Habit",
    category: "pantry",
    description: "Olive pomace oil for everyday cooking.",
  },
  {
    id: "nutalia-hazelnut-paste",
    name: "Hazelnut Paste",
    brand: "Nutalia",
    category: "spreads",
    description: "Cocoa hazelnut spread for toast, desserts and baking.",
  },
  {
    id: "monin-syrups",
    name: "Flavoured Syrups",
    brand: "Monin",
    category: "spreads",
    description: "Syrups for mocktails, shakes and coffee. Ask for flavours.",
  },
  {
    id: "chefs-magical-seasoning",
    name: "Chef's Magical Seasoning",
    category: "spreads",
    description: "A ready seasoning blend for fries, snacks and grills.",
  },
];

/* ---- image lookup (do not edit) ---- */
const files = import.meta.glob<string>("../assets/products/*.webp", {
  eager: true,
  query: "?url",
  import: "default",
});

export const productImage = (id: string) => {
  const find = (w: number) =>
    Object.entries(files).find(([path]) => path.endsWith(`/${id}-${w}.webp`))?.[1];
  return { small: find(480), large: find(800) };
};
