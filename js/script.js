// --- Data Dummy ---
const summary = {
    totalProducts: 120,
    totalSales: 85,
    totalRevenue: 12500000
};

// Data untuk List Data Produk
let products = [
    { id: 1, name: "Kopi Gayo", price: 25000, stock: 50 },
    { id: 2, name: "Teh Hitam", price: 18000, stock: 30 },
    { id: 3, name: "Coklat Aceh", price: 30000, stock: 20},
    { id: 4, name: "Madu Nusantara", price: 75000, stock: 15},
    { id: 5, name: "Keripik Singkong Balado", price: 15000, stock: 100}
];

// Helper untuk format Angka/Rupiah
const formatNumber = (number) => {
    if (typeof number !== 'number') return number; 
    return number.toLocaleString('id-ID');
};

// --- Data Kredensial Tunggal yang Diizinkan ---
const ALLOWED_EMAIL = "nurlaelasucisafitri@gmail.com";
const ALLOWED_PASSWORD = "24090097";

// ------------------------------------------------------------------
// --- FUNGSI SIDEBAR DAN TAMPILAN DINAMIS ---
// ------------------------------------------------------------------

/**
 * Mengatur indikator aktif (class 'active') pada elemen sidebar.
 * @param {string} menuId - ID dari link sidebar yang akan diaktifkan.
 */
const setActiveSidebar = (menuId) => {
    // 1. Dapatkan semua link sidebar
    const sidebarLinks = document.querySelectorAll('.sidebar a');

    // 2. Hapus class 'active' dari semua link
    sidebarLinks.forEach(link => {
        link.classList.remove('active');
    });

    // 3. Tambahkan class 'active' ke link yang sesuai
    const activeLink = document.getElementById(menuId);
    if (activeLink) {
        activeLink.classList.add('active');
    }
};

/**
 * Mengganti konten utama dashboard/products dengan tampilan Revenue/Reports/Settings.
 * @param {string} menu - Nama menu yang diklik ('revenue', 'reports', 'settings', 'dashboard').
 */
const renderContent = (menu) => {
    const mainContent = document.querySelector('.main-content');
    if (!mainContent) return;

    let contentHTML = '';
    let title = '';
    let activeId = ''; 

    if (menu === 'revenue') {
        title = 'Analisis Pendapatan (Revenue)';
        activeId = 'revenueBtn'; 
        contentHTML = `
            <div class="card" style="padding: 30px; text-align: center;">
                <h2>${title}</h2>
                <p>Simulasi menampilkan data pendapatan detail. Total Revenue: **Rp ${formatNumber(summary.totalRevenue)}**.</p>
                <i class="fas fa-chart-line" style="font-size: 4em; margin-top: 20px; color: #2ecc71;"></i>
            </div>
        `;
    } else if (menu === 'reports') {
        title = 'Laporan Penjualan & Stok';
        activeId = 'reportsBtn'; 
        contentHTML = `
            <div class="card" style="padding: 30px; text-align: center;">
                <h2>${title}</h2>
                <p>Simulasi menampilkan laporan bulanan dan visualisasi data.</p>
                <i class="fas fa-file-alt" style="font-size: 4em; margin-top: 20px; color: #9b59b6;"></i>
            </div>
        `;
    } else if (menu === 'settings') { 
        title = 'Pengaturan Akun (Settings)';
        activeId = 'settingsBtn'; 
        contentHTML = `
            <div class="card" style="padding: 30px; text-align: center;">
                <h2>${title}</h2>
                <p>Menu ini mensimulasikan Pengaturan Akun dan informasi profil.</p>
                <i class="fas fa-user-cog" style="font-size: 4em; margin-top: 20px; color: var(--text-color);"></i>
            </div>
        `;
    } else if (menu === 'dashboard') {
        // Kembali ke dashboard utama
        dashboardHandler(true); 
        setActiveSidebar('dashboardLink');
        return; 
    }

    // Ganti seluruh isi main-content
    mainContent.innerHTML = `
        <h1 class="header-title">${title}</h1>
        ${contentHTML}
    `;

    // Pindahkan class active ke menu yang baru diklik
    if (activeId) {
        setActiveSidebar(activeId); 
    }
};

// ------------------------------------------------------------------
// --- Halaman Login (index.html) ---
// ------------------------------------------------------------------
const loginHandler = () => {
    const loginForm = document.getElementById('loginForm');
    const googleBtn = document.getElementById('googleLoginBtn');
    const facebookBtn = document.getElementById('facebookLoginBtn');

    if (loginForm) {
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        const errorAlert = document.getElementById('errorAlert');

        loginForm.addEventListener('submit', (e) => {
            e.preventDefault(); 

            const email = emailInput.value.trim();
            const password = passwordInput.value.trim(); 

            if (email === '' || password === '') {
                errorAlert.textContent = 'Email dan Password (NIM) tidak boleh kosong!';
                errorAlert.style.display = 'block'; 
                return;
            }

            if (email === ALLOWED_EMAIL && password === ALLOWED_PASSWORD) {
                errorAlert.style.display = 'none';
                alert('Login berhasil!'); 
                window.location.href = 'dashboard.html';
            } else {
                errorAlert.textContent = 'Login Gagal! Email atau Password salah. Anda harus Sign Up terlebih dahulu.';
                errorAlert.style.display = 'block';
            }
        });
    }
    
    // Social Login Handler (Simulasi)
    const showSocialLoginResponse = (provider) => {
        alert(`Anda memilih Login dengan ${provider}. Ini adalah simulasi, tidak perlu koneksi ke backend.`);
    };

    if (googleBtn) {
        googleBtn.addEventListener('click', () => showSocialLoginResponse('Google'));
    }
    if (facebookBtn) {
        facebookBtn.addEventListener('click', () => showSocialLoginResponse('Facebook'));
    }
};

