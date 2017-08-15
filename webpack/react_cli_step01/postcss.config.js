module.exports = {
    plugins: [
        require('precss'),
        require('rucksack-css'),
        require('autoprefixer')({
            browsers: ['last 5 versions']
        })
    ]
}