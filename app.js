const Handlebars = require("handlebars");
const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');
const qs = require('querystring');
const cab = require('./data/cab');


registerPartails();
const server = http.createServer((req, res) => {
    const link = url.parse(req.url, true);
    const query = link.query;
    const page = link.pathname;

    console.log('page 16');
console.log(page,req.method)
    if (page == "/home") {
        let template = renderTemplate('index', {});
        res.end(template);
    }
    else if( page == "/booking"){
        let template = renderTemplate('booking', {});
        res.end(template);
    }
    else if( page == "/login" && req.method == "GET"){
        let template = renderTemplate('login', {});
        res.end(template);
    }

    else if( page.startsWith("/static/css")){
        console.log(page);
        let fileName = page.replace("static/css", "");
        console.log(fileName);
        var file = fs.readFileSync("./static/css"  + fileName);
        res.end(file);
    }
    else if( page.startsWith("/static/images")){
        console.log(page);
        let fileName = page.replace("static/images", "");
        console.log(fileName);
        var file = fs.readFileSync("./static/images"  + fileName);
        res.end(file);
    }

    else if (page == "/login" && req.method == "POST") {
        let formData = '';
        req.on('data', function (data) {
            formData += data.toString();
        });
        req.on('end', function () {
            let userData = qs.parse(formData);
            cab.addOne(userData.email, userData.mobile, userData.password, (err, result) => {
                var context = {
                    result: {
                        success: true,
                        errors: []
                    }
                };
                if (err) {
                    console.log(err);
                    context.result.success = false;

                }
                let template = renderTemplate('login', {});
                res.end(template);
            })
        });
    }
});

server.listen(80);

function renderTemplate(name, data) {
    var filepath = path.join(__dirname, "templates", name + ".hbs");
    let templateText = fs.readFileSync(filepath, "utf8");
    let template = Handlebars.compile(templateText);
    return template(data);
}

function registerPartails() {
    var filepath = path.join(__dirname, "templates", "partials", "navbar.hbs");
    let templateText = fs.readFileSync(filepath, "utf8");
    Handlebars.registerPartial("navbar", templateText);
}
