
async function getData() {
  const fetchPromise = await fetch("https://api.adviceslip.com/advice", { cache: "no-store" });
  const data = await fetchPromise.json();
  return data.slip
}

async function updateAdvice() {
  const adviceComponent = document.querySelector(".card__advice-text");
  const adviceNumberComponent = document.querySelector(".card__advice-number");

  const newData = await getData();
  let id = newData.id;
  let advice = newData.advice;

  while(advice.length > 90 || id == undefined || advice == undefined) {
      const { newId, advice: newAdvice } = await getData();
      id = newId;
      advice = newAdvice;
  }

  adviceComponent.innerHTML = `"${advice}"`;
  adviceNumberComponent.innerHTML = `ADVICE #${id}`;
}

function main() {
  const btn = document.querySelector(".card__new-advice-btn");
  btn.addEventListener("click", async () => {
    await updateAdvice();
  });
}

main();