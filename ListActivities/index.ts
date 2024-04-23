import express, { Express, Request, Response } from "express"
import morgan from "morgan"

const app: Express = express()
const PORT: number = 5050

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(morgan('dev'))

interface Reservation {
    id: string
    title: string
    user: string
    description: string
    startDateTime: string
    endDateTime: string
}

app.get('/api/reservations', async (req: Request, res: Response) => {
    const data = await fetch('http://localhost:3001/api/reservations')
    const reservations: Reservation[] = await data.json()
    res.json(reservations)
})

app.post('/api/reservations', (req: Request, res: Response) => {
    const reservation: Reservation = req.body
    
    res.json(reservation)
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})