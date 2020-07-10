const { Router } = require ('express')
const bcrypt = require ('bcryptjs')
const config = require ('config')
const jwt = require ('jsonwebtoken')
const { check, validationResult } = require ('express-validator')
const User = require ('../models/User')
const router = Router()

// /api/auth/register
router.post(
    '/register',
    [
        check( 'email', 'Invalid email' ).isEmail(),
        check( 'password', 'Minimum length is 6 symbols').isLength({ min: 6 })
    ],
    async ( req, res ) => {
    try {
        const errors = validationResult(req)

        if ( !errors.isEmpty ) {
            return res.status(400).json({ errors: errors.array(), message: 'Invalid reg data' })
        }

        const { email, password } = req.body

        const candidate = await User.findOne({ email })

        if ( candidate ) {
            return res.status(400).json({ messages: 'User already exists '})
        }

        const hasedPassword =  await bcrypt.hash( password, 12 )
        const user = newUser({ email, password: hashedPassword })

        await user.save()

        res.status(201).json({ message: ' Succesfully created ' })

    } catch (e) {
        res.status(500).json({ message: 'smth went wrong' })
    }
})

// /api/auth/login
router.post(
    '/login',
    [
        check( 'email', 'Enter valid email' ).normalizeEmail().isEmail(),
        check( 'password', 'Enter password' ).exists()
    ],
    async ( req, res ) => {
    try {
        const errors = validationResult(req)

        if ( !errors.isEmpty ) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Invalid login data'
            })
        }

        const { email, password } = req.body

        const user = await USer.findOne({ email })

        if (!user) {
            return res.status(400).json({ message: 'User not found' })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(400).json({ message: 'Wrong password' })
        }

        const token = jwt.sign(
            { userId: user.id },
            config.get('jwtSecret'),
            { expiresIn: '1h' },
        )

        res.json({ token, userId: user.id })

    } catch (e) {
        res.status(500).json({ message: 'smth went wrong' })
    }
})

module.exports = router