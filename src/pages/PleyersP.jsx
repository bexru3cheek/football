import { useCallback, useEffect, useState } from "react";
import { Button, Form, Input, Modal } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
// import { request2 } from "../server/request2";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { Pagination } from "antd";

const { confirm } = Modal;

const PleyersP = () => {
  const [search, setSearch] = useState("");
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [form] = Form.useForm();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(2);

  const albumId = JSON.parse(localStorage.getItem("ID"));

  const getTeachers = useCallback(async () => {
    setLoading(true);
    try {
      let { data } = await axios.get(
        `https://64caafa0700d50e3c7053191.mockapi.io/foodbolltams/${albumId}/players`,
        { params: { name: search } }
      );
      data = data.map((el) => ({ ...el, key: el.id }));
      setTeachers(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, [search, albumId]);

  useEffect(() => {
    getTeachers();
  }, [getTeachers]);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const hideModal = () => {
    setIsModalOpen(false);
  };
  const submit = async () => {
    try {
      let values = await form.validateFields();
      console.log(values);
      if (selected) {
        await axios.put(
          `https://64caafa0700d50e3c7053191.mockapi.io/foodbolltams/${albumId}/players/${selected}`,
          values
        );
        // await request2.put(`product/${selected}`, values);
      } else {
        await axios.post(
          `https://64caafa0700d50e3c7053191.mockapi.io/foodbolltams/${albumId}/players`,
          values
        );
        // await request2.post("product", values);
      }
      form.resetFields();
      hideModal();
      getTeachers();
    } catch (err) {
      console.log(err);
    }
  };

  async function editTeacher(id) {
    let { data } = await axios.get(
      `https://64caafa0700d50e3c7053191.mockapi.io/foodbolltams/${albumId}/players/${id}`
    );
    console.log(data);
    form.setFieldsValue(data);
    setSelected(id);
    showModal();
  }

  const addTeacher = () => {
    showModal();
    setSelected(null);
  };

  function deleteTeacher(id) {
    confirm({
      title: "Do you Want to delete this teacher?",
      icon: <ExclamationCircleFilled />,
      onOk: async () => {
        await axios.delete(
          `https://64caafa0700d50e3c7053191.mockapi.io/foodbolltams/${albumId}/players/${id}`
        );
        // await request2.delete(`product/${id}`);
        getTeachers();
      },
    });
  }
  //   console.log(loading);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const paginatedTeachers = teachers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <section>
      <div className=" container  players">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "20px",
            marginTop: "80px",
          }}
        >
          <Input
            style={{ height: "50px" }}
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          <Button
            style={{ height: "50px" }}
            onClick={addTeacher}
            type="primary"
          >
            Add
          </Button>
        </div>
        <div style={{ marginTop: "50px" }} className="footbell">
          {paginatedTeachers.map(
            ({
              name,
              image,
              id,
              Pace,
              clubimage,
              flag,
              Dribbling,
              Defending,
              Passing,
              Physical,
              Forward,
              Number,
              Shooting,
            }) => (
              <div key={id} className="cards">
                <div className="cards-aside">
                  <div className="cards-overall">
                    <span className="card-rating">{Forward}</span>
                    <span className="card-position">FW</span>
                  </div>
                  <div className="cards-team">
                    <img className="cards-club" src={clubimage} alt="" />
                    <img className="cards-national" src={flag} alt="" />
                  </div>
                  <div className="cards-info">
                    <span>{Number}</span>
                  </div>
                </div>
                <div className="cards-main">
                  <div className="cards-header">
                    <div className="cards-header-bg">
                      <img className="cards-image" src={image} alt="" />
                    </div>
                    <h1 className="cards-name">{name}</h1>
                  </div>
                  <div className="cards-attributes">
                    <div className="cards-attribute">
                      <span className="cards-attribute__value">{Pace}</span>
                      <span className="cards-attribute__name">PAC</span>
                    </div>
                    <div className="cards-attribute">
                      <span className="cards-attribute__value">
                        {Dribbling}
                      </span>
                      <span className="cards-attribute__name">DRI</span>
                    </div>
                    <div className="cards-attribute">
                      <span className="cards-attribute__value">{Shooting}</span>
                      <span className="cards-attribute__name">SHO</span>
                    </div>
                    <div className="cards-attribute">
                      <span className="cards-attribute__value">
                        {Defending}
                      </span>
                      <span className="cards-attribute__name">DEF</span>
                    </div>
                    <div className="cards-attribute">
                      <span className="cards-attribute__value">{Passing}</span>
                      <span className="cards-attribute__name">PAS</span>
                    </div>
                    <div className="cards-attribute">
                      <span className="cards-attribute__value">{Physical}</span>
                      <span className="cards-attribute__name">PHY</span>
                    </div>
                  </div>
                  <ul className="social d-flex">
                    <li>
                      <NavLink
                        onClick={() => editTeacher(id)}
                        className="buttonsmall"
                      >
                        <EditOutlined
                          style={{
                            fontSize: "26px",
                            color: "green",
                            gap: "15px",
                          }}
                        />
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        onClick={() => deleteTeacher(id)}
                        className="buttonsmall"
                      >
                        <DeleteOutlined
                          style={{ fontSize: "26px", color: "red" }}
                        />
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </div>
            )
          )}
        </div>
      </div>

      <Modal
        title="Adding pleyers"
        open={isModalOpen}
        onOk={submit}
        okText={selected ? "Save" : "Add"}
        onCancel={hideModal}
      >
        <Form
          initialValues={{
            isMarried: false,
          }}
          form={form}
          layout="vertical"
          autoComplete="off"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <div>
            <Form.Item
              name="name"
              label="Name"
              rules={[
                {
                  required: true,
                  message: "Please fill this field !",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please fill this field !",
                },
                { type: "url", warningOnly: true },
                { type: "string", min: 6 },
              ]}
              name="image"
              label="Image"
            >
              <Input />
            </Form.Item>

            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please fill this field !",
                },
                { type: "url", warningOnly: true },
                { type: "string", min: 6 },
              ]}
              name="clubimage"
              label="clubimage"
            >
              <Input />
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please fill this field !",
                },
                { type: "url", warningOnly: true },
                { type: "string", min: 6 },
              ]}
              name="flag"
              label="flag"
            >
              <Input />
            </Form.Item>

            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please fill this field !",
                },
              ]}
              name="Pace"
              label="Pace"
            >
              <Input />
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please fill this field !",
                },
              ]}
              name="Number"
              label="Number"
            >
              <Input />
            </Form.Item>
          </div>
          <div>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please fill this field !",
                },
              ]}
              name="Dribbling"
              label="Dribbling"
            >
              <Input />
            </Form.Item>

            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please fill this field !",
                },
              ]}
              name="Defending"
              label="Defending"
            >
              <Input />
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please fill this field !",
                },
              ]}
              name="Passing"
              label="Passing"
            >
              <Input />
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please fill this field !",
                },
              ]}
              name="Forward"
              label="Forward"
            >
              <Input />
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please fill this field !",
                },
              ]}
              name="Physical"
              label="Physical"
            >
              <Input />
            </Form.Item>
          </div>
        </Form>
      </Modal>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={teachers.length} // Ma'lumotlar to'plami uzunligi
          showSizeChanger={false} // Elementlar sonini o'zgartirish imkoniyatini o'chirish
          onChange={handlePageChange}
          style={{ color: "red", fontWeight: "bold", padding: "80px" }}
        />
      </div>
    </section>
  );
};

export default PleyersP;
