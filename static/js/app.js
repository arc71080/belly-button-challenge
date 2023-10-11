// Set up URL for data
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Access the data from the url to help create the graphs 
// Source 1 
d3.json(url).then(function (data) {
    let selector = d3.select("#selDataset");
    meta = data.metadata;
    samples = data.samples;
    data.names.forEach((id) => {
        selector.append("option").text(id).property("value", id);
    });
    metaData(meta[0]);
    bar(samples[0]);
    bubble(samples[0]);
});
 
// Source 1 
function optionChanged(value) {
    const idName = samples.find((item) => item.id === value);
    const demographics = meta.find((item) => item.id == value);

    // Insterting Charts
    metaData(demographics);
    bar(idName);
    bubble(idName);
}
// Inserting deomographic data 
// Source 1
function metaData(demographics) {
    let demoInfo = d3.select("#sample-metadata");
    demoInfo.html("");
    Object.entries(demographics).forEach(([key, value]) => {
      demoInfo.append("h6").text(`${key}: ${value}`);
    });
}

// Inserting the horizontal bar graph
// Source 1
function bar(idName) {
   
    trace1 = {
        x: idName.sample_values.slice(0, 10).reverse(),
        y: idName.otu_ids.slice(0, 10).reverse().map((item) => `OTU ${item}`),
        text: idName.otu_labels.slice(0, 10).reverse(),
        type: "bar",
        orientation: "h",
    };

    let data = [trace1];

    let layout = {
        margin: {
            l: 100,
            r: 100,
            t: 0,
            b: 100,
        },
        height: 400,
        width: 600,
    };

    Plotly.newPlot("bar", data, layout);
}
// Inserting the bubble graph 
// Source 1
function bubble(idName) {

    let trace2 = {
        x: idName.otu_ids,
        y: idName.sample_values,
        text: idName.otu_labels,
        mode: "markers",
        marker: {
            color: idName.otu_ids,
            colorscale: "Earth",
            size: idName.sample_values,
        },
    };
    
    let data2 = [trace2];

    let layout = {
        xaxis: {
            title: { text: "OTU ID" },
        },
    };

    Plotly.newPlot("bubble", data2, layout);
}
