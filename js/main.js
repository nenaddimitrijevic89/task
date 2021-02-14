function loadXMLDoc() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      myFunction(this);
    }
  };
  xmlhttp.open("GET", "zadatak.xml", true);
  xmlhttp.send();
}
loadXMLDoc();

const myFunction = (xml) => {
  const xmlDoc = xml.responseXML;
  const menu = xmlDoc.getElementsByTagName("menu");
  const heading = xmlDoc.getElementsByTagName("heading4");
  const heading1 = xmlDoc.getElementsByTagName("heading1");
  const toggle = xmlDoc.getElementsByTagName("toggle");
  const headline3 = xmlDoc.getElementsByTagName("headline3");
  const headline4 = xmlDoc.getElementsByTagName("headline4")
  const headText = xmlDoc.getElementsByTagName("headline_text");
  const table = xmlDoc.getElementsByTagName('columns')
  renderTable(table[0].children, heading1[0].innerHTML)
  renderMenu(menu[0].children);
  renderButtonContent(heading[0].innerHTML);
  renderToggle(toggle[0].children);
  renderHeadline3(headline3[0].innerHTML, headText[0].children);
  renderHeadline4(headline4[0].innerHTML)
};

const renderMenu = (text) => {
  const dropdownName = document.querySelector(".dropdown-toggle");
  const dropdown = document.querySelector(".dropdown-menu");
  const nav = document.querySelector(".nav-second");
  let dropdownLink = "";
  let navLinks = "";
  for (let i = 0; i < text.length; i++) {
    if (i === 0) {
      dropdownName.innerHTML = text[i].innerHTML;
    }
    if (i === 1) {
      for (let i = 0; i < 3; i++) {
        dropdownLink += `<li><a class="dropdown-item" href="#">${text[1].innerHTML}</a></li>`;
      }
    }
    if (i > 1) {
      navLinks += `<span class="nav-item"><a class="nav-link active" aria-current="page" href="#">${text[i].innerHTML}</a></span>`;
    }
  }
  dropdown.innerHTML = dropdownLink;
  nav.innerHTML = navLinks;
};

const renderButtonContent = (text) => {
  const content = document.querySelector("#content");
  let contentDiv = "";
  for (let i = 1; i < 4; i++) {
    contentDiv += `<div class="select-div div${i} text-center col-4"><h4 class='text-white'>${text}</h4><button type="button" class="btn btn-primary">Select</button></div>`;
  }
  content.innerHTML = contentDiv;
};

const renderToggle = (text) => {
  const toggle = document.querySelector(".accordion");
  let toggleText = "";
  for (let i = 0; i < 3; i++) {
    toggleText += `<div class="accordion-item">
  <h2 class="accordion-header" id="heading${i}">
    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${i}" aria-expanded="true" aria-controls="collapse${i}">
      ${text[i].innerHTML}
    </button>
  </h2>
  <div id="collapse${i}" class="accordion-collapse collapse show" aria-labelledby="heading${i}" data-bs-parent="#accordionExample">
    <div class="accordion-body">
      ${text[3].innerHTML}
    </div>
  </div>`;
  }
  toggle.innerHTML = toggleText;
};

const renderHeadline3 = (h, p) => {
  const headline = document.querySelector("#headline3");
  let headlineText = "";
  for (let i = 0; i < 2; i++) {
    headlineText += `<div class="col-lg-6 col-md-12">
    <h3>${h}</h3>
    <p>${p[i].innerHTML} ${p[i+1].innerHTML}</p>
    
  </div>`;
  }
  headline.innerHTML = headlineText;
};

const renderHeadline4 = (text) => {
  const headline = document.querySelector("#headline4");
  let headlineText = `<h3>${text}</h3>`;
  headline.innerHTML = headlineText;
}

const renderTable = (data, h) => {
  const thead = document.querySelector('#head');
  const tbody = document.querySelector('#body');
  const tfoot = document.querySelector('#foot');
  const heading = document.querySelector('#table h2');
  
  const head = renderHeadTable(data[0].children);
  const body = renderBodyTable(data[1].children)
  const total = renderTotal(data[2].children)
  thead.innerHTML = head;
  tbody.innerHTML = body;
  tfoot.innerHTML = total;
  heading.innerHTML = h;
}

const renderHeadTable = (data) => {
  let head = '';
  for(let i=1; i<data.length; i++){
    head += `<th>${data[i].innerHTML}</th>`
  }
  return head;
}

const renderBodyTable = (data) => {
  let body = '';
  for(let i=0; i<data.length; i++){
    for(let j=0; j<data[i].children.length; j++){
      for(let k=0; k<data[i].children[j].children.length; k++){
        body += `<td>${data[i].children[j].children[k].innerHTML}</td>`
      }
      body=`<tr>${body}</tr>`;
    }
  }
  return body;
}

const renderTotal = (data) => {
  let total = '';
  for(let i=0; i<data.length; i++){
    if(i===0){
      total+= `<td colspan='3'>${data[i].innerHTML}</td>`;
    }else{
      total+= `<td>${data[i].innerHTML}</td>`;
    }
  }
  return total;
}