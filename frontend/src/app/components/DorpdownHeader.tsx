import React from "react";

const DorpdownHeader = ({
  type,
}: {
  type:
    | "product"
    | "employee"
    | "production"
    | "status"
    | "customer"
    | "Method"
    | "categories"
    | "unit";
}) => {
  return (
    <div className="table-header py-3">
      {type === "employee" && (
        <>
          <div className="w-1/6">ID</div>
          <div className="flex-1 truncate-text">Name</div>
          <div className="flex-1 truncate-text">Mobile</div>
        </>
      )}
      {type === "product" && (
        <>
          <div className="w-1/6">ID</div>
          <div className="flex-1 truncate-text">Name</div>
          <div className="flex-1 truncate-text">Rate</div>
        </>
      )}

      {type === "production" && (
        <>
          <div className="w-1/6">ID</div>
          <div className="flex-1 truncate-text">Product</div>
          <div className="flex-1 truncate-text">Employee</div>
          <div className="flex-1 truncate-text">Quantity</div>
        </>
      )}

      {type === "status" && (
        <>
          <div className="w-1/6">ID</div>
          <div className="flex-1 truncate-text">Status</div>
        </>
      )}

      {type === "customer" && (
        <>
          <div className="w-1/6">ID</div>
          <div className="flex-1 truncate-text">Name</div>
          <div className="flex-1 truncate-text">Company Name</div>
        </>
      )}

      {type === "categories" && (
        <>
          <div className="flex-1 truncate-text">Name</div>
          <div className="flex-1 truncate-text">Unit</div>
          <div className="w-[2rem] truncate-text"></div>
        </>
      )}

      {type === "Method" && <div>Method</div>}

      {type === "unit" && <div>Unit</div>}
    </div>
  );
};

export default DorpdownHeader;
