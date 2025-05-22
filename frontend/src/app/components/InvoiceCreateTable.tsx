import { SelectInventoryType } from "@/types";
import React, { SetStateAction } from "react";
import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im";

const InvoiceCreateTable = ({
  type,
  setFilterdInventoryIds,
  filterdInventoryIds,
  inventories,
  setFilterdInventory,
  filterdInventory,
}: {
  type: "selection" | "selected";
  setFilterdInventoryIds?: React.Dispatch<SetStateAction<number[] | undefined>>;
  filterdInventoryIds?: number[] | undefined;
  inventories: SelectInventoryType[] | undefined;
  setFilterdInventory?: React.Dispatch<
    SetStateAction<SelectInventoryType[] | undefined>
  >;
  filterdInventory?: SelectInventoryType[] | undefined;
}) => {
  const handleSelect = (inventory: SelectInventoryType) => {
    if (setFilterdInventoryIds) {
      if (filterdInventoryIds?.includes(inventory.id)) {
        setFilterdInventoryIds((prv) =>
          prv?.filter((item) => item !== inventory.id)
        );
      } else {
        setFilterdInventoryIds((prv) =>
          prv ? [...prv, inventory.id] : [inventory.id]
        );
      }
    }

    if (setFilterdInventory) {
      if (filterdInventoryIds?.includes(inventory.id)) {
        setFilterdInventory((prv) =>
          prv?.filter((item) => item.id !== inventory.id)
        );
      } else {
        setFilterdInventory((prv) => (prv ? [...prv, inventory] : [inventory]));
      }
    }
  };

  const isAllSelected = () => {
    if (filterdInventory && inventories) {
      const isAllSelected = inventories.every((item1) =>
        filterdInventory.some((item2) => item1.id === item2.id)
      );
      return isAllSelected;
    } else {
      return false;
    }
  };

  const handelAllSelect = () => {
    if (inventories) {
      if (!filterdInventory || filterdInventory.length === 0) {
        if (setFilterdInventory) setFilterdInventory(inventories);
        if (setFilterdInventoryIds)
          setFilterdInventoryIds(inventories.map((item) => item.id));
      }

      if (isAllSelected()) {
        if (setFilterdInventory) {
          setFilterdInventory((prev) =>
            prev
              ? prev.filter(
                  (item) =>
                    !inventories.some((inventory) => inventory.id === item.id)
                )
              : []
          );
        }

        if (setFilterdInventoryIds) {
          setFilterdInventoryIds((prev) =>
            prev
              ? prev.filter(
                  (id) => !inventories.some((inventory) => inventory.id === id)
                )
              : []
          );
        }
      } else {
        if (setFilterdInventory) {
          setFilterdInventory((prev) => {
            if (prev) {
              const newItems = inventories.filter(
                (inventory) => !prev.some((item) => item.id === inventory.id)
              );
              return [...prev, ...newItems];
            } else {
              return inventories;
            }
          });
        }

        if (setFilterdInventoryIds) {
          setFilterdInventoryIds((prev) => {
            if (prev) {
              const newIds = inventories
                .filter((inventory) => !prev.includes(inventory.id))
                .map((inventory) => inventory.id);
              return [...prev, ...newIds];
            } else {
              return inventories.map((item) => item.id);
            }
          });
        }
      }
    }
  };

  return (
    <div className="overflow-auto remove-scrollbar">
      {inventories ? (
        <div className="h-[15rem] xl:h-[18rem] w-[40rem] xl:w-full">
          <div className="table-header py-4 z-20">
            <p className="w-1/12 truncate-text">ID</p>
            <p className="flex-1 truncate-text">Employee</p>
            <p className="flex-1 truncate-text">Product</p>
            <p className="flex-1 truncate-text">Production</p>
            <p className="flex-1 truncate-text">Quantity</p>
            {type === "selection" && (
              <div
                className="flex gap-2 justify-center items-center w-[6rem] "
                onClick={handelAllSelect}
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
          <div className="border rounded-b-xl border-t-0 border-border_color">
            {inventories?.map((inventory, i) => (
              <div
                key={i}
                className={`table-col py-2 ${
                  i === inventories.length - 1 && "border-none"
                }`}
              >
                <div className="w-1/12 truncate-text">{inventory.id}</div>
                <div className="flex-1 truncate-text">
                  {inventory.employee.name}
                </div>
                <div className="flex-1 truncate-text">
                  {inventory.product.id}
                </div>
                <div className="flex-1 truncate-text">
                  {inventory.production.id}
                </div>
                <div className="flex-1 truncate-text">
                  {inventory.production.quantity}
                </div>
                {type === "selection" && (
                  <div
                    className="px-3 w-[6rem] flex items-center justify-center cursor-pointer text-sm"
                    onClick={() => handleSelect(inventory)}
                  >
                    <div className="">
                      {filterdInventoryIds?.includes(inventory.id) ? (
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
        <div></div>
      )}
    </div>
  );
};

export default InvoiceCreateTable;
