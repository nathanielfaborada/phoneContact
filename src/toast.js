export function toast(message, type = "info") {
  const backgrounds = {
    success: "#14b8a6",
    error:   "#e53e3e",
    info:    "#3b82f6",
    warning: "#f59e0b",
  };

  Toastify({
    text: message,
    duration: 3000,
    gravity: "top",
    position: "right",
    stopOnFocus: true,
    style: {
      background: backgrounds[type] ?? backgrounds.info,
      borderRadius: "8px",
      fontSize: "14px",
    },
  }).showToast();
}
