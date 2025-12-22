function myFunction() {
  const form = document.getElementById("formvalidation");
  
  if (form.style.display === "none" || form.style.display === "") {
    form.style.display = "block";
  } else {
    form.style.display = "none";
  }
}

function showMale() {
    document.getElementById("maleOptions").style.display = "";
    document.getElementById("femaleOptions").style.display = "none";
}

function showFemale() {
    document.getElementById("maleOptions").style.display = "none";
    document.getElementById("femaleOptions").style.display = "";
}


