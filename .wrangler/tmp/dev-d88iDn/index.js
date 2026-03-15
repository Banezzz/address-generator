var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// src/config/regions.js
var US_STATES = [
  { full: "Alabama", abbr: "AL" },
  { full: "Alaska", abbr: "AK" },
  { full: "Arizona", abbr: "AZ" },
  { full: "Arkansas", abbr: "AR" },
  { full: "California", abbr: "CA" },
  { full: "Colorado", abbr: "CO" },
  { full: "Connecticut", abbr: "CT" },
  { full: "Delaware", abbr: "DE" },
  { full: "Florida", abbr: "FL" },
  { full: "Georgia", abbr: "GA" },
  { full: "Hawaii", abbr: "HI" },
  { full: "Idaho", abbr: "ID" },
  { full: "Illinois", abbr: "IL" },
  { full: "Indiana", abbr: "IN" },
  { full: "Iowa", abbr: "IA" },
  { full: "Kansas", abbr: "KS" },
  { full: "Kentucky", abbr: "KY" },
  { full: "Louisiana", abbr: "LA" },
  { full: "Maine", abbr: "ME" },
  { full: "Maryland", abbr: "MD" },
  { full: "Massachusetts", abbr: "MA" },
  { full: "Michigan", abbr: "MI" },
  { full: "Minnesota", abbr: "MN" },
  { full: "Mississippi", abbr: "MS" },
  { full: "Missouri", abbr: "MO" },
  { full: "Montana", abbr: "MT" },
  { full: "Nebraska", abbr: "NE" },
  { full: "Nevada", abbr: "NV" },
  { full: "New Hampshire", abbr: "NH" },
  { full: "New Jersey", abbr: "NJ" },
  { full: "New Mexico", abbr: "NM" },
  { full: "New York", abbr: "NY" },
  { full: "North Carolina", abbr: "NC" },
  { full: "North Dakota", abbr: "ND" },
  { full: "Ohio", abbr: "OH" },
  { full: "Oklahoma", abbr: "OK" },
  { full: "Oregon", abbr: "OR" },
  { full: "Pennsylvania", abbr: "PA" },
  { full: "Rhode Island", abbr: "RI" },
  { full: "South Carolina", abbr: "SC" },
  { full: "South Dakota", abbr: "SD" },
  { full: "Tennessee", abbr: "TN" },
  { full: "Texas", abbr: "TX" },
  { full: "Utah", abbr: "UT" },
  { full: "Vermont", abbr: "VT" },
  { full: "Virginia", abbr: "VA" },
  { full: "Washington", abbr: "WA" },
  { full: "West Virginia", abbr: "WV" },
  { full: "Wisconsin", abbr: "WI" },
  { full: "Wyoming", abbr: "WY" }
];
var TAX_FREE_STATE_CODES = ["AK", "DE", "MT", "NH", "OR"];
var HK_ZONES = [
  { id: "HKI", label: "Hong Kong Island / \u9999\u6E2F\u5CF6" },
  { id: "KLN", label: "Kowloon / \u4E5D\u9F8D" },
  { id: "NT", label: "New Territories / \u65B0\u754C" }
];
var SG_AREAS = [
  { id: "CENTRAL", label: "Central Area / \u4E2D\u592E\u5340" },
  { id: "QUEENSTOWN", label: "Queenstown / \u5973\u7687\u93AE" },
  { id: "JURONG_EAST", label: "Jurong East / \u88D5\u5ECA\u6771" },
  { id: "TAMPINES", label: "Tampines / \u6DE1\u6FF1\u5C3C" }
];
var JP_AREAS = [
  { id: "TOKYO", label: "Tokyo / \u6771\u4EAC" },
  { id: "OSAKA", label: "Osaka / \u5927\u962A" },
  { id: "YOKOHAMA", label: "Yokohama / \u6A2A\u6D5C" },
  { id: "FUKUOKA", label: "Fukuoka / \u798F\u5CA1" }
];
var TW_AREAS = [
  { id: "TAIPEI", label: "Taipei / \u53F0\u5317" },
  { id: "TAICHUNG", label: "Taichung / \u53F0\u4E2D" },
  { id: "TAINAN", label: "Tainan / \u53F0\u5357" },
  { id: "KAOHSIUNG", label: "Kaohsiung / \u9AD8\u96C4" }
];
var TH_AREAS = [
  { id: "BANGKOK", label: "Bangkok / \u0E01\u0E23\u0E38\u0E07\u0E40\u0E17\u0E1E\u0E21\u0E2B\u0E32\u0E19\u0E04\u0E23" },
  { id: "CHIANG_MAI", label: "Chiang Mai / \u0E40\u0E0A\u0E35\u0E22\u0E07\u0E43\u0E2B\u0E21\u0E48" },
  { id: "PHUKET", label: "Phuket / \u0E20\u0E39\u0E40\u0E01\u0E47\u0E15" },
  { id: "CHONBURI", label: "Chonburi / \u0E0A\u0E25\u0E1A\u0E38\u0E23\u0E35" }
];
var VN_AREAS = [
  { id: "HCMC", label: "Ho Chi Minh City / Th\xE0nh ph\u1ED1 H\u1ED3 Ch\xED Minh" },
  { id: "HANOI", label: "Hanoi / H\xE0 N\u1ED9i" },
  { id: "DANANG", label: "Da Nang / \u0110\xE0 N\u1EB5ng" },
  { id: "CANTHO", label: "Can Tho / C\u1EA7n Th\u01A1" }
];
var REGION_CONFIGS = [
  {
    id: "US",
    label: "United States",
    nativeLabel: "\u7F8E\u56FD",
    countryCode: "us",
    languageHeader: "en-US,en;q=0.9",
    subregionLabel: "State",
    subregionLabelNative: "\u5DDE",
    adminLabel: "State",
    adminLabelNative: "\u5DDE",
    postalLabel: "ZIP code",
    postalLabelNative: "\u90AE\u7F16"
  },
  {
    id: "US_TAX_FREE",
    label: "United States Tax-Free States",
    nativeLabel: "\u7F8E\u56FD\u514D\u7A0E\u5DDE",
    countryCode: "us",
    languageHeader: "en-US,en;q=0.9",
    subregionLabel: "Tax-free state",
    subregionLabelNative: "\u514D\u7A0E\u5DDE",
    adminLabel: "State",
    adminLabelNative: "\u5DDE",
    postalLabel: "ZIP code",
    postalLabelNative: "\u90AE\u7F16"
  },
  {
    id: "HK",
    label: "Hong Kong",
    nativeLabel: "\u9999\u6E2F",
    countryCode: "hk",
    languageHeader: "zh-HK,en;q=0.9",
    subregionLabel: "Zone",
    subregionLabelNative: "\u533A\u57DF",
    adminLabel: "Zone",
    adminLabelNative: "\u533A\u57DF",
    postalLabel: "Postal code",
    postalLabelNative: "\u90AE\u7F16"
  },
  {
    id: "SG",
    label: "Singapore",
    nativeLabel: "\u65B0\u52A0\u5761",
    countryCode: "sg",
    languageHeader: "en-SG,zh-Hans;q=0.8",
    subregionLabel: "Area",
    subregionLabelNative: "\u533A\u57DF",
    adminLabel: "Area",
    adminLabelNative: "\u533A\u57DF",
    postalLabel: "Postal code",
    postalLabelNative: "\u90AE\u7F16"
  },
  {
    id: "JP",
    label: "Japan",
    nativeLabel: "\u65E5\u672C",
    countryCode: "jp",
    languageHeader: "ja,en;q=0.8",
    subregionLabel: "Area",
    subregionLabelNative: "\u533A\u57DF",
    adminLabel: "Prefecture",
    adminLabelNative: "\u90FD\u9053\u5E9C\u53BF",
    postalLabel: "Postal code",
    postalLabelNative: "\u90AE\u7F16"
  },
  {
    id: "TW",
    label: "Taiwan",
    nativeLabel: "\u53F0\u6E7E",
    countryCode: "tw",
    languageHeader: "zh-TW,en;q=0.8",
    subregionLabel: "Area",
    subregionLabelNative: "\u533A\u57DF",
    adminLabel: "County / City",
    adminLabelNative: "\u53BF\u5E02",
    postalLabel: "Postal code",
    postalLabelNative: "\u90AE\u7F16"
  },
  {
    id: "TH",
    label: "Thailand",
    nativeLabel: "\u6CF0\u56FD",
    countryCode: "th",
    languageHeader: "th,en;q=0.8",
    subregionLabel: "Area",
    subregionLabelNative: "\u533A\u57DF",
    adminLabel: "Province",
    adminLabelNative: "\u5E9C",
    postalLabel: "Postal code",
    postalLabelNative: "\u90AE\u7F16"
  },
  {
    id: "VN",
    label: "Vietnam",
    nativeLabel: "\u8D8A\u5357",
    countryCode: "vn",
    languageHeader: "vi,en;q=0.8",
    subregionLabel: "Area",
    subregionLabelNative: "\u533A\u57DF",
    adminLabel: "Province / City",
    adminLabelNative: "\u7701\u5E02",
    postalLabel: "Postal code",
    postalLabelNative: "\u90AE\u7F16"
  }
];
var REGION_MAP = new Map(REGION_CONFIGS.map((region) => [region.id, region]));
var US_STATE_MAP = new Map(US_STATES.map((state) => [state.abbr, state]));
function getRegionConfig(regionId = "US") {
  return REGION_MAP.get(regionId) || REGION_MAP.get("US");
}
__name(getRegionConfig, "getRegionConfig");
function getRegionOptions() {
  return REGION_CONFIGS;
}
__name(getRegionOptions, "getRegionOptions");
function getSubregionOptions(regionId) {
  if (regionId === "US") {
    return US_STATES.map((state) => ({ id: state.abbr, label: `${state.full} (${state.abbr})` }));
  }
  if (regionId === "US_TAX_FREE") {
    return US_STATES.filter((state) => TAX_FREE_STATE_CODES.includes(state.abbr)).map((state) => ({ id: state.abbr, label: `${state.full} (${state.abbr})` }));
  }
  if (regionId === "HK") return HK_ZONES;
  if (regionId === "SG") return SG_AREAS;
  if (regionId === "JP") return JP_AREAS;
  if (regionId === "TW") return TW_AREAS;
  if (regionId === "TH") return TH_AREAS;
  if (regionId === "VN") return VN_AREAS;
  return [];
}
__name(getSubregionOptions, "getSubregionOptions");
function resolveSubregion(regionId, subregionId) {
  const options = getSubregionOptions(regionId);
  if (options.length === 0) return null;
  if (subregionId && options.some((option) => option.id === subregionId)) {
    return subregionId;
  }
  return options[Math.floor(Math.random() * options.length)].id;
}
__name(resolveSubregion, "resolveSubregion");

