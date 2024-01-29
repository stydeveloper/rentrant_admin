export const formatDate = (dateString) => {
  // Check if dateString is not undefined
  if (!dateString) {
    console.error("Invalid dateString: It is undefined or null.");
    return "Invalid Date";
  }

  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = new Date(dateString).toLocaleDateString(
    "en-US",
    options
  );

  // Check if formattedDate is "Invalid Date"
  if (formattedDate === "Invalid Date") {
    console.error("Invalid formattedDate: Unable to parse the date.");
  }

  console.log("Formatted Date:", formattedDate);
  return formattedDate;
};
