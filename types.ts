
export interface LogicGateProps {
  label: string;
  color: string;
  position: [number, number, number];
  iconType: 'tech' | 'culture' | 'sports' | 'gaming';
}

export interface ParticleProps {
  count: number;
  color: string;
  size?: number;
}
