import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/data-table/DataTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function StockTransfers() {
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Stock Transfers</h1>
        <Button onClick={() => navigate("/stock-transfers/new")}>
          <Plus className="mr-2 h-4 w-4" />
          New Transfer
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Transfer History</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable 
            columns={[
              { accessorKey: "transferId", header: "Transfer ID" },
              { accessorKey: "fromStore", header: "From Store" },
              { accessorKey: "toStore", header: "To Store" },
              { accessorKey: "product", header: "Product" },
              { accessorKey: "quantity", header: "Quantity" },
              { accessorKey: "status", header: "Status" },
              { accessorKey: "date", header: "Date" }
            ]}
            data={[]}
          />
        </CardContent>
      </Card>
    </div>
  );
}