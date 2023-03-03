import React, { useState, useEffect } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import * as API from "../Redux/Auth/api";

const Category = ({ isOpen, setIsOpen }) => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const categories = async () => {
      const categoryList = await API.categoryList(1, 10);
      setCategories(categoryList.data.results);
    };
    categories().catch((e) => console.log(e.msg));
  }, []);

  return (
    <DashboardLayout isOpen={isOpen} setIsOpen={setIsOpen}>
      <h1 className="left-[50%] top-[50%] flex justify-center">Category</h1>
    </DashboardLayout>
  );
};

export default Category;
