import MemoTable from "@/app/components/MemoTable";

const page = () => {
  return (
    <div>
      {/* <Suspense fallback={<div className="text-primary-foreground"></div>}> */}
      <MemoTable />
      {/* </Suspense> */}
    </div>
  );
};

export default page;
