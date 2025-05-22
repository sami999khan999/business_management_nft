"use client";

import { CategoryType } from "@/types";
import { categoryDelete, getCategories } from "@/utils/categoryApiRequests";
import React, { SetStateAction, useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import Dropdown from "./Dropdown";

const CategoryDropdown = ({
  setReload,
  reload,
  // selectedCategory,
  setSelectedCategory,
  setCategoryId,
  setCreateCategoryModalisOpen,
}: {
  setReload: React.Dispatch<SetStateAction<boolean>>;
  reload: boolean;
  // selectedCategory: string | undefined;
  setSelectedCategory: React.Dispatch<SetStateAction<string | undefined>>;
  setCategoryId: React.Dispatch<SetStateAction<number | undefined>>;
  setCreateCategoryModalisOpen: React.Dispatch<SetStateAction<boolean>>;
}) => {
  // const [dropdownOpen, setDropdownOpen] = useState(false);
  // const [inputIsOpen, setInputOpen] = useState(false);
  const [categories, setCategories] = useState<CategoryType[]>();
  const [categoriesCurrentPage, setCategoriesCurrentPage] = useState(1);

  // const handleCategoryClick = (category: string, event: React.MouseEvent) => {
  //   event.stopPropagation();
  //   setDropdownOpen(false);
  //   setSelectedCategory(category);
  // };

  // const handleBackdropClick = () => {
  //   setDropdownOpen(false);
  //   setInputOpen(false);
  // };

  const deleteCategory = async (id: number) => {
    console.log(id);
    const response = await categoryDelete(id);

    if (response.success) {
      setReload((prv) => !prv);
      console.log(response);
    } else {
      console.log(response.message);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await getCategories();

      if (response.success) {
        setCategories(response.data);
      }
    };

    fetchCategories();
  }, [reload]);

  console.log(categories);

  return (
    <>
      <div className="flex justify-center items-center">
        <div className="items-center space-y-4 w-full">
          <Dropdown
            currentPage={categoriesCurrentPage}
            setCurrentPage={setCategoriesCurrentPage}
            data={categories}
            type="categories"
            setId={setCategoryId}
            setValue={setSelectedCategory}
            deleteHandler={deleteCategory}
          />
          <div>
            <div
              className="py-2 xl:text-lg flex items-center gap-3 w-full bg-secondary-foreground text-primary-foreground justify-center border border-border_color duration-200 cursor-pointer rounded-full mt-2 shadow-sm"
              onClick={() => setCreateCategoryModalisOpen((prv) => !prv)}
            >
              <p>Add Category</p>
              <IoMdAdd />
            </div>
          </div>
          {/* {inputIsOpen && <CreateCategoryModal />} */}
        </div>
      </div>

      {/* {(dropdownOpen || inputIsOpen) && (
        <div
          className="absolute top-0 left-0 w-full h-full"
          onClick={handleBackdropClick}
        ></div>
      )} */}
    </>
  );
};

export default CategoryDropdown;
