import { FilterMemoType } from "@/types";
import { formatNumberWithCommas } from "@/utils/numberFormat";
import React, { SetStateAction } from "react";
import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im";

const MemoFilterTable = ({
  data,
  type,
  setSelectedData,
  selectedData,
  setSelectedId,
}: {
  data: FilterMemoType[];
  type: "selection" | "selected";
  setSelectedData: React.Dispatch<SetStateAction<FilterMemoType[] | undefined>>;
  selectedData: FilterMemoType[] | undefined;
  setSelectedId?: React.Dispatch<SetStateAction<number[] | undefined>>;
}) => {
  const handleCheckboxChange = (item: FilterMemoType) => {
    if (selectedData?.some((selectedItem) => selectedItem.id === item.id)) {
      setSelectedData((prevData) =>
        prevData?.filter((selectedItem) => selectedItem.id !== item.id)
      );
      if (setSelectedId)
        setSelectedId((prevId) => prevId?.filter((id) => id !== item.id));
    } else {
      setSelectedData((prevData) => (prevData ? [...prevData, item] : [item]));
      if (setSelectedId)
        setSelectedId((prevId) => (prevId ? [...prevId, item.id] : [item.id]));
    }
  };

  const isAllSelected = () => {
    return data.every((item) =>
      selectedData?.some((selItem) => selItem.id === item.id)
    );
  };

  const allSelect = () => {
    if (isAllSelected()) {
      // Clear all selected data and IDs
      if (setSelectedData) setSelectedData([]);
      if (setSelectedId) setSelectedId([]);
    } else {
      if (data && setSelectedData) {
        setSelectedData((prv) => {
          if (prv) {
            const newItems = data.filter(
              (item1) => !prv.some((item2) => item1.id === item2.id)
            );
            const updatedData = [...prv, ...newItems];

            if (setSelectedId) {
              const selectedIds = updatedData.map((item) => item.id);
              setSelectedId(selectedIds);
            }

            return updatedData;
          } else {
            const allData = data;

            if (setSelectedId) {
              const selectedIds = allData.map((item) => item.id);
              setSelectedId(selectedIds);
            }

            return allData;
          }
        });
      }
    }
  };

  return (
    <div className="overflow-y-auto remove-scrollbar">
      {data.length > 0 ? (
        <div className="h-[15rem] xl:h-[22rem] xl:w-full w-[35rem]">
          <div className="table-header pt-4 sticky top-0 z-20">
            <p className="w-1/12 truncate-text">ID</p>
            <p className="flex-1 truncate-text">products</p>
            <p className="flex-1 truncate-text">quantity</p>
            <p className="flex-1 truncate-text">total</p>
            <p className="flex-1 truncate-text">amount</p>
            <p className="flex-1 truncate-text">Date</p>
            {type === "selection" && (
              <div
                className="w-[6rem] flex items-center justify-center space-x-2"
                onClick={allSelect}
              >
                <p>Select</p>
                {isAllSelected() ? (
                  <ImCheckboxChecked className="text-sm " />
                ) : (
                  <ImCheckboxUnchecked className="text-sm " />
                )}
              </div>
            )}
          </div>
          <div className="border rounded-b-xl border-t-0 border-border_color">
            {data.map((item, i) => (
              <div
                key={i}
                className={`table-col py-3 ${
                  i === data.length - 1 && "border-none"
                }`}
              >
                <p className="w-1/12 truncate-text">{item.id}</p>
                <p className="flex-1 truncate-text">{item.products}</p>
                <p className="flex-1 truncate-text">{item.quantity}</p>
                <p className="flex-1 truncate-text">{item.total}</p>
                <p className="flex-1 truncate-text">
                  {formatNumberWithCommas(Number(item.amount))}
                  <span className="xl:text-sm text-[8px]"> TK</span>
                </p>
                <p className="flex-1 truncate-text">{item.date}</p>
                {type === "selection" && (
                  <div className="w-[6rem] flex items-center text-sm justify-center cursor-pointer">
                    <div onClick={() => handleCheckboxChange(item)}>
                      {selectedData?.some(
                        (selectedItem) => selectedItem.id === item.id
                      ) ? (
                        <ImCheckboxChecked />
                      ) : (
                        <ImCheckboxUnchecked />
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="h-[15rem] xl:h-[24rem] text-primary-foreground font-bold xl:text-3xl text-xl text-center    mt-4">
          <p className="pt-10">No Data Found</p>
        </div>
      )}
    </div>
  );
};

export default MemoFilterTable;
