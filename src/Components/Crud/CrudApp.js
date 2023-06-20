import React, { useState, useEffect } from 'react';
import './CrudApp.css';
import Navegacion from '../Navegacion/Navegacion';
import axios from 'axios'; // Asegúrate de tener instalada la dependencia de axios

const CrudApp = () => {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dni, setDni] = useState('');
  const [grade, setGrade] = useState('');
  const [career, setCareer] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [selectedGrade, setSelectedGrade] = useState('');
  const [selectedCareer, setSelectedCareer] = useState('');

  useEffect(() => {
    setEditIndex(null);
  }, [selectedGrade, selectedCareer]);

  const careers = ['Software', 'Molienda', 'Alimentación'];

  const addStudent = async () => {
    if (
      name.trim() !== '' &&
      lastName.trim() !== '' &&
      dni.toString().trim() !== '' && 
      grade.trim() !== '' &&
      career !== ''
    ) {
      if (editMode && editIndex !== null) {
        const updatedStudents = [...students];
        const originalIndex = getOriginalStudentIndex(editIndex);
        updatedStudents[originalIndex] = { name, lastName, dni, grade, career };
        await updateStudent(dni, name, lastName, grade, career);
        setStudents(updatedStudents);
        setEditMode(false);
        setEditIndex(null);
      } else {
        await createStudent(name, lastName, dni, grade, career);
        const newStudent = { name, lastName, dni, grade, career };
        setStudents([...students, newStudent]);
      }
      setName('');
      setLastName('');
      setDni('');
      setGrade('');
      setCareer('');
    }
  };

  const createStudent = async (name, lastName, dni, grade, career) => {
    try {
      const user = {
        name,
        lastName,
        dni,
        grade,
        career
      };

      const response = await axios.post('http://localhost:3001/users', user);

      if (response.status === 201) {
        console.log('Usuario creado con éxito');
      } else {
        console.error('Ocurrió un error al crear el usuario');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const updateStudent = async (dni, name, lastName, grade, career) => {
    try {
      const user = {
        name,
        lastName,
        dni,
        grade,
        career
      };

      const response = await axios.put(`http://localhost:3001/users/${dni}`, user);

      if (response.status === 200) {
        console.log('Usuario actualizado con éxito');
      } else {
        console.error('Ocurrió un error al actualizar el usuario');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const deleteStudent = async (dni) => {
    try {
      const response = await axios.delete('http://localhost:3001/users', {
        data: { dni }
      });

      if (response.status === 200) {
        console.log('Usuario eliminado con éxito');
        const updatedStudents = students.filter((student) => student.dni !== dni);
        setStudents(updatedStudents);
      } else {
        console.error('Ocurrió un error al eliminar el usuario');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const getOriginalStudentIndex = (editIndex) => {
    if (selectedGrade !== '' && selectedCareer !== '') {
      const filteredStudents = students.filter(
        (student) => student.grade === selectedGrade && student.career === selectedCareer
      );
      return students.indexOf(filteredStudents[editIndex]);
    } else {
      return editIndex;
    }
  };

  const selectGrade = (event) => {
    setSelectedGrade(event.target.value);
  };

  const selectCareer = (event) => {
    setSelectedCareer(event.target.value);
  };

  const editStudent = (index) => {
    if (selectedGrade !== '' && selectedCareer !== '') {
      const filteredStudents = students.filter(
        (student) => student.grade === selectedGrade && student.career === selectedCareer
      );
      const originalIndex = students.indexOf(filteredStudents[index]);
      const student = students[originalIndex];
      setName(student.name);
      setLastName(student.lastName);
      setDni(student.dni);
      setGrade(student.grade);
      setCareer(student.career);
      setEditMode(true);
      setEditIndex(originalIndex);
    } else {
      setName(students[index].name);
      setLastName(students[index].lastName);
      setDni(students[index].dni);
      setGrade(students[index].grade);
      setCareer(students[index].career);
      setEditMode(true);
      setEditIndex(index);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/users');

        if (response.status === 200) {
          
          for (var i = 0; i < response.data.length; i++) {
            response.data[i].name = response.data[i].nombre
            response.data[i].lastName = response.data[i].apellido;
            response.data[i].grade = response.data[i].anio;
            response.data[i].career = response.data[i].carrera;
          }
          setStudents(response.data);
        } else {
          console.error('Ocurrió un error al obtener los usuarios');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Navegacion />
      <div className="crud-app">
        <h2>Crud Alumnos</h2>
        <div className="input-container">
          <input
            type="text"
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Apellido"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <input
            type="text"
            placeholder="DNI"
            value={dni}
            onChange={(e) => setDni(e.target.value)}
          />

          <select value={grade} onChange={(e) => setGrade(e.target.value)}>
            <option value="">Año</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
          <select value={career} onChange={(e) => setCareer(e.target.value)}>
            <option value="">Carrera</option>
            {careers.map((career) => (
              <option key={career} value={career}>
                {career}
              </option>
            ))}
          </select>
          <button onClick={addStudent}>{editMode ? 'Editar' : 'Agregar'}</button>
        </div>
        <div className="filter-container">
          <select value={selectedGrade} onChange={selectGrade}>
            <option value="">Filtrar por año</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
          <select value={selectedCareer} onChange={selectCareer}>
            <option value="">Filtrar por Carrera</option>
            {careers.map((career) => (
              <option key={career} value={career}>
                {career}
              </option>
            ))}
          </select>
        </div>
        <div className="students-container">
          {students.map((student, index) => (
            <div className="student" key={index}>
              <span>{student.name}</span>
              <span>{student.lastName}</span>
              <span>{student.dni}</span>
              <span>{student.grade}</span>
              <span>{student.career}</span>
              <button onClick={() => editStudent(index)}>Editar</button>
              <button onClick={() => deleteStudent(student.dni)}>Eliminar</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CrudApp;