// src/config/seeds.js
var US_STATE_COORDINATES = {
  AL: [{ lat: 32.377716, lng: -86.300568 }, { lat: 33.520661, lng: -86.80249 }],
  AK: [
    { lat: 61.216583, lng: -149.899597 },
    { lat: 58.301598, lng: -134.419998 },
    { lat: 64.837845, lng: -147.716675 },
    { lat: 57.053055, lng: -135.330002 },
    { lat: 60.554444, lng: -151.258331 }
  ],
  AZ: [{ lat: 33.448376, lng: -112.074036 }, { lat: 34.048927, lng: -111.093735 }],
  AR: [{ lat: 34.746483, lng: -92.289597 }, { lat: 36.082157, lng: -94.171852 }],
  CA: [{ lat: 36.778259, lng: -119.417931 }, { lat: 34.052235, lng: -118.243683 }],
  CO: [{ lat: 39.739235, lng: -104.99025 }, { lat: 38.833881, lng: -104.821365 }],
  CT: [{ lat: 41.76371, lng: -72.685097 }, { lat: 41.308273, lng: -72.927887 }],
  DE: [
    { lat: 39.739072, lng: -75.539787 },
    { lat: 38.774055, lng: -75.139351 },
    { lat: 39.683723, lng: -75.749657 },
    { lat: 39.158169, lng: -75.524368 },
    { lat: 39.449554, lng: -75.716309 },
    { lat: 38.720947, lng: -75.076012 },
    { lat: 38.912613, lng: -75.428093 }
  ],
  FL: [{ lat: 30.332184, lng: -81.655647 }, { lat: 25.761681, lng: -80.191788 }],
  GA: [{ lat: 33.749001, lng: -84.387985 }, { lat: 32.083541, lng: -81.099831 }],
  HI: [{ lat: 21.306944, lng: -157.858337 }, { lat: 19.896767, lng: -155.582779 }],
  ID: [{ lat: 43.615021, lng: -116.202316 }, { lat: 47.677683, lng: -116.780466 }],
  IL: [{ lat: 41.878113, lng: -87.629799 }, { lat: 40.633125, lng: -89.398529 }],
  IN: [{ lat: 39.768402, lng: -86.158066 }, { lat: 41.593369, lng: -87.346427 }],
  IA: [{ lat: 41.586834, lng: -93.625 }, { lat: 42.5, lng: -94.166672 }],
  KS: [{ lat: 39.099728, lng: -94.578568 }, { lat: 37.687176, lng: -97.330055 }],
  KY: [{ lat: 38.252666, lng: -85.758453 }, { lat: 37.839333, lng: -84.27002 }],
  LA: [{ lat: 30.695366, lng: -91.187393 }, { lat: 29.951065, lng: -90.071533 }],
  ME: [{ lat: 44.310623, lng: -69.77949 }, { lat: 43.661471, lng: -70.255325 }],
  MD: [{ lat: 38.978447, lng: -76.49218 }, { lat: 39.290386, lng: -76.61219 }],
  MA: [{ lat: 42.360081, lng: -71.058884 }, { lat: 42.313373, lng: -71.057083 }],
  MI: [{ lat: 42.732536, lng: -84.555534 }, { lat: 42.331429, lng: -83.045753 }],
  MN: [{ lat: 44.953703, lng: -93.089958 }, { lat: 44.977753, lng: -93.265015 }],
  MS: [{ lat: 32.298756, lng: -90.184807 }, { lat: 32.366806, lng: -88.703705 }],
  MO: [{ lat: 38.576702, lng: -92.173516 }, { lat: 38.627003, lng: -90.199402 }],
  MT: [
    { lat: 46.878717, lng: -113.996586 },
    { lat: 45.783287, lng: -108.50069 },
    { lat: 45.677979, lng: -111.042931 },
    { lat: 46.589146, lng: -112.039108 },
    { lat: 47.505283, lng: -111.300812 },
    { lat: 48.195793, lng: -114.312912 }
  ],
  NE: [{ lat: 41.256538, lng: -95.934502 }, { lat: 40.813618, lng: -96.702595 }],
  NV: [{ lat: 39.163914, lng: -119.767403 }, { lat: 36.114647, lng: -115.172813 }],
  NH: [
    { lat: 43.208137, lng: -71.538063 },
    { lat: 42.99564, lng: -71.454789 },
    { lat: 43.071755, lng: -70.762554 },
    { lat: 43.197865, lng: -70.873672 },
    { lat: 43.304523, lng: -72.003639 }
  ],
  NJ: [{ lat: 40.058323, lng: -74.405663 }, { lat: 39.364285, lng: -74.422928 }],
  NM: [{ lat: 35.084385, lng: -106.650421 }, { lat: 32.319939, lng: -106.763653 }],
  NY: [{ lat: 40.712776, lng: -74.005974 }, { lat: 43.299427, lng: -74.217933 }],
  NC: [{ lat: 35.779591, lng: -78.638176 }, { lat: 35.227085, lng: -80.843124 }],
  ND: [{ lat: 46.825905, lng: -100.778275 }, { lat: 46.877186, lng: -96.789803 }],
  OH: [{ lat: 39.961178, lng: -82.998795 }, { lat: 41.499321, lng: -81.694359 }],
  OK: [{ lat: 35.46756, lng: -97.516426 }, { lat: 36.15398, lng: -95.992775 }],
  OR: [
    { lat: 44.046236, lng: -123.022029 },
    { lat: 45.505917, lng: -122.675049 },
    { lat: 44.942898, lng: -123.035095 },
    { lat: 44.058174, lng: -121.315308 },
    { lat: 42.326515, lng: -122.875595 },
    { lat: 45.420673, lng: -122.670647 }
  ],
  PA: [{ lat: 40.273191, lng: -76.886701 }, { lat: 39.952583, lng: -75.165222 }],
  RI: [{ lat: 41.824009, lng: -71.412834 }, { lat: 41.580095, lng: -71.477429 }],
  SC: [{ lat: 34.00071, lng: -81.034814 }, { lat: 32.776474, lng: -79.931051 }],
  SD: [{ lat: 44.366787, lng: -100.35376 }, { lat: 43.544595, lng: -96.731103 }],
  TN: [{ lat: 36.162663, lng: -86.781601 }, { lat: 35.149532, lng: -90.048981 }],
  TX: [{ lat: 30.267153, lng: -97.743057 }, { lat: 29.760427, lng: -95.369804 }],
  UT: [{ lat: 40.76078, lng: -111.891045 }, { lat: 37.774929, lng: -111.920414 }],
  VT: [{ lat: 44.260059, lng: -72.575386 }, { lat: 44.475883, lng: -73.212074 }],
  VA: [{ lat: 37.540726, lng: -77.43605 }, { lat: 36.852924, lng: -75.977982 }],
  WA: [{ lat: 47.606209, lng: -122.332069 }, { lat: 47.252876, lng: -122.44429 }],
  WV: [{ lat: 38.34982, lng: -81.632622 }, { lat: 39.629527, lng: -79.955896 }],
  WI: [{ lat: 43.073051, lng: -89.40123 }, { lat: 43.038902, lng: -87.906471 }],
  WY: [{ lat: 41.140259, lng: -104.820236 }, { lat: 44.276569, lng: -105.507391 }]
};
var REGION_SEEDS = {
  HK: {
    HKI: [
      { lat: 22.2819, lng: 114.1586 },
      { lat: 22.2783, lng: 114.1747 },
      { lat: 22.2798, lng: 114.1839 },
      { lat: 22.2772, lng: 114.1717 },
      { lat: 22.2839, lng: 114.1548 },
      { lat: 22.2871, lng: 114.1912 },
      { lat: 22.2908, lng: 114.2003 },
      { lat: 22.248, lng: 114.1595 },
      { lat: 22.2642, lng: 114.2361 },
      { lat: 22.2488, lng: 114.1541 }
    ],
    KLN: [
      { lat: 22.2963, lng: 114.1722 },
      { lat: 22.3186, lng: 114.1684 },
      { lat: 22.3307, lng: 114.188 },
      { lat: 22.3027, lng: 114.1772 },
      { lat: 22.3121, lng: 114.1707 },
      { lat: 22.3193, lng: 114.2086 },
      { lat: 22.3369, lng: 114.1946 },
      { lat: 22.3273, lng: 114.1599 },
      { lat: 22.3236, lng: 114.1887 },
      { lat: 22.308, lng: 114.2242 }
    ],
    NT: [
      { lat: 22.3833, lng: 114.188 },
      { lat: 22.3712, lng: 114.1131 },
      { lat: 22.4445, lng: 114.0222 },
      { lat: 22.3949, lng: 113.9731 },
      { lat: 22.4467, lng: 114.1694 },
      { lat: 22.4523, lng: 114.1645 },
      { lat: 22.4919, lng: 114.1388 },
      { lat: 22.5037, lng: 114.1287 },
      { lat: 22.4572, lng: 114.0012 },
      { lat: 22.3154, lng: 113.9345 },
      { lat: 22.2879, lng: 113.9441 }
    ]
  },
  SG: {
    CENTRAL: [
      { lat: 1.2857, lng: 103.8516 },
      { lat: 1.2966, lng: 103.8501 },
      { lat: 1.3048, lng: 103.8318 }
    ],
    QUEENSTOWN: [
      { lat: 1.2942, lng: 103.7869 },
      { lat: 1.3067, lng: 103.7984 },
      { lat: 1.2893, lng: 103.803 }
    ],
    JURONG_EAST: [
      { lat: 1.3331, lng: 103.7422 },
      { lat: 1.3269, lng: 103.7388 },
      { lat: 1.3398, lng: 103.7392 }
    ],
    TAMPINES: [
      { lat: 1.3521, lng: 103.9448 },
      { lat: 1.3483, lng: 103.9385 },
      { lat: 1.3576, lng: 103.9455 }
    ]
  },
  JP: {
    TOKYO: [
      { lat: 35.6595, lng: 139.7005 },
      { lat: 35.6938, lng: 139.7034 },
      { lat: 35.6717, lng: 139.765 }
    ],
    OSAKA: [
      { lat: 34.7025, lng: 135.4959 },
      { lat: 34.6687, lng: 135.5019 },
      { lat: 34.6937, lng: 135.5023 }
    ],
    YOKOHAMA: [
      { lat: 35.4662, lng: 139.6227 },
      { lat: 35.4437, lng: 139.638 },
      { lat: 35.454, lng: 139.6316 }
    ],
    FUKUOKA: [
      { lat: 33.5892, lng: 130.4017 },
      { lat: 33.5931, lng: 130.4205 },
      { lat: 33.5795, lng: 130.3831 }
    ]
  },
  TW: {
    TAIPEI: [
      { lat: 25.033, lng: 121.5654 },
      { lat: 25.0478, lng: 121.5319 },
      { lat: 25.0418, lng: 121.5445 }
    ],
    TAICHUNG: [
      { lat: 24.1477, lng: 120.6736 },
      { lat: 24.1631, lng: 120.6476 },
      { lat: 24.1711, lng: 120.6424 }
    ],
    TAINAN: [
      { lat: 22.9999, lng: 120.227 },
      { lat: 22.9925, lng: 120.2059 },
      { lat: 22.9814, lng: 120.2187 }
    ],
    KAOHSIUNG: [
      { lat: 22.6273, lng: 120.3014 },
      { lat: 22.6871, lng: 120.3087 },
      { lat: 22.6309, lng: 120.3413 }
    ]
  },
  TH: {
    BANGKOK: [
      { lat: 13.7308, lng: 100.5418 },
      { lat: 13.7234, lng: 100.5293 },
      { lat: 13.7466, lng: 100.5347 }
    ],
    CHIANG_MAI: [
      { lat: 18.7883, lng: 98.9853 },
      { lat: 18.7953, lng: 98.9986 },
      { lat: 18.7838, lng: 98.9806 }
    ],
    PHUKET: [
      { lat: 7.8804, lng: 98.3923 },
      { lat: 7.8899, lng: 98.3856 },
      { lat: 7.901, lng: 98.3742 }
    ],
    CHONBURI: [
      { lat: 13.3611, lng: 100.9847 },
      { lat: 13.3404, lng: 100.9713 },
      { lat: 13.1642, lng: 100.9317 }
    ]
  },
  VN: {
    HCMC: [
      { lat: 10.7769, lng: 106.7009 },
      { lat: 10.7869, lng: 106.6991 },
      { lat: 10.7984, lng: 106.6881 }
    ],
    HANOI: [
      { lat: 21.0285, lng: 105.8542 },
      { lat: 21.0323, lng: 105.8484 },
      { lat: 21.0177, lng: 105.8365 }
    ],
    DANANG: [
      { lat: 16.0544, lng: 108.2022 },
      { lat: 16.0678, lng: 108.2208 },
      { lat: 16.0603, lng: 108.2244 }
    ],
    CANTHO: [
      { lat: 10.0452, lng: 105.7469 },
      { lat: 10.0341, lng: 105.7845 },
      { lat: 10.0281, lng: 105.7682 }
    ]
  }
};
function getSeedCoordinates(regionId, subregionId, scope = "subregion") {
  if (regionId === "US" || regionId === "US_TAX_FREE") {
    if (scope === "region" && regionId === "US_TAX_FREE") {
      return TAX_FREE_STATE_CODES.flatMap((code) => US_STATE_COORDINATES[code] || []);
    }
    return US_STATE_COORDINATES[subregionId] || (regionId === "US_TAX_FREE" ? TAX_FREE_STATE_CODES.flatMap((code) => US_STATE_COORDINATES[code] || []) : Object.values(US_STATE_COORDINATES).flat());
  }
  const regionSeeds = REGION_SEEDS[regionId];
  if (!regionSeeds) {
    return [];
  }
  if (scope === "region") {
    return Object.values(regionSeeds).flat();
  }
  if (subregionId && regionSeeds[subregionId]) {
    return regionSeeds[subregionId];
  }
  return Object.values(regionSeeds).flat();
}
__name(getSeedCoordinates, "getSeedCoordinates");

// src/services/rateLimiter.js
var requestQueue = [];
var activeRequests = 0;
var lastRequestTime = 0;
var MAX_CONCURRENT = 2;
var MIN_INTERVAL_MS = 1100;
async function rateLimitedFetch(fetchFn, url, options) {
  return new Promise((resolve, reject) => {
    requestQueue.push({ fetchFn, url, options, resolve, reject });
    processQueue();
  });
}
__name(rateLimitedFetch, "rateLimitedFetch");
async function processQueue() {
  if (activeRequests >= MAX_CONCURRENT || requestQueue.length === 0) return;
  const now = Date.now();
  const elapsed = now - lastRequestTime;
  if (elapsed < MIN_INTERVAL_MS) {
    setTimeout(processQueue, MIN_INTERVAL_MS - elapsed);
    return;
  }
  activeRequests++;
  lastRequestTime = Date.now();
  const { fetchFn, url, options, resolve, reject } = requestQueue.shift();
  try {
    const result = await fetchFn(url, options);
    resolve(result);
  } catch (error) {
    reject(error);
  } finally {
    activeRequests--;
    if (requestQueue.length > 0) {
      setTimeout(processQueue, MIN_INTERVAL_MS);
    }
  }
}
__name(processQueue, "processQueue");

