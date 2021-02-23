const puppeteer = require("puppeteer");

describe("Testing page", () => {
    let browser;
    let page;

    //launches puppeteer
    beforeAll(async () => {
        browser = await puppeteer.launch()
    });
  
    //closes the tab
    afterEach(async () => {
        await page.close()
    });
  
    //closes the browser
    afterAll(async () => {
        await browser.close()
    });

    //goes to the website
    beforeEach(async () => {
        page = await browser.newPage()
        await page.goto('https://destroyer22719.github.io/Spiraling-Circle-Challenge/');
    });

    test("Input grid values", async () => {
        const {height, width, validCorners, startX, startY} = await page.evaluate(() => {
            //inputs values
            $("#width").val(6);
            $("#height").val(5);
            $("#coverWidth").val(2);
            $("#coverHeight").val(1);
            $("#create").click();

            validCorners = !!($(".grid-row > .tile.cover:nth-child(1)") && $(".grid-row > .tile.cover:nth-child(2)"));
            
            return {
                height: $(".grid")[0].childElementCount,
                width: $(".grid > *")[0].childElementCount,
                validCorners,
                startX: $(".tile").index($(".bridget")) + 1,
                startY: $(".grid-row").index($(".bridget").parent()) + 1,
            };
        });

        expect(height).toBe(5);
        expect(width).toBe(6);
        expect(validCorners).toBe(true);
        expect(startX).toBe(3);
        expect(startY).toBe(1);
    });

    test("Navigate bridget test scenario #1", async () => {
        const {x, y} = await page.evaluate((width, height, coverWidth, coverHeight, steps) => {
            //inputs values
            $("#width").val(width);
            $("#height").val(height);
            $("#coverWidth").val(coverWidth);
            $("#coverHeight").val(coverHeight);
            $("#maxSteps").val(steps);

            //generates grid and navigates
            $("#create").click();
            $("#start").click();
            
            return {
                x: +$("span").first().text().split(",")[0],
                y: +$("span").first().text().split(",")[1]
            };
        }, 10, 8, 3, 2, 15);

        expect(x).toBe(7);
        expect(y).toBe(7);
    });

    test("Navigate bridget test scenario #2", async () => {
        const {x, y} = await page.evaluate((width, height, coverWidth, coverHeight, steps) => {
            //inputs values
            $("#width").val(width);
            $("#height").val(height);
            $("#coverWidth").val(coverWidth);
            $("#coverHeight").val(coverHeight);
            $("#maxSteps").val(steps);

            //generates grid and navigates
            $("#create").click();
            $("#start").click();
            
            return {
                x: +$("span").first().text().split(",")[0],
                y: +$("span").first().text().split(",")[1]
            };
        }, 8, 7, 2, 2, 27);
        
        expect(x).toBe(5);
        expect(y).toBe(2);
    });

    test("Navigate bridget test scenario #3", async () => {
        const {x, y} = await page.evaluate((width, height, coverWidth, coverHeight, steps) => {
            //inputs values
            $("#width").val(width);
            $("#height").val(height);
            $("#coverWidth").val(coverWidth);
            $("#coverHeight").val(coverHeight);
            $("#maxSteps").val(steps);
            
            //generates grid and navigates
            $("#create").click();
            $("#start").click();
            
            return {
                x: +$("span").first().text().split(",")[0],
                y: +$("span").first().text().split(",")[1]
            };
        }, 8, 7, 2, 2, 40);
        
        expect(x).toBe(7);
        expect(y).toBe(4);
    });

    test("Navigate bridget test scenario #4", async () => {
        const {x, y} = await page.evaluate((width, height, coverWidth, coverHeight, steps) => {
            //inputs values
            $("#width").val(width);
            $("#height").val(height);
            $("#coverWidth").val(coverWidth);
            $("#coverHeight").val(coverHeight);
            $("#maxSteps").val(steps);
            
            //generates grid and navigates
            $("#create").click();
            $("#start").click();
            
            return {
                x: +$("span").first().text().split(",")[0],
                y: +$("span").first().text().split(",")[1]
            };
        }, 6, 6, 1, 2, 1);
        
        expect(x).toBe(3);
        expect(y).toBe(1);
    });
});