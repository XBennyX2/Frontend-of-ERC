import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { format } from 'date-fns';
import {
  AlertTriangle,
  BarChart3,
  CreditCard,
  DollarSign,
  Package,
  RefreshCcw,
  ShoppingCart,
  Store,
  TrendingDown,
  TrendingUp,
} from 'lucide-react';

const colors = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))', 'hsl(var(--chart-5))'];

// Mock data - would be replaced with actual API calls
const salesData = [
  { name: 'Jan', value: 1200 },
  { name: 'Feb', value: 1900 },
  { name: 'Mar', value: 1500 },
  { name: 'Apr', value: 2400 },
  { name: 'May', value: 2700 },
  { name: 'Jun', value: 2100 },
  { name: 'Jul', value: 3200 },
];

const inventoryData = [
  { name: 'Electronics', value: 40 },
  { name: 'Apparel', value: 20 },
  { name: 'Home Goods', value: 15 },
  { name: 'Food & Beverage', value: 25 },
];

const lowStockItems = [
  { id: 1, name: 'Smartphone X', current: 3, minimum: 5 },
  { id: 2, name: 'Wireless Earbuds', current: 2, minimum: 10 },
  { id: 3, name: 'HD Monitor 24"', current: 1, minimum: 5 },
];

const recentTransactions = [
  { id: 1, ref: 'TX123', customer: 'John Doe', amount: 129.99, date: '2025-03-15T10:30:00' },
  { id: 2, ref: 'TX124', customer: 'Jane Smith', amount: 89.95, date: '2025-03-15T11:45:00' },
  { id: 3, ref: 'TX125', customer: 'Bob Johnson', amount: 199.50, date: '2025-03-14T15:20:00' },
  { id: 4, ref: 'TX126', customer: 'Alice Brown', amount: 65.25, date: '2025-03-14T09:15:00' },
];

const Dashboard = () => {
  const { user } = useAuth();
  const [timeRange, setTimeRange] = useState('weekly');

  // Simulate data fetching with React Query
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['dashboardStats', timeRange],
    queryFn: () => {
      // This would be replaced with actual API call
      return Promise.resolve({
        totalSales: 24580,
        totalOrders: 145,
        averageOrderValue: 169.52,
        topSellingProducts: [
          { name: 'Smartphone X', quantity: 24, revenue: 23976 },
          { name: 'Wireless Earbuds', quantity: 36, revenue: 3240 },
          { name: 'HD Monitor 24"', quantity: 12, revenue: 3588 },
        ],
      });
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Greeting based on time of day
  const getCurrentGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {getCurrentGreeting()}, {user?.firstName || 'User'}
          </h1>
          <p className="text-muted-foreground">
            Here's what's happening with your inventory today.
          </p>
        </div>
        <Tabs value={timeRange} onValueChange={setTimeRange} className="w-full md:w-auto">
          <TabsList>
            <TabsTrigger value="daily">Daily</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Key metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {statsLoading ? (
              <Skeleton className="h-8 w-32" />
            ) : (
              <>
                <div className="text-2xl font-bold">{formatCurrency(stats?.totalSales || 0)}</div>
                <div className="flex items-center pt-1 text-xs text-muted-foreground">
                  <TrendingUp className="mr-1 h-3 w-3 text-emerald-500" />
                  <span className="text-emerald-500">+12.5%</span>
                  <span className="ml-1">from last {timeRange}</span>
                </div>
              </>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {statsLoading ? (
              <Skeleton className="h-8 w-32" />
            ) : (
              <>
                <div className="text-2xl font-bold">{stats?.totalOrders}</div>
                <div className="flex items-center pt-1 text-xs text-muted-foreground">
                  <TrendingUp className="mr-1 h-3 w-3 text-emerald-500" />
                  <span className="text-emerald-500">+8.2%</span>
                  <span className="ml-1">from last {timeRange}</span>
                </div>
              </>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Avg. Order Value</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {statsLoading ? (
              <Skeleton className="h-8 w-32" />
            ) : (
              <>
                <div className="text-2xl font-bold">{formatCurrency(stats?.averageOrderValue || 0)}</div>
                <div className="flex items-center pt-1 text-xs text-muted-foreground">
                  <TrendingDown className="mr-1 h-3 w-3 text-red-500" />
                  <span className="text-red-500">-3.1%</span>
                  <span className="ml-1">from last {timeRange}</span>
                </div>
              </>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Low Stock Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {statsLoading ? (
              <Skeleton className="h-8 w-32" />
            ) : (
              <>
                <div className="text-2xl font-bold">{lowStockItems.length}</div>
                <div className="flex items-center pt-1 text-xs text-muted-foreground">
                  <RefreshCcw className="mr-1 h-3 w-3" />
                  <span>Updated just now</span>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Low stock alerts */}
      {lowStockItems.length > 0 && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Low Stock Warning</AlertTitle>
          <AlertDescription>
            You have {lowStockItems.length} items below minimum stock levels. Please review them in the Low Stock Alerts section.
          </AlertDescription>
        </Alert>
      )}

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Sales Overview</CardTitle>
            <CardDescription>Sales trends over the past 7 months</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salesData} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value) => formatCurrency(Number(value))}
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}
                  />
                  <Bar dataKey="value" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Inventory by Category</CardTitle>
            <CardDescription>Current stock levels by product category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={inventoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                    label={(entry) => `${entry.name}: ${entry.value}%`}
                    labelLine={false}
                  >
                    {inventoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent transactions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>Your most recent sales transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left text-sm font-medium text-muted-foreground">Reference</th>
                  <th className="text-left text-sm font-medium text-muted-foreground">Customer</th>
                  <th className="text-left text-sm font-medium text-muted-foreground">Amount</th>
                  <th className="text-left text-sm font-medium text-muted-foreground">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentTransactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b last:border-0">
                    <td className="py-3 text-sm">{transaction.ref}</td>
                    <td className="py-3 text-sm">{transaction.customer}</td>
                    <td className="py-3 text-sm">{formatCurrency(transaction.amount)}</td>
                    <td className="py-3 text-sm">
                      {format(new Date(transaction.date), 'MMM dd, yyyy h:mm a')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;