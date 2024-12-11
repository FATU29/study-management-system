import * as React from "react";
import CustomPagination from "./CustomPagination";

interface PaginationComponentProps {
  currentPage: number;
  perPage: number;
  totalItems: number;
  onChangePagination: (page: number, size: number) => void;
}

const pageSizeOptions = [5, 10, 15, 20];

const PaginationComponent: React.FC<PaginationComponentProps> = ({
  currentPage,
  perPage,
  totalItems,
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
