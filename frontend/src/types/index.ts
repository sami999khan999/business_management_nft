export type UserType = {
  name: string | undefined;
  email: string;
  password: string;
  confirmPassword: string | undefined;
};

export type SignupUserType = {
  name: string | undefined;
  email: string;
  password: string;
};

export type LoginUserType = {
  email: string;
  password: string;
};

export type EmployeeType = {
  id: number;
  name: string;
  address: string;
  mobile: string;
  nid_no?: string;
};

export type CreateEmployeeType = {
  name: string;
  address: string;
  mobile: string;
  nid_no?: string | undefined;
};

export type CustomerType = {
  id: number;
  name: string;
  company_name: string;
  address: string;
  mobile: string;
};

export type CreateCustomerType = {
  name: string;
  company_name?: string;
  address: string;
  mobile: string;
};

export type ProductType = {
  id: number;
  name: string;
  rate: number;
  category: string;
  production_cost: number;
  other_cost: number;
};

export type CreateProductType = {
  name: string;
  rate: number | undefined;
  category: number | undefined;
  production_cost: number | undefined;
  other_cost: number | undefined;
};

export type CategoryType = {
  id: number;
  name: string;
};

export type reateCategoryType = {
  name: string;
};

export type PorductionType = {
  id: number;
  product: {
    id: number;
    name: string;
    rate?: number;
  };
  employee: {
    id: number;
    name: string;
  };
  quantity: number;
  rate: number;
  date: string;
  payment: string;
};

export type CreatePorductionType = {
  employee: number | undefined;
  product: number | undefined;
  quantity: number | undefined;
};

export type InventoryType = {
  id: number;
  product: {
    id: number;
    name: string;
  };
  employee: {
    id: number;
    name: string;
  };
  production: number;
  quantity: string;
  status: "IN-STOCK" | "OUT-OF-STOCK";
  date: string;
};

export type CreateInventoryType = {
  production: number | undefined;
  current_status: string | undefined;
};

export type SelectInventoryType = {
  id: number;
  employee: {
    id: number;
    name: string;
  };
  product: {
    id: number;
    name: string;
  };
  production: {
    id: number;
    quantity: number;
  };
};

export type InvoiceType = {
  id: number;
  products: string;
  customer: {
    id: number;
    name: string;
  };
  quantity: string;
  current_status: string;
  total: string;
  date: string;
};

export type CreateInvoiceType = {
  customer_id: number | undefined;
  inventory_id: number[] | undefined;
  date: string | undefined;
};

export type InvoiceColomn = {
  employee: string;
  product: string;
  quantity: string;
  total: number;
};

export type InvoiceDataType = {
  challan_no: number;
  customer_address: string;
  customer_company: string;
  customer_name: string;
  date: string;
  grand_total: number;
  total_column: InvoiceColomn[];
};

export type FilteredBill = {
  id: number;
  employee: {
    id: number;
    name: string;
  };
  product: {
    id: number;
    name: string;
    category: string;
  };
  // challan?: {
  //   id: number;
  //   date: string;
  // };
  date: string;
  quantity: number;
  rate: number;
  amount: number;
};

export type EmployeeBillFilterParametersType = {
  employee: number | undefined;
  challan: number[] | string | undefined;
  filter_method: string | undefined;
};

export type EmployeeBillType = {
  id: number;
  employee: {
    id: number;
    name: string;
  };
  products: string;
  production: string;
  quantity: string;
  Amount: string;
  current_status: string;
  date: string;
};

export type SingleEmployeeBillDataType = {
  amount: number;
  products: string;
  quantity: string;
  rate: number;
  sl_no: number;
  total_qty: number;
};

export type SingleEmployeeBillType = {
  employee: {
    id: number;
    name: string;
  };
  grand_total: number;
  data: SingleEmployeeBillDataType[];
  date: string;
};

export type FilterMemoType = {
  id: number;
  products: string;
  quantity: number;
  total: string;
  amount: string;
  current_status: string;
  date: string;
};

export type MemoType = {
  id: number;
  challan_no: number[];
  customer: {
    id: number;
    name: string;
  };
  products: string[];
  total_qty: string;
  amount: number;
  date: string;
};

export type MemoHeadingType = {
  address: string;
  customer: string;
  date: string;
  memo_id: number;
  total_amount: number;
  total_after_discount: number;
};

export type MemoColumnType = {
  amount: number;
  challan?: number[];
  date?: string;
  products: string;
  quantity: number;
  rate: number;
  slno?: number;
  challanid?: number;
};

export type DashboardProductionType = {
  employee: {
    id: number | undefined;
    name: string | undefined;
  };

  product: {
    id: number | undefined;
    name: string | undefined;
  };
  quantity: string;
};

export type DashboardProductionCreateType = {
  employee: number | undefined;
  product: number | undefined;
  qty: string;
};

export type SympleInvoiceCreateType = {
  customer: number;
  production: {
    employee: number | undefined;
    product: number | undefined;
    qty: string;
  }[];
};

export type DashboardData = {
  employee: {
    totalEmployee: number;
    activeEmployee: number;
    employeeOftheMonth: {
      name: string;
      id: number;
      totalEarned: number;
      producedUnites: number;
    };
    topEmployees: {
      name: string;
      id: number;
    }[];
  };
  invoice: {
    receivedPayment: number;
    pending: number;
    total: number;
  };
  inventory: {
    inStock: number;
    sold: number;
    total: number;
  };
  totalCustomer: number;
  production: {
    totalProduction: number;
    totalProductionInAMounth: number;
    // paid: number;
    due: number;
  };
  products: {
    totalProducts: number;
    topSoledProducts: {
      name: string;
      id: number;
      soldUnits: number;
    };
  };
  totalCategory: number;
};

export type DropdownType = {
  id?: number | string;
  name?: string;
  rate?: number | string;
  catagory_name?: string;

  address?: string;
  mobile?: string;
  nid_no?: string;

  product?: {
    id?: number | undefined;
    name?: string | undefined;
    rate?: number;
  };
  employee?: {
    id?: number | undefined;
    name?: string | undefined;
  };
  quantity?: number | string;

  status?: string;

  company_name?: string;

  method?: string;

  unit?: string;
};

export type DeleteDataType = {
  id?: number;
  products?: string;
  customer?: string;
  quantity?: string;
  current_status?: string;
  total?: string;
  date?: string;
  employee?: string;
  amount?: string | number;
  status?: string;
  total_qty?: string;
};
