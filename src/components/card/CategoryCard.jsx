import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import Groups2Icon from "@mui/icons-material/Groups2";
const CategoryCard = (props) => {
  const { image, name, id, deleteTeams, editTeams } = props;

  function StudentCategory(id) {
    localStorage.setItem("ID", JSON.stringify(id));
  }

  return (
    <div>
      <article className="card">
        <img
          className="card__background"
          src={image}
          style={{ objectFit: "cover" }}
          alt="Photo of Cartagena's cathedral at the background and some colonial style houses"
          width="1920"
          height="2193"
        />
        <div className="card__content | flow">
          <div className="card__content--container | flow">
            <h2 className="card__title">{name}</h2>
            <p className="card__description">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum in
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
                style={{ fontSize: "50px", color: "rgb(255, 187, 0)" }}
              />
            </Link>
            <Link className="card__button" onClick={() => deleteTeams(id)}>
              {" "}
              <DeleteIcon style={{ fontSize: "45px", color: "red" }} />
            </Link>
            <Link className="card__button" onClick={() => editTeams(id)}>
              {" "}
              <BorderColorIcon style={{ fontSize: "39px", color: "green" }} />
            </Link>{" "}
            <Link to={`/categories/${id}`} className="card__button">
              {" "}
              <PeopleAltIcon
                style={{ fontSize: "50px", color: "rgb(255, 187, 0)" }}
              />
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
};

CategoryCard.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  deleteTeams: PropTypes.func,
  editTeams: PropTypes.func,
};

export default CategoryCard;
