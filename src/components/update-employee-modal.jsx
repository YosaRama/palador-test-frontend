import propTypes from "prop-types";
import { Col, Form, Input, message, Modal, Select } from "antd";
import { useOrganization, useOrganizations } from "../hooks/organization";
const { Option } = Select;

function UpdateEmployeeModal(props) {
  const { onMutate, showModal, handleShowModal, id } = props;

  //? ============== Data Hook ============= ?//
  const { data: singleEmployees, onEdit } = useOrganization({ singleId: +id });
  const { data: allEmployees } = useOrganizations();
  // * ====================================== * //

  //? ============== Initial Data ============= ?//
  const singleEmployeesParse = singleEmployees && {
    employeeId: singleEmployees.employee_id,
    managerId: singleEmployees.manager_id,
    name: singleEmployees.name,
  };
  // * ====================================== * //

  //? ============== Handle Submit ============= ?//
  const [form] = Form.useForm();
  const handleSubmit = () => {
    form.validateFields().then(async (value) => {
      const submission = {
        name: value.name,
        manager_id: value.managerId,
      };
      await onEdit(submission);
      handleShowModal();
      message.success("Success update new employee");
      onMutate();
    });
  };
  // * ====================================== * //

  return (
    <>
      <Modal
        visible={showModal}
        onOk={handleSubmit}
        onCancel={handleShowModal}
        okText="Save"
      >
        <Col style={{ margin: "30px 0 " }}>
          {singleEmployees && (
            <Form
              form={form}
              layout={"vertical"}
              initialValues={singleEmployeesParse}
            >
              <Form.Item label="Employee Name" name={"name"}>
                <Input placeholder="Input employee name" />
              </Form.Item>
              <Form.Item label="Manager" name={"managerId"}>
                <Select
                  placeholder="Select Manager (Optional)"
                  allowClear
                  showSearch
                  filterOption={(input, option) =>
                    option.children
                      .toString()
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0 ||
                    option.value
                      .toString()
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {allEmployees &&
                    allEmployees.map((item, index) => {
                      return (
                        <Option key={index} value={item.employee_id}>
                          {item.name}
                        </Option>
                      );
                    })}
                </Select>
              </Form.Item>
            </Form>
          )}
        </Col>
      </Modal>
    </>
  );
}

UpdateEmployeeModal.propTypes = {
  onSubmit: propTypes.func,
  showModal: propTypes.bool,
  handleShowModal: propTypes.func,
  id: propTypes.number,
  onMutate: propTypes.func,
};

export default UpdateEmployeeModal;
