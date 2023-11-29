// Setup url constant for json source
const url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json';

// Promise pending
const dataPromise = d3.json(url, d3.autoType);

/* 
---------------------
|   Start functions |
---------------------
*/
function setDemographicInfo(subjectId) {
    // Select the demographic info divisor tag
    let panelBody = d3.select('.panel-body');

    // Reset the content within this divisor
    panelBody.text('');

    // Using json object dataPromise to populate the metadata info and create the content under the panelBody
    // by filtering to match id to subjectId
    dataPromise.then(data => {
        let metaData = data.metadata.filter(sample => sample.id.toString() === subjectId)[0];
    
        Object.entries(metaData).forEach(([k, v]) => {
            panelBody.append('h6').html(`<b>${k}:</b> ${v}`);
        });
    });
};

function setPlots(subjectId) {

    // Sub function to handle labelings
    function setTextLabel(arr) {
        return arr.map(value => {
            if (value.match(';')) {
                return value.replace('Bacteria','<b>Bacteria</b>').replace(';', '<br>---------<br>').replaceAll(';', '<br>');
            } else {
                return value;
            }
        });
    };

    // Set layout variable used by hbar and scatter charts
    let layout = {
        hoverlabel: {
            align: 'left'
        },
        margin: {
            l: 75,
            r: 0,
            b: 50,
            t: 5,
            pad: 4
        }
    };

    // Set up hbar chart display top 10 where x: sample_values, y: otu_ids (OTU #), and otu_labels for hovertext
    dataPromise.then(data => {
        let sample = data.samples.filter(sample => sample.id.toString() === subjectId)[0];
        let sampleValues = sample.sample_values.slice(0, 10).reverse();
        let sampleIds = sample.otu_ids.slice(0, 10).reverse().map(value => 'OTU ' + value);
        let sampleLabels = setTextLabel(sample.otu_labels.slice(0, 10).reverse());

        var data = [{
            type: 'bar',
            x: sampleValues,
            y: sampleIds,
            text: sampleLabels,
            orientation: 'h',
            marker: {
                color: 'rgba(55, 128, 191, 0.75)'
            }
          }];
          
        Plotly.newPlot('bar', data, layout);
    });

    // Set up the scatter plot chart where x: otu_ids, y: sample_values, marker size: sample_values, marker colors: otu_ids, text values: otu_labels
    dataPromise.then(data => {
        let sample = data.samples.filter(sample => sample.id.toString() === subjectId)[0];
        let sampleValues = sample.sample_values;
        let sampleIds = sample.otu_ids;
        let sampleLabels = setTextLabel(sample.otu_labels);

        var data = [{
            type: 'scatter',
            mode: 'markers',
            x: sampleIds,
            y: sampleValues,
            text: sampleLabels,
            marker: {
                size: sampleValues,
                color: [0, 500, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500]
            }
          }];
          
        Plotly.newPlot('bubble', data, layout);
    });

    // BONUS: Advanced Challenge Assignment (Optional)
    //        Create a gauge chart to plot the weekly washing frequency of the individual

};

function optionChanged(subjectId) {
    setDemographicInfo(subjectId);
    setPlots(subjectId);
};

// Starter/init function
function init() {
    // Set the Sample ID dropdown list then append the sample id to new option
    let selMenu = d3.select('#selDataset');

    // Using json object dataPromise to populate the item values for sample Id
    dataPromise.then(data => {
        let names = data.names;

        Object.values(names).forEach(value => {
            selMenu.append('option').attr('value', value).text(value);
        });

        // Call optionChanged to fill the page with the defaulted sample Id
        optionChanged(selMenu.property('value'));
    });
};
/* 
---------------------
|   End functions   |
---------------------
*/

// Initialization
init();