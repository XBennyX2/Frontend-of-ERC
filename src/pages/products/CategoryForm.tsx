import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

export default function CategoryForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit = async (data: any) => {
    console.log(data);
    navigate("/categories");
  };

  return (
    <div className="container mx-auto py-6 space-y-4">
      <h1 className="text-3xl font-bold tracking-tight">
        {id ? "Edit Category" : "Add Category"}
      </h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Category name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Category description"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-4">
            <Button type="submit">Save Category</Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/categories")}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}