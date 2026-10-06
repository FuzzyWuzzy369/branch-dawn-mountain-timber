import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as DialogOverlay, c as Slot, i as DialogDescription, n as DialogClose, o as DialogPortal, r as DialogContent, s as DialogTitle, t as Dialog } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { a as ChevronDown, i as MapPin, o as Check, r as SlidersHorizontal, s as Bookmark, t as X } from "../_libs/lucide-react.mjs";
import { n as Route, r as redeemProCode } from "./router-B2VWOFNz.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DeCls_eD.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function idFor(name, address) {
	return `${name} ${address}`.toLowerCase().replace(/&/g, " and ").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
function row(entry) {
	return {
		...entry,
		id: idFor(entry.name, entry.address)
	};
}
var W = "Wichita";
var SG = "Sedgwick";
/** Independent rooms across the Wichita, KS metro. Confirm hours before you go. */
var SPOTS = [
	row({
		name: "NuWay",
		town: W,
		area: "Delano",
		county: SG,
		cuisine: "American",
		price: 1,
		vibes: [
			"casual",
			"quick",
			"solo"
		],
		diet: [],
		gem: false,
		knownFor: "Loose-meat sandwiches",
		note: "A Douglas Avenue counter that has sat at this address since 1930, with onion rings and house root beer.",
		address: "1416 W Douglas Ave, Wichita, KS 67203"
	}),
	row({
		name: "Doo-Dah Diner",
		town: W,
		area: "Downtown",
		county: SG,
		cuisine: "American",
		price: 2,
		vibes: ["casual", "group"],
		diet: [],
		gem: false,
		knownFor: "Overflowing breakfast plates",
		note: "Downtown breakfast room for smothered burritos, hash, and the tall Brutus plate.",
		address: "206 E Kellogg St, Wichita, KS 67202"
	}),
	row({
		name: "Old Mill Tasty Shop",
		town: W,
		area: "Downtown",
		county: SG,
		cuisine: "American",
		price: 1,
		vibes: [
			"casual",
			"quick",
			"solo"
		],
		diet: [],
		gem: false,
		knownFor: "Soda-fountain shakes",
		note: "Lunch counter open since 1932, with a marble fountain and sandwiches that have not been modernized.",
		address: "604 E Douglas Ave, Wichita, KS 67202"
	}),
	row({
		name: "Homegrown",
		town: W,
		area: "Downtown",
		county: SG,
		cuisine: "American",
		price: 2,
		vibes: ["casual", "group"],
		diet: ["vegetarian"],
		gem: false,
		knownFor: "Brunch and house pop-tarts",
		note: "Douglas Avenue brunch room near Naftzger Park. Weekend waits are normal.",
		address: "645 E Douglas Ave, Wichita, KS 67202"
	}),
	row({
		name: "Connie's Mexico Cafe",
		town: W,
		area: "North End",
		county: SG,
		cuisine: "Mexican",
		price: 1,
		vibes: [
			"casual",
			"group",
			"solo"
		],
		diet: [],
		gem: false,
		knownFor: "Fried tacos with peas and potatoes",
		note: "Family Mexican cafe on North Broadway since the late 1950s, still the old Wichita style of fried taco.",
		address: "2227 N Broadway Ave, Wichita, KS 67219"
	}),
	row({
		name: "Little Saigon",
		town: W,
		area: "North End",
		county: SG,
		cuisine: "Vietnamese",
		price: 1,
		vibes: [
			"casual",
			"quick",
			"solo"
		],
		diet: ["vegetarian"],
		gem: false,
		knownFor: "Pho, bun, and banh mi",
		note: "A North Broadway standard for vermicelli bowls, grilled-pork sandwiches, and iced coffee.",
		address: "1015 N Broadway Ave, Wichita, KS 67214"
	}),
	row({
		name: "Artichoke Sandwichbar",
		town: W,
		area: "North End",
		county: SG,
		cuisine: "American",
		price: 1,
		vibes: [
			"casual",
			"late",
			"solo"
		],
		diet: [],
		gem: true,
		knownFor: "Grilled sandwiches inside a bar",
		note: "A tiny sandwich counter tucked into a Broadway bar. The Famous No. 8 is the one regulars name.",
		address: "811 N Broadway Ave, Wichita, KS 67214"
	}),
	row({
		name: "Kimlan Sandwiches",
		town: W,
		area: "North End",
		county: SG,
		cuisine: "Vietnamese",
		price: 1,
		vibes: [
			"quick",
			"casual",
			"solo"
		],
		diet: [],
		gem: true,
		knownFor: "Banh mi",
		note: "A sandwich shop a few doors from the better-known pho rooms on North Broadway.",
		address: "1035 N Broadway Ave, Wichita, KS 67214"
	}),
	row({
		name: "Saigon Oriental Restaurant",
		town: W,
		area: "North End",
		county: SG,
		cuisine: "Vietnamese",
		price: 1,
		vibes: ["casual", "group"],
		diet: ["vegetarian"],
		gem: true,
		knownFor: "Vietnamese family plates",
		note: "Neighborhood Vietnamese dining on the same Broadway stretch as Little Saigon, easier to miss.",
		address: "1103 N Broadway Ave, Wichita, KS 67214"
	}),
	row({
		name: "Pho Ong Gia Cali",
		town: W,
		area: "North End",
		county: SG,
		cuisine: "Vietnamese",
		price: 1,
		vibes: [
			"casual",
			"quick",
			"solo"
		],
		diet: ["vegetarian"],
		gem: true,
		knownFor: "Beef pho",
		note: "A quieter pho room farther up Broadway, past the cluster everyone already knows.",
		address: "1750 N Broadway Ave, Wichita, KS 67214"
	}),
	row({
		name: "Mi Lindo Michoacan",
		town: W,
		area: "North End",
		county: SG,
		cuisine: "Mexican",
		price: 1,
		vibes: ["casual", "group"],
		diet: [],
		gem: true,
		knownFor: "Michoacan plates",
		note: "Sit-down Mexican on North Broadway, a different kitchen from the fried-taco institution down the street.",
		address: "2120 N Broadway Ave, Wichita, KS 67219"
	}),
	row({
		name: "Savute's Italian Ristorante",
		town: W,
		area: "North End",
		county: SG,
		cuisine: "Italian",
		price: 2,
		vibes: [
			"casual",
			"group",
			"date"
		],
		diet: ["vegetarian"],
		gem: true,
		knownFor: "Red-sauce Italian",
		note: "An old-school Italian dining room on North Broadway, not on the east-side restaurant strip.",
		address: "3303 N Broadway Ave, Wichita, KS 67219"
	}),
	row({
		name: "Juarez Bakery",
		town: W,
		area: "Nomar",
		county: SG,
		cuisine: "Mexican",
		price: 1,
		vibes: [
			"quick",
			"casual",
			"solo"
		],
		diet: ["vegetarian"],
		gem: true,
		knownFor: "Mexican bakery",
		note: "Pan dulce and a short savory counter in the Nomar district, between the murals on Waco.",
		address: "1068 N Waco Ave, Wichita, KS 67203"
	}),
	row({
		name: "Station 8 BBQ",
		town: W,
		area: "Downtown",
		county: SG,
		cuisine: "Barbecue",
		price: 2,
		vibes: [
			"casual",
			"group",
			"quick"
		],
		diet: [],
		gem: false,
		knownFor: "Lunch barbecue in an old firehouse",
		note: "Ribs, brisket, and hot links served out of a converted fire station just north of downtown.",
		address: "1100 E 3rd St N, Wichita, KS 67214"
	}),
	row({
		name: "Public at the Brickyard",
		town: W,
		area: "Old Town",
		county: SG,
		cuisine: "American",
		price: 2,
		vibes: [
			"date",
			"group",
			"late"
		],
		diet: ["vegetarian"],
		gem: false,
		knownFor: "Underground gastropub plates",
		note: "Old Town basement room for local beer, cocktails, and a menu that moves past bar food.",
		address: "129 N Rock Island St, Wichita, KS 67202"
	}),
	row({
		name: "Larkspur Bistro & Bar",
		town: W,
		area: "Old Town",
		county: SG,
		cuisine: "American",
		price: 3,
		vibes: ["date", "celebration"],
		diet: ["vegetarian"],
		gem: false,
		knownFor: "Patio dinner in Old Town",
		note: "Continental dining on East Douglas, with a garden patio and a piano inside.",
		address: "904 E Douglas Ave, Wichita, KS 67202"
	}),
	row({
		name: "Sabor Latin Bar & Grill",
		town: W,
		area: "Old Town",
		county: SG,
		cuisine: "Latin American",
		price: 2,
		vibes: ["date", "group"],
		diet: [],
		gem: false,
		knownFor: "Churrasco and plantains",
		note: "Latin American dining on the Old Town square, open since 2008.",
		address: "309 N Mead St, Wichita, KS 67202"
	}),
	row({
		name: "Bocatto Eatery and Pasta",
		town: W,
		area: "Old Town",
		county: SG,
		cuisine: "Italian",
		price: 2,
		vibes: ["date", "casual"],
		diet: ["vegetarian"],
		gem: true,
		knownFor: "Pasta in a small room",
		note: "A compact Italian room on North Mead, easier to walk past than the bigger Old Town names.",
		address: "321 N Mead St, Wichita, KS 67202"
	}),
	row({
		name: "GangNam Korean Grill & Bar",
		town: W,
		area: "Old Town",
		county: SG,
		cuisine: "Korean",
		price: 2,
		vibes: [
			"group",
			"late",
			"date"
		],
		diet: [],
		gem: true,
		knownFor: "Korean grill",
		note: "Tabletop Korean grilling a block off the Old Town bars, built for a group.",
		address: "210 N Washington St, Wichita, KS 67202"
	}),
	row({
		name: "Meddy's",
		town: W,
		area: "Downtown",
		county: SG,
		cuisine: "Lebanese",
		price: 2,
		vibes: [
			"quick",
			"casual",
			"solo"
		],
		diet: ["vegetarian", "vegan"],
		gem: false,
		knownFor: "Shawarma and falafel",
		note: "Fast Mediterranean near the arena. Useful when you want Lebanese food without a long dinner.",
		address: "120 S Washington Ave, Wichita, KS 67202"
	}),
	row({
		name: "Prost",
		town: W,
		area: "Downtown",
		county: SG,
		cuisine: "German",
		price: 2,
		vibes: [
			"casual",
			"date",
			"late"
		],
		diet: ["vegetarian"],
		gem: true,
		knownFor: "Schnitzel and beer",
		note: "A small German room on St. Francis. One of the few places in town cooking this menu at all.",
		address: "134 N St Francis Ave, Wichita, KS 67202"
	}),
	row({
		name: "The Monarch",
		town: W,
		area: "Delano",
		county: SG,
		cuisine: "American",
		price: 2,
		vibes: [
			"casual",
			"late",
			"group"
		],
		diet: [],
		gem: true,
		knownFor: "Whiskey list and a full menu",
		note: "Delano bar with live music, local art, and dinner that is not an afterthought.",
		address: "579 W Douglas Ave, Wichita, KS 67203"
	}),
	row({
		name: "Sakura Japanese Cuisine",
		town: W,
		area: "Delano",
		county: SG,
		cuisine: "Japanese",
		price: 2,
		vibes: ["date", "casual"],
		diet: ["vegetarian"],
		gem: true,
		knownFor: "Sushi on West Douglas",
		note: "A Delano sushi room on the same block as the bars, quieter than the east-side Japanese strip.",
		address: "605 W Douglas Ave, Wichita, KS 67203"
	}),
	row({
		name: "Yokohama Ramen Izakaya",
		town: W,
		area: "Delano",
		county: SG,
		cuisine: "Japanese",
		price: 2,
		vibes: [
			"casual",
			"solo",
			"late"
		],
		diet: ["vegetarian"],
		gem: true,
		knownFor: "Ramen",
		note: "The Delano bowl of this two-room ramen shop, on West Douglas.",
		address: "613 W Douglas Ave, Wichita, KS 67203"
	}),
	row({
		name: "Tokyo Japanese Cuisine",
		town: W,
		area: "Delano",
		county: SG,
		cuisine: "Japanese",
		price: 2,
		vibes: ["casual", "date"],
		diet: ["vegetarian"],
		gem: true,
		knownFor: "Sushi and teriyaki",
		note: "Japanese dining on North West Street, a block off the Delano strip.",
		address: "446 N West St, Wichita, KS 67203"
	}),
	row({
		name: "Bella Vita Bistro",
		town: W,
		area: "Delano",
		county: SG,
		cuisine: "Italian",
		price: 3,
		vibes: ["date", "celebration"],
		diet: ["vegetarian"],
		gem: true,
		knownFor: "Northern Italian plates",
		note: "A Delano bistro cooking Italian with a French lean, on North West Street.",
		address: "120 N West St, Wichita, KS 67203"
	}),
	row({
		name: "La Galette French Bakery",
		town: W,
		area: "Delano",
		county: SG,
		cuisine: "French",
		price: 1,
		vibes: [
			"quick",
			"solo",
			"casual"
		],
		diet: ["vegetarian"],
		gem: true,
		knownFor: "French bakery counter",
		note: "Pastries and a short savory menu on West Douglas, before you get to the bigger dinner rooms.",
		address: "1017 W Douglas Ave, Wichita, KS 67203"
	}),
	row({
		name: "Thai House",
		town: W,
		area: "Delano",
		county: SG,
		cuisine: "Thai",
		price: 1,
		vibes: ["casual", "quick"],
		diet: ["vegetarian", "vegan"],
		gem: true,
		knownFor: "Weeknight Thai",
		note: "A plain dining room on North West Street. The menu is the reason, not the building.",
		address: "969 N West St, Wichita, KS 67203"
	}),
	row({
		name: "Blazin Halal Food",
		town: W,
		area: "Delano",
		county: SG,
		cuisine: "Mediterranean",
		price: 1,
		vibes: [
			"quick",
			"casual",
			"solo"
		],
		diet: ["halal", "vegetarian"],
		gem: true,
		knownFor: "Halal plates",
		note: "A halal counter on North West Street for a fast meal that is not a chain.",
		address: "602 N West St, Wichita, KS 67203"
	}),
	row({
		name: "Tacos TJ 664",
		town: W,
		area: "Delano",
		county: SG,
		cuisine: "Mexican",
		price: 1,
		vibes: [
			"quick",
			"casual",
			"late"
		],
		diet: [],
		gem: true,
		knownFor: "Street tacos",
		note: "The west-side TJ stand, on North West Street. There is another on North Rock Road.",
		address: "1014 N West St, Wichita, KS 67203"
	}),
	row({
		name: "Zaaki",
		town: W,
		area: "South Delano",
		county: SG,
		cuisine: "Arabic",
		price: 1,
		vibes: ["casual", "quick"],
		diet: ["halal", "vegetarian"],
		gem: true,
		knownFor: "Arabic home cooking",
		note: "A small Arabic kitchen on West Harry, south of the Delano strip and easy to drive past.",
		address: "926 W Harry St, Wichita, KS 67213"
	}),
	row({
		name: "The Belmont",
		town: W,
		area: "College Hill",
		county: SG,
		cuisine: "American",
		price: 3,
		vibes: [
			"date",
			"group",
			"celebration"
		],
		diet: ["vegetarian"],
		gem: false,
		knownFor: "Dinner with the garage doors open",
		note: "College Hill's busy room on East Douglas, from-scratch plates and a patio when the weather allows.",
		address: "3555 E Douglas Ave, Wichita, KS 67218"
	}),
	row({
		name: "Wine Dive + Kitchen",
		town: W,
		area: "College Hill",
		county: SG,
		cuisine: "American",
		price: 3,
		vibes: ["date", "celebration"],
		diet: ["vegetarian"],
		gem: false,
		knownFor: "Wine list and small plates",
		note: "College Hill wine bar at Douglas and Oliver, with lunch, dinner, and Sunday brunch.",
		address: "4714 E Douglas Ave, Wichita, KS 67208"
	}),
	row({
		name: "College Hill Deli",
		town: W,
		area: "College Hill",
		county: SG,
		cuisine: "Lebanese",
		price: 1,
		vibes: [
			"quick",
			"casual",
			"solo"
		],
		diet: ["vegetarian"],
		gem: true,
		knownFor: "Deli case and catering",
		note: "A working deli on East Douglas, more sandwich counter than scene.",
		address: "3407 E Douglas Ave, Wichita, KS 67218"
	}),
	row({
		name: "Vora Restaurant European",
		town: W,
		area: "College Hill",
		county: SG,
		cuisine: "European",
		price: 3,
		vibes: ["date", "celebration"],
		diet: ["vegetarian"],
		gem: true,
		knownFor: "French and Italian classics",
		note: "European dining on East Douglas, between the louder College Hill rooms.",
		address: "3252 E Douglas Ave, Wichita, KS 67218"
	}),
	row({
		name: "FioRito Ristorante",
		town: W,
		area: "College Hill",
		county: SG,
		cuisine: "Italian",
		price: 3,
		vibes: ["date", "celebration"],
		diet: ["vegetarian"],
		gem: true,
		knownFor: "Italian dinner",
		note: "A quieter Italian dining room on East Douglas, a few blocks west of the Belmont.",
		address: "3134 E Douglas Ave, Wichita, KS 67218"
	}),
	row({
		name: "Kusina Ni Cheska",
		town: W,
		area: "College Hill",
		county: SG,
		cuisine: "Filipino",
		price: 1,
		vibes: ["casual", "group"],
		diet: [],
		gem: true,
		knownFor: "Adobo, lumpia, and pancit",
		note: "Filipino cooking on East Central. One of the few rooms in the metro serving this menu.",
		address: "2516 E Central Ave, Wichita, KS 67214"
	}),
	row({
		name: "Argentina's Empanadas",
		town: W,
		area: "College Hill",
		county: SG,
		cuisine: "Argentinian",
		price: 1,
		vibes: [
			"quick",
			"casual",
			"solo"
		],
		diet: ["vegetarian"],
		gem: true,
		knownFor: "Baked empanadas",
		note: "An empanada counter on East Douglas. Easy to treat as a bakery and miss the full order.",
		address: "3700 E Douglas Ave, Wichita, KS 67218"
	}),
	row({
		name: "Planet Mofongo",
		town: W,
		area: "College Hill",
		county: SG,
		cuisine: "Puerto Rican",
		price: 1,
		vibes: ["casual", "quick"],
		diet: [],
		gem: true,
		knownFor: "Mofongo and tripletas",
		note: "Puerto Rican plates near Douglas and Hydraulic. Hours have been limited, so check before you drive.",
		address: "125 S Hydraulic Ave, Wichita, KS 67211"
	}),
	row({
		name: "Antojitos Guanamex",
		town: W,
		area: "East Central",
		county: SG,
		cuisine: "Salvadoran",
		price: 1,
		vibes: ["casual", "quick"],
		diet: [],
		gem: true,
		knownFor: "Antojitos",
		note: "A small Central Avenue shop cooking Salvadoran and Mexican snacks rather than combo plates.",
		address: "1425 E Central Ave, Wichita, KS 67214"
	}),
	row({
		name: "Georges French Bistro",
		town: W,
		area: "College Hill",
		county: SG,
		cuisine: "French",
		price: 4,
		vibes: ["date", "celebration"],
		diet: ["vegetarian"],
		gem: false,
		knownFor: "Steak frites and French onion soup",
		note: "George Youssef's French bistro on East Central, the room people book for an occasion.",
		address: "4618 E Central Ave, Wichita, KS 67208"
	}),
	row({
		name: "Angelo's Italian Restaurant",
		town: W,
		area: "East Wichita",
		county: SG,
		cuisine: "Italian",
		price: 2,
		vibes: [
			"casual",
			"group",
			"celebration"
		],
		diet: ["vegetarian"],
		gem: false,
		knownFor: "Thick-crust pizza and manicotti",
		note: "Wichita's long-running Italian dining room on East Central, revived after a closure.",
		address: "5231 E Central Ave, Wichita, KS 67208"
	}),
	row({
		name: "China Inn",
		town: W,
		area: "East Wichita",
		county: SG,
		cuisine: "Chinese",
		price: 1,
		vibes: [
			"casual",
			"group",
			"quick"
		],
		diet: ["vegetarian"],
		gem: true,
		knownFor: "Chinese-American dining room",
		note: "A full Chinese menu on East Central, next door to the French bistro people already know.",
		address: "4605 E Central Ave, Wichita, KS 67208"
	}),
	row({
		name: "Gyoza Bar",
		town: W,
		area: "East Wichita",
		county: SG,
		cuisine: "Japanese",
		price: 2,
		vibes: [
			"casual",
			"date",
			"group"
		],
		diet: ["vegetarian"],
		gem: true,
		knownFor: "Dumplings",
		note: "A dumpling-first Japanese room on East Central, not a sushi conveyor.",
		address: "6428 E Central Ave, Wichita, KS 67206"
	}),
	row({
		name: "Yokohama Ramen Izakaya",
		town: W,
		area: "East Wichita",
		county: SG,
		cuisine: "Japanese",
		price: 2,
		vibes: ["casual", "solo"],
		diet: ["vegetarian"],
		gem: true,
		knownFor: "Miso ramen",
		note: "The east-side room of Yokohama, on East Central rather than in Delano.",
		address: "6434 E Central Ave, Wichita, KS 67206"
	}),
	row({
		name: "M.I.F. Deli",
		town: W,
		area: "East Wichita",
		county: SG,
		cuisine: "Lebanese",
		price: 1,
		vibes: [
			"quick",
			"casual",
			"solo"
		],
		diet: ["vegetarian"],
		gem: true,
		knownFor: "Lebanese deli",
		note: "A Central Avenue deli for shawarma and salads when you do not want a full dinner.",
		address: "5618 E Central Ave, Wichita, KS 67208"
	}),
	row({
		name: "N & J Cafe & Bakery",
		town: W,
		area: "East Wichita",
		county: SG,
		cuisine: "Lebanese",
		price: 2,
		vibes: [
			"casual",
			"group",
			"solo"
		],
		diet: ["vegetarian", "vegan"],
		gem: false,
		knownFor: "Shawarma, grape leaves, and baklava",
		note: "The original N & J on East Lincoln, with a market case next to the dining room.",
		address: "5600 E Lincoln St, Wichita, KS 67218"
	}),
	row({
		name: "N & J Bar & Grill",
		town: W,
		area: "West Wichita",
		county: SG,
		cuisine: "Lebanese",
		price: 2,
		vibes: ["casual", "group"],
		diet: ["vegetarian"],
		gem: true,
		knownFor: "Grilled Lebanese plates",
		note: "The west-side N & J, with a fuller grill menu than the Lincoln bakery.",
		address: "8448 W Central Ave, Wichita, KS 67212"
	}),
	row({
		name: "Bella Luna Cafe",
		town: W,
		area: "Waterfront",
		county: SG,
		cuisine: "Lebanese",
		price: 2,
		vibes: [
			"casual",
			"date",
			"group"
		],
		diet: ["vegetarian"],
		gem: false,
		knownFor: "Lebanese lunch and dinner",
		note: "Matteo Taha's cafe at the Waterfront, mixing Lebanese plates with steak and seafood.",
		address: "1441 N Webb Rd, Wichita, KS 67206"
	}),
	row({
		name: "Chester's Chophouse & Wine Bar",
		town: W,
		area: "Waterfront",
		county: SG,
		cuisine: "American",
		price: 4,
		vibes: ["celebration", "date"],
		diet: [],
		gem: false,
		knownFor: "Dry-aged steak",
		note: "The east-side steakhouse people book when the night is the point.",
		address: "1550 N Webb Rd, Wichita, KS 67206"
	}),
	row({
		name: "Sapporo Japanese Sushi Restaurant",
		town: W,
		area: "East Wichita",
		county: SG,
		cuisine: "Japanese",
		price: 2,
		vibes: [
			"casual",
			"group",
			"date"
		],
		diet: ["vegetarian"],
		gem: false,
		knownFor: "Sushi and hot Japanese plates",
		note: "A busy sushi room on East Peachtree, with teriyaki and katsu alongside the rolls.",
		address: "8065 E Peachtree Ln, Wichita, KS 67207"
	}),
	row({
		name: "Wichita Brewing Company",
		town: W,
		area: "East Wichita",
		county: SG,
		cuisine: "American",
		price: 2,
		vibes: ["casual", "group"],
		diet: ["vegetarian"],
		gem: false,
		knownFor: "House beer and thin-crust pizza",
		note: "Local brewpub on North Woodlawn. Order the pizza with the beer, not instead of it.",
		address: "535 N Woodlawn St, Wichita, KS 67208"
	}),
	row({
		name: "Passage to India",
		town: W,
		area: "Northeast Wichita",
		county: SG,
		cuisine: "Indian",
		price: 2,
		vibes: [
			"casual",
			"group",
			"date"
		],
		diet: ["vegetarian", "vegan"],
		gem: true,
		knownFor: "Curry and tandoor",
		note: "A strip-center Indian kitchen on East 21st with a deep vegetarian menu.",
		address: "6100 E 21st St N, Wichita, KS 67208"
	}),
	row({
		name: "Rice & Roll By Xing Xing",
		town: W,
		area: "Northeast Wichita",
		county: SG,
		cuisine: "Vietnamese",
		price: 1,
		vibes: [
			"quick",
			"casual",
			"solo"
		],
		diet: ["vegetarian"],
		gem: true,
		knownFor: "Rice and roll counter",
		note: "A fast Vietnamese counter in the same 21st Street stretch as Passage to India.",
		address: "6100 E 21st St N, Wichita, KS 67208"
	}),
	row({
		name: "Deshi Curry",
		town: W,
		area: "Northeast Wichita",
		county: SG,
		cuisine: "Indian",
		price: 1,
		vibes: ["quick", "casual"],
		diet: ["vegetarian"],
		gem: true,
		knownFor: "Curry counter",
		note: "A smaller Indian stop on East 21st, useful when you want a bowl rather than a banquet.",
		address: "6249 E 21st St N, Wichita, KS 67208"
	}),
	row({
		name: "Lokal Eatz",
		town: W,
		area: "Northeast Wichita",
		county: SG,
		cuisine: "Indian",
		price: 1,
		vibes: [
			"quick",
			"casual",
			"solo"
		],
		diet: ["vegetarian", "halal"],
		gem: true,
		knownFor: "Build-your-own Indian bowls",
		note: "A counter-service Indian kitchen on East 21st, near the South Asian grocery strip.",
		address: "5220 E 21st St N, Wichita, KS 67208"
	}),
	row({
		name: "Kababji Grill",
		town: W,
		area: "Northeast Wichita",
		county: SG,
		cuisine: "Lebanese",
		price: 2,
		vibes: ["casual", "group"],
		diet: ["halal", "vegetarian"],
		gem: true,
		knownFor: "Kebabs",
		note: "Grill-focused Lebanese food on East 21st, separate from the bigger cafe names.",
		address: "6527 E 21st St N, Wichita, KS 67208"
	}),
	row({
		name: "Elizabeth's Lounge",
		town: W,
		area: "Northeast Wichita",
		county: SG,
		cuisine: "African",
		price: 2,
		vibes: [
			"late",
			"casual",
			"group"
		],
		diet: [],
		gem: true,
		knownFor: "African cooking in a lounge",
		note: "Listed among the city's few African kitchens, inside a lounge on East 21st. Call ahead.",
		address: "6160 E 21st St N, Wichita, KS 67208"
	}),
	row({
		name: "Malaysia Cafe",
		town: W,
		area: "Far East Wichita",
		county: SG,
		cuisine: "Malaysian",
		price: 2,
		vibes: ["casual", "group"],
		diet: ["vegetarian"],
		gem: true,
		knownFor: "Malaysian noodles and rice",
		note: "One of the only Malaysian menus in the metro, far east on 21st Street.",
		address: "7777 E 21st St N, Wichita, KS 67206"
	}),
	row({
		name: "Cafe Maurice",
		town: W,
		area: "Far East Wichita",
		county: SG,
		cuisine: "Lebanese",
		price: 2,
		vibes: ["casual", "group"],
		diet: ["vegetarian"],
		gem: true,
		knownFor: "Lebanese family plates",
		note: "A far-east Lebanese cafe on 21st, well past the Webb Road restaurants.",
		address: "9747 E 21st St N, Wichita, KS 67206"
	}),
	row({
		name: "YaYa's Euro Bistro",
		town: W,
		area: "Far East Wichita",
		county: SG,
		cuisine: "European",
		price: 3,
		vibes: [
			"date",
			"celebration",
			"group"
		],
		diet: ["vegetarian"],
		gem: false,
		knownFor: "European bistro menu",
		note: "An established European dining room on East 21st, built for a seated dinner.",
		address: "8115 E 21st St N, Wichita, KS 67206"
	}),
	row({
		name: "Kababs",
		town: W,
		area: "East Wichita",
		county: SG,
		cuisine: "Indian",
		price: 2,
		vibes: ["casual", "group"],
		diet: ["vegetarian", "halal"],
		gem: true,
		knownFor: "Indian grill",
		note: "An Indian grill on North Rock Road that regulars treat as a weeknight default.",
		address: "3101 N Rock Rd, Wichita, KS 67226"
	}),
	row({
		name: "Oh Yeah! China Bistro",
		town: W,
		area: "East Wichita",
		county: SG,
		cuisine: "Chinese",
		price: 1,
		vibes: [
			"casual",
			"quick",
			"group"
		],
		diet: ["vegetarian"],
		gem: true,
		knownFor: "Chinese takeout and dining",
		note: "A Chinese bistro in the North Rock Road corridor, sharing the strip with Indian and Korean rooms.",
		address: "3101 N Rock Rd, Wichita, KS 67226"
	}),
	row({
		name: "Astoria Biryani House",
		town: W,
		area: "East Wichita",
		county: SG,
		cuisine: "Indian",
		price: 2,
		vibes: ["casual", "group"],
		diet: ["vegetarian"],
		gem: true,
		knownFor: "Biryani",
		note: "Biryani-focused Indian dining a little farther north on Rock Road.",
		address: "3242 N Rock Rd, Wichita, KS 67226"
	}),
	row({
		name: "Kimchi Korean Restaurant",
		town: W,
		area: "East Wichita",
		county: SG,
		cuisine: "Korean",
		price: 2,
		vibes: ["group", "casual"],
		diet: [],
		gem: true,
		knownFor: "Korean stews and barbecue",
		note: "A full Korean menu on North Rock Road, not a mall food-court stall.",
		address: "2929 N Rock Rd, Wichita, KS 67226"
	}),
	row({
		name: "Pho Le's",
		town: W,
		area: "East Wichita",
		county: SG,
		cuisine: "Vietnamese",
		price: 1,
		vibes: [
			"quick",
			"casual",
			"solo"
		],
		diet: ["vegetarian"],
		gem: true,
		knownFor: "Pho",
		note: "A Rock Road pho shop sitting between the Korean and Indian rooms.",
		address: "2949 N Rock Rd, Wichita, KS 67226"
	}),
	row({
		name: "Hot Stone Korean Grill",
		town: W,
		area: "East Wichita",
		county: SG,
		cuisine: "Korean",
		price: 2,
		vibes: ["group", "date"],
		diet: [],
		gem: true,
		knownFor: "Stone-grill Korean barbecue",
		note: "Korean barbecue farther north on Rock Road, built for sharing.",
		address: "3743 N Rock Rd, Wichita, KS 67226"
	}),
	row({
		name: "Kyuramen x Tbaar",
		town: W,
		area: "East Wichita",
		county: SG,
		cuisine: "Japanese",
		price: 2,
		vibes: [
			"casual",
			"solo",
			"date"
		],
		diet: ["vegetarian"],
		gem: true,
		knownFor: "Ramen",
		note: "A ramen shop on North Rock Road, south of the bigger Japanese steakhouse names.",
		address: "314 N Rock Rd, Wichita, KS 67206"
	}),
	row({
		name: "Ninza Sushi Bar",
		town: W,
		area: "East Wichita",
		county: SG,
		cuisine: "Japanese",
		price: 2,
		vibes: ["casual", "date"],
		diet: ["vegetarian"],
		gem: true,
		knownFor: "Sushi",
		note: "The Rock Road Ninza, a neighborhood sushi bar rather than a destination steakhouse.",
		address: "306 N Rock Rd, Wichita, KS 67206"
	}),
	row({
		name: "Japan Express",
		town: W,
		area: "East Wichita",
		county: SG,
		cuisine: "Japanese",
		price: 1,
		vibes: [
			"quick",
			"casual",
			"solo"
		],
		diet: ["vegetarian"],
		gem: true,
		knownFor: "Fast Japanese plates",
		note: "A quick Japanese counter just off North Rock Road.",
		address: "2250 N Rock Rd Ct, Wichita, KS 67226"
	}),
	row({
		name: "Tuptim Thai Restaurant",
		town: W,
		area: "East Wichita",
		county: SG,
		cuisine: "Thai",
		price: 2,
		vibes: ["casual", "date"],
		diet: ["vegetarian", "vegan"],
		gem: true,
		knownFor: "Thai curries",
		note: "A seated Thai room on North Rock Road, a step past the takeout counters.",
		address: "2121 N Rock Rd, Wichita, KS 67206"
	}),
	row({
		name: "Tacos TJ 664",
		town: W,
		area: "East Wichita",
		county: SG,
		cuisine: "Mexican",
		price: 1,
		vibes: [
			"quick",
			"casual",
			"late"
		],
		diet: [],
		gem: true,
		knownFor: "Birria and carne asada tacos",
		note: "The Rock Road TJ stand. Same family of tacos as the west-side shop, different parking lot.",
		address: "3526 N Rock Rd, Wichita, KS 67226"
	}),
	row({
		name: "Rajadhani Indian Cuisine",
		town: W,
		area: "Northeast Wichita",
		county: SG,
		cuisine: "Indian",
		price: 2,
		vibes: ["casual", "group"],
		diet: ["vegetarian"],
		gem: true,
		knownFor: "South Indian and curry",
		note: "An Indian dining room on East 19th, off the Rock Road strip.",
		address: "4510 E 19th St N, Wichita, KS 67208"
	}),
	row({
		name: "Serendibz",
		town: W,
		area: "Northeast Wichita",
		county: SG,
		cuisine: "Sri Lankan",
		price: 1,
		vibes: ["casual", "quick"],
		diet: ["vegetarian"],
		gem: true,
		knownFor: "Sri Lankan rice bowls",
		note: "Deviled and curried meats over rice, plus short eats, on North Woodlawn.",
		address: "3700 N Woodlawn St, Wichita, KS 67220"
	}),
	row({
		name: "RAHA Mediterranean",
		town: W,
		area: "Northeast Wichita",
		county: SG,
		cuisine: "Mediterranean",
		price: 2,
		vibes: ["casual", "group"],
		diet: ["vegetarian", "halal"],
		gem: true,
		knownFor: "Mediterranean plates",
		note: "A Mediterranean room on East 35th, north of the usual 21st Street cluster.",
		address: "4956 E 35th St N, Wichita, KS 67220"
	}),
	row({
		name: "Mirai Ramen & Sushi",
		town: W,
		area: "Northeast Wichita",
		county: SG,
		cuisine: "Japanese",
		price: 2,
		vibes: [
			"casual",
			"date",
			"solo"
		],
		diet: ["vegetarian"],
		gem: true,
		knownFor: "Ramen and sushi",
		note: "Ramen and sushi on East 37th, in a part of town most visitors never eat in.",
		address: "6254 E 37th St N, Wichita, KS 67220"
	}),
	row({
		name: "Pho Cuong",
		town: W,
		area: "Northeast Wichita",
		county: SG,
		cuisine: "Vietnamese",
		price: 1,
		vibes: [
			"quick",
			"casual",
			"solo"
		],
		diet: ["vegetarian"],
		gem: true,
		knownFor: "Pho",
		note: "A northeast pho shop on East 37th, away from the Broadway Vietnamese row.",
		address: "6605 E 37th St N, Wichita, KS 67226"
	}),
	row({
		name: "Napoli Italian Eatery",
		town: W,
		area: "Northeast Wichita",
		county: SG,
		cuisine: "Italian",
		price: 2,
		vibes: [
			"casual",
			"group",
			"date"
		],
		diet: ["vegetarian"],
		gem: true,
		knownFor: "Neighborhood Italian",
		note: "Italian plates on East 37th, for people who live up here rather than drive to College Hill.",
		address: "7718 E 37th St N, Wichita, KS 67226"
	}),
	row({
		name: "Miya Izakaya",
		town: W,
		area: "North Wichita",
		county: SG,
		cuisine: "Japanese",
		price: 2,
		vibes: ["date", "group"],
		diet: ["vegetarian"],
		gem: true,
		knownFor: "Izakaya snacks and ramen",
		note: "A Japanese-Korean izakaya on North Penstemon, in the newer north-side development.",
		address: "3030 N Penstemon St, Wichita, KS 67226"
	}),
	row({
		name: "Sara and Tedros",
		town: W,
		area: "Hillside",
		county: SG,
		cuisine: "Ethiopian",
		price: 1,
		vibes: ["casual", "group"],
		diet: ["vegetarian", "vegan"],
		gem: true,
		knownFor: "Injera, doro wat, and coffee",
		note: "Ethiopian and Eritrean food served inside King Coal Hookah Lounge on North Hillside.",
		address: "327 N Hillside St, Wichita, KS 67214"
	}),
	row({
		name: "Sazon Mexican Restaurant",
		town: W,
		area: "Northeast Wichita",
		county: SG,
		cuisine: "Mexican",
		price: 1,
		vibes: ["casual", "group"],
		diet: [],
		gem: true,
		knownFor: "Neighborhood Mexican",
		note: "A 21st Street Mexican room east of Broadway, not part of the Nomar taco strip.",
		address: "2624 E 21st St N, Wichita, KS 67214"
	}),
	row({
		name: "Puerto el Triunfo",
		town: W,
		area: "North Wichita",
		county: SG,
		cuisine: "Salvadoran",
		price: 1,
		vibes: ["casual", "group"],
		diet: [],
		gem: true,
		knownFor: "Salvadoran plates",
		note: "A Salvadoran restaurant on East Northern, north of the better-known Seneca pupuserias.",
		address: "1714 E Northern St, Wichita, KS 67214"
	}),
	row({
		name: "Albero Bistro",
		town: W,
		area: "East Wichita",
		county: SG,
		cuisine: "Italian",
		price: 3,
		vibes: ["date", "celebration"],
		diet: ["vegetarian"],
		gem: true,
		knownFor: "Italian bistro dinner",
		note: "An Italian bistro on North Greenwich, out where the city turns into newer retail.",
		address: "2684 N Greenwich Rd, Wichita, KS 67226"
	}),
	row({
		name: "Promise Thai Cuisine",
		town: W,
		area: "East Wichita",
		county: SG,
		cuisine: "Thai",
		price: 2,
		vibes: ["casual", "date"],
		diet: ["vegetarian", "vegan"],
		gem: true,
		knownFor: "Thai curries and noodles",
		note: "Thai dining on South Greenwich, a residential-side room rather than a Rock Road chain.",
		address: "313 S Greenwich Rd, Wichita, KS 67207"
	}),
	row({
		name: "Tasty House",
		town: W,
		area: "East Wichita",
		county: SG,
		cuisine: "Chinese",
		price: 1,
		vibes: [
			"casual",
			"quick",
			"group"
		],
		diet: ["vegetarian"],
		gem: true,
		knownFor: "Chinese family menu",
		note: "A Chinese dining room on North Greenwich that does not advertise itself as a destination.",
		address: "2431 N Greenwich Rd, Wichita, KS 67226"
	}),
	row({
		name: "Thai Traditions",
		town: W,
		area: "East Wichita",
		county: SG,
		cuisine: "Thai",
		price: 2,
		vibes: ["casual", "group"],
		diet: ["vegetarian"],
		gem: true,
		knownFor: "Thai dinner",
		note: "A Thai restaurant on North Carriage Parkway, in the east retail grid.",
		address: "650 N Carriage Pkwy, Wichita, KS 67206"
	}),
	row({
		name: "It's Greek To Me",
		town: W,
		area: "East Wichita",
		county: SG,
		cuisine: "Greek",
		price: 2,
		vibes: [
			"casual",
			"quick",
			"group"
		],
		diet: ["vegetarian"],
		gem: true,
		knownFor: "Gyros and Greek plates",
		note: "Greek food on East Kellogg, one of the few dedicated Greek menus in the metro.",
		address: "7700 E Kellogg Dr, Wichita, KS 67207"
	}),
	row({
		name: "Mediterranean Grill",
		town: W,
		area: "East Wichita",
		county: SG,
		cuisine: "Mediterranean",
		price: 2,
		vibes: ["casual", "group"],
		diet: ["vegetarian", "halal"],
		gem: true,
		knownFor: "Grill platters",
		note: "A Mediterranean grill by Towne East, easy to mistake for mall food and better than that.",
		address: "335 S Towne East Mall Dr, Wichita, KS 67207"
	}),
	row({
		name: "New Paradise Biryani Pointe",
		town: W,
		area: "South Wichita",
		county: SG,
		cuisine: "Indian",
		price: 2,
		vibes: ["casual", "group"],
		diet: ["vegetarian", "halal"],
		gem: true,
		knownFor: "Biryani",
		note: "South Rock Road biryani, in the same commercial stretch as Thai Village.",
		address: "1648 S Rock Rd, Wichita, KS 67207"
	}),
	row({
		name: "Thai Village House of Pad Thai",
		town: W,
		area: "South Wichita",
		county: SG,
		cuisine: "Thai",
		price: 1,
		vibes: [
			"casual",
			"quick",
			"group"
		],
		diet: ["vegetarian", "vegan"],
		gem: true,
		knownFor: "Pad Thai and tom yum",
		note: "A modest Thai room in a South Rock strip center, next to a billiards hall. Portions are large.",
		address: "2020 S Rock Rd, Wichita, KS 67207"
	}),
	row({
		name: "Bella's Lao Beef Jerky & Cafe",
		town: W,
		area: "South Wichita",
		county: SG,
		cuisine: "Lao",
		price: 1,
		vibes: ["quick", "casual"],
		diet: [],
		gem: true,
		knownFor: "Lao beef jerky and cafe plates",
		note: "A Lao cafe on South Rock Road. The jerky is the headline; there is a hot menu too.",
		address: "1885 S Rock Rd, Wichita, KS 67207"
	}),
	row({
		name: "Da Nang Bistro",
		town: W,
		area: "South Wichita",
		county: SG,
		cuisine: "Vietnamese",
		price: 1,
		vibes: ["casual", "quick"],
		diet: ["vegetarian"],
		gem: true,
		knownFor: "Central Vietnamese plates",
		note: "A South Rock Vietnamese bistro, separate from the north-side pho row.",
		address: "1845 S Rock Rd, Wichita, KS 67207"
	}),
	row({
		name: "Manna Wok",
		town: W,
		area: "Southeast Wichita",
		county: SG,
		cuisine: "Korean",
		price: 1,
		vibes: ["quick", "casual"],
		diet: ["vegetarian"],
		gem: true,
		knownFor: "Korean wok plates",
		note: "A small Korean kitchen on East Harry, priced like a weeknight rather than a night out.",
		address: "4865 E Harry St, Wichita, KS 67216"
	}),
	row({
		name: "Mr. Miyagi Japanese Grill",
		town: W,
		area: "Southeast Wichita",
		county: SG,
		cuisine: "Japanese",
		price: 1,
		vibes: ["quick", "casual"],
		diet: ["vegetarian"],
		gem: true,
		knownFor: "Teriyaki grill",
		note: "A Japanese grill on East Harry for a fast plate, not an omakase.",
		address: "3920 E Harry St, Wichita, KS 67216"
	}),
	row({
		name: "Pho Ong 8",
		town: W,
		area: "Southeast Wichita",
		county: SG,
		cuisine: "Vietnamese",
		price: 1,
		vibes: [
			"quick",
			"casual",
			"solo"
		],
		diet: ["vegetarian"],
		gem: true,
		knownFor: "Pho",
		note: "Pho on East Harry, in the southeast grid rather than on Broadway.",
		address: "3801 E Harry St, Wichita, KS 67216"
	}),
	row({
		name: "Fonda La Chona",
		town: W,
		area: "Southeast Wichita",
		county: SG,
		cuisine: "Mexican",
		price: 1,
		vibes: ["casual", "group"],
		diet: [],
		gem: true,
		knownFor: "Mexican fonda plates",
		note: "A Mexican fonda on East Harry that does not show up on the Old Town lists.",
		address: "3415 E Harry St, Wichita, KS 67211"
	}),
	row({
		name: "Ah-So",
		town: W,
		area: "Southeast Wichita",
		county: SG,
		cuisine: "Chinese",
		price: 1,
		vibes: ["casual", "group"],
		diet: ["vegetarian"],
		gem: true,
		knownFor: "Pan-Asian dining room",
		note: "A long-running Chinese and pan-Asian room on South Oliver.",
		address: "855 S Oliver St, Wichita, KS 67218"
	}),
	row({
		name: "Pho KC",
		town: W,
		area: "Southeast Wichita",
		county: SG,
		cuisine: "Vietnamese",
		price: 1,
		vibes: ["casual", "quick"],
		diet: ["vegetarian"],
		gem: true,
		knownFor: "Pho and vermicelli",
		note: "Vietnamese on East Pawnee, south of the Kellogg commercial strip.",
		address: "4875 E Pawnee St, Wichita, KS 67216"
	}),
	row({
		name: "Phnom Penh Pho",
		town: W,
		area: "South Wichita",
		county: SG,
		cuisine: "Cambodian",
		price: 1,
		vibes: ["casual", "quick"],
		diet: ["vegetarian"],
		gem: true,
		knownFor: "Cambodian noodle soups",
		note: "Cambodian cooking on East Pawnee. The name says pho; the menu is broader than that.",
		address: "3123 E Pawnee St, Wichita, KS 67211"
	}),
	row({
		name: "Chiang Mai Thai",
		town: W,
		area: "South Wichita",
		county: SG,
		cuisine: "Thai",
		price: 2,
		vibes: ["casual", "group"],
		diet: ["vegetarian", "vegan"],
		gem: true,
		knownFor: "Northern Thai plates",
		note: "The Hillside Chiang Mai. A second room sits on Andover Road.",
		address: "3141 S Hillside St, Wichita, KS 67216"
	}),
	row({
		name: "Bagatelle Bakery",
		town: W,
		area: "Southeast Wichita",
		county: SG,
		cuisine: "French",
		price: 1,
		vibes: [
			"quick",
			"solo",
			"casual"
		],
		diet: ["vegetarian"],
		gem: true,
		knownFor: "French pastry",
		note: "A bakery on East Harry for a short, sweet stop rather than a seated dinner.",
		address: "6801 E Harry St, Wichita, KS 67207"
	}),
	row({
		name: "Kim's Noodle Bar",
		town: W,
		area: "Far East Wichita",
		county: SG,
		cuisine: "Vietnamese",
		price: 1,
		vibes: [
			"quick",
			"casual",
			"solo"
		],
		diet: ["vegetarian"],
		gem: true,
		knownFor: "Noodle bowls",
		note: "A far-east noodle bar on East Harry, past Towne East and the closer pho shops.",
		address: "10919 E Harry St, Wichita, KS 67207"
	}),
	row({
		name: "Gabby's Peruvian Restaurant",
		town: W,
		area: "South Wichita",
		county: SG,
		cuisine: "Peruvian",
		price: 2,
		vibes: ["casual", "group"],
		diet: [],
		gem: true,
		knownFor: "Peruvian plates",
		note: "Peruvian cooking on South Seneca, in a corridor better known for pupusas.",
		address: "1002 S Seneca St, Wichita, KS 67213"
	}),
	row({
		name: "Delicias Salvadorenas",
		town: W,
		area: "South Wichita",
		county: SG,
		cuisine: "Salvadoran",
		price: 1,
		vibes: [
			"casual",
			"group",
			"quick"
		],
		diet: [],
		gem: true,
		knownFor: "Pupusas and platters",
		note: "A Salvadoran restaurant on South Seneca, one of several on this stretch.",
		address: "1523 S Seneca St, Wichita, KS 67213"
	}),
	row({
		name: "Pupuseria El Torogoz",
		town: W,
		area: "South Wichita",
		county: SG,
		cuisine: "Salvadoran",
		price: 1,
		vibes: [
			"casual",
			"quick",
			"group"
		],
		diet: ["vegetarian"],
		gem: true,
		knownFor: "Pupusas",
		note: "A pupuseria on South Seneca. Go for the griddle, not a combo-plate menu.",
		address: "2061 S Seneca St, Wichita, KS 67213"
	}),
	row({
		name: "Restaurante Usuluteco",
		town: W,
		area: "South Wichita",
		county: SG,
		cuisine: "Salvadoran",
		price: 1,
		vibes: ["casual", "group"],
		diet: [],
		gem: true,
		knownFor: "Usulutan-style Salvadoran food",
		note: "Another independent Salvadoran kitchen on South Seneca, with its own regional lean.",
		address: "2265 S Seneca St, Wichita, KS 67217"
	}),
	row({
		name: "Marchello's Restaurant",
		town: W,
		area: "South Wichita",
		county: SG,
		cuisine: "Italian",
		price: 2,
		vibes: [
			"casual",
			"date",
			"group"
		],
		diet: ["vegetarian"],
		gem: true,
		knownFor: "South-side Italian",
		note: "Italian dining on South Seneca, far from the east-side pasta rooms.",
		address: "3107 S Seneca St, Wichita, KS 67217"
	}),
	row({
		name: "El Jalisco",
		town: W,
		area: "South Wichita",
		county: SG,
		cuisine: "Mexican",
		price: 1,
		vibes: ["casual", "group"],
		diet: [],
		gem: true,
		knownFor: "Jalisco-style Mexican",
		note: "A south-side Mexican restaurant on 47th Street, well below the Kellogg line.",
		address: "615 E 47th St S, Wichita, KS 67216"
	}),
	row({
		name: "Taqueria El Fogon",
		town: W,
		area: "Southwest Wichita",
		county: SG,
		cuisine: "Mexican",
		price: 1,
		vibes: ["quick", "casual"],
		diet: [],
		gem: true,
		knownFor: "Tacos",
		note: "The Bluffview taqueria. A second Fogon cooks on North Arkansas.",
		address: "1555 S Bluffview Dr, Wichita, KS 67218"
	}),
	row({
		name: "Eggroll Express",
		town: W,
		area: "South Wichita",
		county: SG,
		cuisine: "Chinese",
		price: 1,
		vibes: ["quick", "casual"],
		diet: ["vegetarian"],
		gem: true,
		knownFor: "Egg rolls and Chinese takeout",
		note: "A no-frills Chinese counter on 31st Street South.",
		address: "331 31st St S, Wichita, KS 67216"
	}),
	row({
		name: "Carnitas Morelia",
		town: W,
		area: "West Wichita",
		county: SG,
		cuisine: "Mexican",
		price: 1,
		vibes: [
			"quick",
			"casual",
			"group"
		],
		diet: [],
		gem: true,
		knownFor: "Carnitas",
		note: "Carnitas on West 13th. Order the meat, not a chain fajita skillet.",
		address: "3088 W 13th St N, Wichita, KS 67203"
	}),
	row({
		name: "Ben's Big Bowl",
		town: W,
		area: "West Wichita",
		county: SG,
		cuisine: "Vietnamese",
		price: 1,
		vibes: [
			"quick",
			"casual",
			"solo"
		],
		diet: ["vegetarian"],
		gem: true,
		knownFor: "Noodle bowls",
		note: "West-side Vietnamese on 13th Street, for people who do not want to cross town to Broadway.",
		address: "3811 W 13th St N, Wichita, KS 67203"
	}),
	row({
		name: "Puerto Vallarta",
		town: W,
		area: "West Wichita",
		county: SG,
		cuisine: "Mexican",
		price: 2,
		vibes: [
			"casual",
			"group",
			"celebration"
		],
		diet: [],
		gem: true,
		knownFor: "Sit-down Mexican",
		note: "A larger Mexican dining room on North Tyler, west of the river.",
		address: "602 N Tyler Rd, Wichita, KS 67212"
	}),
	row({
		name: "Tuta's Teriyaki",
		town: W,
		area: "West Wichita",
		county: SG,
		cuisine: "Japanese",
		price: 1,
		vibes: [
			"quick",
			"casual",
			"solo"
		],
		diet: ["vegetarian"],
		gem: true,
		knownFor: "Teriyaki plates",
		note: "A fast teriyaki counter on South Tyler.",
		address: "1212 S Tyler Rd, Wichita, KS 67209"
	}),
	row({
		name: "Lee's Chinese Restaurant",
		town: W,
		area: "West Wichita",
		county: SG,
		cuisine: "Chinese",
		price: 1,
		vibes: [
			"casual",
			"quick",
			"group"
		],
		diet: ["vegetarian"],
		gem: true,
		knownFor: "West-side Chinese",
		note: "Chinese dining on West Kellogg, serving the west side without a trip east.",
		address: "6215 W Kellogg Dr, Wichita, KS 67209"
	}),
	row({
		name: "Krua Thai Restaurant",
		town: W,
		area: "West Wichita",
		county: SG,
		cuisine: "Thai",
		price: 2,
		vibes: ["casual", "date"],
		diet: ["vegetarian", "vegan"],
		gem: true,
		knownFor: "Thai curries",
		note: "Thai food on West 21st, in the far-west retail strip.",
		address: "7603 W 21st St N, Wichita, KS 67205"
	}),
	row({
		name: "Kobe Japanese Steakhouse",
		town: W,
		area: "West Wichita",
		county: SG,
		cuisine: "Japanese",
		price: 3,
		vibes: ["group", "celebration"],
		diet: ["vegetarian"],
		gem: false,
		knownFor: "Hibachi tables",
		note: "A west-side Japanese steakhouse for a group that wants the grill show.",
		address: "8760 W 21st St N, Wichita, KS 67205"
	}),
	row({
		name: "Ninza Sushi Bar",
		town: W,
		area: "West Wichita",
		county: SG,
		cuisine: "Japanese",
		price: 2,
		vibes: ["casual", "date"],
		diet: ["vegetarian"],
		gem: true,
		knownFor: "West-side sushi",
		note: "The west Ninza, on West 13th, so the Rock Road bar is not the only one.",
		address: "8641 W 13th St N, Wichita, KS 67212"
	}),
	row({
		name: "6S Steakhouse",
		town: W,
		area: "West Wichita",
		county: SG,
		cuisine: "American",
		price: 4,
		vibes: ["celebration", "date"],
		diet: [],
		gem: false,
		knownFor: "Steak",
		note: "A west-side steakhouse on 21st Street, the counterweight to Chester's on Webb.",
		address: "6200 W 21st St N, Wichita, KS 67205"
	}),
	row({
		name: "Deano's Grill & Tapworks",
		town: W,
		area: "Northwest Wichita",
		county: SG,
		cuisine: "American",
		price: 2,
		vibes: [
			"group",
			"casual",
			"late"
		],
		diet: [],
		gem: false,
		knownFor: "Wings, ribs, and game-day seating",
		note: "A two-story west-side grill on 37th Street North, built for watching a game and staying for dinner.",
		address: "7337 W 37th St N, Wichita, KS 67205"
	}),
	row({
		name: "Bann Thai",
		town: W,
		area: "Northwest Wichita",
		county: SG,
		cuisine: "Thai",
		price: 2,
		vibes: ["casual", "group"],
		diet: ["vegetarian", "vegan"],
		gem: true,
		knownFor: "Thai near Maize Road",
		note: "Thai dining on North Maize Road, serving the northwest side of the city.",
		address: "5255 N Maize Rd, Wichita, KS 67205"
	}),
	row({
		name: "Taqueria El Fogon",
		town: W,
		area: "Northwest Wichita",
		county: SG,
		cuisine: "Mexican",
		price: 1,
		vibes: ["quick", "casual"],
		diet: [],
		gem: true,
		knownFor: "Tacos",
		note: "The North Arkansas Fogon, a taco stop on the way toward Park City.",
		address: "2604 N Arkansas Ave, Wichita, KS 67204"
	}),
	row({
		name: "Las Vaquitas Mexican Food",
		town: "Derby",
		area: "Derby",
		county: SG,
		cuisine: "Mexican",
		price: 1,
		vibes: ["casual", "group"],
		diet: [],
		gem: true,
		knownFor: "Family Mexican in downtown Derby",
		note: "A family kitchen on Madison Avenue. Derby locals treat it as their own, not a Wichita overflow room.",
		address: "128 E Madison Ave, Derby, KS 67037"
	}),
	row({
		name: "Thai Riffic",
		town: "Derby",
		area: "Derby",
		county: SG,
		cuisine: "Thai",
		price: 2,
		vibes: ["casual", "date"],
		diet: ["vegetarian", "vegan"],
		gem: true,
		knownFor: "Thai in Derby",
		note: "Derby's Thai room on East Kay Street, so a curry does not require a drive to Rock Road.",
		address: "141 E Kay St, Derby, KS 67037"
	}),
	row({
		name: "Aztecas Mexican Restaurant",
		town: "Park City",
		area: "Park City",
		county: SG,
		cuisine: "Mexican",
		price: 1,
		vibes: ["casual", "group"],
		diet: [],
		gem: true,
		knownFor: "Mexican on 61st Street",
		note: "A Park City Mexican restaurant on East 61st, north of the Wichita city line.",
		address: "1540 E 61st St N, Park City, KS 67219"
	}),
	row({
		name: "Chiang Mai Thai",
		town: "Andover",
		area: "Andover",
		county: "Butler",
		cuisine: "Thai",
		price: 2,
		vibes: [
			"casual",
			"group",
			"date"
		],
		diet: ["vegetarian", "vegan"],
		gem: true,
		knownFor: "Thai on Andover Road",
		note: "The Andover room of Chiang Mai, for Butler County nights that should not end in Wichita.",
		address: "626 Andover Rd, Andover, KS 67002"
	}),
	row({
		name: "Back Alley Pizza",
		town: "Newton",
		area: "Downtown Newton",
		county: "Harvey",
		cuisine: "Italian",
		price: 2,
		vibes: [
			"casual",
			"group",
			"date"
		],
		diet: ["vegetarian"],
		gem: false,
		knownFor: "Brick-oven pizza",
		note: "Scratch dough and a brick oven on West 6th in downtown Newton. A Harvey County anchor.",
		address: "125 W 6th St, Newton, KS 67114"
	}),
	row({
		name: "The Breadbasket",
		town: "Newton",
		area: "Downtown Newton",
		county: "Harvey",
		cuisine: "American",
		price: 1,
		vibes: [
			"quick",
			"casual",
			"solo"
		],
		diet: ["vegetarian"],
		gem: true,
		knownFor: "Cafe plates downtown",
		note: "A Main Street cafe in Newton for a lighter lunch between the pizza room and the diners.",
		address: "219 N Main St, Newton, KS 67114"
	}),
	row({
		name: "701 Cafe",
		town: "Newton",
		area: "Downtown Newton",
		county: "Harvey",
		cuisine: "American",
		price: 1,
		vibes: ["casual", "group"],
		diet: ["vegetarian"],
		gem: true,
		knownFor: "Downtown cafe",
		note: "A North Main cafe in Newton, local rather than a highway stop.",
		address: "701 N Main St, Newton, KS 67114"
	}),
	row({
		name: "Acapulco Restaurant",
		town: "Newton",
		area: "Downtown Newton",
		county: "Harvey",
		cuisine: "Mexican",
		price: 1,
		vibes: ["casual", "group"],
		diet: [],
		gem: true,
		knownFor: "Mexican on Broadway",
		note: "Newton's downtown Mexican room on West Broadway.",
		address: "217 W Broadway St, Newton, KS 67114"
	}),
	row({
		name: "Carlos' Kitchen",
		town: "Newton",
		area: "Downtown Newton",
		county: "Harvey",
		cuisine: "Mexican",
		price: 1,
		vibes: ["casual", "quick"],
		diet: [],
		gem: true,
		knownFor: "Mexican and catering",
		note: "A smaller Mexican kitchen on South Kansas Avenue in Newton.",
		address: "114 S Kansas Ave, Newton, KS 67114"
	}),
	row({
		name: "Curtis C's Diner",
		town: "Newton",
		area: "Newton",
		county: "Harvey",
		cuisine: "American",
		price: 1,
		vibes: [
			"casual",
			"group",
			"solo"
		],
		diet: [],
		gem: true,
		knownFor: "Diner plates and pie",
		note: "A Newton diner on Washington Road for breakfast, lunch, and a daily special.",
		address: "1039 Washington Rd, Newton, KS 67114"
	}),
	row({
		name: "Genova Italian Restaurant",
		town: "Newton",
		area: "Newton",
		county: "Harvey",
		cuisine: "Italian",
		price: 2,
		vibes: [
			"casual",
			"date",
			"group"
		],
		diet: ["vegetarian"],
		gem: true,
		knownFor: "Garlic knots and house pasta",
		note: "Newton's Italian dining room on Washington Road, with stromboli and daily specials.",
		address: "1021 Washington Rd, Newton, KS 67114"
	}),
	row({
		name: "Casa Fiesta",
		town: "Newton",
		area: "Newton",
		county: "Harvey",
		cuisine: "Mexican",
		price: 1,
		vibes: ["casual", "group"],
		diet: [],
		gem: true,
		knownFor: "North Main Mexican",
		note: "Mexican dining on North Main in Newton, north of the downtown square.",
		address: "1607 N Main St, Newton, KS 67114"
	}),
	row({
		name: "Great Wall",
		town: "Newton",
		area: "Newton",
		county: "Harvey",
		cuisine: "Chinese",
		price: 1,
		vibes: [
			"casual",
			"group",
			"quick"
		],
		diet: ["vegetarian"],
		gem: true,
		knownFor: "Chinese in south Newton",
		note: "Newton's Chinese restaurant on South Kansas Road.",
		address: "2305 S Kansas Rd, Newton, KS 67114"
	}),
	row({
		name: "El Cerrito",
		town: "Hesston",
		area: "Hesston",
		county: "Harvey",
		cuisine: "Mexican",
		price: 1,
		vibes: ["casual", "group"],
		diet: [],
		gem: true,
		knownFor: "Hesston Mexican",
		note: "A Mexican restaurant on Leonard Court in Hesston, the next town north of Newton.",
		address: "4 Leonard Ct, Hesston, KS 67062"
	}),
	row({
		name: "Water's Edge",
		town: "Hesston",
		area: "Hesston",
		county: "Harvey",
		cuisine: "American",
		price: 2,
		vibes: [
			"casual",
			"group",
			"celebration"
		],
		diet: ["vegetarian"],
		gem: true,
		knownFor: "American dining and catering",
		note: "Hesston's sit-down American room on South Main, used for ordinary dinners and small celebrations.",
		address: "701 S Main St, Hesston, KS 67062"
	}),
	row({
		name: "Bravo's Italian Bistro",
		town: "Wellington",
		area: "Downtown Wellington",
		county: "Sumner",
		cuisine: "Italian",
		price: 2,
		vibes: [
			"date",
			"casual",
			"group"
		],
		diet: ["vegetarian"],
		gem: true,
		knownFor: "Italian on Harvey Avenue",
		note: "Wellington's Italian bistro. The room has asked for cash or check, so bring a backup way to pay.",
		address: "107 W Harvey Ave, Wellington, KS 67152"
	}),
	row({
		name: "El Chile Verde",
		town: "Wellington",
		area: "Downtown Wellington",
		county: "Sumner",
		cuisine: "Mexican",
		price: 1,
		vibes: ["casual", "group"],
		diet: [],
		gem: true,
		knownFor: "Mexican on Harvey Avenue",
		note: "A downtown Wellington Mexican restaurant, a short walk from Bravo's.",
		address: "119 W Harvey Ave, Wellington, KS 67152"
	}),
	row({
		name: "Travelin' Smoke BBQ",
		town: "Wellington",
		area: "Downtown Wellington",
		county: "Sumner",
		cuisine: "Barbecue",
		price: 1,
		vibes: [
			"casual",
			"group",
			"quick"
		],
		diet: [],
		gem: true,
		knownFor: "Smoked meats",
		note: "Barbecue on North Washington in Wellington, the Sumner County alternative to a Wichita pit.",
		address: "217 N Washington Ave, Wellington, KS 67152"
	}),
	row({
		name: "Best of Orient",
		town: "Wellington",
		area: "Wellington",
		county: "Sumner",
		cuisine: "Chinese",
		price: 1,
		vibes: [
			"casual",
			"group",
			"quick"
		],
		diet: ["vegetarian"],
		gem: true,
		knownFor: "Chinese in Wellington",
		note: "Chinese dining on East Lincoln, so Sumner County is not only barbecue and Mexican.",
		address: "114 E Lincoln Ave, Wellington, KS 67152"
	}),
	row({
		name: "El Valle Mexican Restaurant",
		town: "Wellington",
		area: "Wellington",
		county: "Sumner",
		cuisine: "Mexican",
		price: 1,
		vibes: ["casual", "group"],
		diet: [],
		gem: true,
		knownFor: "Mexican on North A",
		note: "A second Wellington Mexican room, up North A Street rather than on the downtown square.",
		address: "1104 N A St, Wellington, KS 67152"
	}),
	row({
		name: "Brayan Hibachi and Sushi Express",
		town: "Wellington",
		area: "Wellington",
		county: "Sumner",
		cuisine: "Japanese",
		price: 1,
		vibes: [
			"quick",
			"casual",
			"group"
		],
		diet: ["vegetarian"],
		gem: true,
		knownFor: "Hibachi and sushi",
		note: "A Japanese express kitchen on East 16th in Wellington.",
		address: "500 E 16th St, Wellington, KS 67152"
	})
];
[...new Set(SPOTS.map((s) => s.town))];
var TOWN_POINTS = {
	Wichita: {
		lat: 37.6872,
		lng: -97.3301
	},
	Derby: {
		lat: 37.5483,
		lng: -97.2689
	},
	Andover: {
		lat: 37.6864,
		lng: -97.1367
	},
	Newton: {
		lat: 38.0467,
		lng: -97.345
	},
	Hesston: {
		lat: 38.1383,
		lng: -97.4314
	},
	"Park City": {
		lat: 37.7961,
		lng: -97.3181
	},
	Wellington: {
		lat: 37.2653,
		lng: -97.3714
	}
};
function nearestTown(lat, lng) {
	let best = null;
	for (const [town, point] of Object.entries(TOWN_POINTS)) {
		const miles = haversine(lat, lng, point.lat, point.lng);
		if (!best || miles < best.miles) best = {
			town,
			miles
		};
	}
	if (!best || best.miles > 45) return null;
	return best;
}
function haversine(lat1, lng1, lat2, lng2) {
	const r = 3958.8;
	const dLat = (lat2 - lat1) * Math.PI / 180;
	const dLng = (lng2 - lng1) * Math.PI / 180;
	const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLng / 2) ** 2;
	return 2 * r * Math.asin(Math.sqrt(a));
}
function chooseSpot(pool, leanGems, avoidId) {
	if (pool.length === 0) return null;
	let list = avoidId ? pool.filter((s) => s.id !== avoidId) : pool;
	if (list.length === 0) list = pool;
	const weights = list.map((s) => leanGems && s.gem ? 3 : 1);
	const total = weights.reduce((sum, n) => sum + n, 0);
	let cursor = Math.random() * total;
	for (let i = 0; i < list.length; i++) {
		cursor -= weights[i] ?? 0;
		if (cursor <= 0) return list[i] ?? null;
	}
	return list[list.length - 1] ?? null;
}
function filterSpots(spots, opts) {
	const q = opts.query.trim().toLowerCase();
	return spots.filter((s) => {
		if (opts.town !== "Any" && s.town !== opts.town) return false;
		if (opts.area !== "Any" && s.area !== opts.area) return false;
		if (opts.cuisines.length && !opts.cuisines.includes(s.cuisine)) return false;
		if (opts.prices.length && !opts.prices.includes(s.price)) return false;
		if (opts.vibes.length && !s.vibes.some((v) => opts.vibes.includes(v))) return false;
		if (opts.diets.length && !opts.diets.every((d) => s.diet.includes(d))) return false;
		if (opts.gemsOnly && !s.gem) return false;
		if (opts.skipBeen && opts.beenIds.includes(s.id)) return false;
		if (!q) return true;
		return `${s.name} ${s.cuisine} ${s.area} ${s.town} ${s.knownFor} ${s.note}`.toLowerCase().includes(q);
	});
}
var emptyNarrow = {
	area: "Any",
	cuisines: [],
	prices: [],
	vibes: [],
	diets: [],
	gemsOnly: false
};
var useTable = create()(persist((set) => ({
	town: "Any",
	...emptyNarrow,
	leanGems: true,
	skipBeen: false,
	savedIds: [],
	beenIds: [],
	pro: false,
	drawsByDay: {},
	hydrated: false,
	setHydrated: (hydrated) => set({ hydrated }),
	setTown: (town) => set({
		town,
		area: "Any"
	}),
	setArea: (area) => set({ area }),
	toggleCuisine: (cuisine) => set((s) => ({ cuisines: s.cuisines.includes(cuisine) ? s.cuisines.filter((c) => c !== cuisine) : [...s.cuisines, cuisine] })),
	togglePrice: (price) => set((s) => ({ prices: s.prices.includes(price) ? s.prices.filter((p) => p !== price) : [...s.prices, price] })),
	toggleVibe: (vibe) => set((s) => ({ vibes: s.vibes.includes(vibe) ? s.vibes.filter((v) => v !== vibe) : [...s.vibes, vibe] })),
	toggleDiet: (diet) => set((s) => ({ diets: s.diets.includes(diet) ? s.diets.filter((d) => d !== diet) : [...s.diets, diet] })),
	setGemsOnly: (gemsOnly) => set({ gemsOnly }),
	setLeanGems: (leanGems) => set({ leanGems }),
	setSkipBeen: (skipBeen) => set({ skipBeen }),
	toggleSaved: (id) => set((s) => ({ savedIds: s.savedIds.includes(id) ? s.savedIds.filter((x) => x !== id) : [...s.savedIds, id] })),
	toggleBeen: (id) => set((s) => ({ beenIds: s.beenIds.includes(id) ? s.beenIds.filter((x) => x !== id) : [...s.beenIds, id] })),
	setPro: (pro) => set({ pro }),
	recordDraw: (day) => set((s) => ({ drawsByDay: {
		...s.drawsByDay,
		[day]: (s.drawsByDay[day] ?? 0) + 1
	} })),
	clearNarrowing: () => set({
		...emptyNarrow,
		leanGems: true,
		skipBeen: false
	})
}), {
	name: "stray-table",
	skipHydration: true,
	partialize: (s) => ({
		town: s.town,
		area: s.area,
		cuisines: s.cuisines,
		prices: s.prices,
		vibes: s.vibes,
		diets: s.diets,
		gemsOnly: s.gemsOnly,
		leanGems: s.leanGems,
		skipBeen: s.skipBeen,
		savedIds: s.savedIds,
		beenIds: s.beenIds,
		pro: s.pro,
		drawsByDay: s.drawsByDay
	})
}));
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function todayKey(date = /* @__PURE__ */ new Date()) {
	return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}
