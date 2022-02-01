const exp = require('express')
const cors = require('cors')
const {SQL} = require('./db')

const app = exp()

app.use(exp.json())
app.use(cors())

app.get('/degrees', async (req, res)=> {
    try {
        const degrees = await SQL(`SELECT * FROM degrees`)
        res.send(degrees)
    } catch (err) {
        console.log(err);
        res.sendStatus(500)
    }
})

app.get('/students', async (req, res)=> {
    try {
        const students = await SQL(`SELECT students.id,
        students.name,
        students.age,
        students.degree_phase,
        degrees.name as degrees_name,
        degrees.projects
        FROM students
         inner join degrees
         on students.degree_id = degrees.id`)
        res.send(students)
    } catch (err) {
        console.log(err);
        res.sendStatus(500)
    }
})

app.post('/newstudent', async (req, res)=> {
    try {
        const {name , age, degreeid , degreephase} = req.body
        if(!name || !age || !degreeid || !degreephase ){
            return res.status(400).send({err:"missing some info"})
        }
        await SQL(`insert into students(name , age ,degree_id, degree_phase)
        values("${name}" , ${age} , ${degreeid} , ${degreephase})`)
        res.send({msg:'student added!'})
    } catch (err) {
        console.log(err);
        res.sendStatus(500)
    }
})

app.get('/students/:studentid', async (req, res)=> {
    try {
        const {studentid} = req.params
        if(!studentid){
            return res.status(400).send({err:"student not found!"})
        }   
        const student = await SQL(`SELECT students.id,
        students.name,
        students.age,
        students.degree_phase,
        degrees.name as degrees_name,
        degrees.projects
        FROM students 
         inner join degrees
         on students.degree_id = degrees.id
         WHERE students.id = ${studentid}`)
        res.send(student)     
    } catch (err) {
        console.log(err);
        res.sendStatus(500)
    }
})

app.put('/students/:studentid', async (req, res)=> {
    try {
        const {studentid} = req.params
        const {degreephase, age} = req.body
        if(!degreephase || !age || !studentid){
            return res.status(400).send({err:'missing some info'})
        }
        await SQL(`UPDATE students SET degree_phase = ${degreephase}, age = ${age} WHERE id = ${studentid}`)
        res.send({msg:'Information updated.'})
    } catch (err) {
        console.log(err);
        res.sendStatus(500)
    }
})

app.delete('/students/:studentid', async (req, res)=> {
    try {
        const {studentid}= req.params
        if(!studentid){
            return res.status(400).send({err:'missing some info'})
        }
        await SQL(`DELETE FROM students WHERE id = ${studentid}`)
        res.send({msg:'student deleted.'})
    } catch (err) {
        console.log(err);
        res.sendStatus(500)
    }
})

app.listen(1000 , ()=> console.log("server run on port 1000"))