export type StudySpot = {
    id: number;
    name: string;
    lat: number;
    lng: number;
    crowdLevel: string;
    noiseLevel: string;
    lastUpdated: string;
  };
  
  const studySpots: StudySpot[] = [
    {
      id: 1,
      name: "Grainger Library",
      lat: 40.1120,
      lng: -88.2260,
      crowdLevel: "Moderate",
      noiseLevel: "Quiet",
      lastUpdated: "5 minutes ago"
    },
    {
      id: 2,
      name: "Undergraduate Library (UGL)",
      lat: 40.1055,
      lng: -88.2281,
      crowdLevel: "Crowded",
      noiseLevel: "Loud",
      lastUpdated: "2 minutes ago"
    }
  ];
  
  export default studySpots;
  