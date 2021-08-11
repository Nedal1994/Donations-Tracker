'use strict';

let mainForm = document.getElementById('form')
let table = document.getElementById('mainTable')
let mainRow=document.getElementById('mainRow')

function saveStorage()
{
    let stringArr = JSON.stringify(donationArr)
    localStorage.setItem('donations', stringArr)
}

function loadStorage()
{
    let data = localStorage.getItem('donations')
    let parsedArr=JSON.parse(data)
    if (parsedArr !== null)
    {
        for(let i=0;i<parsedArr.length;i++)
        {
            new Donations(parsedArr[i].name, parsedArr[i].amount, parsedArr[i].age)
        }
    }
    else
    {
        new Donations(this.name,this.amount,this.age)
    }
}
let min=20;
let max=60;

function random(min,max)
{
    return Math.random() * (max - min) + min;
}

let donationArr=[];

function Donations(name,amount,age)
{
    this.name=name;
    this.amount=amount;
    this.age=age

    
    donationArr.push(this)
    
}

Donations.prototype.ageRandom=function()
{
    this.age=parseInt(random(min,max))
}

Donations.prototype.render=function() 
{
    let tr=document.createElement('tr')
    table.appendChild(tr)
    
    let td=document.createElement('td')
    tr.appendChild(td)
    td.textContent=`${this.name}`

    let td1=document.createElement('td')
    tr.appendChild(td1)
    td1.textContent=`${this.amount}`

    let td2=document.createElement('td')
    tr.appendChild(td2)
    td2.textContent=`${this.age}`
}


mainForm.addEventListener('submit', handleSubmit)

function handleSubmit(event)
{
    event.preventDefault()

    let newDonation = new Donations(this.name,this.amount,this.age)

    saveStorage()
   
    for(let i=0;i<donationArr.length;i++)
{
    donationArr[i].ageRandom()
    donationArr[i].render()
}

}

loadStorage()

for(let i=0;i<donationArr.length;i++)
{
    donationArr[i].ageRandom()
    donationArr[i].render()
}