export const countries = [
  { name: 'Brasil', flag: '🇧🇷' },
  { name: 'Argentina', flag: '🇦🇷' },
  { name: 'Inglaterra', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
  { name: 'Espanha', flag: '🇪🇸' },
];

export function getCountryFlag(country: string) {
  return countries.find(item => item.name === country)?.flag ?? '';
}
