import { useEffect, useMemo, useRef, useState } from "react";
import {
  Folder,
  CheckCircle2,
  XCircle,
  Home,
  Star,
  Search,
  RotateCcw,
  Upload,
  Download,
  Layers,
  Eye,
  Edit2,
  Trash2,
  Plus,
  Settings,
  ChevronLeft,
  ChevronRight,
  X,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import "./Categories.css";
import API, { IMG_URL } from "../../api/axios";

const NONE_PARENT = "—";
const CATEGORY_SETTINGS_KEY = "utkal-property-category-settings";
const CHART_COLORS = ["#2563eb", "#22c55e", "#a855f7", "#eab308", "#ef4444"];
const DEFAULT_SETTINGS = {
  defaultStatus: "Active",
  enableAutoSlug: true,
  requireParentCategory: false,
  maxUploadMB: 2,
};

const toCategoryView = (category) => ({
  id: category._id,
  name: category.name,
  parent: category.parent || NONE_PARENT,
  slug: category.slug,
  properties: Number(category.properties) || 0,
  featured: Boolean(category.featured),
  status: category.status,
  date: category.createdAt
    ? new Date(category.createdAt).toISOString().slice(0, 10)
    : "",
  icon: category.icon || "🏢",
  previewImg: category.image
    ? category.image.startsWith("http")
      ? category.image
      : `${IMG_URL}${category.image}`
    : null,
  displayOrder: Number(category.displayOrder) || 0,
});

const Categories = () => {
  // Main Data State
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  // Filters State
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [parentFilter, setParentFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("All");
  const [propertyFilter, setPropertyFilter] = useState("All");

  // Selection & Bulk Operations State
  const [selectedIds, setSelectedIds] = useState([]);
  const [isBulkOpen, setIsBulkOpen] = useState(false);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Modal Dialog States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  const [editingCategory, setEditingCategory] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [viewCategory, setViewCategory] = useState(null);

  // File Upload Reference
  const fileInputRef = useRef(null);
  const importInputRef = useRef(null);

  // Chart Interactive Hover State
  const [hoveredChartIndex, setHoveredChartIndex] = useState(null);

  // Category Form State
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    parent: "",
    properties: 0,
    featured: true,
    status: "Active",
    previewImg: null,
    icon: "🏢",
  });

  const [selectedImageFile, setSelectedImageFile] = useState(null);

  useEffect(() => {
    let isCurrent = true;

    API.get("/categories")
      .then(({ data }) => {
        if (isCurrent) setCategories((data.data || []).map(toCategoryView));
      })
      .catch((requestError) => {
        if (isCurrent)
          setError(
            requestError.response?.data?.message ||
              "Unable to load categories.",
          );
      })
      .finally(() => {
        if (isCurrent) setIsLoading(false);
      });

    return () => {
      isCurrent = false;
    };
  }, []);

  // Settings Form State
  const [settings, setSettings] = useState(() => {
    try {
      const storedSettings = JSON.parse(
        localStorage.getItem(CATEGORY_SETTINGS_KEY),
      );
      return { ...DEFAULT_SETTINGS, ...storedSettings };
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  // Dynamic Multi-Filter Logic
  const filteredData = useMemo(() => {
    return categories.filter((item) => {
      const matchesSearch = item.name
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesStatus =
        statusFilter === "All" || item.status === statusFilter;
      const matchesParent =
        parentFilter === "All" || item.parent === parentFilter;

      // Created Date Filter Logic
      let matchesDate = true;
      const itemDate = new Date(item.date);
      const now = new Date();
      if (dateFilter === "Last 7 Days") {
        const diffDays = (now - itemDate) / (1000 * 60 * 60 * 24);
        matchesDate = diffDays <= 7;
      } else if (dateFilter === "Last 30 Days") {
        const diffDays = (now - itemDate) / (1000 * 60 * 60 * 24);
        matchesDate = diffDays <= 30;
      }

      // Property Count Range Filter Logic
      let matchesProperty = true;
      if (propertyFilter === "0-50") {
        matchesProperty = item.properties >= 0 && item.properties <= 50;
      } else if (propertyFilter === "50-150") {
        matchesProperty = item.properties > 50 && item.properties <= 150;
      } else if (propertyFilter === "150+") {
        matchesProperty = item.properties > 150;
      }

      return (
        matchesSearch &&
        matchesStatus &&
        matchesParent &&
        matchesDate &&
        matchesProperty
      );
    });
  }, [
    categories,
    search,
    statusFilter,
    parentFilter,
    dateFilter,
    propertyFilter,
  ]);

  const parentOptions = useMemo(
    () =>
      [
        ...new Set(
          categories.map((category) => category.name.trim()).filter(Boolean),
        ),
      ].sort((first, second) => first.localeCompare(second)),
    [categories],
  );

  // Pagination Slice
  const totalPages = Math.ceil(filteredData.length / itemsPerPage) || 1;
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(start, start + itemsPerPage);
  }, [filteredData, currentPage, itemsPerPage]);

  // Master Checkbox Logic (Select All on current page)
  const isAllSelected = useMemo(() => {
    if (paginatedData.length === 0) return false;
    return paginatedData.every((cat) => selectedIds.includes(cat.id));
  }, [paginatedData, selectedIds]);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const pageIds = paginatedData.map((c) => c.id);
      setSelectedIds((prev) => Array.from(new Set([...prev, ...pageIds])));
    } else {
      const pageIds = paginatedData.map((c) => c.id);
      setSelectedIds((prev) => prev.filter((id) => !pageIds.includes(id)));
    }
  };

  const handleSelectRow = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  // Dynamic Category Input Handling
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      setFormData((prev) => ({
        ...prev,
        name: value,
        slug: settings.enableAutoSlug
          ? value
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/(^-|-$)+/g, "")
          : prev.slug,
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Modal Triggers
  const openModal = (category = null) => {
    if (category) {
      setEditingCategory(category);
      setFormData({ ...category });
    } else {
      setEditingCategory(null);
      setFormData({
        name: "",
        slug: "",
        parent: "",
        properties: 0,
        featured: true,
        status: settings.defaultStatus,
        previewImg: null,
        icon: "🏢",
      });
    }
    setSelectedImageFile(null);
    setIsModalOpen(true);
  };

  // Image Upload Handler inside Modal
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, previewImg: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // CSV Category Data Import Handler
  const handleImportSubmit = async (e) => {
    e.preventDefault();
    const file = importInputRef.current?.files[0];
    if (file) {
      try {
        setError("");
        const content = await file.text();
        const importedCategories = file.name.toLowerCase().endsWith(".json")
          ? Array.isArray(JSON.parse(content))
            ? JSON.parse(content)
            : JSON.parse(content).categories || []
          : (() => {
              const [headerLine, ...rows] = content.trim().split(/\r?\n/);
              const headers = headerLine
                .split(",")
                .map((header) => header.trim().toLowerCase());
              return rows.filter(Boolean).map((row) => {
                const values = row
                  .split(",")
                  .map((value) => value.trim().replace(/^"|"$/g, ""));
                return headers.reduce(
                  (category, header, index) => ({
                    ...category,
                    [header]: values[index],
                  }),
                  {},
                );
              });
            })();

        const validCategories = importedCategories.filter(
          (category) => category.name,
        );
        if (!validCategories.length)
          throw new Error(
            "No categories with a name were found in the selected file.",
          );

        const responses = await Promise.all(
          validCategories.map((category) => {
            const name = category.name.trim();
            return API.post("/categories", {
              name,
              slug:
                category.slug ||
                name
                  .toLowerCase()
                  .replace(/[^a-z0-9]+/g, "-")
                  .replace(/(^-|-$)/g, ""),
              parent:
                category.parent === NONE_PARENT ? "" : category.parent || "",
              properties: Number(category.properties) || 0,
              featured:
                category.featured === true ||
                String(category.featured).toLowerCase() === "true",
              status: category.status === "Inactive" ? "Inactive" : "Active",
            });
          }),
        );

        setCategories((previous) => [
          ...previous,
          ...responses.map((response) => toCategoryView(response.data.data)),
        ]);
        setIsImportModalOpen(false);
      } catch (requestError) {
        setError(
          requestError.response?.data?.message ||
            requestError.message ||
            "Unable to import categories.",
        );
      }
    }
  };

  // Save Category Handler
  const handleSaveCategory = async (e) => {
    e.preventDefault();
    if (!formData.name) return;

    try {
      setIsSaving(true);
      setError("");
      const payload = new FormData();
      payload.append("name", formData.name);
      payload.append("slug", formData.slug);
      payload.append(
        "parent",
        formData.parent === NONE_PARENT ? "" : formData.parent,
      );
      payload.append("properties", String(formData.properties || 0));
      payload.append("featured", String(formData.featured));
      payload.append("status", formData.status);
      payload.append("icon", formData.icon || "🏢");
      if (selectedImageFile) payload.append("image", selectedImageFile);

      const response = editingCategory
        ? await API.put(`/categories/${editingCategory.id}`, payload)
        : await API.post("/categories", payload);
      const savedCategory = toCategoryView(response.data.data);

      setCategories((previous) =>
        editingCategory
          ? previous.map((item) =>
              item.id === savedCategory.id ? savedCategory : item,
            )
          : [...previous, savedCategory],
      );
      setIsModalOpen(false);
    } catch (requestError) {
      setError(
        requestError.response?.data?.message || "Unable to save category.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  // CSV Export Trigger
  const handleExportCSV = () => {
    if (!filteredData.length) {
      setError("There are no categories to export.");
      return;
    }

    const headers = ["ID,Name,Parent,Slug,Properties,Featured,Status,Date"];
    const rows = filteredData.map(
      (c) =>
        `${c.id},"${c.name}","${c.parent}",${c.slug},${c.properties},${c.featured},${c.status},${c.date}`,
    );
    const csvContent =
      "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `categories_export_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setNotice(
      `${filteredData.length} categor${filteredData.length === 1 ? "y" : "ies"} exported successfully.`,
    );
  };

  const handleOpenOrder = () => {
    if (!categories.length) {
      setError("Add a category before managing its display order.");
      return;
    }
    setIsOrderModalOpen(true);
  };

  const handleSaveSettings = () => {
    localStorage.setItem(CATEGORY_SETTINGS_KEY, JSON.stringify(settings));
    setIsSettingsModalOpen(false);
    setNotice("Category preferences saved.");
  };

  const handleViewAllCategories = () => {
    handleResetFilters();
    document
      .getElementById("categories-list")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Bulk Operations Handlers
  const handleBulkAction = async (action) => {
    if (selectedIds.length === 0) return;
    try {
      setError("");
      if (action === "delete") {
        await Promise.all(
          selectedIds.map((id) => API.delete(`/categories/${id}`)),
        );
        setCategories((previous) =>
          previous.filter((category) => !selectedIds.includes(category.id)),
        );
        setSelectedIds([]);
      } else {
        const status = action === "active" ? "Active" : "Inactive";
        const responses = await Promise.all(
          selectedIds.map((id) => API.put(`/categories/${id}`, { status })),
        );
        const updatedCategories = responses.map((response) =>
          toCategoryView(response.data.data),
        );
        setCategories((previous) =>
          previous.map(
            (category) =>
              updatedCategories.find((updated) => updated.id === category.id) ||
              category,
          ),
        );
      }
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
          "Unable to update selected categories.",
      );
    } finally {
      setIsBulkOpen(false);
    }
  };

  // Delete Handler
  const handleDeleteConfirm = async () => {
    try {
      setError("");
      await API.delete(`/categories/${deleteId}`);
      setCategories((previous) =>
        previous.filter((category) => category.id !== deleteId),
      );
      setSelectedIds((previous) => previous.filter((id) => id !== deleteId));
      setDeleteId(null);
    } catch (requestError) {
      setError(
        requestError.response?.data?.message || "Unable to delete category.",
      );
    }
  };

  // Filter Reset Handler
  const handleResetFilters = () => {
    setSearch("");
    setStatusFilter("All");
    setParentFilter("All");
    setDateFilter("All");
    setPropertyFilter("All");
    setCurrentPage(1);
  };

  // Category Reorder Handler
  const moveCategoryOrder = async (index, direction) => {
    const newCategories = [...categories];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex >= 0 && targetIndex < newCategories.length) {
      const temp = newCategories[index];
      newCategories[index] = newCategories[targetIndex];
      newCategories[targetIndex] = temp;
      setCategories(newCategories);
      try {
        await Promise.all([
          API.put(`/categories/${newCategories[index].id}`, {
            displayOrder: index,
          }),
          API.put(`/categories/${newCategories[targetIndex].id}`, {
            displayOrder: targetIndex,
          }),
        ]);
      } catch (requestError) {
        setCategories(categories);
        setError(
          requestError.response?.data?.message ||
            "Unable to update category order.",
        );
      }
    }
  };

  const totalProperties = useMemo(
    () =>
      categories.reduce(
        (sum, category) => sum + (Number(category.properties) || 0),
        0,
      ),
    [categories],
  );

  const chartData = useMemo(() => {
    const rankedCategories = [...categories]
      .sort(
        (first, second) => Number(second.properties) - Number(first.properties),
      )
      .slice(0, 5);
    const fallbackShare = rankedCategories.length
      ? 100 / rankedCategories.length
      : 0;

    return rankedCategories.map((category, index) => ({
      label: category.name,
      properties: Number(category.properties) || 0,
      value: Number(
        (totalProperties
          ? (Number(category.properties) / totalProperties) * 100
          : fallbackShare
        ).toFixed(1),
      ),
      color: CHART_COLORS[index],
    }));
  }, [categories, totalProperties]);

  const chartSegments = useMemo(
    () =>
      chartData.map((item, index) => ({
        ...item,
        offset: chartData
          .slice(0, index)
          .reduce((sum, segment) => sum + segment.value, 0),
      })),
    [chartData],
  );

  return (
    <div className="categories-management-container">
      {/* Top Breadcrumb */}
      <header className="categories-header">
        <h1>Category Management</h1>
        <p className="categories-breadcrumb">
          Dashboard &gt; <span>Categories</span>
        </p>
      </header>

      {error && (
        <div role="alert" className="categories-error-message">
          {error}
        </div>
      )}

      {notice && (
        <div role="status" className="categories-success-message">
          {notice}
        </div>
      )}

      {/* 5 Stats Cards Row */}
      <div className="categories-stats-grid">
        <div className="categories-stat-card">
          <div className="categories-stat-icon categories-bg-blue-light">
            <Folder size={20} color="#2563eb" />
          </div>
          <div>
            <span className="categories-stat-title">Total Categories</span>
            <h2>{categories.length}</h2>
            <span className="categories-stat-sub">All Categories</span>
          </div>
        </div>

        <div className="categories-stat-card">
          <div className="categories-stat-icon categories-bg-green-light">
            <CheckCircle2 size={20} color="#16a34a" />
          </div>
          <div>
            <span className="categories-stat-title">Active Categories</span>
            <h2>{categories.filter((c) => c.status === "Active").length}</h2>
            <span className="categories-stat-sub">
              {(
                (categories.filter((c) => c.status === "Active").length /
                  (categories.length || 1)) *
                100
              ).toFixed(1)}
              % Active
            </span>
          </div>
        </div>

        <div className="categories-stat-card">
          <div className="categories-stat-icon categories-bg-red-light">
            <XCircle size={20} color="#dc2626" />
          </div>
          <div>
            <span className="categories-stat-title">Inactive Categories</span>
            <h2>{categories.filter((c) => c.status === "Inactive").length}</h2>
            <span className="categories-stat-sub">
              {(
                (categories.filter((c) => c.status === "Inactive").length /
                  (categories.length || 1)) *
                100
              ).toFixed(1)}
              % Inactive
            </span>
          </div>
        </div>

        <div className="categories-stat-card">
          <div className="categories-stat-icon categories-bg-purple-light">
            <Home size={20} color="#9333ea" />
          </div>
          <div>
            <span className="categories-stat-title">Properties Assigned</span>
            <h2>
              {categories.reduce(
                (sum, c) => sum + (Number(c.properties) || 0),
                0,
              )}
            </h2>
            <span className="categories-stat-sub">In All Categories</span>
          </div>
        </div>

        <div className="categories-stat-card">
          <div className="categories-stat-icon categories-bg-yellow-light">
            <Star size={20} color="#d97706" />
          </div>
          <div>
            <span className="categories-stat-title">Featured Categories</span>
            <h2>{categories.filter((c) => c.featured).length}</h2>
            <span className="categories-stat-sub">
              {(
                (categories.filter((c) => c.featured).length /
                  (categories.length || 1)) *
                100
              ).toFixed(1)}
              % Featured
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Header Actions */}
      <div className="categories-top-actions">
        <button
          className="categories-btn categories-btn-primary"
          onClick={() => openModal()}
        >
          <Plus size={18} /> Add New Category
        </button>

        <button
          className="categories-btn categories-btn-outline"
          onClick={handleExportCSV}
        >
          <Download size={16} /> Export CSV
        </button>

        <div className="categories-bulk-dropdown-container">
          <button
            className="categories-btn categories-btn-outline"
            onClick={() => setIsBulkOpen(!isBulkOpen)}
          >
            <Layers size={16} /> Bulk Actions ▾
          </button>
          {isBulkOpen && (
            <div className="categories-bulk-menu">
              <button onClick={() => handleBulkAction("active")}>
                Set Active
              </button>
              <button onClick={() => handleBulkAction("inactive")}>
                Set Inactive
              </button>
              <button
                className="categories-text-danger"
                onClick={() => handleBulkAction("delete")}
              >
                Delete Selected
              </button>
            </div>
          )}
        </div>

        {selectedIds.length > 0 && (
          <span className="categories-selected-count-badge">
            {selectedIds.length} items selected
          </span>
        )}
      </div>

      {/* Multi-Filter Component */}
      <div className="categories-filter-card">
        <div className="categories-filter-input-group">
          <Search size={16} className="categories-search-icon" />
          <input
            type="text"
            placeholder="Search category name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="categories-filter-select-group">
          <label>Status</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <div className="categories-filter-select-group">
          <label>Parent Category</label>

          <select
            value={parentFilter}
            onChange={(e) => {
              setParentFilter(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="All">All Parents</option>

            <option value="Residential">Residential</option>

            <option value="Commercial">Commercial</option>

            <option value="Rent">Rent</option>
          </select>
        </div>

        <div className="categories-filter-select-group">
          <label>Created Date</label>
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          >
            <option value="All">All Dates</option>
            <option value="Last 7 Days">Last 7 Days</option>
            <option value="Last 30 Days">Last 30 Days</option>
          </select>
        </div>

        <div className="categories-filter-select-group">
          <label>Property Count</label>
          <select
            value={propertyFilter}
            onChange={(e) => setPropertyFilter(e.target.value)}
          >
            <option value="All">All Counts</option>
            <option value="0-50">0 - 50 Properties</option>
            <option value="50-150">50 - 150 Properties</option>
            <option value="150+">150+ Properties</option>
          </select>
        </div>

        <button className="categories-btn-reset" onClick={handleResetFilters}>
          <RotateCcw size={14} /> Reset Filter
        </button>
      </div>

      {/* Main Table */}
      <div id="categories-list" className="categories-table-wrapper">
        <table className="categories-table">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={handleSelectAll}
                />
              </th>
              <th>Image</th>
              <th>Category Name</th>
              <th>Parent Category</th>
              <th>Slug</th>
              <th>Properties</th>
              <th>Featured</th>
              <th>Status</th>
              <th>Created Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="10" className="categories-no-data">
                  Loading categories…
                </td>
              </tr>
            ) : paginatedData.length > 0 ? (
              paginatedData.map((cat) => (
                <tr key={cat.id} className="categories-table-row">
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(cat.id)}
                      onChange={() => handleSelectRow(cat.id)}
                    />
                  </td>
                  <td className="categories-cell-icon">
                    <span className="categories-cell-icon-wrapper">
                      {cat.previewImg ? (
                        <img
                          src={cat.previewImg}
                          alt={cat.name}
                          className="categories-cell-img-preview"
                        />
                      ) : (
                        cat.icon
                      )}
                    </span>
                  </td>
                  <td className="categories-font-semibold">{cat.name}</td>
                  <td>{cat.parent}</td>
                  <td className="categories-text-muted">{cat.slug}</td>
                  <td className="categories-font-semibold">{cat.properties}</td>
                  <td>
                    {cat.featured ? (
                      <span className="categories-badge-featured-yes">
                        <Star size={12} fill="#d97706" /> Yes
                      </span>
                    ) : (
                      <span className="categories-badge-featured-no">
                        <Star size={12} /> No
                      </span>
                    )}
                  </td>
                  <td>
                    <span
                      className={`categories-badge-status ${cat.status.toLowerCase()}`}
                    >
                      {cat.status}
                    </span>
                  </td>
                  <td className="categories-text-muted">{cat.date}</td>
                  <td>
                    <div className="categories-action-buttons">
                      <button
                        className="categories-btn-icon view"
                        title="View Details"
                        onClick={() => setViewCategory(cat)}
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        className="categories-btn-icon edit"
                        title="Edit Category"
                        onClick={() => openModal(cat)}
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        className="categories-btn-icon delete"
                        title="Delete Category"
                        onClick={() => setDeleteId(cat.id)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="categories-no-data">
                  No categories matching filters found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Dynamic Pagination Bar */}
        <div className="categories-pagination">
          <span>
            Showing{" "}
            {paginatedData.length > 0
              ? (currentPage - 1) * itemsPerPage + 1
              : 0}{" "}
            to {Math.min(currentPage * itemsPerPage, filteredData.length)} of{" "}
            {filteredData.length} entries
          </span>

          <div className="categories-pagination-controls">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
            >
              <ChevronLeft size={16} />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={`page-${page}`}
                className={currentPage === page ? "active" : ""}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              <ChevronRight size={16} />
            </button>

            {/* Configurable Page Size Switcher */}
            <select
              className="categories-page-size-select"
              value={`${itemsPerPage} / page`}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value.split(" ")[0]));
                setCurrentPage(1);
              }}
            >
              <option value="5 / page">5 / page</option>
              <option value="10 / page">10 / page</option>
              <option value="15 / page">15 / page</option>
              <option value="20 / page">20 / page</option>
            </select>
          </div>
        </div>
      </div>

      {/* Interactive Bottom Widgets */}
      <div className="categories-widgets-grid">
        {/* Category Summary / Donut Chart */}
        <div className="categories-widget-card">
          <h3>Category Analytics</h3>
          <div className="categories-donut-chart-container">
            <div className="categories-donut-chart">
              <svg viewBox="0 0 36 36" className="categories-circular-chart">
                <path
                  className="categories-circle-bg"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                {chartSegments.map((item) => (
                  <path
                    key={item.label}
                    className="categories-circle"
                    strokeDasharray={`${item.value}, 100`}
                    strokeDashoffset={-item.offset}
                    stroke={item.color}
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                ))}
              </svg>
              <div className="categories-donut-hole">
                <span>Properties</span>
                <strong>{totalProperties}</strong>
              </div>
            </div>

            <div className="categories-donut-legend">
              {chartData.length ? (
                chartData.map((item, index) => (
                  <div
                    key={`chart-legend-${item.label}`}
                    className={`categories-legend-item ${hoveredChartIndex === index ? "highlight" : ""}`}
                    onMouseEnter={() => setHoveredChartIndex(index)}
                    onMouseLeave={() => setHoveredChartIndex(null)}
                  >
                    <span
                      className="categories-legend-dot"
                      style={{ backgroundColor: item.color }}
                    ></span>
                    <span className="categories-legend-label">
                      {item.label}
                    </span>
                    <span className="categories-legend-value">
                      {item.value}%
                    </span>
                    {hoveredChartIndex === index && (
                      <div className="categories-legend-tooltip">
                        {item.properties} properties ({item.value}% share)
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p className="categories-analytics-empty">
                  Add categories to view analytics.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions Component */}
        <div className="categories-widget-card">
          <h3>Quick Actions</h3>
          <div className="categories-quick-actions-grid">
            <button
              type="button"
              className="categories-qa-item"
              onClick={() => openModal()}
            >
              <div className="categories-qa-icon blue">
                <Plus size={20} />
              </div>
              <div>
                <strong>Add New Category</strong>
                <p>Create a new category</p>
              </div>
            </button>

            <button
              type="button"
              className="categories-qa-item"
              onClick={handleOpenOrder}
            >
              <div className="categories-qa-icon green">
                <Layers size={20} />
              </div>
              <div>
                <strong>Manage Category Order</strong>
                <p>Reorder display sequence</p>
              </div>
            </button>

            <button
              type="button"
              className="categories-qa-item"
              onClick={() => setIsSettingsModalOpen(true)}
            >
              <div className="categories-qa-icon purple">
                <Settings size={20} />
              </div>
              <div>
                <strong>Category Settings</strong>
                <p>Manage defaults & rules</p>
              </div>
            </button>

            <button
              type="button"
              className="categories-qa-item"
              onClick={() => setIsImportModalOpen(true)}
            >
              <div className="categories-qa-icon yellow">
                <Upload size={20} />
              </div>
              <div>
                <strong>Import Categories</strong>
                <p>Import categories from file</p>
              </div>
            </button>
          </div>
        </div>

        {/* Top Categories */}
        <div className="categories-widget-card">
          <div className="categories-widget-header">
            <h3>Top Categories</h3>
            <button
              className="categories-btn-link"
              onClick={handleViewAllCategories}
            >
              View All
            </button>
          </div>
          <ul className="categories-top-categories-list">
            {[...categories]
              .sort((a, b) => b.properties - a.properties)
              .slice(0, 5)
              .map((item, idx) => (
                <li key={`top-cat-${item.id}`}>
                  <span
                    className={`categories-rank categories-rank-${idx + 1}`}
                  >
                    {idx + 1}
                  </span>
                  <span className="categories-cat-name">{item.name}</span>
                  <span className="categories-cat-props">
                    {item.properties} Properties
                  </span>
                </li>
              ))}
          </ul>
        </div>
      </div>

      {/* Add / Edit Category Dialog Modal */}
      {isModalOpen && (
        <div className="categories-modal-overlay">
          <div className="categories-modal-container">
            <div className="categories-modal-header">
              <h2>{editingCategory ? "Edit Category" : "Add New Category"}</h2>
              <button
                className="categories-btn-close"
                onClick={() => setIsModalOpen(false)}
              >
                <X size={20} />
              </button>
            </div>

            <form
              onSubmit={handleSaveCategory}
              className="categories-modal-body"
            >
              <h3 className="categories-section-subtitle">
                Category Information
              </h3>

              <div className="categories-form-row">
                <div className="categories-form-group">
                  <label>
                    Category Name <span className="categories-required">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter category name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="categories-form-group">
                  <label>
                    Slug <span className="categories-required">*</span>
                  </label>
                  <input
                    type="text"
                    name="slug"
                    placeholder="Enter slug"
                    value={formData.slug}
                    onChange={handleInputChange}
                    required
                  />
                  <small className="categories-field-hint">
                    URL-friendly slug format
                  </small>
                </div>
              </div>

              <div className="categories-form-row">
                <div className="categories-form-group">
                  <label>
                    Parent Category{" "}
                    {settings.requireParentCategory && (
                      <span className="categories-required">*</span>
                    )}
                  </label>

                  <select
                    name="parent"
                    value={
                      formData.parent === NONE_PARENT ? "" : formData.parent
                    }
                    onChange={handleInputChange}
                    required={settings.requireParentCategory}
                  >
                    <option value="">Select parent category</option>

                    <option value="Residential">Residential</option>

                    <option value="Commercial">Commercial</option>

                    <option value="Rent">Rent</option>
                  </select>

                  <small className="categories-field-hint">
                    Choose Residential, Commercial, or Rent.
                  </small>
                </div>

                {/* Upload Section with File Preview */}
                <div className="categories-form-group">
                  <label>Category Icon / Image</label>
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  <div
                    className="categories-upload-box"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {formData.previewImg ? (
                      <div className="categories-uploaded-preview-container">
                        <img
                          src={formData.previewImg}
                          alt="Preview"
                          className="categories-preview-thumb"
                        />
                        <span>Change Image</span>
                      </div>
                    ) : (
                      <>
                        <Upload size={20} className="categories-upload-icon" />
                        <span>Upload Icon File</span>
                        <small>
                          PNG, SVG or JPG (Max. {settings.maxUploadMB}MB)
                        </small>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="categories-form-row">
                <div className="categories-form-group">
                  <label>Properties Assigned</label>
                  <input
                    type="number"
                    name="properties"
                    value={formData.properties}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="categories-form-group">
                  <label>Featured Category</label>
                  <div className="categories-toggle-group">
                    <button
                      type="button"
                      className={`categories-btn-toggle ${!formData.featured ? "active" : ""}`}
                      onClick={() =>
                        setFormData((p) => ({ ...p, featured: false }))
                      }
                    >
                      <Star size={14} /> No
                    </button>
                    <button
                      type="button"
                      className={`categories-btn-toggle ${formData.featured ? "active-featured" : ""}`}
                      onClick={() =>
                        setFormData((p) => ({ ...p, featured: true }))
                      }
                    >
                      <Star size={14} fill="#d97706" /> Yes
                    </button>
                  </div>
                </div>
              </div>

              <div className="categories-form-group">
                <label>Status</label>
                <div className="categories-status-toggle-group">
                  <button
                    type="button"
                    className={`categories-status-btn active-btn ${formData.status === "Active" ? "selected" : ""}`}
                    onClick={() =>
                      setFormData((p) => ({ ...p, status: "Active" }))
                    }
                  >
                    <CheckCircle2 size={16} /> Active
                  </button>
                  <button
                    type="button"
                    className={`categories-status-btn inactive-btn ${formData.status === "Inactive" ? "selected" : ""}`}
                    onClick={() =>
                      setFormData((p) => ({ ...p, status: "Inactive" }))
                    }
                  >
                    <XCircle size={16} /> Inactive
                  </button>
                </div>
              </div>

              <div className="categories-modal-footer">
                <button
                  type="button"
                  className="categories-btn-cancel"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="categories-btn-save"
                  disabled={isSaving}
                >
                  {isSaving ? "Saving…" : "Save Category"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Import File Dialog Modal */}
      {isImportModalOpen && (
        <div className="categories-modal-overlay">
          <div className="categories-modal-container">
            <div className="categories-modal-header">
              <h2>Import Categories</h2>
              <button
                className="categories-btn-close"
                onClick={() => setIsImportModalOpen(false)}
              >
                <X size={20} />
              </button>
            </div>
            <form
              onSubmit={handleImportSubmit}
              className="categories-modal-body"
            >
              <p style={{ fontSize: "13px", color: "#64748b" }}>
                Upload a CSV or JSON file with category details to quickly
                populate data.
              </p>
              <div className="categories-form-group">
                <input
                  type="file"
                  ref={importInputRef}
                  required
                  accept=".csv, .json"
                />
              </div>
              <div className="categories-modal-footer">
                <button
                  type="button"
                  className="categories-btn-cancel"
                  onClick={() => setIsImportModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="categories-btn-save">
                  Import File
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Reorder Sequence Modal */}
      {isOrderModalOpen && (
        <div className="categories-modal-overlay">
          <div className="categories-modal-container">
            <div className="categories-modal-header">
              <h2>Manage Category Sequence</h2>
              <button
                className="categories-btn-close"
                onClick={() => setIsOrderModalOpen(false)}
              >
                <X size={20} />
              </button>
            </div>
            <div className="categories-modal-body">
              <ul className="categories-order-list">
                {categories.map((cat, idx) => (
                  <li key={`order-${cat.id}`} className="categories-order-item">
                    <span>{cat.name}</span>
                    <div className="categories-order-controls">
                      <button
                        className="categories-btn-arrow"
                        disabled={idx === 0}
                        onClick={() => moveCategoryOrder(idx, "up")}
                      >
                        <ArrowUp size={14} />
                      </button>
                      <button
                        className="categories-btn-arrow"
                        disabled={idx === categories.length - 1}
                        onClick={() => moveCategoryOrder(idx, "down")}
                      >
                        <ArrowDown size={14} />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="categories-modal-footer">
                <button
                  className="categories-btn-save"
                  onClick={() => setIsOrderModalOpen(false)}
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Global Category Preferences Settings Modal */}
      {isSettingsModalOpen && (
        <div className="categories-modal-overlay">
          <div className="categories-modal-container">
            <div className="categories-modal-header">
              <h2>Category Preferences</h2>
              <button
                className="categories-btn-close"
                onClick={() => setIsSettingsModalOpen(false)}
              >
                <X size={20} />
              </button>
            </div>
            <div className="categories-modal-body">
              <div className="categories-form-group">
                <label>Default Category Status</label>
                <select
                  value={settings.defaultStatus}
                  onChange={(e) =>
                    setSettings((s) => ({
                      ...s,
                      defaultStatus: e.target.value,
                    }))
                  }
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div className="categories-form-group">
                <label>Max Icon Upload Size (MB)</label>
                <input
                  type="number"
                  value={settings.maxUploadMB}
                  onChange={(e) =>
                    setSettings((s) => ({
                      ...s,
                      maxUploadMB: Number(e.target.value),
                    }))
                  }
                />
              </div>
              <label className="categories-settings-checkbox">
                <input
                  type="checkbox"
                  checked={settings.enableAutoSlug}
                  onChange={(e) =>
                    setSettings((s) => ({
                      ...s,
                      enableAutoSlug: e.target.checked,
                    }))
                  }
                />
                Generate the slug automatically from the category name
              </label>
              <label className="categories-settings-checkbox">
                <input
                  type="checkbox"
                  checked={settings.requireParentCategory}
                  onChange={(e) =>
                    setSettings((s) => ({
                      ...s,
                      requireParentCategory: e.target.checked,
                    }))
                  }
                />
                Require a parent category for new categories
              </label>
              <div className="categories-modal-footer">
                <button
                  className="categories-btn-save"
                  onClick={handleSaveSettings}
                >
                  Save Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Box */}
      {deleteId && (
        <div className="categories-modal-overlay">
          <div className="categories-confirm-modal">
            <h3>Confirm Deletion</h3>
            <p>
              Are you sure you want to delete this category? This action cannot
              be undone.
            </p>
            <div className="categories-confirm-actions">
              <button
                className="categories-btn-cancel"
                onClick={() => setDeleteId(null)}
              >
                Cancel
              </button>
              <button
                className="categories-btn-delete-confirm"
                onClick={handleDeleteConfirm}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Item Details Modal */}
      {viewCategory && (
        <div className="categories-modal-overlay">
          <div className="categories-confirm-modal align-left">
            <h3>Category Details</h3>
            <div>
              <p>
                <strong>Name:</strong> {viewCategory.name}
              </p>
              <p>
                <strong>Slug:</strong> {viewCategory.slug}
              </p>
              <p>
                <strong>Parent:</strong> {viewCategory.parent}
              </p>
              <p>
                <strong>Properties:</strong> {viewCategory.properties}
              </p>
              <p>
                <strong>Status:</strong> {viewCategory.status}
              </p>
              <p>
                <strong>Created:</strong> {viewCategory.date}
              </p>
            </div>
            <div className="categories-confirm-actions">
              <button
                className="categories-btn-cancel"
                onClick={() => setViewCategory(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;
