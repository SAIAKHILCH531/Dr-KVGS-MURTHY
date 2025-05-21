import { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc, setDoc, collection, addDoc, getDocs, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';

const ProductManager = () => {
  const [productContent, setProductContent] = useState({
    hero: {
      title: 'Cardorium Plus',
      subtitle: 'Research-based poly-herbal formulation for improved circulation and heart health'
    },
    introduction: {
      title: 'Advanced Herbal Formula for Cardiovascular Health',
      description: [
        'Cardorium Plus is a scientifically formulated poly-herbal supplement developed by Dr. KVGS Murthy after years of research and clinical experience. This revolutionary product combines ancient Ayurvedic wisdom with modern scientific validation to create a comprehensive solution for cardiovascular function.',
        'Unlike conventional supplements, Cardorium Plus addresses the root causes of circulatory issues through a synergistic blend of premium herbs that work together to strengthen the cardiovascular system and promote overall wellness.'
      ],
      image: '/images/cardomax.jpg.png'
    },
    benefits: {
      title: 'Key Benefits',
      subtitle: 'Cardorium Plus offers a comprehensive approach to cardiovascular health through its unique formulation of traditional herbs backed by scientific research.',
      items: [
        {
          icon: '❤️',
          title: 'Heart Health Support',
          description: 'Contains specialized herbs that help maintain healthy heart function and support overall cardiovascular health.'
        },
        {
          icon: '🔄',
          title: 'Improved Circulation',
          description: 'Promotes blood flow throughout the body, helping to maintain healthy circulation while supporting the removal of waste products.'
        },
        {
          icon: '🛡️',
          title: 'Antioxidant Protection',
          description: 'Rich in natural antioxidants that help neutralize free radicals and support cellular health in the cardiovascular system.'
        }
      ]
    },
    ingredients: {
      title: 'Key Ingredients',
      items: [
        { name: 'Arjuna Bark', description: 'Strengthens heart muscles and supports cardiovascular function' },
        { name: 'Ashwagandha', description: 'Reduces stress and supports heart health' },
        { name: 'Hawthorn Berry', description: 'Improves blood flow and heart function' },
        { name: 'Saffron', description: 'Antioxidant properties that protect heart tissue' },
        { name: 'Guduchi', description: 'Boosts immunity and has anti-inflammatory properties' },
        { name: 'Other select herbs', description: 'Combined to create a synergistic effect for optimal cardiovascular support' }
      ]
    },
    synergisticAction: {
      title: 'Synergistic Action',
      description: [
        'Cardorium Plus is formulated based on the principles of synergistic herb combining, where each ingredient enhances the effectiveness of others. This approach is deeply rooted in traditional Ayurvedic practices and validated through modern research.',
        'The careful selection and precise proportions of each herb ensure maximum bioavailability and therapeutic effect, creating a formulation that is greater than the sum of its parts.'
      ],
      qualityAssurance: {
        title: 'Quality Assurance',
        description: 'All herbs in Cardorium Plus are sourced from sustainable, quality-controlled suppliers and undergo rigorous testing for purity and potency before formulation.'
      }
    },
    usage: {
      title: 'Recommended Usage',
      dosage: {
        title: 'Dosage',
        description: '1 capsule twice daily after meals, or as directed by your healthcare practitioner.'
      }
    }
  });

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [showNewProductForm, setShowNewProductForm] = useState(false);
  const [products, setProducts] = useState([]); // Add this line
  const [newProduct, setNewProduct] = useState({
    hero: {
      title: '',
      subtitle: ''
    },
    introduction: {
      title: '',
      description: ['', ''],
      image: ''
    },
    benefits: {
      title: 'Key Benefits',
      subtitle: '',
      items: [
        { icon: '', title: '', description: '' },
        { icon: '', title: '', description: '' },
        { icon: '', title: '', description: '' }
      ]
    },
    ingredients: {
      title: 'Key Ingredients',
      items: [
        { name: '', description: '' }
      ]
    },
    synergisticAction: {
      title: 'Synergistic Action',
      description: ['', ''],
      qualityAssurance: {
        title: 'Quality Assurance',
        description: ''
      }
    },
    usage: {
      title: 'Recommended Usage',
      dosage: {
        title: 'Dosage',
        description: ''
      }
    }
  });

  useEffect(() => {
    fetchProductContent();
    fetchAllProducts(); // Add this line
  }, []);

  const fetchProductContent = async () => {
    try {
      const docRef = doc(db, 'settings', 'product');
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        setProductContent(docSnap.data());
      }
    } catch (error) {
      console.error('Error fetching product content:', error);
      setMessage({ text: 'Error fetching product content', type: 'error' });
    }
  };

  const handleHeroChange = (e) => {
    const { name, value } = e.target;
    setProductContent(prev => ({
      ...prev,
      hero: {
        ...prev.hero,
        [name]: value
      }
    }));
  };

  const handleIntroductionChange = (e, index) => {
    const { name, value } = e.target;
    if (name === 'description') {
      setProductContent(prev => {
        const newDescription = [...prev.introduction.description];
        newDescription[index] = value;
        return {
          ...prev,
          introduction: {
            ...prev.introduction,
            description: newDescription
          }
        };
      });
    } else {
      setProductContent(prev => ({
        ...prev,
        introduction: {
          ...prev.introduction,
          [name]: value
        }
      }));
    }
  };

  const handleBenefitChange = (index, field, value) => {
    setProductContent(prev => {
      const newBenefits = [...prev.benefits.items];
      newBenefits[index] = {
        ...newBenefits[index],
        [field]: value
      };
      return {
        ...prev,
        benefits: {
          ...prev.benefits,
          items: newBenefits
        }
      };
    });
  };

  const handleIngredientChange = (index, field, value) => {
    setProductContent(prev => {
      const newIngredients = [...prev.ingredients.items];
      newIngredients[index] = {
        ...newIngredients[index],
        [field]: value
      };
      return {
        ...prev,
        ingredients: {
          ...prev.ingredients,
          items: newIngredients
        }
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ text: '', type: '' });

    try {
      const docRef = doc(db, 'settings', 'product');
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        await updateDoc(docRef, productContent);
      } else {
        await setDoc(docRef, productContent);
      }
      
      setMessage({ text: 'Product content updated successfully!', type: 'success' });
    } catch (error) {
      console.error('Error updating product content:', error);
      setMessage({ text: 'Error updating product content', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddNewProduct = async () => {
    setShowNewProductForm(true);
  };

  const handleDeleteProduct = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    
    setIsLoading(true);
    setMessage({ text: '', type: '' });

    try {
      const productRef = doc(db, 'products', productId);
      await deleteDoc(productRef);
      setMessage({ text: 'Product deleted successfully!', type: 'success' });
      fetchAllProducts(); // Refresh the products list
    } catch (error) {
      console.error('Error deleting product:', error);
      setMessage({ text: 'Error deleting product', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  // Add this new function
  const fetchAllProducts = async () => {
    try {
      const productsCollectionRef = collection(db, 'products');
      const productsSnapshot = await getDocs(productsCollectionRef);
      const productsList = productsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProducts(productsList);
    } catch (error) {
      console.error('Error fetching products:', error);
      setMessage({ text: 'Error fetching products', type: 'error' });
    }
  };

  // Modify handleNewProductSubmit to refresh the products list
  const handleNewProductSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ text: '', type: '' });

    try {
      const productsCollectionRef = collection(db, 'products');
      await addDoc(productsCollectionRef, newProduct);
      setMessage({ text: 'New product created successfully!', type: 'success' });
      setShowNewProductForm(false);
      setNewProduct({
        // Reset the form with the initial state
        hero: { title: '', subtitle: '' },
        introduction: { title: '', description: ['', ''], image: '' },
        benefits: {
          title: 'Key Benefits',
          subtitle: '',
          items: [{ icon: '', title: '', description: '' }]
        },
        ingredients: {
          title: 'Key Ingredients',
          items: [{ name: '', description: '' }]
        },
        synergisticAction: {
          title: 'Synergistic Action',
          description: ['', ''],
          qualityAssurance: { title: 'Quality Assurance', description: '' }
        },
        usage: {
          title: 'Recommended Usage',
          dosage: { title: 'Dosage', description: '' }
        }
      });
      fetchAllProducts(); // Add this line to refresh the products list
    } catch (error) {
      console.error('Error creating new product:', error);
      setMessage({ text: 'Error creating new product', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewProductChange = (section, field, value, index = null) => {
    setNewProduct(prev => {
      const updated = { ...prev };
      
      if (index !== null && Array.isArray(updated[section][field])) {
        // Handle array fields (like description)
        const newArray = [...updated[section][field]];
        newArray[index] = value;
        updated[section][field] = newArray;
      } else if (field === 'items') {
        // Handle nested items arrays (benefits, ingredients)
        const newItems = [...updated[section].items];
        newItems[index] = { ...newItems[index], ...value };
        updated[section].items = newItems;
      } else {
        // Handle simple fields
        updated[section] = {
          ...updated[section],
          [field]: value
        };
      }
      
      return updated;
    });
  };

  return (
    <main className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold text-[#2F5A3D]">Product Management</h1>
        <button
          onClick={handleAddNewProduct}
          disabled={isLoading}
          className="bg-[#2F5A3D] text-white px-6 py-2 rounded-md hover:bg-opacity-90 disabled:opacity-50"
        >
          Add New Product
        </button>
      </div>
      
      {message.text && (
        <div className={`p-4 rounded ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {message.text}
        </div>
      )}

      {showNewProductForm ? (
        <form onSubmit={handleNewProductSubmit} className="space-y-8">
          {/* Hero Section */}
          <section className="space-y-4 bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold">Hero Section</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                value={newProduct.hero.title}
                onChange={(e) => handleNewProductChange('hero', 'title', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2F5A3D] focus:ring-[#2F5A3D]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Subtitle</label>
              <textarea
                value={newProduct.hero.subtitle}
                onChange={(e) => handleNewProductChange('hero', 'subtitle', e.target.value)}
                rows="2"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2F5A3D] focus:ring-[#2F5A3D]"
              />
            </div>
          </section>

          {/* Introduction Section */}
          <section className="space-y-4 bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold">Introduction</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                value={newProduct.introduction.title}
                onChange={(e) => handleNewProductChange('introduction', 'title', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2F5A3D] focus:ring-[#2F5A3D]"
              />
            </div>
            {newProduct.introduction.description.map((desc, index) => (
              <div key={index}>
                <label className="block text-sm font-medium text-gray-700">Description {index + 1}</label>
                <textarea
                  value={desc}
                  onChange={(e) => handleNewProductChange('introduction', 'description', e.target.value, index)}
                  rows="4"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2F5A3D] focus:ring-[#2F5A3D]"
                />
              </div>
            ))}
          </section>

          {/* Add similar sections for Benefits, Ingredients, etc. following the same pattern */}
          
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => setShowNewProductForm(false)}
              className="px-6 py-2 rounded-md border border-gray-300 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="bg-[#2F5A3D] text-white px-6 py-2 rounded-md hover:bg-opacity-90 disabled:opacity-50"
            >
              {isLoading ? 'Creating...' : 'Create Product'}
            </button>
          </div>
        </form>
      ) : (
        // Existing product form
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Hero Section */}
          <section className="space-y-4 bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold">Hero Section</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                name="title"
                value={productContent.hero.title}
                onChange={handleHeroChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2F5A3D] focus:ring-[#2F5A3D]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Subtitle</label>
              <textarea
                name="subtitle"
                value={productContent.hero.subtitle}
                onChange={handleHeroChange}
                rows="2"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2F5A3D] focus:ring-[#2F5A3D]"
              />
            </div>
          </section>

          {/* Introduction Section */}
          <section className="space-y-4 bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold">Introduction</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                name="title"
                value={productContent.introduction.title}
                onChange={(e) => handleIntroductionChange(e)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2F5A3D] focus:ring-[#2F5A3D]"
              />
            </div>
            {productContent.introduction.description.map((desc, index) => (
              <div key={index}>
                <label className="block text-sm font-medium text-gray-700">Description {index + 1}</label>
                <textarea
                  name="description"
                  value={desc}
                  onChange={(e) => handleIntroductionChange(e, index)}
                  rows="4"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2F5A3D] focus:ring-[#2F5A3D]"
                />
              </div>
            ))}
          </section>

          {/* Benefits Section */}
          <section className="space-y-4 bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold">Benefits</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700">Section Title</label>
              <input
                type="text"
                value={productContent.benefits.title}
                onChange={(e) => setProductContent(prev => ({
                  ...prev,
                  benefits: { ...prev.benefits, title: e.target.value }
                }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2F5A3D] focus:ring-[#2F5A3D]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Section Subtitle</label>
              <textarea
                value={productContent.benefits.subtitle}
                onChange={(e) => setProductContent(prev => ({
                  ...prev,
                  benefits: { ...prev.benefits, subtitle: e.target.value }
                }))}
                rows="2"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2F5A3D] focus:ring-[#2F5A3D]"
              />
            </div>
            {productContent.benefits.items.map((benefit, index) => (
              <div key={index} className="space-y-2 p-4 border rounded">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Icon</label>
                  <input
                    type="text"
                    value={benefit.icon}
                    onChange={(e) => handleBenefitChange(index, 'icon', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2F5A3D] focus:ring-[#2F5A3D]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Title</label>
                  <input
                    type="text"
                    value={benefit.title}
                    onChange={(e) => handleBenefitChange(index, 'title', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2F5A3D] focus:ring-[#2F5A3D]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    value={benefit.description}
                    onChange={(e) => handleBenefitChange(index, 'description', e.target.value)}
                    rows="2"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2F5A3D] focus:ring-[#2F5A3D]"
                  />
                </div>
              </div>
            ))}
          </section>

          {/* Ingredients Section */}
          <section className="space-y-4 bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold">Ingredients</h3>
            {productContent.ingredients.items.map((ingredient, index) => (
              <div key={index} className="space-y-2 p-4 border rounded">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    value={ingredient.name}
                    onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2F5A3D] focus:ring-[#2F5A3D]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    value={ingredient.description}
                    onChange={(e) => handleIngredientChange(index, 'description', e.target.value)}
                    rows="2"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2F5A3D] focus:ring-[#2F5A3D]"
                  />
                </div>
              </div>
            ))}
          </section>

          <button
            type="submit"
            disabled={isLoading}
            className="bg-[#2F5A3D] text-white px-6 py-2 rounded-md hover:bg-opacity-90 disabled:opacity-50"
          >
            {isLoading ? 'Updating...' : 'Update Product Content'}
          </button>
        </form>
      )}
    {!showNewProductForm && (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products?.map(product => (
          <div key={product.id} className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold text-[#2F5A3D]">{product.hero?.title}</h3>
                <p className="mt-2 text-gray-600">{product.hero?.subtitle}</p>
              </div>
              <button
                onClick={() => handleDeleteProduct(product.id)}
                disabled={isLoading}
                className="text-red-600 hover:text-red-800 disabled:opacity-50"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    )}
    </main>
    );
};

export default ProductManager;