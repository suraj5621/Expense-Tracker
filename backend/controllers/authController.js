const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

async function register(req, res) {
    const { name, email, password } = req.body
    try {
        const existingUser = await User.findOne({ email })
        if (existingUser) return res.status(400).json({ message: 'User already exists' })

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({ name, email, password: hashedPassword })
        await newUser.save()

        res.status(201).json({ message: 'User registered successfully' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

async function login(req, res) {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email })
        if (!user) return res.status(400).json({ message: 'Invalid credentials' })

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' })

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })
        res.json({ token, user: { id: user._id, name: user.name, email: user.email } })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

module.exports = { register, login }
