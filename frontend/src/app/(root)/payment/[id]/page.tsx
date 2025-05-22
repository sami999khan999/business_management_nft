import EmployeePayment from "@/app/components/EmployeePayment";
import React from "react";

const page = async ({ params }: { params: Promise<{ id: number }> }) => {
  const { id } = await params;

  return (
    <div>
      <EmployeePayment id={id} />
    </div>
  );
};

export default page;
