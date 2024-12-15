const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/";
const select = document.querySelectorAll('.dropdown select');
const btn = document.querySelector('#btn');
const msg = document.querySelector('#msg');
const icon = document.querySelector('.dropdown i');
window.addEventListener('load',()=>{
    list();
    getExchangeRate();
});
const list = () => {
    for (let code in countryList) {
        let option1 = document.createElement('option');
        let img = document.createElement('img');
        img.src = `https://flagsapi.com/${countryList[code]}/shiny/64.png`;
        img.style.width = '1px';
        option1.value = code;
        option1.text = code;
        option1.append(img);
        option1.selected = code === "USD";
        select[0].append(option1);

        let option2 = document.createElement('option');
        option2.value = code;
        option2.text = code;
        option2.selected = code === "INR";
        select[1].append(option2);
    }
}
const updateFlag = (i,flag)=>{
    let country = countryList[select[i].value];
    flag.src = `https://flagsapi.com/${country}/shiny/64.png`;
}
const getExchangeRate = async()=>{
    let from = select[0].value.toLowerCase();
    let to = select[1].value.toLowerCase();
    let fromURL = `${BASE_URL}${from}.json`;
    let response = await fetch(fromURL);
    // console.log(response);
    let data = await response.json();  
    let rate = data[from][to]; //Getting exchange rate
    // console.log(rate);
    let amount = document.getElementById('amt').value;
    if(!amount.trim()){
        alert("Enter amount");
        return;
    }
    let finalAmount = amount*rate;
    // console.log("Final amount: ", finalAmount);
    msg.innerText = `${amount} ${from.toUpperCase()} = ${finalAmount} ${to.toUpperCase()}`;
}
select[0].addEventListener('change', ()=>{
    updateFlag(0,document.flag1);
});
select[1].addEventListener('change', ()=>{
    updateFlag(1,document.flag2);
});
btn.addEventListener('click', (event)=>{
    event.preventDefault();
    getExchangeRate();
});
icon.addEventListener('click',()=>{
    let temp = select[0].value;
    select[0].value = select[1].value;
    select[1].value = temp;
    updateFlag(0,document.flag1);
    updateFlag(1,document.flag2);
    getExchangeRate();
});