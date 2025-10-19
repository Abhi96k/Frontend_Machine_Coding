import { sum } from "./sum.js";
const button = document.getElementById("button");
const resultEl = document.getElementById("result");

if (button) {
  button.addEventListener("click", () => {
    const result = sum(4, 5);
    if (resultEl) resultEl.textContent = `Result: ${result}`;
  });
}
