import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/providers/theme-provider";

// Auth Components
import Login from "@/pages/auth/Login";

import ProtectedRoute from "@/components/auth/ProtectedRoute";

// Layouts
import DashboardLayout from "@/components/layouts/DashboardLayout";
import AuthLayout from "@/components/layouts/AuthLayout";

// Pages
import Dashboard from "@/pages/Dashboard";
import Profile from "@/pages/user/Profile";

// Product Management
import Products from "@/pages/products/Products";
import ProductForm from "@/pages/products/ProductForm";
import Categories from "@/pages/products/Categories";
import CategoryForm from "@/pages/products/CategoryForm";

// Inventory Management
import Stock from "@/pages/inventory/Stock";
import StockForm from "@/pages/inventory/StockForm";
import StockTransfers from "@/pages/inventory/StockTransfers";
import StockTransferForm from "@/pages/inventory/StockTransferForm";
import LowStockAlerts from "@/pages/inventory/LowStockAlerts";

// Store Management
import Stores from "@/pages/stores/Stores";
import StoreForm from "@/pages/stores/StoreForm";
import Cashiers from "@/pages/stores/Cashiers";
import CashierForm from "@/pages/stores/CashierForm";

// Financial Management
import Transactions from "@/pages/financial/Transactions";
import TransactionForm from "@/pages/financial/TransactionForm";
import FinancialRecords from "@/pages/financial/FinancialRecords";
import FinancialRecordForm from "@/pages/financial/FinancialRecordForm";

// Sales Management
import Receipts from "@/pages/sales/Receipts";
import ReceiptForm from "@/pages/sales/ReceiptForm";
import Orders from "@/pages/sales/Orders";
import OrderForm from "@/pages/sales/OrderForm";

import { AuthProvider } from "@/contexts/AuthContext";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  useEffect(() => {
    // Update the document title
    document.title = "Buildsync Inventory Management";
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="inventory-theme">
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              {/* Auth Routes */}
              <Route element={<AuthLayout />}>
                <Route path="/login" element={<Login />} />
              </Route>

              {/* Protected Routes */}
              <Route
                element={
                  <ProtectedRoute>
                    <DashboardLayout />
                  </ProtectedRoute>
                }
              >
                <Route path="/" element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />

                {/* Product Management */}
                <Route path="/products" element={<Products />} />
                <Route path="/products/new" element={<ProductForm />} />
                <Route path="/products/:id" element={<ProductForm />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/categories/new" element={<CategoryForm />} />
                <Route path="/categories/:id" element={<CategoryForm />} />

                {/* Inventory Management */}
                <Route path="/stock" element={<Stock />} />
                <Route path="/stock/new" element={<StockForm />} />
                <Route path="/stock/:id" element={<StockForm />} />
                <Route path="/stock-transfers" element={<StockTransfers />} />
                <Route
                  path="/stock-transfers/new"
                  element={<StockTransferForm />}
                />
                <Route
                  path="/stock-transfers/:id"
                  element={<StockTransferForm />}
                />
                <Route path="/low-stock-alerts" element={<LowStockAlerts />} />

                {/* Store Management */}
                <Route path="/stores" element={<Stores />} />
                <Route path="/stores/new" element={<StoreForm />} />
                <Route path="/stores/:id" element={<StoreForm />} />
                <Route path="/cashiers" element={<Cashiers />} />
                <Route path="/cashiers/new" element={<CashierForm />} />
                <Route path="/cashiers/:id" element={<CashierForm />} />

                {/* Financial Management */}
                <Route path="/transactions" element={<Transactions />} />
                <Route path="/transactions/new" element={<TransactionForm />} />
                <Route path="/transactions/:id" element={<TransactionForm />} />
                <Route
                  path="/financial-records"
                  element={<FinancialRecords />}
                />
                <Route
                  path="/financial-records/new"
                  element={<FinancialRecordForm />}
                />
                <Route
                  path="/financial-records/:id"
                  element={<FinancialRecordForm />}
                />

                {/* Sales Management */}
                <Route path="/receipts" element={<Receipts />} />
                <Route path="/receipts/new" element={<ReceiptForm />} />
                <Route path="/receipts/:id" element={<ReceiptForm />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/orders/new" element={<OrderForm />} />
                <Route path="/orders/:id" element={<OrderForm />} />
              </Route>

              {/* Redirect */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            <Toaster position="top-right" />
          </AuthProvider>
        </BrowserRouter>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
