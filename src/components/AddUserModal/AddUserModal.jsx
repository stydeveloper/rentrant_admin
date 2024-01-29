import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import CloseIcon from "@mui/icons-material/Close";
import { register } from "../../utils/auth";
import { toast } from "react-toastify";
import { getAllUsers } from "../../utils/users";

const AddNewUserModal = ({ open, onClose, setAdminList }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accessType, setAccessType] = useState("view");

  const handleAddUser = async () => {
    // Create newUser object
    const newUser = {
      name,
      email,
      password,
    };

    // Add access field based on accessType
    if (accessType === "full") {
      newUser.access = true;
    }

    try {
      const res = await register(newUser); // Pass newUser to the register function
      toast.success(`${res.data.message}`, { position: "top-right" });

      const response = await getAllUsers();
      setAdminList(response?.data?.users);
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2 className="text-center">Add New Admin</h2>
          <CloseIcon onClick={onClose} style={{ cursor: "pointer" }} />
        </div>
        <form className="flex flex-col w-full">
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Select
            value={accessType}
            onChange={(e) => setAccessType(e.target.value)}
            fullWidth
            margin="normal"
            className="my-2"
            inputProps={{
              // Set the shrink attribute to false to prevent label shrinkage
              shrink: false,
            }}
          >
            <MenuItem value="view">View Only</MenuItem>
            <MenuItem value="full">Full Access</MenuItem>
          </Select>
          <Button
            className="w-[160px] self-center"
            variant="contained"
            color="primary"
            onClick={handleAddUser}
          >
            Add Admin
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default AddNewUserModal;
