const url = "file:///Users/nicholaswalker/Dropbox/My%20Mac%20(Nicholas%E2%80%99s%20MacBook%20Air)/Desktop/crazy/brewery_untappd_export_MD.json"

const dataPromise = d3.json(url);
console.log("Data promise", dataPromise);

d3.json(url).then(function (data_we_get_back) {
    console.log("data_we_get_back", data_we_get_back);
});

function init() {

    let Menu = d3.select("#selDataset");

    d3.json(url).then((data) => {

        let brewery_name = data.brewery_name;

        brewery_name.forEach((_id)) => {

            console.log(brewery_name);

            Menu.append("option")
                .text(brewery_name)
                .property("value", brewery_name);


        });


    let first_brewery = brewery_name[0];

    console.log(first_brewery);

    buildMetadata(first_brewery);
    buildBarchart(first_brewery);
    buildBubblechart(first_brewery);

});

};
function optionChanged(brew) {
    buildMetadata(brew);
    buildBarchart(brew);
    buildBubblechart(brew);
};

function buildMetadata(brew) {

    d3.json(url).then((data) => {

        let metadata = data.metadata;

        let value = metadata.filter(result => result.id == brew);

        console.log(value)

        let valuedata = value[0];

        d3.select("#sample-metadata").html("");

        Object.entries(valuedata).forEach(([key, value]) => {

            console.log(key, value);

            d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
        });
    });
};

function buildBarchart(brew) {

    d3.json(url).then((data) => {

        let brew_info = data.brewery_name;

        let value = brew_info.filter(result => result.id == brew);

        let valuedata = value[0];

        let brewery_name = valuedata.brewery_name;
        let brewery_type = valuedata.brewery_type;
        let brewery_ratings = valuedata.brewery_ratings;

        console.log(brewery_name, brewery_type, brewery_ratings);

        let yticks = brewery_name.slice(0, 10).map(id => `OTU ${id}`).reverse();
        let xticks = brewery_ratings.slice(0, 10).reverse();
        let labels = brewery_type.slice(0, 10).reverse();

        let trace = {
            x: xticks,
            y: yticks,
            text: labels,
            type: "bar",
            orientation: "h"
        };

        let layout = {
            title: "Top 10 Breweries"
        };

        Plotly.newPlot("bar", [trace], layout)
    });
};

function buildBubblechart(brew) {

    d3.json(url).then((data) => {

        let brew_info = data.brewery_name;

        let value = brew_info.filter(result => result.id == brew);

        let valuedata = value[0];

        let brewery_name = valuedata.brewery_name;
        let brewery_type = valuedata.brewery_type;
        let brewery_ratings = valuedata.brewery_ratings;

        console.log(brewery_name, brewery_type, brewery_ratings);

        let yticks = brewery_name.slice(0, 10).map(id => `OTU ${id}`).reverse();
        let xticks = brewery_ratings.slice(0, 10).reverse();
        let labels = brewery_type.slice(0, 10).reverse();

        let trace1 = {
            x: brewery_name,
            y: brewery_ratings,
            text: brewery_type,
            mode: "markers",
            marker: {
                size: brewery_ratings,
                color: brewery_name,
                colorscale: "Earth"
            }
        };

        let layout = {
            title: "Top 10 Breweries"
            hovermode: "closest",
        };

        Plotly.newPlot("bubble", [trace1], layout)
    });
};

init();