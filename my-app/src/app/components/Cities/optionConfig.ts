import {commonConfigOptions} from "@/components/CommonEcharts";


export const citiesOptionConfig = data => commonConfigOptions(
    {
        backgroundColor: "#2D9596",
        visualMap: {
            //图例值控制
            min: 0,
            max: 10000,
            calculable: false,
            show: true,
            right: 50,
            // seriesIndex: 1,
            bottom: 50,
            color: ["#9AD0C2",],
            // inRange:{
            //   symbolSize: [10, 20]},
            textStyle: {
                color: "#333",
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
                data: data,
                itemStyle: {
                    borderColor: 'rgb(147, 235, 248,.8)',
                    borderWidth: 0.2,
                    areaColor: {
                        type: 'linear',
                        x: 0.2,
                        y: 0.8,
                        x2: 0,
                        y2: 0,
                        r: 0.8,
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
                        globalCoord: true // 缺省为 false
                    }
                },
                emphasis: {
                    itemStyle: {
                        areaColor: '#2D9596',
                        // color: '#f0f'
                    }
                },
                select: {
                    itemStyle: {
                        areaColor: '#ECF4D6',
                        color: '#f0f'
                    }
                }
            },
        ],
    }
)

export interface City_info {
    id: number;
    provinceCode: number;
    provinceName: string;
    cityCode: number;
    cityName: string;
    content: string;
    imageName: string;
    date: string;
}
