function myFunction() {
  const form = document.getElementById("formvalidation");
  
  if (form.style.display === "none" || form.style.display === "") {
    form.style.display = "block";
  } else {
    form.style.display = "none";
  }
}
