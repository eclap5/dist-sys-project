import express, { Express, Request, Response } from "express"
import morgan from "morgan"

const app: Express = express()
const PORT: number = 5050

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(morgan('dev'))

interface Reservation {
    id?: string
    title: string
    user: string
    description: string
    startDateTime: string
    endDateTime: string
}

app.get('/api/reservations', async (req: Request, res: Response) => {
    try {
        const response = await fetch('http://localhost:3001/api/reservations', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (!response.ok) {
            return res.status(404).json({ message: 'Error fetching reservations' })
        }
        const reservations: Reservation[] = await response.json()
        console.log(reservations)
        res.status(200).json(reservations)
    } catch (error: any) {
        console.error(`Error during user registration: ${error}`)
        return res.status(500).json({ error: 'Internal Server Error' })
    }      
})

app.post('/api/reservations', async (req: Request, res: Response) => {
    console.log(req.body)
    const reservation: Reservation = req.body

    const response = await fetch('http://localhost:3001/api/reservations', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reservation)
    })

    if (!response.ok) {
        return res.status(400).json({ message: 'Error creating reservation' })
    }
    const data = await response.json()
    return res.status(200).json({ message: data.message })
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})