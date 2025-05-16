import { useState, useEffect } from 'react';
import { db } from '../../firebase/config';
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import AdminLayout from './AdminLayout';

const ProductManager = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    benefits: '',
    usage: ''
  });
  const [notification, setNotification] = useState({ message: '', type: '' });

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: '', type: '' }), 3000);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'products'));
      const productsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProducts(productsData);
    } catch (error) {
      console.error('Error fetching products:', error);
      showNotification('Error fetching products', 'error');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'products'), newProduct);
      setNewProduct({ name: '', description: '', benefits: '', usage: '' });
      fetchProducts();
      showNotification('Product added successfully', 'success');
    } catch (error) {
      console.error('Error adding product:', error);
      showNotification('Error adding product', 'error');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'products', id));
      fetchProducts();
      showNotification('Product deleted successfully', 'success');
    } catch (error) {
      console.error('Error deleting product:', error);
      showNotification('Error deleting product', 'error');
    }
  };

  return (
    <AdminLayout>
        <main className="flex-1 bg-white rounded-lg shadow p-6">
        <h1 className="text-3xl font-semibold text-[#2F5A3D]">Product Management</h1>
        <br />
          <div className="space-y-6">
            {/* Add Product Form */}
            <form onSubmit={handleSubmit} className="mb-8 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Product Name</label>
                <input
                  type="text"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                  className="w-full p-2 border rounded"
                  rows="4"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Benefits</label>
                <textarea
                  value={newProduct.benefits}
                  onChange={(e) => setNewProduct({...newProduct, benefits: e.target.value})}
                  className="w-full p-2 border rounded"
                  rows="4"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Usage Instructions</label>
                <textarea
                  value={newProduct.usage}
                  onChange={(e) => setNewProduct({...newProduct, usage: e.target.value})}
                  className="w-full p-2 border rounded"
                  rows="4"
                />
              </div>
              <button
                type="submit"
                className="bg-[#2F5A3D] text-white px-4 py-2 rounded hover:bg-opacity-90"
              >
                Add Product
              </button>
            </form>
  
            {/* Products List */}
            <div className="space-y-4">
              {products.map(product => (
                <div key={product.id} className="border p-4 rounded">
                  <h3 className="text-xl font-semibold">{product.name}</h3>
                  <p className="text-gray-600 mt-2">{product.description}</p>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="mt-2 text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        </main>
      </AdminLayout>
  );
};

export default ProductManager;