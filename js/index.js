
async function getData() {
  const fetchPromise = await fetch("https://api.adviceslip.com/advice", { cache: "no-store" });
  const data = await fetchPromise.json();
  return data.slip
}

async function updateAdvice() {
  const adviceComponent = document.querySelector(".card__advice-text");
  const adviceNumberComponent = document.querySelector(".card__advice-number");

  const {id, advice: newAdvice} = await getData();
  adviceComponent.innerHTML = `"${newAdvice}"`;
  adviceNumberComponent.innerHTML = `ADVICE #${id}`;
}

function main() {
  const btn = document.querySelector(".card__new-advice-btn");
  btn.addEventListener("click", async () => {
    await updateAdvice();
  });
}

main();