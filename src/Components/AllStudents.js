import EachStudent from './EachStudent';
import "../Style/main.css";

const AllStudents = ({ showStudents, addTagValue }) => {
  const students = showStudents.map((student, index) => {
    return (
      <div key={student.firstName + student.lastName}>
        <EachStudent student={student} index={index} addTagValue={addTagValue} />
      </div>
    );
  });

  return (
    <div>{students}</div>
  );
};

export default AllStudents;
