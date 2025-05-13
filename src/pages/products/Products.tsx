import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table/DataTable";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Products() {
  const navigate = useNavigate();
  const [products] = useState([]);

  return (
    <div className="container mx-auto py-6 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Products</h1>
        <Button onClick={() => navigate("/products/new")}>
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </div>

      <DataTable
        columns={[
          {
            accessorKey: "name",
            header: "Name",
          },
          {
            accessorKey: "category",
            header: "Category",
          },
          {
            accessorKey: "price",
            header: "Price",
          },
          {
            accessorKey: "stock",
            header: "Stock",
          },
        ]}
        data={products}
      />
    </div>
  );
}