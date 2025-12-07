export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export enum SectionId {
  Alcohol = 'alcohol',
  Penalties = 'penalties',
  Water = 'water',
  Traffic = 'traffic',
  Substances = 'substances',
  Fees = 'fees',
  Fireworks = 'fireworks'
}