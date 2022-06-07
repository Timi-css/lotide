const lighthouses = [
  "Gibraltar Point",
  "Peggy's Point",
  "Cove Island",
  "Discovery Island",
  "Cape Scott",
  "Point Clark",
  "Kincardine",
];

let lighthouseNumbers = lighthouses.map(function (lighthouse) {
  return lighthouse.length;
});

console.log(lighthouseNumbers);
