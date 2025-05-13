// User Types
export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  avatarUrl?: string;
  isActive: boolean;
  dateJoined: string;
  lastLogin?: string;
}

export enum UserRole {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  CASHIER = 'CASHIER'
}

// Auth Types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface AuthTokens {
  access: string;
  refresh: string;
}

export interface AuthState {
  user: User | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Category Types
export interface Category {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

// Product Types
export interface Product {
  id: number;
  name: string;
  description: string;
  sku: string;
  barcode: string;
  price: number;
  costPrice: number;
  categoryId: number;
  category?: Category;
  imageUrl?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Store Types
export interface Store {
  id: number;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  email: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Stock Types
export interface Stock {
  id: number;
  productId: number;
  product?: Product;
  storeId: number;
  store?: Store;
  quantity: number;
  minimumLevel: number;
  createdAt: string;
  updatedAt: string;
}

// Stock Transfer Types
export interface StockTransferRequest {
  id: number;
  sourceStoreId: number;
  sourceStore?: Store;
  destinationStoreId: number;
  destinationStore?: Store;
  productId: number;
  product?: Product;
  quantity: number;
  status: TransferStatus;
  requestedById: number;
  requestedBy?: User;
  approvedById?: number;
  approvedBy?: User;
  requestDate: string;
  approvalDate?: string;
  notes?: string;
}

export enum TransferStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

// Low Stock Alert Types
export interface LowStockAlert {
  id: number;
  stockId: number;
  stock?: Stock;
  currentLevel: number;
  minimumLevel: number;
  alertDate: string;
  isResolved: boolean;
  resolvedDate?: string;
  notes?: string;
}

// Cashier Types
export interface Cashier {
  id: number;
  userId: number;
  user?: User;
  storeId: number;
  store?: Store;
  hireDate: string;
  isActive: boolean;
}

// Transaction Types
export interface Transaction {
  id: number;
  cashierId: number;
  cashier?: Cashier;
  amount: number;
  transactionType: TransactionType;
  paymentMethod: PaymentMethod;
  referenceNumber?: string;
  transactionDate: string;
  notes?: string;
}

export enum TransactionType {
  SALE = 'SALE',
  REFUND = 'REFUND',
  PAYMENT = 'PAYMENT',
  DEPOSIT = 'DEPOSIT',
  WITHDRAWAL = 'WITHDRAWAL',
  ADJUSTMENT = 'ADJUSTMENT'
}

export enum PaymentMethod {
  CASH = 'CASH',
  CREDIT_CARD = 'CREDIT_CARD',
  DEBIT_CARD = 'DEBIT_CARD',
  BANK_TRANSFER = 'BANK_TRANSFER',
  MOBILE_PAYMENT = 'MOBILE_PAYMENT',
  CHECK = 'CHECK',
  OTHER = 'OTHER'
}

// Financial Record Types
export interface FinancialRecord {
  id: number;
  transactionId?: number;
  transaction?: Transaction;
  amount: number;
  recordType: FinancialRecordType;
  category: FinancialCategory;
  description: string;
  recordDate: string;
  createdById: number;
  createdBy?: User;
}

export enum FinancialRecordType {
  REVENUE = 'REVENUE',
  EXPENSE = 'EXPENSE',
  ASSET = 'ASSET',
  LIABILITY = 'LIABILITY'
}

export enum FinancialCategory {
  SALES = 'SALES',
  PURCHASES = 'PURCHASES',
  SALARIES = 'SALARIES',
  RENT = 'RENT',
  UTILITIES = 'UTILITIES',
  MARKETING = 'MARKETING',
  MAINTENANCE = 'MAINTENANCE',
  TAXES = 'TAXES',
  INSURANCE = 'INSURANCE',
  OTHER = 'OTHER'
}

// Receipt Types
export interface Receipt {
  id: number;
  transactionId: number;
  transaction?: Transaction;
  receiptNumber: string;
  customerId?: number;
  customerName?: string;
  customerEmail?: string;
  totalAmount: number;
  tax: number;
  discount: number;
  issueDate: string;
  items: ReceiptItem[];
}

export interface ReceiptItem {
  id: number;
  receiptId: number;
  productId: number;
  product?: Product;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

// Order Types
export interface Order {
  id: number;
  orderNumber: string;
  storeId: number;
  store?: Store;
  supplierId?: number;
  supplierName: string;
  totalAmount: number;
  status: OrderStatus;
  orderDate: string;
  expectedDeliveryDate?: string;
  deliveryDate?: string;
  createdById: number;
  createdBy?: User;
  items: OrderItem[];
  notes?: string;
}

export interface OrderItem {
  id: number;
  orderId: number;
  productId: number;
  product?: Product;
  quantity: number;
  unitPrice: number;
  subtotal: number;
  receivedQuantity?: number;
}

export enum OrderStatus {
  DRAFT = 'DRAFT',
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED'
}

// Pagination Types
export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

// Filter Types
export interface FilterOptions {
  search?: string;
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
  [key: string]: any;
}