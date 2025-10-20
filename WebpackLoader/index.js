// The project contains an `assest/` folder (typo in name) with image assets.
// We'll import those assets and set the `src` attributes from JS so HTML
// doesn't hard-code static paths.
import logo from "./assest/logo.svg";
import image1 from "./assest/image1.svg";
import image2 from "./assest/image2.svg";
import thumbnail from "./assest/thumbnail.svg";

document.addEventListener("DOMContentLoaded", () => {
  const toast = document.getElementById("toast");
  const title = document.getElementById("title");

  if (toast) {
    toast.style.visibility = "hidden";
  }

  if (title) {
    title.addEventListener("click", () => {
      if (!toast) return;
      toast.style.visibility =
        toast.style.visibility === "hidden" ? "visible" : "hidden";
    });
  }

  const logoEl = document.getElementById("logo");
  if (logoEl) logoEl.src = logo;

  const img1El = document.getElementById("image1");
  if (img1El) img1El.src = image1;

  const img2El = document.getElementById("image2");
  if (img2El) img2El.src = image2;

  const thumbEl = document.getElementById("thumbnail");
  if (thumbEl) thumbEl.src = thumbnail;
});
