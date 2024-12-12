import * as React from "react";
import CustomPagination from "./CustomPagination";

interface PaginationComponentProps {
  currentPage: number;
  perPage: number;
  totalItems: number;
  pageSizeOptions:Array<number>;
  onChangePagination: (page: number, size: number) => void;
}


const PaginationComponent: React.FC<PaginationComponentProps> = ({
  currentPage,
  perPage,
  totalItems,
  pageSizeOptions,
  onChangePagination,

}) => (
  <CustomPagination
    currentPage={currentPage}
    perPage={perPage}
    totalItems={totalItems}
    pageSizeOptions={pageSizeOptions}
    onChangePagination={onChangePagination}
  />
);

export default PaginationComponent;
