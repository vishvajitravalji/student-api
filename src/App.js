import AllStudents from './Components/AllStudents';
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import "./Style/main.css";

const App = () => {
  const [showStudents, setShowStudents] = useState([]);
  const [nameSearch, setNameSearch] = useState('');
  const [tagSearch, setTagSearch] = useState('');
  const [filteredStudents, setFilteredStudents] = useState([]);


  const fetchStudentData = async () => {
    const studentApi = 'https://api.hatchways.io/assessment/students';
    try {
      const res = await axios.get(studentApi);
      setShowStudents(res.data.students);
    } catch (error) {
        alert(error)
    }
  };

  const addTagValue = (tagName, student, studentIndex) => {
    const newStudents = [...showStudents];
    if (!!student.tags) {
      student.tags = [...student.tags, tagName];
    } else {
      student.tags = [tagName];
    }
    newStudents[studentIndex] = student;
    setShowStudents(newStudents);
  };

  const filterStudents = useCallback(() => {
    let filtered = [];

    if (nameSearch.length > 1 || tagSearch.length > 0) {
      filtered = showStudents.filter((student) => {
          const allTags = student.tags ? student.tags.join(' ') : ' ';
          const fullName = `${student.firstName} ${student.lastName}`;

        return (
          allTags.toLowerCase().includes(tagSearch.toLowerCase()) &&
          fullName.toLowerCase().includes(nameSearch.toLowerCase())
        );
      });
    }

    setFilteredStudents(filtered);
  }, [nameSearch, tagSearch, showStudents]);

  const handleChange = (e) => {
    if (e.target.name === 'name') {
      setNameSearch(e.target.value);
    } else {
      setTagSearch(e.target.value);
    }
  };

  useEffect(() => {
    filterStudents();
  }, [nameSearch, tagSearch, filterStudents]);

  useEffect(() => {
    fetchStudentData();
  }, []);

  return (
    <section className="main">
      <div className="search_bar">
        <input
          type="text"
          name="name"
          placeholder="Search by name"
          value={nameSearch}
          onChange={handleChange}
        ></input>
        <input
          type="text"
          name="tag"
          placeholder= "Search by tag"
          value={tagSearch}
          onChange={handleChange}
        ></input>
      </div>
      {
        <div className="student">
        <AllStudents 
          showStudents={
            tagSearch.length || nameSearch.length > 1
              ? filteredStudents
              : showStudents
          }
          addTagValue={addTagValue}
        />
        </div>
      }
    </section>
  );
};



export default App;
