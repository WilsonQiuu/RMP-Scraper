const express = require('express');
const request = require('request');
const cheerio = require('cheerio');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());

app.get('/scraper', (req, res) => {
    let universityName = req.query.name;
    let url = `https://www.ratemyprofessors.com/search/schools?query=${universityName}`;
    request(url, (error, response, html) => {
        if (!error && response.statusCode == 200) {
            const $ = cheerio.load(html);
            let schools = []
            $('.SchoolCardHeader__StyledSchoolCardHeader-sc-1gq3qdv-0.bAQoPm').each((i, element) => {
                let school = {
                    name: $(element).text(),
                    rating: $(element).parent().parent().find('.CardNumRating__CardNumRatingNumber-sc-17t4b9u-2').text()
                }
                schools.push(school);
            });

            console.log(schools);
            res.send(schools)
        }
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

