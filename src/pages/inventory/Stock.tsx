import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/data-table/DataTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Stock() {
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Stock Management</h1>
        <Button onClick={() => navigate("/stock/new")}>
          <Plus className="mr-2 h-4 w-4" />
          Add Stock
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Current Stock</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable 
            columns={[
              { accessorKey: "product", header: "Product" },
              { accessorKey: "quantity", header: "Quantity" },
              { accessorKey: "store", header: "Store" },
              { accessorKey: "lastUpdated", header: "Last Updated" }
            ]}
            data={[]}
          />
        </CardContent>
      </Card>
    </div>
  );
}