// ------------------------------------------------------------------
// --- Halaman Dashboard (dashboard.html) ---
// ------------------------------------------------------------------
const dashboardHandler = (isContentChange = false) => {
    const mainContent = document.querySelector('.main-content');
    
    // Inisialisasi konten dashboard default
    if (mainContent && !isContentChange) {
        // Konten HTML untuk summary cards
        mainContent.innerHTML = `
            <h1 class="header-title">Dashboard</h1>
            <div class="summary-cards">
                <div class="card summary-card">
                    <i class="fas fa-cubes summary-icon"></i>
                    <p>Total Products</p>
                    <div id="totalProducts" class="value">0</div>
                </div>
                <div class="card summary-card">
                    <i class="fas fa-shopping-cart summary-icon"></i>
                    <p>Total Sales</p>
                    <div id="totalSales" class="value">0</div>
                </div>
                <div class="card summary-card">
                    <i class="fas fa-dollar-sign summary-icon"></i>
                    <p>Total Revenue</p>
                    <div id="totalRevenue" class="value">0</div>
                </div>
            </div>
            <div class="card" style="padding: 30px;">
                <button id="goToProductsBtn" class="btn btn-primary"><i class="fas fa-arrow-right"></i> Lihat Data Produk</button>
            </div>
             <div class="card" style="height: 250px; margin-top: 20px; border: 1px dashed #ccc; display: flex; align-items: center; justify-content: center; color: #999;">
                Area untuk Grafik atau Informasi Tambahan...
            </div>
        `;
        // Set ikon Dashboard aktif saat pertama kali dimuat
        setActiveSidebar('dashboardLink'); 
    }

    // Update data summary
    const totalProductsEl = document.getElementById('totalProducts');
    const totalSalesEl = document.getElementById('totalSales');
    const totalRevenueEl = document.getElementById('totalRevenue');
    const goToProductsBtn = document.getElementById('goToProductsBtn');

    if (totalProductsEl) {
        totalProductsEl.textContent = formatNumber(summary.totalProducts);
        totalSalesEl.textContent = formatNumber(summary.totalSales);
        totalRevenueEl.textContent = `Rp ${formatNumber(summary.totalRevenue)}`;
    }
    
    if (goToProductsBtn) {
        goToProductsBtn.addEventListener('click', () => {
            window.location.href = 'products.html';
        });
    }

    // --- EVENT LISTENER UNTUK SIDEBAR TAMBAHAN (REVENUE, REPORTS, SETTINGS, LOGOUT) ---
    const revenueBtn = document.getElementById('revenueBtn');
    const reportsBtn = document.getElementById('reportsBtn');
    const settingsBtn = document.getElementById('settingsBtn'); 
    const logoutBtn = document.getElementById('logoutBtn'); // Dapatkan tombol Logout
    
    if (revenueBtn && reportsBtn && settingsBtn) {
        revenueBtn.addEventListener('click', (e) => {
            e.preventDefault(); 
            renderContent('revenue');
        });

        reportsBtn.addEventListener('click', (e) => {
            e.preventDefault(); 
            renderContent('reports');
        });

        settingsBtn.addEventListener('click', (e) => { 
            e.preventDefault(); 
            renderContent('settings');
        });
    }
    
    // Tambahkan listener untuk Logout
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            setActiveSidebar('logoutBtn'); // Aktifkan ikon Logout sesaat sebelum redirect
            setTimeout(() => { // Tunda redirect sebentar agar efek active terlihat
                alert('Anda telah Logout.');
                window.location.href = 'index.html';
            }, 100); 
        });
    }
};

