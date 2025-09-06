import React, { useMemo, useState, useRef, useCallback } from "react";

import {
  LayoutDashboard,
  Users as UsersIcon,
  Package,
  ShoppingCart,
  Truck,
  LogOut,
  Search,
  Filter,
  MoreVertical,
  TrendingUp,
  TrendingDown,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  DollarSign,
} from "lucide-react";

type Language = "en" | "hi" | "mr";

interface AdminDashboardProps {
  onLogout: () => void;
  language: Language;
}

/* =========================
   Localized UI Text
========================= */
const text = {
  en: {
    dashboard: "Dashboard",
    users: "Users",
    products: "Products",
    orders: "Orders",
    deliveries: "Delivery Partners",
    reports: "Reports",
    logout: "Logout",
    totalUsers: "Total Users",
    totalOrders: "Total Orders",
    revenue: "Revenue",
    activeDeliveries: "Active Deliveries",
    search: "Search...",
    filter: "Filter",
    userManagement: "User Management",
    productManagement: "Product Management",
    orderManagement: "Order Management",
    analytics: "Analytics",
    disputeResolution: "Dispute Resolution",
    approve: "Approve",
    reject: "Reject",
    edit: "Edit",
    delete: "Delete",
    view: "View",
    pending: "Pending",
    approved: "Approved",
    rejected: "Rejected",
    delivered: "Delivered",
    inTransit: "In Transit",
    placed: "Placed",
    removeUser: "Remove User",
    removeDeliveryPartner: "Remove Delivery Partner",
  },
  hi: {
    dashboard: "डैशबोर्ड",
    users: "उपयोगकर्ता",
    products: "उत्पाद",
    orders: "ऑर्डर",
    deliveries: "डिलीवरी पार्टनर",
    reports: "रिपोर्ट",
    logout: "लॉगआउट",
    totalUsers: "कुल उपयोगकर्ता",
    totalOrders: "कुल ऑर्डर",
    revenue: "राजस्व",
    activeDeliveries: "सक्रिय डिलीवरी",
    search: "खोजें...",
    filter: "फ़िल्टर",
    userManagement: "उपयोगकर्ता प्रबंधन",
    productManagement: "उत्पाद प्रबंधन",
    orderManagement: "ऑर्डर प्रबंधन",
    analytics: "विश्लेषण",
    disputeResolution: "विवाद समाधान",
    approve: "स्वीकृत करें",
    reject: "अस्वीकार करें",
    edit: "संपादित करें",
    delete: "हटाएं",
    view: "देखें",
    pending: "लंबित",
    approved: "स्वीकृत",
    rejected: "अस्वीकृत",
    delivered: "डिलीवर",
    inTransit: "ट्रांजिट में",
    placed: "प्लेस किया गया",
    removeUser: "उपयोगकर्ता हटाएं",
    removeDeliveryPartner: "डिलीवरी पार्टनर हटाएं",
  },
  mr: {
    dashboard: "डॅशबोर्ड",
    users: "वापरकर्ते",
    products: "उत्पादने",
    orders: "ऑर्डर",
    deliveries: "डिलिव्हरी पार्टनर",
    reports: "अहवाल",
    logout: "लॉगआउट",
    totalUsers: "एकूण वापरकर्ते",
    totalOrders: "एकूण ऑर्डर",
    revenue: "महसूल",
    activeDeliveries: "सक्रिय डिलिव्हरी",
    search: "शोधा...",
    filter: "फिल्टर",
    userManagement: "वापरकर्ता व्यवस्थापन",
    productManagement: "उत्पादन व्यवस्थापन",
    orderManagement: "ऑर्डर व्यवस्थापन",
    analytics: "विश्लेषण",
    disputeResolution: "विवाद निरकरण",
    approve: "मंजूर करा",
    reject: "नाकारा",
    edit: "संपादित करा",
    delete: "हटवा",
    view: "पहा",
    pending: "प्रलंबित",
    approved: "मंजूर",
    rejected: "नाकारले",
    delivered: "वितरित",
    inTransit: "ट्रान्झिटमध्ये",
    placed: "ठेवले",
    removeUser: "वापरकर्ता हटवा",
    removeDeliveryPartner: "डिलिव्हरी पार्टनर हटवा",
  },
} as const;

