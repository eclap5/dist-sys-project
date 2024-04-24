"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const app = (0, express_1.default)();
const PORT = 5050;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, morgan_1.default)('dev'));
app.get('/api/reservations', async (req, res) => {
    try {
        const response = await fetch('http://localhost:3001/api/reservations', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            return res.status(404).json({ message: 'Error fetching reservations' });
        }
        const reservations = await response.json();
        console.log(reservations);
        res.status(200).json(reservations);
    }
    catch (error) {
        console.error(`Error during user registration: ${error}`);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});
app.post('/api/reservations', async (req, res) => {
    console.log(req.body);
    const reservation = req.body;
    const response = await fetch('http://localhost:3001/api/reservations', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reservation)
    });
    if (!response.ok) {
        return res.status(400).json({ message: 'Error creating reservation' });
    }
    const data = await response.json();
    return res.status(200).json({ message: data.message });
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
