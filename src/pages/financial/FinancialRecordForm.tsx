import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Textarea } from "@/components/ui/textarea";

export default function FinancialRecordForm() {
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      date: "",
      type: "",
      amount: "",
      description: "",
      status: "pending"
    }
  });

  const onSubmit = async (data: any) => {
    // Handle form submission
    console.log(data);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight">
          New Financial Record
        </h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Financial Record Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="date" className="text-sm font-medium">Date</label>
                  <Input
                    id="date"
                    type="date"
                    {...form.register("date")}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="type" className="text-sm font-medium">Type</label>
                  <Select
                    onValueChange={(value) => form.setValue("type", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="income">Income</SelectItem>
                      <SelectItem value="expense">Expense</SelectItem>
                      <SelectItem value="transfer">Transfer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="amount" className="text-sm font-medium">Amount</label>
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    {...form.register("amount")}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="status" className="text-sm font-medium">Status</label>
                  <Select
                    onValueChange={(value) => form.setValue("status", value)}
                    defaultValue="pending"
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="col-span-2 space-y-2">
                  <label htmlFor="description" className="text-sm font-medium">Description</label>
                  <Textarea
                    id="description"
                    {...form.register("description")}
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <Button type="submit">Save Record</Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/financial-records")}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}