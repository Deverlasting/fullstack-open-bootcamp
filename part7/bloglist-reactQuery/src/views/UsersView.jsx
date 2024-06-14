import axios from "axios"
import { useState, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import "../styles/users.css"

const Users = ({ allUsers }) => {
  return (
    <div className="users-container">
      <h2>Users basic info</h2>
      <table className="users-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {allUsers.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users
