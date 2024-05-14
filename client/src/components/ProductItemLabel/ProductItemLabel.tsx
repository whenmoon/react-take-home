import React, { ReactElement } from 'react';

type ProductItemLabelProps = {
  label: string;
  capitalize?: boolean;
  bold?: boolean;
};

export const ProductItemLabel = ({ label, capitalize, bold }: ProductItemLabelProps): ReactElement => {
  const className = `stat-title ${capitalize ? 'capitalize' : ''} ${bold ? 'font-bold' : ''} p-1`;
  return (
    <div className={className}>{label}</div>
  );
};