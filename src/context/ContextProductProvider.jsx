import { Spin, message } from "antd";
import axios from "axios";
import {
  createContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import { LoadingOutlined } from "@ant-design/icons";
import _ from "lodash";
export const ProductContext = createContext();

export const ContextProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const updateMinPrice = (value) => {
    setMinPrice(value ? value : 0);
  };
  const updateMaxPrice = (value) => {
    setMaxPrice(value ? value : 1000);
  };

  const handleSearchfilter = () => {
    // Filter dữ liệu sản phẩm dựa trên selectedCategory và priceRange
    let filteredProducts = products;

    // Lọc theo Category nếu Category được chọn
    if (selectedCategory) {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Lọc theo khoảng giá nếu có khoảng giá được chọn
    if (minPrice !== 0 || maxPrice !== 1000) {
      filteredProducts = filteredProducts.filter((product) => {
        return product.price >= minPrice && product.price <= maxPrice;
      });
    }

    // Cập nhật dữ liệu sản phẩm được lọc
    setFilteredProducts(filteredProducts);
  };
  const formatPrice = (value) => `$${value}`;
  const hasSelected = selectedRowKeys?.length > 0;
  const onSelectChange = (selectedRowKeys) => {
    setSelectedRowKeys(selectedRowKeys);
  };
  // callAPI
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setProducts(response.data);
        setFilteredProducts(response.data);
        setIsLoading(false);
      } catch (error) {
        message.error(error.message);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // add Product
  const addProduct = useCallback(
    async (payload) => {
      setIsLoading(true);
      try {
        const response = await axios.post(
          "https://fakestoreapi.com/products",
          payload
        );
        setProducts([...products, response.data]);
        setFilteredProducts([...filteredProducts, response.data]);
        message.success("Add product successfully");
        return response.data;
      } catch (error) {
        message.error("Add product failed: " + error.message);
      } finally {
        setIsLoading(false);
      }
    },
    [products, filteredProducts]
  );

  // search debounce:
  const debouncedSearch = useMemo(
    () =>
      _.debounce((search) => {
        setFilteredProducts(
          products.filter((product) =>
            product.title.toLowerCase().includes(search.toLowerCase())
          )
        );
      }, 500),
    [products]
  );

  useEffect(() => {
    debouncedSearch(searchTerm);
  }, [searchTerm, debouncedSearch]);
  //   console.log("filteredProducts", filteredProducts);
  // delete Product antd:
  const deleteProduct = async (id) => {
    setIsLoading(true);
    try {
      const response = await axios.delete(
        `https://fakestoreapi.com/products/${id}`
      );
      console.log("response product", response);
      setProducts(products.filter((product) => product.id !== id));
      setFilteredProducts(
        filteredProducts.filter((product) => product.id !== id)
      );
      // message.success("Delete product successfully");
    } catch (error) {
      // message.error("Delete product failed: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };
  // const handleDelete = async () => {
  //   setIsLoading(true);
  //   try {
  //     // Tạo một mảng các Promise từ việc gọi hàm deleteProduct cho mỗi id đã chọn
  //     const deletePromises = selectedRowKeys.filter((id) => deleteProduct(id));
  //     // Chờ tất cả các Promise hoàn thành
  //     await Promise.all(deletePromises);
  //     // Cập nhật lại danh sách đã chọn sau khi xoá
  //     setSelectedRowKeys([]);
  //     // Hiển thị thông báo thành công
  //   } catch (error) {
  //     // Hiển thị thông báo lỗi
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  const handleDelete = async () => {
    setIsLoading(true);

    try {
      // Xác định các sản phẩm cần xóa dựa trên selectedRowKeys
      const selectedProducts = products.filter((product) =>
        selectedRowKeys.includes(product.id)
      );

      // Tạo mảng lời hứa xóa
      const deletePromises = selectedProducts.map((product) =>
        deleteProduct(product.id)
      );

      // Chờ tất cả các lời hứa xóa được giải quyết
      await Promise.all(deletePromises);

      // Cập nhật state và UI
      setProducts(
        products.filter(
          (product) =>
            !selectedProducts.some(
              (selectedProduct) => selectedProduct.id === product.id
            )
        )
      );
      setFilteredProducts(
        filteredProducts.filter(
          (product) =>
            !selectedProducts.some(
              (selectedProduct) => selectedProduct.id === product.id
            )
        )
      );
      message.success("Delete products successfully");
    } catch (error) {
      message.error("Delete products failed: " + error.message);
    } finally {
      setIsLoading(false);
      setSelectedRowKeys([]);
    }
  };
  // zzzz
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleSearch = async () => {
    try {
      if (!selectedCategory) {
        setFilteredProducts([]);
        return;
      }

      const response = await axios.get(
        `https://fakestoreapi.com/products/category/${selectedCategory}`
      );
      setFilteredProducts(response.data);
    } catch (error) {
      message.error("Failed to search products: " + error.message);
    }
  };
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://fakestoreapi.com/products/categories"
        );
        setCategories(response.data);
      } catch (error) {
        message.error("Failed to fetch categories: " + error.message);
      }
    };

    fetchCategories();
  }, []);

  // update Product

  const hasSelectedCategory = selectedCategory?.length > 0;

  const updateProduct = async (id, payload) => {
    setIsLoading(true);
    try {
      const response = await axios.put(
        `https://fakestoreapi.com/products/${id}`,
        payload
      );
      setProducts(
        products.map((product) => (product.id === id ? response.data : product))
      );
      setFilteredProducts(
        filteredProducts.map((product) =>
          product.id === id ? response.data : product
        )
      );
      message.success("Update product successfully");
      return response.data;
    } catch (error) {
      message.error("Update product failed: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <ProductContext.Provider
      value={{
        products,
        setSearchTerm,
        filteredProducts,
        addProduct,
        setProducts,
        deleteProduct,
        handleDelete,
        onSelectChange,
        hasSelected,
        // zz
        handleSearch,
        setSelectedCategory,
        categories,
        setFilteredProducts,
        hasSelectedCategory,
        selectedCategory,
        updateProduct,
        updateMinPrice,
        updateMaxPrice,
        minPrice,
        maxPrice,
        handleSearchfilter,
      }}
    >
      {isLoading ? (
        <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
      ) : (
        children
      )}
    </ProductContext.Provider>
  );
};
