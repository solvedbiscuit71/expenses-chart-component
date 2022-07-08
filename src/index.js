let graph = document.getElementById("graph");

function loadBars(i, amount) {
  let bar = document.createElement("div");
  bar.className = `bar bar-${i}`;
  bar.style.minHeight = `${amount * 3}px`;

  let tooltip = document.createElement("div");
  tooltip.className = "tooltip";
  tooltip.innerText = amount;
  bar.appendChild(tooltip);

  graph.appendChild(bar);
}

function loadLabels(name) {
  let label = document.createElement("div");
  label.className = "label";
  label.innerText = name;

  graph.appendChild(label);
}

async function loadData() {
  let res = await fetch("public/data.json");
  let data = await res.json();

  return data;
}

loadData().then((data) => {
  let highestAmountIndex = 0;
  data.forEach((day, i) => {
    if (day.amount > data[highestAmountIndex].amount) {
      highestAmountIndex = i;
    }

    loadBars(i, day.amount);
  });

  data.forEach((day) => {
    loadLabels(day.day);
  });

  let bar = document.getElementsByClassName(`bar-${highestAmountIndex}`)[0];
  bar.classList.add("bar-highest");
});
