import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/data-table/DataTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Stores = () => {
  const navigate = useNavigate();
  const [stores] = useState([]);

  const columns = [
    {
      accessorKey: 'name',
      header: 'Store Name',
    },
    {
      accessorKey: 'location',
      header: 'Location',
    },
    {
      accessorKey: 'manager',
      header: 'Manager',
    },
    {
      accessorKey: 'status',
      header: 'Status',
    },
  ];

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <Building2 className="h-8 w-8" />
          Stores
        </h1>
        <Button onClick={() => navigate('/stores/new')}>
          <Plus className="h-4 w-4 mr-2" />
          Add Store
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Store Management</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={stores}
            searchPlaceholder="Search stores..."
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Stores;