import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/data-table/DataTable";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

export default function LowStockAlerts() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Low Stock Alerts</h1>

      <Alert variant="warning" className="mb-6">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Attention Required</AlertTitle>
        <AlertDescription>
          The following items are running low on stock and may need replenishment.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>Low Stock Items</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable 
            columns={[
              { accessorKey: "product", header: "Product" },
              { accessorKey: "currentStock", header: "Current Stock" },
              { accessorKey: "minimumStock", header: "Minimum Stock" },
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