export class PlantDTO {
    plantID: number;
    name: string;
    scientificName: string;
    description: string;
    category: string;
    careInstructions: string;
    growthCycle: string;
    averageHeight: string;
    bloomTime: string;
    flowerColor: string;
    foliageColor: string;
    plantingSeason: string;
    soilType: string;
    hardinessZone: string;
    companionPlants: string[];
    pestsAndDiseases: string;
    propagationMethods?: string[];
    harvestTime?: string;
    edibleParts?: string[];
    uses?: string;
  }
  
  export class searchPlantInformationDTO {
    name: string;
    property: string;
  }