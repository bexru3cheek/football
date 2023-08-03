import { useState } from "react";
import CategoryCard from "../components/card/CategoryCard";
import CategorySearchForm from "../components/form/CategorySearchForm";
import {
  useAddCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
  useUpdateCategoryMutation,
} from "../redux/services/categoryServices";
import ModalForm from "../components/modal/ModalForm";
import CategoryForm from "../components/form/CategoryForm";

const CategoriesP = () => {
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(false);
  const [category, setCategory] = useState({ name: "", image: "" });

  const {
    data: categories,
    isLoading,
    refetch,
  } = useGetCategoriesQuery({ search });
  const [addData] = useAddCategoryMutation();
  const [updateData] = useUpdateCategoryMutation();
  const [deleteData] = useDeleteCategoryMutation();


  const openModal = () => {
    setShow(true);
  };

  const closeModal = () => {
    setShow(false);
  };

  const submit = async (values) => {
    try {
      await addData(values);
      refetch();
    } catch (err) {
      console.log(err);
    }
  };

  const CategorySearchFormProps = {
    search,
    setSearch,
    openModal,
  };
  const handleDeleteCategory = async (id) => {
    try {
      await deleteData(id);
      refetch();
    } catch (err) {
      console.log(err);
    }
  };
  const handleEditCategory = async (id, updatedCategory) => {
    try {
      await updateData(updatedCategory, { id });
      refetch();
      closeModal(); // Modalni yopish
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section>
      <div className="container">
        <CategorySearchForm {...CategorySearchFormProps} />
        {isLoading ? (
          "...Loading"
        ) : (
          <div className="row">
            {categories?.map((category) => (
              <div
                key={category.id}
                className="cardResponsive col-md-6 col-lg-4 col-xl-4"
              >
                <CategoryCard
                  {...category}
                  deleteTeams={() => handleDeleteCategory(category.id)}
                  editTeams={() => handleEditCategory(category.id)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
      <ModalForm
        values={category}
        show={show}
        submit={submit}
        closeModal={closeModal}
      >
        <CategoryForm />
      </ModalForm>
    </section>
  );
};

export default CategoriesP;
