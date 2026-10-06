export type Marker = {
  label: string;
  detail: string;
  spotName?: string;
  address?: string;
  /** Phrases in the prose that should open this location's shelf card. */
  mentions?: string[];
};

export type Chapter = {
  era: string;
  title: string;
  paragraphs: string[];
  places: Marker[];
};

/** Public record, not a memoir. Hours and owners still move. */
export const CHAPTERS: Chapter[] = [
  {
    era: "1870s",
    title: "A cowtown before it was a dining town",
    paragraphs: [
      "Wichita's first food economy was beef on the hoof. In the 1870s the Chisholm Trail brought herds to the railhead, and the town's reputation was stockyards, not dining rooms.",
      "That cattle habit shows up much later as steakhouses. It does not mean today's chop house is a trail camp. The restaurants that actually survived are younger, and most of them are counters.",
    ],
    places: [],
  },
  {
    era: "1910",
    title: "Livingston's",
    paragraphs: [],
    places: [
      {
        label: "Livingston's Cafe",
        detail:
          "Andy Livingston opened the first cafe in 1910 at 310 North Emporia. This East Douglas location is not that address. The name was dark for about 12 years, then the family brought it back. This one was Jeanne's Cafe until 2015.",
        spotName: "Livingston's Cafe",
        address: "4733 East Douglas Avenue, Wichita, KS 67218",
      },
      {
        label: "Livingston's Diner",
        detail:
          "The other Livingston's, on East 21st since 2017. Also not the 1910 location on North Emporia. Bob Livingston reopened the name in the 1960s at Kellogg and Poplar and moved several times after that.",
        spotName: "Livingston's Diner",
        address: "9747 E 21st St N, Wichita, KS 67206",
      },
    ],
  },
  {
    era: "1921",
    title: "The slider was invented here, then the chain left",
    paragraphs: [
      "Walter Anderson and Billy Ingram opened the first White Castle in 1921 at the northwest corner of First and Main. Five-cent square burgers, a grill you could see, and a building meant to look clean.",
      "The last Wichita White Castle closed in 1938. The chain kept going elsewhere. What stayed was the idea of a cheap, repeatable sandwich — and a local argument about who does it better.",
    ],
    places: [
      {
        label: "White Castle, First and Main",
        detail: "The original building is gone. There is no White Castle in Wichita to send you to.",
      },
    ],
  },
  {
    era: "1930–1938",
    title: "Depression counters that are still cooking",
    paragraphs: [],
    places: [
      {
        label: "NuWay",
        detail:
          "Tom McEvoy started NuWay on July 4, 1930, in a former Phillips 66 at 1416 West Douglas. The loose-meat sandwich is still made on the same kind of cooker, with onion rings and root beer.",
        spotName: "NuWay",
        address: "1416 W Douglas Ave, Wichita, KS 67203",
      },
      {
        label: "Old Mill Tasty Shop",
        detail:
          "Otto and Erna Woermke opened Old Mill on March 1, 1932, at Douglas and St. Francis, then moved the marble soda fountain to 604 East Douglas in 1940. Shakes and a lunch counter.",
        spotName: "Old Mill Tasty Shop",
        address: "604 E Douglas Ave, Wichita, KS 67202",
        mentions: ["Old Mill"],
      },
      {
        label: "Merle's Place",
        detail:
          "Merle's Place began in 1935 as Tom's Inn at 440 North Seneca and took Merle Bates's name in 1966. The Reuben and a shuffleboard table. The building was listed for sale in September 2026 and was still open.",
        spotName: "Merle's Place",
        address: "440 N Seneca St, Wichita, KS 67203",
      },
      {
        label: "Beacon Restaurant",
        detail:
          "Beacon opened in 1938 as Curley's Inn at 909 East Douglas and is still a breakfast diner, usually through early afternoon.",
        spotName: "Beacon Restaurant",
        address: "909 E Douglas Ave, Wichita, KS 67202",
      },
    ],
  },
  {
    era: "1938–1970s",
    title: "The diner itself was built in Wichita",
    paragraphs: [
      "Arthur and Ella Valentine ran lunchrooms in small towns and then in Wichita and Hutchinson. Their Shamrock Lunch was one of the Hutchinson locations. In 1938 Valentine took over a Wichita business that built prefabricated lunchrooms, and in 1947 he incorporated Valentine Manufacturing. The little steel diners were made here and shipped out.",
      "One of them, serial V-133, was bought in Wichita and moved to Wellington in the early 1950s. Matt and Sybil Dwyer opened it as Dwyer's Swing In at 224 South Washington. It fed people until the 1980s. The building is still there. It is not a restaurant.",
    ],
    places: [
      {
        label: "Dwyer's Swing In",
        detail: "A Wichita-built Valentine diner, moved to Wellington. Closed as a restaurant in the 1980s.",
      },
    ],
  },
  {
    era: "1943–1953",
    title: "Nightclubs, drive-ups, and the first lasting Mexican location",
    paragraphs: [],
    places: [
      {
        label: "Savute's Italian Ristorante",
        detail:
          "Savute's started as a North Broadway nightclub in 1943. John and Mary Savute turned it into Rosie's in 1951, and the Italian dining room is still there. Red sauce, in a building that has been feeding people since the war.",
        spotName: "Savute's Italian Ristorante",
        address: "3303 N Broadway Ave, Wichita, KS 67219",
      },
      {
        label: "Sport Burger",
        detail:
          "The Hillside drive-up shows up in city directories by 1948, first as Crest Grill. Onion-topped burgers. Evening hours only, and not every night.",
        spotName: "Sport Burger",
        address: "134 N Hillside St, Wichita, KS 67214",
      },
      {
        label: "El Patio Cafe",
        detail:
          "Nick Hernandez opened El Patio in 1950 at 2227 North Broadway. The fried tacos and Monterreys are now on East Central.",
        spotName: "El Patio Cafe",
        address: "424 E Central Ave, Wichita, KS 67202",
      },
      {
        label: "Ty's Diner",
        detail:
          "Kenny and Jo Tyson opened Ty's Diner in 1953 at 928 West 2nd, in Delano. Vern and Dottie Hartley ran it from 1980 into the mid-1990s. It is still a short lunch counter there. Burgers and pork tenders. Lunch only.",
        spotName: "Ty's Diner",
        address: "928 West 2nd Street, Wichita, KS",
      },
      {
        label: "Dog and Shake",
        detail:
          "A 2016 Wichita Eagle survey counted this drive-up from 1948. It is not on the shelf until the address is checked again.",
      },
      {
        label: "Calvin's Hamburger Haven",
        detail:
          "The same 2016 survey counted this counter from 1952. It is not on the shelf until the address is checked again.",
      },
    ],
  },
  {
    era: "1958",
    title: "Pizza, and a lunch counter that changed the rules",
    paragraphs: [],
    places: [
      {
        label: "Pizza Hut Museum",
        detail:
          "Dan and Frank Carney borrowed $600 from their mother and opened Pizza Hut in 1958 in a small brick tavern. The sign only had room for eight letters. They sold the company to PepsiCo in 1977. The original hut was moved to the Wichita State campus and opened as a museum in 2018. It is a stop, not dinner.",
      },
      {
        label: "Dockum",
        detail:
          "That same summer, students sat in at Dockum Drug Store, a downtown Rexall lunch counter that would sell food to Black customers only to go. Carol Parks took a seat in July 1958 and ordered a Coke. For weeks, students filled the stools and were refused. On August 11 the owner told the staff to serve them. It was the first successful student-led lunch-counter sit-in in the country, two years before Greensboro. The drugstore is gone. The Ambassador Hotel stands on that Douglas and Broadway corner, and this basement bar uses the name. The sit-in was upstairs, and it was not a theme.",
        spotName: "Dockum",
        address: "104 S Broadway Ave, Wichita, KS 67202",
      },
    ],
  },
  {
    era: "Since",
    title: "The shelf after the classics",
    paragraphs: [],
    places: [
      {
        label: "Connie's Mexico Cafe",
        detail:
          "Mexican locations spread past El Patio. Connie's fried tacos have been a North Broadway habit since the late 1950s, the style with peas and potatoes.",
        spotName: "Connie's Mexico Cafe",
        address: "2227 N Broadway Ave, Wichita, KS 67219",
        mentions: ["Connie's"],
      },
      {
        label: "Little Saigon",
        detail:
          "Later Wichita food is immigration and an aviation-town appetite, not another slider. Vietnamese, Lao, Thai, and Chinese kitchens clustered along Broadway and in the southeast neighborhoods after refugee resettlement. Little Saigon is the obvious door. The lesser-known locations are the point of a draw.",
        spotName: "Little Saigon",
        address: "1015 N Broadway Ave, Wichita, KS 67214",
      },
      {
        label: "Lotte",
        detail:
          "Seasonal Kansas plates, downstairs from a Market Street garage. Open since 2023, and easy to miss from the street.",
        spotName: "Lotte",
        address: "320 S Market St, Wichita, KS 67202",
      },
      {
        label: "First Mile Kitchen",
        detail: "A wood hearth at Bradley Fair. The other new local location at this end of the story.",
        spotName: "First Mile Kitchen",
        address: "2141 N Bradley Fair Pkwy, Wichita, KS 67206",
        mentions: ["First Mile"],
      },
    ],
  },
  {
    era: "Harvey County",
    title: "Wheat, the railroad, and a cafeteria that integrated",
    paragraphs: [
      "Newton was a railhead in 1871, then a Mennonite wheat town after Bernhard Warkentin brought Turkey Red winter wheat and the mills followed. The dining that belongs to Harvey County is on Main Street, not on Douglas.",
      "Around 1953, Bethel College professor J. Winfield Fretz became a partner in the Guest House Cafeteria on North Main. It was an early self-service location. In 1957 the partners integrated it, and Black railroad porters had a sit-down meal near the station. The Guest House closed in 1972.",
      "Herman and Bertha Toevs opened The Breadbasket in 1984 for coffee, zwieback, and later a German Mennonite buffet. It served its last buffet in December 2025, so it is not on the shelf. Hesston's Colonial House, part of that same buffet tradition, burned before the Kings carried the idea to Newton.",
    ],
    places: [],
  },
  {
    era: "Butler County",
    title: "Oil towns, not just a drive into Wichita",
    paragraphs: [
      "El Dorado's boom was oil, from 1915, and the town still feeds itself. Two Brothers BBQ on West Central is the Butler County location with a fireplace, built for a lake day as much as a Tuesday. Andover sits on the county line so a night out does not have to cross into Wichita. Metro Bistro is the local table there.",
      "The town was already pouring drinks before the oil. James Thomas, a former sheriff, opened the Palace Saloon in 1870. Augusta's landmark is a bowling alley. The Holiday Bowl opened in 1958, sat dark for years, and came back with a kitchen and a pizza oven. Rose Hill, Benton, Towanda, and the smaller towns appear on the shelf only where a restaurant has been mapped.",
    ],
    places: [
      {
        label: "Two Brothers BBQ",
        detail: "The El Dorado pit on West Central.",
        spotName: "Two Brothers BBQ",
        address: "1701 W Central Ave, El Dorado, KS 67042",
      },
      {
        label: "Metro Bistro",
        detail: "Andover's own location, on South Andover Road.",
        spotName: "Metro Bistro",
        address: "321 S Andover Rd, Andover, KS 67002",
      },
    ],
  },
  {
    era: "Sumner County",
    title: "South of the county line",
    paragraphs: [
      "Wellington is the county seat. Its tables are the Mexican, barbecue, and Chinese locations people already use, not a tour. The Valentine diner on South Washington is the old dining room; it is a shop now. Mulvane straddles the Sedgwick line. Luciano's opened on Main Street in 2005, an Italian dining room and shop.",
      "Belle Plaine, Oxford, and Caldwell are listed when a restaurant is on the public map. A missing town means nobody has mapped a location, not that the town does not eat.",
    ],
    places: [
      {
        label: "Luciano's",
        detail: "Fresh pasta on Mulvane's Main Street since 2005.",
        spotName: "Luciano's",
        address: "216 W Main St, Mulvane, KS 67110",
      },
    ],
  },
  {
    era: "The other Sedgwick towns",
    title: "Suburbs that grew up on the highway",
    paragraphs: [
      "Derby began in 1869 as a claim on Spring Creek and was platted in 1871 under the name El Paso. The railroad called the depot Derby so the mail would stop going to El Paso, Texas. The restaurants came much later, mostly along Rock Road. Haysville, Goddard, Maize, Park City, Valley Center, and Clearwater follow that pattern. People eat there. The counters from the 1930s are in Wichita.",
    ],
    places: [],
  },
  {
    era: "Born here",
    title: "Companies that started in Wichita and are still cooking",
    paragraphs: [
      "White Castle began at First and Main in 1921 and left in 1938. NuWay is still at its 1930 stand. Pizza Hut, opened in 1958, is a museum on the Wichita State campus and a chain across the metro. Taco Grande (1960, Mike Foley) and Taco Tico (1962) are still local names. Spangles opened in January 1978 as Coney Island, took that name in a 1984 contest, and kept its office on North Hillside. The founding family sold it in 2026. It is still based here, with locations in Wichita, Derby, Andover, El Dorado, and Park City. Freddy's started in 2002 at 21st and Tyler, and that first location is still open.",
      "Mapped locations of those companies are in the draw. Lesser-known locations still weigh more, so a chain founded here does not crowd out a smaller table.",
    ],
    places: [
      {
        label: "Freddy's",
        detail: "The original location, opened in 2002 at 21st and Tyler. Steakburgers and frozen custard.",
        spotName: "Freddy's",
        address: "8621 West 21st Street North, Wichita, KS 67205",
        mentions: ["Freddy's"],
      },
    ],
  },
  {
    era: "Hutchinson",
    title: "A drive-in, a family Mexican location, and the fair",
    paragraphs: [
      "Hutchinson is outside the four-county Wichita metro, and it has its own older locations. Melvin Robinson and his nephew Lawrence Burgess opened the R-B Drive In in 1948 at 201 East Avenue A. The initials are theirs. Carhops still take orders at the stalls. Burgers and pork tenders are the long menu.",
      "Antonio and Rachel Flores started the Anchor Inn in 1977 at 126 South Main. The family still runs it, and the flour tacos are the dish people name. The Kansas Sampler Foundation later named it a finalist for the 8 Wonders of Kansas Cuisine.",
      "Each September the Kansas State Fair turns Hutchinson into a temporary dining city. Church booths have sold chicken and noodles there for generations. Pronto Pups are the other fair staple. Neither is a restaurant you can draw the rest of the year.",
    ],
    places: [
      {
        label: "R-B Drive In",
        detail: "A carhop drive-in since 1948. Burgers, pork tenders, and onion rings.",
        spotName: "R-B Drive In",
        address: "201 E Ave A, Hutchinson, KS 67501",
        mentions: ["R-B Drive In", "R-B"],
      },
      {
        label: "Anchor Inn",
        detail: "Flores family Mexican food on South Main since 1977. Flour tacos.",
        spotName: "Anchor Inn",
        address: "126 S Main St, Hutchinson, KS 67501",
      },
    ],
  },
];
