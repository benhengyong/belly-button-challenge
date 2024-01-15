// get the url link 
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// fetch the JSON data
d3.json(url).then(function(data) {
    //For test subject ID No drop down menu
    //d3.selectAll("#selDataset").on("change", updatePlotly);
    // function updatePlotly() {
    //     // Use D3 to select the dropdown menu
    //     let dropdownMenu = d3.select("#selDataset");
    //     // Assign the value of the dropdown menu option to a variable
    //     let testSubjectID = dropdownMenu.property("value");
    // }

    // function optionChanged() {}
    let testSubjectId = 0;

    let bellyButtonData = data['samples'][testSubjectId];


    let otuIds = bellyButtonData['otu_ids'].slice(0,10);

    let yLabels = [];
    for (i = 0; i < otuIds.length; i++){
        yLabels[i] = 'OTU ' + otuIds[i]; 
    }

//create a horizontal chart
    let plotData = [{
        x: bellyButtonData['sample_values'].slice(0,10),
        y: yLabels,
        text: bellyButtonData['otu_labels'].slice(0,10),
        type: "bar",
        orientation: 'h'
    }];
    Plotly.newPlot("bar", plotData);


//create a bubble chart
    let bubbleData = [{
        x: bellyButtonData['otu_ids'],
        y: bellyButtonData['sample_values'],
        text: bellyButtonData['otu_labels'].slice(0,10),
        mode: 'markers',
        marker: {
            color: bellyButtonData['otu_ids'],
            size: bellyButtonData['sample_values']
        }
    }];
    Plotly.newPlot("bubble", bubbleData);

//Display the demographic information
//filter the info to the selected ID
    let metaData = data['metadata'];

    function demoInfo(person) {
        return person.id == 940;
    }

    let subjectInfo = metaData.filter(demoInfo);
    console.log(subjectInfo);
});
