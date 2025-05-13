import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/data-table/DataTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Cashiers = () => {
  const navigate = useNavigate();
  const [cashiers] = useState([]);

  const columns = [
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'store',
      header: 'Store',
    },
    {
      accessorKey: 'shift',
      header: 'Shift',
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
          <Users className="h-8 w-8" />
          Cashiers
        </h1>
        <Button onClick={() => navigate('/cashiers/new')}>
          <Plus className="h-4 w-4 mr-2" />
          Add Cashier
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Cashier Management</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={cashiers}
            searchPlaceholder="Search cashiers..."
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Cashiers;