/* =========================
   Mock Data & Types
========================= */
type User = { id: number; name: string; email: string; role: string; status: "pending" | "approved" | "rejected"; region: string; };
type Product = { id: number; name: string; artist: string; price: number; status: "approved" | "pending"; category: string; };
type Order = { id: number; product: string; customer: string; amount: number; status: "delivered" | "inTransit" | "placed"; delivery: "Volunteer" | "Courier"; };
type Delivery = { id: number; orderId: string; deliveryPerson: string; method: "Volunteer" | "Courier"; status: "delivered" | "inTransit" | "pending"; region: string; };

const initialUsers: User[] = [
  { id: 1, name: "Priya Sharma", email: "priya@email.com", role: "Artisan", status: "pending", region: "Rajasthan" },
  { id: 2, name: "Rahul Gupta", email: "rahul@email.com", role: "Buyer", status: "approved", region: "Maharashtra" },
  { id: 3, name: "Anjali Singh", email: "anjali@email.com", role: "Volunteer", status: "approved", region: "Gujarat" },
  { id: 4, name: "Vikram Kumar", email: "vikram@email.com", role: "Artisan", status: "pending", region: "Karnataka" },
];
const mockProducts: Product[] = [
  { id: 1, name: "Handwoven Silk Saree", artist: "Priya Sharma", price: 8500, status: "approved", category: "Textiles" },
  { id: 2, name: "Tribal Silver Jewelry", artist: "Ravi Patel", price: 3200, status: "pending", category: "Jewelry" },
  { id: 3, name: "Bamboo Craft Set", artist: "Maya Devi", price: 1800, status: "approved", category: "Crafts" },
  { id: 4, name: "Pottery Collection", artist: "Suresh Kumar", price: 2500, status: "pending", category: "Pottery" },
];
const mockOrders: Order[] = [
  { id: 1, product: "Handwoven Silk Saree", customer: "Sunita Rao", amount: 8500, status: "delivered", delivery: "Volunteer" },
  { id: 2, product: "Tribal Silver Jewelry", customer: "Amit Desai", amount: 3200, status: "inTransit", delivery: "Courier" },
  { id: 3, product: "Bamboo Craft Set", customer: "Neha Joshi", amount: 1800, status: "placed", delivery: "Volunteer" },
  { id: 4, product: "Pottery Collection", customer: "Rajesh Kumar", amount: 2500, status: "inTransit", delivery: "Courier" },
];
const initialDeliveries: Delivery[] = [
  { id: 1, orderId: "0001", deliveryPerson: "Meena Sharma", method: "Volunteer", status: "delivered", region: "Rajasthan" },
  { id: 2, orderId: "0002", deliveryPerson: "Ravi Kumar", method: "Courier", status: "inTransit", region: "Maharashtra" },
  { id: 3, orderId: "0003", deliveryPerson: "Asha Patil", method: "Volunteer", status: "pending", region: "Gujarat" },
  { id: 4, orderId: "0004", deliveryPerson: "Suresh Yadav", method: "Courier", status: "delivered", region: "Karnataka" },
];

/* =========================
   Helpers & Reusable Components
========================= */
const formatINR = (n: number) => `₹${n.toLocaleString("en-IN")}`;
const norm = (s: string) => s.trim().toLowerCase();

