import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  IconButton,
  TextField,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { editUser, getAllUsers } from "../../utils/users";
import { toast } from "react-toastify";

const EditUserModal = ({ open, onClose, initialUser, setAdminList }) => {
  const [name, setName] = useState(initialUser?.name || "");
  const [email, setEmail] = useState(initialUser?.email || "");
  const [fullAccess, setFullAccess] = useState(
    initialUser?.super_admin || false
  );
  const [viewOnlyAccess, setViewOnlyAccess] = useState(
    !initialUser?.super_admin || false
  );

  useEffect(() => {
    // Set the default state of checkboxes based on the super_admin property
    setFullAccess(initialUser?.super_admin || false);
    setViewOnlyAccess(!initialUser?.super_admin || false);
  }, [initialUser]);

  const handleCheckboxChange = (checkboxType) => {
    // Ensure that only one checkbox can be checked at a time
    if (checkboxType === "fullAccess") {
      setViewOnlyAccess(false);
      setFullAccess(!fullAccess);
    } else if (checkboxType === "viewOnlyAccess") {
      setFullAccess(false);
      setViewOnlyAccess(!viewOnlyAccess);
    }
  };
  const resetForm = () => {
    // Check if initialUser is not null before accessing its properties
    if (initialUser) {
      setName(initialUser.name || "");
      setEmail(initialUser.email || "");
      setFullAccess(initialUser.super_admin || false);
      // ... handle other properties accordingly
    }
  };
  useEffect(() => {
    // Set the default state of checkboxes based on the super_admin property
    resetForm();
  }, [initialUser]);
  const handleSaveChanges = async () => {
    try {
      // Create an object with only non-empty fields
      const updatedUser = {
        ...(name && { name }),
        ...(email && { email }),
        ...(fullAccess !== undefined && { super_admin: fullAccess }), // Change key to super_admin
      };

      // Check if any fields are provided before making the request
      if (Object.keys(updatedUser).length === 0) {
        console.log("No changes to save.");
        onClose();
        return;
      }

      // Call the onSaveChanges callback with the updated user details
      const res = await editUser(initialUser?.id, { ...updatedUser });
      toast.success(`${res.data.message}`, { position: "top-right" });

      // Refresh the admin list
      const response = await getAllUsers();
      setAdminList(response?.data?.users);

      // Reset the form
      resetForm();

      onClose();
    } catch (error) {
      console.log("Error in updating user", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <div className="bg-white p-2 text-center flex flex-col items-center relative">
        <DialogTitle>
          <div className="flex justify-between items-center">
            <h5 className="text-xl font-bold">Edit User</h5>
            <IconButton
              sx={{ position: "absolute", top: "0.7rem", right: "0.7rem" }}
              onClick={onClose}
            >
              <Close />
            </IconButton>
          </div>
        </DialogTitle>
        <DialogContent className="flex flex-col w-full gap-4">
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mb-4"
          />
          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-4"
          />
          <div className="flex justify-center space-x-4">
            <FormControlLabel
              control={
                <Checkbox
                  checked={fullAccess}
                  onChange={() => handleCheckboxChange("fullAccess")}
                />
              }
              label="Full Access"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={viewOnlyAccess}
                  onChange={() => handleCheckboxChange("viewOnlyAccess")}
                />
              }
              label="View Only Access"
            />
          </div>
          <Button
            variant="contained"
            color="primary"
            className="mt-4 w-[150px] self-center"
            onClick={handleSaveChanges}
          >
            Save Changes
          </Button>
        </DialogContent>
      </div>
    </Dialog>
  );
};

export default EditUserModal;
