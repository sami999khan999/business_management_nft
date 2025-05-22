"use client";

import { createCategory } from "@/utils/categoryApiRequests";
import React, { SetStateAction, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Dropdown from "./Dropdown";

const categoryUnit = [{ unit: "pcs" }, { unit: "yds" }];

const CreateCategoryModal = ({
  setCreateCategoryModalisOpen,
  setReload,
}: {
  setCreateCategoryModalisOpen: React.Dispatch<SetStateAction<boolean>>;
  setReload: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const [categoryInput, setCategoryInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUnit, setSelectedUnit] = useState<string | undefined>();
  const [unitSelectionError, setUnitSeelectionError] = useState("");
  const [categoryInputError, setCategoryInputError] = useState("");

  const addCtegory = async () => {
    const error = {
      category: "",
      unit: "",
    };

    if (!categoryInput) {
      error.category = "Category name is required";
    }

    if (!selectedUnit) {
      error.unit = "Unit is required";
    }

    if (error.category || error.unit) {
      setCategoryInputError(error.category);
      setUnitSeelectionError(error.unit);
      return;
    }

    const category = {
      name: categoryInput,
      unit: selectedUnit,
    };

    const response = await createCategory(category);

    if (response.success) {
      setReload((prv) => !prv);
      setCategoryInput("");
      setCreateCategoryModalisOpen((prv) => !prv);
    } else {
      console.log(response.message);
    }
  };

  return (
    <div className="absolute z-50 top-0 left-0 w-full h-full backdrop-blur-md flex items-center justify-center">
      <div className="w-[95%] xl:w-[60%] bg-secondary rounded-xl relative px-5 py-10 border border-border_color">
        <h2 className="text-2xl xl:text-3xl font-semibold text-center font-sour_gummy text-primary">
          Create Category
        </h2>
        <div
          className="close-btn"
          onClick={() => {
            setCreateCategoryModalisOpen((prv) => !prv);
          }}
        >
          <IoMdClose className="transition-transform hover:rotate-90 origin-center" />
        </div>

        <div className="flex flex-col xl:flex-row gap-2 mt-8">
          <div className="xl:w-[30%] w-full">
            <Dropdown
              type="unit"
              data={categoryUnit}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              setSelectionError={setUnitSeelectionError}
              setValue={setSelectedUnit}
            />
            <p className="error_message">{unitSelectionError}</p>
          </div>
          <input
            type="text"
            className="inputfield"
            placeholder="Enter Category Name"
            onChange={(e) => setCategoryInput(e.target.value)}
          />
          <p className="error_message">{categoryInputError}</p>
        </div>
        <button className="submit-btn" onClick={addCtegory}>
          Create Category
        </button>
      </div>
    </div>
  );
};

export default CreateCategoryModal;