function mapsUrl(name, address) {
	return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${name}, ${address}`)}`;
}
function priceMarks(price) {
	return "$".repeat(price);
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[background-color,color,opacity] duration-150 ease-out outline-none focus-visible:ring-2 focus-visible:ring-ink/30 disabled:pointer-events-none disabled:opacity-40 active:opacity-90", {
	variants: {
		variant: {
			primary: "bg-ink text-paper hover:bg-ink/90",
			secondary: "border border-line bg-surface text-ink hover:bg-chip",
			ghost: "text-ink hover:bg-chip"
		},
		size: {
			md: "h-11 px-4",
			lg: "h-12 px-5 text-base",
			sm: "h-11 px-3"
		}
	},
	defaultVariants: {
		variant: "primary",
		size: "md"
	}
});
function Button({ className, variant, size, asChild = false, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size
		}), className),
		...props
	});
}
var FREE_DRAWS = 5;
var FREE_SAVES = 3;
var VIBES = [
	["casual", "Casual"],
	["date", "Date"],
	["group", "Group"],
	["quick", "Quick"],
	["solo", "Solo"],
	["late", "Late"],
	["celebration", "Occasion"]
];
var DIETS = [
	["vegetarian", "Vegetarian"],
	["vegan", "Vegan"],
	["halal", "Halal"]
];
var PRICES = [
	[1, "$"],
	[2, "$$"],
	[3, "$$$"],
	[4, "$$$$"]
];
function Picker({ billing }) {
	const store = useTable();
	const [query, setQuery] = (0, import_react.useState)("");
	const [result, setResult] = (0, import_react.useState)(null);
	const [spinning, setSpinning] = (0, import_react.useState)(false);
	const [reel, setReel] = (0, import_react.useState)(null);
	const [payOpen, setPayOpen] = (0, import_react.useState)(false);
	const [locNote, setLocNote] = (0, import_react.useState)(null);
	const [code, setCode] = (0, import_react.useState)("");
	const [codeMsg, setCodeMsg] = (0, import_react.useState)(null);
	const [more, setMore] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		Promise.resolve(useTable.persist.rehydrate()).then(() => {
			useTable.getState().setHydrated(true);
		});
	}, []);
	(0, import_react.useEffect)(() => {
		if (!store.hydrated || !billing.paymentsLive || store.pro) return;
		const params = new URLSearchParams(window.location.search);
		if (params.get("upgraded") !== "1") return;
		if (sessionStorage.getItem("stray-checkout") !== "1") return;
		sessionStorage.removeItem("stray-checkout");
		useTable.getState().setPro(true);
		params.delete("upgraded");
		const next = `${window.location.pathname}${params.toString() ? `?${params}` : ""}`;
		window.history.replaceState({}, "", next);
	}, [
		store.hydrated,
		store.pro,
		billing.paymentsLive
	]);
	const locked = billing.paymentsLive && !store.pro;
	const drawsToday = store.drawsByDay[todayKey()] ?? 0;
	const drawsLeft = Math.max(0, FREE_DRAWS - drawsToday);
	const cuisines = (0, import_react.useMemo)(() => [...new Set(SPOTS.map((s) => s.cuisine))].sort((a, b) => a.localeCompare(b)), []);
	const towns = (0, import_react.useMemo)(() => [...new Set(SPOTS.map((s) => s.town))].sort((a, b) => a.localeCompare(b)), []);
	const areas = (0, import_react.useMemo)(() => {
		const source = store.town === "Any" ? SPOTS : SPOTS.filter((s) => s.town === store.town);
		return [...new Set(source.map((s) => s.area))].sort((a, b) => a.localeCompare(b));
	}, [store.town]);
	const pool = (0, import_react.useMemo)(() => filterSpots(SPOTS, {
		town: store.town,
		area: store.area,
		cuisines: store.cuisines,
		prices: store.prices,
		vibes: locked ? [] : store.vibes,
		diets: locked ? [] : store.diets,
		gemsOnly: locked ? false : store.gemsOnly,
		skipBeen: locked ? false : store.skipBeen,
		beenIds: store.beenIds,
		query
	}), [
		store,
		locked,
		query
	]);
	function guardPro(action) {
		if (locked) {
			setPayOpen(true);
			return;
		}
		action();
	}
	function draw() {
		if (spinning) return;
		if (locked && drawsLeft <= 0) {
			setPayOpen(true);
			return;
		}
		if (pool.length === 0) return;
		const pick = chooseSpot(pool, !locked && store.leanGems, result?.id ?? null);
		if (!pick) return;
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			setResult(pick);
			setReel(pick.name);
			if (locked) store.recordDraw(todayKey());
			return;
		}
		setSpinning(true);
		const started = performance.now();
		const tick = () => {
			const sample = pool[Math.floor(Math.random() * pool.length)];
			setReel(sample?.name ?? pick.name);
			if (performance.now() - started < 900) {
				window.setTimeout(tick, 70);
				return;
			}
			setReel(pick.name);
			setResult(pick);
			setSpinning(false);
			if (locked) store.recordDraw(todayKey());
		};
		tick();
	}
	function useLocation() {
		if (!navigator.geolocation) {
			setLocNote("Location is not available in this browser. Pick a town instead.");
			return;
		}
		navigator.geolocation.getCurrentPosition((pos) => {
			const near = nearestTown(pos.coords.latitude, pos.coords.longitude);
			if (!near) {
				setLocNote("That pin is outside the Wichita metro. Pick a town in Sedgwick, Butler, Harvey, or Sumner.");
				return;
			}
			store.setTown(near.town);
			setLocNote(`Set to ${near.town}, about ${Math.max(1, Math.round(near.miles))} miles from this pin.`);
		}, () => setLocNote("Location was blocked. Pick a town instead."), {
			enableHighAccuracy: false,
			timeout: 8e3
		});
	}
	async function shareSpot(spot) {
		const text = `${spot.name} — ${spot.cuisine} in ${spot.area}, ${spot.town}. ${spot.knownFor}.`;
		if (navigator.share) try {
			await navigator.share({
				title: spot.name,
				text,
				url: mapsUrl(spot.name, spot.address)
			});
			return;
		} catch {}
		await navigator.clipboard.writeText(`${text} ${mapsUrl(spot.name, spot.address)}`);
		setLocNote("Copied a link you can send.");
	}
	function startCheckout() {
		if (!billing.checkoutUrl) return;
		sessionStorage.setItem("stray-checkout", "1");
		window.location.href = billing.checkoutUrl;
	}
	async function redeem(event) {
		event.preventDefault();
		setCodeMsg(null);
		try {
			if ((await redeemProCode({ data: { code } })).ok) {
				store.setPro(true);
				setPayOpen(false);
				setCode("");
				return;
			}
			setCodeMsg("That code does not match.");
		} catch (error) {
			setCodeMsg(error instanceof Error ? error.message : "Could not check that code.");
		}
	}
	(0, import_react.useEffect)(() => {
		if (!result || spinning) return;
		if (!pool.some((spot) => spot.id === result.id)) {
			setResult(null);
			setReel(null);
		}
	}, [
		pool,
		result,
		spinning
	]);
	const shown = result;
	const saveBlocked = locked && !store.savedIds.includes(shown?.id ?? "") && store.savedIds.length >= FREE_SAVES;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-bg text-ink",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 pt-6 pb-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium tracking-wide text-muted uppercase",
					children: "Wichita metro"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-xl leading-none font-medium tracking-tight",
					children: "Stray Table"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "secondary",
					size: "sm",
					onClick: () => setPayOpen(true),
					children: store.pro && billing.paymentsLive ? "Pro" : "Stray Pro"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "mx-auto grid max-w-5xl gap-6 px-4 pt-4 pb-16 lg:grid-cols-[17rem_1fr] lg:items-start",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "order-1 lg:order-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-display text-3xl leading-tight font-medium tracking-tight",
							children: "Where should we eat?"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 max-w-xl text-muted",
							children: "Draw a real table in Sedgwick, Butler, Harvey, or Sumner county. Narrow it, then let the list pick — lesser-known rooms weigh heavier."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 rounded-xl border border-line bg-surface p-5 sm:p-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-medium tracking-wide text-faint uppercase",
									children: spinning ? "Drawing" : shown ? "Tonight" : "Ready"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: cn("reel-name font-display mt-2 min-h-16 text-3xl leading-tight font-medium tracking-tight", spinning && "is-spinning"),
									"aria-live": "polite",
									children: reel ?? "Draw a table"
								}),
								shown && !spinning ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-sm text-muted",
											children: [
												shown.area,
												", ",
												shown.town,
												" · ",
												shown.county,
												" County"
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-3 text-base",
											children: shown.note
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "mt-3 text-sm text-muted",
											children: [
												shown.cuisine,
												" · ",
												priceMarks(shown.price),
												" · ",
												shown.knownFor,
												shown.gem ? " · Off the usual list" : ""
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-2 text-sm text-faint",
											children: shown.address
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-5 flex flex-col gap-2 sm:flex-row sm:flex-wrap",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
													asChild: true,
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
														href: mapsUrl(shown.name, shown.address),
														target: "_blank",
														rel: "noreferrer",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
															className: "size-4",
															"aria-hidden": true
														}), "Open in Maps"]
													})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
													variant: "secondary",
													onClick: () => {
														if (saveBlocked) {
															setPayOpen(true);
															return;
														}
														store.toggleSaved(shown.id);
													},
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bookmark, {
														className: "size-4",
														"aria-hidden": true
													}), store.savedIds.includes(shown.id) ? "Saved" : "Save"]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
													variant: "secondary",
													onClick: () => guardPro(() => store.toggleBeen(shown.id)),
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
														className: "size-4",
														"aria-hidden": true
													}), store.beenIds.includes(shown.id) ? "Been there" : "Mark been"]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
													variant: "ghost",
													onClick: () => void shareSpot(shown),
													children: "Share"
												})
											]
										})
									]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-2 text-sm text-muted",
									children: [
										pool.length,
										" ",
										pool.length === 1 ? "table matches" : "tables match",
										". Hours change — confirm they are open."
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-5 flex flex-col gap-2 sm:flex-row sm:items-center",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "lg",
										onClick: draw,
										disabled: spinning || pool.length === 0,
										className: "sm:min-w-44",
										children: spinning ? "Drawing…" : shown ? "Draw another" : "Draw a table"
									}), locked ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-sm text-muted tabular-nums",
										children: [
											drawsLeft,
											" free ",
											drawsLeft === 1 ? "draw" : "draws",
											" left today"
										]
									}) : null]
								}),
								pool.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 text-sm text-muted",
									children: "Nothing fits. Clear a filter or switch towns."
								}) : null
							]
						}),
						store.savedIds.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-sm font-medium text-muted",
								children: "Shortlist"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-2 divide-y divide-line rounded-lg border border-line bg-surface",
								children: store.savedIds.map((id) => {
									const spot = SPOTS.find((s) => s.id === id);
									if (!spot) return null;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex items-center justify-between gap-3 px-4 py-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											className: "min-w-0 text-left",
											onClick: () => setResult(spot),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "block truncate font-medium",
												children: spot.name
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "block truncate text-sm text-muted",
												children: [
													spot.cuisine,
													" · ",
													spot.town
												]
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											className: "grid size-11 place-items-center text-muted",
											"aria-label": `Remove ${spot.name}`,
											onClick: () => store.toggleSaved(id),
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
										})]
									}, id);
								})
							})]
						}) : null
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "order-2 lg:sticky lg:top-4 lg:order-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-line bg-surface p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
									className: "flex items-center gap-2 text-sm font-medium",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersHorizontal, {
										className: "size-4",
										"aria-hidden": true
									}), "Narrow it"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "text-sm text-muted underline-offset-2 hover:underline",
									onClick: store.clearNarrowing,
									children: "Reset"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "mt-4 block text-xs font-medium tracking-wide text-faint uppercase",
								htmlFor: "town",
								children: "Town"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								id: "town",
								className: "mt-1 h-11 w-full rounded-sm border border-line bg-paper px-3 text-sm",
								value: store.town,
								onChange: (e) => store.setTown(e.target.value),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "Any",
									children: "Anywhere in the metro"
								}), towns.map((town) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: town,
									children: town
								}, town))]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "ghost",
								size: "sm",
								className: "mt-1 px-0",
								onClick: useLocation,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
									className: "size-4",
									"aria-hidden": true
								}), "Use my location"]
							}),
							locNote ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted",
								children: locNote
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "mt-3 block text-xs font-medium tracking-wide text-faint uppercase",
								htmlFor: "area",
								children: "Neighborhood"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								id: "area",
								className: "mt-1 h-11 w-full rounded-sm border border-line bg-paper px-3 text-sm",
								value: areas.includes(store.area) ? store.area : "Any",
								onChange: (e) => store.setArea(e.target.value),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "Any",
									children: "Any neighborhood"
								}), areas.map((area) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: area,
									children: area
								}, area))]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "mt-4 block text-xs font-medium tracking-wide text-faint uppercase",
								htmlFor: "q",
								children: "Search"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "q",
								value: query,
								onChange: (e) => setQuery(e.target.value),
								placeholder: "Pho, biryani, Delano…",
								className: "mt-1 h-11 w-full rounded-sm border border-line bg-paper px-3 text-sm placeholder:text-faint"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 text-xs font-medium tracking-wide text-faint uppercase",
								children: "Cuisine"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2 flex max-h-40 flex-wrap gap-2 overflow-y-auto",
								children: cuisines.map((cuisine) => {
									const on = store.cuisines.includes(cuisine);
									return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										"aria-pressed": on,
										onClick: () => store.toggleCuisine(cuisine),
										className: cn("h-11 rounded-full border px-3 text-sm", on ? "border-ink bg-ink text-paper" : "border-line bg-paper text-ink"),
										children: cuisine
									}, cuisine);
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 text-xs font-medium tracking-wide text-faint uppercase",
								children: "Price"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2 flex gap-2",
								children: PRICES.map(([value, label]) => {
									const on = store.prices.includes(value);
									return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										"aria-pressed": on,
										onClick: () => store.togglePrice(value),
										className: cn("h-11 min-w-11 flex-1 rounded-sm border text-sm tabular-nums", on ? "border-ink bg-ink text-paper" : "border-line bg-paper"),
										children: label
									}, value);
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								className: "mt-4 flex h-11 w-full items-center justify-between text-sm font-medium",
								onClick: () => setMore((v) => !v),
								"aria-expanded": more,
								children: ["Occasion, diet, lesser-known", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, {
									className: cn("size-4 text-muted transition-transform duration-150", more && "rotate-180"),
									"aria-hidden": true
								})]
							}),
							more ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-1 space-y-4 border-t border-line pt-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
										className: "text-xs font-medium tracking-wide text-faint uppercase",
										children: "Occasion"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-2 flex flex-wrap gap-2",
										children: VIBES.map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
											on: store.vibes.includes(id),
											label,
											locked,
											onClick: () => guardPro(() => store.toggleVibe(id))
										}, id))
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
										className: "text-xs font-medium tracking-wide text-faint uppercase",
										children: "Diet"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-2 flex flex-wrap gap-2",
										children: DIETS.map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
											on: store.diets.includes(id),
											label,
											locked,
											onClick: () => guardPro(() => store.toggleDiet(id))
										}, id))
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
										label: "Lesser-known only",
										checked: !locked && store.gemsOnly,
										locked,
										onChange: (v) => guardPro(() => store.setGemsOnly(v))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
										label: "Favor lesser-known",
										checked: !locked && store.leanGems,
										locked,
										onChange: (v) => guardPro(() => store.setLeanGems(v))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
										label: "Skip places I've been",
										checked: !locked && store.skipBeen,
										locked,
										onChange: (v) => guardPro(() => store.setSkipBeen(v))
									}),
									locked ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-muted",
										children: "Occasion, diet, and the lesser-known bias are part of Pro."
									}) : null
								]
							}) : null
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 px-1 text-xs leading-relaxed text-faint",
						children: "Shelf covers independent rooms in Wichita, Derby, Park City, Andover, Newton, Hesston, and Wellington. El Dorado, Augusta, and the smaller suburbs are not stocked yet. Menus move."
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paywall, {
				open: payOpen,
				onOpenChange: setPayOpen,
				billing,
				pro: store.pro,
				code,
				setCode,
				codeMsg,
				onCheckout: startCheckout,
				onRedeem: redeem
			})
		]
	});
}
function Chip({ on, label, locked, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		"aria-pressed": on,
		onClick,
		className: cn("h-11 rounded-full border px-3 text-sm", on ? "border-ink bg-ink text-paper" : "border-line bg-paper text-ink", locked && "opacity-70"),
		children: label
	});
}
function Toggle({ label, checked, locked, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "flex h-11 items-center justify-between gap-3 text-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			type: "checkbox",
			className: "size-4 accent-ink",
			checked,
			onChange: (e) => onChange(e.target.checked),
			"aria-disabled": locked
		})]
	});
}
function Paywall({ open, onOpenChange, billing, pro, code, setCode, codeMsg, onCheckout, onRedeem }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, { className: "fixed inset-0 z-40 bg-ink/40" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "fixed inset-x-4 top-1/2 z-50 mx-auto max-h-dvh max-w-md -translate-y-1/2 overflow-y-auto rounded-xl border border-line bg-surface p-5 text-ink outline-none sm:p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
					className: "font-display text-2xl font-medium tracking-tight",
					children: "Stray Pro"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
					className: "mt-2 text-sm text-muted",
					children: "Unlimited draws, a bias toward lesser-known rooms, occasion and diet filters, and a shortlist that does not stop at three."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-4 space-y-2 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
						"Free keeps town, neighborhood, cuisine, and price, with ",
						FREE_DRAWS,
						" draws a day."
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
						"Pro is ",
						billing.priceLabel,
						" on this device."
					] })]
				}),
				pro && billing.paymentsLive ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-sm",
					children: "Pro is on for this browser."
				}) : billing.paymentsLive && billing.checkoutUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					className: "mt-5 w-full",
					size: "lg",
					onClick: onCheckout,
					children: ["Unlock Pro · ", billing.priceLabel]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 rounded-lg border border-line bg-paper p-4 text-sm text-muted",
					children: billing.preview ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						"Checkout is not connected, so the full picker stays open while you try it. After you publish, add ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-ink",
							children: "STRIPE_PAYMENT_LINK"
						}),
						" in the app’s secret settings — a Stripe Payment Link — and point its confirmation page at your site with",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-ink",
							children: "?upgraded=1"
						}),
						" on the end. Optional:",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-ink",
							children: "PRO_PRICE_LABEL"
						}),
						" and ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-ink",
							children: "PRO_RESTORE_CODE"
						}),
						"."
					] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Pro checkout is not turned on yet. The free picker still works." })
				}),
				billing.restoreEnabled && !pro ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "mt-4",
					onSubmit: onRedeem,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-xs font-medium tracking-wide text-faint uppercase",
							htmlFor: "code",
							children: "Restore code"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-1 flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "code",
								value: code,
								onChange: (e) => setCode(e.target.value),
								className: "h-11 min-w-0 flex-1 rounded-sm border border-line bg-paper px-3 text-sm"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "submit",
								variant: "secondary",
								children: "Restore"
							})]
						}),
						codeMsg ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted",
							children: codeMsg
						}) : null
					]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogClose, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						className: "mt-3 w-full",
						children: "Close"
					})
				})
			]
		})] })
	});
}
function Home() {
	const billing = Route.useLoaderData();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Picker, { billing });
}
//#endregion
export { Home as component };
