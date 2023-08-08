import { useCallback, useEffect, useState } from "react";
import { Button, Form, Input, Modal } from "antd";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import Groups2Icon from "@mui/icons-material/Groups2";
import { Link } from "react-router-dom";
import { ExclamationCircleFilled } from "@ant-design/icons";
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
  const [pageSize, setPageSize] = useState(6); // Har bir aktivda 5 ta teacher ko'rsatiladi

  const getTeachers = useCallback(async () => {
    setLoading(true);
    try {
      let { data } = await axios.get(
        `https://64caafa0700d50e3c7053191.mockapi.io/foodbolltams`,
        { params: { name: search } }
      );
      data = data.map((el) => ({ ...el, key: el.id }));
      setTeachers(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, [search]);

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
          `https://64caafa0700d50e3c7053191.mockapi.io/foodbolltams/${selected}`,
          values
        );
      } else {
        await axios.post(
          `https://64caafa0700d50e3c7053191.mockapi.io/foodbolltams`,
          values
        );
      }
      form.resetFields();
      hideModal();
      getTeachers();
    } catch (err) {
      console.log(err);
    }
  };

  async function editTeams(id) {
    let { data } = await axios.get(
      `https://64caafa0700d50e3c7053191.mockapi.io/foodbolltams/${id}`
    );
    form.setFieldsValue(data);
    setSelected(id);
    showModal();
  }

  const addTeacher = () => {
    showModal();
    setSelected(null);
  };

  function deleteTeams(id) {
    confirm({
      title: "Do you Want to delete this teacher?",
      icon: <ExclamationCircleFilled />,
      onOk: async () => {
        await axios.delete(
          `https://64caafa0700d50e3c7053191.mockapi.io/foodbolltams/${id}`
        );
        getTeachers();
      },
    });
  }

  function StudentCategory(id) {
    localStorage.setItem("ID", JSON.stringify(id));
  }

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const paginatedTeachers = teachers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // console.log(setPageSize);
  // console.log(loading);

  return (
    <section>
      <div className="container ">
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
        <div style={{ marginTop: "50px" }} id="footbells" className="footbell">
          {paginatedTeachers.map(({ name, image, id }) => (
            <article key={id} className="card">
              <img
                className="card__background"
                src={image}
                style={{ objectFit: "cover" }}
                alt="Photo of Cartagena's cathedral at the background and some colonial style houses"
                // width="1720"
                // height="1993"
              />
              <div className="card__content | flow">
                <div className="card__content--container | flow">
                  <h2 className="card__title">{name}</h2>
                  <p className="card__description">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Rerum in
                  </p>
                </div>
                <div className="card__buttons">
                  <Link
                    to={`/players`}
                    className="card__button"
                    onClick={() => StudentCategory(id)}
                  >
                    {" "}
                    <Groups2Icon
                      style={{
                        fontSize: "50px",
                        color: "rgb(255, 187, 0)",
                      }}
                    />
                  </Link>
                  <Link
                    className="card__button"
                    onClick={() => deleteTeams(id)}
                  >
                    {" "}
                    <DeleteIcon style={{ fontSize: "45px", color: "red" }} />
                  </Link>
                  <Link className="card__button" onClick={() => editTeams(id)}>
                    {" "}
                    <BorderColorIcon
                      style={{ fontSize: "39px", color: "green" }}
                    />
                  </Link>{" "}
                </div>
              </div>
            </article>
          ))}
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
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true,
                message: "Please fill this field!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            rules={[
              {
                required: true,
                message: "Please fill this field!",
              },
              { type: "url", warningOnly: true },
              { type: "string", min: 6 },
            ]}
            name="image"
            label="Image"
          >
            <Input />
          </Form.Item>
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

// import { useState } from "react";
// import CategoryCard from "../components/card/CategoryCard";
// import CategorySearchForm from "../components/form/CategorySearchForm";
// import {
//   useAddCategoryMutation,
//   useDeleteCategoryMutation,
//   useGetCategoriesQuery,
//   useUpdateCategoryMutation,
// } from "../redux/services/categoryServices";
// import ModalForm from "../components/modal/ModalForm";
// import CategoryForm from "../components/form/CategoryForm";
// import axios from "axios";

// const CategoriesP = () => {
//   const [search, setSearch] = useState("");
//   const [show, setShow] = useState(false);
//   const [category, setCategory] = useState({ name: "", image: "" });

//   const {
//     data: categories,
//     isLoading,
//     refetch,
//   } = useGetCategoriesQuery({ search });
//   const [addData] = useAddCategoryMutation();
//   // const [updateData] = useUpdateCategoryMutation();
//   const [deleteData] = useDeleteCategoryMutation();
//   const [editedCategory, setEditedCategory] = useState(null); // Tahrirlovchi kategoriya ma'lumotlari

//   const openModal = () => {
//     setShow(true);
//   };

//   // const closeModal = () => {
//   //   setShow(false);
//   // };

//   const submit = async (values) => {
//     try {
//       await addData(values);
//       refetch();
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const CategorySearchFormProps = {
//     search,
//     setSearch,
//     openModal,
//   };
//   const handleDeleteCategory = async (id) => {
//     try {
//       await deleteData(id);
//       console.log(id);
//       refetch();
//     } catch (err) {
//       console.log(err);
//     }
//   };
//   const handleEditCategory = async (id, updatedCategory) => {
//     // Modal uchun tanlangan kategoriya ma'lumotlarini saqlash
//     const selectedCategory = categories.find((category) => category.id === id);
//     setEditedCategory(selectedCategory);
//     setShow(true); // Modalni ochish
//   };

//   const closeModal = async () => {
//     setShow(false); // Modalni yopish
//     try {
//       // Tahrirlovchi ma'lumotlarni PUT so'rovi orqali saqlash
//       await axios.put(
//         `https://64caafa0700d50e3c7053191.mockapi.io/foodbolltams/${editedCategory.id}`,
//         editedCategory
//       );
//       refetch();
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <section>
//       <div className="container">
//         <CategorySearchForm {...CategorySearchFormProps} />
//         {isLoading ? (
//           "...Loading"
//         ) : (
//           <div className="row">
//             {categories?.map((category) => (
//               <div
//                 key={category.id}
//                 className="cardResponsive col-md-6 col-lg-4 col-xl-4"
//               >
//                 <CategoryCard
//                   {...category}
//                   deleteTeams={() => handleDeleteCategory(category.id)}
//                   editTeams={() => handleEditCategory(category.id)}
//                 />
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//       <ModalForm
//         values={category}
//         show={show}
//         submit={submit}
//         closeModal={closeModal}
//       >
//         <CategoryForm />
//       </ModalForm>
//     </section>
//   );
// };

// export default CategoriesP;
