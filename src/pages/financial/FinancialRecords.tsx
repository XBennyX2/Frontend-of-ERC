import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/data-table/DataTable";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const columns = [
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "status",
    header: "Status",
  }
];

export default function FinancialRecords() {
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Financial Records</h1>
        <Button onClick={() => navigate("/financial-records/new")}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Record
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Financial Records</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable 
            columns={columns}
            data={[]}
            searchKey="description"
          />
        </CardContent>
      </Card>
    </div>
  );
}