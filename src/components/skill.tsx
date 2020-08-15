import React from 'react';
import { IResponsiveImage } from './responsive-image';

export interface ISkill {
  id: string;
  name: string;
  logo: IResponsiveImage;
  startDate: string;
  endDate?: string;
}

export const Skill: React.FC<{ skill: ISkill }> = ({ skill }) => {
  return <>{skill.name}</>;
};
