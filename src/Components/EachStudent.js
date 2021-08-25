import { Fragment, useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import "../Style/main.css";

const EachStudent = ({ student, index, addTagValue }) => {
  const [show, setShow] = useState(false);
  const [tagValue, setTagValue] = useState("");

  const findAverage = student.grades.reduce((acc, curr) => {
      acc = acc + Number(curr);
      return acc;
    }, 0) / student.grades.length;

  const grades = student.grades.map((grade, index) => {
    return (
      <p key={index} className="std_grades">
        Test {index + 1}: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{grade}%
      </p>
    );
  });

  const tagValues =
    student.tags && !!student.tags.length
      ? student.tags.map((tag) => {
          return (
            <div type="button" className="std_tag_list" key={index}>
              {tag}
            </div>
          );
        })
      : null;

  const handleChange = (e) => {
    setTagValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTagValue(tagValue, student, index);
    setTagValue("");
  };

  const handleClick = () => {
    setShow(!show);
  };

  return (
    <Fragment>
      <div className="std" key={student.firstName + student.lastName}>
        <div className="std_img">
          <img src={student.pic} alt={"student avatar"} />
        </div>

        <div className="std_details">
          <label className="title">
            {`${student.firstName.toUpperCase()} ${student.lastName.toUpperCase()}`}
          </label>

          <p>Email: {student.email}</p>
          <p>Company: {student.company}</p>
          <p>Skill: {student.skill}</p>
          <p>Average: {findAverage}%</p>

          {show ? <div className="std_grades_list">{grades}</div> : null}

          <div className="std_list">{tagValues}</div>
          <form onSubmit={handleSubmit} aria-label="tagform">
            <input
              className="std_tag_add"
              type="text"
              value={tagValue}
              onChange={handleChange}
              placeholder="Add a tag"
            ></input>
          </form>
        </div>

        <div className="std_button">
          <div className="button_container">
            <button
              className="button_grade_list"
              onClick={handleClick}
              name="show"
            >
              {show ? <FaMinus /> : <FaPlus />}
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EachStudent;
