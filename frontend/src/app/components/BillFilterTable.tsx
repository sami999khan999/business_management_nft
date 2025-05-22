import { FilteredBill } from "@/types";
import { formatNumberWithCommas } from "@/utils/numberFormat";
import React, { SetStateAction } from "react";
import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im";

const BillFilterTable = ({
  data,
  // method,
  setSelectedData,
  selectedData,
  type,
}: {
  data: FilteredBill[] | undefined;
  // method: string | undefined;
  setSelectedData?: React.Dispatch<SetStateAction<FilteredBill[] | undefined>>;
  selectedData?: FilteredBill[] | undefined;
  type?: string;
}) => {
  const columns = data && data?.length > 0 ? Object.keys(data[0]) : undefined;

  const selectHandler = (item: FilteredBill) => {
    if (!selectedData) {
      if (setSelectedData) {
        setSelectedData([item]);
      }
    } else {
      const isSelected = selectedData.some(
        (selectedItem) => selectedItem.id === item.id
      );
      console.log(isSelected);

      if (isSelected) {
        if (setSelectedData) {
          setSelectedData(
            selectedData.filter((selectedItem) => selectedItem.id !== item.id)
          );
        }
      } else {
        if (setSelectedData) {
          setSelectedData([...selectedData, item]);
        }
      }
    }
  };

  const isAllSelected = () => {
    if (data && selectedData) {
      return data.every((item1) =>
        selectedData.some((item2) => item1.id === item2.id)
      );
    }
  };

  const selectAll = () => {
    // if (selectedData?.length === 0) {
    //   if (setSelectedData) setSelectedData(data);
    // }

    if (isAllSelected()) {
      if (setSelectedData) setSelectedData([]);
    } else {
      if (data && setSelectedData) {
        setSelectedData((prv) => {
          if (prv) {
            const newItems = data.filter(
              (item1) => !prv.some((item2) => item1.id === item2.id)
            );
            return [...prv, ...newItems];
          } else {
            return data;
          }
        });
      }
    }
  };

  return (
    <div>
      {data && (
        <div className="overflow-auto relative h-[15rem] xl:h-[20rem] overflow-y-auto remove-scrollbar mb-2">
          <div className="">
            {data.length > 0 ? (
              <div className="xl:w-full w-[40rem]">
                <div className="table-header xl:py-4 py-3">
                  {columns?.map((col, i) => (
                    <p
                      key={i}
                      className={`truncate-text ${
                        i === 0 ? "w-[2.5rem]" : "flex-1 "
                      }`}
                    >
                      {col}
                    </p>
                  ))}
                  {type && (
                    <div
                      className="flex gap-2 items-center justify-center w-[6rem]"
                      onClick={selectAll}
                    >
                      <p>Select</p>
                      {isAllSelected() ? (
                        <ImCheckboxChecked className="text-sm" />
                      ) : (
                        <ImCheckboxUnchecked className="text-sm" />
                      )}
                    </div>
                  )}
                </div>
                <div className="text-primary-foreground border-t-0 border border-border_color rounded-b-xl capitalize">
                  {data?.map((item, i) => (
                    <div
                      key={i}
                      className={`table-col py-3 ${
                        i === data.length - 1 && "border-none"
                      }`}
                    >
                      <div className="w-[2.5rem] truncate-text">{item.id}</div>
                      <div className="flex-1 truncate-text">
                        {item.employee.name} ({item.employee.id})
                      </div>
                      <div className="flex-1 truncate-text">
                        {item.product.name} ({item.product.id})
                      </div>
                      {/* {method === "challan" && (
                        <div className="flex-1 truncate-text">{item.date}</div>
                      )} */}
                      <div className="flex-1 truncate-text">
                        {item.quantity}
                      </div>
                      <div className="flex-1 truncate-text">
                        {formatNumberWithCommas(item.rate)}
                        <span className="xl:text-sm text-[8px]"> TK</span>
                      </div>
                      <div className="flex-1 truncate-text">
                        {formatNumberWithCommas(item.amount)}
                        <span className="xl:text-sm text-[8px]"> TK</span>
                      </div>
                      <div className="flex-1 truncate-text">{item.date}</div>
                      {type && (
                        <div
                          className="xl:px-4 px-3 text-sm flex items-center w-[6rem] justify-center"
                          onClick={() => {
                            selectHandler(item);
                          }}
                        >
                          {selectedData?.some(
                            (selectedItem) => selectedItem.id === item.id
                          ) ? (
                            <ImCheckboxChecked />
                          ) : (
                            <ImCheckboxUnchecked />
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              type && (
                <div className="text-primary-foreground font-bold text-2xl text-center mt-16">
                  No Data Found
                </div>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BillFilterTable;
