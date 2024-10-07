const url = "https://shannon945.github.io/farm_produce/data.json";
const showList = document.querySelector(".showList");
const buttonGroup = document.querySelector(".button-group");
const search = document.querySelector(".search");
const searchInput = document.querySelector(".rounded-end");

let data = [];

function getData() {
  axios.get(url).then(function (response) {
    data = response.data;
    renderData(data);
  });
}
getData();

function renderData(data) {
  const str = data.reduce((accumulator, item, index) => {
    return (
      accumulator +
      `<tr>
        <td>${item.作物名稱}</td>
          <td>${item.市場名稱}</td>
        <td>${item.上價}</td>
        <td>${item.中價}</td>
        <td>${item.下價}</td>
        <td>${item.平均價}</td>
        <td>${item.交易量}</td>
        </tr>`
    );
  }, "");
  showList.innerHTML = str;
}

//分類按鈕
buttonGroup.addEventListener("click", (e) => {
  if (e.target.nodeName === "BUTTON") {
    let typeCode = e.target.dataset.type;
    let filterData = [];
    if (e.target.dataset.type === typeCode) {
      filterData = data.filter((item) => item.種類代碼 === typeCode);
    }
    renderData(filterData);
  }
});

//搜尋按鈕
search.addEventListener("click", searchItem);
function searchItem() {
  let filterData = data.filter((item) =>
    item.作物名稱.match(searchInput.value)
  );
  renderData(filterData);
}

//Enter
searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    searchItem();
  }
});

const select = document.querySelector("#js-select");
select.addEventListener("change", function (e) {
  switch (e.target.value) {
    case "依上價排序":
      selectChange("上價");
      break;
    case "依中價排序":
      selectChange("中價");
      break;
    case "依下價排序":
      selectChange("下價");
      break;
    case "依平均價排序":
      console.log(true);
      selectChange("平均價");
      break;
    case "依交易量排序":
      selectChange("交易量");
      break;
  }

  function selectChange(value) {
    data.sort((a, b) => a[value] - b[value]);
    renderData(data);
  }
});
