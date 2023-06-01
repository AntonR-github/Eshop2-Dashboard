import "./userList.css";
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline } from '@mui/icons-material/';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { deleteUser, getUsers } from "../../redux/apiCalls";

export default function UserList() {

  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);

  useEffect(() => {
    getUsers(dispatch)
  }, [dispatch]);


  const handleDelete = (id) => {
    deleteUser(id, dispatch);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "user",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img className="userListImg" src={params.row.img || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"} alt="" />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "isAdmin",
      headerName: "Admin",
      width: 120,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row._id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

 

  return (
    <div className="userList">
         <Link to="/newUser">
          <button className="userAddButton">Create</button>
        </Link>
      <DataGrid
        rows={users.map((user) => 
          ({...user, id: user._id}))}
        enableCellSelection={true}
        columns={columns}
        pageSize={8}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
}
