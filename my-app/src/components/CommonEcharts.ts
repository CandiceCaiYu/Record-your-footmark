import type {ComposeOption,} from 'echarts/core';
import * as echarts from 'echarts/core';
import type {
    BarSeriesOption,
    EffectScatterSeriesOption,
    LineSeriesOption,
    MapSeriesOption,
    ScatterSeriesOption
} from 'echarts/charts';
import {BarChart, EffectScatterChart, LineChart, MapChart} from 'echarts/charts';
import type {
    DatasetComponentOption,
    GridComponentOption,
    TitleComponentOption,
    TooltipComponentOption
} from 'echarts/components';
import {
    DatasetComponent,
    GridComponent,
    TitleComponent,
    TooltipComponent,
    TransformComponent,
} from 'echarts/components';
import {LabelLayout, UniversalTransition} from 'echarts/features';
import {CanvasRenderer} from 'echarts/renderers';
import type {CallbackDataParams} from "echarts/types/src/util/types";

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
type ECOption = ComposeOption<
    | BarSeriesOption
    | LineSeriesOption
    | TitleComponentOption
    | TooltipComponentOption
    | GridComponentOption
    | DatasetComponentOption
    | MapSeriesOption
    | EffectScatterSeriesOption
    | ScatterSeriesOption
>;

// 注册必须的组件
echarts.use([
    TitleComponent,
    TooltipComponent,
    GridComponent,
    DatasetComponent,
    TransformComponent,
    BarChart,
    LineChart,
    MapChart,
    LabelLayout,
    UniversalTransition,
    CanvasRenderer,
    EffectScatterChart
]);


let data = [
    {
        name: "湖北",
        value: [113.289984, 31.42, 2000],
    },
    {
        name: "湖南",
        value: [112.03042, 27, 200000],
    },

    {
        name: "四川",
        value: [102.112035, 30.630737, 5000],
    },
    {
        name: "重庆",
        value: [108.112035, 30.630737, 60000],
    },
    {
        name: "山东",
        value: [118.19, 36.22, 20050],
    },
];

export const option: ECOption = {
    backgroundColor: "#021640",
    geo: {
        map: 'china',
        aspectScale: 0.75, //长宽比
        zoom: 1,
        top: 90,
        roam: false,
        itemStyle: {
            normal: {
                areaColor: "#d47e63",
                shadowColor: '#002666',
                shadowOffsetX: 2,
                shadowOffsetY: 6,
                borderWidth: 2,
                borderColor: "#d47e63"
            },
            emphasis: {
                areaColor: '#2AB8FF',
                borderWidth: 0,
                color: 'green',
                label: {
                    show: true
                }
            }
        },
        regions: [{
            name: '南海诸岛',
            itemStyle: {
                areaColor: 'rgba(0, 10, 52, 1)',

                borderColor: 'rgba(0, 10, 52, 1)',
                normal: {
                    opacity: 0,
                    label: {
                        show: true,
                        color: "#009cc9",
                    }
                }
            },
        }],
    },
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
            roam: false,
            layoutSize: "90%",
            aspectScale: 0.75,
            zoom: 1,
            // roam: false,
            map: 'china', //使用
            top: 90,
            label: {
                show: true,
                color: '#fff',

            },
            data: data.map(item => ({...item, visualMap: false})),
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
            symbolSize: 10,
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

            data: data,
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
            symbolSize: [75, 70],
            zlevel: 2,
            label: {
                show: true,
                color: "#fff",
                lineHeight: 15,
                formatter(params: CallbackDataParams) {
                    return params.data?.value && params.data.value[2];
                },
            },

            itemStyle: {
                color: "#6495ED", //标志颜色
                opacity: 0.8,
                borderColor: "#aee9fb",
                borderWidth: 0.6,
            },
            data: data,
        },
    ],
};

export const commonConfigOptions = (options: ECOption): ECOption => options

