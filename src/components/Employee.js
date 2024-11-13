import React, { useState, useRef} from 'react';
import { Typography } from '@mui/material';
import './Employee.css'

export function Employee() {

  const [employeeInfo, setEmployeeInfo] = useState([]);

  const [error, setError] = useState(null);

  const inputRef = useRef(null);


  const getAllEmployees = async () => {
    try {

      const headers = {
        'Cookie': 'humans_21909=1'
      }

      const response = await fetch('http://localhost:8080/v1/employee/employeesInformation', {
        method: 'GET',
        headers: headers

      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(employeeInfo);
      setEmployeeInfo(data);
      console.log(employeeInfo);
    } catch (err) {

      setError("Ocurrio un error extrayendo los datos, intentelo más tarde");
      console.error('Error fetching employee data:', err);
    }
  };

  const getEmployeeById = async (employeeId) => {
    try {

      const headers = {
        'Cookie': 'humans_21909=1'
      }
      var url = `http://localhost:8080/v1/employee/${employeeId}/info`
      console.log(url)
      const response = await fetch(url, {
        method: 'GET',
        headers: headers

      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(employeeInfo);
      setEmployeeInfo([data]);
      console.log(employeeInfo);
    } catch (err) {

      setError("Ocurrio un error extrayendo los datos, intentelo más tarde");
      console.error('Error fetching employee data:', err);
    }
  };

  const handleGetEmployeeInfo = async () => {
    var searchById = false;
  if(inputRef!= null && inputRef.current.value){
    var id = inputRef.current.value; 
    console.log(typeof(id));
    await getEmployeeById(id)
  }else{
    await getAllEmployees()
  }    
    
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Employees Information
      </Typography>

      {error && <Typography color="error">Error: {error}</Typography>}

      <input type="number" ref={inputRef} className='stylish-input'></input>
      <button onClick={()=>handleGetEmployeeInfo()} className='stylish-button'>Search</button>

      <div className="table-container">

        <table >
          <thead >
            <tr >
              <th>Name</th>
              <th>Base Salary</th>
              <th>Age</th>
              <th>Annual Salary</th>
            </tr>
          </thead>
          <tbody>
            {employeeInfo.map((employee) => (
              <tr key={employee.id} >
                <td >{employee.employeeName}</td>
                <td >{employee.employeeSalary}</td>
                <td >{employee.employeeAge}</td>
                <td >{employee.employeeAnnualSalary}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
