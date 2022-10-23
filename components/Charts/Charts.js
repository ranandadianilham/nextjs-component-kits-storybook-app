/* eslint-disable react/display-name */
import { Bar, Line, Pie } from "react-chartjs-2";
import { Chart, } from "chart.js"
import 'chart.js/auto';
import ChartDataLabels from "chartjs-plugin-datalabels";

// register chart label plugin
Chart.register(ChartDataLabels);

//default pie
const Charts = ({ labelset, dataset, title, pieheight, piewidth, ...props }) => {
    const BLUE90 = "#001A41";
    const positionCorrection = 100;
    const colorScheme = [];

    //color scheme: r:255 b:0 g: random (120 - 255) and at least not same
    // 120 - 150 = text white, else = blue 90
    //get dataset length, generate background color according to databset length

    function getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    var i = 0;
    for (i; i < dataset.length; i++) {
        colorScheme[i] = "rgb( 255, " + getRndInteger(120, 255) + ", 0)";
    }
    const data = {
        labels: [...labelset],
        datasets: [
            {
                data: [...dataset],
                backgroundColor: [
                    ...colorScheme
                ],
                borderColor: [
                    ...colorScheme
                ],
                borderWidth: 1,
            },
        ],
    };

    const option = {
        maintainAspectRatio: false,
        events: ["mousemove", "mouseout", "touchstart", "touchmove"],
        plugins: {
            tooltip: { // tooltip config
                enabled: false,
                displayColors: false,
                backgroundColor: BLUE90,
                callbacks: {
                    label: function (context) {
                        let datasets = context.dataset.data;
                        let value = context.raw;
                        let sum = datasets.reduce((a, b) => a + b);

                        let percentage = Math.round((value / sum) * 100) + "%";
                        //console.log(context.raw);
                        return `${percentage} (${numberWithCommas(context.raw)} Penerima)`;
                    },
                    title: function (context) {
                        return `${context[0].label}`
                    }
                },
                position: "nearest",
                external: function (context) {
                    return externalTooltipHandler(context, positionCorrection);
                }
            },
            legend: { //legend config
                display: true,
                position: "right",
                labels: {
                    font: {
                        family: "poppins-regular",
                        style: "normal",
                        size: 9
                    },
                    boxHeight: 20,
                    boxWidth: 20,
                    usePointStyle: true,
                    pointStyle: "rectRounded",
                    color: BLUE90
                }
            },
            datalabels: { // datalabel config
                display: true,
                labels: {
                    title: {
                        color: function (ctx) {
                            //console.log(ctx);
                            //console.log(ctx.dataIndex);
                            //console.log(ctx.dataset.backgroundColor[ctx.dataIndex]);
                            var rgbColorScheme = ctx.dataset.backgroundColor[ctx.dataIndex];
                            var rgbNumber = rgbColorScheme.replace("rgb(", "").replace(")", "").split(",");
                            //console.log(rgbNumber[1].trim());
                            //console.log(rgbNumber[1].trim() > 200);
                            return rgbNumber[1].trim() > 200 ? BLUE90 : "rgb(255,255,255)";
                        },
                        font: {
                            weight: "600",
                            size: "17"
                        }
                    }
                },
                formatter: (value, ctx) => {
                    let datasets = ctx.chart.data.datasets;
                    //console.log(datasets)

                    if (datasets.indexOf(ctx.dataset) === datasets.length - 1) {
                        let sum = datasets[0].data.reduce((a, b) => a + b, 0);
                        let percentage = Math.round((value / sum) * 100) + "%";
                        return percentage;
                    } else {
                        return percentage;
                    }
                },
            },
            title: function (ctx) {
                console.log(ctx)
                return `${ctx[0].label}`
            }
        },
    }

    return (
        <div className="chart-pie-container d-inline-block" style={{
            padding: "5px"
        }} {...props}>
            <div className=""
                style={{
                    marginBottom: "40px"
                }}>
                <span className="chart-pie-title poppins-regular">{title}</span>
            </div>
            <div className=""
                style={{
                    height: pieheight,
                    width: piewidth
                }}
            >
                <Pie data={data} options={option} />
            </div>
        </div>
    )
}