// src/services/formatters.js
function escapeHtml(value) {
  return String(value ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;").replace(/'/g, "&#039;");
}
__name(escapeHtml, "escapeHtml");
function pickFirst(...values) {
  for (const value of values) {
    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }
  }
  return "";
}
__name(pickFirst, "pickFirst");
function joinNonEmpty(parts, separator = ", ") {
  return parts.filter((part) => typeof part === "string" && part.trim()).join(separator);
}
__name(joinNonEmpty, "joinNonEmpty");
function getLocality(address) {
  return pickFirst(
    address.city,
    address.town,
    address.village,
    address.municipality,
    address.city_district,
    address.suburb,
    address.hamlet
  );
}
__name(getLocality, "getLocality");
function getDistrict(address) {
  return pickFirst(
    address.city_district,
    address.suburb,
    address.borough,
    address.quarter,
    address.neighbourhood,
    address.county,
    address.district
  );
}
__name(getDistrict, "getDistrict");
function getRoad(address) {
  return pickFirst(
    address.road,
    address.pedestrian,
    address.footway,
    address.street,
    address.residential,
    address.path
  );
}
__name(getRoad, "getRoad");
function getHouseNumber(address) {
  return pickFirst(address.house_number, address.block, address.building);
}
__name(getHouseNumber, "getHouseNumber");
function formatStreet(address) {
  const house = getHouseNumber(address);
  const road = getRoad(address);
  if (house && road) return `${house} ${road}`;
  return pickFirst(road, house, address.building);
}
__name(formatStreet, "formatStreet");
function formatCoordinates(lat, lng) {
  return `${Number(lat).toFixed(6)}, ${Number(lng).toFixed(6)}`;
}
__name(formatCoordinates, "formatCoordinates");
function stripDiacritics(value) {
  return String(value ?? "").normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
__name(stripDiacritics, "stripDiacritics");
function slugify(value) {
  return stripDiacritics(value).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}
__name(slugify, "slugify");
function getShortLabel(text) {
  return String(text ?? "").split("/")[0].trim();
}
__name(getShortLabel, "getShortLabel");
function maybePostal(value) {
  const text = String(value ?? "").trim();
  return text || "N/A";
}
__name(maybePostal, "maybePostal");

// src/services/address.js
var MAX_RETRIES = 3;
var ATTEMPTS_PER_RETRY = 20;
var VALIDATION_STAGES = ["strict", "relaxed"];
var ADDRESS_GENERATION_TIMEOUT_MS = 15e3;
var REVERSE_GEOCODE_HTTP_RETRIES = 3;
var REVERSE_GEOCODE_RETRY_DELAY_MS = 1200;
var REVERSE_GEOCODE_REQUEST_TIMEOUT_MS = 5e3;
var REGION_ADDRESS_TIMEOUT_MS = {
  US_TAX_FREE: 22e3,
  HK: 32e3
};
var REGION_JITTER = {
  US: 0.085,
  US_TAX_FREE: 0.085,
  HK: 6e-3,
  SG: 6e-3,
  JP: 0.01,
  TW: 8e-3,
  TH: 0.012,
  VN: 0.012
};
var HK_ZONE_KEYWORDS = {
  HKI: [
    "central",
    "central and western",
    "admiralty",
    "sheung wan",
    "wan chai",
    "wan chai district",
    "causeway bay",
    "north point",
    "quarry bay",
    "eastern district",
    "chai wan",
    "aberdeen",
    "southern district",
    "kennedy town",
    "happy valley",
    "mid-levels",
    "pok fu lam",
    "stanley",
    "sai ying pun",
    "shau kei wan",
    "tin hau"
  ],
  KLN: [
    "kowloon",
    "yau tsim mong",
    "yau tsim mong district",
    "tsim sha tsui",
    "jordan",
    "yau ma tei",
    "mong kok",
    "sham shui po",
    "sham shui po district",
    "kowloon city",
    "kowloon city district",
    "hung hom",
    "kwun tong",
    "kwun tong district",
    "wong tai sin",
    "wong tai sin district",
    "san po kong",
    "diamond hill",
    "to kwa wan",
    "kai tak",
    "cheung sha wan",
    "lai chi kok",
    "ngau tau kok",
    "kowloon bay"
  ],
  NT: [
    "new territories",
    "sha tin",
    "sha tin district",
    "tsuen wan",
    "tsuen wan district",
    "tuen mun",
    "tuen mun district",
    "yuen long",
    "yuen long district",
    "tai po",
    "tai po district",
    "sai kung",
    "sai kung district",
    "tseung kwan o",
    "fanling",
    "sheung shui",
    "ma on shan",
    "tin shui wai",
    "kwai chung",
    "kwai tsing",
    "kwai tsing district",
    "tung chung",
    "lantau",
    "islands district"
  ]
};
function resolveStreet(regionId, address, stage) {
  const strictStreet = formatStreet(address);
  if (strictStreet) {
    return strictStreet;
  }
  if (regionId === "HK") {
    return pickFirst(address.building, address.amenity, address.shop, address.office, address.tourism, address.leisure, address.attraction);
  }
  if (stage !== "relaxed") {
    return "";
  }
  if (regionId === "US" || regionId === "US_TAX_FREE") {
    return "";
  }
  return pickFirst(
    address.building,
    address.amenity,
    address.shop,
    address.office,
    address.tourism,
    address.leisure,
    address.attraction
  );
}
__name(resolveStreet, "resolveStreet");
async function generateAddress({ fetchFn, regionId, subregionId }) {
  const regionConfig = getRegionConfig(regionId);
  const startedAt = Date.now();
  const timeoutMs = REGION_ADDRESS_TIMEOUT_MS[regionId] || ADDRESS_GENERATION_TIMEOUT_MS;
  for (const stage of VALIDATION_STAGES) {
    for (let retry = 0; retry < MAX_RETRIES; retry += 1) {
      const scopes = getSeedScopes(regionId, stage, retry);
      for (let attempt = 0; attempt < ATTEMPTS_PER_RETRY; attempt += 1) {
        if (Date.now() - startedAt > timeoutMs) {
          throw new Error(`Timed out while searching for a valid address for ${regionConfig.label}`);
        }
        for (const scope of scopes) {
          const location = getRandomLocation(regionId, subregionId, scope, stage, attempt, retry);
          if (!location) {
            continue;
          }
          try {
            const data = await reverseGeocode(fetchFn, regionConfig, location);
            const normalized = normalizeGeocodeResult({
              regionId,
              regionConfig,
              subregionId,
              data,
              location,
              stage,
              scope
            });
            if (normalized) {
              return normalized;
            }
          } catch (error) {
            if (stage === VALIDATION_STAGES[VALIDATION_STAGES.length - 1] && retry === MAX_RETRIES - 1 && attempt === ATTEMPTS_PER_RETRY - 1 && scope === scopes[scopes.length - 1]) {
              throw error;
            }
          }
        }
      }
    }
  }
  throw new Error(`Unable to find a valid address for ${regionConfig.label}`);
}
__name(generateAddress, "generateAddress");
async function reverseGeocode(fetchFn, regionConfig, location) {
  const url = new URL("https://nominatim.openstreetmap.org/reverse");
  url.searchParams.set("format", "jsonv2");
  url.searchParams.set("lat", String(location.lat));
  url.searchParams.set("lon", String(location.lng));
  url.searchParams.set("zoom", "18");
  url.searchParams.set("addressdetails", "1");
  url.searchParams.set("namedetails", "1");
  const requestTimeoutMs = regionConfig.countryCode === "hk" ? 8e3 : REVERSE_GEOCODE_REQUEST_TIMEOUT_MS;
  for (let attempt = 0; attempt < REVERSE_GEOCODE_HTTP_RETRIES; attempt += 1) {
    const response = await rateLimitedFetch(
      fetchFn,
      url.toString(),
      {
        headers: {
          "User-Agent": "Cascade Multi Region Address Generator",
          "Accept-Language": regionConfig.languageHeader
        },
        cf: {
          cacheEverything: true,
          cacheTtl: 300
        }
      },
      requestTimeoutMs
    );
    if (response.ok) {
      return response.json();
    }
    if (response.status === 429 && attempt < REVERSE_GEOCODE_HTTP_RETRIES - 1) {
      const retryAfterHeader = Number(response.headers.get("Retry-After") || "0");
      const retryAfterMs = retryAfterHeader > 0 ? retryAfterHeader * 1e3 : REVERSE_GEOCODE_RETRY_DELAY_MS * (attempt + 1);
      await wait(retryAfterMs);
      continue;
    }
    throw new Error(`Reverse geocoding failed with ${response.status}`);
  }
  throw new Error("Reverse geocoding failed after retries");
}
__name(reverseGeocode, "reverseGeocode");
function normalizeGeocodeResult({ regionId, regionConfig, subregionId, data, location, stage, scope }) {
  const address = data?.address;
  if (!address) {
    return null;
  }
  if ((address.country_code || "").toLowerCase() !== regionConfig.countryCode) {
    return null;
  }
  if (!matchesSelectedSubregion({ regionId, subregionId, address, data, scope })) {
    return null;
  }
  if (!isValidAddress(regionId, address, stage)) {
    return null;
  }
  const street = resolveStreet(regionId, address, stage) || (regionId === "HK" ? pickFirst(data?.name, data?.namedetails?.name) : "");
  const locality = resolveLocality(regionId, address);
  const district = resolveDistrict(regionId, address);
  const admin = resolveAdmin(regionId, address, subregionId);
  const postalCode = resolvePostalCode(regionId, address);
  const country = resolveCountry(regionConfig, address);
  const subregionLabel = getSubregionLabel(regionId, subregionId);
  const fullAddress = formatAddressByRegion(regionId, {
    street,
    locality,
    district,
    admin,
    postalCode,
    country,
    subregionLabel,
    subregionId
  });
  if (!fullAddress) {
    return null;
  }
  const mapQuery = fullAddress;
  const resolvedLat = Number(data.lat || location.lat);
  const resolvedLng = Number(data.lon || location.lng);
  const coordinates = formatCoordinates(resolvedLat, resolvedLng);
  return {
    regionId,
    subregionId,
    street: street || "N/A",
    city: locality || district || subregionLabel || "N/A",
    district: district || "N/A",
    admin: admin || subregionLabel || "N/A",
    postalCode,
    country,
    fullAddress,
    rawDisplayName: data.display_name || fullAddress,
    coordinates,
    lat: resolvedLat,
    lng: resolvedLng,
    mapEmbedUrl: `https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&output=embed`,
    mapExternalUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`,
    sourceLabel: "OpenStreetMap reverse geocoding"
  };
}
__name(normalizeGeocodeResult, "normalizeGeocodeResult");
function getRandomLocation(regionId, subregionId, scope = "subregion", stage = "strict", attempt = 0, retry = 0) {
  const seeds = getSeedCoordinates(regionId, subregionId, scope);
  if (!seeds.length) {
    return null;
  }
  const seedIndex = shouldCycleSeeds(regionId) ? (retry * ATTEMPTS_PER_RETRY + attempt) % seeds.length : Math.floor(Math.random() * seeds.length);
  const seed = seeds[seedIndex];
  if (regionId === "HK" && scope === "subregion" && stage === "strict" && attempt < seeds.length) {
    return {
      lat: seed.lat,
      lng: seed.lng
    };
  }
  const jitter = getJitter(regionId, scope, stage);
  return {
    lat: seed.lat + (Math.random() - 0.5) * jitter,
    lng: seed.lng + (Math.random() - 0.5) * jitter
  };
}
__name(getRandomLocation, "getRandomLocation");
function shouldCycleSeeds(regionId) {
  return regionId === "US_TAX_FREE" || regionId === "HK";
}
__name(shouldCycleSeeds, "shouldCycleSeeds");
function getSeedScopes(regionId, stage, retry) {
  if (regionId === "US_TAX_FREE") {
    return ["subregion"];
  }
  if (regionId === "HK" && stage === "relaxed" && retry === MAX_RETRIES - 1) {
    return ["subregion", "region"];
  }
  return ["subregion"];
}
__name(getSeedScopes, "getSeedScopes");
function getJitter(regionId, scope, stage) {
  if (regionId === "US_TAX_FREE") {
    if (scope === "region") return 0.035;
    return stage === "strict" ? 0.055 : 0.075;
  }
  if (regionId === "HK") {
    if (scope === "region") return 18e-4;
    return stage === "strict" ? 12e-4 : 24e-4;
  }
  return REGION_JITTER[regionId] ?? 0.01;
}
__name(getJitter, "getJitter");
function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
__name(wait, "wait");
function isValidAddress(regionId, address, stage) {
  const street = resolveStreet(regionId, address, stage);
  const locality = resolveLocality(regionId, address);
  const district = resolveDistrict(regionId, address);
  const admin = resolveAdmin(regionId, address);
  const postal = resolvePostalCode(regionId, address);
  const relaxed = stage === "relaxed";
  if (regionId === "US") {
    return Boolean(street && locality && admin && postal !== "N/A");
  }
  if (regionId === "US_TAX_FREE") {
    const hasNumberedStreet = Boolean(address.house_number && pickFirst(address.road, address.street, address.residential, address.pedestrian, address.footway));
    return relaxed ? Boolean((street || hasNumberedStreet) && (locality || district) && admin) : Boolean(hasNumberedStreet && locality && admin);
  }
  if (regionId === "HK") {
    return relaxed ? Boolean(street && (district || locality || admin)) : Boolean((street || pickFirst(address.building, address.amenity, address.shop)) && (district || locality || admin));
  }
  if (regionId === "SG") {
    return relaxed ? Boolean(street && (locality || district) && postal !== "N/A") : Boolean(street && locality && postal !== "N/A");
  }
  if (regionId === "JP") {
    return relaxed ? Boolean(admin && (locality || district) && street) : Boolean(admin && locality && (street || district) && postal !== "N/A");
  }
  if (regionId === "TW") {
    return relaxed ? Boolean(admin && (district || locality) && street) : Boolean(admin && district && street);
  }
  if (regionId === "TH") {
    return relaxed ? Boolean(admin && (district || locality) && street) : Boolean(admin && district && street && postal !== "N/A");
  }
  if (regionId === "VN") {
    return relaxed ? Boolean(admin && (district || locality) && street) : Boolean(admin && district && street);
  }
  return false;
}
__name(isValidAddress, "isValidAddress");
function resolveLocality(regionId, address) {
  if (regionId === "HK") {
    return pickFirst(address.suburb, address.city_district, address.neighbourhood, address.town, address.city);
  }
  if (regionId === "JP") {
    return pickFirst(address.city, address.town, address.village, address.county, address.city_district);
  }
  return getLocality(address);
}
__name(resolveLocality, "resolveLocality");
function resolveDistrict(regionId, address) {
  if (regionId === "HK") {
    return pickFirst(address.city_district, address.suburb, address.borough, address.neighbourhood, address.state_district);
  }
  if (regionId === "SG") {
    return pickFirst(address.suburb, address.city_district, address.neighbourhood, address.quarter);
  }
  if (regionId === "JP") {
    return pickFirst(address.city_district, address.suburb, address.quarter, address.neighbourhood);
  }
  if (regionId === "TW") {
    return pickFirst(address.city_district, address.town, address.suburb, address.district);
  }
  if (regionId === "TH") {
    return pickFirst(address.county, address.city_district, address.suburb, address.borough);
  }
  if (regionId === "VN") {
    return pickFirst(address.city_district, address.suburb, address.quarter, address.county);
  }
  return getDistrict(address);
}
__name(resolveDistrict, "resolveDistrict");
function resolveAdmin(regionId, address, subregionId = "") {
  if (regionId === "US" || regionId === "US_TAX_FREE") {
    return US_STATE_MAP.get(subregionId)?.full || pickFirst(address.state, address.region);
  }
  if (regionId === "HK") {
    return getShortLabel(getSubregionLabel(regionId, subregionId)) || "Hong Kong";
  }
  if (regionId === "SG") {
    return pickFirst(address.city, address.state_district, getShortLabel(getSubregionLabel(regionId, subregionId)), "Singapore");
  }
  if (regionId === "JP") {
    return pickFirst(address.state, address.province, address.region);
  }
  if (regionId === "TW") {
    return pickFirst(address.state, address.city, address.county);
  }
  if (regionId === "TH") {
    return pickFirst(address.state, address.province, address.region);
  }
  if (regionId === "VN") {
    return pickFirst(address.state, address.city, address.province);
  }
  return pickFirst(address.state, address.region);
}
__name(resolveAdmin, "resolveAdmin");
function resolvePostalCode(regionId, address) {
  if (regionId === "HK") {
    return "N/A";
  }
  return maybePostal(address.postcode);
}
__name(resolvePostalCode, "resolvePostalCode");
function resolveCountry(regionConfig, address) {
  return pickFirst(address.country, regionConfig.label);
}
__name(resolveCountry, "resolveCountry");
function getSubregionLabel(regionId, subregionId) {
  const option = getSubregionOptions(regionId).find((item) => item.id === subregionId);
  return option?.label || subregionId || "";
}
__name(getSubregionLabel, "getSubregionLabel");
function matchesSelectedSubregion({ regionId, subregionId, address, data, scope }) {
  if (!subregionId) {
    return true;
  }
  if (regionId === "US_TAX_FREE") {
    const expectedState = (US_STATE_MAP.get(subregionId)?.full || "").toLowerCase();
    const actualText = [address.state, address.region, data?.display_name].filter(Boolean).join(" ").toLowerCase();
    return Boolean(expectedState && actualText.includes(expectedState));
  }
  if (regionId === "HK") {
    if (scope !== "region") {
      return true;
    }
    const haystack = [
      data?.display_name,
      address.city_district,
      address.suburb,
      address.borough,
      address.neighbourhood,
      address.town,
      address.village,
      address.county,
      address.state_district,
      address.state,
      address.quarter,
      address.road,
      address.amenity,
      address.building
    ].filter(Boolean).join(" ").toLowerCase();
    return (HK_ZONE_KEYWORDS[subregionId] || []).some((keyword) => haystack.includes(keyword));
  }
  return true;
}
__name(matchesSelectedSubregion, "matchesSelectedSubregion");
function formatAddressByRegion(regionId, { street, locality, district, admin, postalCode, country, subregionLabel, subregionId }) {
  if (regionId === "US" || regionId === "US_TAX_FREE") {
    const stateCode = US_STATE_MAP.get(subregionId)?.abbr || US_STATE_MAP.get(admin)?.abbr || "";
    const stateLine = postalCode !== "N/A" ? `${stateCode || admin} ${postalCode}` : `${stateCode || admin}`;
    return joinNonEmpty([
      street,
      joinNonEmpty([locality || district, stateLine], ", "),
      country
    ]);
  }
  if (regionId === "HK") {
    return joinNonEmpty([street, district || locality, admin || subregionLabel, country]);
  }
  if (regionId === "SG") {
    return joinNonEmpty([street, district || locality, `${country} ${postalCode !== "N/A" ? postalCode : ""}`.trim()]);
  }
  if (regionId === "JP") {
    return joinNonEmpty([postalCode !== "N/A" ? `\u3012${postalCode}` : "", admin, locality, district, street, country], " ");
  }
  if (regionId === "TW") {
    return joinNonEmpty([postalCode !== "N/A" ? postalCode : "", admin, district, street, country], " ");
  }
  if (regionId === "TH") {
    return joinNonEmpty([street, district, admin, postalCode !== "N/A" ? postalCode : "", country], " ");
  }
  if (regionId === "VN") {
    return joinNonEmpty([street, district, locality, admin, postalCode !== "N/A" ? postalCode : "", country], ", ");
  }
  return joinNonEmpty([street, locality, admin, postalCode !== "N/A" ? postalCode : "", country]);
}
__name(formatAddressByRegion, "formatAddressByRegion");

// src/services/email.js
function buildEmailEntry(profile, regionConfig) {
  const baseName = slugify(profile.fullNameLatin || profile.fullNameNative || "address-user") || "address-user";
  const nonce = Math.floor(100 + Math.random() * 900);
  const alias = `${baseName}.${nonce}@instant-inbox.test`;
  return {
    address: alias,
    copyValue: alias,
    actionUrl: "https://mail.tm/en/",
    actionText: "Open disposable inbox",
    helperText: `Suggested alias for ${regionConfig.label} sign-up testing. Open the external inbox provider to create a live receiving address.`
  };
}
__name(buildEmailEntry, "buildEmailEntry");

// src/services/profile.js
var US_NAMES = [
  { given: "Seth", family: "Kling", gender: "Male" },
  { given: "Avery", family: "Monroe", gender: "Female" },
  { given: "Jordan", family: "Parker", gender: "Male" },
  { given: "Natalie", family: "Brooks", gender: "Female" },
  { given: "Miles", family: "Bennett", gender: "Male" },
  { given: "Claire", family: "Dawson", gender: "Female" }
];
var HK_NAMES = [
  { nativeFamily: "\u9673", nativeGiven: "\u5609\u6B23", latinGiven: "Carmen", latinFamily: "Chan", gender: "Female" },
  { nativeFamily: "\u9EC3", nativeGiven: "\u5B50\u8ED2", latinGiven: "Ryan", latinFamily: "Wong", gender: "Male" },
  { nativeFamily: "\u674E", nativeGiven: "\u8A60\u6069", latinGiven: "Eunice", latinFamily: "Lee", gender: "Female" },
  { nativeFamily: "\u6797", nativeGiven: "\u4FCA\u7199", latinGiven: "Jason", latinFamily: "Lam", gender: "Male" }
];
var SG_NAMES = [
  { nativeFamily: "\u9648", nativeGiven: "\u82B7\u6674", latinGiven: "Ashley", latinFamily: "Tan", gender: "Female" },
  { nativeFamily: "\u6797", nativeGiven: "\u4F1F\u6770", latinGiven: "Ethan", latinFamily: "Lim", gender: "Male" },
  { nativeFamily: "\u738B", nativeGiven: "\u6B23\u6021", latinGiven: "Chloe", latinFamily: "Ong", gender: "Female" },
  { nativeFamily: "\u8BB8", nativeGiven: "\u4FCA\u8C6A", latinGiven: "Marcus", latinFamily: "Goh", gender: "Male" }
];
var JP_NAMES = [
  { nativeFamily: "\u4F50\u85E4", nativeGiven: "\u7F8E\u54B2", latinGiven: "Misaki", latinFamily: "Sato", gender: "Female" },
  { nativeFamily: "\u9AD8\u6A4B", nativeGiven: "\u84EE", latinGiven: "Ren", latinFamily: "Takahashi", gender: "Male" },
  { nativeFamily: "\u5C71\u7530", nativeGiven: "\u967D\u83DC", latinGiven: "Hina", latinFamily: "Yamada", gender: "Female" },
  { nativeFamily: "\u4F0A\u85E4", nativeGiven: "\u5927\u7FD4", latinGiven: "Haruto", latinFamily: "Ito", gender: "Male" }
];
var TW_NAMES = [
  { nativeFamily: "\u6797", nativeGiven: "\u8A9E\u5F64", latinGiven: "Yu-Tung", latinFamily: "Lin", gender: "Female" },
  { nativeFamily: "\u9673", nativeGiven: "\u51A0\u5EF7", latinGiven: "Kuan-Ting", latinFamily: "Chen", gender: "Male" },
  { nativeFamily: "\u5F35", nativeGiven: "\u5BA5\u6674", latinGiven: "Yu-Ching", latinFamily: "Chang", gender: "Female" },
  { nativeFamily: "\u738B", nativeGiven: "\u67CF\u7FF0", latinGiven: "Po-Han", latinFamily: "Wang", gender: "Male" }
];
var TH_NAMES = [
  { nativeFamily: "\u0E0A\u0E31\u0E22\u0E27\u0E31\u0E12\u0E19\u0E4C", nativeGiven: "\u0E19\u0E23\u0E34\u0E19\u0E17\u0E23\u0E4C", latinGiven: "Narin", latinFamily: "Chaiwat", gender: "Male" },
  { nativeFamily: "\u0E28\u0E23\u0E35\u0E2A\u0E38\u0E02", nativeGiven: "\u0E1E\u0E34\u0E21\u0E1E\u0E4C\u0E0A\u0E19\u0E01", latinGiven: "Pimchanok", latinFamily: "Srisuk", gender: "Female" },
  { nativeFamily: "\u0E1A\u0E38\u0E0D\u0E21\u0E35", nativeGiven: "\u0E18\u0E35\u0E23\u0E20\u0E31\u0E17\u0E23", latinGiven: "Teerapat", latinFamily: "Boonmee", gender: "Male" },
  { nativeFamily: "\u0E2D\u0E34\u0E19\u0E17\u0E23\u0E4C\u0E41\u0E01\u0E49\u0E27", nativeGiven: "\u0E01\u0E21\u0E25\u0E0A\u0E19\u0E01", latinGiven: "Kamonchanok", latinFamily: "Intakaew", gender: "Female" }
];
var VN_NAMES = [
  { nativeFamily: "Nguy\u1EC5n", nativeGiven: "Minh Anh", latinGiven: "Minh Anh", latinFamily: "Nguyen", gender: "Female" },
  { nativeFamily: "Tr\u1EA7n", nativeGiven: "Qu\u1ED1c B\u1EA3o", latinGiven: "Quoc Bao", latinFamily: "Tran", gender: "Male" },
  { nativeFamily: "L\xEA", nativeGiven: "Kh\xE1nh Linh", latinGiven: "Khanh Linh", latinFamily: "Le", gender: "Female" },
  { nativeFamily: "Ph\u1EA1m", nativeGiven: "Gia Huy", latinGiven: "Gia Huy", latinFamily: "Pham", gender: "Male" }
];
var NAME_BUCKET_MAP = /* @__PURE__ */ new Map([
  ["US", US_NAMES],
  ["US_TAX_FREE", US_NAMES],
  ["HK", HK_NAMES],
  ["SG", SG_NAMES],
  ["JP", JP_NAMES],
  ["TW", TW_NAMES],
  ["TH", TH_NAMES],
  ["VN", VN_NAMES]
]);
var US_AREA_CODES = {
  AL: ["205", "251", "256", "334", "938"],
  AK: ["907"],
  AZ: ["480", "520", "602", "623", "928"],
  AR: ["479", "501", "870"],
  CA: ["209", "213", "310", "323", "408", "415", "424", "510", "530", "559", "562", "619", "626", "650", "661", "707", "714", "760", "805", "818", "831", "858", "909", "916", "925", "949"],
  CO: ["303", "719", "720", "970"],
  CT: ["203", "475", "860", "959"],
  DE: ["302"],
  FL: ["239", "305", "321", "352", "386", "407", "561", "727", "754", "772", "786", "813", "850", "863", "904", "941", "954"],
  GA: ["229", "404", "470", "478", "678", "706", "762", "770", "912"],
  HI: ["808"],
  ID: ["208", "986"],
  IL: ["217", "224", "309", "312", "331", "618", "630", "708", "773", "779", "815", "847", "872"],
  IN: ["219", "260", "317", "463", "574", "765", "812", "930"],
  IA: ["319", "515", "563", "641", "712"],
  KS: ["316", "620", "785", "913"],
  KY: ["270", "364", "502", "606", "859"],
  LA: ["225", "318", "337", "504", "985"],
  ME: ["207"],
  MD: ["240", "301", "410", "443", "667"],
  MA: ["339", "351", "413", "508", "617", "774", "781", "857", "978"],
  MI: ["231", "248", "269", "313", "517", "586", "616", "734", "810", "906", "947", "989"],
  MN: ["218", "320", "507", "612", "651", "763", "952"],
  MS: ["228", "601", "662", "769"],
  MO: ["314", "417", "573", "636", "660", "816", "975"],
  MT: ["406"],
  NE: ["308", "402", "531"],
  NV: ["702", "725", "775"],
  NH: ["603"],
  NJ: ["201", "551", "609", "732", "848", "856", "862", "908", "973"],
  NM: ["505", "575"],
  NY: ["212", "315", "332", "347", "516", "518", "585", "607", "631", "646", "680", "716", "718", "838", "845", "914", "917", "929", "934"],
  NC: ["252", "336", "704", "743", "828", "910", "919", "980", "984"],
  ND: ["701"],
  OH: ["216", "234", "283", "330", "380", "419", "440", "513", "567", "614", "740", "937"],
  OK: ["405", "539", "580", "918"],
  OR: ["458", "503", "541", "971"],
  PA: ["215", "267", "272", "412", "484", "570", "610", "717", "724", "814", "835", "878"],
  RI: ["401"],
  SC: ["803", "839", "843", "854", "864"],
  SD: ["605"],
  TN: ["423", "615", "629", "731", "865", "901", "931"],
  TX: ["210", "214", "254", "281", "325", "346", "409", "430", "432", "469", "512", "682", "713", "737", "806", "817", "830", "832", "903", "915", "936", "940", "956", "972", "979"],
  UT: ["385", "435", "801"],
  VT: ["802"],
  VA: ["276", "434", "540", "571", "703", "757", "804"],
  WA: ["206", "253", "360", "425", "509"],
  WV: ["304", "681"],
  WI: ["262", "414", "534", "608", "715", "920"],
  WY: ["307"]
};
var REGION_PHONE_RULES = {
  HK: {
    prefixes: {
      HKI: ["5", "6", "9"],
      KLN: ["5", "6", "9"],
      NT: ["5", "6", "9"]
    },
    build(prefix) {
      return `+852 ${prefix}${randomDigits(3)} ${randomDigits(4)}`;
    }
  },
  SG: {
    prefixes: {
      CENTRAL: ["8", "9"],
      QUEENSTOWN: ["8", "9"],
      JURONG_EAST: ["8", "9"],
      TAMPINES: ["8", "9"]
    },
    build(prefix) {
      return `+65 ${prefix}${randomDigits(3)} ${randomDigits(4)}`;
    }
  },
  JP: {
    prefixes: {
      TOKYO: ["3"],
      OSAKA: ["6"],
      YOKOHAMA: ["45"],
      FUKUOKA: ["92"]
    },
    build(prefix) {
      return prefix.length === 1 ? `+81 ${prefix}-${randomDigits(4)}-${randomDigits(4)}` : `+81 ${prefix}-${randomDigits(3)}-${randomDigits(4)}`;
    }
  },
  TW: {
    prefixes: {
      TAIPEI: ["2"],
      TAICHUNG: ["4"],
      TAINAN: ["6"],
      KAOHSIUNG: ["7"]
    },
    build(prefix) {
      return `+886 ${prefix} ${randomDigits(4)} ${randomDigits(4)}`;
    }
  },
  TH: {
    prefixes: {
      BANGKOK: ["2"],
      CHIANG_MAI: ["53"],
      PHUKET: ["76"],
      CHONBURI: ["38"]
    },
    build(prefix) {
      return prefix.length === 1 ? `+66 ${prefix} ${randomDigits(3)} ${randomDigits(4)}` : `+66 ${prefix} ${randomDigits(3)} ${randomDigits(3)}`;
    }
  },
  VN: {
    prefixes: {
      HCMC: ["28"],
      HANOI: ["24"],
      DANANG: ["236"],
      CANTHO: ["292"]
    },
    build(prefix) {
      return prefix.length === 2 ? `+84 ${prefix} ${randomDigits(4)} ${randomDigits(4)}` : `+84 ${prefix} ${randomDigits(3)} ${randomDigits(4)}`;
    }
  }
};
function buildProfile({ regionId, subregionId }) {
  const regionConfig = REGION_MAP.get(regionId);
  const person = pickPerson(regionId);
  const phoneDetails = buildPhone(regionId, subregionId);
  return {
    regionId,
    regionLabel: regionConfig?.label || regionId,
    familyNameNative: person.nativeFamily || person.family || person.latinFamily,
    givenNameNative: person.nativeGiven || person.given || person.latinGiven,
    familyNameLatin: person.latinFamily || person.family || stripDiacritics(person.nativeFamily || ""),
    givenNameLatin: person.latinGiven || person.given || stripDiacritics(person.nativeGiven || ""),
    fullNameNative: buildFullName(regionId, person, true),
    fullNameLatin: buildFullName(regionId, person, false),
    gender: person.gender,
    phone: phoneDetails.phone,
    phonePrefix: phoneDetails.prefix,
    phoneExplanation: phoneDetails.explanation,
    phoneCopyValue: phoneDetails.phone
  };
}
__name(buildProfile, "buildProfile");
function pickPerson(regionId) {
  const bucket = NAME_BUCKET_MAP.get(regionId) || VN_NAMES;
  return bucket[Math.floor(Math.random() * bucket.length)];
}
__name(pickPerson, "pickPerson");
function buildFullName(regionId, person, native) {
  if (regionId === "US" || regionId === "US_TAX_FREE") {
    return `${person.given} ${person.family}`;
  }
  if (native) {
    return `${person.nativeFamily}${regionId === "JP" || regionId === "HK" || regionId === "TW" || regionId === "SG" ? "" : " "}${person.nativeGiven}`.trim();
  }
  return `${person.latinGiven} ${person.latinFamily}`.trim();
}
__name(buildFullName, "buildFullName");
function buildPhone(regionId, subregionId) {
  if (regionId === "US" || regionId === "US_TAX_FREE") {
    const prefixes2 = US_AREA_CODES[subregionId] || ["202"];
    const prefix2 = pick(prefixes2);
    const stateName = US_STATE_MAP.get(subregionId)?.full || subregionId;
    const exchange = String(Math.floor(200 + Math.random() * 700)).padStart(3, "0");
    const line = randomDigits(4);
    const phone2 = `+1 (${prefix2}) ${exchange}-${line}`;
    return {
      prefix: prefix2,
      phone: phone2,
      explanation: `Do the phone numbers match the region? Yes. We choose prefixes from ${stateName} so phone numbers look authentic in sign-up forms.`
    };
  }
  const rule = REGION_PHONE_RULES[regionId];
  const prefixes = rule.prefixes[subregionId] || Object.values(rule.prefixes).flat();
  const prefix = pick(prefixes);
  const areaLabel = getSubregionOptions(regionId).find((option) => option.id === subregionId)?.label?.split("/")[0]?.trim() || subregionId;
  const phone = rule.build(prefix);
  return {
    prefix,
    phone,
    explanation: `Do the phone numbers match the region? Yes. We choose prefixes from ${areaLabel} so phone numbers look authentic in sign-up forms.`
  };
}
__name(buildPhone, "buildPhone");
function pick(values) {
  return values[Math.floor(Math.random() * values.length)];
}
__name(pick, "pick");
function randomDigits(length) {
  return Array.from({ length }, () => Math.floor(Math.random() * 10)).join("");
}
__name(randomDigits, "randomDigits");

// src/services/tempInbox.js
var MAIL_TM_API = "https://api.mail.tm";
async function createTempInbox(fetchFn, hint = "address-user") {
  const domain = await getActiveDomain(fetchFn);
  let lastError = null;
  for (let attempt = 0; attempt < 4; attempt += 1) {
    const localPart = `${slugify(hint) || "address-user"}-${randomToken(6)}${attempt ? `-${attempt}` : ""}`;
    const address = `${localPart}@${domain}`;
    const password = `${randomToken(10)}!Aa9`;
    try {
      await request(fetchFn, "/accounts", {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({ address, password })
      });
      const tokenResponse = await request(fetchFn, "/token", {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({ address, password })
      });
      return {
        provider: "mail.tm",
        providerUrl: "https://mail.tm",
        attributionUrl: "https://mail.tm",
        address,
        password,
        token: tokenResponse.token,
        createdAt: (/* @__PURE__ */ new Date()).toISOString()
      };
    } catch (error) {
      lastError = error;
      if (!String(error.message || error).toLowerCase().includes("address")) {
        break;
      }
    }
  }
  throw lastError || new Error("Unable to create disposable inbox");
}
__name(createTempInbox, "createTempInbox");
async function listTempInboxMessages(fetchFn, token) {
  const data = await request(fetchFn, "/messages", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  const messages = data["hydra:member"] || [];
  return messages.map((message) => ({
    id: message.id,
    from: message.from?.address || message.from?.name || "Unknown sender",
    subject: message.subject || "(No subject)",
    intro: message.intro || "",
    seen: Boolean(message.seen),
    hasAttachments: Boolean(message.hasAttachments),
    createdAt: message.createdAt || ""
  }));
}
__name(listTempInboxMessages, "listTempInboxMessages");
async function getTempInboxMessage(fetchFn, token, messageId) {
  const message = await request(fetchFn, `/messages/${messageId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  const textBody = Array.isArray(message.text) ? message.text.join("\n\n") : Array.isArray(message.html) ? message.html.join("\n\n") : message.text || message.html || message.intro || "";
  return {
    id: message.id,
    from: message.from?.address || message.from?.name || "Unknown sender",
    to: Array.isArray(message.to) ? message.to.map((item) => item.address).join(", ") : "",
    subject: message.subject || "(No subject)",
    intro: message.intro || "",
    createdAt: message.createdAt || "",
    body: textBody,
    hasAttachments: Boolean(message.hasAttachments)
  };
}
__name(getTempInboxMessage, "getTempInboxMessage");
async function getActiveDomain(fetchFn) {
  const data = await request(fetchFn, "/domains");
  const domains = data["hydra:member"] || [];
  const domain = domains.find((item) => item.isActive && !item.isPrivate)?.domain || domains.find((item) => item.isActive)?.domain;
  if (!domain) {
    throw new Error("No active mail.tm domain available");
  }
  return domain;
}
__name(getActiveDomain, "getActiveDomain");
async function request(fetchFn, path, init = {}) {
  const response = await rateLimitedFetch(fetchFn, `${MAIL_TM_API}${path}`, init);
  const text = await response.text();
  const data = text ? tryParseJson(text) : {};
  if (!response.ok) {
    const errorMessage = data?.detail || data?.message || `mail.tm request failed with ${response.status}`;
    throw new Error(errorMessage);
  }
  return data;
}
__name(request, "request");
function tryParseJson(value) {
  try {
    return JSON.parse(value);
  } catch {
    return {};
  }
}
__name(tryParseJson, "tryParseJson");
function randomToken(length) {
  const alphabet = "abcdefghijklmnopqrstuvwxyz0123456789";
  return Array.from({ length }, () => alphabet[Math.floor(Math.random() * alphabet.length)]).join("");
}
__name(randomToken, "randomToken");

// src/ui/template.js
function renderApp({ regionConfig, regionId, subregionId, address, profile, emailEntry }) {
  const regionOptions = getRegionOptions();
  const subregionOptions = getSubregionOptions(regionId);
  const safePayload = serializeForScript({
    regionId,
    subregionId,
    regionConfigs: regionOptions.map((option) => ({
      id: option.id,
      label: option.label,
      nativeLabel: option.nativeLabel,
      subregionLabel: option.subregionLabel,
      subregionLabelNative: option.subregionLabelNative
    })),
    subregionOptionsByRegion: Object.fromEntries(regionOptions.map((option) => [option.id, getSubregionOptions(option.id)])),
    address,
    profile,
    emailEntry,
    regionLabel: regionConfig.label
  });
  const infoRows = [
    { label: "\u59D3 / Family", value: profile.familyNameNative, secondary: profile.familyNameLatin, span: "compact" },
    { label: "\u540D / Given", value: profile.givenNameNative, secondary: profile.givenNameLatin, span: "compact" },
    { label: "\u672C\u5730\u59D3\u540D / Native", value: profile.fullNameNative, secondary: null, span: "compact" },
    { label: "Latin / Romanized", value: profile.fullNameLatin, secondary: null, span: "compact" },
    { label: "\u6027\u522B / Gender", value: profile.gender, secondary: null, span: "compact" },
    { label: "\u7535\u8BDD / Phone", value: profile.phone, secondary: `Prefix ${profile.phonePrefix}`, span: "compact" },
    { label: "\u7535\u5B50\u90AE\u4EF6 / Email", value: emailEntry.address, secondary: emailEntry.helperText, span: "wide" },
    { label: "\u8857\u9053 / Street", value: address.street, secondary: null, span: "wide" },
    { label: "\u57CE\u5E02 / City", value: address.city, secondary: address.district !== "N/A" ? address.district : null, span: "compact" },
    { label: `${regionConfig.adminLabelNative} / ${regionConfig.adminLabel}`, value: address.admin, secondary: null, span: "compact" },
    { label: `${regionConfig.postalLabelNative} / ${regionConfig.postalLabel}`, value: address.postalCode, secondary: null, span: "compact" },
    { label: "\u56FD\u5BB6 / Region", value: `${regionConfig.nativeLabel} / ${regionConfig.label}`, secondary: null, span: "compact" },
    { label: "\u5B8C\u6574\u5730\u5740 / Full", value: address.fullAddress, secondary: null, span: "full" },
    { label: "\u7ECF\u7EAC\u5EA6 / Coordinates", value: address.coordinates, secondary: address.sourceLabel, span: "full" }
  ];
  return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Multi-Region Address Generator</title>
      <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23ff8a1f'/%3E%3Cstop offset='100%25' style='stop-color:%23ff6a00'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cpath fill='url(%23g)' d='M16 2C10.5 2 6 6.5 6 12c0 7.5 10 18 10 18s10-10.5 10-18c0-5.5-4.5-10-10-10zm0 13.5c-1.9 0-3.5-1.6-3.5-3.5s1.6-3.5 3.5-3.5 3.5 1.6 3.5 3.5-1.6 3.5-3.5 3.5z'/%3E%3C/svg%3E" />
      <style>${getStyles()}</style>
    </head>
    <body>
      <div class="loading-overlay" id="loadingOverlay">
        <div class="loading-spinner"></div>
        <div class="loading-text">\u6B63\u5728\u751F\u6210\u5730\u5740 / Generating address...</div>
      </div>
      <div class="ambient ambient-left"></div>
      <div class="ambient ambient-right"></div>
      <main class="app-shell">
        <section class="hero-card">
          <div class="hero-copy">
            <span class="eyebrow">Cascade Geo Identity Lab</span>
            <h1>\u771F\u5B9E\u591A\u5730\u533A\u5730\u5740\u751F\u6210\u5668</h1>
            <p>Generate real geocodable addresses with region-matched identity details, phone prefixes, map preview, disposable inbox, and one-click local save.</p>
          </div>
          <div class="hero-actions">
            <button class="ghost-btn" onclick="shareResult()">\u5206\u4EAB / Share</button>
            <button class="primary-btn" onclick="showSaveDialog()">\u4FDD\u5B58 / Save</button>
          </div>
        </section>

        <section class="layout-grid">
          <div class="result-panel">
            <form id="generatorForm" class="toolbar" method="GET" action="/">
              <div class="toolbar-group">
                <label for="region">\u5730\u533A / Region</label>
                <select id="region" name="region" autocomplete="off">
                  ${regionOptions.map((option) => `<option value="${option.id}" ${option.id === regionId ? "selected" : ""}>${escapeHtml(option.nativeLabel)} / ${escapeHtml(option.label)}</option>`).join("")}
                </select>
              </div>
              <div class="toolbar-group">
                <label id="subregionLabel" for="subregion">${escapeHtml(regionConfig.subregionLabelNative)} / ${escapeHtml(regionConfig.subregionLabel)}</label>
                <select id="subregion" name="subregion" autocomplete="off">
                  ${subregionOptions.map((option) => `<option value="${option.id}" ${option.id === subregionId ? "selected" : ""}>${escapeHtml(option.label)}</option>`).join("")}
                </select>
              </div>
              <div class="toolbar-actions">
                <button type="submit" class="primary-btn">\u751F\u6210\u65B0\u5730\u5740 / Generate</button>
                <button type="submit" class="ghost-btn" name="refresh" value="1">\u5237\u65B0\u540C\u5730\u533A / Refresh</button>
                <a class="link-btn" href="${escapeHtml(address.mapExternalUrl)}" target="_blank" rel="noreferrer">\u6253\u5F00\u5730\u56FE / Open Map</a>
              </div>
            </form>

            <div class="results-card">
              <div class="card-heading">
                <div>
                  <span class="section-kicker">\u751F\u6210\u7ED3\u679C / Generated Result</span>
                  <h2>${escapeHtml(regionConfig.nativeLabel)} / ${escapeHtml(regionConfig.label)}</h2>
                </div>
                <div class="card-heading-actions">
                  <button type="submit" form="generatorForm" class="ghost-btn small" name="refresh" value="1">\u5237\u65B0 / Refresh</button>
                  <span class="status-pill">Live geocode</span>
                </div>
              </div>

              <div class="notice-row">
                <div class="phone-note">
                  <span class="phone-note-title">Phone prefix check</span>
                  <p>${escapeHtml(profile.phoneExplanation)}</p>
                </div>
              </div>

              <div class="info-grid">
                ${infoRows.map(renderInfoRow).join("")}
              </div>
            </div>

            <div class="map-card">
              <div class="card-heading compact">
                <div>
                  <span class="section-kicker">\u5730\u7406\u4F4D\u7F6E / Map</span>
                  <h3>Location preview</h3>
                </div>
                <span class="map-hint">Google Maps embed</span>
              </div>
              <div class="map-container">
                <div id="map-loading" class="map-loading">\u5730\u56FE\u52A0\u8F7D\u4E2D / Loading map...</div>
                <iframe
                  class="map-frame"
                  src="${escapeHtml(address.mapEmbedUrl)}"
                  onload="if(typeof handleMapLoad==='function')handleMapLoad()"
                  onerror="if(typeof handleMapError==='function')handleMapError()"
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>

          <aside class="side-panel">
            <div class="inbox-card">
              <div class="card-heading compact">
                <div>
                  <span class="section-kicker">\u4E34\u65F6\u6536\u4EF6\u7BB1 / Live Inbox</span>
                  <h3>Disposable mailbox</h3>
                </div>
                <button class="ghost-btn small" onclick="refreshInboxMessages()">\u5237\u65B0 / Refresh</button>
              </div>
              <div class="inbox-meta" id="inboxMeta"></div>
              <div class="inbox-actions" id="inboxActions"></div>
              <div class="inbox-list" id="inboxList"></div>
              <div class="inbox-detail" id="inboxDetail"></div>
              <div class="inbox-attribution">Inbox provider: <a href="https://mail.tm" target="_blank" rel="noreferrer">mail.tm</a></div>
            </div>

            <div class="save-card">
              <div class="card-heading compact">
                <div>
                  <span class="section-kicker">\u672C\u5730\u4FDD\u5B58 / Local Vault</span>
                  <h3>Saved addresses</h3>
                </div>
                <button class="ghost-btn small" onclick="exportToCSV()">\u5BFC\u51FA CSV</button>
              </div>
              <div class="table-wrap">
                <table class="saved-table">
                  <thead>
                    <tr>
                      <th>\u5907\u6CE8</th>
                      <th>\u5730\u533A</th>
                      <th>\u59D3\u540D</th>
                      <th>\u7535\u8BDD</th>
                      <th>\u5730\u5740</th>
                      <th>\u64CD\u4F5C</th>
                    </tr>
                  </thead>
                  <tbody id="savedAddressesBody"></tbody>
                </table>
              </div>
            </div>

            <div class="about-card">
              <span class="section-kicker">\u8BF4\u660E / Notes</span>
              <ul>
                <li>Addresses are selected via OpenStreetMap reverse geocoding.</li>
                <li>Personal information is region-matched synthetic data.</li>
                <li>Phone prefixes are chosen to look locally authentic in sign-up forms.</li>
                <li>This tool is intended for learning, testing, and UI prototyping only.</li>
              </ul>
            </div>
          </aside>
        </section>
      </main>

      <div class="copy-toast" id="copyToast">Copied</div>
      <div class="message-host" id="messageHost"></div>
      <div class="modal" id="saveDialog">
        <div class="modal-card">
          <h3>\u4FDD\u5B58\u5730\u5740 / Save address</h3>
          <input id="noteInput" type="text" placeholder="\u6DFB\u52A0\u5907\u6CE8 / Optional note" />
          <div class="modal-actions">
            <button class="ghost-btn" onclick="closeSaveDialog()">\u53D6\u6D88</button>
            <button class="primary-btn" onclick="saveAddress()">\u786E\u8BA4</button>
          </div>
        </div>
      </div>

      <script>${getClientScript(safePayload)}<\/script>
    </body>
  </html>`;
}
__name(renderApp, "renderApp");
function renderInfoRow(row) {
  const displayValue = escapeHtml(row.value || "");
  const copyValue = JSON.stringify(String(row.value || ""));
  const secondary = row.secondary ? `<div class="info-secondary">${escapeHtml(row.secondary)}</div>` : "";
  const spanClass = row.span ? ` ${escapeHtml(row.span)}` : "";
  return `<article class="info-row copy-card${spanClass}" role="button" tabindex="0" onclick='copyToClipboard(${copyValue})' onkeydown='handleCopyKeydown(event, ${copyValue})'>
    <div class="info-meta">
      <span class="info-label">${escapeHtml(row.label)}</span>
    </div>
    <div class="info-value">
      <span>${displayValue}</span>
      ${secondary}
    </div>
  </article>`;
}
__name(renderInfoRow, "renderInfoRow");
function getClientScript(payload) {
  return `
    const payload = ${payload};
    const LIVE_INBOX_KEY = 'live-temp-inbox-v1';
    const regionConfigMap = Object.fromEntries(payload.regionConfigs.map(region => [region.id, region]));

    function showLoading() {
      const overlay = document.getElementById('loadingOverlay');
      if (overlay) overlay.classList.add('visible');
    }

    function hideLoading() {
      const overlay = document.getElementById('loadingOverlay');
      if (overlay) overlay.classList.remove('visible');
    }

    function getSavedAddresses() {
      try {
        const raw = localStorage.getItem('saved-addresses-v2');
        return raw ? JSON.parse(raw) : [];
      } catch (error) {
        return [];
      }
    }

    function setSavedAddresses(addresses) {
      localStorage.setItem('saved-addresses-v2', JSON.stringify(addresses));
    }

    function getLiveInbox() {
      try {
        const raw = localStorage.getItem(LIVE_INBOX_KEY);
        return raw ? JSON.parse(raw) : null;
      } catch (error) {
        return null;
      }
    }

    function setLiveInbox(inbox) {
      if (!inbox) {
        localStorage.removeItem(LIVE_INBOX_KEY);
        return;
      }

      localStorage.setItem(LIVE_INBOX_KEY, JSON.stringify(inbox));
    }

    function buildQuery(region, subregion, forceRefresh = false) {
      const url = new URL(window.location.href);
      url.searchParams.set('region', region);
      if (subregion) {
        url.searchParams.set('subregion', subregion);
      } else {
        url.searchParams.delete('subregion');
      }
      if (forceRefresh) {
        url.searchParams.set('refresh', Date.now().toString());
      } else {
        url.searchParams.delete('refresh');
      }
      return url.toString();
    }

    function getCurrentSelection() {
      const regionSelect = document.getElementById('region');
      const subregionSelect = document.getElementById('subregion');

      return {
        regionId: regionSelect?.value || payload.regionId,
        subregionId: subregionSelect?.value || payload.subregionId
      };
    }

    function getSubregionOptionsForRegion(regionId) {
      return payload.subregionOptionsByRegion[regionId] || [];
    }

    function areSubregionOptionsInSync(regionId) {
      const subregionSelect = document.getElementById('subregion');
      const expectedOptions = getSubregionOptionsForRegion(regionId);

      if (!subregionSelect) {
        return true;
      }

      if (subregionSelect.options.length !== expectedOptions.length) {
        return false;
      }

      return expectedOptions.every((option, index) => {
        const renderedOption = subregionSelect.options[index];
        return renderedOption && renderedOption.value === option.id && renderedOption.textContent === option.label;
      });
    }

    function renderSubregionOptions(regionId, preferredSubregion = '') {
      const subregionSelect = document.getElementById('subregion');
      const subregionLabel = document.getElementById('subregionLabel');
      const regionConfig = regionConfigMap[regionId] || regionConfigMap[payload.regionId];
      const options = getSubregionOptionsForRegion(regionId);

      if (subregionLabel && regionConfig) {
        subregionLabel.textContent = regionConfig.subregionLabelNative + ' / ' + regionConfig.subregionLabel;
      }

      if (!subregionSelect) {
        return preferredSubregion;
      }

      subregionSelect.innerHTML = options.map(option => {
        return '<option value="' + escapeForHtml(option.id) + '">' + escapeForHtml(option.label) + '</option>';
      }).join('');

      const hasPreferred = preferredSubregion && options.some(option => option.id === preferredSubregion);
      const nextSubregion = hasPreferred ? preferredSubregion : (options[0]?.id || '');
      subregionSelect.value = nextSubregion;
      return nextSubregion;
    }

    function applySelection(regionId, preferredSubregion = '') {
      const regionSelect = document.getElementById('region');

      if (regionSelect) {
        regionSelect.value = regionId;
      }

      return renderSubregionOptions(regionId, preferredSubregion);
    }

    function syncSelectionControlsWithPayload() {
      applySelection(payload.regionId, payload.subregionId);
    }

    function ensureSubregionSync(preferredSubregion = '') {
      const selection = getCurrentSelection();
      const options = getSubregionOptionsForRegion(selection.regionId);
      const candidateSubregion = preferredSubregion || selection.subregionId;
      const hasCandidate = candidateSubregion && options.some(option => option.id === candidateSubregion);

      if (areSubregionOptionsInSync(selection.regionId) && hasCandidate) {
        return candidateSubregion;
      }

      const nextSubregion = renderSubregionOptions(selection.regionId, candidateSubregion);
      syncSelectionUrl(selection.regionId, nextSubregion);
      return nextSubregion;
    }

    function refreshCurrent(forceRefresh = true) {
      ensureSubregionSync();
      showLoading();
      const selection = getCurrentSelection();
      window.location.href = buildQuery(selection.regionId, selection.subregionId, forceRefresh);
    }

    function syncSelectionUrl(region, subregion) {
      window.history.replaceState({}, '', buildQuery(region, subregion, false));
    }

    function changeRegion(region) {
      const nextSubregion = renderSubregionOptions(region);
      syncSelectionUrl(region, nextSubregion);
    }

    function changeSubregion(subregion) {
      const selection = getCurrentSelection();
      syncSelectionUrl(selection.regionId, subregion || selection.subregionId);
    }

    function bindSelectionControls() {
      const regionSelect = document.getElementById('region');
      const subregionSelect = document.getElementById('subregion');

      if (regionSelect) {
        regionSelect.addEventListener('input', event => changeRegion(event.target.value));
        regionSelect.addEventListener('change', event => changeRegion(event.target.value));
      }

      if (subregionSelect) {
        subregionSelect.addEventListener('focus', () => ensureSubregionSync());
        subregionSelect.addEventListener('pointerdown', () => ensureSubregionSync());
        subregionSelect.addEventListener('mousedown', () => ensureSubregionSync());
        subregionSelect.addEventListener('input', event => changeSubregion(event.target.value));
        subregionSelect.addEventListener('change', event => changeSubregion(event.target.value));
      }
    }

    function bindFormSubmit() {
      const form = document.getElementById('generatorForm');
      if (form) {
        form.addEventListener('submit', () => showLoading());
      }
    }

    async function copyToClipboard(text) {
      try {
        await navigator.clipboard.writeText(text);
        const toast = document.getElementById('copyToast');
        toast.classList.add('visible');
        setTimeout(() => toast.classList.remove('visible'), 1200);
      } catch (error) {
        showMessage('\u590D\u5236\u5931\u8D25 / Copy failed', 'error');
      }
    }

    function handleCopyKeydown(event, text) {
      if (event.key !== 'Enter' && event.key !== ' ') {
        return;
      }

      event.preventDefault();
      copyToClipboard(text);
    }

    function getInboxHint() {
      return (payload.profile.fullNameLatin + '-' + payload.regionId).toLowerCase().replace(/[^a-z0-9]+/g, '-');
    }

    async function createLiveInbox() {
      showMessage('\u6B63\u5728\u521B\u5EFA\u771F\u5B9E\u90AE\u7BB1 / Creating inbox');

      try {
        const response = await fetch('/api/inbox/create', {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify({ hint: getInboxHint() })
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || data.detail || 'Unable to create inbox');
        }

        const inbox = {
          ...data,
          messages: [],
          selectedMessage: null
        };

        setLiveInbox(inbox);
        renderInbox();
        showMessage('\u90AE\u7BB1\u5DF2\u521B\u5EFA / Inbox created');
        await refreshInboxMessages();
      } catch (error) {
        showMessage('\u521B\u5EFA\u90AE\u7BB1\u5931\u8D25 / ' + error.message, 'error');
      }
    }

    function clearLiveInbox() {
      setLiveInbox(null);
      renderInbox();
      showMessage('\u5DF2\u6E05\u9664\u672C\u5730\u90AE\u7BB1\u4F1A\u8BDD / Inbox session cleared', 'warning');
    }

    async function refreshInboxMessages() {
      const inbox = getLiveInbox();
      if (!inbox?.token) {
        renderInbox();
        return;
      }

      try {
        const response = await fetch('/api/inbox/messages?token=' + encodeURIComponent(inbox.token));
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || 'Unable to load messages');
        }

        const nextInbox = {
          ...inbox,
          messages: data.messages || [],
          refreshedAt: new Date().toISOString()
        };
        setLiveInbox(nextInbox);
        renderInbox();
      } catch (error) {
        showMessage('\u6536\u4EF6\u7BB1\u5237\u65B0\u5931\u8D25 / ' + error.message, 'error');
      }
    }

    async function openInboxMessage(messageId) {
      const inbox = getLiveInbox();
      if (!inbox?.token) {
        return;
      }

      try {
        const response = await fetch('/api/inbox/message?token=' + encodeURIComponent(inbox.token) + '&id=' + encodeURIComponent(messageId));
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || 'Unable to load message');
        }

        const nextInbox = {
          ...inbox,
          selectedMessage: data.message
        };
        setLiveInbox(nextInbox);
        renderInbox();
      } catch (error) {
        showMessage('\u8BFB\u53D6\u90AE\u4EF6\u5931\u8D25 / ' + error.message, 'error');
      }
    }

    function renderInbox() {
      const inboxMeta = document.getElementById('inboxMeta');
      const inboxActions = document.getElementById('inboxActions');
      const inboxList = document.getElementById('inboxList');
      const inboxDetail = document.getElementById('inboxDetail');
      const inbox = getLiveInbox();

      if (!inbox?.address) {
        inboxMeta.innerHTML =
          '<div class="inbox-empty">' +
            '<strong>Suggested:</strong> ' + escapeForHtml(payload.emailEntry.address) + '<br />' +
            '<span>' + escapeForHtml(payload.emailEntry.helperText) + '</span>' +
          '</div>';
        inboxActions.innerHTML = '<button class="primary-btn full-width" onclick="createLiveInbox()">\u521B\u5EFA\u771F\u5B9E\u4E34\u65F6\u90AE\u7BB1 / Create live inbox</button>';
        inboxList.innerHTML = '';
        inboxDetail.innerHTML = '';
        return;
      }

      const refreshedText = inbox.refreshedAt ? new Date(inbox.refreshedAt).toLocaleString() : 'Not refreshed yet';

      inboxMeta.innerHTML =
        '<div class="inbox-credentials">' +
          '<div><span>Address</span><button class="tiny-copy" onclick="copyToClipboard(' + JSON.stringify(inbox.address) + ')">\u590D\u5236</button></div>' +
          '<strong>' + escapeForHtml(inbox.address) + '</strong>' +
          '<div class="cred-row"><span>Password</span><button class="tiny-copy" onclick="copyToClipboard(' + JSON.stringify(inbox.password) + ')">\u590D\u5236</button></div>' +
          '<strong>' + escapeForHtml(inbox.password) + '</strong>' +
          '<div class="inbox-footnote">Refreshed: ' + escapeForHtml(refreshedText) + '</div>' +
        '</div>';

      inboxActions.innerHTML =
        '<button class="ghost-btn small" onclick="refreshInboxMessages()">\u5237\u65B0\u90AE\u4EF6</button>' +
        '<button class="ghost-btn small" onclick="clearLiveInbox()">\u6E05\u9664\u4F1A\u8BDD</button>';

      if (!inbox.messages || inbox.messages.length === 0) {
        inboxList.innerHTML = '<div class="inbox-empty">No messages yet. Use this address in a sign-up flow and click refresh.</div>';
      } else {
        inboxList.innerHTML = inbox.messages.map(message => {
          return '<button class="mail-item" onclick="openInboxMessage(' + JSON.stringify(message.id) + ')">' +
            '<span class="mail-subject">' + escapeForHtml(message.subject) + '</span>' +
            '<span class="mail-from">' + escapeForHtml(message.from) + '</span>' +
            '<span class="mail-intro">' + escapeForHtml(message.intro || '') + '</span>' +
          '</button>';
        }).join('');
      }

      if (!inbox.selectedMessage) {
        inboxDetail.innerHTML = '<div class="inbox-empty">Select a message to read it here.</div>';
        return;
      }

      inboxDetail.innerHTML =
        '<div class="mail-detail-card">' +
          '<div class="mail-detail-meta"><strong>' + escapeForHtml(inbox.selectedMessage.subject) + '</strong></div>' +
          '<div class="mail-detail-submeta">From: ' + escapeForHtml(inbox.selectedMessage.from) + '</div>' +
          '<div class="mail-detail-submeta">To: ' + escapeForHtml(inbox.selectedMessage.to || inbox.address) + '</div>' +
          '<pre class="mail-body">' + escapeForHtml(inbox.selectedMessage.body || inbox.selectedMessage.intro || '') + '</pre>' +
        '</div>';
    }

    function showSaveDialog() {
      document.getElementById('saveDialog').style.display = 'flex';
      document.getElementById('noteInput').value = '';
      document.getElementById('noteInput').focus();
    }

    function closeSaveDialog() {
      document.getElementById('saveDialog').style.display = 'none';
    }

    function showMessage(text, tone = 'success') {
      const host = document.getElementById('messageHost');
      const node = document.createElement('div');
      node.className = 'flash-message ' + tone;
      node.textContent = text;
      host.appendChild(node);
      setTimeout(() => node.remove(), 2200);
    }

    function saveAddress() {
      const note = document.getElementById('noteInput').value.trim() || '\u65E0\u5907\u6CE8';
      const addresses = getSavedAddresses();
      const exists = addresses.some(entry => entry.fullAddress === payload.address.fullAddress);
      if (exists) {
        showMessage('\u5DF2\u5B58\u5728\u76F8\u540C\u5730\u5740 / Duplicate address', 'warning');
        return;
      }

      addresses.unshift({
        note,
        region: payload.regionLabel,
        name: payload.profile.fullNameLatin,
        phone: payload.profile.phone,
        fullAddress: payload.address.fullAddress
      });
      setSavedAddresses(addresses);
      renderSavedAddresses();
      closeSaveDialog();
      showMessage('\u4FDD\u5B58\u6210\u529F / Saved');
    }

    function deleteAddress(index) {
      const addresses = getSavedAddresses();
      addresses.splice(index, 1);
      setSavedAddresses(addresses);
      renderSavedAddresses();
    }

    function renderSavedAddresses() {
      const rows = getSavedAddresses();
      const body = document.getElementById('savedAddressesBody');
      if (!rows.length) {
        body.innerHTML = '<tr><td colspan="6" class="empty-cell">\u6682\u65E0\u4FDD\u5B58\u7684\u5730\u5740 / No saved entries</td></tr>';
        return;
      }

      body.innerHTML = rows.map((row, index) => {
        return '<tr>' +
          '<td data-label="\u5907\u6CE8">' + escapeForHtml(row.note) + '</td>' +
          '<td data-label="\u5730\u533A">' + escapeForHtml(row.region) + '</td>' +
          '<td data-label="\u59D3\u540D">' + escapeForHtml(row.name) + '</td>' +
          '<td data-label="\u7535\u8BDD">' + escapeForHtml(row.phone) + '</td>' +
          '<td data-label="\u5730\u5740">' + escapeForHtml(row.fullAddress) + '</td>' +
          '<td data-label="\u64CD\u4F5C"><button class="danger-btn" onclick="deleteAddress(' + index + ')">\u5220\u9664</button></td>' +
          '</tr>';
      }).join('');
    }

    function exportToCSV() {
      const rows = getSavedAddresses();
      if (!rows.length) {
        showMessage('\u6CA1\u6709\u53EF\u5BFC\u51FA\u7684\u5730\u5740 / Nothing to export', 'warning');
        return;
      }

      const headers = ['\u5907\u6CE8', '\u5730\u533A', '\u59D3\u540D', '\u7535\u8BDD', '\u5730\u5740'];
      const content = [
        headers.join(','),
        ...rows.map(row => [row.note, row.region, row.name, row.phone, row.fullAddress]
          .map(field => '"' + String(field).replace(/"/g, '""') + '"')
          .join(','))
      ].join('
');

      const blob = new Blob([new Uint8Array([0xEF, 0xBB, 0xBF]), content], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'saved-addresses.csv';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

    function escapeForHtml(text) {
      return String(text)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    }

    function handleMapLoad() {
      const loading = document.getElementById('map-loading');
      if (loading) loading.style.display = 'none';
    }

    function handleMapError() {
      const loading = document.getElementById('map-loading');
      if (loading) loading.textContent = '\u5730\u56FE\u52A0\u8F7D\u5931\u8D25 / Map failed to load';
    }

    async function shareResult() {
      const shareData = {
        title: 'Multi-Region Address Generator',
        text: payload.address.fullAddress,
        url: window.location.href
      };

      if (navigator.share) {
        try {
          await navigator.share(shareData);
          return;
        } catch (error) {}
      }

      copyToClipboard(window.location.href);
      showMessage('\u94FE\u63A5\u5DF2\u590D\u5236 / Link copied');
    }

    document.getElementById('noteInput').addEventListener('keyup', event => {
      if (event.key === 'Enter') saveAddress();
    });

    window.onclick = event => {
      if (event.target === document.getElementById('saveDialog')) {
        closeSaveDialog();
      }
    };

    window.copyToClipboard = copyToClipboard;
    window.showSaveDialog = showSaveDialog;
    window.closeSaveDialog = closeSaveDialog;
    window.saveAddress = saveAddress;
    window.deleteAddress = deleteAddress;
    window.exportToCSV = exportToCSV;
    window.changeRegion = changeRegion;
    window.changeSubregion = changeSubregion;
    window.refreshCurrent = refreshCurrent;
    window.handleMapLoad = handleMapLoad;
    window.handleMapError = handleMapError;
    window.shareResult = shareResult;
    window.createLiveInbox = createLiveInbox;
    window.refreshInboxMessages = refreshInboxMessages;
    window.openInboxMessage = openInboxMessage;
    window.clearLiveInbox = clearLiveInbox;
    window.handleCopyKeydown = handleCopyKeydown;

    hideLoading();
    syncSelectionControlsWithPayload();
    bindSelectionControls();
    bindFormSubmit();
    window.addEventListener('pageshow', () => {
      hideLoading();
      syncSelectionControlsWithPayload();
    });
    renderSavedAddresses();
    renderInbox();
    setTimeout(() => {
      const frame = document.querySelector('.map-frame');
      if (frame && document.getElementById('map-loading').style.display !== 'none') {
        handleMapError();
      }
    }, 10000);
  `;
}
__name(getClientScript, "getClientScript");
function serializeForScript(value) {
  let json = JSON.stringify(value).replace(/[<>]/g, (c) => c === "<" ? "\\u003c" : "\\u003e").replace(/&/g, "\\u0026").replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
  let result = "";
  let lastCut = 0;
  for (let i = 0; i < json.length; i++) {
    if (i - lastCut > 400 && (json[i] === "," || json[i] === "}" || json[i] === "]")) {
      result += json.slice(lastCut, i + 1) + "\n";
      lastCut = i + 1;
    }
  }
  result += json.slice(lastCut);
  return result;
}
__name(serializeForScript, "serializeForScript");
function getStyles() {
  return `
    :root {
      color-scheme: dark;
      --bg: #0a0c10;
      --bg-elevated: rgba(18, 20, 27, 0.84);
      --surface: rgba(20, 24, 31, 0.86);
      --surface-strong: rgba(26, 31, 40, 0.96);
      --surface-soft: rgba(255, 255, 255, 0.03);
      --text: #f7f8fb;
      --muted: #9aa4b2;
      --line: rgba(255, 255, 255, 0.08);
      --orange: #ff8a1f;
      --orange-strong: #ff6a00;
      --orange-soft: rgba(255, 138, 31, 0.15);
      --green: #22c55e;
      --danger: #ef4444;
      --shadow: 0 22px 80px rgba(0, 0, 0, 0.45);
      --radius-xl: 28px;
      --radius-lg: 20px;
      --radius-md: 14px;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: Inter, -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", sans-serif;
      min-height: 100vh;
      background:
        radial-gradient(circle at top left, rgba(255, 106, 0, 0.18), transparent 22%),
        radial-gradient(circle at top right, rgba(255, 138, 31, 0.12), transparent 18%),
        linear-gradient(180deg, #090b0f 0%, #0c1016 100%);
      color: var(--text);
      padding: 32px;
      overflow-x: hidden;
    }

    a {
      color: inherit;
      text-decoration: none;
    }

    button, select, input {
      font: inherit;
    }

    .ambient {
      position: fixed;
      width: 320px;
      height: 320px;
      border-radius: 50%;
      filter: blur(90px);
      pointer-events: none;
      opacity: 0.45;
      z-index: 0;
    }

    .ambient-left {
      left: -120px;
      top: -80px;
      background: rgba(255, 106, 0, 0.28);
    }

    .ambient-right {
      right: -120px;
      top: 140px;
      background: rgba(255, 138, 31, 0.16);
    }

    .app-shell {
      position: relative;
      z-index: 1;
      max-width: 1520px;
      margin: 0 auto;
      display: grid;
      gap: 18px;
    }

    .hero-card,
    .results-card,
    .map-card,
    .save-card,
    .about-card {
      border: 1px solid var(--line);
      background: var(--surface);
      backdrop-filter: blur(18px);
      box-shadow: var(--shadow);
    }

    .hero-card {
      border-radius: var(--radius-xl);
      padding: 22px 24px;
      display: flex;
      justify-content: space-between;
      gap: 18px;
      align-items: center;
    }

    .eyebrow,
    .section-kicker {
      display: inline-block;
      font-size: 0.76rem;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: var(--orange);
      margin-bottom: 8px;
    }

    .hero-copy h1 {
      font-size: clamp(1.72rem, 3vw, 2.8rem);
      line-height: 1.02;
      letter-spacing: -0.04em;
      margin-bottom: 10px;
    }

    .hero-copy p {
      max-width: 780px;
      color: var(--muted);
      font-size: 0.94rem;
      line-height: 1.55;
    }

    .hero-actions {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
    }

    .layout-grid {
      display: grid;
      grid-template-columns: minmax(0, 1.58fr) minmax(330px, 0.82fr);
      gap: 18px;
      align-items: start;
    }

    .result-panel,
    .side-panel {
      display: grid;
      gap: 18px;
    }

    .toolbar {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr)) auto;
      gap: 10px;
      padding: 14px;
      border-radius: 16px;
      border: 1px solid var(--line);
      background: var(--surface-soft);
    }

    .toolbar-group {
      display: grid;
      gap: 6px;
    }

    .toolbar-group label {
      font-size: 0.78rem;
      color: var(--muted);
    }

    .toolbar-actions {
      display: flex;
      gap: 8px;
      align-items: end;
      flex-wrap: wrap;
    }

    select,
    input {
      width: 100%;
      height: 44px;
      border-radius: 12px;
      border: 1px solid var(--line);
      background: rgba(255, 255, 255, 0.03);
      color: var(--text);
      padding: 0 14px;
      font-size: 0.95rem;
      outline: none;
    }

    select {
      color-scheme: dark;
    }

    select option {
      color: #0b0d12;
      background: #f5f7fb;
    }

    select option:checked {
      background: #cfe3ff;
      color: #0b0d12;
    }

    .primary-btn,
    .ghost-btn,
    .link-btn,
    .danger-btn {
      border: 1px solid transparent;
      border-radius: 12px;
      padding: 0 14px;
      height: 44px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: transform 0.18s ease, opacity 0.18s ease, border-color 0.18s ease, background 0.18s ease;
      white-space: nowrap;
    }

    .primary-btn {
      background: linear-gradient(135deg, var(--orange) 0%, var(--orange-strong) 100%);
      color: #0a0c10;
      font-weight: 700;
    }

    .ghost-btn,
    .link-btn {
      background: rgba(255, 255, 255, 0.03);
      border-color: var(--line);
      color: var(--text);
    }

    .ghost-btn.small {
      height: 36px;
      padding: 0 12px;
    }

    .danger-btn {
      background: rgba(239, 68, 68, 0.12);
      color: #fecaca;
      height: 38px;
      padding: 0 12px;
    }

    .primary-btn:hover,
    .ghost-btn:hover,
    .link-btn:hover,
    .danger-btn:hover,
    .info-value:hover {
      transform: translateY(-1px);
    }

    .results-card,
    .map-card,
    .inbox-card,
    .save-card,
    .about-card {
      border-radius: var(--radius-xl);
      padding: 18px;
    }

    .card-heading {
      display: flex;
      justify-content: space-between;
      gap: 12px;
      align-items: start;
      margin-bottom: 14px;
    }

    .card-heading-actions {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }

    .card-heading.compact h3,
    .card-heading h2 {
      font-size: 1.32rem;
      letter-spacing: -0.03em;
    }

    .status-pill,
    .map-hint {
      padding: 6px 10px;
      border-radius: 999px;
      border: 1px solid var(--line);
      color: var(--muted);
      font-size: 0.75rem;
      background: rgba(255, 255, 255, 0.04);
    }

    .notice-row {
      margin-bottom: 12px;
    }

    .phone-note {
      border-radius: 14px;
      padding: 12px 14px;
      background: linear-gradient(180deg, rgba(255, 138, 31, 0.12), rgba(255, 138, 31, 0.04));
      border: 1px solid rgba(255, 138, 31, 0.18);
    }

    .phone-note-title {
      display: inline-block;
      margin-bottom: 4px;
      color: #ffd2aa;
      font-size: 0.72rem;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    .phone-note p {
      color: #fff3e8;
      line-height: 1.45;
      font-size: 0.9rem;
    }

    .info-grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 10px;
    }

    .info-row {
      display: grid;
      gap: 6px;
      padding: 10px 11px;
      border-radius: 14px;
      border: 1px solid var(--line);
      background: rgba(255, 255, 255, 0.03);
      cursor: pointer;
      transition: transform 0.18s ease, border-color 0.18s ease, background 0.18s ease, box-shadow 0.18s ease;
    }

    .info-row:hover,
    .info-row:focus-visible {
      transform: translateY(-1px);
      border-color: rgba(255, 255, 255, 0.18);
      background: rgba(255, 255, 255, 0.045);
      box-shadow: 0 12px 28px rgba(0, 0, 0, 0.18);
      outline: none;
    }

    .info-row.wide {
      grid-column: span 2;
    }

    .info-row.full {
      grid-column: 1 / -1;
    }

    .info-meta {
      display: flex;
      justify-content: space-between;
      gap: 8px;
      align-items: center;
    }

    .info-label {
      font-size: 0.77rem;
      color: var(--muted);
    }

    .inline-action {
      font-size: 0.82rem;
      color: #ffd2aa;
    }

    .info-value {
      width: 100%;
      text-align: left;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.04);
      border-radius: 12px;
      padding: 10px 12px;
      color: var(--text);
      cursor: pointer;
      transition: border-color 0.18s ease, background 0.18s ease;
    }

    .info-value span {
      display: block;
      font-size: 0.97rem;
      font-weight: 600;
      line-height: 1.35;
      word-break: break-word;
    }

    .info-secondary {
      margin-top: 5px;
      font-size: 0.78rem;
      color: var(--muted);
      font-weight: 400;
      line-height: 1.4;
    }

    .map-container {
      position: relative;
      height: 320px;
      overflow: hidden;
      border-radius: 16px;
      border: 1px solid var(--line);
      background: rgba(255, 255, 255, 0.03);
    }

    .map-loading {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--muted);
      z-index: 1;
    }

    .map-frame {
      width: 100%;
      height: 100%;
      border: 0;
      display: block;
    }

    .table-wrap {
      overflow: auto;
      border: 1px solid var(--line);
      border-radius: 18px;
    }

    .inbox-meta,
    .inbox-list,
    .inbox-detail {
      border: 1px solid var(--line);
      border-radius: 18px;
      background: rgba(255, 255, 255, 0.03);
    }

    .inbox-meta {
      padding: 16px;
      margin-bottom: 12px;
    }

    .inbox-actions {
      display: flex;
      gap: 10px;
      margin-bottom: 12px;
      flex-wrap: wrap;
    }

    .full-width {
      width: 100%;
    }

    .inbox-empty {
      color: var(--muted);
      line-height: 1.6;
      padding: 16px;
    }

    .inbox-credentials {
      display: grid;
      gap: 10px;
    }

    .inbox-credentials span,
    .inbox-footnote,
    .mail-from,
    .mail-intro,
    .mail-detail-submeta {
      color: var(--muted);
      font-size: 0.86rem;
    }

    .cred-row,
    .inbox-credentials > div:first-child {
      display: flex;
      justify-content: space-between;
      gap: 12px;
      align-items: center;
    }

    .tiny-copy {
      background: rgba(255, 255, 255, 0.04);
      color: var(--text);
      border: 1px solid var(--line);
      border-radius: 10px;
      padding: 6px 10px;
      cursor: pointer;
    }

    .inbox-list {
      display: grid;
      max-height: 280px;
      overflow: auto;
      margin-bottom: 12px;
    }

    .mail-item {
      width: 100%;
      padding: 14px 16px;
      text-align: left;
      border: 0;
      border-bottom: 1px solid var(--line);
      background: transparent;
      color: var(--text);
      cursor: pointer;
      display: grid;
      gap: 4px;
    }

    .mail-item:last-child {
      border-bottom: 0;
    }

    .mail-subject {
      font-weight: 600;
    }

    .inbox-detail {
      min-height: 160px;
      padding: 16px;
    }

    .mail-body {
      margin-top: 12px;
      white-space: pre-wrap;
      word-break: break-word;
      font: inherit;
      color: #f7f8fb;
    }

    .inbox-attribution {
      margin-top: 10px;
      color: var(--muted);
      font-size: 0.82rem;
    }

    .inbox-attribution a {
      color: #ffd2aa;
    }

    .saved-table {
      width: 100%;
      border-collapse: collapse;
    }

    .saved-table th,
    .saved-table td {
      padding: 14px 16px;
      font-size: 0.92rem;
      border-bottom: 1px solid var(--line);
      text-align: left;
      vertical-align: top;
    }

    .saved-table th {
      position: sticky;
      top: 0;
      background: rgba(17, 19, 25, 0.98);
      color: var(--muted);
      font-weight: 600;
    }

    .empty-cell {
      color: var(--muted);
      text-align: center;
    }

    .about-card ul {
      list-style: none;
      display: grid;
      gap: 12px;
      color: var(--muted);
      line-height: 1.65;
    }

    .about-card li {
      position: relative;
      padding-left: 18px;
    }

    .about-card li::before {
      content: '';
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: var(--orange);
      position: absolute;
      left: 0;
      top: 0.68em;
    }

    .copy-toast,
    .flash-message {
      position: fixed;
      left: 50%;
      transform: translateX(-50%);
      border-radius: 999px;
      padding: 11px 16px;
      z-index: 40;
      font-size: 0.92rem;
      box-shadow: var(--shadow);
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.18s ease, transform 0.18s ease;
    }

    .copy-toast {
      top: 22px;
      background: #11161f;
      border: 1px solid rgba(255, 138, 31, 0.3);
      color: #fff2e6;
    }

    .copy-toast.visible {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }

    .message-host {
      position: fixed;
      left: 50%;
      bottom: 24px;
      transform: translateX(-50%);
      display: grid;
      gap: 10px;
      z-index: 41;
    }

    .flash-message {
      position: relative;
      left: auto;
      bottom: auto;
      transform: none;
      opacity: 1;
      background: #11161f;
      color: #f8fafc;
      border: 1px solid var(--line);
    }

    .flash-message.warning {
      border-color: rgba(255, 138, 31, 0.28);
      color: #ffe7d1;
    }

    .flash-message.error {
      border-color: rgba(239, 68, 68, 0.4);
      color: #fecaca;
    }

    .modal {
      display: none;
      position: fixed;
      inset: 0;
      background: rgba(5, 7, 10, 0.72);
      backdrop-filter: blur(8px);
      align-items: center;
      justify-content: center;
      z-index: 60;
      padding: 20px;
    }

    .modal-card {
      width: min(100%, 440px);
      border-radius: 24px;
      border: 1px solid var(--line);
      background: rgba(18, 21, 28, 0.96);
      padding: 24px;
      box-shadow: var(--shadow);
    }

    .modal-card h3 {
      margin-bottom: 16px;
      font-size: 1.25rem;
      letter-spacing: -0.03em;
    }

    .modal-actions {
      display: flex;
      justify-content: end;
      gap: 10px;
      margin-top: 14px;
    }

    @media (max-width: 1160px) {
      .layout-grid {
        grid-template-columns: 1fr;
      }

      .info-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }

    @media (max-width: 860px) {
      body {
        padding: 16px;
      }

      .hero-card {
        flex-direction: column;
        align-items: start;
      }

      .toolbar {
        grid-template-columns: 1fr;
      }

      .toolbar-actions,
      .hero-actions {
        width: 100%;
      }

      .toolbar-actions > *,
      .hero-actions > * {
        flex: 1;
      }

      .info-grid {
        grid-template-columns: 1fr;
      }

      .info-row.wide,
      .info-row.full {
        grid-column: span 1;
      }

      .map-container {
        height: 280px;
      }

      .saved-table,
      .saved-table thead,
      .saved-table tbody,
      .saved-table tr,
      .saved-table td {
        display: block;
        width: 100%;
      }

      .saved-table thead {
        display: none;
      }

      .saved-table tr {
        border-bottom: 1px solid var(--line);
        padding: 12px 0;
      }

      .saved-table td {
        border: 0;
        padding: 6px 14px;
      }

      .saved-table td::before {
        content: attr(data-label) '\uFF1A';
        color: var(--muted);
        display: block;
        margin-bottom: 3px;
      }
    }

    .loading-overlay {
      position: fixed;
      inset: 0;
      background: rgba(5, 7, 10, 0.92);
      backdrop-filter: blur(12px);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      z-index: 100;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.25s ease, visibility 0.25s ease;
    }

    .loading-overlay.visible {
      opacity: 1;
      visibility: visible;
    }

    .loading-spinner {
      width: 48px;
      height: 48px;
      border: 3px solid var(--line);
      border-top-color: var(--orange);
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .loading-text {
      margin-top: 16px;
      color: var(--muted);
      font-size: 0.95rem;
    }
  `;
}
__name(getStyles, "getStyles");

// src/index.js
var src_default = {
  async fetch(request2) {
    return handleRequest(request2);
  }
};
async function handleRequest(request2) {
  const url = new URL(request2.url);
  if (url.pathname === "/api/inbox/create" && request2.method === "POST") {
    const body = await readJsonBody(request2);
    const inbox = await createTempInbox(fetch, body.hint || "address-user");
    return jsonResponse(inbox);
  }
  if (url.pathname === "/api/inbox/messages" && request2.method === "GET") {
    const token = url.searchParams.get("token") || "";
    if (!token) {
      return jsonResponse({ error: "Missing token" }, 400);
    }
    const messages = await listTempInboxMessages(fetch, token);
    return jsonResponse({ messages });
  }
  if (url.pathname === "/api/inbox/message" && request2.method === "GET") {
    const token = url.searchParams.get("token") || "";
    const id = url.searchParams.get("id") || "";
    if (!token || !id) {
      return jsonResponse({ error: "Missing token or id" }, 400);
    }
    const message = await getTempInboxMessage(fetch, token, id);
    return jsonResponse({ message });
  }
  const regionId = url.searchParams.get("region") || "US";
  const requestedSubregion = url.searchParams.get("subregion") || "";
  const regionConfig = getRegionConfig(regionId);
  const subregionId = resolveSubregion(regionConfig.id, requestedSubregion);
  try {
    const address = await generateAddress({
      fetchFn: fetch,
      regionId: regionConfig.id,
      subregionId
    });
    const profile = buildProfile({
      regionId: regionConfig.id,
      subregionId
    });
    const emailEntry = buildEmailEntry(profile, regionConfig);
    const html = renderApp({
      regionConfig,
      regionId: regionConfig.id,
      subregionId,
      address,
      profile,
      emailEntry
    });
    return new Response(html, {
      headers: {
        "content-type": "text/html;charset=UTF-8",
        "cache-control": "no-store",
        "content-security-policy": "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; frame-src https://www.google.com; connect-src 'self' https://nominatim.openstreetmap.org https://api.mail.tm"
      }
    });
  } catch (error) {
    console.error("Address generation failed:", error);
    const message = `<!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Address Generator Error</title>
          <style>
            body { font-family: Inter, -apple-system, BlinkMacSystemFont, sans-serif; margin: 0; min-height: 100vh; display: grid; place-items: center; background: #0b0d12; color: #f7f8fb; padding: 24px; }
            .card { max-width: 720px; background: #12161d; border: 1px solid rgba(255,255,255,0.08); border-radius: 24px; padding: 28px; box-shadow: 0 20px 60px rgba(0,0,0,0.35); }
            h1 { margin: 0 0 12px; font-size: 2rem; }
            p { color: #a8b0bd; line-height: 1.7; }
            a { display: inline-flex; margin-top: 16px; color: #111; background: linear-gradient(135deg, #ff8a1f, #ff6a00); border-radius: 999px; padding: 12px 16px; font-weight: 700; text-decoration: none; }
          </style>
        </head>
        <body>
          <div class="card">
            <h1>Unable to generate an address</h1>
            <p>Something went wrong while generating the address. Please try again or switch regions.</p>
            <p>Try reloading or switching to a different region/subregion. Some geocoding areas are denser than others.</p>
            <a href="/">Back to generator</a>
          </div>
        </body>
      </html>`;
    return new Response(message, {
      status: 500,
      headers: {
        "content-type": "text/html;charset=UTF-8",
        "cache-control": "no-store",
        "content-security-policy": "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; frame-src https://www.google.com; connect-src 'self' https://nominatim.openstreetmap.org https://api.mail.tm"
      }
    });
  }
}
__name(handleRequest, "handleRequest");
async function readJsonBody(request2) {
  try {
    return await request2.json();
  } catch {
    return {};
  }
}
__name(readJsonBody, "readJsonBody");
function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json;charset=UTF-8",
      "cache-control": "no-store"
    }
  });
}
__name(jsonResponse, "jsonResponse");

// node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
var drainBody = /* @__PURE__ */ __name(async (request2, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request2, env);
  } finally {
    try {
      if (request2.body !== null && !request2.bodyUsed) {
        const reader = request2.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;

// node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
__name(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name(async (request2, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request2, env);
  } catch (e) {
    const error = reduceError(e);
    return Response.json(error, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;

// .wrangler/tmp/bundle-tDmFew/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = src_default;

// node_modules/wrangler/templates/middleware/common.ts
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request2, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request2, env, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request2, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request2, env, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");

// .wrangler/tmp/bundle-tDmFew/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class ___Facade_ScheduledController__ {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  static {
    __name(this, "__Facade_ScheduledController__");
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof ___Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request2, env, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request2, env, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request2, env, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request2, env, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = /* @__PURE__ */ __name((request2, env, ctx) => {
      this.env = env;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request2);
    }, "#fetchDispatcher");
    #dispatcher = /* @__PURE__ */ __name((type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    }, "#dispatcher");
    fetch(request2) {
      return __facade_invoke__(
        request2,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default as default
};
//# sourceMappingURL=index.js.map
