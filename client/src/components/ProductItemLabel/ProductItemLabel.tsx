import React, { ReactElement } from 'react';

type ProductItemLabelProps = {
  label: string;
  capitalize?: boolean;
  bold?: boolean;
};

const responsiveClasses = 'text-base md:text-lg lg:text-xl xl:text-2xl whitespace-normal';

export const ProductItemLabel = ({ label, capitalize, bold }: ProductItemLabelProps): ReactElement => {
  const className = `stat-title ${capitalize ? 'capitalize' : ''} ${bold ? 'font-bold' : ''} p-1 ${responsiveClasses}`;
  return (
    <div className={className}>{label}</div>
  );
};