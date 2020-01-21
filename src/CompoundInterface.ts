import { ReactNode } from 'react';

export interface CompoundInterface {
    children: ReactNode,
    onActivate?: () => {},
    activeIndex?: number,
    onActiveTab?: (index: number) => {}
  }