Charts.PieReport = ({ labelset, dataset, title, pieheight, piewidth, variantCount = 9, position = 'right', ...props }) => {
    const BLUE90 = "#001A41";
    const positionCorrection = 100;


    const getDataPercentage = (dataset) => {
        let dataList = [];
        let dataIndex = [];
        let sum = dataset.reduce((a, b) => a + b, 0);
        dataset?.map((data, index) => {
            dataList.push(((data / sum) * 100).toFixed(1));
            dataIndex.push(index);
        })

        return {
            dataList,
            dataIndex
        };
    }

    const handleColorSchema = (dataCount, variantCount) => {
        //decimal needed to be index 
        let v = variantCount;
        let d = dataCount;
        let gap = (v / d).toPrecision(1);

        while (gap <= 4) {
            v++;
            gap = (v / d).toPrecision(1);
        }
        let countColor = 250;
        const colorList = []
        console.log(`variant / data : ${v} / ${d} = ${gap}`)
        for (let i = 0; i < v; i++) {
            colorList.push(`rgb(255, ${countColor}, 0)`);
            countColor -= 10;
        }

        let resColor = [];
        for (let i = 0; i < d; i++) {
            let ind = (gap * (i))
            //console.log('ind', ind)
            resColor.push(colorList[ind]);
        }
        /* console.log('colorList', colorList);
       console.log('res', resColor) */
        /* console.log('res color', resColor) */
        return resColor;
    }
    const colorScheme = handleColorSchema(dataset.length, variantCount);
    //color scheme: r:255 b:0 g: random (120 - 255) and at least not same
    // 120 - 150 = text white, else = blue 90
    //get dataset length, generate background color according to databset length
    const getLegends = (labelSet, dataset) => {
        let sum = dataset.reduce((a, b) => a + b, 0);
        return dataset?.map((data, index) => {
            let percentage = ((data / sum) * 100).toFixed(1) + "% " + labelSet[index];
            return percentage;
        });
    }

    /* if(colorScheme.length <= 0) {
      var i = 0;
      for (i; i < dataset.length; i++) {
        colorScheme[i] = "rgb( 255, " + getRndInteger(120, 255) + ", 0)";
      }
    } */
    const data = {
        labels: getLegends(labelset, dataset).reverse(),
        datasets: [
            {
                data: [...dataset].reverse(),
                backgroundColor: [
                    ...colorScheme
                ].reverse(),
                borderColor: [
                    ...colorScheme
                ].reverse(),
                borderWidth: 1,
            },
        ],
    };

    const option = {
        maintainAspectRatio: false,
        responsive: true,
        events: ["mousemove", "mouseout", "touchstart", "touchmove"],
        plugins: {
            tooltip: { // tooltip config
                enabled: false,
                displayColors: false,
                backgroundColor: BLUE90,
                callbacks: {
                    label: function (context) {
                        let datasets = context.dataset.data;
                        let value = context.raw;
                        let sum = datasets.reduce((a, b) => a + b);

                        let percentage = ((value / sum) * 100).toFixed(1) + "%";
                        return `${percentage} (${numberWithCommas(context.raw)} Penerima)`;
                    },
                    title: function (context) {
                        return `${context[0].label.includes("%") ? context[0]?.label.split("%")[1] : context[0].label}`
                    }
                },
                position: "nearest",
                external: function (context) {
                    return externalTooltipHandler(context, positionCorrection);
                }
            },
            legend: { //legend config
                display: true,
                reverse: true,
                position: position,
                labels: {
                    font: {
                        family: "poppins-regular",
                        style: "normal",
                        size: 12
                    },
                    boxHeight: 20,
                    boxWidth: 100,
                    usePointStyle: true,
                    pointStyle: "rectRounded",
                    color: BLUE90
                },
                title: {
                    color: '#999'
                },

            },
            datalabels: { // datalabel config
                display: true,
                clamp: true,
                offset: function (ctx) {
                    const datasetCtx = getDataPercentage(ctx.dataset.data);
                    if (datasetCtx.dataList[ctx.dataIndex] <= 1) {
                        return 10 * ctx.dataIndex
                    } else {
                        return 4
                    }
                },
                align: function (ctx) {
                    const datasetCtx = getDataPercentage(ctx.dataset.data);
                    if (datasetCtx.dataList[ctx.dataIndex] <= 1) {
                        return 'start'
                    } else {
                        return 'center'
                    }
                },
                anchor: function (ctx) {
                    const datasetCtx = getDataPercentage(ctx.dataset.data);
                    console.log(` ${ctx.dataIndex} - ${datasetCtx.dataIndex[ctx.dataIndex] === ctx.dataIndex}`)
                    if (datasetCtx.dataList[ctx.dataIndex] <= 1) {
                        return 'end'
                    } else {
                        return 'center'
                    }
                },
                labels: {
                    title: {
                        color: function (ctx) {
                            //var rgbColorScheme = ctx.dataset.backgroundColor[ctx.dataIndex];
                            //var rgbNumber = rgbColorScheme?.replace("rgb(", "")?.replace(")", "").split(",");
                            //return rgbNumber && rgbNumber[1]?.trim() > 200 ? BLUE90 : "rgb(255,255,255)";
                            return BLUE90;
                        },
                        font: {
                            weight: "600",
                            size: "10"
                        }
                    }
                },
                formatter: (value, ctx) => {
                    let datasets = ctx.chart.data.datasets;
                    //console.log(datasets)

                    if (datasets.indexOf(ctx.dataset) === datasets.length - 1) {
                        let sum = datasets[0].data.reduce((a, b) => a + b, 0);
                        let percentage = ((value / sum) * 100).toFixed(1) + "%";
                        return percentage;
                    } else {
                        return percentage;
                    }
                },
            },
            title: function (ctx) {
                console.log(ctx)
                return `${ctx[0].label}`
            },/* 
        legendCallback: function(chart) {
          // Return the HTML string here.
          console.log('esteh');
          let labels = chart.data.labels;
          return (
            <ul className="chart-legend">
              {
                labels && labels.map((label, index) => {
                  <li onClick={(event) => handleLegendClick(event, index, chartInstance)}>
                    <div className="legend-block">
                      {labels && <div className="legend-label">{labels[index]}-super</div>}
                    </div>
                  </li>
                })
              }
            </ul>
          );
        } */
        },
    }

    return (
        <div className="chart-pie-container d-inline-block" style={{
            padding: ""
        }} {...props}>
            <div>
                <span className="chart-pie-title poppins-regular">{title}</span>
            </div>
            <div className=""
                style={{
                    height: pieheight,
                    width: piewidth
                }}
            >
                <Pie data={data} options={option} />
            </div>
        </div>
    )
}

