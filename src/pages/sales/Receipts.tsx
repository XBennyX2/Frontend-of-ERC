import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/data-table/DataTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const columns = [
  {
    accessorKey: "receiptNumber",
    header: "Receipt #",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "customerName",
    header: "Customer",
  },
  {
    accessorKey: "totalAmount",
    header: "Total Amount",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
];

export default function Receipts() {
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Receipts</h1>
        <Button onClick={() => navigate("/receipts/new")}>
          <Plus className="mr-2 h-4 w-4" />
          New Receipt
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Receipts</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable 
            columns={columns}
            data={[]}
            searchKey="receiptNumber"
          />
        </CardContent>
      </Card>
    </div>
  );
}