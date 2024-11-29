import { Grid, Box, TextField, Button } from "@mui/material";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const initialDescription =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non molestiae illo eos eum ea? Nulla ipsam nostrum, voluptatem dicta explicabo ipsum fuga illum perspiciatis incidunt excepturi deleniti autem obcaecati quae alias eum necessitatibus molestiae? Voluptatem aperiam eligendi sequi blanditiis, repudiandae, aliquid nulla quaerat eaque, incidunt debitis ex laudantium velit beatae. Maiores ipsa, est, dignissimos, et voluptatibus rerum in magnam odio aliquid id placeat sint officia iure sequi error! Blanditiis error cum eveniet explicabo repudiandae ad. Velit consequatur veritatis vero porro eligendi quaerat sunt magnam nesciunt vel debitis. Eum fugit quae, labore autem a quo officia voluptatum, consequatur dolores aperiam ducimus?";

const AssignmentPage: React.FC<{
  label: string;
  classId: string;
}> = ({ label, classId }) => {
  const navigate = useNavigate();

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>(initialDescription);
  const [openDate, setOpenDate] = useState<Date | null>(null);
  const [dueDate, setDueDate] = useState<Date | null>(null);

  const onDoneAssignmentEdit = () => {
    alert(
      "Sending to server: " +
        JSON.stringify({
          sectionLabel: label,
          type: "assignment",
          title: title,
          description: description,
          openDate: openDate,
          dueDate: dueDate,
        })
    );
    navigate(`/home/course?classId=${classId}`);
  };

  const onCancelAssignmentEdit = () => {
    navigate(`/home/course?classId=${classId}`);
  };

  const handleOpenDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    // Check if the value is empty (cleared)
    if (!value) {
      setOpenDate(null);
      return;
    }

    // Validate and set the new date
    setOpenDate(new Date(value));
  };

  const handleDueDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    // Check if the value is empty (cleared)
    if (!value) {
      setDueDate(null);
      return;
    }

    // Validate and set the new date
    setDueDate(new Date(value));
  };

  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 900,
        height: 600,
        bgcolor: "white",
        //border: '2px solid #000',
        boxShadow: 2,
        p: 4,
        display: "flow",
        borderRadius: 8,
      }}
    >
      <TextField
        label="Tiêu đề"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        margin="normal"
        fullWidth
        sx={{ height: 40, "& .MuiInputBase-input": { height: "0.875em" } }}
      />

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            label="Ngày mở"
            placeholder=""
            type={"date"}
            value={openDate?.toISOString().split("T")[0] ?? null}
            onChange={handleOpenDateChange}
            margin="normal"
            fullWidth
            sx={{ height: 40, "& .MuiInputBase-input": { height: "0.875em" } }}
            InputLabelProps={{
              shrink: true, // Ensures the label stays visible when selecting a date
            }}
            inputProps={{
              placeholder: "", // Removes extra placeholder display
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Ngày đóng"
            placeholder=""
            type={"date"}
            value={dueDate?.toISOString().split("T")[0] ?? null}
            onChange={handleDueDateChange}
            margin="normal"
            fullWidth
            sx={{ height: 40, "& .MuiInputBase-input": { height: "0.875em" } }}
            InputLabelProps={{
              shrink: true, // Ensures the label stays visible when selecting a date
            }}
            inputProps={{
              placeholder: "", // Removes extra placeholder display
            }}
          />
        </Grid>
      </Grid>

      <TextField
        label="Mô tả"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        margin="normal"
        sx={{ height: 40, "& .MuiInputBase-input": { height: "0.875em" } }}
        fullWidth
        multiline
        maxRows={15}
      />

      <Box
        sx={{
          // border: '1px solid #ff0099',
          position: "absolute",
          bottom: 16,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 10,
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            onDoneAssignmentEdit();
          }}
        >
          Hoàn Tất
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={() => {
            onCancelAssignmentEdit();
          }}
        >
          Huỷ
        </Button>
      </Box>
    </Box>
  );
};

export default AssignmentPage;
