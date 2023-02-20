import app from './src/app.js'


const { PORT = 4000 } = process.env;

app.listen(PORT, () => {
    console.log('Server is listening on port 4000')
})

export default app
