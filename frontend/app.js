
const API="/api/tokens"

async function load(){

const res=await fetch(API+"/leaderboard")
const data=await res.json()

const el=document.getElementById("tokens")

el.innerHTML=""

data.forEach(t=>{

const div=document.createElement("div")
div.className="token"

div.innerHTML=`
<h3>${t.name} (${t.symbol})</h3>
<p>${t.contract}</p>
🔥 Votes: ${t.votes} | 🚀 Boost: ${t.boost}
<br>
<button onclick="vote(${t.id})">Vote</button>
<button onclick="boost(${t.id})">Boost</button>
`

el.appendChild(div)

})

}

async function vote(id){

await fetch(API+"/vote/"+id,{method:"POST"})
load()

}

async function boost(id){

await fetch(API+"/boost/"+id,{method:"POST"})
alert("Boost requested. Pay boost fee.")
load()

}

async function submitToken(){

const data={
name:name.value,
symbol:symbol.value,
contract:contract.value,
website:website.value,
telegram:telegram.value,
twitter:twitter.value,
logo:logo.value
}

await fetch(API+"/submit",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify(data)
})

alert("Token submitted. Pay listing fee.")
}

load()
