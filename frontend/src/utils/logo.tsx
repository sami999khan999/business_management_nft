import { CiMemoPad } from "react-icons/ci";
import { FaFileInvoice } from "react-icons/fa";
import { GrUserWorker } from "react-icons/gr";
import { LuFactory } from "react-icons/lu";
import {
  MdDashboard,
  MdOutlineInventory,
  MdOutlinePayment,
  MdOutlineProductionQuantityLimits,
} from "react-icons/md";
import { RiCustomerServiceFill } from "react-icons/ri";

export const logo = {
  Dashboard: <MdDashboard />,
  Products: <MdOutlineProductionQuantityLimits />,
  Production: <LuFactory />,
  Inventory: <MdOutlineInventory />,
  Employees: <GrUserWorker />,
  Customers: <RiCustomerServiceFill />,
  Invoice: <FaFileInvoice />,
  Payment: <MdOutlinePayment />,
  Memo: <CiMemoPad />,
};
