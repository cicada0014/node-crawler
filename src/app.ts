// (window as any).exports = {}
// console.log('123')
import * as http from 'http';
import * as fs from 'fs';
import * as urlType from 'url';
// * 는 모든 것을 가져온다는 것으로 기본값을 가져오지는 않는다. 모듈시스템 공부 해야한다!
import client from 'cheerio-httpcli';
import { AppElectron } from './app.electron';
const InstagramCrawler = require('instagram-crawling')



class App {



    private targetUrl = "https://www.instagram.com/";
    private savePath = "test.html";
    private outfile: fs.WriteStream;
    private electron: AppElectron
    constructor() {
        if (process.env.NODE_ENV == 'electron') {
            this.electronBootstrap();
        } else {
            this.test4()
        }


        // this.test5();

    }

    instagramCrawling() {
        let instagram = new InstagramCrawler;
        instagram.auth('saida00142018', process.env.LOGIN_PW)
            .then(() => instagram.getTagMedia('kiev', 3)) // getTagMedia(Tag Name, Total Number of pages)
            .then(media => {
                console.log(media);

                return instagram.getProfileMedia('instagram', 3) // getProfileMedia(Username, Total Number of pages)
            })
            .then(media => {
                console.log(media);
            })
            .catch(error => console.error(error));
    }


    electronBootstrap() {
        console.log("this app booting electron")
        this.electron = new AppElectron();
    }

    test5() {
        // casper.start(this.targetUrl, () => {
        //     casper.echo(casper.getTitle())
        // })
    }


    test1() {
        this.outfile = fs.createWriteStream(this.savePath);
        http.get(this.targetUrl, (res) => {
            res.pipe(this.outfile);
            res.on('end', () => {
                this.outfile.close();
                console.log('ok');
            })
        })
    }
    test2() {
        client.fetch(this.targetUrl, {}, (err, $, res) => {
            if (err) {
                console.log(err)
                return
            }
            const body = $.html();
            console.log(body)
        })
    }

    test3() {
        client.fetch("http://jpub.tistory.com", {}, (err, $, res) => {
            if (err) {
                console.log(err)
                return
            }
            $('a').each((idx, element) => {
                let text = $(element).text();
                let href = $(element).attr('href');
                console.log(text + ':' + href)
            })
        })
    }

    test4() {
        let base = "http://kujirahand.com/url/test/index.html";
        let u1 = urlType.resolve(base, 'a.html')
        console.log("ul = " + u1);
        let u2 = urlType.resolve(base, '../b.html')
        console.log("u2 = " + u2);
        let u3 = urlType.resolve(base, '/c.html');
        console.log("u3 = " + u3);
    }



    static bootstrap() {
        return new App()
    }
}

App.bootstrap();