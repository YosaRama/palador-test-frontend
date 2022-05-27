import propTypes from "prop-types";
import { Col, Form, Input, message, Modal, Select } from "antd";
import { useOrganizations } from "../hooks/organization";
const { Option } = Select;

function CreateEmployeeModal(props) {
  const { onSubmit, showModal, handleShowModal } = props;

  //? ============== Data Hook ============= ?//
  const { data: allEmployees } = useOrganizations();
  // * ====================================== * //

  //? ============== Handle Submit ============= ?//
  const [form] = Form.useForm();
  const handleSubmit = () => {
    form.validateFields().then((value) => {
      const submission = {
        name: value.name,
        managerId: +value.managerId,
      };
      onSubmit(submission);
      handleShowModal();
      message.success("Success create new employee");
    });
  };
  // * ====================================== * //

  return (
    <>
      <Modal visible={showModal} onOk={handleSubmit} onCancel={handleShowModal}>
        <Col style={{ margin: "30px 0 " }}>
          <Form form={form} layout={"vertical"}>
            <Form.Item label="Employee Name" name={"name"}>
              <Input placeholder="Input employee name" />
            </Form.Item>
            <Form.Item label="Manager" name={"managerId"}>
              <Select
                placeholder="Select Manager (Optional)"
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
                  allEmployees.map((item) => {
                    return <Option key={item.employee_id}>{item.name}</Option>;
                  })}
              </Select>
            </Form.Item>
          </Form>
        </Col>
      </Modal>
    </>
  );
}

CreateEmployeeModal.propTypes = {
  onSubmit: propTypes.func,
  showModal: propTypes.bool,
  handleShowModal: propTypes.func,
};

export default CreateEmployeeModal;