Charts.Bar = ({ label, datas, minheight, minwidth, maxheight, maxwidth = "100%", title, desc, downloadlink, ...props }) => {
    const BLUE90 = "#001A41";
    const BLUE80 = "#4E5764";
    const positionCorrection = 110;
  
    const array = [...datas];
    let sum = 0;
    for (let i = 0; i < array.length; i++) {
      sum += array[i];
    }
  
    const percentage = Math.round((15 / 100) * sum)
    const max = Math.max(...datas) + percentage;
  
    const data = {
      labels: [...label],
      datasets: [
        {
          data: [...datas],
          backgroundColor: [
            "#FDA22B",
          ],
          borderColor: [
            "#FDA22B",
          ],
          borderWidth: 1,
        },
      ],
    }
  
    const options = {
      maintainAspectRatio: false,
      responsive: true,
      barThickness: 50,
      events: ["mousemove", "mouseout", "touchstart", "touchmove"],
      interaction: {
        mode: "index",
        intersect: false,
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          enabled: false,
          yAlign: "bottom",
          displayColors: false,
          backgroundColor: BLUE90,
          callbacks: {
            label: function (context) {
              return `${numberWithCommas(context.parsed.y)} Penerima`
            },
            title: function (context) {
              return `${context[0].label}`
            }
          },
          position: "nearest",
          external: function (context) {
            return externalTooltipHandler(context, positionCorrection);
          }
        },
        datalabels: {
          align: "end",
          anchor: "end",
          offset: 1,
          display: true,
          labels: {
            title: {
              color: BLUE80,
              font: {
                weight: "300",
                size: "17"
              }
            }
          },
          formatter: function (value, context) {
            return `${numberWithCommas(value)}`;
          }
        }
      },
      scales: {
        x: {
          beginAtZero: true,
          grid: {
            display: false,
          },
          label: {
            display: true,
            font: {
              family: "poppins-regular",
              style: "normal",
              size: 22,
            },
          },
          ticks: {
            color: BLUE90
          }
        },
        y: {
          beginAtZero: true,
          grid: {
            display: false,
          },
          suggestedMax: max,
          ticks: {
            color: BLUE90
          }
        }
      }
    }
  
    return (
      <div className="chart-bar-container" style={{
        minWidth: minwidth,
        minHeight: minheight,
        maxWidth: maxwidth,
        maxHeight: maxheight
      }}>
        <div className="row justify-content-center"
          style={{
            marginBottom: "40px"
          }}>
          <div className="bar-chart-text-wrapper row col-6">
            <span className="bar-header bar-span poppins-regular">{title}</span>
            <br />
            <span className="bar-text bar-span poppins-regular">{desc}</span>
          </div>
          <div className="bar-chart-download-wrapper row col-6 p-0">
            <span>
              <a id="bar-download-csv" className="poppins-regular" href={downloadlink}>
                <img
                  src="/icons/multicolor/csv_download.png"
                  alt="download-csv"
                  width="20px"
                  height="20px"
                />Download CSV</a>
            </span>
          </div>
        </div>
        <div
          style={{
            margin: "0",
            padding: "0"
          }}
  
        >
          <Bar data={data} options={options} />
        </div>{/* 
        <ReactTooltip/> */}
      </div>
    );
}

export default Charts;