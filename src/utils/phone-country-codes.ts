export type PhoneCountryCode = {
  code: string;
  country: string;
  value: string;
};

export const phoneCountryCodes: PhoneCountryCode[] = [
  { code: "BR", country: "Brazil", value: "+55" },
  { code: "US", country: "United States", value: "+1" },
  { code: "GB", country: "United Kingdom", value: "+44" },
  { code: "PT", country: "Portugal", value: "+351" },
  { code: "JP", country: "Japan", value: "+81" },
  { code: "DE", country: "Germany", value: "+49" },
  { code: "FR", country: "France", value: "+33" },
  { code: "IT", country: "Italy", value: "+39" },
  { code: "ES", country: "Spain", value: "+34" },
  { code: "MX", country: "Mexico", value: "+52" },
  { code: "IN", country: "India", value: "+91" },
  { code: "RU", country: "Russia", value: "+7" },
];


export const countryNames = [
  { code: "BR", display: "Brazil" },
  { code: "US", display: "United States" },
  { code: "GB", display: "United Kingdom" },
  { code: "PT", display: "Portugal" },
  { code: "JP", display: "Japan" },
  { code: "DE", display: "Germany" },
  { code: "FR", display: "France" },
  { code: "IT", display: "Italy" },
  { code: "ES", display: "Spain" },
  { code: "MX", display: "Mexico" },
  { code: "IN", display: "India" },
  { code: "RU", display: "Russia" },
];
