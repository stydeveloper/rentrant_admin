import React, { useEffect, useState } from "react";
import { getAllUsers } from "../../utils/users";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import { FormControlLabel, FormGroup, Grid, Paper } from "@mui/material";
import EditUserModal from "../../components/EditUserModal/EditUserModal"; // Import the EditUserModal component
import DeleteUserModal from "../../components/DeleteUserModal/DeleteUserModal"; // Import the DeleteUserModal component
import AddNewUserModal from "../../components/AddUserModal/AddUserModal";
import AddIcon from "@mui/icons-material/Add";

const AdminDetails = () => {
  const [adminList, setAdminList] = useState([]);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [isEditUserModalOpen, setEditUserModalOpen] = useState(false);
  const [isDeleteUserModalOpen, setDeleteUserModalOpen] = useState(false);
  const [isAddNewUserModalOpen, setAddNewUserModalOpen] = useState(false);
  useEffect(() => {
    const fetchAdminList = async () => {
      try {
        const response = await getAllUsers();
        setAdminList(response?.data?.users);
      } catch (error) {
        console.error("Error fetching admin list:", error);
      }
    };

    fetchAdminList();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", hide: true },
    { field: "name", headerName: "Name", width: 150 },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "assignedAccess",
      headerName: "Assigned Access",
      width: 300,
      renderCell: (params) => (
        <FormGroup>
          {params.row.super_admin ? (
            <FormControlLabel
              control={<Checkbox disabled checked />}
              label="Full Access"
            />
          ) : (
            <FormControlLabel
              control={<Checkbox disabled />}
              label="View Only"
            />
          )}
        </FormGroup>
      ),
    },
    {
      field: "manage",
      headerName: "Manage ist",
      width: 200,
      renderCell: (params) => (
        <Grid container spacing={1}>
          <Grid item>
            <Button
              variant="contained"
              style={{ backgroundColor: "green" }}
              onClick={() => handleEdit(params.row)}
            >
              Edit
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              style={{ backgroundColor: "red" }}
              onClick={() => handleDelete(params.row)}
            >
              Delete
            </Button>
          </Grid>
        </Grid>
      ),
    },
    // {
    //   field: "addAdmin",
    //   headerName: (
    //     <Button
    //       variant="contained"
    //       style={{
    //         backgroundColor: "blue",
    //         color: "white",
    //       }}
    //       onClick={() => setAddNewUserModalOpen(true)}
    //     >
    //       Add Admin
    //     </Button>
    //   ),
    //   width: "100vh",
    //   sortable: false,
    //   filterable: false,
    //   renderCell: () => <></>, // Empty cell rendering since it's a header-only button
    // },
  ];

  const rows = adminList.map((admin) => ({
    id: admin.id,
    name: admin.name,
    email: admin.email,
    super_admin: admin.super_admin,
  }));

  const handleEdit = (admin) => {
    setSelectedAdmin(admin);
    setEditUserModalOpen(true);
  };

  const handleDelete = (admin) => {
    setSelectedAdmin(admin);
    setDeleteUserModalOpen(true);
  };

  const handleEditUserModalClose = () => {
    setEditUserModalOpen(false);
  };

  const handleDeleteUserModalClose = () => {
    setDeleteUserModalOpen(false);
  };

  const handleAddNewUserModalClose = () => {
    setAddNewUserModalOpen(false);
  };

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <Paper className="flex flex-col gap-2">
        <div className="flex w-full px-2 justify-end">
          <button
            onClick={() => setAddNewUserModalOpen(true)}
            className="flex gap-1 self-end bg-blue-500 text-white px-4 py-2 rounded-lg mt-2"
          >
            <AddIcon /> Add Admin
          </button>
        </div>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          checkboxSelection
          disableSelectionOnClick
        />
      </Paper>

      {/* Edit User Modal */}
      <EditUserModal
        open={isEditUserModalOpen}
        onClose={handleEditUserModalClose}
        initialUser={selectedAdmin}
        setAdminList={setAdminList}
      />

      {/* Delete User Modal */}
      <DeleteUserModal
        open={isDeleteUserModalOpen}
        onClose={handleDeleteUserModalClose}
        initialUser={selectedAdmin}
        setAdminList={setAdminList}
      />
      {
        <AddNewUserModal
          open={isAddNewUserModalOpen}
          onClose={handleAddNewUserModalClose}
          setAdminList={setAdminList}
        />
      }
    </div>
  );
};

export default AdminDetails;
