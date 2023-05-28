let url  = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Fetch the JSON data and console log it
d3.json(url).then(function(data) {
    console.log(data);

    let bellyData = data;

    let sampleNames = bellyData.names;

    sampleNames.map((name) => {d3.select("#selDataset").append("option").text(name);})

});

function init () {
    d3.json(url).then(function(data) {
        let bellyData = data;

        let sampleNames = bellyData.names;
    
        sampleNames.map((name) => {d3.select("#selDataset").append("option").text(name)});

        let dataset = bellyData.samples.filter(sample => sample.id === "940")[0];
        console.log(dataset);

        sampleValues = dataset.sample_values;
        otuId = dataset.otu_ids;
        otuLabels = dataset.otu_labels;

        let slicedValues = sampleValues.slice(0,10)
        let slicedOtuId = otuId.slice(0,10)
        let slicedOtuLabels = otuLabels.slice(0,10)

        let trace1 = {
            x: slicedValues,
            y: slicedOtuId.map(outId => `OTU ${outId}`),
            text: slicedOtuLabels,
            type: "bar",
            orientation: "h"}

        let layout = {
            title : "Top Ten OTUs"
        };
        let barPlot = [trace1]

        Plotly.newPlot("bar", barPlot, layout);

        let bubbleData = {
            x: otuId,
            y: sampleValues,
            mode: 'markers',
            marker: {
                size: sampleValues,
                color: otuId
            }
        };

        let bubbleLayout = {
            xaxis:{title:"OTU ID"},
        }

        let bubblePlot = [bubbleData]

        Plotly.newPlot("bubble", bubblePlot, bubbleLayout);
        
    });
};

init()

function optionChanged (sampleNames) {
    findingMetaData(sampleNames);
}

function findingMetaData (sample) {
    d3.json(url).then((data) => {
        let metaData = data.metadata

        let metaArray = metaData.filter(samples => samples.id == sample)
        let metaResults = metaArray[0];
        console.log(metaResults)

        let dropDownMenu = d3.select("#sample-metadata");
        dropDownMenu.html("")

        metaResults.map(([key, value]) => {dropDownMenu.append("h5").text(`${key}: ${value}`)});

    });
};
