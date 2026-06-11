import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2, X } from 'lucide-react'
import AdminLayout from './AdminLayout'
import useAuthStore from '../../store/authStore'
import { fetchProducts } from '../../api/productApi'
import { createProduct, updateProduct, deleteProduct } from '../../api/adminApi'

const emptyForm = {
  name: '', price: '', description: '', image: '',
  category: 'TOPS', sizes: '', tag: '', countInStock: 10, inStock: true,
}

function AdminProducts() {
  const { user } = useAuthStore()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editProduct, setEditProduct] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  // declare as function declaration so it is hoisted for useEffect
  async function loadProducts() {
    try {
      setLoading(true)
      const data = await fetchProducts()
      setProducts(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const t = setTimeout(() => { loadProducts() })
    return () => clearTimeout(t)
  }, [])

  const handleEdit = (product) => {
    setEditProduct(product)
    setForm({
      name: product.name,
      price: product.price,
      description: product.description,
      image: product.image,
      category: product.category,
      sizes: product.sizes.join(', '),
      tag: product.tag || '',
      countInStock: product.countInStock,
      inStock: product.inStock,
    })
    setShowForm(true)
  }

  const handleDelete = async (productId) => {
    if (!window.confirm('Delete this product?')) return
    try {
      await deleteProduct(user.token, productId)
      setProducts(products.filter((p) => p._id !== productId))
    } catch (err) {
      console.error(err)
    }
  }

  const handleSubmit = async () => {
    if (!form.name || !form.price || !form.image || !form.description) {
      setError('Please fill all required fields')
      return
    }
    setSaving(true)
    setError('')
    try {
      const productData = {
        ...form,
        price: Number(form.price),
        countInStock: Number(form.countInStock),
        sizes: form.sizes.split(',').map((s) => s.trim()).filter(Boolean),
        tag: form.tag || null,
      }
      if (editProduct) {
        const updated = await updateProduct(user.token, editProduct._id, productData)
        setProducts(products.map((p) => p._id === editProduct._id ? updated : p))
      } else {
        const created = await createProduct(user.token, productData)
        setProducts([created, ...products])
      }
      setShowForm(false)
      setEditProduct(null)
      setForm(emptyForm)
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  const inputClass = 'w-full bg-zinc-900 border border-zinc-700 text-white text-xs px-4 py-3 tracking-wider placeholder-zinc-600 focus:outline-none focus:border-red-500 transition-colors'

  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">

        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-white text-xl sm:text-2xl font-black uppercase tracking-wider">Products</h1>
            <p className="text-zinc-500 text-xs tracking-wider mt-1">{products.length} products</p>
          </div>
          <button
            onClick={() => { setShowForm(true); setEditProduct(null); setForm(emptyForm) }}
            className="flex items-center gap-2 bg-red-500 text-white text-xs tracking-widest uppercase px-3 sm:px-4 py-3 hover:bg-red-600 transition-colors shrink-0"
          >
            <Plus size={14} />
            <span className="hidden sm:inline">Add Product</span>
            <span className="sm:hidden">Add</span>
          </button>
        </div>

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-start justify-center p-4 overflow-y-auto">
            <div className="bg-zinc-950 border border-zinc-800 w-full max-w-2xl my-4">
              <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-zinc-800">
                <h2 className="text-white text-sm font-black tracking-widest uppercase">
                  {editProduct ? 'Edit Product' : 'Add Product'}
                </h2>
                <button onClick={() => { setShowForm(false); setEditProduct(null) }} className="text-zinc-400 hover:text-white">
                  <X size={18} />
                </button>
              </div>

              <div className="p-4 sm:p-6 flex flex-col gap-4">
                {error && (
                  <div className="bg-red-500/10 border border-red-500 px-4 py-3">
                    <p className="text-red-500 text-xs">{error}</p>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-zinc-500 text-xs tracking-widest uppercase mb-2 block">Name *</label>
                    <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Product name" className={inputClass} />
                  </div>
                  <div>
                    <label className="text-zinc-500 text-xs tracking-widest uppercase mb-2 block">Price *</label>
                    <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="229" className={inputClass} />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-zinc-500 text-xs tracking-widest uppercase mb-2 block">Image Path *</label>
                    <input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} placeholder="/images/product.jpg" className={inputClass} />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-zinc-500 text-xs tracking-widest uppercase mb-2 block">Description *</label>
                    <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Product description" rows={3} className={`${inputClass} resize-none`} />
                  </div>
                  <div>
                    <label className="text-zinc-500 text-xs tracking-widest uppercase mb-2 block">Category</label>
                    <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className={inputClass}>
                      <option value="TOPS">TOPS</option>
                      <option value="ACCESSORIES">ACCESSORIES</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-zinc-500 text-xs tracking-widest uppercase mb-2 block">Tag</label>
                    <select value={form.tag} onChange={(e) => setForm({ ...form, tag: e.target.value })} className={inputClass}>
                      <option value="">None</option>
                      <option value="NEW">NEW</option>
                      <option value="LIMITED">LIMITED</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-zinc-500 text-xs tracking-widest uppercase mb-2 block">Sizes (comma separated)</label>
                    <input value={form.sizes} onChange={(e) => setForm({ ...form, sizes: e.target.value })} placeholder="S, M, L, XL" className={inputClass} />
                  </div>
                  <div>
                    <label className="text-zinc-500 text-xs tracking-widest uppercase mb-2 block">Stock Count</label>
                    <input type="number" value={form.countInStock} onChange={(e) => setForm({ ...form, countInStock: e.target.value })} className={inputClass} />
                  </div>
                  <div className="flex items-center gap-3">
                    <input type="checkbox" checked={form.inStock} onChange={(e) => setForm({ ...form, inStock: e.target.checked })} id="inStock" className="accent-red-500 w-4 h-4" />
                    <label htmlFor="inStock" className="text-zinc-400 text-xs tracking-wider uppercase">In Stock</label>
                  </div>
                </div>

                {form.image && (
                  <div className="w-20 h-20 bg-zinc-900 overflow-hidden border border-zinc-700">
                    <img src={form.image} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                )}

                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={handleSubmit}
                    disabled={saving}
                    className={`flex-1 text-xs tracking-[0.3em] uppercase py-4 transition-all duration-300 ${
                      saving ? 'bg-zinc-700 text-zinc-400 cursor-not-allowed' : 'bg-red-500 text-white hover:bg-red-600'
                    }`}
                  >
                    {saving ? 'Saving...' : editProduct ? 'Update' : 'Add Product'}
                  </button>
                  <button
                    onClick={() => { setShowForm(false); setEditProduct(null) }}
                    className="border border-zinc-700 text-zinc-400 text-xs tracking-widest uppercase px-4 py-4 hover:border-white hover:text-white transition-all duration-300"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Products — card layout on mobile, table on desktop */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block bg-black border border-zinc-800 overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-zinc-800">
                    <th className="text-left px-6 py-3 text-zinc-600 text-xs tracking-widest uppercase">Product</th>
                    <th className="text-left px-6 py-3 text-zinc-600 text-xs tracking-widest uppercase">Category</th>
                    <th className="text-left px-6 py-3 text-zinc-600 text-xs tracking-widest uppercase">Price</th>
                    <th className="text-left px-6 py-3 text-zinc-600 text-xs tracking-widest uppercase">Stock</th>
                    <th className="text-left px-6 py-3 text-zinc-600 text-xs tracking-widest uppercase">Tag</th>
                    <th className="text-left px-6 py-3 text-zinc-600 text-xs tracking-widest uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product._id} className="border-b border-zinc-900 hover:bg-zinc-950 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-zinc-900 overflow-hidden shrink-0">
                            <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          </div>
                          <p className="text-white text-xs font-bold uppercase">{product.name}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-zinc-400 text-xs">{product.category}</td>
                      <td className="px-6 py-4 text-red-500 text-xs font-bold">${product.price}.00</td>
                      <td className="px-6 py-4">
                        <span className={`text-xs font-bold ${product.inStock ? 'text-green-500' : 'text-red-500'}`}>
                          {product.inStock ? `${product.countInStock} left` : 'Out of Stock'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {product.tag && <span className="bg-red-500 text-white text-xs px-2 py-1 uppercase">{product.tag}</span>}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <button onClick={() => handleEdit(product)} className="text-zinc-400 hover:text-white transition-colors">
                            <Pencil size={14} />
                          </button>
                          <button onClick={() => handleDelete(product._id)} className="text-zinc-400 hover:text-red-500 transition-colors">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden flex flex-col gap-3">
              {products.map((product) => (
                <div key={product._id} className="bg-black border border-zinc-800 p-4 flex items-center gap-4">
                  <div className="w-14 h-14 bg-zinc-900 overflow-hidden shrink-0 border border-zinc-800">
                    <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-xs font-bold uppercase truncate">{product.name}</p>
                    <p className="text-red-500 text-xs font-bold mt-1">${product.price}.00</p>
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      <span className="text-zinc-500 text-xs">{product.category}</span>
                      {product.tag && <span className="bg-red-500 text-white text-xs px-1.5 py-0.5 uppercase">{product.tag}</span>}
                      <span className={`text-xs font-bold ${product.inStock ? 'text-green-500' : 'text-red-500'}`}>
                        {product.inStock ? `${product.countInStock} left` : 'Out'}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3 shrink-0">
                    <button onClick={() => handleEdit(product)} className="text-zinc-400 hover:text-white transition-colors">
                      <Pencil size={16} />
                    </button>
                    <button onClick={() => handleDelete(product._id)} className="text-zinc-400 hover:text-red-500 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  )
}

export default AdminProducts