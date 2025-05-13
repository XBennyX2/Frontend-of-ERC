import { useParams, useNavigate } from 'react-router-dom';
import { Building2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const StoreForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center gap-2 mb-6">
        <Building2 className="h-8 w-8" />
        <h1 className="text-3xl font-bold tracking-tight">
          {isEditing ? 'Edit Store' : 'Add New Store'}
        </h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Store Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Store Name</Label>
              <Input id="name" placeholder="Enter store name" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" placeholder="Enter store location" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="manager">Store Manager</Label>
              <Input id="manager" placeholder="Enter manager name" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select store status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="maintenance">Under Maintenance</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Enter store description"
                className="min-h-[100px]"
              />
            </div>

            <div className="flex gap-4">
              <Button type="submit">
                {isEditing ? 'Update Store' : 'Create Store'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/stores')}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default StoreForm;