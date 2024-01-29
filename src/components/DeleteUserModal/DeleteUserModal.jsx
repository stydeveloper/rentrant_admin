import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  IconButton,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { deleteUser, getAllUsers } from "../../utils/users";
import { toast } from "react-toastify";

const DeleteUserModal = ({ open, onClose, initialUser, setAdminList }) => {
  const handleDelete = async () => {
    // Check if initialUser.id is present
    if (!initialUser || !initialUser.id) {
      console.error("Invalid user data. Unable to delete user.");
      return;
    }

    try {
      console.log("User deletion confirmed");

      const res = await deleteUser(initialUser.id);
      toast.success(`${res.data.message}`, { position: "top-right" });

      // Refresh the admin list
      const response = await getAllUsers();
      setAdminList(response?.data?.users);

      // Close the modal
      onClose();
    } catch (error) {
      console.log("Error deleting user:", error);
      // Handle the error, show a toast or any other error indication
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <div className="bg-white p-2 text-center flex flex-col items-center relative">
        <DialogTitle>
          <div className="flex justify-between items-center">
            <h5 className="text-xl font-bold">Delete User</h5>
            <IconButton
              sx={{ position: "absolute", top: "0.7rem", right: "0.7rem" }}
              onClick={onClose}
            >
              <Close />
            </IconButton>
          </div>
        </DialogTitle>
        <DialogContent className="flex flex-col w-full">
          <p className="text-base mb-4">
            Are you sure you want to delete this user?
          </p>
          <div className="flex justify-center space-x-4">
            <Button
              variant="contained"
              color="primary"
              className="bg-red-500 text-white"
              onClick={handleDelete}
            >
              Yes
            </Button>
            <Button variant="contained" onClick={onClose}>
              No
            </Button>
          </div>
        </DialogContent>
      </div>
    </Dialog>
  );
};

export default DeleteUserModal;
