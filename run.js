const satellite = require("./src/satellite");
const iridium = require("./src/iridium");

var location = [39.9042, 116.4074, "%E5%8C%97%E4%BA%AC%E5%B8%82", 52, "ChST"];
//COOKIE需要先通过浏览器调到中文

//const names = ["ISS", "IridiumFlares"];
// https://www.heavens-above.com/PassSummary.aspx?satid=41765&lat=0&lng=0&loc=Unspecified&alt=0&tz=UCT

async function runScraping() {
    try {
        console.log("Starting satellite data scraping...");
        
        // Run satellite scraping and wait for completion
        await satellite.getTable({
            target: 25544,
            pages: 4,
            root: "./public/data/"
        }); //ISS
        
        console.log("✅ Satellite data scraping completed successfully");
        
        // Iridium flares temporarily disabled due to 404 error
        /*
        console.log("Starting iridium flares scraping...");
        await iridium.getTable({
            pages: 4,
            root: "./public/data/"
        });
        console.log("✅ Iridium flares scraping completed successfully");
        */
        
        console.log("🎉 All data scraping completed successfully!");
        process.exit(0);
        
    } catch (error) {
        console.error("❌ Data scraping failed:", error);
        process.exit(1);
    }
}

// Run the scraping
runScraping();
