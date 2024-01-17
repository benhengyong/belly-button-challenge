// get the url link 
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

let testSubjectId = 0;
//use the onchange event tag to call optionChanged function
function optionChanged (value) {
    d3.json(url).then(function(data) {
        //use a for loop to find the index where the id is located in the array
        for (i =0; i<data['samples'].length; i++){
            if (data['samples'][i]['id'] ==value) {
                testSubjectId = i;
            }
        }
        //prepare data for horizontal bar chart
        let bellyButtonData = data['samples'][testSubjectId];
        let otuIds = bellyButtonData['otu_ids'].slice(0,10);
        let yLabels = [];
        for (i = 0; i < otuIds.length; i++){
            yLabels[i] = 'OTU ' + otuIds[i]; 
        }
        let x = bellyButtonData['sample_values'].slice(0,10);

        //edit the changes to the bar chart
        Plotly.restyle("bar", "x", [x]);
        Plotly.restyle("bar", "y", [yLabels]);

        //reedit x and y values for bubble chart
        let bubbleXData = bellyButtonData['otu_ids'];
        let bubbleYData =  bellyButtonData['sample_values'];

        Plotly.restyle("bubble", "x", [bubbleXData]);
        Plotly.restyle("bubble", "y", [bubbleYData]);

        //edit changes to demographic information
        let metaData = data['metadata'][testSubjectId];
        let keys = Object.keys(metaData);
        let values = Object.values(metaData);
        //delete previous text to print new information
        d3.select("#sample-metadata").text('');
        for (i = 0; i < keys.length; i++) {
            d3.select("#sample-metadata").append('ul').text(keys[i] +': '+values[i]);
        }

    });

    return testSubjectId;
};


// fetch the JSON data
d3.json(url).then(function(data) {
    //For test subject ID No drop down menu
    let idList = data['names'];
    //Use a for loop to add all the ids into the drop down menu
    for (i = 0; i <idList.length; i++) {
        d3.select("#selDataset").append("option").text(idList[i]);
    }

    //Collect data from json and prepare the id names
    function barFilter(data) {
        return data['samples'];
    }    

    //Prepare data for the horizontal chart
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
    //Collec the info from metadata and retrieve key value pairs
    let metaData = data['metadata'][testSubjectId];
    let keys = Object.keys(metaData);
    let values = Object.values(metaData);

    //use a for loop to print out key value pairs to text
    for (i = 0; i < keys.length; i++) {
        d3.select("#sample-metadata").append('ul').text(keys[i] +': '+values[i]);
    }

});
