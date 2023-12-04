# belly-button-challenge
Module 14 Challenge - Build an interactive dashboard to explore the <a href="http://robdunnlab.com/projects/belly-button-biodiversity/">Belly Button Biodiversity dataset</a>, which catalogs the microbes that colonize human navels.

The dataset reveals that a small handful of microbial species (also called operational taxonomic units, or OTUs, in the study) were present in more than 70% of people, while the rest were relatively rare.

## Instructions
Use the JS D3 library to read into <code>https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json</code> (shown in the <code>samples.json</code>) then create the following information and visuals:
1) Create a dropdown menu to allow selection of the current sample ID.<br/>
![Alt text](/screenshots/dropdown.png)

3) Create demographic information to display the metadata information from the dataset based on the current selected sample ID.<br/>
![Alt text](/screenshots/demographic_info.png)

4) Create a horizontal bar chart to display the top 10 OTUs found based on the current selected sample ID.
    - Use <code>sample_values</code> as the values.
    - Use <code>otu_ids</code> as the labels.
    - Use <code>otu_labels</code> as the hovertext for the chart.</br>
![Alt text](/screenshots/hbar.png)

5) Create a bubble chart using a scatter plot chart to display each sample.
    - Use <code> otu_ids</code> for the x values and marker colors.
    - Use <code>sample_values</code> for the y values and marker size.
    - Use <code>otu_labels</code> for the text values.</br>
![Alt text](/screenshots/bubble.png)

6) <b>BONUS:</b> (Optional) Create a gauge chart displaying the washing frequency of the individual (sample ID).</br>
![Alt text](/screenshots/gauge.png)

## References:
- <em>For gauge chart:</em>
    - https://codepen.io/ascotto/pen/eGNaqe?editors=0011
    - https://stackoverflow.com/questions/67529286/how-to-add-a-needle-or-dial-to-gauge-indicator-in-plotly-js
- <em>For general plotly.js info:</em>
    - https://plotly.com/javascript/
