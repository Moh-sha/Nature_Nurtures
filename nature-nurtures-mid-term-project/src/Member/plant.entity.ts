import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('plants')
export class PlantEntity {
  @PrimaryGeneratedColumn()
  plantId: number;

  @Column( { name: 'name', type: 'varchar', length: 255 } )
  name: string;

  @Column( { name: 'scientific_name', type: 'varchar', length: 255 } )
  scientificName: string;

  @Column( { name: 'description', type: 'varchar', length: 255 } )
  description: string;

  @Column( { name: 'category', type: 'varchar', length: 255 } )
  category: string;

  @Column( { name: 'care_instructions', type: 'varchar', length: 255 } )
  careInstructions: string;

  @Column( { name: 'growth_cycle', type: 'varchar', length: 255 } )
  growthCycle: string;

  @Column( { name: 'average_height', type: 'varchar', length: 255 } )
  averageHeight: string;

  @Column( { name: 'bloom_time', type: 'varchar', length: 255 } )
  bloomTime: string;

  @Column( { name: 'flower_color', type: 'varchar', length: 255 } )
  flowerColor: string;

  @Column( { name: 'foliage_Color', type: 'varchar', length: 255 } )
  foliageColor: string;

  @Column( { name: 'planting_season', type: 'varchar', length: 255 } )
  plantingSeason: string;

  @Column( { name: 'soil_type', type: 'varchar', length: 255 } )
  soilType: string;

  @Column( { name: 'hardiness_zone', type: 'varchar', length: 255 } )
  hardinessZone: string;

  @Column( { name: 'companion_plants', type: 'varchar', length: 255 } )
  companionPlants: string[];

  @Column( { name: 'pests_and_diseases', type: 'varchar', length: 255 } )
  pestsAndDiseases: string;

  @Column( { name: 'propagation_methods', type: 'varchar', length: 255, nullable: true } )
  propagationMethods: string[];

  @Column( { name: 'harvest_time', type: 'varchar', length: 255, nullable: true } )
  harvestTime: string;

  @Column( { name: 'edible_parts', type: 'varchar', length: 255, nullable: true } )
  edibleParts: string[];

  @Column( { name: 'uses', type: 'varchar', length: 255, nullable: true } )
  uses: string;
}
