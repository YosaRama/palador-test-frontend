/* eslint-disable array-callback-return */

// Libs
import { Button, Card, Col, Input, Modal, Row, Tag } from "antd";
import { CloseCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";

// Data Hook
import { useOrganizations } from "./hooks/organization";
import { useRef, useState } from "react";
import CreateEmployeeModal from "./components/create-employee-modal";

function App() {
  //? ============== Organization Hook ============= ?//
  const { data, onAdd } = useOrganizations();

  //? Parsing Data Function
  function parsingData(item) {
    const children = data
      .filter((child) => {
        if (child.manager_id === item.employee_id) {
          return true;
        }
      })
      .map((child) => {
        return {
          ...child,
          child: parsingData(child),
        };
      });
    return children;
  }

  //? Data Parse Result
  const dataParse =
    data &&
    data.map((item) => {
      return {
        ...item,
        child: parsingData(item),
      };
    });

  //? ============== Handle Search ============= ?//
  const [searchByName, setSearchByName] = useState("");
  const inputRef = useRef();
  const handleSearch = () => {
    setSearchByName(inputRef.current.input.value);
  };
  const handleReset = () => {
    setSearchByName("");
  };
  // * ====================================== * //

  //? Show Data
  const showData =
    data &&
    dataParse.filter((item) => {
      if (searchByName ? item.name.includes(searchByName) : !item.manager_id) {
        return true;
      }
    });

  // * ====================================== * //

  //? ============== Handle Delete ============= ?//
  const handleDelete = () => {
    Modal.confirm({
      title: "Are you sure?",
      content: "You want be able to revert this data!",
    });
  };
  // * ====================================== * //

  //? ============== Handle Print Data ============= ?//
  function printData(item) {
    return item.child.map((child) => {
      return (
        <div style={{ marginLeft: 50 }}>
          <Tag style={{ marginBottom: 15 }}>
            {child.name}
            <span
              style={{ margin: "0 0 0 5px", cursor: "pointer" }}
              onClick={handleDelete}
            >
              <CloseCircleOutlined />
            </span>
          </Tag>
          {printData(child)}
        </div>
      );
    });
  }
  // * ====================================== * //

  //? ============== Handle Modal ============= ?//
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => {
    setShowModal(!showModal);
  };
  // * ====================================== * //

  return (
    <>
      <section className="box-container">
        <Col span={18}>
          <Card>
            <h1>Organization Structure</h1>
            <Row style={{ marginBottom: 20 }}>
              <Col span={24}>
                <p style={{ marginBottom: 0 }}>Search By Name</p>
              </Col>
              <Col span={20}>
                <Input
                  ref={inputRef}
                  onChange={handleSearch}
                  placeholder="Input some employee name"
                  value={searchByName}
                />
              </Col>
              <Col span={4}>
                <Button onClick={handleReset} disabled={!searchByName}>
                  Reset
                </Button>
              </Col>
            </Row>
            <Col style={{ marginBottom: 30 }}>
              <Button type="primary" onClick={handleShowModal}>
                <PlusCircleOutlined /> Add Employee
              </Button>
            </Col>
            {data &&
              showData.map((item) => {
                return (
                  <>
                    <Tag style={{ marginBottom: 15 }}>
                      {item.name}
                      <span style={{ margin: "0 0 0 5px", cursor: "pointer" }}>
                        <CloseCircleOutlined />
                      </span>
                    </Tag>
                    <div>{printData(item)}</div>
                  </>
                );
              })}
          </Card>
        </Col>
        <CreateEmployeeModal
          onSubmit={onAdd}
          showModal={showModal}
          handleShowModal={handleShowModal}
        />
      </section>
    </>
  );
}

export default App;
