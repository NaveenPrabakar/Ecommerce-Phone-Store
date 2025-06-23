import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import { 
  FaUsers, 
  FaBoxOpen, 
  FaTrash, 
  FaUserShield,
  FaPhone,
  FaDollarSign,
  FaChartBar,
  FaChartPie,
  FaList,
  FaUsersCog
} from 'react-icons/fa';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const Admin = ({ setStep, prof }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard', 'listings', 'users'

  const processDataForDashboard = (products) => {
    if (!products || products.length === 0) return null;

    const totalStockValue = products.reduce((acc, p) => acc + (p.price * p.stock), 0);
    const averagePrice = products.reduce((acc, p) => acc + p.price, 0) / products.length;
    
    const brandCounts = products.reduce((acc, p) => {
      acc[p.brand] = (acc[p.brand] || 0) + 1;
      return acc;
    }, {});

    const stockStatusCounts = products.reduce((acc, p) => {
        if (p.stock === 0) acc.outOfStock++;
        else if (p.stock < 10) acc.lowStock++;
        else acc.inStock++;
        return acc;
    }, { inStock: 0, lowStock: 0, outOfStock: 0 });

    const brandChartData = {
      labels: Object.keys(brandCounts),
      datasets: [{
        label: '# of Products',
        data: Object.values(brandCounts),
        backgroundColor: 'rgba(37, 99, 235, 0.6)',
        borderColor: 'rgba(37, 99, 235, 1)',
        borderWidth: 1,
      }],
    };
    
    const stockChartData = {
        labels: ['In Stock', 'Low Stock', 'Out of Stock'],
        datasets: [{
            data: [stockStatusCounts.inStock, stockStatusCounts.lowStock, stockStatusCounts.outOfStock],
            backgroundColor: ['#28a745', '#ffc107', '#dc3545'],
            hoverBackgroundColor: ['#218838', '#e0a800', '#c82333']
        }]
    };

    return { totalStockValue, averagePrice, brandChartData, stockChartData, totalProducts: products.length };
  };

  const fetchData = async () => {
    try {
      const [productsRes, usersRes] = await Promise.all([
        fetch(`http://localhost:8080/products`),
        fetch(`http://localhost:8080/users`)
      ]);

      if (productsRes.ok) {
        const products = await productsRes.json();
        setAllProducts(products);
        setStats(processDataForDashboard(products));
      }

      if (usersRes.ok) {
        const users = await usersRes.json();
        setUsers(users);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  const removeItem = async (item) => {
    if (window.confirm(`Are you sure you want to remove the listing "${item.title}"?`)) {
      try {
        const result = await fetch(`http://localhost:8080/adminremove/${item.id}`, { method: "DELETE" });
        if (result.ok) fetchData(); // Refetch all data
      } catch (error) {
        console.error("Error removing item:", error);
      }
    }
  };
  
  const deleteUser = async (userEmail) => {
    if (window.confirm(`Are you sure you want to delete the user "${userEmail}"? This action cannot be undone.`)) {
      console.log(`Request to delete user: ${userEmail}`);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const userAddedProducts = allProducts.filter(p => p.id > 136 || p.id < 121);

  return (
    <div className="app-container bg-light">
      {/* No NavBar */}
      <div className="container-fluid">
        <div className="row">
          {/* Sidebar */}
          <nav className="col-md-3 col-lg-2 d-none d-md-block bg-white sidebar vh-100 shadow-sm position-fixed">
            <div className="position-sticky pt-3">
              <div className="d-flex align-items-center mb-4 px-3">
                <FaUserShield className="text-primary" style={{ fontSize: '2rem' }} />
                <h4 className="ms-2 mb-0">Admin Panel</h4>
              </div>
              <ul className="nav flex-column">
                <li className="nav-item">
                  <a className={`nav-link ${activeTab === 'dashboard' ? 'active' : ''}`} href="#" onClick={() => setActiveTab('dashboard')}>
                    <FaChartBar className="me-2" /> Dashboard
                  </a>
                </li>
                <li className="nav-item">
                  <a className={`nav-link ${activeTab === 'listings' ? 'active' : ''}`} href="#" onClick={() => setActiveTab('listings')}>
                    <FaList className="me-2" /> Manage Listings
                  </a>
                </li>
                <li className="nav-item">
                  <a className={`nav-link ${activeTab === 'users' ? 'active' : ''}`} href="#" onClick={() => setActiveTab('users')}>
                    <FaUsersCog className="me-2" /> Manage Users
                  </a>
                </li>
              </ul>
            </div>
          </nav>

          {/* Main Content */}
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div className="pt-3 pb-2 mb-3 border-bottom d-flex justify-content-between align-items-center">
              <h1 className="h2 text-capitalize">{activeTab}</h1>
              <button className="btn btn-sm btn-outline-secondary" onClick={() => setStep('login')}>Log Out</button>
            </div>
            
            {/* Dashboard Tab */}
            {activeTab === 'dashboard' && stats && (
              <div>
                <div className="row g-4 mb-4">
                  <div className="col-lg-3 col-md-6">
                    <div className="card-modern p-3">
                      <h6 className="text-muted mb-2">Total Products</h6>
                      <p className="fs-3 fw-bold mb-0">{stats.totalProducts}</p>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6">
                    <div className="card-modern p-3">
                      <h6 className="text-muted mb-2">Total Users</h6>
                      <p className="fs-3 fw-bold mb-0">{users.length}</p>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6">
                    <div className="card-modern p-3">
                      <h6 className="text-muted mb-2">Avg. Product Price</h6>
                      <p className="fs-3 fw-bold mb-0">${stats.averagePrice.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6">
                    <div className="card-modern p-3">
                      <h6 className="text-muted mb-2">Total Stock Value</h6>
                      <p className="fs-3 fw-bold mb-0">${stats.totalStockValue.toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                <div className="row g-4">
                  <div className="col-lg-8">
                    <div className="card-modern p-3">
                      <h5 className="mb-3">Products by Brand</h5>
                      <Bar data={stats.brandChartData} />
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="card-modern p-3">
                      <h5 className="mb-3">Stock Availability</h5>
                      <Doughnut data={stats.stockChartData} />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Listings Tab */}
            {activeTab === 'listings' && (
              <div className="card-modern">
                <div className="p-4">
                  <h4 className="mb-3">User-Added Listings ({userAddedProducts.length})</h4>
                  <div className="table-responsive">
                    <table className="table table-hover align-middle">
                      {/* Table for listings */}
                      <thead>
                        <tr>
                          <th>Product</th>
                          <th>Brand</th>
                          <th>Price</th>
                          <th>Listed By</th>
                          <th className="text-end">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {userAddedProducts.map((p) => (
                          <tr key={p.id}>
                            <td>{p.title}</td>
                            <td>{p.brand}</td>
                            <td>${p.price}</td>
                            <td>{p.email}</td>
                            <td className="text-end">
                              <button
                                className="btn btn-outline-danger btn-sm"
                                onClick={() => removeItem(p)}
                              >
                                <FaTrash />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Users Tab */}
            {activeTab === 'users' && (
              <div className="card-modern">
                <div className="p-4">
                  <h4 className="mb-3">All Users ({users.length})</h4>
                  <div className="table-responsive">
                    <table className="table table-hover align-middle">
                      {/* Table for users */}
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Role</th>
                          <th className="text-end">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((user) => (
                          <tr key={user.Email}>
                            <td>{user.Name}</td>
                            <td>{user.Email}</td>
                            <td>
                              {user.admin ? (
                                <span className="badge bg-primary">Admin</span>
                              ) : (
                                <span className="badge bg-secondary">User</span>
                              )}
                            </td>
                            <td className="text-end">
                              <button
                                className="btn btn-outline-danger btn-sm"
                                onClick={() => deleteUser(user.Email)}
                                disabled={user.Email === prof.Email}
                              >
                                <FaTrash />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
            
            <Footer />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Admin;