const SearchFilter = React.memo(({
    searchValue, onSearchChange, filterValue, setFilter, filterOptions, inputRef, searchPlaceholder
  }: {
    searchValue: string;
    onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    filterValue: string;
    setFilter: React.Dispatch<React.SetStateAction<string>>;
    filterOptions: readonly string[];
    inputRef?: React.RefObject<HTMLInputElement>;
    searchPlaceholder: string;
  }) => (
    <div className="flex items-center gap-4 mb-4">
      <div className="relative w-full max-w-md">
        <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          ref={inputRef}
          type="text"
          placeholder={searchPlaceholder}
          value={searchValue}
          onChange={onSearchChange}
          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
        />
      </div>
      <div className="relative">
        <Filter className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none z-10" />
        <select
          value={filterValue}
          onChange={(e) => setFilter(e.target.value)}
          className="appearance-none pl-10 pr-8 py-2 border border-gray-300 rounded-lg bg-white cursor-pointer focus:ring-2 focus:ring-red-500 focus:border-transparent min-w-[120px]"
        >
          <option value="all">All</option>
          {filterOptions.map((opt) => (<option key={opt} value={opt}>{opt}</option>))}
        </select>
        <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
));

/* =========================
   View Components
========================= */

const DashboardView = React.memo(({ summaryStats, currentText, setActiveSection }) => (
    <div className="space-y-6">
        <h1 className="text-3xl text-red-900 mb-6">{currentText.dashboard}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {summaryStats.map((stat, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                        <div className={`w-12 h-12 ${stat.color} rounded-full flex items-center justify-center`}>
                            <stat.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className={`flex items-center gap-1 text-sm ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                            {stat.trend === "up" ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                            {stat.change}
                        </div>
                    </div>
                    <h3 className="text-2xl text-gray-800 mb-1">{stat.value}</h3>
                    <p className="text-gray-600 text-sm">{stat.label}</p>
                </div>
            ))}
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h2 className="text-xl text-red-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button onClick={() => setActiveSection("users")} className="p-4 border-2 border-red-100 rounded-xl hover:border-red-300 hover:bg-red-50 transition-all text-left">
                    <h3 className="text-red-900 mb-1">{currentText.userManagement}</h3>
                    <p className="text-gray-600 text-sm">Review pending user applications</p>
                </button>
                <button onClick={() => setActiveSection("products")} className="p-4 border-2 border-yellow-100 rounded-xl hover:border-yellow-300 hover:bg-yellow-50 transition-all text-left">
                    <h3 className="text-yellow-700 mb-1">{currentText.productManagement}</h3>
                    <p className="text-gray-600 text-sm">Moderate product listings</p>
                </button>
                <button onClick={() => setActiveSection("orders")} className="p-4 border-2 border-green-100 rounded-xl hover:border-green-300 hover:bg-green-50 transition-all text-left">
                    <h3 className="text-green-700 mb-1">{currentText.orderManagement}</h3>
                    <p className="text-gray-600 text-sm">Manage order delivery methods</p>
                </button>
            </div>
        </div>
    </div>
));

const UsersView = React.memo(({ currentText, filteredUsers, userSearch, handleUserSearchChange, userFilter, setUserFilter, userRoleOptions, userSearchRef, DropdownMenu, removeUser }) => (
    <div className="space-y-6">
      <h1 className="text-3xl text-red-900">{currentText.userManagement}</h1>
      <SearchFilter
        searchValue={userSearch}
        onSearchChange={handleUserSearchChange}
        filterValue={userFilter}
        setFilter={setUserFilter}
        filterOptions={userRoleOptions}
        inputRef={userSearchRef}
        searchPlaceholder={currentText.search}
      />
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-red-50">
              <tr>
                <th className="px-6 py-4 text-left text-red-900">Name</th>
                <th className="px-6 py-4 text-left text-red-900">Email</th>
                <th className="px-6 py-4 text-left text-red-900">Role</th>
                <th className="px-6 py-4 text-left text-red-900">Region</th>
                <th className="px-6 py-4 text-left text-red-900">Status</th>
                <th className="px-6 py-4 text-left text-red-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((u) => (
                <tr key={u.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-6 py-4">{u.name}</td>
                  <td className="px-6 py-4 text-gray-600">{u.email}</td>
                  <td className="px-6 py-4">{u.role}</td>
                  <td className="px-6 py-4 text-gray-600">{u.region}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${u.status === "approved" ? "bg-green-100 text-green-800" : u.status === "pending" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"}`}>
                      {currentText[u.status] || u.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg" title={currentText.approve}><CheckCircle className="w-4 h-4" /></button>
                      <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg" title={currentText.reject}><XCircle className="w-4 h-4" /></button>
                      <DropdownMenu id={`user-${u.id}`} onRemove={() => removeUser(u.id)} removeText={currentText.removeUser} />
                    </div>
                  </td>
                </tr>
              ))}
              {filteredUsers.length === 0 && (<tr><td className="px-6 py-6 text-center text-gray-500" colSpan={6}>No users found.</td></tr>)}
            </tbody>
          </table>
        </div>
      </div>
    </div>
));

const ProductsView = React.memo(({ currentText, filteredProducts, productSearch, handleProductSearchChange, productFilter, setProductFilter, productCategoryOptions, productSearchRef }) => (
    <div className="space-y-6">
        <h1 className="text-3xl text-red-900">{currentText.productManagement}</h1>
        <SearchFilter
            searchValue={productSearch}
            onSearchChange={handleProductSearchChange}
            filterValue={productFilter}
            setFilter={setProductFilter}
            filterOptions={productCategoryOptions}
            inputRef={productSearchRef}
            searchPlaceholder={currentText.search}
        />
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-red-50">
                        <tr>
                            <th className="px-6 py-4 text-left text-red-900">Product</th>
                            <th className="px-6 py-4 text-left text-red-900">Artist</th>
                            <th className="px-6 py-4 text-left text-red-900">Category</th>
                            <th className="px-6 py-4 text-left text-red-900">Price</th>
                            <th className="px-6 py-4 text-left text-red-900">Status</th>
                            <th className="px-6 py-4 text-left text-red-900">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.map((p) => (
                            <tr key={p.id} className="border-b border-gray-100 hover:bg-gray-50">
                                <td className="px-6 py-4">{p.name}</td>
                                <td className="px-6 py-4 text-gray-600">{p.artist}</td>
                                <td className="px-6 py-4">{p.category}</td>
                                <td className="px-6 py-4">{formatINR(p.price)}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-3 py-1 rounded-full text-sm ${p.status === "approved" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>
                                        {currentText[p.status] || p.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex gap-2">
                                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg" title={currentText.view}><Eye className="w-4 h-4" /></button>
                                        <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg" title={currentText.edit}><Edit className="w-4 h-4" /></button>
                                        <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg" title={currentText.delete}><Trash2 className="w-4 h-4" /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {filteredProducts.length === 0 && (<tr><td className="px-6 py-6 text-center text-gray-500" colSpan={6}>No products found.</td></tr>)}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
));

const OrdersView = React.memo(({ currentText, filteredOrders, orderSearch, handleOrderSearchChange, orderFilter, setOrderFilter, orderStatusOptions, orderSearchRef }) => (
    <div className="space-y-6">
        <h1 className="text-3xl text-red-900">{currentText.orderManagement}</h1>
        <SearchFilter
            searchValue={orderSearch}
            onSearchChange={handleOrderSearchChange}
            filterValue={orderFilter}
            setFilter={setOrderFilter}
            filterOptions={orderStatusOptions}
            inputRef={orderSearchRef}
            searchPlaceholder={currentText.search}
        />
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-red-50">
                        <tr>
                            <th className="px-6 py-4 text-left text-red-900">Order ID</th>
                            <th className="px-6 py-4 text-left text-red-900">Product</th>
                            <th className="px-6 py-4 text-left text-red-900">Customer</th>
                            <th className="px-6 py-4 text-left text-red-900">Amount</th>
                            <th className="px-6 py-4 text-left text-red-900">Status</th>
                            <th className="px-6 py-4 text-left text-red-900">Delivery</th>
                            <th className="px-6 py-4 text-left text-red-900">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredOrders.map((o) => (
                            <tr key={o.id} className="border-b border-gray-100 hover:bg-gray-50">
                                <td className="px-6 py-4">#{o.id.toString().padStart(4, "0")}</td>
                                <td className="px-6 py-4">{o.product}</td>
                                <td className="px-6 py-4 text-gray-600">{o.customer}</td>
                                <td className="px-6 py-4">{formatINR(o.amount)}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-3 py-1 rounded-full text-sm ${o.status === "delivered" ? "bg-green-100 text-green-800" : o.status === "inTransit" ? "bg-blue-100 text-blue-800" : "bg-yellow-100 text-yellow-800"}`}>
                                        {currentText[o.status] || o.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4">{o.delivery}</td>
                                <td className="px-6 py-4">
                                    <div className="flex gap-2">
                                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg" title={currentText.view}><Eye className="w-4 h-4" /></button>
                                        <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg" title="More"><MoreVertical className="w-4 h-4" /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {filteredOrders.length === 0 && (<tr><td className="px-6 py-6 text-center text-gray-500" colSpan={7}>No orders found.</td></tr>)}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
));

const DeliveriesView = React.memo(({ currentText, filteredDeliveries, deliverySearch, handleDeliverySearchChange, deliveryFilter, setDeliveryFilter, deliveryStatusOptions, deliverySearchRef, DropdownMenu, removeDeliveryPartner }) => (
    <div className="space-y-6">
      <h1 className="text-3xl text-red-900">{currentText.deliveries}</h1>
      <SearchFilter
        searchValue={deliverySearch}
        onSearchChange={handleDeliverySearchChange}
        filterValue={deliveryFilter}
        setFilter={setDeliveryFilter}
        filterOptions={deliveryStatusOptions}
        inputRef={deliverySearchRef}
        searchPlaceholder={currentText.search}
      />
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-red-50">
              <tr>
                <th className="px-6 py-4 text-left text-red-900">Delivery ID</th>
                <th className="px-6 py-4 text-left text-red-900">Order ID</th>
                <th className="px-6 py-4 text-left text-red-900">Delivery Person</th>
                <th className="px-6 py-4 text-left text-red-900">Method</th>
                <th className="px-6 py-4 text-left text-red-900">Region</th>
                <th className="px-6 py-4 text-left text-red-900">Status</th>
                <th className="px-6 py-4 text-left text-red-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDeliveries.map((d) => (
                <tr key={d.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-6 py-4">#{d.id.toString().padStart(4, "0")}</td>
                  <td className="px-6 py-4">#{d.orderId}</td>
                  <td className="px-6 py-4">{d.deliveryPerson}</td>
                  <td className="px-6 py-4">{d.method}</td>
                  <td className="px-6 py-4">{d.region}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${d.status === "delivered" ? "bg-green-100 text-green-800" : d.status === "inTransit" ? "bg-blue-100 text-blue-800" : "bg-yellow-100 text-yellow-800"}`}>
                      {currentText[d.status] || d.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg" title={currentText.view}><Eye className="w-4 h-4" /></button>
                      <DropdownMenu id={`delivery-${d.id}`} onRemove={() => removeDeliveryPartner(d.id)} removeText={currentText.removeDeliveryPartner}/>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredDeliveries.length === 0 && (<tr><td className="px-6 py-6 text-center text-gray-500" colSpan={7}>No delivery partners found.</td></tr>)}
            </tbody>
          </table>
        </div>
      </div>
    </div>
));


/* =========================
   Main AdminDashboard Component
========================= */
const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout, language }) => {
  const currentText = text[language];

  const menuItems = useMemo(() => [
    { id: "dashboard", label: currentText.dashboard, icon: LayoutDashboard },
    { id: "users", label: currentText.users, icon: UsersIcon },
    { id: "products", label: currentText.products, icon: Package },
    { id: "orders", label: currentText.orders, icon: ShoppingCart },
    { id: "deliveries", label: currentText.deliveries, icon: Truck },
  ], [currentText]) as const;

  const [activeSection, setActiveSection] = useState<(typeof menuItems)[number]["id"]>("dashboard");
  
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [deliveries, setDeliveries] = useState<Delivery[]>(initialDeliveries);

  const [userSearch, setUserSearch] = useState("");
  const [productSearch, setProductSearch] = useState("");
  const [orderSearch, setOrderSearch] = useState("");
  const [deliverySearch, setDeliverySearch] = useState("");

  const [userFilter, setUserFilter] = useState("all");
  const [productFilter, setProductFilter] = useState("all");
  const [orderFilter, setOrderFilter] = useState("all");
  const [deliveryFilter, setDeliveryFilter] = useState("all");

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const userSearchRef = useRef<HTMLInputElement>(null);
  const productSearchRef = useRef<HTMLInputElement>(null);
  const orderSearchRef = useRef<HTMLInputElement>(null);
  const deliverySearchRef = useRef<HTMLInputElement>(null);

  const handleUserSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setUserSearch(e.target.value), []);
  const handleProductSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setProductSearch(e.target.value), []);
  const handleOrderSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setOrderSearch(e.target.value), []);
  const handleDeliverySearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setDeliverySearch(e.target.value), []);

  const removeUser = useCallback((userId: number) => {
    setUsers(prev => prev.filter(user => user.id !== userId));
    setOpenDropdown(null);
  }, []);

  const removeDeliveryPartner = useCallback((deliveryId: number) => {
    setDeliveries(prev => prev.filter(delivery => delivery.id !== deliveryId));
    setOpenDropdown(null);
  }, []);

  const handleClickOutside = useCallback(() => setOpenDropdown(null), []);

  const DropdownMenu = useCallback(({ id, onRemove, removeText }: { id: string; onRemove: () => void; removeText: string; }) => (
    <div className="relative">
      <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg" title="More" onClick={() => setOpenDropdown(openDropdown === id ? null : id)}>
        <MoreVertical className="w-4 h-4" />
      </button>
      {openDropdown === id && (
        <>
          <div className="fixed inset-0 z-10" onClick={handleClickOutside} />
          {/* FIX: Positioned menu to the right of the button */}
          <div className="absolute left-full -top-2 ml-2 bg-white border border-gray-200 rounded-lg shadow-lg z-20 min-w-[140px]">
            <button onClick={onRemove} className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg flex items-center gap-2">
              <Trash2 className="w-4 h-4" />
              {removeText}
            </button>
          </div>
        </>
      )}
    </div>
  ), [openDropdown, handleClickOutside]);

  const totalRevenue = useMemo(() => mockOrders.reduce((sum, o) => sum + o.amount, 0), []);
  const inTransitDeliveries = useMemo(() => deliveries.filter((d) => norm(d.status) === "intransit").length, [deliveries]);

  const summaryStats = useMemo(() => [
    { label: currentText.totalUsers, value: users.length.toString(), change: "+12%", trend: "up" as const, icon: UsersIcon, color: "bg-blue-500" },
    { label: currentText.totalOrders, value: mockOrders.length.toString(), change: "+8%", trend: "up" as const, icon: ShoppingCart, color: "bg-green-500" },
    { label: currentText.revenue, value: formatINR(totalRevenue), change: "+15%", trend: "up" as const, icon: DollarSign, color: "bg-yellow-500" },
    { label: currentText.activeDeliveries, value: inTransitDeliveries.toString(), change: "-3%", trend: "down" as const, icon: Truck, color: "bg-orange-500" },
  ], [users.length, mockOrders.length, totalRevenue, inTransitDeliveries, currentText]);

  const userRoleOptions = useMemo(() => Array.from(new Set(initialUsers.map((u) => u.role))), []);
  const filteredUsers = useMemo(() => users.filter((u) => {
    const s = norm(userSearch);
    const matchesSearch = !s || norm(u.name).includes(s) || norm(u.email).includes(s) || norm(u.region).includes(s) || norm(u.role).includes(s);
    const matchesFilter = userFilter === "all" || norm(u.role) === norm(userFilter);
    return matchesSearch && matchesFilter;
  }), [users, userSearch, userFilter]);

  const productCategoryOptions = useMemo(() => Array.from(new Set(mockProducts.map((p) => p.category))), []);
  const filteredProducts = useMemo(() => mockProducts.filter((p) => {
    const s = norm(productSearch);
    const matchesSearch = !s || norm(p.name).includes(s) || norm(p.category).includes(s) || norm(p.artist).includes(s);
    const matchesFilter = productFilter === "all" || norm(p.category) === norm(productFilter);
    return matchesSearch && matchesFilter;
  }), [mockProducts, productSearch, productFilter]);
  
  const orderStatusOptions = useMemo(() => ["Placed", "In Transit", "Delivered"], []);
  const filteredOrders = useMemo(() => {
    const normalizeOrderStatus = (st: string) => st.toLowerCase().replace(/\s+/g, "") === "intransit" ? "inTransit" : st.toLowerCase();
    return mockOrders.filter((o) => {
      const s = norm(orderSearch);
      const matchesSearch = !s || o.id.toString().includes(s) || norm(o.product).includes(s) || norm(o.customer).includes(s);
      const matchesFilter = orderFilter === "all" || normalizeOrderStatus(orderFilter) === normalizeOrderStatus(o.status);
      return matchesSearch && matchesFilter;
    });
  }, [mockOrders, orderSearch, orderFilter]);

  const deliveryStatusOptions = useMemo(() => ["Pending", "In Transit", "Delivered"], []);
  const filteredDeliveries = useMemo(() => {
    const normalizeDeliveryStatus = (st: string) => st.toLowerCase().replace(/\s+/g, "") === "intransit" ? "inTransit" : st.toLowerCase();
    return deliveries.filter((d) => {
        const s = norm(deliverySearch);
        const matchesSearch = !s || norm(d.orderId).includes(s) || norm(d.deliveryPerson).includes(s) || norm(d.region).includes(s) || norm(d.method).includes(s);
        const matchesFilter = deliveryFilter === "all" || normalizeDeliveryStatus(deliveryFilter) === normalizeDeliveryStatus(d.status);
        return matchesSearch && matchesFilter;
    });
  }, [deliveries, deliverySearch, deliveryFilter]);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="w-64 bg-white shadow-lg flex-shrink-0">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl text-red-900">BUNAI Admin</h2>
        </div>
        <nav className="p-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all mb-2 ${activeSection === item.id ? "bg-red-900 text-white" : "text-gray-700 hover:bg-red-50 hover:text-red-900"}`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          ))}
          <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-red-50 hover:text-red-900 transition-all mt-8">
            <LogOut className="w-5 h-5" />
            {currentText.logout}
          </button>
        </nav>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto">
        {activeSection === "dashboard" && <DashboardView summaryStats={summaryStats} currentText={currentText} setActiveSection={setActiveSection} />}
        {activeSection === "users" && <UsersView {...{ currentText, filteredUsers, userSearch, handleUserSearchChange, userFilter, setUserFilter, userRoleOptions, userSearchRef, DropdownMenu, removeUser }} />}
        {activeSection === "products" && <ProductsView {...{ currentText, filteredProducts, productSearch, handleProductSearchChange, productFilter, setProductFilter, productCategoryOptions, productSearchRef }} />}
        {activeSection === "orders" && <OrdersView {...{ currentText, filteredOrders, orderSearch, handleOrderSearchChange, orderFilter, setOrderFilter, orderStatusOptions, orderSearchRef }} />}
        {activeSection === "deliveries" && <DeliveriesView {...{ currentText, filteredDeliveries, deliverySearch, handleDeliverySearchChange, deliveryFilter, setDeliveryFilter, deliveryStatusOptions, deliverySearchRef, DropdownMenu, removeDeliveryPartner }} />}
      </main>
    </div>
  );
};

export default AdminDashboard;