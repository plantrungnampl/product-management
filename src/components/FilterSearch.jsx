import React, { useState, useEffect, useContext } from "react";
import { Select, Button, message, Modal, Slider } from "antd";
import axios from "axios";
import { ProductContext } from "../context/ContextProductProvider";
import { FilterFilled } from "@ant-design/icons";

const { Option } = Select;

const FilterSearch = () => {
  const {
    handleSearchfilter,
    setSelectedCategory,
    categories,
    updateMinPrice,
    updateMaxPrice,
    minPrice,
    maxPrice,
  } = useContext(ProductContext);
  const formatPrice = (value) => `$${value}`;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    handleSearchfilter();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      <div>
        <Button
          onClick={showModal}
          type="primary"
          shape="round"
          size="small"
          icon={<FilterFilled />}
        ></Button>
        <Modal
          title="Filter"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Select
            style={{ width: 200, marginRight: 8 }}
            placeholder="Select category"
            allowClear
            onChange={(value) => setSelectedCategory(value)}
          >
            {categories.map((category) => (
              <Option key={category} value={category}>
                {category}
              </Option>
            ))}
          </Select>
          <div>
            <div>
              <Slider
                range
                min={0}
                max={1000}
                onChange={(values) => {
                  updateMinPrice(values[0]);
                  updateMaxPrice(values[1]);
                }}
                value={[minPrice, maxPrice]}
                marks={{
                  0: formatPrice(0),
                  500: formatPrice(500),
                  1000: formatPrice(1000),
                }}
                tipFormatter={(value) => formatPrice(value)}
              />
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default FilterSearch;