// ------------------------------------------------------------------
// --- Halaman List Data Produk (products.html) ---
// ------------------------------------------------------------------
const productsHandler = () => {
    const productTableBody = document.getElementById('productTableBody');
    if (!productTableBody) return;
    
    // Set ikon Data Produk aktif saat dimuat
    setActiveSidebar('productsLink'); 

    // Fungsi untuk merender/menggambar ulang tabel
    const renderTable = () => {
        productTableBody.innerHTML = ''; 
        
        products.forEach((product, index) => {
            const row = productTableBody.insertRow();
            row.id = `product-row-${product.id}`;

            // Kolom No
            row.insertCell(0).textContent = index + 1;
            
            // Kolom Data (dibuat editable)
            const fields = ['name', 'price', 'stock'];
            
            fields.forEach((field, i) => {
                const cell = row.insertCell(i + 1);
                cell.textContent = (field === 'price' || field === 'stock') ? formatNumber(product[field]) : product[field];
                cell.setAttribute('data-field', field);
                cell.classList.add('editable-cell'); 
            });

            // Kolom Aksi
            const actionCell = row.insertCell(4);
            actionCell.classList.add('action-buttons');
            
            const editBtn = document.createElement('button');
            editBtn.textContent = 'Edit';
            editBtn.classList.add('btn', 'btn-edit');
            
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.classList.add('btn', 'btn-delete');

            actionCell.appendChild(editBtn);
            actionCell.appendChild(deleteBtn);

            // Event Listener Tombol Edit/Save
            editBtn.addEventListener('click', () => {
                if(editBtn.textContent === 'Edit') {
                    alert(`Edit produk: ${product.name}`); 
                    toggleEditMode(row, product.id, editBtn, false); 
                } else {
                    toggleEditMode(row, product.id, editBtn, true); 
                }
            });
            
            // Event Listener Tombol Delete
            deleteBtn.addEventListener('click', () => {
                deleteProduct(product.id, product.name);
            });
        });
    };

    // Fungsi untuk mengaktifkan/menyimpan mode edit in-place
    const toggleEditMode = (row, id, btn, save) => {
        const cells = row.querySelectorAll('.editable-cell');
        const product = products.find(p => p.id === id);
        if (!product) return;
        
        cells.forEach(cell => {
            const field = cell.getAttribute('data-field');
            
            if (save) {
                const input = cell.querySelector('input');
                if (input) {
                    let newValue = input.value.trim();
                    
                    if (field === 'price' || field === 'stock') {
                        let numericValue = parseInt(newValue, 10);
                        
                        if (isNaN(numericValue) || numericValue < 0) {
                            numericValue = product[field]; 
                            alert(`Error: Nilai untuk ${field} harus berupa angka positif. Perubahan dibatalkan.`);
                        }

                        product[field] = numericValue;
                        cell.textContent = formatNumber(numericValue); 
                    } else {
                        product[field] = newValue;
                        cell.textContent = newValue;
                    }
                }
            } else {
                const currentValue = (field === 'price' || field === 'stock') ? product[field] : cell.textContent;
                const input = document.createElement('input');
                
                input.type = (field === 'price' || field === 'stock') ? 'number' : 'text';
                input.value = currentValue;
                input.classList.add('editable-input');
                
                cell.innerHTML = '';
                cell.appendChild(input);
                input.focus();
            }
        });
        
        // Ganti tombol Edit <-> Save
        if (save) {
            btn.textContent = 'Edit';
            btn.classList.remove('btn-save');
            btn.classList.add('btn-edit');
            alert(`Produk "${product.name}" berhasil diperbarui.`);
        } else {
            btn.textContent = 'Save';
            btn.classList.remove('btn-edit');
            btn.classList.add('btn-save');
        }
    };

    // Fungsi untuk menghapus produk
    const deleteProduct = (id, name) => {
        if (confirm(`Yakin hapus produk ${name} ini?`)) {
            products = products.filter(p => p.id !== id);
            
            const rowToRemove = document.getElementById(`product-row-${id}`);
            if (rowToRemove) {
                rowToRemove.remove();
            }
            renderTable();
            alert(`Produk "${name}" berhasil dihapus.`);
        }
    };

    // Jalankan render tabel saat halaman dimuat
    renderTable();
    
    // --- EVENT LISTENER UNTUK SIDEBAR TAMBAHAN DI HALAMAN PRODUCTS ---
    const revenueBtn = document.getElementById('revenueBtn');
    const reportsBtn = document.getElementById('reportsBtn');
    const settingsBtn = document.getElementById('settingsBtn'); 
    const logoutBtn = document.getElementById('logoutBtn');
    
    if (revenueBtn && reportsBtn && settingsBtn) {
        revenueBtn.addEventListener('click', (e) => {
            e.preventDefault(); 
            renderContent('revenue');
        });

        reportsBtn.addEventListener('click', (e) => {
            e.preventDefault(); 
            renderContent('reports');
        });

        settingsBtn.addEventListener('click', (e) => { 
            e.preventDefault(); 
            renderContent('settings');
        });
    }

    // Tambahkan listener untuk Logout
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            setActiveSidebar('logoutBtn'); // Aktifkan ikon Logout sesaat sebelum redirect
            setTimeout(() => { // Tunda redirect sebentar agar efek active terlihat
                alert('Anda telah Logout.');
                window.location.href = 'index.html';
            }, 100); 
        });
    }
};


// ------------------------------------------------------------------
// --- Router Sederhana ---
// ------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;

    if (path.includes('dashboard.html')) {
        dashboardHandler();
    } else if (path.includes('products.html')) {
        productsHandler();
    } else if (path.includes('index.html') || path.endsWith('/')) { 
        loginHandler(); 
    }
});