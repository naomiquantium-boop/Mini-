
const sqlite3=require("sqlite3").verbose()
const db=new sqlite3.Database("./spyton.db")

db.serialize(()=>{

db.run(`CREATE TABLE IF NOT EXISTS tokens(
id INTEGER PRIMARY KEY AUTOINCREMENT,
name TEXT,
symbol TEXT,
contract TEXT,
website TEXT,
telegram TEXT,
twitter TEXT,
logo TEXT,
votes INTEGER DEFAULT 0,
boost INTEGER DEFAULT 0,
status TEXT
)`)

db.run(`CREATE TABLE IF NOT EXISTS payments(
id TEXT,
token_id INTEGER,
amount TEXT,
verified INTEGER DEFAULT 0
)`)

db.run(`CREATE TABLE IF NOT EXISTS votes(
token_id INTEGER,
voter TEXT
)`)

})

module.exports=db
