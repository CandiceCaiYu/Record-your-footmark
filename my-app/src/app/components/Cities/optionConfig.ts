import {commonConfigOptions} from "@/components/CommonEcharts";


export const citiesOptionConfig = commonConfigOptions(
    {
        backgroundColor: "#021640",
        visualMap: {
            //图例值控制
            min: 0,
            max: 10000,
            calculable: false,
            show: true,
            right: 50,
            // seriesIndex: 1,
            bottom: 50,
            // color: ["#00eaff", "#fc9700", "#ffde00", "#ffde00", "red"],
            // inRange:{
            //   symbolSize: [10, 20]},
            textStyle: {
                color: "#fff",
            },
        },
        series: [
            // 常规地图
            {
                type: 'map',
                roam: true,
                scaleLimit: {
                    max: 5,
                    min: 1
                },
                layoutSize: "90%",
                aspectScale: 0.75,
                zoom: 1,
                map: 'city', //使用
                top: 90,
                label: {
                    show: true,
                    color: '#fff',

                },
                data: [],
                emphasis: {
                    // disabled: true,
                    label: {
                        color: 'rgb(183,185,14)'
                    },
                    itemStyle: {
                        areaColor: '#eee',
                    }
                },
                itemStyle: {
                    borderColor: 'rgb(147, 235, 248,.8)',
                    borderWidth: 0.2,
                    areaColor: {
                        type: 'linear',
                        x: 0.2,
                        y: 0.8,
                        x2: 0,
                        y2: 0,
                        // r: 0.8,
                        colorStops: [{
                            offset: 0,
                            color: '#002283' // 0% 处的颜色
                        }, {
                            offset: 0.3,
                            color: '#011f6d' // 0% 处的颜色
                        },
                            {
                                offset: 1,
                                color: '#021640'  // 100% 处的颜色
                            }],
                        // globalCoord: true // 缺省为 false
                    },

                },
            },
            // 区域散点图
            {
                type: "effectScatter",
                coordinateSystem: "geo",
                zlevel: 2,
                symbolSize: 6,
                rippleEffect: {
                    //坐标点动画
                    period: 2,
                    scale: 4,
                    brushType: "fill",
                },
                label: {
                    show: false,
                    position: "right",
                    formatter: "{b}",
                    color: "#b3e2f2",
                    fontWeight: 400,
                    fontSize: 12,
                },

                data: [],
                itemStyle: {
                    //坐标点颜色
                    color: "#ff3f3a",
                    shadowBlur: 20,
                    shadowColor: "#fff",

                },
            },
            {
                name: "label",
                type: "scatter",
                coordinateSystem: "geo",
                symbol: "pin",
                symbolSize: [20, 24],
                zlevel: 2,

                itemStyle: {
                    color: "#6495ED", //标志颜色
                    opacity: 0.8,
                    borderColor: "#aee9fb",
                    borderWidth: 0.6,
                },
                data: [],
            },
        ],
    }
)
