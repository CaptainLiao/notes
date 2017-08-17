module.exports = {
    plugins: [
        require('precss'),
        require('rucksack-css'),
        require('autoprefixer')({
             browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8', 'iOS >= 8', 'Android >= 4']
        })
    ]
}